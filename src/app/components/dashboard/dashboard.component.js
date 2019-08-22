import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('dashboard', {
        template: require('./dashboard.html'),
        controller: DashboardCtrl,
        controllerAs: 'vm'
    });

    DashboardCtrl.$inject = [
        '$scope',
        '$state',
        'ModalService',
        'QueryService',
        'logger'
    ];

    function DashboardCtrl($scope, $state, ModalService, QueryService, logger) {
        var vm = this;
    }
})();
