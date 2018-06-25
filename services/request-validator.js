const RequestValidatorServices = {
  loggedInUser: function(req, cookies) {
    //return cookies.ssoToken && cookies.ssoToken !== "undefined" ? true: false;
  }
}

module.exports = {
  RequestValidatorService: RequestValidatorService
}
