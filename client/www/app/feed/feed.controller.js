(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);

    function feedCtrl(ajaxRequest, configuration, video, $ionicPopup, localStorageService, $ionicLoading, $cordovaFileTransfer, formatData, $state, $ionicModal, $ionicScrollDelegate, $scope) {
        var self = this;
        self.spinner = true;
        self.noMoreItemsAvailable = false;
        self.myid = localStorageService.get('UserData')[0].id;
        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });
        var OfflineData = ajaxRequest.OfflineData('fetchhome.php');
        if(OfflineData)
           self.feedData = formatData.format(OfflineData);        
        
        self.ShowDetails = function(data) {
            $scope.OptionData = data;
            self.option.show();
        }

        $scope.showConfirm = function(url) {
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
    
                }
            });
        };


        $scope.hide = function() {
            self.option.hide();
        }

        self.doRefresh = function() {
            ajaxRequest.send('fetchhome.php', '', 'GET', 'NeedOffline').then(function(res) {
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
            data.accepted = true;
            data.accept.push(localStorageService.get('UserData')[0].reg_id);
            ajaxRequest.send('accept.php?id='+localStorageService.get('UserData')[0].fullname +'&pid=' + data.id  + '&type=accept', '', 'GET').then(function(res){
            });
        }

        self.apply = function(data){
            data.applied = true;
            data.apply.push(localStorageService.get('UserData')[0].reg_id);
            ajaxRequest.send('apply.php?id='+localStorageService.get('UserData')[0].fullname +'&pid=' + data.id + '&type=apply', '', 'GET').then(function(res){
            });
        }


        
    }
})();   