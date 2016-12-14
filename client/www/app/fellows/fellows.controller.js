(function(){
'use strict';
angular.module('cot').controller('fellowsCtrl', fellowsCtrl);
function fellowsCtrl( $scope, ajaxRequest, $ionicLoading, $ionicModal, configuration){
  var self = this;
   var OfflineData = ajaxRequest.OfflineData('fellows.php');
        if(OfflineData){
            _.forEach(OfflineData, function(value) {
               if(!value.profile_pic){
                  if(value.socialpic){
                    value.profile_pic = value.socialpic;
                  }else{
                    value.profile_pic = 'img/user.jpg';
                  }
               }
           });
        }
         else
            $ionicLoading.show();       


       $scope.$on('SearchStarted', function(event, data){
            $scope.searchingText=data;
            if(data)
               $scope.subheader = 'has-subheader';
            else
              $scope.subheader='';
        });




     
        self.cancel = function() {
            self.y = false;
            self.x = false;
            $scope.searchingText = '';
        }
        $scope.hide = function() {
            self.optionProfile.hide();
        }
         
        $ionicModal.fromTemplateUrl('app/common/option2.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        
        self.OpenProfile = function(data){
          console.log(data);
          self.optionProfile.show();
          $scope.OptionData = data;
          $scope.OptionData.title = 'Profile';
        }

        self.showSearch = function() {
            self.y = true;
            self.x = true;
        }

       ajaxRequest.send('fellows.php','','GET', 'NeedOffline').then(function(res){
        $ionicLoading.hide();
           _.forEach(res, function(value) {
               if(!value.profile_pic){
                  if(value.socialpic){
                    value.profile_pic = value.socialpic;
                  }else{
                    value.profile_pic = 'img/user.jpg';
                  }
               }
           });
           
       	self.fellowsData = res;
       }).catch(function(e){
        $ionicLoading.hide();
       })
}
})();