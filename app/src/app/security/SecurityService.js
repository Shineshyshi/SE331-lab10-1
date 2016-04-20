(function () {
  'use strict';
  angular
    .module('app')
    .factory('UserService', UserService);

  /** @ngInject */
  function UserService($resource) {
    return $resource('/user/:action', {},
      {
        authenticate: {
          method: 'POST',
          params: {'action': 'authenticate'},
          header: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      });
  }
})();
