'use strict';
class RequestService {
  constructor(requestInstance, request, response, next) {
    this._requestInstance = requestInstance;
    this._request = request;
    this._response = response;
    this._next = next;
  }
  doRequest() {
    if(validateRequest()) {
      sendRequest()
    }
  }
  validateRequest(request, response, next) {
    const serviceUrl = getServiceUrl(request);
  }
  getUserLoggedInDetails(request, response, next) {
    return getSsoToken(request) || false;
  }

  getSsoToken(request) {
    return     request.headers.cookie
            && Utils.parseCookieString(request.headers.cookie)
            && Utils.parseCookieString(request.headers.cookie).ssoToken;
  }

  validateClientUrl(request) {
    return ClientServiceUrlMapper[request.params['clientUrl']] || false;
  }
}
