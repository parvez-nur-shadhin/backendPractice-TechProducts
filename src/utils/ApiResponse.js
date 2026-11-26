class ApiResponse {
  constructor(statusCode, message = "Success", data, success = "Success") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export { ApiResponse };
