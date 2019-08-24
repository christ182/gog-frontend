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
        '$cookies',
        'ModalService',
        'QueryService',
        'SocketService',
        'logger'
    ];

    function DashboardCtrl(
        $scope,
        $state,
        $cookies,
        ModalService,
        QueryService,
        SocketService,
        logger
    ) {
        var vm = this;
        vm.get_online = get_online;
        vm.send_challenge = send_challenge;
        vm.accept_challenge = accept_challenge;

        vm.user = $cookies.getObject('user');

        get_online();

        function get_online() {
            var request = {
                method: 'GET',
                route: { auth: 'online' },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {
                    vm.users = response.data;
                    vm.socket_user = vm.users.find(u => u.id === vm.user.id);
                    console.log(vm.socket_user);
                },
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        function send_challenge(user_id) {
            var request = {
                method: 'POST',
                route: { challenge: user_id, send: '' },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {
                    console.log(response);
                },
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        function accept_challenge() {
            var request = {
                method: 'POST',
                route: { challenge: 'accept' },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {
                    console.log(response);
                },
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        SocketService.on('new_user', data => {
            console.log('new_user', data);
            vm.users.push(data);
        });

        SocketService.on('change_online_status', data => {
            console.log('change_online_status', data);
            if (data.is_online === 0) {
                vm.users = vm.users.filter(u => u.id !== data.id);
            }

            if (data.status) {
                const user = vm.users.find(u => u.id === data.id);

                if (user) {
                    user.status = data.status;
                }
            }
        });

        SocketService.on('new_challenge', data => {
            const accept = confirm(
                'You are being challenged for a game by ' + data.name
            );
            console.log(accept);
            if (accept) {
                vm.accept_challenge();
            }
        });
    }
})();
