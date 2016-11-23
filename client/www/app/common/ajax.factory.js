(function() {
    'use strict';
    angular
        .module('cot')
        .factory('ajaxRequest', ajaxRequest);

    function ajaxRequest($http, $q, configuration, tostService, $ionicLoading, $rootScope, localStorageService) {

        var self = this;
        var service = {};


        service.OfflineData = function(api) {
            var res = localStorageService.get(api);
            if (res) {
                res = res.replace(/\\n/g, "\\n")
                    .replace(/\\'/g, "\\'")
                    .replace(/\\"/g, '\\"')
                    .replace(/\\&/g, "\\&")
                    .replace(/\\r/g, "\\r")
                    .replace(/\\t/g, "\\t")
                    .replace(/\\b/g, "\\b")
                    .replace(/\\f/g, "\\f");
                res = res.replace(/[\u0000-\u0019]+/g, "");
                res = JSON.parse(res);
                return res;
            }
            return;
        }

        service.send = function(api, data, method, decide) {
                var def = $q.defer();
                $http({
                    url: configuration.ApiHost + api,
                    method: method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                }).success(function(res) {
                    $rootScope.$broadcast('scroll.refreshComplete');
                    localStorageService.set(api, JSON.stringify(res));
                    def.resolve(res);
                }).error(function() {
                    $ionicLoading.hide();
                    if (decide == "NeedOffline") {
                        $rootScope.$broadcast('scroll.refreshComplete');
                        var offlinedata = service.OfflineData(api);
                        def.resolve(offlinedata);
                    } else {
                        def.reject('500');
                    }
                    if (decide !== 'Notification') {
                        tostService.notify('Operation failed, Review your network settings', 'top');
                    }

                });
                return def.promise;
            },

            service.GoogleApi = function(api, data, method) {
                var def = $q.defer();
                $http({
                    url: api,
                    method: method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                }).success(function(data) {
                    $rootScope.$broadcast('scroll.refreshComplete');
                    def.resolve(data);
                }).error(function() {
                    tostService.notify('Operation failed, Review your network settings', 'top');
                    $ionicLoading.hide();
                    def.reject('500');
                });
                return def.promise;
            }

        return service;
    }

})();