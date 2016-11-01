(function(){
  'use strict';
  angular.module('cot').controller('LoginCtrl', LoginCtrl);
  function LoginCtrl(ajaxRequest, facebookLogin, googleLogin, $ionicSideMenuDelegate, loginApi, $state, tostService, $ionicLoading){
    var self = this;
    $ionicSideMenuDelegate.canDragContent(false);
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
                tostService.notify('Operation failed, Review your network settings','top');
                $ionicLoading.hide();
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
  	  googleLogin.startLogin().then(function(response) {
          $ionicLoading.show();
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