/**
 * Created by Shine on 20/4/2559.
 */

(function () {
  angular
    .module('app')
    .controller('LoginController', LoginController);
  function serializeData(data) {
    // If this is not an object, defer to native stringification.
    if (!angular.isObject(data)) {
      return ( ( data == null ) ? "" : data.toString() );
    }

    var buffer = [];

    // Serialize each key in the object.
    for (var name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }

      var value = data [name];

      buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(( value == null ) ? "" : value)
      );
    }

    //Serialize the buffer and clean it up for transportation.
    var source = buffer.join("&").replace(/%20/g, "+");
    return ( source );
  }

  /** @ngInject */
  function LoginController($scope, $rootScope, $location, $cookies, UserService) {
    var vm = this;
    vm.rememberMe = false;
    vm.login = function () {

      UserService.authenticate(serializeData({username: vm.username, password: vm.password}),
        // success connection
        function (authenticationResult) {
          var authToken = authenticationResult.token;
          $rootScope.authToken = authToken;
          if (vm.rememberMe) {
            $cookies.put('authToken', authToken);
          }
          UserService.get(function (user) {
            $rootScope.user = user;
            $location.path("/")
          })
        },//unsuccess connection
        function (error) {
          if (error.status == "401") {
            $rootScope.error = "user name or password is not correct!"
          }
        })
    }
  }
})();
