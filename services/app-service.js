'use strict';

const RequestService = require('./request-service');
const AppServerMapper = require('../conf/app-server-mapper').AppServerMapper;
const AppConf = require('../conf/app-conf').AppConf;
const AppProcess = require('./app-process').AppProcess;
const Utils = require('../common/utils').Utils;

class AppService {
  constructor(request, response, next) {
    this.init(request, response, next);
    this.initiateRequest();
  }

  init(request, response, next) {
    this.setInstanceParams(request, response, next);
    this.setCookie();
    this.setServerParams();
  }

  initiateRequest() {
    if(AppProcess.validateRequest(this.req, this.cookies, this.serverOptions)) {
      const promise = AppProcess.makeRequest(this.req, this.serverOptions);
      this.processResult(promise);
    } else {
      this.sendErrorCallback();
    }
  }

  processResult(promise) {
    if(promise instanceof Promise == false) {
      return this.res.send({"error": "No response", "data":""});
    }
    const _this = this;
    debugger;
    promise.then(function(result) {
        _this.onSuccessCallback(result);
    }, function(error) {
        _this.onErrorCallback(error);
    })
    .catch(function() {
        _this.onErrorCallback();
    });
  }

  setInstanceParams(request, response, next) {
      this.req = request;
      this.res = response;
      this.next = next;
  }

  setCookie() {
    if(this.req.headers.cookie) {
      this.cookies = Utils.parseCookieString(this.req.headers.cookie);
    }
  }

  setServerParams() {
    if(this.req.params['service']) {
      this.serverOptions = {};
      if(!AppServerMapper[this.req.params['service']]) {
        return AppServerMapper[this.req.params['service']];
      }
      this.serverOptions = AppServerMapper[this.req.params['service']];
      this.serverOptions.baseUrl = AppConf.server.baseUrl;
    } else {
      this.sendErrorCallback();
    }
  }

  sendErrorCallback() {
    this.res.send({
      error: {
        message: 'User not logged in.'
      },
      data: null
    })
  }

  onSuccessCallback(responseData) {
    for(let parser in requestParsers) {
        responseData = RequestParserService[requestParsers[parser]])(responseData);
    }
    return this.res.send(responseData);
  }

  onErrorCallback(responseData) {
    return this.res.send({
      data: null,
      error: responseData
    })
  }

}

module.exports = {
  AppService: AppService
}
