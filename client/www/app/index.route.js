(function(){
 'use strict';
  angular.module('cot')
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  // setup an abstract state for the tabs directive

  .state('login', {
    url: '/login',
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
  .state('home', {
    url: '/home',
    cache: false,
    templateUrl: 'app/home/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'Home'
  })
 
 
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'MenuCtrl',
    controllerAs: 'Menu'
  })

  // Each tab has its own nav history stack:




  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});


})();

