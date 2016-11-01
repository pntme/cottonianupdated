(function() {
    'use strict';
    angular.module('cot').controller('FormdataCtrl', FormdataCtrl);

    function FormdataCtrl($state, $localStorage, Image, $ionicLoading, $stateParams,
        $ionicModal, tostService, $scope, ajaxRequest, $crypto, localStorageService) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;
        self.navtitle = $stateParams.FormTitle;
        var FinalApi = $stateParams.api;
        $scope.publish = function() {
            $ionicLoading.show();
            if (FinalFile)
                FileUpload(FinalFile, FinalApi, self.title, self.description);
            else {
                ajaxRequest.send(FinalApi, {
                    title: $crypto.encrypt(self.title),
                    description: $crypto.encrypt(self.description),
                    user: user,
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

            }
        }

        $scope.select = function() {
            Image.takePhoto1($stateParams.FormTitle).then(function(blob) {
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
                        title: $crypto.encrypt(self.title),
                        description: $crypto.encrypt(self.description),
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