(function(){
 'use strict';
  angular.module('cot')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $cryptoProvider, $ionicCloudProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $cryptoProvider.setCryptographyKey('ABCD123');
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
     $ionicCloudProvider.init({
    "core": {
      "app_id": "0a99e665"
    },
    "push": {
      "sender_id": "1077335849429",
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    }
  });
  $ionicConfigProvider.scrolling.jsScrolling(false);  
  $stateProvider

  // setup an abstract state for the tabs directive

  .state('login', {
    url: '/',
    cache: false,
    templateUrl: 'app/login/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'Login'
  })
  .state('signup', {
    url: '/signup',
    cache: false,
    templateUrl: 'app/signup/signup.html',
    controller: 'SignupCtrl',
    controllerAs: 'Signup'
  })
  .state('formdata', {
    url: '/formdata/:FormTitle/:api/:msg',
    cache: false,
    templateUrl: 'app/formdata/formdata.html',
    controller: 'FormdataCtrl',
    controllerAs: 'Formdata'
  })
   .state('stuff', {
    url: '/stuff/:title',
    cache: false,
    templateUrl: 'app/mystuffs/stuff.html',
    controller: 'stuffCtrl',
    controllerAs: 'stuff'
  })
  .state('profile_pic', {
    url: '/profile_pic',
    cache: false,
    templateUrl: 'app/signup/profilephoto.html',
    controller: 'ppCtrl',
    controllerAs: 'pp'
  })  
   .state('userprofile', {
    url: '/userprofile',
    cache: false,
    templateUrl: 'app/userprofile/userprofile.html',
    controller: 'UserProfileCtrl',
    controllerAs: 'UP'
  })  
    .state('nots', {
    url: '/nots',
    cache: false,
    templateUrl: 'app/nots/nots.html',
    controller: 'notsCtrl',
    controllerAs: 'nots'
  })  
    .state('tab', {
    url: '/tab',
    abstract: true,
    cache: false,
    templateUrl: 'app/menu/menu.html',
    controller: 'MenuCtrl',
    controllerAs: 'Menu'
  })
    .state('fellows', {
      url: '/fellows',
      cache: false,
      templateUrl: 'app/fellows/fellows.html',
      controller: 'fellowsCtrl',
      controllerAs: 'fellows'
  })
  // Each tab has its own nav history stack:


  .state('tab.feed', {
    url: '/feed',
    cache: false,
    views: {
      'tab-feed': {
        templateUrl: 'app/feed/feed.html',
        controller: 'feedCtrl',
        controllerAs: 'Feed'
      }
    }
  })



  .state('tab.event', {
      url: '/event',
      cache: false,
      views: {
        'tab-event': {
          templateUrl: 'app/event/event.html',
          controller: 'EventCtrl',
          controllerAs: 'Event'
        }
      }
    })
  

  .state('tab.jobs', {
    url: '/job',
    cache: false,
    views: {
      'tab-job': {
        templateUrl: 'app/jobs/jobs.html',
        controller: 'jobCtrl',
        controllerAs: 'Job'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go('login');
        });

});


})();


