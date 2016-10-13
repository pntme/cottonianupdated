 (function() {
     'use strict';
     angular.module('cot')
         .factory('loginApi', loginApi);

     function loginApi(tostService,  $ionicLoading, $state, timeStorage, configuration,  ajaxRequest, localStorageService) {
         var service = {};
         service.fireApi = function(method, email, password, picture, id, name) {
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
                    else
                      validateLogin(res);  
                 });   
            }

            function validateLogin(res){
               localStorageService.set("UserData", res);
                $state.go('home')
               
            }
         }
         return service;
     }
 })();


