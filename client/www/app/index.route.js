(function(){
 'use strict';
  angular.module('cot')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicCloudProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.tabs.position('bottom');
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
    url: '/formdata/:FormTitle/:api',
    cache: false,
    templateUrl: 'app/formdata/formdata.html',
    controller: 'FormdataCtrl',
    controllerAs: 'Formdata'
  })
  
 
 
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'MenuCtrl',
    controllerAs: 'Menu'
  })

  // Each tab has its own nav history stack:

.state('tab.home', {
    url: '/home',
    cache: false,
      views: {
      'tab-home': {
        templateUrl: 'app/home/home.html',
         controller: 'HomeCtrl',
         controllerAs: 'Home'
      }
    }
  })


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


