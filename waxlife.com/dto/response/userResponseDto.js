class UserResponseDto {
    constructor(user, token) {
      this.user = {
        id: user.id,
        fullname: user.fullname,
        mobileNumber: user.mobileNumber,
      };
      this.token = token;
    }
  }
  
  module.exports = UserResponseDto;  