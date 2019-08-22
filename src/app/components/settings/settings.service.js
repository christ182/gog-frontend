import angular from 'angular';
import URLS from 'Helpers/urls';

(function() {
    'use strict';

    angular.module('app').service('SettingsService', SettingsService);

    SettingsService.$inject = ['$http'];

    function SettingsService($http) {
        this.getDashboard = function() {
            const url = URLS.base + URLS.dashboard;

            return $http.get(url).then(function(response) {
                return response.data;
            });
        };
    }
})();
