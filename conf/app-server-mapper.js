'use strict';

const AppServerMapper = {
  'search': {
    requestMethod: 'GET',
    requestValidator: ['loggedInUser'],
    requestParser: ['tokenMapper'],
    requestUrl: 'searchAll'
  }
}

module.exports = {
  AppServerMapper: AppServerMapper
}
