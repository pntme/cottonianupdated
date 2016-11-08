(function() {
    'use strict';
    angular.module('cot').controller('SignupCtrl', SignupCtrl);

    function SignupCtrl(ajaxRequest, $rootScope, tostService, location, $state, $scope, $ionicLoading, localStorageService, configuration) {
        var self = this;
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
        self.DoSignup = function() {
          if(self.location == 'Location')
             tostService.notify('Unable to fetch location, Make sure location is on and then click on refresh icon','top');  
          else{
            $ionicLoading.show();
            ajaxRequest.send('signup.php', {
                fullname: self.fname,
                email: self.email,
                password: self.password,
                batch: self.bno,
                location: self.location,
                business_area: self.businessarea
            }, 'POST').then(function(res) {
                $ionicLoading.hide();
                if (res == 0)
                    tostService.notify("Something went wrong, Please try again", 'top');
                else if (res == 2)
                    tostService.notify("You are already registered, Please login", 'top');
                else{
                        localStorageService.set("UserData", res);
                        localStorageService.set("SignupPic", "NotSelected");
                        $rootScope.$emit("profile_changed"); 
                        $state.go('profile_pic');
                    }
            });
          }
        }

    }

})();