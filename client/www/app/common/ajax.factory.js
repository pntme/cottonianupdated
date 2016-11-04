(function() {
    'use strict';
    angular
        .module('cot')
        .factory('ajaxRequest',ajaxRequest);
    function ajaxRequest($http, $q, configuration, tostService, $ionicLoading, $rootScope) {
        return {
            send: function(api, data, method) {
                var def = $q.defer();
                $http({  
                    url: configuration.ApiHost+api,
                    method: method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                }).success(function(data) {
                    $rootScope.$broadcast('scroll.refreshComplete');
                    def.resolve(data);
                }).error(function() {
                    tostService.notify('Operation failed, Review your network settings','top');
                    $ionicLoading.hide();
                    def.reject('500');
                });
                return def.promise;
            },

            GoogleApi: function(api, data, method){
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
                    tostService.notify('Operation failed, Review your network settings','top');
                    $ionicLoading.hide();
                    def.reject('500');
                });
                return def.promise;
            }
        };

    }

})();