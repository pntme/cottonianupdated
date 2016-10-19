(function() {
    'use strict';
    angular.module('cot')
            .factory('pushNotificationService', pushNotificationService);
    function pushNotificationService(notification) {
        var service = {};
        service.pushInit = function() {
                 document.addEventListener("deviceready", function() {
          
    var push = PushNotification.init({ 
      "android": {"senderID": 309136436360} , // enter your sender id here
    });
   
    push.on('registration', function(data) { 
        console.log(data.registrationId);
      localStorage.setItem('deviceToken', data.registrationId);
    // here need to send your registration id on your backend file by that push will be create
    }); 
    //apikey: AIzaSyA5s8xnIje1zYi8aSG1TPANt6eJuIBYMew
    push.on('notification', function(data) {
      if (data.additionalData.foreground) { 
        if (window.device.platform == 'android' || device.platform == 'Android') {
             var my_media = new Media("/android_asset/www/app/lib/notify.wav");
             my_media.play();
        }
        console.log(data); 
      } else { 
            data.message, 
            data.title, 
            data.count, 
            data.sound, 
            data.image
      } 
    }); 
    push.on('error', function(e) { 
      console.log("e.message"); 
    }); 
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