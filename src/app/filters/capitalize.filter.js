import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').filter('capitalize', capitalize);

    function capitalize() {
        return function(input) {
            return !!input
                ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase()
                : '';
        };
    }
})();
