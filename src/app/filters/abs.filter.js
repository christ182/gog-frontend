import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').filter('abs', abs);

    function abs() {
        return function(input) {
            return Math.abs(input);
        };
    }
})();
