import angular from 'angular';
import URLS from 'Helpers/urls';

(function() {
    'use strict';

    angular.module('app').service('LoginService', LoginService);

    LoginService.$inject = ['$http'];

    // This service contain methods for LoginCtrl
    function LoginService($http) {
        // This function fires an http request to the base
        this.login = function(user) {
            var data = {
                email: user.email,
                password: user.password
            };

            var loginUrl = URLS.base + URLS.login;

            return $http.post(loginUrl, data, {});
        };
    }
})();
