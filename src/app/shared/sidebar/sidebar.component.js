import angular from 'angular';
import UTIL from 'Helpers/util';

(function() {
    'use strict';

    angular.module('app').component('sidebar', {
        template: require('./sidebar.html'),
        controller: SidebarCtrl,
        controllerAs: 'vm'
    });

    SidebarCtrl.$inject = [
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
        'SidebarService',
        'logger'
    ];

    function SidebarCtrl(
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
        SidebarService,
        logger
    ) {
        var vm = this;
        vm.sidebarService = SidebarService;
        vm.defaultParams = UTIL.defaultParams;

        vm.toggle = toggle;

        function toggle(prop) {
            vm[prop] = !vm[prop];
        }
    }
})();
