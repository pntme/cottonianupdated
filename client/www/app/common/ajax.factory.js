(function() {
    'use strict';
    angular
        .module('cot')
        .factory('ajaxRequest',ajaxRequest);
    function ajaxRequest($http, $q, configuration) {
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
                    def.resolve(data);
                }).error(function() {
                    def.reject('500');
                });
                return def.promise;
            },
        };
    }

})();