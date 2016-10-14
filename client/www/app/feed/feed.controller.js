(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);
    function feedCtrl(ajaxRequest, configuration, $state, $ionicModal, $scope) {
        var self = this;
        ajaxRequest.send('fetchhome.php', '', 'GET').then(function(res) {
            self.feedData = res;
            _.forEach(res, function(value) {
                if (!value.image)
                    value.image = configuration.DefaultNewsLogo;
                    value.date_time = moment(value.date_time).add(24, 'hours').format('LLL');
            });
        });

    $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });
        self.ShowDetails = function(data) {
            $scope.OptionData = data;
            self.option.show();
        }

        $scope.hide = function() {
            self.option.hide();
        }
    }
})();