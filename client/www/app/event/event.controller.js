(function() {
    'use strict';
    angular.module('cot').controller('EventCtrl', EventCtrl);

    function EventCtrl(ajaxRequest, configuration, video, $ionicModal, $cordovaFileTransfer, formatData, $scope, localStorageService) {
        var self = this;
        self.spinner=true;
        $scope.$on('SearchStarted', function(event, data){
            $scope.searchingText=data;
            if(data)
               $scope.subheader = 'has-subheader';
            else
              $scope.subheader='';
        });
        var OfflineData = ajaxRequest.OfflineData('fetchevent.php');
        if(OfflineData)
            self.eventData = formatData.format(OfflineData);

        $ionicModal.fromTemplateUrl('app/common/option.html', function($ionicModal) {
            self.option = $ionicModal;
        }, {
            scope: $scope
        });

        self.ShowDetails = function(data) {
            $scope.OptionData = data;
            $scope.HidePublisher = true;
            self.option.show();
        }

        self.doRefresh = function(){
           ajaxRequest.send('fetchevent.php', '', 'GET', 'NeedOffline').then(function(res) {
                self.spinner=false;
                if(res == 2)
                     self.dataNotavailable = true;
                else
                     self.eventData = formatData.format(res);
            }, function(e){
            console.log(e);
                 self.spinner=false;
           });
        }
        self.doRefresh();


        $ionicModal.fromTemplateUrl('app/common/option2.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        
        self.OpenProfile = function(data){
          self.optionProfile.show();
          $scope.OptionData = formatData.formatPic(data);
          $scope.OptionData.title = 'Profile';
        }


        $scope.hide = function() {
            self.option.hide();
            self.optionProfile.hide();
             self.zoomimg.hide();
        }

        self.cancel = function(){
            $scope.searchingText='';
            self.y = false;
            self.x =false;
        }

        self.showSearch = function(){
            self.y = true;
            self.x=true;
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

     $scope.downloadFile = function(obj) {
        console.log(obj)
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

        $ionicModal.fromTemplateUrl('app/common/zoomimg.html', function($ionicModal) {
            self.zoomimg = $ionicModal;
        }, {
            scope: $scope
        });


       self.zoomimgIMG = function(data){
        console.log(data)
        $scope.imgUrl = data;
          self.zoomimg.show();
        }


    }
})();