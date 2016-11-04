(function () {
   angular.module('cot')
      .factory('location', location);
   function location($timeout, $q, $ionicActionSheet, $ionicLoading) {
       var geo = {};
       geo.onSuccess = function (position) {
           geo.defer.resolve(position);
       };
       geo.onError = function (posError) {
        console.log(posError);
           geo.defer.reject(posError);
           geo.errorCount++;
           if (geo.errorCount <= 1)
           {
               geo.nearBy();
           } else{
              geo.gpsStatus();
           }
       };
       geo.errorCount = 0;
       geo.gpsStatus = function () {
        try{
          cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                if (!enabled) {
                     $ionicLoading.hide();
                    var hideSheet = $ionicActionSheet.show({
                     buttons: [{
                             text: '<p class="text-center"><i class="ion-images"></i> Open Location Settings</p>'
                         }],
                     titleText: 'GPS is disabled',
                     cancelText: 'Cancel',
                     cancel: function() {
                     },
                     buttonClicked: function(index) {
                     hideSheet();
                     cordova.plugins.diagnostic.switchToLocationSettings();
                     }
                 });
                }
            }, function(error) {
                console.error(error);
            });
        }
        catch(e){
          console.log(e);
        }
       };
       geo.nearBy = function () {
           geo.defer = $q.defer();
           navigator.geolocation.getCurrentPosition(geo.onSuccess, geo.onError, {timeout: 6000});
           return geo.defer.promise;
       };
        geo.gpsStatuscheck = function () {
          geo.defer = $q.defer();
        try{
          cordova.plugins.diagnostic.isLocationEnabled(function(enabled) {
                if (!enabled) {
                  geo.defer.resolve(false);
                }else{
                  geo.defer.resolve(true);

                }
            }, function(error) {
                console.error(error);
            });
        }
        catch(e){
          console.log(e);
        }
        return geo.defer.promise;
       };
       return geo;
   }
})();