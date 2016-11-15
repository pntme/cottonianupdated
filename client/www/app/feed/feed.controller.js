(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);

    function feedCtrl(ajaxRequest, configuration, video, $ionicPopup, $ionicLoading, $cordovaFileTransfer, formatData, $state, $ionicModal, $ionicScrollDelegate, $scope) {
        var self = this;
        self.spinner = true;
        self.noMoreItemsAvailable = false;

        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });
        self.ShowDetails = function(data) {
            $scope.OptionData = data;
            self.option.show();
        }

        $scope.showConfirm = function(url) {
            console.log(url);
            var confirmPopup = $ionicPopup.confirm({
                template: 'Video downloaded, successfully',
                cancelText: 'Watch later',
                okText: 'Watch now'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    self.option.hide();
                    $state.go('player', {
                        video: url
                    });
                } else {
                    console.log('You are not sure');
                }
            });
        };


        $scope.hide = function() {
            self.option.hide();
        }

        self.doRefresh = function() {
            ajaxRequest.send('fetchhome.php', '', 'GET').then(function(res) {
                self.spinner = false;
                if (res == 2)
                    self.dataNotavailable = true;
                else
                    self.feedData = formatData.format(res);
            }, function(e) {
                console.log(e);
                self.spinner = false;
            });
        }
        self.doRefresh();

        self.cancel = function() {
            self.y = false;
            self.x = false;
            $scope.searchingText = '';
        }

        self.showSearch = function() {
            self.y = true;
            self.x = true;
        }

        $scope.downloadFile = function(obj) {
            obj.downloading = true;
            var url = configuration.ApiHost + 'video/' + obj.video;
            var filename = url.split("/").pop();
            var targetPath = "sdcard/cottonian/" + filename;
            var trustHosts = true
            var options = {};
            $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function(result) {
                    console.log(result);
                    obj.downloading = false;
                    obj.videoAvailable = true;
                    var frameid = 'videoframe' + obj.id;
                    var v = "<video id=" + "'" + frameid + "'" + "controls class='video-responsive'></video>";
                    document.querySelector("#video" + obj.id).innerHTML = v;
                    video.playDownloaded(result.nativeURL, frameid);
                }, function(error) {
                    obj.downloading = false;
                    console.log(error)
                }, function(progress) {
                    if (progress.lengthComputable) {
                        var perc = Math.floor(progress.loaded / progress.total * 100);
                        console.log(perc)
                    }
                });
        }



        self.accept = function(data){
            console.log(data);
        }
    }
})();   