(function() {
    'use strict';
    angular.module('cot').controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($state, $localStorage, Image, configuration, $ionicLoading, $ionicPopup, $timeout, $ionicModal, tostService, $scope, ajaxRequest, localStorageService) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;
        $scope.AddBatch = {
            AddBatch: ''
        }
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
            $state.go('formdata', {
                FormTitle: data,
                api: api,
                msg: msg
            });

        }
        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        self.openProfile = function() {
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
                                    $scope.OptionData = res[0];
                                    $scope.OptionData.title = 'Profile';
                                    if ($scope.OptionData.profile_pic) {
                                        $scope.OptionData.image = $scope.OptionData.profile_pic;
                                    } else {
                                        $scope.OptionData.image = configuration.ImageUrl + 'user.jpg';
                                    }


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
    }
})();