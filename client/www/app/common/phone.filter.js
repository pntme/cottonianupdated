(function(){
'use strict';
angular.module('cot').filter('phone', function() {
    return function(input) {
      console.log(input)
      return input;
      
     // return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
    })
    
})();