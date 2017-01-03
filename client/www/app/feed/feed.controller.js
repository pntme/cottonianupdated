(function() {
    'use strict';
    angular.module('cot').controller('feedCtrl', feedCtrl);

    function feedCtrl(ajaxRequest, $window, configuration, $ionicGesture, video, $ionicPopup, localStorageService, $ionicLoading, $cordovaFileTransfer, formatData, $state, $ionicModal, $ionicScrollDelegate, $scope) {
        var self = this;
        self.spinner = true;
        self.noMoreItemsAvailable = false;
        self.myid = localStorageService.get('UserData')[0].id;
         $scope.$on('SearchStarted', function(event, data){
            $scope.searchingText=data;
            if(data)
               $scope.subheader = 'has-subheader';
            else
              $scope.subheader='';
         });
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

        $ionicModal.fromTemplateUrl('app/common/option2.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        
        self.OpenProfile = function(data){
          self.optionProfile.show();
          $scope.OptionData = data;
          $scope.OptionData.title = 'Profile';
        }


        $scope.hide = function() {
            self.option.hide();
            self.optionProfile.hide();
             self.zoomimg.hide();
        }

        self.doRefresh = function() {
            ajaxRequest.send('fetchhome.php', '', 'GET', 'NeedOffline').then(function(res) {
                self.spinner = false;
                console.log(res)
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

        $ionicModal.fromTemplateUrl('app/common/zoomimg.html', function($ionicModal) {
            self.zoomimg = $ionicModal;
        }, {
            scope: $scope
        });

       var zooomInCount = 0;
       var zoomOutCount = 0;
       self.zoomimgIMG = function(data){
        console.log(data)

        $scope.imgUrl = data;
          self.zoomimg.show();
          console.log($window.innerWidth)
          $scope.zoomWidth = $window.innerWidth + 'px';
          // $scope.zoomWidth = '400px';
          var element = angular.element(document.querySelector('#eventCiao'));
          // var ZoomImg  = angular.element(document.querySelector('#ZoomImg .scroll').style);
          // angular.element(document.querySelector('#ZoomImg .scroll').style)

          console.log(ZoomImg)
            $ionicGesture.on('pinch', function(e)
        {
           if($scope.zoom && $scope.zoom < e.gesture.scale){
            zoomOutCount = 0; 
                if(zooomInCount < 4){
                    $scope.zoomWidth = 100 + 20*zooomInCount + '%';
                      // angular.element(document.querySelector('#ZoomImg .scroll'))[0].style.width = 100 + 20*zooomInCount  + '%';
                    $scope.$apply();
                    zooomInCount++;
                }else{
                    console.log("zoom in max");
                }           
           }
           else if($scope.zoom && $scope.zoom > e.gesture.scale){
            zooomInCount=0;
                 if(zoomOutCount < 4){
                    $scope.zoomWidth = 100 - 20*zooomInCount + '%';
                    $scope.$apply();
                     // angular.element(document.querySelector('#ZoomImg .scroll'))[0].style.width = 100 - 20*zooomInCount  + '%';
                    zoomOutCount++;
                }else{
                  console.log('zoom out max')
                   // angular.element(document.querySelector('#ZoomImg .scroll'))[0].style.width = 100  + '%';
                }           
           } 
          $scope.zoom = e.gesture.scale;
        },element);
        }

        
    }
})();   