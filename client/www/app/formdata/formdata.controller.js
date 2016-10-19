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
            if (FinalFile)
                FileUpload(FinalFile, FinalApi, self.title, self.description);
            else {
                ajaxRequest.send(FinalApi, {
                    title: self.title,
                    description: self.description,
                    user: user
                }, 'POST').then(function(res) {
                    $ionicLoading.hide();
                    if(res == 0)
                       tostService.notify('Failed to submit, Please try again', 'top');
                    else{
                       tostService.notify('Uploaded successfully', 'top');
                       $state.go('tab.home');
                    }

                });

            }
        }

        $scope.select = function() {
            Image.takePhoto1('Profile photo').then(function(blob) {
                FinalFile = blob;
                self.picture = "data:image/jpeg;base64," + Image.binary;
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
                          title: self.title,
                          description: self.description,
                          user: user,
                          image : filename  
                       }, 'POST').then(function(res) {
                            $ionicLoading.hide();
                            if(res == 1)
                               tostService.notify('Failed to submit, Please try again', 'top');
                            else{
                                tostService.notify('Submitted successfully', 'top');
                                $state.go('tab.home');
                             }   
                              
                      });
                            
                  }
                  else{
                          
                    $ionicLoading.hide();                   
                    tostService.notify('Failed to submit, Please try again', 'top'); 
                  }
               }).catch(function(e){
                  console.log(e);
                  $ionicLoading.hide();
                  tostService.notify('Failed to submit, Please try again', 'top');
               })
        }


    }

})();