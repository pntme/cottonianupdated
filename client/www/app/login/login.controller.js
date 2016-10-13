(function(){
  'use strict';
  angular.module('cot').controller('LoginCtrl', LoginCtrl);
  function LoginCtrl(ajaxRequest, facebookLogin, $ionicLoading, googleLogin, loginApi, $state){
    var self = this;
    self.DoLogin = function(){
      $ionicLoading.show();
      loginApi.fireApi('custom', self.email, self.password);
    }

     self.GoFb = function() {
         $ionicLoading.show();
           facebookLogin.login().then(function(fbData) {
             $ionicLoading.hide();
               if (fbData.id) {
                   self.FbLogin(fbData);
               }
               if (fbData == 'unknown') {
                   facebookLogin.fbLoginSuccess().then(function(fbData1) {
                       self.FbLogin(fbData1);
                   }, function(data) {
                       console.log(data);
                   });
               }
           }, function(data) {
               console.log(data);
           });
       };

       self.FbLogin = function(response) {
         var picture='http://graph.facebook.com/' + response.id + '/picture?type=large';
           loginApi.fireApi(
              'fb',
              response.email,
              "",
              picture,
              response.id,
              response.name

           );
       }

    

  self.GLogin = function(){
    $ionicLoading.show();
  	  googleLogin.startLogin().then(function(response) {
               loginApi.fireApi(
                  'gmail',
                  response.email,
                  '',
                  response.picture,
                  response.google_id,
                  response.name
               );
           });
  }
  	
  }





})();