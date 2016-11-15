(function() {
    angular.module('cot').controller('ppCtrl', ppCtrl);

    function ppCtrl(localStorageService, Image, ajaxRequest, tostService, $rootScope, $ionicLoading, configuration, $state) {
        var self = this;
        self.image = 'img/user.jpg';
        self.username = localStorageService.get('UserData')[0].fullname;
        var FinalBlob;
            self.select = function() {
                Image.takePhoto1('Profile photo').then(function(blob) {
                    console.log(blob);
                    self.image = "data:image/jpeg;base64," + Image.binary;
                    FinalBlob = blob;
                });
            }

        self.upload = function() {
            if (FinalBlob) {
                $ionicLoading.show();
                var query = Image.upload({
                    file: FinalBlob
                }, 'changeprofilepic.php');
                query.then(function(data) {
                    $ionicLoading.hide();
                    if (data.status == 200 && data.statusText == "OK") {
                        var filename = data.data.replace(/(\r\n|\n|\r)/gm, "");
                        ajaxRequest.send('changeprofilepic.php', {
                            id: localStorageService.get('UserData')[0].reg_id,
                            image: configuration.ImageUrl + filename
                        }, 'POST').then(function(res) {
                            $ionicLoading.hide();
                            if (res == 1) {
                                localStorageService.get('UserData')[0].profile_pic = configuration.ImageUrl + filename;
                                $rootScope.$emit("profile_changed");
                                $state.go('tab.feed');
                            } else
                                tostService.notify('Faild, please try again', 'top');
                        });
                    } else
                        tostService.notify('Faild, please try again', 'top');
                }).catch(function(e) {
                    console.log(e);
                    $ionicLoading.hide();
                    tostService.notify('Failed to upload image, Please try again', 'top');
                })


            }else
              tostService.notify('You have not selected your profile photo', 'top');

        }

    }

})();