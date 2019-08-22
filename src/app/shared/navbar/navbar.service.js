import angular from 'angular';
import URLS from 'Helpers/urls';

(function() {
    'use strict';

    angular.module('app').service('NavbarService', NavbarService);

    NavbarService.$inject = ['$http', 'SidebarService'];

    function NavbarService($http, SidebarService) {
        // This function requests a logout to server
        this.logout = function() {
            SidebarService.isActive = false;
            SidebarService.pageWrapper = null;

            var url = URLS.base + URLS.logout;

            return $http.post(url);
        };
    }
})();
