(function() {
    'use strict';
    angular.module('cot').controller('jobCtrl', jobCtrl);

    function jobCtrl(ajaxRequest, configuration, $ionicModal, $scope) {
        var self = this;
        ajaxRequest.send('jobs.php', '', 'GET').then(function(res) {
            self.jobData = res;
            _.forEach(res, function(value) {
                if (!value.image) {
                    value.image = configuration.DefaultNewsLogo;
                } else {
                    value.image = configuration.ImageUrl + value.image;
                }

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