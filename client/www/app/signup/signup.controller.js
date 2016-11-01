(function(){
  'use strict';
  angular.module('cot').controller('SignupCtrl', SignupCtrl);
  function SignupCtrl(ajaxRequest, tostService, $state, $scope, $ionicLoading, localStorageService){
    var self = this;
    self.DoSignup = function(){
       $ionicLoading.show();
       ajaxRequest.send('signup.php', {
         fullname: self.fname,
         email : self.email,
         password: self.password,
         batch: self.bno
       }, 'POST').then(function(res){
         $ionicLoading.hide();
          if(res == 0)
           tostService.notify("Something went wrong, Please try again", 'top');
          else if(res == 2)
            tostService.notify("You are already registered, Please login", 'top');	
          else
            $scope.$broadcast('profile_changed');
            localStorageService.set("UserData", res);
            $state.go('tab.home')
       });
       

    }

  	
  }



})();