const User = require("../models/User");
const UserService = require("../service/UserService");
const BaseResponse = require("../response/baseResponse");
const { StatusCodes } = require("http-status-codes");
const JwtTokenUtil = require("../utils/JwtTokenUtil");
const TokenPayloadDto = require("../dto/request/tokenPayloadRequestDto");
const mongoose = require("mongoose");

class UserServiceImpl extends UserService {
  async createUser(userDto) {
    // Start a session for MongoDB transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Check if a user with the same mobile number already exists
      const existingUser = await User.findOne({ mobileNumber: userDto.mobileNumber }, null, { session });

      if (existingUser) {
        await session.abortTransaction(); // Abort the transaction if user exists
        session.endSession();
        return BaseResponse.errorResponseWithData(
          StatusCodes.BAD_REQUEST,
          "User with this mobile number already exists."
        );
      }

      // Create the new user
      const newUser = new User(userDto);
      await newUser.save({ session });

      // Convert TokenPayloadDto instance to a plain object
      const tokenPayload = new TokenPayloadDto(newUser);
      const plainTokenPayload = { ...tokenPayload };

      // Generate token
      const token = JwtTokenUtil.createToken(plainTokenPayload);

      // Add the token to the response
      const responseData = {
        user: tokenPayload,
        token,
      };

      await session.commitTransaction(); // Commit the transaction if all operations succeed
      session.endSession();

      // Return a success response
      return BaseResponse.successResponseWithMessage(
        "User created successfully",
        responseData
      );
    } catch (error) {
      await session.abortTransaction(); // Rollback transaction in case of any error
      session.endSession();
      return BaseResponse.errorResponse(error);
    }
  }

  async getAllUsers() {
    return await User.find(); // Fetch all users
  }

  async getUserById(userId) {
    return await User.findById(userId); // Fetch user by MongoDB _id
  }

  async updateUser(userId, userDto) {
    // Use MongoDB's findByIdAndUpdate method
    const updatedUser = await User.findByIdAndUpdate(userId, userDto, { new: true }); // `new: true` returns the updated document
    return updatedUser;
  }

  async deleteUser(userId) {
    // Delete the user by MongoDB _id
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  }
}

module.exports = new UserServiceImpl();