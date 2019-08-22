import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('navbar', {
        template: require('./navbar.html'),
        controller: NavbarCtrl,
        controllerAs: 'vm'
    });

    NavbarCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        '$cookies',
        'QueryService',
        'ModalService',
        'SessionService',
        'NavbarService',
        'SocketService',
        'SidebarService'
    ];

    function NavbarCtrl(
        $rootScope,
        $scope,
        $state,
        $stateParams,
        $timeout,
        $cookies,
        QueryService,
        ModalService,
        SessionService,
        NavbarService,
        SocketService,
        SidebarService
    ) {
        var vm = this;

        vm.logout = logout;
        vm.update_password = update_password;
        vm.view_profile = view_profile;
        vm.toggleSidebar = toggleSidebar;

        SocketService.connect();

        // vm.logo = require('Images/nav-logo.png');
        vm.$onInit = function() {};

        function view_profile() {
            ModalService.view_account_modal();
        }

        function logout() {
            SessionService.clearUser();
            $state.go('login');
        }

        function update_password() {
            ModalService.change_password_modal();
        }

        function toggleSidebar() {
            SidebarService.toggleSidebar();
        }
    }
})();
