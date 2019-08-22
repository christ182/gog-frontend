import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').service('SidebarService', SidebarService);

    SidebarService.$inject = [];

    function SidebarService() {
        this.first = true;
        this.isActive = false;
        this.pageWrapper = null;

        this.toggleSidebar = () => {
            this.isActive = !this.isActive;
            this.first = false;
        };
    }
})();
