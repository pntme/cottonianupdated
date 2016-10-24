 (function() {
     'use strict';
     angular.module('cot')
         .factory('loginApi', loginApi);

     function loginApi(tostService,  $ionicLoading, pushNotificationService, $state, timeStorage, configuration,  ajaxRequest, localStorageService) {
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
                console.log("picture =  "+ picture)
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
                    else
                      validateLogin(res);  
                 });   
            }

            function validateLogin(res){

                console.log("response aa gya");
                console.log(res)
                localStorageService.set("UserData", res);
                pushNotificationService.init();
                $state.go('tab.home')
               
            }
         }
         return service;
     }
 })();


