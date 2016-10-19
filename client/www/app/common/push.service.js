(function() {
    'use strict';
    angular.module('cot')
            .factory('pushNotificationService', pushNotificationService);
    function pushNotificationService($ionicPush, localStorageService, ajaxRequest) {
        var service = {};
        service.init = function() {
             $ionicPush.register().then(function(t) {
             return $ionicPush.saveToken(t);
             }).then(function(t) {
              ajaxRequest.send('savepushtoken.php', {
                "token": t.token,
                'email': localStorageService.get('UserData')[0].email
              }, 'POST').then(function(res){
                 console.log(res);
              });
               console.log('Token saved:', t.token);
          });
        },
        service.pushAPiFromLogin = function(){
            var deviceToken = localStorage.getItem('deviceToken');
            var not = notification.editdevice({
                        "deviceToken": deviceToken,
                        "dtype": 2
                    });
                    not.$promise.then(function (resp) {
                         console.log(resp.data.endpoint_arn);
                         localStorage.setItem('endpoint_arn', resp.data.endpoint_arn);
                    });
        },
        service.pushAPiFromRun = function(){
            var deviceToken = localStorage.getItem('deviceToken');
            var endpoint_arn = localStorage.getItem('endpoint_arn');
            var not = notification.editdevice({
                        "deviceToken": deviceToken,
                        "dtype": 2,
                        endpoint_arn:endpoint_arn
                    });
                    not.$promise.then(function (resp) {
                         console.log(resp);
                    });
        }

     

        return service;
    }
})();