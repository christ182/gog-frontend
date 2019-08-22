import angular from 'angular';

(function() {
    'use strict';
    angular.module('app').component('confirmationModal', {
        template: require('./confirmation-modal.html'),
        controller: ConfirmationModalCtrl,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });

    ConfirmationModalCtrl.$inject = [
        '$scope',
        '$cookies',
        '$timeout',
        'QueryService'
    ];

    function ConfirmationModalCtrl($scope, $cookies, $timeout, QueryService) {
        var vm = this;
        var ids = null;

        vm.content = null;

        vm.approve = approve;
        vm.cancel = cancel;

        vm.$onInit = function() {
            ids = angular.copy(vm.resolve.props.keys);
            vm.content = angular.copy(vm.resolve.props);
        };

        function approve() {
            vm.modalInstance.close(true);
        }

        function cancel() {
            vm.modalInstance.close(false);
        }
    }
})();
