(function(){
  'use strict';
  angular.module('cot').controller('SignupCtrl', SignupCtrl);
  function SignupCtrl(ajaxRequest){
    var self = this;
    self.DoSignup = function(){
       console.log(self.email+self.password)
       

    }

  	
  }



})();