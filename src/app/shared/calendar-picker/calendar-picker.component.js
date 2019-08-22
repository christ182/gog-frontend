import angular from 'angular';
import moment from 'moment';

(function() {
    'use strict';

    angular.module('app').component('calendarPicker', {
        template: require('./calendar-picker.html'),
        controller: CalendarPickerCtrl,
        controllerAs: 'vm',
        bindings: {
            // @params startDate: Date
            // @params endDate: Date
            onConfirm: '&',

            // @params state: Boolean
            onCancel: '&'
        }
    });

    CalendarPickerCtrl.$inject = [];

    function CalendarPickerCtrl() {
        const ROWS = 6;
        const COLS = 7;
        const vm = this;
        vm.monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        vm.constants = [
            'yesterday',
            'last week',
            'last month',
            'today',
            'this week',
            'this month'
        ];
        vm.timeOptions = [];

        vm.dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        vm.currentDate = null;
        vm.nextDate = null;
        vm.startDate = moment().startOf('day');
        vm.startTime = '00:00';
        vm.startDateString = '';
        vm.endDate = moment().startOf('day');
        vm.endTime = '00:00';
        vm.endDateString = '';

        vm.selectDateTurn = 'end';

        vm.isDatePickerActive = {
            start: false,
            end: false
        };

        vm.startDateStringErrors = {
            format: false,
            time: false
        };

        vm.endDateStringErrors = {
            format: false,
            time: false
        };

        vm.startCalendar = [];
        vm.endCalendar = [];

        vm.selectDate = selectDate;
        vm.selectDefault = selectDefault;
        vm.changeCalendar = changeCalendar;
        vm.isSelectedDate = isSelectedDate;
        vm.isBetweenDates = isBetweenDates;
        vm.toggleDatePicker = toggleDatePicker;
        vm.confirmDatePicker = confirmDatePicker;
        vm.changeDateStrings = changeDateStrings;
        vm.onHandleConfirm = onHandleConfirm;
        vm.onHandleCancel = onHandleCancel;

        vm.$onInit = function() {
            vm.currentDate = moment().startOf('month');
            vm.startCalendar = getCalendar(
                vm.currentDate.month(),
                vm.currentDate.year()
            );
            vm.nextDate = vm.currentDate.clone().add(1, 'months');
            vm.endCalendar = getCalendar(
                vm.nextDate.month(),
                vm.nextDate.year()
            );

            let minute = 0;
            let hour = 0;
            while (minute !== 0 || hour !== 24) {
                const hourString = hour < 10 ? '0' + hour : hour;
                const minuteString = minute < 10 ? '0' + minute : minute;
                vm.timeOptions.push(`${hourString}:${minuteString}`);
                minute += 15;
                if (minute === 60) {
                    minute = 0;
                    hour++;
                }
            }

            updateDateStrings();
        };

        function changeDateStrings(calendar, dateString) {
            const date = moment(dateString);
            if (calendar === 'start') {
                if (!date.isValid()) {
                    vm.startDateStringErrors.time = false;
                    vm.startDateStringErrors.format = true;
                    return;
                }
                if (date.isAfter(vm.endDate)) {
                    vm.startDateStringErrors.format = false;
                    vm.startDateStringErrors.time = true;
                    return;
                }
                vm.startDateStringErrors.time = false;
                vm.startDateStringErrors.format = false;
                vm.startDate = date.clone();
            }
            if (calendar === 'end') {
                if (!date.isValid()) {
                    vm.endDateStringErrors.time = false;
                    vm.endDateStringErrors.format = true;
                    return;
                }
                if (date.isBefore(vm.startDate)) {
                    vm.endDateStringErrors.format = false;
                    vm.endDateStringErrors.time = true;
                    return;
                }
                vm.endDateStringErrors.time = false;
                vm.endDateStringErrors.format = false;
                vm.endDate = date.clone();
            }
        }

        function updateDateStrings() {
            const startDateMonthString =
                vm.startDate.month() + 1 < 10
                    ? '0' + (vm.startDate.month() + 1)
                    : vm.startDate.month() + 1;

            const startDateDateString =
                vm.startDate.date() < 10
                    ? '0' + vm.startDate.date()
                    : vm.startDate.date();

            const startDateYearString = vm.startDate.year();

            vm.startDateString = `${startDateMonthString}/${startDateDateString}/${startDateYearString}`;

            if (!vm.endDate) return;

            const endDateMonthString =
                vm.endDate.month() + 1 < 10
                    ? '0' + (vm.endDate.month() + 1)
                    : vm.endDate.month() + 1;

            const endDateDateString =
                vm.endDate.date() < 10
                    ? '0' + vm.endDate.date()
                    : vm.endDate.date();

            const endDateYearString = vm.endDate.year();

            vm.endDateString = `${endDateMonthString}/${endDateDateString}/${endDateYearString}`;
        }

        function selectDate(cell) {
            if (!cell.isCurrent) return;

            const { date, isCurrent } = cell;

            // let distanceToStartDate = Math.abs(date.diff(vm.startDate, 'days'));
            // let distanceToEndDate = Math.abs(date.diff(vm.endDate, 'days'));

            // if (distanceToStartDate < distanceToEndDate) {
            //     vm.startDate = date.clone();
            // } else {
            //     vm.endDate = date.clone();
            // }

            // if (date.isBefore(vm.startDate)) {
            //     vm.startDate = date.clone();
            // } else if (date.isAfter(vm.endDate)) {
            //     vm.endDate = date.clone();
            // } else {
            // }

            // if (vm.selectDateTurn === 'start') {
            //     vm.startDate = date.clone();
            //     vm.selectDateTurn = 'end';
            // } else {
            //     vm.endDate = date.clone();
            //     vm.selectDateTurn = 'start';
            // }

            // if ((!vm.startDate && !vm.endDate) || vm.endDate) {
            //     vm.startDate = date.clone();
            //     vm.endDate = null;
            // } else {
            //     vm.endDate = date.clone();
            //     if (vm.endDate.isBefore(vm.startDate)) {
            //         [vm.startDate, vm.endDate] = [vm.endDate, vm.startDate];
            //     }
            // }

            if ((!vm.startDate && !vm.endDate) || vm.endDate) {
                vm.startDate = date.clone();
                vm.endDate = null;
            } else {
                vm.endDate = date.clone();
                if (vm.endDate.isBefore(vm.startDate)) {
                    [vm.startDate, vm.endDate] = [vm.endDate, vm.startDate];
                }
            }

            vm.startDateStringErrors.format = false;
            vm.startDateStringErrors.time = false;
            vm.endDateStringErrors.format = false;
            vm.endDateStringErrors.time = false;
            updateDateStrings();
        }

        function selectDefault(option) {
            vm.startDate = moment().startOf('day');
            switch (option) {
                case 'yesterday':
                    vm.startDate.subtract(1, 'days');
                    vm.endDate = vm.startDate.clone();
                    break;
                case 'last week':
                    vm.startDate.subtract(1, 'weeks').startOf('week');
                    vm.endDate = vm.startDate.clone().endOf('week');
                    break;
                case 'last month':
                    vm.startDate.subtract(1, 'month').startOf('month');
                    vm.endDate = vm.startDate.clone().endOf('month');
                    break;
                case 'today':
                    vm.endDate = vm.startDate.clone();
                    break;
                case 'this week':
                    vm.startDate.startOf('week');
                    vm.endDate = vm.startDate.clone().endOf('week');
                    break;
                case 'this month':
                    vm.startDate.startOf('month');
                    vm.endDate = vm.startDate.clone().endOf('month');
                    break;
            }

            const tempDate = vm.currentDate.clone().date(vm.startDate.date());
            const difference = vm.startDate.diff(tempDate, 'months');
            changeCalendar(difference);
            updateDateStrings();
        }

        function isSelectedDate(cell) {
            const { date } = cell;
            if (vm.startDate && vm.startDate.isSame(date, 'date')) {
                return true;
            }

            if (vm.endDate && vm.endDate.isSame(date, 'date')) {
                return true;
            }

            return false;
        }

        function isBetweenDates(cell) {
            const { date } = cell;
            if (
                vm.startDate &&
                vm.endDate &&
                vm.startDate.isBefore(date, 'date') &&
                vm.endDate.isAfter(date, 'date')
            ) {
                return true;
            }
            return false;
        }

        function changeCalendar(steps) {
            vm.currentDate.add(steps, 'months');
            vm.startCalendar = getCalendar(
                vm.currentDate.month(),
                vm.currentDate.year()
            );
            vm.nextDate = vm.currentDate.clone().add(1, 'months');
            vm.endCalendar = getCalendar(
                vm.nextDate.month(),
                vm.nextDate.year()
            );
        }

        function toggleDatePicker(calendar) {
            vm.isDatePickerActive[calendar] = !vm.isDatePickerActive[calendar];
        }

        function confirmDatePicker(month, year, calendar) {
            const targetDate = moment()
                .year(year)
                .month(month)
                .startOf('month');
            const tempDate =
                calendar === 'start'
                    ? vm.currentDate.clone().date(targetDate.date())
                    : vm.nextDate.clone().date(targetDate.date());
            const difference = targetDate.diff(tempDate, 'months');
            changeCalendar(difference);
            toggleDatePicker(calendar);
        }

        function getDaysArray(date, isCurrent) {
            const start = moment(date).startOf('month');
            const end = moment(date).endOf('month');
            const days = [];

            while (start.isSameOrBefore(end, 'date')) {
                days.push({
                    date: start.clone(),
                    isCurrent
                });
                start.add(1, 'days');
            }
            return days;
        }

        function getCalendar(month, year) {
            const date = moment()
                .year(year)
                .month(month)
                .date(1);

            const currentMonth = getDaysArray(date.toDate(), true);

            const calendar = [
                ...Array(date.day()).fill({ isCurrent: false }),
                ...currentMonth
            ];

            while (calendar.length < ROWS * COLS) {
                calendar.push({ isCurrent: false });
            }

            const result = [];
            for (let row = 0; row < ROWS; ++row) {
                result.push(calendar.slice(row * COLS, (row + 1) * COLS));
            }
            return result;
        }

        function onHandleConfirm() {
            const startTimeSplit = vm.startTime.split(':');
            vm.startDate.hour(+startTimeSplit[0]).minute(+startTimeSplit[1]);

            const endTimeSplit = vm.endTime.split(':');
            vm.endDate.hour(+endTimeSplit[0]).minute(+endTimeSplit[1]);

            console.log('hello');
            vm.onConfirm({
                startDate: vm.startDate.toDate(),
                endDate: vm.endDate.toDate()
            });
        }

        function onHandleCancel() {
            vm.onCancel({ state: false });
        }
    }
})();
