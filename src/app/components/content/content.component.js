import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('content', {
        template: require('./content.html'),
        controller: ContentCtrl,
        controllerAs: 'vm'
    });

    ContentCtrl.$inject = [
        '$rootScope',
        '$state',
        '$cookies',
        '$scope',
        '$stateParams',
        'SidebarService'
    ];

    function ContentCtrl(
        $rootScope,
        $state,
        $cookies,
        $scope,
        $stateParams,
        SidebarService
    ) {
        var vm = this;

        const { version } = require('../../../../package.json');
        vm.version = version;

        $rootScope.back = back;
        $rootScope.init = rootInit;
        $rootScope.active_tab = active_tab;
        $rootScope.next = next;

        vm.sidebarService = SidebarService;

        vm.$onInit = function() {
            var user = $cookies.getObject('user');
        };

        function rootInit() {}

        function back() {}

        function active_tab() {}

        function next() {}
    }
})();
