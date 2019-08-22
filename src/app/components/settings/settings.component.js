import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('settings', {
        template: require('./settings.html'),
        controller: SettingsCtrl,
        controllerAs: 'vm'
    });

    SettingsCtrl.$inject = [
        '$scope',
        '$state',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function SettingsCtrl($scope, $state, ModalService, QueryService, logger) {
        var vm = this;
        vm.titleHeader = 'Settings';
    }
})();
