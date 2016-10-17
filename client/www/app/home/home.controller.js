(function() {
    'use strict';
    angular.module('cot').controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($state, $localStorage, Image,  configuration , $ionicLoading , $ionicModal, tostService, $scope, ajaxRequest, localStorageService) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;

        self.Go = function(r) {
            $state.go('tab.' + r);
        }

        self.Logout = function() {
            $localStorage.$reset();
            $state.go('login');
        }

        $ionicModal.fromTemplateUrl('app/home/option.html', function($ionicModal) {
            self.option = $ionicModal;

        }, {
            scope: $scope
        });

        self.Open = function(data, api) {
           $state.go('formdata',{
            FormTitle : data,
            api: api
           });
  
        }

        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
  
        self.openProfile = function(){
            self.optionProfile.show();
            $scope.OptionData = localStorageService.get('UserData')[0];
            $scope.OptionData.title = 'Profile';
            if($scope.OptionData.profile_pic)
                $scope.OptionData.image = $scope.OptionData.profile_pic;
            else
                $scope.OptionData.image = configuration.ImageUrl + 'user.jpg';
            

        }

        $scope.hide = function() {
          self.optionProfile.hide();
        }







    }


})();