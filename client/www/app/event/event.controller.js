(function(){
'use strict';
angular.module('cot').controller('EventCtrl', EventCtrl);
function EventCtrl(ajaxRequest, configuration, $ionicModal, $scope){
	var self =this;
	   ajaxRequest.send('fetchevent.php', '', 'GET').then(function(res) {
            self.eventData = res;
            _.forEach(res, function(value) {
                if (!value.image)
                    value.image = configuration.DefaultEventLogo;
            });
        });

	       $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });
        self.ShowDetails = function(data) {
            $scope.OptionData = data;
            $scope.HidePublisher = true;
            self.option.show();
        }

        $scope.hide = function() {
            self.option.hide();
        }
}
})();