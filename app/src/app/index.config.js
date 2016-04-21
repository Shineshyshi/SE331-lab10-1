(function () {
  'use strict';

  angular
    .module('app')
    .config(configTranslation)
    .config(configCompilerProvider)
    .config(configFlowFactoryProvider)
    .config(configFailRequestRedirect);


  /** @ngInject */
  function configTranslation($translateProvider) {
    $translateProvider.useUrlLoader('http://localhost:8080/messageBundle');
    $translateProvider.useStorage('UrlLanguageStorage');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }

  /** @ngInject */
  function configFlowFactoryProvider(flowFactoryProvider) {
    flowFactoryProvider.defaults = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: false
    };
    // flowFactoryProvider.on('catchAll', function ($log) {
    //   console.log('catchAll', arguments);
    // });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
  }


  /** @ngInject */
  function configCompilerProvider($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
  }

  /** @ngInject */
  function configFailRequestRedirect($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
      return {
        'responseError': function (rejection) {
          var status = rejection.status;
          var config = rejection.config;
          var method = config.method;
          var url = config.url;

          if (status == 401) {
            $location.path("/listProduct");
          } else {
            $rootScope.error = method + " on " + url + " failed with status " + status;
          }
          return $q.reject(rejection);
        }
      }
    });
    var exampleAppConfig = {useAuthTokenHeader: true};

    $httpProvider.interceptors.push(function ($q, $rootScope) {
      return {
        'request': function (config) {
          if (angular.isDefined($rootScope.authToken)) {
            var authToken = $rootScope.authToken;
            if (exampleAppConfig.useAuthTokenHeader) {
              config.headers['X-Auth-Token'] = authToken;
            } else {
              config.url = config.url + "?token=" + authToken;
            }
          }
          return config || $q.when(config);
        }
      }
    });
  }

})();
