'use strict';
class SrpService {
  constructor(request, response, next) {
    console.log(request);
  }
  static makeRequest(req, res, next) {
    console.log('I am in make req');
    return res.send('I am response');
  }
}

module.exports = { SrpService };
