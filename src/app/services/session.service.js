import angular from 'angular';

(function() {
    'use strict';

    /**
     * This Service contains methods for managing user session
     */
    angular.module('app').service('SessionService', SessionService);

    SessionService.$inject = ['$cookies'];

    function SessionService($cookies) {
        var parent = this;

        // This function saves user data into browser cookies
        this.saveUser = function(data) {
            $cookies.putObject('user', {
                id: data.id,
                fullname: data.fullName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                token: data.token,
                role: 'ADMIN'
            });
        };

        this.getUser = function() {
            return $cookies.getObject('user');
        };

        this.getToken = function() {
            var user = parent.getUser();
            if (user) {
                return user.token;
            } else {
                return '';
            }
        };

        // This function will clear user cookies data
        // including token
        this.clearUser = function() {
            $cookies.remove('user');
        };
    }
})();
