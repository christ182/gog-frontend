import angular from 'angular';

(function() {
    'use strict';

    angular.module('app').component('datePicker', {
        template: require('./date-picker.html'),
        controller: DatePickerCtrl,
        controllerAs: 'vm',
        bindings: {
            calendar: '<',
            currentMonth: '<',
            currentYear: '<',
            onOk: '&',
            onCancel: '&'
        }
    });

    DatePickerCtrl.$inject = [];

    function DatePickerCtrl() {
        const COLS = 2;
        const ROWS = 5;
        const vm = this;

        vm.months = [
            ['Jan', 'Jul'],
            ['Feb', 'Aug'],
            ['Mar', 'Sep'],
            ['Apr', 'Oct'],
            ['May', 'Nov'],
            ['Jun', 'Dec']
        ];

        vm.years = [];

        vm.ok = ok;
        vm.cancel = cancel;
        vm.initializeMonths = initializeMonths;
        vm.isSelectedMonth = isSelectedMonth;
        vm.selectMonth = selectMonth;
        vm.selectYear = selectYear;

        vm.$onInit = function() {
            initializeMonths(vm.currentYear);
        };

        function ok() {
            vm.onOk({
                month: vm.currentMonth,
                year: vm.currentYear,
                calendar: vm.calendar
            });
        }

        function cancel() {
            vm.onCancel({ calendar: vm.calendar });
        }

        function initializeMonths(year) {
            vm.years = [];
            const maxYear = year + COLS * ROWS;
            while (year < maxYear) {
                if (vm.years.length < ROWS) {
                    vm.years.push([year]);
                } else {
                    vm.years[5 - (maxYear - year)].push(year);
                }
                year++;
            }
        }

        function isSelectedMonth(month) {
            if (month === getMonth(vm.currentMonth)) {
                return true;
            }
            return false;
        }

        function selectMonth(index) {
            vm.currentMonth = index;
        }

        function selectYear(year) {
            vm.currentYear = year;
        }

        function getMonth(index) {
            return vm.months[index % 6][index < 6 ? 0 : 1];
        }
    }
})();
