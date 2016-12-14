(function() {
    'use strict';
    angular.module('cot').controller('FormdataCtrl', FormdataCtrl);

    function FormdataCtrl($state, $localStorage, Image, $ionicActionSheet, $ionicLoading, $stateParams, $ionicHistory,
        $ionicModal, tostService, $timeout, $cordovaFileTransfer, $scope, ajaxRequest, video, $sce, $crypto, localStorageService, location, configuration) {
        var self = this;
        var FinalApi, FinalImg, FinalVideo, FinalLocation;
        var user = localStorageService.get('UserData')[0].email;
        var fullname = localStorageService.get('UserData')[0].fullname;
        self.navtitle = "Create " + $stateParams.FormTitle;
        self.switchedHeading = false;
        var FinalApi;
    $scope.$emit('FormOpen');
        $scope.publish = function() {
            if (self.title && self.description) {
                if (self.switchedHeading == false && self.location == 'Location') {
                    tostService.notify('Unable to fetch location, Make sure location is on and then click on refresh icon', 'top');
                } else if (self.switchedHeading == true && !self.customLocation) {
                    tostService.notify('Enter your location', 'top');
                } else {
                    if (!decideLocation)
                        FinalLocation = self.location;
                    else
                        FinalLocation = self.customLocation;
                    $ionicLoading.show();
                    if (FinalImg)
                        FileUpload(FinalImg, FinalApi, self.title, self.description);
                    else if (self.video) {
                        $scope.uploadVideo();
                    } else {
                        ajaxRequest.send(FinalApi, {
                            title: $crypto.encrypt(self.title),
                            description: $crypto.encrypt(self.description),
                            user: user,
                            date: moment().unix(),
                            fullname: fullname,
                            location: FinalLocation
                        }, 'POST').then(function(res) {
                            $ionicLoading.hide();
                            if (res == 1) {
                                tostService.notify('Uploaded successfully', 'top');
                                ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                                    console.log(res);
                                });
                                $state.go('tab.feed');
                            } else
                                tostService.notify('Failed to submit, Please try again', 'top');
                        });
                    }
                }
            } else {
                tostService.notify('Title, Description & Location fields should not be empty', 'top');
            }
        }

        $scope.select = function() {
            Image.takePhoto1($stateParams.FormTitle).then(function(blob) {
                FinalImg = blob;
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
                        fullname: fullname,
                        location: FinalLocation,
                        id: $stateParams.id
                    }, 'POST').then(function(res) {
                        $ionicLoading.hide();
                        if (res == 1) {
                            tostService.notify('Uploaded successfully', 'top');
                            ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                                console.log(res);
                            });
                            $state.go('tab.feed');
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


        var decideLocation;
        self.locationHeading = 'At your location';
        self.locationSwitched = function(value) {
            if (value == true) {
                decideLocation = true;
                self.locationHeading = 'At other location';
            } else {
                decideLocation = false;
                self.locationHeading = 'At your location';
            }
        }

        self.location = 'Location';
        self.locationAV = false;
        self.FindAddress = function() {
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



        self.mediaChanged = function(value) {
            if (value == 'image') {
                TempVideo = '';
                $scope.select();
                document.querySelector("#videoArea").innerHTML = '';
            } else if (value == 'video')
                $scope.video();
            else {
                TempVideo = '';
                self.picture = '';
                self.video = '';
                document.querySelector("#videoArea").innerHTML = '';
            }
        }

        $scope.video = function() {
            self.picture = '';
            var v = "<video id='video'  controls class='video-responsive'></video>";
            document.querySelector("#videoArea").innerHTML = v;
            Image.takevideo($stateParams.FormTitle).then(function(blob) {
                self.video = Image.binary;
                video.play(self.video);
            });
        }

        $scope.uploadVideo = function() {
            var url = configuration.ApiHost + "videoupload.php";
            var targetPath = self.video;
            var filename = targetPath.split("/").pop();
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "video/mp4"
            };
            $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
                if (result.responseCode == 200 && result.response) {
                    $ionicLoading.hide();
                    SendOtherData(result.response);
                } else {
                    $ionicLoading.hide();
                    tostService.notify('Uploading failed, Plesae try again');
                }

            }, function(err) {
                $ionicLoading.hide();
                console.log(err);
            }, function(progress) {
                $timeout(function() {
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    if (Math.round($scope.downloadProgress) == 100)
                        $scope.downloadProgress = 99;
                    $ionicLoading.show({
                        template: Math.round($scope.downloadProgress) + '%'
                    });
                })
            });
        }

        function SendOtherData(filename) {
            ajaxRequest.send(FinalApi, {
                title: $crypto.encrypt(self.title),
                description: $crypto.encrypt(self.description),
                user: user,
                video: filename,
                date: moment().unix(),
                fullname: fullname,
                location: FinalLocation,
                id: $stateParams.id
            }, 'POST').then(function(res) {
                $ionicLoading.hide();
                if (res == 1) {
                    tostService.notify('Uploaded successfully', 'top');
                    ajaxRequest.send("push.php?msg=" + self.description + "&title=" + $stateParams.msg, '', 'GET').then(function(res) {
                        console.log(res);
                    });
                    $state.go('tab.feed');
                } else
                    tostService.notify('Failed to submit, Please try again', 'top');
            });

        }



        self.edit = 0;
        var TempPic, TempVideo;
        if ($stateParams.id) {
            FinalApi = 'edit.php';
            self.edit = 1;
            var editableData = localStorageService.get('EditData');
            console.log(editableData)
            self.navtitle = 'Edit ' + editableData.type;
            self.title = editableData.title;
            self.description = editableData.description;
            if (editableData.image == configuration.DefaultNewsLogo || editableData.image == configuration.DefaultJobLogo || editableData.image == configuration.DefaultNewsLogo) {} else {
                self.media = 'image';
                self.picture = editableData.image;
                TempPic = editableData.image;
            }

            if (editableData.video) {
                console.log(editableData.video)
                self.picture = '';
                self.media = 'video';
                TempVideo = configuration.ApiHost + 'video/' + editableData.video;
                var v = "<video id='video'  controls class='video-responsive'></video>";
                document.querySelector("#videoArea").innerHTML = v;
                video.play(TempVideo);
            }
        } else {
            FinalApi = $stateParams.api;
        }




        self.update = function() {
            if (self.title && self.description) {
                if (self.switchedHeading == false && self.location == 'Location') {
                    tostService.notify('Unable to fetch location, Make sure location is on and then click on refresh icon', 'top');
                } else if (self.switchedHeading == true && !self.customLocation) {
                    tostService.notify('Enter your location', 'top');
                } else {
                    if (!decideLocation)
                        FinalLocation = self.location;
                    else
                        FinalLocation = self.customLocation;
                    $ionicLoading.show();
                    if (FinalImg)
                        FileUpload(FinalImg, FinalApi, self.title, self.description);
                    else if (self.video) {
                        $scope.uploadVideo();
                    } else {
                        if (self.picture) {
                            if (self.picture != TempPic)
                                FileUpload(FinalImg, FinalApi, self.title, self.description);
                            else {
                                ajaxRequest.send(FinalApi, {
                                    title: $crypto.encrypt(self.title),
                                    description: $crypto.encrypt(self.description),
                                    location: self.location,
                                    deletePic: 0,
                                    id: $stateParams.id,
                                    deleteVideo: 1
                                }, 'POST').then(function(data) {
                                    afterApi(data);
                                })
                            }
                        } else if (TempVideo) {
                            ajaxRequest.send(FinalApi, {
                                title: $crypto.encrypt(self.title),
                                description: $crypto.encrypt(self.description),
                                location: self.location,
                                id: $stateParams.id,
                                deleteVideo: 0
                            }, 'POST').then(function(data) {
                                afterApi(data);
                            })
                        } else if (self.video) {
                            $scope.uploadVideo();
                        } else {
                            ajaxRequest.send(FinalApi, {
                                title: $crypto.encrypt(self.title),
                                description: $crypto.encrypt(self.description),
                                location: self.location,
                                deletePic: 1,
                                id: $stateParams.id,
                                deleteVideo: 1
                            }, 'POST').then(function(data) {
                                afterApi(data);
                            })
                        }
                    }
                }
            } else {
                tostService.notify('Title, Description & Location fields should not be empty', 'top');
            }


        }


        function afterApi(data) {
            $ionicLoading.hide();
            if (data == 1) {
                tostService.notify('Updated', 'top');
                $state.go('tab.feed');
            } else
                tostService.notify('Failed', 'top');
        }

        self.canceled = function() {
            $ionicHistory.goBack();
        }


        self.MediaClicked = function() {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: 'Picture'
                }, {
                    text: 'Video'
                }],
                titleText: 'Select Media',
                cancelText: 'Cancel',
                cancel: function() {
                     self.mediaChanged('none');
                },
                buttonClicked: function(index) {
                    if(index == 0)
                          self.mediaChanged('image');
                    else if(index == 1)
                          self.mediaChanged('video');  
                    return true;
                }
            });

        };

    }
})();