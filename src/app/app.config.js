import angular from 'angular';
import ROLES from 'Helpers/permissions';

(function() {
    'use strict';

    angular
        .module('app')
        .factory('httpRequestInterceptor', [
            'SessionService',
            function(SessionService) {
                return {
                    request: function(config) {
                        // Get the token from session service
                        var token = SessionService.getToken();

                        // Attach an x-access-token header to the request
                        // With the token from sesison service as value
                        config.headers['x-access-token'] = token;

                        return config;
                    }
                };
            }
        ])
        .config([
            '$httpProvider',
            function($httpProvider) {
                // Add our created http interceptor
                $httpProvider.interceptors.push('httpRequestInterceptor');
            }
        ])
        .config([
            'toastrConfig',
            function(toastrConfig) {
                // Configure the toastr container
                angular.extend(toastrConfig, {
                    // autoDismiss: false,
                    // containerId: 'toast-container',
                    maxOpened: 4,
                    // newestOnTop: true,
                    positionClass: 'toast-bottom-right'
                    // preventDuplicates: false,
                    // preventOpenDuplicates: false,
                    // target: 'body'
                });

                // Configure the toastr itself
                angular.extend(toastrConfig, {
                    // allowHtml: false,
                    // closeButton: false,
                    // closeHtml: '<button>&times;</button>',
                    extendedTimeOut: 1000,
                    // iconClasses: {
                    //     error: 'toast-error',
                    //     info: 'toast-info',
                    //     success: 'toast-success',
                    //     warning: 'toast-warning'
                    // },
                    // messageClass: 'toast-message',
                    // onHidden: null,
                    // onShown: null,
                    // onTap: null,
                    // progressBar: false,
                    // tapToDismiss: true,
                    // templates: {
                    //     toast: 'directives/toast/toast.html',
                    //     progressbar: 'directives/progressbar/progressbar.html'
                    // },
                    timeOut: 4000
                    // titleClass: 'toast-title',
                    // toastClass: 'toast'
                });
            }
        ])
        .config(router)
        .run([
            '$transitions',
            function($transitions) {
                // checks if not authenticated when going to app.** routes
                $transitions.onBefore({ to: 'app.**' }, function(trans) {
                    var SessionService = trans.injector().get('SessionService');

                    if (!SessionService.getUser()) {
                        // redirects to login
                        return trans.router.stateService.target('login');
                    }
                });

                // checks if already authenticated when going to login route
                // $transitions.onBefore({ to: 'login' }, function(trans) {
                //     var SessionService = trans.injector().get('SessionService');

                //     // redirects to dashboard (?)
                //     if (SessionService.getUser()) {
                //         return trans.router.stateService.target(
                //             'app.dashboard'
                //         );
                //     }
                // });
            }
        ])
        .run([
            '$cookies',
            'QueryService',
            'PermPermissionStore',
            function($cookies, QueryService, PermPermissionStore) {
                // if ($cookies.getObject('user') != null) {
                //     var user = $cookies.getObject('user');
                //     var permissions = ROLES[user.role];
                //     PermPermissionStore.defineManyPermissions(
                //         permissions,
                //         function(permissionName) {
                //             return permissions.includes(permissionName);
                //         }
                //     );
                // }
            }
        ]);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/',
                views: {
                    navbar: {
                        component: 'navbar'
                    },
                    sidebar: {
                        component: 'sidebar'
                    },
                    content: {
                        component: 'content'
                    }
                }
            })
            .state('app.dashboard', {
                url: 'dashboard',
                component: 'dashboard'
            })
            .state('app.settings', {
                url: 'settings',
                component: 'settings',
                data: {
                    permissions: {
                        only: ['canViewSettings'],
                        redirectTo: 'app.dashboard'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    content: {
                        component: 'login'
                    }
                }
            })
            .state('resetPassword', {
                url: '/password_reset/:token',
                views: {
                    content: {
                        component: 'resetPassword'
                    }
                }
            });
    }
})();
