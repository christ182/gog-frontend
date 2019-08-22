import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').filter('unit', unit);

    function unit() {
        return function(input, unit) {
            if (input) {
                return input + ' ' + unit;
            } else {
                return '';
            }
        };
    }
})();
