import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('viewAccountModal', {
        template: require('./view-account-modal.html'),
        controller: ViewAccountModalCtrl,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<'
        }
    });

    ViewAccountModalCtrl.$inject = [
        '$scope',
        '$cookies',
        '$timeout',
        'QueryService',
        'SessionService',
        'logger'
    ];

    function ViewAccountModalCtrl(
        $scope,
        $cookies,
        $timeout,
        QueryService,
        SessionService,
        logger
    ) {
        var vm = this;

        vm.userFrmSession = SessionService.getUser();
        vm.header = 'my account';
        vm.update_button_label = 'update';
        vm.cancel_button_label = 'cancel';

        vm.approve = approve;
        vm.cancel = cancel;

        function approve() {}

        function cancel() {
            vm.modalInstance.close();
        }
    }
})();
