// import css libraries
import 'angular-loading-bar/build/loading-bar.css';
import 'angular-toastr/dist/angular-toastr.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import angular from 'angular';

// import angular dependencies that don't default export their modules names
import '@uirouter/angularjs';
import 'angular-socket-io';
import 'moment';
import 'angular-permission';

(function() {
    'use strict';

    angular.module('app', [
        'ui.router',
        'permission',
        'permission.ui',
        require('angular-aria'),
        require('angular-cookies'),
        require('angular-loading-bar'),
        require('angular-messages'),
        require('angular-sanitize'),
        require('ngclipboard'),
        'btford.socket-io',
        require('angular-toastr'),
        require('angular-ui-bootstrap')
    ]);
})();
