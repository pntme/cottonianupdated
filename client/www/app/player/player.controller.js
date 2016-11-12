(function(){
'use strict';
angular.module('cot').controller('playerCtrl', playerCtrl);
function playerCtrl($stateParams){
 var self = this;
 self.videosrc = $stateParams.video;
}


})();