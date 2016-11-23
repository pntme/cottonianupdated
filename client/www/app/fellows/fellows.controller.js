(function(){
'use strict';
angular.module('cot').controller('fellowsCtrl', fellowsCtrl);
function fellowsCtrl( $scope, ajaxRequest, $ionicLoading){
  var self = this;
  $ionicLoading.show();
     self.cancel = function() {
            self.y = false;
            self.x = false;
            $scope.searchingText = '';
        }
        self.showSearch = function() {
            self.y = true;
            self.x = true;
        }
       ajaxRequest.send('fellows.php','','GET').then(function(res){
        $ionicLoading.hide();
           _.forEach(res, function(value) {
               if(!value.profile_pic){
                  if(value.socialpic){
                    value.profile_pic = value.socialpic;
                  }
               }


           });
       	self.fellowsData = res;
       }).catch(function(e){
        $ionicLoading.hide();
       })
}
})();