const User = require("../models/User");
const UserService = require("../service/UserService");
const BaseResponse = require("../response/baseResponse");
const sequelize = require("../config/database");
const { StatusCodes } = require("http-status-codes");
const JwtTokenUtil = require("../utils/JwtTokenUtil");
const TokenPayloadDto = require("../dto/request/tokenPayloadRequestDto");

class UserServiceImpl extends UserService {
  async createUser(userDto) {
    const transaction = await sequelize.transaction(); // Start a transaction
    try {
      // Check if a user with the same mobile number already exists
      const existingUser = await User.findOne(
        { where: { mobileNumber: userDto.mobileNumber } },
        { transaction }
      );
      if (existingUser) {
        await transaction.rollback(); // Rollback transaction if user exists
        return BaseResponse.errorResponseWithData(
          StatusCodes.BAD_REQUEST,
          "User with this mobile number already exists."
        );
      }

      // Create the new user
      const newUser = await User.create(userDto, { transaction });

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

      await transaction.commit(); // Commit the transaction if all operations succeed

      // Return a success response
      return BaseResponse.successResponseWithMessage(
        "User created successfully",
        responseData
      );
    } catch (error) {
      await transaction.rollback(); // Rollback transaction in case of any error
      return BaseResponse.errorResponse(error);
    }
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(userId) {
    return await User.findByPk(userId);
  }

  async updateUser(userId, userDto) {
    const [updatedRows] = await User.update(userDto, { where: { id: userId } });
    return updatedRows;
  }

  async deleteUser(userId) {
    return await User.destroy({ where: { id: userId } });
  }
}

module.exports = new UserServiceImpl();
