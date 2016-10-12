(function(){
  'use strict';
  angular.module('cot').controller('LoginCtrl', LoginCtrl);
  function LoginCtrl(ajaxRequest){
    var self = this;
    self.DoLogin = function(){
       console.log(self.email+self.password)
       

    }

  	
  }



})();