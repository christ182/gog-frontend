import angular from 'angular';
import GLOBAL from 'Helpers/global';
import URLS from 'Helpers/urls';
import io from 'socket.io-client';
import UTIL from 'Helpers/util';

var socket_enable = true;

(function() {
    'use strict';

    angular.module('app').factory('SocketService', SocketService);

    SocketService.$inject = ['$cookies', '$state', 'socketFactory'];

    function SocketService($cookies, $state, socketFactory) {
        var user = GLOBAL.user($cookies, $state, $state.current.name);
        var socket = this;
        var ss;
        var service = {
            connect: connect,
            on: on,
            emit: emit,
            forward: forward,
            removeListener: removeListener,
            removeAllListeners: removeAllListeners,
            disconnect: disconnect
        };

        return service;

        function connect() {
            if (socket_enable) {
                if (!ss) {
                    var connectSocket = io.connect(URLS.socketUrl, {
                        query: 'token=' + GLOBAL.user($cookies, $state).token,
                        transports: ['websocket'],
                        path: '/socket.io'
                    });

                    var newSocket = socketFactory({
                        ioSocket: connectSocket,
                        forceNew: true
                    });
                    ss = newSocket;
                } else newSocket = ss;

                socket = newSocket;

                emit('set_data', {
                    key: 'version',
                    value: UTIL.version
                });
            }
        }

        function on(event, callback) {
            if (socket_enable)
                socket.on(event, function(data) {
                    callback(data);
                });
        }

        function emit(event, data, callback) {
            if (socket_enable)
                socket.emit(event, data, function(data) {
                    callback(data);
                });
        }

        function forward(event) {
            if (socket_enable) socket.forward(event);
        }

        function removeListener(event) {
            if (socket_enable) socket.removeListener(event);
        }

        function removeAllListeners() {
            if (socket_enable) socket.removeAllListeners();
        }

        function disconnect() {
            ss = undefined;
            socket.disconnect();
        }

        socket: socket;
    }
})();
