(function() {
    'use strict';
    angular.module('cot').controller('jobCtrl', jobCtrl);
    function jobCtrl(ajaxRequest, configuration, $ionicModal, $scope, formatData, $q) {
        var self = this;
        self.spinner = true;
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
        self.doRefresh = function() {
            ajaxRequest.send('jobs.php', '', 'GET').then(function(res) {
                self.spinner=false;
                if(res == 2)
                     self.dataNotavailable = true;
                else
                    self.jobData = formatData.format(res);
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