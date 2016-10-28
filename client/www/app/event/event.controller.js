(function() {
    'use strict';
    angular.module('cot').controller('EventCtrl', EventCtrl);

    function EventCtrl(ajaxRequest, configuration, $ionicModal, $scope) {
        var self = this;
        self.spinner=true;

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

        self.doRefresh = function(){
           ajaxRequest.send('fetchevent.php', '', 'GET').then(function(res) {
                self.eventData = res;
                _.forEach(res, function(value) {
                    if (!value.image) {
                        value.image = configuration.DefaultNewsLogo;
                    } else {
                        value.image = configuration.ImageUrl + value.image;
                    }

                     value.date_time = moment.unix(value.date_time).format("DD/MM/YYYY HH:mm");
                });
            }, function(e){
            console.log(e);
                 self.spinner=false;
           });
        }
        self.doRefresh();

        $scope.hide = function() {
            self.option.hide();
        }

        self.cancel = function(){
            $scope.searchingText='';
            self.y = false;
            self.x =false;
        }

        self.showSearch = function(){
            self.y = true;
            self.x=true;
        }

    }
})();