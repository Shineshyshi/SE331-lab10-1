(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock)
    .run(runSecurity);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

  function runSecurity($rootScope, $location, $cookies, UserService) {
    var removeErrorMsg = $rootScope.$on('$viewContentLoaded', function(){
      delete $rootScope.error;
    });
    removeErrorMsg();
    $rootScope.hasRole = function(role) {
      if($rootScope.user == undefined) {
        return false;
      }
      if($rootScope.user.roles[role] == undefined) {
        return false;
      }
      return $rootScope.user.roles[role];
    };

    $rootScope.logout = function () {
      delete $rootScope.user;
      delete $rootScope.authToken;
      $cookies.remove('authToken');
      $location.path("/listProduct");
    };

    var originalPath = $location.path();
    $location.path("/listProduct");
    var authToken = $cookies.get('authToken');
    if(authToken != undefined) {
      $rootScope.authToken = authToken;
      UserService.get(function(user) {
        $rootScope.user = user;
        $location.path(originalPath);
      });
    }
    $rootScope.initialized = true;

  }

})();
