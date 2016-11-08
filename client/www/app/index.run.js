  (function(){
'use strict';
 angular.module('cot')
.run(function($ionicPlatform, userValidate, $state, pushNotificationService, localStorageService, $rootScope, $ionicPush, tostService, $timeout , $ionicHistory) {
   userValidate.validUser();
   $rootScope.spinner = true;
  $ionicPlatform.ready(function() {
    if(localStorageService.get('UserData'))
          pushNotificationService.init();
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    document.addEventListener("deviceready", function() {
            var count = 0;
            $ionicPlatform.registerBackButtonAction(function(event) {
               if($state.current.name == 'tab.feed' || $state.current.name == 'login'){
                       if (count == 0) {
                        count++;
                        tostService.notify('Press Back Again To Exit App', 'top');
                        $timeout(function() {
                            count = 0;
                        }, 3000);
                    } else if (count == 1) {
                        navigator.app.exitApp();
                        count = 0;
                    }
                   
                } else{
                  if($state.current.name != 'profile_pic')
                     $ionicHistory.goBack(); 
                }
            
            }, 100);
        });
})
})();


