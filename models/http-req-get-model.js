'use strict';

const Utils = require('../common/utils').Utils;

class HttpRequestGetModel {

  constructor(req, serverOptions) {
    const _defaultHeaders = {
    };
    this.hostname = '';
    this.port = '';
    this.path = [serverOptions.baseUrl, serverOptions.requestUrl, req.url].join('/');
    //this.headers = Object.assign({}, _defaultHeaders, req.headers);
    this.headers = _defaultHeaders;
    this.method = serverOptions.requestMethod;
  }

  getQueryString(reqParams) {
    return Utils.jsonToQueryString(reqParams);
  }

  generateRequestObject() {
    return {
      hostname: this.hostname,
      port: this.port,
      path: this.path,
      method: this.method,
      headers: this.headers
    }
  }
}

module.exports = {
  HttpRequestGetModel: HttpRequestGetModel
}
