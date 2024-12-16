const TokenPayloadDto = require("../dto/request/tokenPayloadRequestDto");
const User = require("../models/User"); // Mongoose User model
const baseResponse = require("../response/baseResponse");
const AuthService = require('../service/AuthService');
const { StatusCodes } = require("http-status-codes");
const JwtTokenUtil = require("../utils/JwtTokenUtil");
const mongoose = require("mongoose");

class AuthServiceImpl extends AuthService {
  async loginUser(LoginDto) {
    // Start a session for MongoDB transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find user by mobileNumber
      const existingUser = await User.findOne(
        { mobileNumber: LoginDto.username },
        null,
        { session }
      );

      if (!existingUser) {
        // Abort the transaction if the user is not found
        await session.abortTransaction();
        session.endSession();
        return baseResponse.errorResponseWithData(
          StatusCodes.BAD_REQUEST,
          "User Not Found with this mobile number."
        );
      }

      // Create token payload
      const tokenPayload = new TokenPayloadDto(existingUser);
      const plainTokenPayload = { ...tokenPayload };

      // Generate JWT token
      const token = JwtTokenUtil.createToken(plainTokenPayload);

      // Add the token to the response
      const responseData = {
        user: existingUser,
        token,
      };

      // Commit the transaction if everything succeeds
      await session.commitTransaction();
      session.endSession();

      // Return success response
      return baseResponse.successResponseWithMessage(
        "User Login successfully",
        responseData
      );
    } catch (error) {
      // Rollback the transaction in case of an error
      await session.abortTransaction();
      session.endSession();

      // Return error response
      return baseResponse.errorResponse(error);
    }
  }
}

module.exports = new AuthServiceImpl();