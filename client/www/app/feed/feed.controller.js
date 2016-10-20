(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);

    function feedCtrl(ajaxRequest, configuration, $state, $ionicModal, $ionicScrollDelegate,  $scope) {
        var self = this;
        self.noMoreItemsAvailable = false;
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

        self.doRefresh = function(){
             ajaxRequest.send('fetchhome.php', '', 'GET').then(function(res) {
            self.feedData = res;
            _.forEach(res, function(value) {
                if (!value.image) {
                    value.image = configuration.DefaultNewsLogo;
                } else {
                    value.image = configuration.ImageUrl + value.image;
                }

                value.date_time = moment(value.date_time).add(24, 'hours').format('LLL');
            });
         });

        }

        self.loadMore = function(){
            console.log('came')
            $ionicScrollDelegate.resize();  
            if($scope.i)
                self.noMoreItemsAvailable = true;
        }
        self.doRefresh();
    }
})();