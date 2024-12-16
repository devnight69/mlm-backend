class TokenPayloadDto {
    constructor(user) {
      this.id = user.id;
      this.mobileNumber = user.mobileNumber;
      this.fullname = user.fullname;
    }
  }
  
  module.exports = TokenPayloadDto;