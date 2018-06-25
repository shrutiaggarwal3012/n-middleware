'use strict';

const Utils = require('../common/utils');

class HttpRequestModel {
  var _defaultHeaders = {
    'Content-Length': Buffer.byteLength(JSON.stringify(request.body)),
    'Content-Type': 'application/json'
  };
  constructor(requestMethod, requestUrl, requestData, requestHeaders) {
    this.requestMethod = requestMethod;
    this.requestUrl = requestUrl;
    this.requestData = requestData;
    this.requestHeaders = requestHeaders;
  }

  createHttpRequestParams() {
    if(this.requestMethod === 'GET') {
      Utils.jsonToQueryString(this.requestData);
    }
  }
}
