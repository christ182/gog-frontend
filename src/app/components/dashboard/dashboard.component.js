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
        vm.place_piece = place_piece;
        vm.setup_random_test = setup_random_test;
        vm.get_piece_color = get_piece_color;
        vm.clear_setup = clear_setup;
        vm.ready = ready;
        vm.last_move_direction = last_move_direction;
        vm.click_move = click_move;

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
                    console.log('socket_user', vm.socket_user);
                    if (vm.socket_user.status === 'playing') {
                        get_game();
                    }
                },
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        function get_game() {
            var request = {
                method: 'GET',
                route: { game: 'mine' },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {
                    vm.game = response.data.data.game;
                    vm.game.user =
                        vm.game.challengee_id === vm.user.id
                            ? vm.game.challengee
                            : vm.game.challenger;
                    vm.game.enemy =
                        vm.game.challengee_id === vm.user.id
                            ? vm.game.challenger
                            : vm.game.challengee;
                    console.log(vm.game);
                    refresh_board();
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

        function place_piece(x, y) {
            if (vm.to_place) {
                //validate placement
                if (vm.game.user.color === 'black' && y > 2) {
                    return false;
                }
                if (vm.game.user.color === 'white' && y < 5) {
                    return false;
                }

                var request = {
                    method: 'POST',
                    route: { game: 'place' },
                    body: {
                        x,
                        y,
                        piece_id: vm.to_place.id
                    },
                    cache_string: ''
                };

                vm.to_place = null;
                QueryService.query(request).then(
                    function(response) {},
                    function(err) {
                        logger.error(err.message, '');
                    }
                );
            } else {
                if (vm.game.board[y][x].piece) {
                    const piece = vm.game.board[y][x].piece;
                    console.log(piece);

                    var request = {
                        method: 'POST',
                        route: { game: 'unplace' },
                        body: { piece_id: piece.id },
                        cache_string: ''
                    };

                    QueryService.query(request).then(
                        function(response) {},
                        function(err) {
                            logger.error(err.message, '');
                        }
                    );
                }
            }
        }

        function setup_random_test() {
            const unplaced = vm.game.user.unplaced_pieces;
            vm.to_place = unplaced[parseInt(Math.random() * unplaced.length)];

            let conflict_x = parseInt(Math.random() * 9);
            let conflict_y = parseInt(Math.random() * 8);
            let conflict = vm.game.board[conflict_y][conflict_x];
            while (conflict.piece) {
                conflict_x = parseInt(Math.random() * 9);
                conflict_y = parseInt(Math.random() * 8);
                conflict = vm.game.board[conflict_y][conflict_x];
            }
            place_piece(conflict_x, conflict_y);

            if (unplaced.length > 0) {
                setTimeout(() => setup_random_test(), 5);
            }
        }

        function clear_setup() {
            const placed = [...vm.game.user.placed_pieces];
            placed.forEach((p, i) => {
                setTimeout(() => {
                    place_piece(p.x, p.y);
                }, i * 15);
            });
        }

        function get_piece_color(piece) {
            //return true for white
            const my_piece = vm.game.user.placed_pieces
                .map(p => p.id)
                .includes(piece.id);
            const my_color = vm.game.user.color;

            if (my_piece && my_color === 'white') {
                return true;
            }

            if (my_piece && my_color !== 'white') {
                return false;
            }

            if (!my_piece && my_color === 'white') {
                return false;
            }

            if (!my_piece && my_color !== 'white') {
                return true;
            }
        }

        function ready() {
            var request = {
                method: 'POST',
                route: { game: 'ready' },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {},
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        function click_move(tile) {
            if (!tile.piece && !vm.to_move) {
                return;
            }

            if (!vm.to_move) {
                vm.to_move = tile;
                return;
            }

            if (vm.to_move == tile) {
                vm.to_move = undefined;
                return;
            }

            var request = {
                method: 'POST',
                route: { game: 'move' },
                body: {
                    ox: vm.to_move.x,
                    oy: vm.to_move.y,
                    nx: tile.x,
                    ny: tile.y
                },
                cache_string: ''
            };

            QueryService.query(request).then(
                function(response) {
                    vm.to_move = undefined;
                },
                function(err) {
                    logger.error(err.message, '');
                }
            );
        }

        function last_move_direction() {
            const move = vm.game.last_move;

            if (!move) {
                return '';
            }
            const dx = move.ox - move.nx;
            const dy = move.oy - move.ny;

            if (dx < 0 && dy == 0) {
                return 'fa fa-chevron-right';
            }
            if (dx > 0 && dy == 0) {
                return 'fa fa-chevron-left';
            }

            if (dx == 0 && dy > 0) {
                return 'fa fa-chevron-up';
            }
            if (dx == 0 && dy < 0) {
                return 'fa fa-chevron-down';
            }
        }

        // -----------------------socket events-------------------------------------
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

                if (user.id === vm.user.id && data.status === 'playing') {
                    get_game();
                }
            }
        });

        SocketService.on('new_challenge', data => {
            const accept = confirm(
                'You are being challenged for a game by ' + data.name
            );

            if (accept) {
                vm.accept_challenge();
            }
        });

        SocketService.on('piece_placed', data => {
            vm.game.board[data.data.y][data.data.x].piece_id =
                data.data.piece_id;
            if (data.unplaced_pieces) {
                vm.game.user.unplaced_pieces = data.unplaced_pieces;
                vm.game.user.placed_pieces = data.placed_pieces;
                vm.to_place = null;
            }

            refresh_board();
        });

        SocketService.on('piece_unplaced', data => {
            vm.game.board[data.data.y][data.data.x].piece_id = undefined;
            vm.game.board[data.data.y][data.data.x].piece = undefined;

            if (data.unplaced_pieces) {
                vm.game.user.unplaced_pieces = data.unplaced_pieces;
                vm.game.user.placed_pieces = data.placed_pieces;
            }

            refresh_board();
        });

        SocketService.on('ready', data => {
            const ready =
                vm.game.challenger.id === data.id
                    ? vm.game.challenger
                    : vm.game.challengee;
            ready.ready = 1;
        });

        SocketService.on('ongoing', data => {
            vm.game.status = 'ongoing';
            vm.game.pieces = data.pieces;
        });

        SocketService.on('move', data => {
            data = data.data;
            console.log(data);
            // vm.game.board[data.oy][data.ox].piece = undefined;
            vm.game.board[data.oy][data.ox].piece_id = undefined;

            // vm.game.board[data.ny][data.nx].piece = undefined;
            vm.game.board[data.ny][data.nx].piece_id = undefined;
            vm.game.last_move = {
                ox: data.ox,
                oy: data.oy,
                nx: data.nx,
                ny: data.ny
            };

            if (data.remove) {
                data.remove.forEach(piece_id => {
                    vm.game.pieces = vm.game.pieces.filter(
                        p => p.id !== piece_id
                    );
                });
            }

            if (data.winner) {
                vm.game.board[data.ny][data.nx].piece_id = data.winner;
            }

            vm.game.turn = data.turn;

            refresh_board();
        });

        function refresh_board() {
            vm.game.board = vm.game.board.map(row => {
                return row.map(tile => {
                    if (tile.piece_id) {
                        tile.piece =
                            vm.game.user.placed_pieces.find(
                                p => p.id === tile.piece_id
                            ) || {};
                    } else {
                        tile.piece = undefined;
                    }

                    return tile;
                });
            });
        }
    }
})();
