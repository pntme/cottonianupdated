(function(){
'use strict';
angular.module('cot').filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
    })
    .filter('name', function(){
    	return function(input) {
      input = input || '';
      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    	}
    })
    .filter('highlight', function($sce) {
     return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
      '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
  }
})
 .filter('Fname', function(){
      return function(input) {
      input = input || '';
      return input.substr(0,input.indexOf(' '));
      }
    })
})();
// console.log();