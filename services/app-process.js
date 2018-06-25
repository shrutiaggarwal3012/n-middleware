'use strict';
const HttpRequestGetModel = require('../models/http-req-get-model.js').HttpRequestGetModel;
const RequestValidatorService = require('./request-validator').RequestValidatorService;
const HttpService = require('./http-service').HttpService;
class AppProcess {
  static validateRequest(request, cookies, serverParams) {
    const requestValidators = serverParams.requestValidator;
    for(let validator in requestValidators) {
      if( !!! RequestValidatorService[requestValidators[validator]](request, cookies) )
      return true;
    }
    return true;
  }

  static makeRequest(req, serverOptions) {
    let httpRequestData;
    if(req.method === 'GET') {
      httpRequestData = (new HttpRequestGetModel(req, serverOptions)).generateRequestObject();
      return HttpService.doRequest(httpRequestData, null);
    }
  }
}

module.exports = {
  AppProcess: AppProcess
}
