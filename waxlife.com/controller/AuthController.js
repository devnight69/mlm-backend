const baseResponse = require("../response/baseResponse");
const userRequestDto = require('../dto/request/LoginRequestDto')
const AuthService = require('../serviceImpl/AuthServiceImpl')

class AuthController {
  async loginUser(req, res) {
    const { error, value } = userRequestDto.validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(baseResponse.errorResponseWithMessage(error.details[0].message));
    }

    // Call service and handle its response
    const loginResponse = await AuthService.loginUser(value);

    return res.status(201).send(loginResponse);
  }
}

module.exports = new AuthController();
