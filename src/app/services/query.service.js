import angular from 'angular';
import GLOBAL from 'Helpers/global';

(function() {
    'use strict';

    angular.module('app').factory('QueryService', QueryService);

    QueryService.$inject = ['$http', '$q', '$rootScope', '$cacheFactory'];

    function QueryService($http, $q, $rootScope, $cacheFactory) {
        var httpCache = $cacheFactory.get('$http');
        var service = {
            query: query,
            runSnapToRoad: runSnapToRoad
        };

        return service;

        function query(req) {
            var deferred = $q.defer();
            var request = {
                method: req.method,
                ignoreLoadingBar: req.ignoreLoadingBar,
                data: GLOBAL.clean_data(req.body),
                url:
                    typeof req.route === 'string'
                        ? req.route
                        : GLOBAL.set_url(req.route),
                headers: GLOBAL.header(req.token),
                params: GLOBAL.parameters(req.params),
                // withCredentials: true,
                cache: req.cache,
                transformRequest: GLOBAL.transform(req.hasFile)
            };

            if (req.hasFile) request.headers['Content-Type'] = undefined;

            var new_req = GLOBAL.clean_object(request);

            $http(new_req)
                .then(
                    function(response) {
                        if (request.method == 'GET' && req.cache) {
                            var str_params = GLOBAL.stringifyParams(
                                request.params
                            );
                            var full_url = response.config.url + str_params;
                            GLOBAL.collectCacheKeys(req.cache_string, full_url);
                        } else {
                            for (var i = 0; i < req.cache_string.length; i++) {
                                GLOBAL.removeCache(
                                    req.cache_string[i],
                                    httpCache
                                );
                            }
                        }
                        deferred.resolve(response);
                    },
                    function(error) {
                        console.log(error);
                        deferred.reject(error);
                    }
                )
                .finally(function() {
                    // $rootScope.progressbar.complete();
                });

            return deferred.promise;
        }

        function runSnapToRoad(coords) {
            var promises = [];

            for (var i = 0; i < coords.length; i++) {
                promises.push(
                    $http({
                        method: 'GET',
                        url: UTILS.snapToRoadUrl,
                        ignoreLoadingBar: true,
                        params: {
                            interpolate: true,
                            key: UTILS.apiKey,
                            path: coords[i].join('|')
                        }
                    })
                );
            }

            return $q.all(promises);
        }
    }
})();
