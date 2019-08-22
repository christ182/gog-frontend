import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('changePasswordModal', {
        template: require('./change-password-modal.html'),
        controller: ChangePassCtrl,
        controllerAs: 'vm',
        bindings: {
            modalInstance: '<'
        }
    });

    ChangePassCtrl.$inject = [
        '$scope',
        '$cookies',
        '$timeout',
        'QueryService',
        'SessionService',
        'logger'
    ];

    function ChangePassCtrl(
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

        vm.cancel = cancel;

        function checkPassword() {
            if (vm.data.new_password == vm.data.confirm_password) {
                return true;
            } else {
                return false;
            }
        }

        function cancel() {
            vm.modalInstance.close();
        }
    }
})();
