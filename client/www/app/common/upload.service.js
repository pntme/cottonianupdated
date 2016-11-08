  (function () {
   'use strict';
   angular.module('cot')
           .factory('Image', imageUpload)
   function imageUpload($ionicHistory, $state, $rootScope, ajaxRequest, tostService, Upload,configuration, $q, $ionicActionSheet,localStorageService,  $ionicLoading) {
       var image = {};
       image.upload = function (file, api) {
           var def = $q.defer();
           Upload.upload({
               url: configuration.ApiHost + 'upload.php',
               data: file
           }).then(function (resp) {
               $rootScope.loading = false;
               def.resolve(resp);
           }, function (resp) {
               $rootScope.loading = false;
               def.reject(resp);
           }, function (evt) {
               var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
               console.log('progress: ' + progressPercentage + '% '); //progress of loading image
           });
           return def.promise;
       };
       image.fixBinary = function (bin) {
           var length = bin.length;
           var buf = new ArrayBuffer(length);
           var arr = new Uint8Array(buf);
           for (var i = 0; i < length; i++) {
               arr[i] = bin.charCodeAt(i);
           }
           return buf;
       };
       image.baseUpload = function (imageBase64, name) {
           var binary = image.fixBinary(atob(imageBase64));
           var blob = new Blob([binary], {type: 'image/png', name: name});
           blob.name = name;
           blob.$ngfName = name;
           return blob;
       };
       image.defer = '';
       image.takePhoto = function (index) {
           image.defer = $q.defer();
           try {
               var options = {
                   "destinationType": Camera.DestinationType.DATA_URL,
                    "sourceType": index
               };
               navigator.camera.getPicture(image.successCallback, image.errorCallback, options);
           } catch (e) {
               image.errorCallback();
           }
           return image.defer.promise;
       };
       image.binary='';
       image.successCallback = function (imageBase64) {
           var name = new Date().valueOf() + '.png';
           image.binary=imageBase64;
           var blob = image.baseUpload(imageBase64, name);
           image.defer.resolve(blob);
       };
       image.errorCallback = function () {
           beersHelper.alert("Upload Image From Your Device Library", "No Photo Taken");
           image.defer.reject("Camera Not Available");
       };

        image.takePhoto1 = function(title) {
               var q = $q.defer();
                var hideSheet = $ionicActionSheet.show({
                    buttons: [{
                        text: '<p class="text-center"><i class="ion-images"></i> Gallery</p>'
                    }, {
                        text: '<p class="text-center"><i class="ion-camera"></i> Camera</p>'
                    }],
                    titleText: title,
                    cancelText: 'Cancel',
                    cancel: function() {},
                    buttonClicked: function(index) {
                        var options = {
                          quality : 75, 
                          destinationType : Camera.DestinationType.DATA_URL, 
                          sourceType : Camera.PictureSourceType.CAMERA, 
                          allowEdit : true,
                          encodingType: Camera.EncodingType.JPEG,
                          targetWidth: 300,
                          targetHeight: 300,
                          popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        };

                        image.takePhoto(index).then(function(blob) {
                                q.resolve(blob);
                        }, function(err) {
                            q.reject(err);
                        });
                        return true;
                    }
                });
               return q.promise;
            };



              image.takevideo = function(title) {
               var q = $q.defer();
                var hideSheet = $ionicActionSheet.show({
                    buttons: [{
                        text: '<p class="text-center"><i class="ion-images"></i> Gallery</p>'
                    }, {
                        text: '<p class="text-center"><i class="ion-camera"></i> Camera</p>'
                    }],
                    titleText: title,
                    cancelText: 'Cancel',
                    cancel: function() {},
                    buttonClicked: function(index) {
                        var options = {
                          quality : 75, 
                          destinationType : Camera.DestinationType.DATA_URL, 
                          sourceType : Camera.PictureSourceType.CAMERA, 
                          allowEdit : true,
                          encodingType: Camera.EncodingType.JPEG,
                          targetWidth: 300,
                          targetHeight: 300,
                          popoverOptions: CameraPopoverOptions,
                          saveToPhotoAlbum: false
                        };

                        image.takePhoto(index).then(function(blob) {
                                q.resolve(blob);
                        }, function(err) {
                            q.reject(err);
                        });
                        return true;
                    }
                });
               return q.promise;
            };
       return image;
   }
   ;
})();