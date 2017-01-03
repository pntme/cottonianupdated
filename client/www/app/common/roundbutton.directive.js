(function(){
	"use strict";
	angular.module('cot').directive('round', round);
	function round(){
        return{
		 	restrict: 'E',
		 	templateUrl: 'app/common/round.html',
		 	controller: function($scope, $state){
                        $scope.Open = function(data, api, msg) {
				            $state.go('formdata', {
				                FormTitle: data,
				                api: api,
				                msg: msg
				            });

				        }
		 	}
       }
	}
})();