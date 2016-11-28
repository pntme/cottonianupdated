(function() {
    'use strict';
    angular.module('cot').controller('stuffCtrl', stuffCtrl);
    function stuffCtrl(ajaxRequest, tostService, $crypto, $cordovaFileTransfer, video, $ionicLoading, configuration, $ionicPopover,  $state, $ionicModal, $ionicPopup, $scope, formatData, $q, $stateParams, localStorageService) {
        var self = this;
        self.title = "My "+$stateParams.title;
        self.subject =  $stateParams.title;
        self.spinner = true;
 

        $scope.hide = function() {
            self.option.hide();
        }
        self.doRefresh = function() {
            ajaxRequest.send('mystuff.php?type='+$stateParams.title+'&user='+localStorageService.get('UserData')[0].email, '', 'GET', 'NeedOffline').then(function(res) {
                $ionicLoading.hide();
                if(res == 2){
                    self.spinner = false;
                    self.dataNotavailable = true;
                }
                else
                   self.stuffData = formatData.format(res);
                   
            }, function(e){
            console.log(e);
                 $ionicLoading.hide();
                 self.spinner=false;
           });
        }

         self.doRefresh();

        self.cancel = function(){
            self.y = false;
            self.x =false;
            $scope.searchingText='';
        }

        self.showSearch = function(){
            self.y = true;
            self.x=true;
        }

        self.Open = function(data, api, msg) {
            $state.go('formdata', {
                FormTitle: data,
                api: api,
                msg: msg
            });

        }

        self.showdeatilsapply = function(data, $event){
            $scope.popover.show($event);
            $scope.responsedUser = data.apply;
            $scope.heading = 'Applied by';

        }

        self.showdeatilsaccept = function(data, $event){
                $scope.popover.show($event);
                $scope.responsedUser = data.accept;
                $scope.heading = 'Accepted by';
        } 

        self.delete = function(data){
            console.log(data);
              var confirmPopup = $ionicPopup.confirm({
                   title: 'Warning',
                   template: 'Are you sure?'
                 });
                 confirmPopup.then(function(res) {
                   if(res) {
                    $ionicLoading.show();
                     ajaxRequest.send('deletestuff.php',{
                        ids: [data.id]
                     }, 'POST').then(function(res){
                        if(res == 1){
                            tostService.notify("Deleted successfully",'top');
                            self.stuffData = '';
                            self.doRefresh();
                        }else{
                            tostService.notify("Operation failed, Please try again",'top');
                        }
                     });
                   } else {
                     console.log('You are not sure');
                   }
                 });
        }


          $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
          }).then(function(popover) {
            $scope.popover = popover;
          });

          self.edit = function(data){
            data = formatData.FormDatatoSend(data);
            localStorageService.set('EditData', data);
            $state.go('formdata', {
              FormTitle: data.type,
              api: data.api,
              msg: data.msg,
              id: data.id
            });
            // $scope.EditData = {};
            // $scope.EditData.title = data.title;
            // $scope.EditData.desc = data.description;
            // var editPopup = $ionicPopup.show({
            //     template: '<input type="text" ng-model="EditData.title" placeholder="Title"><textarea  ng-model="EditData.desc" placeholder="Description" class="m-t-15"></textarea>',
            //     title: 'Edit Information',
            //     scope: $scope,
            //     buttons: [
            //       { text: 'Cancel' },
            //       {
            //         text: '<b>Save</b>',
            //         type: 'button-positive',
            //         onTap: function(e) {
            //            ajaxRequest.send('edit.php?id='+ data.id,{
            //             title: $crypto.encrypt($scope.EditData.title),
            //             description: $crypto.encrypt($scope.EditData.desc)
            //            },'POST').then(function(res){
            //               if(res == 1){
            //                 data.title = $scope.EditData.title;
            //                 data.description = $scope.EditData.desc;
            //               }
            //            })
            //         }
            //       }
            //     ]
            //   });

            //   editPopup.then(function(res) {
            //     console.log('Tapped!', res);
            //   });

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



        $ionicModal.fromTemplateUrl('app/common/option2.html', function($ionicModal) {
            self.optionProfile = $ionicModal;
        }, {
            scope: $scope
        });
        $scope.openProfile = function(data) {
          ajaxRequest.send('finduser.php?name='+data,'','GET').then(function(res){
            console.log(res)
            if(res !== 2){
            self.optionProfile.show();
            $scope.OptionData = res[0];
            $scope.OptionData.title = 'Profile';
            if ($scope.OptionData.profile_pic) {
                $scope.OptionData.image = $scope.OptionData.profile_pic;
            }else if($scope.OptionData.socialpic){
                 $scope.OptionData.image = $scope.OptionData.socialpic;
            } else {
                $scope.OptionData.image = configuration.ImageUrl + 'user.jpg';
            }
          }
        })     
      }
        $scope.hide = function() {
            self.optionProfile.hide();
        }

    }
})();