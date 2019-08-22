import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('pageNav', {
        template: require('./page-nav.html'),
        controller: PaginationCtrl,
        controllerAs: 'vm',
        bindings: {
            pageData: '<',
            onChangePage: '&',
            sizeChange: '&'
        }
    });

    PaginationCtrl.$inject = ['$scope'];

    function PaginationCtrl($scope) {
        var vm = this;

        vm.onPageChange = onPageChange;
        vm.onSizeChange = onSizeChange;

        function onPageChange() {
            vm.onChangePage();
        }

        function onSizeChange() {
            vm.sizeChange();
        }
    }
})();
