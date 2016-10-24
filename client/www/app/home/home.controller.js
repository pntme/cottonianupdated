(function() {
    'use strict';
    angular.module('cot').controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($state, $localStorage, Image,  configuration , $ionicLoading , $ionicModal, tostService, $scope, ajaxRequest, localStorageService) {
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

        self.Open = function(data, api, msg) {
           $state.go('formdata',{
            FormTitle : data,
            api: api,
            msg: msg
           });
  
        }

        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
  
        self.openProfile = function(){
            self.optionProfile.show();
            $scope.OptionData = localStorageService.get('UserData')[0];
            $scope.OptionData.title = 'Profile';
            if($scope.OptionData.profile_pic){
                $scope.OptionData.image = $scope.OptionData.profile_pic;}
            else{
                $scope.OptionData.image = configuration.ImageUrl + 'user.jpg';
            }
        }
        $scope.hide = function() {
          self.optionProfile.hide();
        }

        $scope.changePic = function() {
             Image.takePhoto1().then(function(blob) {
                FinalFile = blob;
                self.picture = "data:image/jpeg;base64," + Image.binary;
            });
        }

        function FileUpload(blob, title, description) {
            var query = Image.upload({
                file: blob
            });
            query.then(function(data) {
                if (data.status == 200 && data.statusText == "OK") {
                    var filename = data.data.replace(/(\r\n|\n|\r)/gm, "");
                    ajaxRequest.send(FinalApi, {
                        title: self.title,
                        description: self.description,
                        user: user,
                        image: filename,
                        date: moment().unix()
                    }, 'POST').then(function(res) {
                        $ionicLoading.hide();
                        if (res == 1) {
                            tostService.notify('Uploaded successfully', 'top');
                            ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                                console.log(res);
                            });
                            $state.go('tab.home');
                        } else
                            tostService.notify('Failed to submit, Please try again', 'top');

                    });

                } else {
                    $ionicLoading.hide();
                    tostService.notify('Failed to submit, Please try again', 'top');
                }
            }).catch(function(e) {
                console.log(e);
                $ionicLoading.hide();
                tostService.notify('Failed to submit, Please try again', 'top');
            })
        }
    }
})();   