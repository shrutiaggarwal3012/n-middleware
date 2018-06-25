'use strict';

var http = require('http');

class HttpService {
  doGetRequest(requestParams, response) {
    let req = http.get(requestParams, function(res) {
      response.set('Content-Type', 'application/json');
      res.pipe(response);
    });

    req.on('error', function(e) {
      response.sendStatus(500);
    })
    req.end();
  }

  static doRequest(httpRequestModel, postData) {
    return new Promise(function(resolve, reject) {
        const req = http.request(httpRequestModel, (response) => {
          response.setEncoding('utf8');
          let responseData = "";
          if(response.statusCode < 200 || response.statusCode >= 300) {
            return resolve(response);
          }
          response.on('data', function(chunk){
            responseData += chunk;
          })
          response.on('end', function() {
            resolve(JSON.parse(responseData.toString('utf8')));
          })
        });
        req.on('error', function(err) {
          reject(err);
        })
        if(postData) {
          req.write(postData);
        }
        req.end();
    });
  }
}

module.exports = {
  HttpService: HttpService
}
