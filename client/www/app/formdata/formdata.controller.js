(function() {
    'use strict';
    angular.module('cot').controller('FormdataCtrl', FormdataCtrl);

    function FormdataCtrl($state, $localStorage, Image, $ionicLoading, $stateParams,
        $ionicModal, tostService, $scope, ajaxRequest, video, $sce, $crypto, localStorageService, location, configuration) {
        var self = this;
        var FinalApi, FinalFile;
        var user = localStorageService.get('UserData')[0].email;
        var fullname = localStorageService.get('UserData')[0].fullname;
        self.navtitle = "Create " + $stateParams.FormTitle;
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
                    date: moment().unix(),
                    fullname: fullname
                }, 'POST').then(function(res) {
                    $ionicLoading.hide();
                    if (res == 1) {
                        tostService.notify('Uploaded successfully', 'top');
                        ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                            console.log(res);
                        });
                        $state.go('stuff',{
                            title: $stateParams.FormTitle
                        });
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
                        date: moment().unix(),
                        fullname: fullname
                    }, 'POST').then(function(res) {
                        $ionicLoading.hide();
                        if (res == 1) {
                            tostService.notify('Uploaded successfully', 'top');
                            ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                                console.log(res);
                            });
                                                    $state.go('stuff',{
                            title: $stateParams.FormTitle
                        });
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



        self.locationHeading = 'At your location';
        self.locationSwitched = function(value){
            if(value == true)
                self.locationHeading = 'At other location';
            else
               self.locationHeading = 'At your location'; 

        }

       self.location = 'Location';
       self.locationAV = false;
       self.FindAddress = function(){
         self.locationSpinner = true;
         self.locationRefresher = false;
        location.nearBy().then(function(res) {
            var lat = res.coords.latitude;
            var lng = res.coords.longitude;
            ajaxRequest.GoogleApi(configuration.GeoCoder + 'latlng=' + lat + ',' + lng + '&key=' + configuration.googleApiKey, '', 'GET').then(function(res1) {
                self.locationAV = true;
                self.location = res1.results[1].formatted_address;
                self.locationSpinner = false;
            });
        }).catch(function(e) {
            self.locationSpinner = false;
            self.locationRefresher = true;
            console.log(e);
        })
       } 
       self.FindAddress();



       self.mediaChanged = function(value){
        if(value == 'image')
            $scope.select();
        else if(value == 'video')
            $scope.video();
       }


           $scope.video = function() {
            Image.takevideo($stateParams.FormTitle).then(function(blob) {
                FinalFile = blob;
                 self.picture = '';
                console.log(Image.binary)
                self.picture = Image.binary;
                video.play(self.picture);
                // self.picture = 'http://player.vimeo.com/external/85569724.sd.mp4?s=43df5df0d733011263687d20a47557e4';
            });
        }

    }

})();