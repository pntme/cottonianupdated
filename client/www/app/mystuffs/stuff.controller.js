(function() {
    'use strict';
    angular.module('cot').controller('stuffCtrl', stuffCtrl);
    function stuffCtrl(ajaxRequest, configuration, $state, $ionicModal, $scope, formatData, $q, $stateParams, localStorageService) {
        var self = this;
        self.title = "My "+$stateParams.title;
        self.subject =  $stateParams.title;
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
            ajaxRequest.send('mystuff.php?type='+$stateParams.title+'&user='+localStorageService.get('UserData')[0].email, '', 'GET').then(function(res) {
                if(res == 2){
                    self.spinner = false;
                    self.dataNotavailable = true;
                }
                else
                   self.stuffData = formatData.format(res);
                   
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

        self.Open = function(data, api, msg) {
            $state.go('formdata', {
                FormTitle: data,
                api: api,
                msg: msg
            });

        }

        self.delete = function(data){
            console.log(data)
        }
        
    }
})();