(function() {
    'use strict';
    angular.module('cot').controller('stuffCtrl', stuffCtrl);
    function stuffCtrl(ajaxRequest, tostService, $ionicLoading, configuration, $state, $ionicModal, $ionicPopup, $scope, formatData, $q, $stateParams, localStorageService) {
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
                $ionicLoading.hide();
                if(res == 2){
                    self.spinner = false;
                    self.dataNotavailable = true;
                }
                else
                   self.stuffData = formatData.format(res);
                   
            }, function(e){
            console.log(e);
                 $ionicLoading.hide();
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
         var selected =[];
         self.select = function (data) {
            var index = selected.indexOf(data.id);
            if (index > -1) {
               selected.splice(index, 1);
                data.selected = false;
            } else {
                selected.push(data.id);
                data.selected = true;
            }

            if(selected.length  == 0)
                self.showDelete = false;
            else
                self.showDelete = true;
        }


        self.delete = function(){
              var confirmPopup = $ionicPopup.confirm({
                   title: 'Warning',
                   template: 'Selected items will be deleted permanently'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                    $ionicLoading.show();
                     ajaxRequest.send('deletestuff.php',{
                        ids: selected
                     }, 'POST').then(function(res){
                        if(res == 1){
                            tostService.notify("Deleted successfully",'top');
                            self.stuffData = '';
                            self.doRefresh();
                        }else{
                            tostService.notify("Operation failed, Please try again",'top');
                        }
                     });
                   } else {
                     console.log('You are not sure');
                   }
                 });
        }

    }
})();