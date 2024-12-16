/**
 * ResponseDto Class
 * Data Transfer Object for responses.
 */
class ResponseDto {
    constructor(response, status, message, data) {
      this.response = response;
      this.status = status;
      this.message = message;
      this.data = data || null;
      this.timestamp = new Date().toISOString();
    }
  }
  
  module.exports = ResponseDto;
  