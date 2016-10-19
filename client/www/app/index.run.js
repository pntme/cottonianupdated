  (function(){
'use strict';
 angular.module('cot')
.run(function($ionicPlatform, userValidate, $state, pushNotificationService, $rootScope, $ionicPush, tostService, $timeout , $ionicHistory) {
   userValidate.validUser();
   $rootScope.spinner = true;
  $ionicPlatform.ready(function() {

    $ionicPush.register().then(function(t) {
  return $ionicPush.saveToken(t);
}).then(function(t) {
  console.log('Token saved:', t.token);
});
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
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
               if($state.current.name == 'tab.home' || $state.current.name == 'login'){
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
                     $ionicHistory.goBack(); 
                }
            
            }, 100);
        });
})
})();


