(function(){
 'use strict';
 angular.module('cot').controller('HomeCtrl', HomeCtrl);
 function HomeCtrl($state, $localStorage, $ionicModal, $scope){
 	var self =this;
 	self.Go = function(r){
 		$state.go('tab.'+r);
 	}
 	
 	self.Logout = function(){
 		$localStorage.$reset();
        $state.go('login');
 	}

 	 $ionicModal.fromTemplateUrl('app/home/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });
        self.Open = function(data) {
            $scope.OptionData = data;
            console.log(data)
            self.option.show();
        }

        $scope.hide = function() {
            self.option.hide();
        }
 }


})();