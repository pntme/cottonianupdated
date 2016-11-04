(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);

    function feedCtrl(ajaxRequest, configuration, formatData, $state, $ionicModal, $ionicScrollDelegate,  $scope) {
        var self = this;
        self.spinner = true;
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
           ajaxRequest.send('fetchhome.php','', 'GET').then(function(res) {  
                 self.spinner=false;
                if(res == 2)
                     self.dataNotavailable = true;
                else
                    self.feedData = formatData.format(res);
           }, function(e){
            console.log(e);
                 self.spinner=false;
           });
        }
        self.doRefresh();   

        self.cancel = function(){
            self.y = false;
            self.x =false;
            $scope.searchingText='';
        }

        self.showSearch = function(){
            self.y = true;
            self.x=true;
        }
    }
})();