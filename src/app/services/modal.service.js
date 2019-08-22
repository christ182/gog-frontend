import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').factory('ModalService', ModalService);

    ModalService.$inject = ['$uibModal'];

    function ModalService($uibModal) {
        const service = {
            // list_modal: list_modal,
            // form_modal: form_modal,
            confirm_modal: confirm_modal,
            // email_modal: email_modal,
            message_modal: message_modal,
            prompt_modal: prompt_modal,
            view_account_modal: view_account_modal,
            change_password_modal: change_password_modal
        };

        return service;

        /** NO LIST MODAL IN APP/SHARED/MODAL */
        // function list_modal(form, modal, callback) {
        //     var modalInstance = $uibModal
        //         .open({
        //             component: 'listModal',
        //             size: 'md',
        //             backdrop: true,
        //             resolve: {
        //                 form: function() {
        //                     return form;
        //                 },
        //                 modal: function() {
        //                     return modal;
        //                 }
        //             }
        //         })
        //         .result.then(function(data) {
        //             if (data) {
        //                 callback(data);
        //             }
        //         });
        // }

        /** NO TAB MODAL IN APP/SHARED/MODALS */
        // function form_modal(form, type, modal, callback) {
        //     var modalInstance = $uibModal
        //         .open({
        //             templateUrl: 'app/shared/modals/tab-modal/tab-modal.html',
        //             controller: 'TabModalCtrl',
        //             controllerAs: 'vm',
        //             size: 'md',
        //             backdrop: false,
        //             resolve: {
        //                 form: function() {
        //                     return form;
        //                 },
        //                 modal: function() {
        //                     return modal;
        //                 },
        //                 type: function() {
        //                     return type;
        //                 }
        //             }
        //         })
        //         .result.then(function(data) {
        //             if (data) {
        //                 callback(data);
        //             }
        //         });
        // }

        /*
            @param options.header:          The title of the confirm dialog box.
            @param options.message:         The message displayed on the confirm dialog box.
            @param [options.okButtonLabel]: The label of confirm button. Defaults to 'ok'.

            @return <Promise>: A promise that resolves to true or false,
                depending on whether the user clicked ok or cancel.
        */
        function confirm_modal(options) {
            // Open a ui bootstrap modal
            var modalInstance = $uibModal.open({
                component: 'confirmationModal',
                size: 'sm',
                backdrop: false,
                resolve: {
                    props: function() {
                        return options;
                    }
                }
            });

            // This is a promise
            return modalInstance.result;
        }

        /** NO INVITATION MODAL IN APP/SHARED/MODALS */
        // function email_modal(data, callback) {
        //     var modalInstance = $uibModal
        //         .open({
        //             templateUrl:
        //                 'app/shared/modals/invitation-modal/invitation-modal.html',
        //             controller: 'InvitationCtrl',
        //             controllerAs: 'vm',
        //             size: 'sm',
        //             backdrop: true,
        //             resolve: {
        //                 Data: function() {
        //                     return data;
        //                 }
        //             }
        //         })
        //         .result.then(function(data) {
        //             if (data) {
        //                 return callback(data);
        //             }
        //         });
        // }

        function message_modal(msg) {
            var modalInstance = $uibModal.open({
                component: 'messageModal',
                size: 'sm',
                backdrop: true,
                resolve: {
                    message: function() {
                        return msg;
                    }
                }
            });
        }

        function prompt_modal(msg, callback) {
            var modalInstance = $uibModal
                .open({
                    component: 'promptModal',
                    size: 'sm',
                    backdrop: false,
                    resolve: {
                        message: function() {
                            return msg;
                        }
                    }
                })
                .result.then(function(data) {
                    if (data) {
                        callback(data);
                    }
                });
        }

        function view_account_modal(callback) {
            var modalInstance = $uibModal
                .open({
                    component: 'viewAccountModal',
                    size: 'sm',
                    backdrop: false
                })
                .result.then(function(data) {
                    if (data) {
                        callback(data);
                    }
                });
        }

        function change_password_modal(callback) {
            var modalInstance = $uibModal
                .open({
                    component: 'changePasswordModal',
                    backdrop: false
                })
                .result.then(function(data) {
                    if (data) {
                        callback(data);
                    }
                });
        }
    }
})();
