(function() {
    'use strict';
    angular.module('cot').controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($state, $localStorage, Image,  $ionicLoading , $ionicModal, tostService, $scope, ajaxRequest, localStorageService) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;

        self.Go = function(r) {
            $state.go('tab.' + r);
        }

        self.Logout = function() {
            $localStorage.$reset();
            $state.go('login');
        }

        $ionicModal.fromTemplateUrl('app/home/option.html', function($ionicModal) {
            self.option = $ionicModal;

        }, {
            scope: $scope
        });

        self.Open = function(data, api) {
          console.log(data+ ' '+ api)
           $state.go('formdata',{
            FormTitle : data,
            api: api
           });
            // FinalApi = api;
            // console.log(api);
            // $scope.OptionData = data;
            // self.option.show();
            //  document.getElementById('FormTitle').value = '';
            // document.getElementById('FormDesc').value = '';
            // FinalFile = '';
        }

        $scope.publish = function() {
            $ionicLoading.show();
            var title = document.getElementById('FormTitle').value;
            var description = document.getElementById('FormDesc').value;
            if (FinalFile)
                FileUpload(FinalFile, FinalApi, title, description);
            else {
                ajaxRequest.send(FinalApi, {
                    title: title,
                    description: description,
                    user: user
                }, 'POST').then(function(res) {
                    $scope.hide();
                    $ionicLoading.hide();
                    tostService.notify('Uploaded successfully', 'top');
                });

            }
        }

        $scope.hide = function() {
            self.option.hide();
            document.getElementById('FormTitle').value = '';
            document.getElementById('FormDesc').value = '';
            FinalFile = '';

        }

        $scope.select = function() {
            Image.takePhoto1('Profile photo').then(function(blob) {
                FinalFile = blob;
                self.UserPic = "data:image/jpeg;base64," + Image.binary;
            });
        }

        function FileUpload(blob, FinalApi, title, description) {
         var query = Image.upload({
                file: blob   
               });
               query.then(function(data) {
                  if(data.status == 200 && data.statusText == "OK"){
                    var filename = data.data.replace(/(\r\n|\n|\r)/gm,"");
                       ajaxRequest.send(FinalApi, {
                          title: title,
                          description: description,
                          user: user,
                          image : filename  
                       }, 'POST').then(function(res) {
                            $scope.hide();
                            $ionicLoading.hide();
                            tostService.notify('Submitted successfully', 'top');
                      });
                  }
                  else{
                            $scope.hide();
                            $ionicLoading.hide();                   
                    tostService.notify('Failed to submit, Please try again', 'top'); 
                  }
               }).catch(function(e){
                 console.log(e);
                                            $scope.hide();
                            $ionicLoading.hide();
                  tostService.notify('Failed to submit, Please try again', 'top');
               })
        }
    }


})();