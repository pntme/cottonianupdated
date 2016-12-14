(function(){
'use strict';
angular.module('cot').directive('focusme', focusme);
function focusme(  $timeout){
  return {
    link: function(scope, element, attrs) {
    	console.log(element)
      $timeout(function() {
        element[0].focus(); 
      });
    }
  };
}
})();