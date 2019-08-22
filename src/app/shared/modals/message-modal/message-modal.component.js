import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('messageModal', {
        template: require('./message-modal.html'),
        controller: MessageModalCtrl,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });

    MessageModalCtrl.$inject = [
        '$scope',
        '$cookies',
        '$timeout',
        'QueryService'
    ];

    function MessageModalCtrl($scope, $cookies, $timeout, QueryService) {
        var vm = this;
        var ids = null;
        vm.content = null;
        vm.data = null;

        vm.approve = approve;
        vm.cancel = cancel;

        vm.$onInit = function() {
            ids = angular.copy(vm.resolve.message.keys);
            vm.content = angular.copy(vm.resolve.message);
            vm.data = angular.copy(vm.resolve.message.data);
        };

        function approve() {}

        function cancel() {
            vm.modalInstance.close();
        }
    }
})();
