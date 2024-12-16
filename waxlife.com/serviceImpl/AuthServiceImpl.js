const TokenPayloadDto = require("../dto/request/tokenPayloadRequestDto");
const User = require("../models/User");
const baseResponse = require("../response/baseResponse");
const AuthService = require('../service/AuthService')
const sequelize = require("../config/database");
const { StatusCodes } = require("http-status-codes");
const JwtTokenUtil = require("../utils/JwtTokenUtil")

class AuthServiceImpl extends AuthService {
  async loginUser(LoginDto) {
    const transaction = await sequelize.transaction(); // Start a transaction

    try {
      const existingUser = await User.findOne(
        { where: { mobileNumber: LoginDto.username } },
        { transaction }
      );

      if (!existingUser) {
        await transaction.rollback(); // Rollback transaction if user exists
        return baseResponse.errorResponseWithData(
          StatusCodes.BAD_REQUEST,
          "User Not Found with this mobile number."
        );
      }

      const tokenPayload = new TokenPayloadDto(existingUser);
      const plainTokenPayload = { ...tokenPayload };

      // Generate token
      const token = JwtTokenUtil.createToken(plainTokenPayload);

      // Add the token to the response
      const responseData = {
        user: existingUser,
        token,
      };

      await transaction.commit(); // Commit the transaction if all operations succeed

      // Return a success response
      return baseResponse.successResponseWithMessage(
        "User Login successfully",
        responseData
      );
    } catch (error) {
      await transaction.rollback(); // Rollback transaction in case of any error
      return baseResponse.errorResponse(error);
    }
  }
}

module.exports = new AuthServiceImpl();
