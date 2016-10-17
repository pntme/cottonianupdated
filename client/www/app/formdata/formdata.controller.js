(function() {
    'use strict';
    angular.module('cot').controller('FormdataCtrl', FormdataCtrl);

    function FormdataCtrl($state, $localStorage, Image,  $ionicLoading , $stateParams ,
    	$ionicModal, tostService, $scope, ajaxRequest, localStorageService) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;
        console.log($stateParams)
        self.navtitle = $stateParams.FormTitle;
        var FinalApi = $stateParams.api;
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
                    $ionicLoading.hide();
                    tostService.notify('Uploaded successfully', 'top');
                });

            }
        }


        $scope.select = function() {
            Image.takePhoto1('Profile photo').then(function(blob) {
                FinalFile = blob;
                self.UserPic = "data:image/jpeg;base64," + Image.binary;
            });
        }

        function FileUpload(blob,  title, description) {
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