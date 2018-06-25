'use strict';

var Utils = {
  jsonToQueryString:  function jsonToQueryString(json) {
      return '?' +
          Object.keys(json).map(function(key) {
              return encodeURIComponent(key) + '=' +
                  encodeURIComponent(json[key]);
          }).join('&');
  },
  parseCookieString: function(cookieString) {
    let list = [];
    cookieString && cookieString.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
     });
    return list;
  },
  getCookieExpiryTime: function(expiryTime) {
    let now = new Date();
    let expiryTime = now.getTime() + expiryTime;
    now.setTime(expiryTime);
    return now.toGMTString();
  }
}

module.exports = {
  Utils: Utils
}
