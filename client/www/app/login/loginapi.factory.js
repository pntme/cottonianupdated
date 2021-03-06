 (function() {
     'use strict';
     angular.module('cot')
         .factory('loginApi', loginApi);

     function loginApi(tostService,  $ionicLoading, $rootScope, pushNotificationService, $state, timeStorage, configuration,  ajaxRequest, localStorageService) {
         var service = {};
         service.fireApi = function(method, email, password, picture, id, name) {
            $ionicLoading.show(); 
            if(method == 'custom'){
                ajaxRequest.send("signin.php", {
                    email: email,
                    password: password,
                    type: 'custom'
                   }, 'Post').then(function(res){
                    $ionicLoading.hide();
                    if(res == 0)
                        tostService.notify("Invalid login details, Please try again", 'top');
                    else
                       validateLogin(res);
                 });
            } else {
                ajaxRequest.send("signin.php", {
                    email: email,
                    password: password,
                    type: method,
                    picture: picture,
                    id : id,
                    fullname: name
                   }, 'Post').then(function(res){
                    $ionicLoading.hide();
                    if(res == 0)
                      tostService.notify("Something went wrong, Please try again", 'top');
                    else{
                        if(!res[0].profile_pic)
                            res[0].profile_pic = picture;
                        validateLogin(res);
                      }
                 });   
            }

            function validateLogin(res){
                localStorageService.set("UserData", res);
                pushNotificationService.init();
                $rootScope.$emit("profile_changed"); 
                $state.go('tab.feed');    
            }
         }
         return service;
     }
 })();


