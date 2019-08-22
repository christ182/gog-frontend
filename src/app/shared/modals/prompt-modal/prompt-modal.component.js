import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('promptModal', {
        template: require('./prompt-modal.html'),
        controller: PromptModalCtrl,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<',
            resolve: '<'
        }
    });

    PromptModalCtrl.$inject = [
        '$scope',
        '$cookies',
        '$timeout',
        'QueryService',
        'UsersService',
        'logger'
    ];

    function PromptModalCtrl(
        $scope,
        $cookies,
        $timeout,
        QueryService,
        UsersService,
        logger
    ) {
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

        function approve() {
            debugger;
            UsersService.forgotPassword(vm.email)
                .then(function(data) {
                    debugger;
                    logger.success(data.message);
                    vm.modalInstance.close();
                })
                .catch(function(response) {
                    debugger;
                    logger.error(
                        'An error has occured. Status code: ' + response.status
                    );
                });
        }

        function cancel() {
            vm.modalInstance.close();
        }
    }
})();
