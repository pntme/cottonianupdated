(function() {
    angular.module('cot').controller('sidemenuCtrl', sidemenuCtrl);

    function sidemenuCtrl($scope, $ionicSideMenuDelegate,$rootScope, $ionicPopup , Image, $ionicLoading, ajaxRequest, tostService,$ionicModal, configuration, $localStorage, $state, localStorageService) {
        var self = this;
       $rootScope.$on('profile_changed', function(){
       	console.log('kkkk')
	       	if (localStorageService.get('UserData')[0].profile_pic)
	           $scope.image = localStorageService.get('UserData')[0].profile_pic;
	        else
	           $scope.image = configuration.ImageUrl + 'user.jpg';
       });


        $scope.opensidemenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.Logout = function() {
            $localStorage.$reset();
            $state.go('login');
        }


           $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        $scope.openProfile = function() {
        	console.log('hfjhd')
            self.optionProfile.show();
            $scope.OptionData = localStorageService.get('UserData')[0];
            $scope.OptionData.title = 'Profile';
            if ($scope.OptionData.profile_pic) {
                $scope.OptionData.image = $scope.OptionData.profile_pic;
            } else {
                $scope.OptionData.image = configuration.ImageUrl + 'user.jpg';
            }
        }
        $scope.hide = function() {
            self.optionProfile.hide();
        }

          $scope.select = function() {
                      Image.takePhoto1('Profile photo').then(function (blob) {
                        console.log(blob);
                      self.UserPic = "data:image/jpeg;base64," + Image.binary;
                      self.upload(blob);
                   });
        }
           
         self.upload = function(blob) {
          $ionicLoading.show();
          console.log(blob);
         var query = Image.upload({
                file: blob   
               }, 'changeprofilepic.php');
               query.then(function(data) {
                 $ionicLoading.hide();
                  if(data.status == 200 && data.statusText == "OK"){
                    var filename = data.data.replace(/(\r\n|\n|\r)/gm, "");
                    ajaxRequest.send('changeprofilepic.php', {
                        id: localStorageService.get('UserData')[0].reg_id,
                        image: configuration.ImageUrl+filename
                    }, 'POST').then(function(res) {
                        $ionicLoading.hide();
                        if(res == 1){
                            localStorageService.get('UserData')[0].profile_pic = configuration.ImageUrl+filename;
                            $scope.OptionData.image = configuration.ImageUrl+filename;
                        }
                        else
                            alert('Faild, please try again');
                    });
                  }else
                      alert('Faild, please try again');
               }).catch(function(e){
                 console.log(e);
                 $ionicLoading.hide();
                 alert('Failed to upload image, Please try again', 'top');
               })
        }

        $scope.AddBatch = function() {
            $scope.Modeldata = {};
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="Modeldata.bno" placeholder="Batch number">',
                title: 'Enter Batch number',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.Modeldata.bno)
                            e.preventDefault();
                        else {
                            $ionicLoading.show();
                            ajaxRequest.send('updateinfo.php', {
                                'reg_id': localStorageService.get('UserData')[0].reg_id,
                                'bno': $scope.Modeldata.bno
                            }, 'POST').then(function(res) {
                                console.log(res);
                                $ionicLoading.hide();
                                if (res == 0)
                                    tostService.notify('Failed to update data, Please try agin', 'top');
                                else {
                                    localStorageService.set('UserData', res);
                                    $scope.OptionData.school_batch = $scope.Modeldata.bno;
                                }
                            })
                        }
                    }
                }]
            });
        }
        $scope.ChangePassword = function() {
            $scope.ModeldataPass = {};
            var PassPopup = $ionicPopup.show({
                template: '<input type="password" ng-model="ModeldataPass.newPass" placeholder="New password"><br/><input type="password" ng-model="ModeldataPass.Cpass" placeholder="Confirm password">',
                title: 'Change password',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.ModeldataPass.newPass || !$scope.ModeldataPass.Cpass) {
                            e.preventDefault();
                        } else {
                            if ($scope.ModeldataPass.newPass == $scope.ModeldataPass.Cpass) {
                                $ionicLoading.show();
                                ajaxRequest.send('changepassword.php', {
                                    'reg_id': localStorageService.get('UserData')[0].reg_id,
                                    'password': $scope.ModeldataPass.newPass
                                }, 'POST').then(function(res) {
                                      $ionicLoading.hide();
                                      if(res == 1)
                                        tostService.notify('Your password successfully changed','top');
                                      else
                                        tostService.notify('Failed to update, Please try again','top');

                                });
                            } else {
                                tostService.notify("Password does'nt match", 'top');
                                e.preventDefault();
                            }
                            return $scope.ModeldataPass.newPass;
                        }
                    }
                }]
            });
        }
        
        $scope.Go = function(title){
            $state.go('stuff',{"title": title})
        }



    }
})();