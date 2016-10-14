(function() {
    'use strict';
    angular.module('cot')
        .factory('userValidate', userValidate);

    function userValidate(localStorageService, $state, $stateParams, $rootScope, $location) {
        return {
            validUser: function() {
                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams) {
                        var userData = localStorageService.get('UserData');
                        if (userData) {
                            if (toState.name == 'tab.home' || toState.name == 'tab.dash' || toState.name == 'tab.chats' || toState.name == 'tab.account' || toState.name == 'tab.feed' 
                                || toState.name =='tab.feedDetails' || toState.name =='tab.event'
                                || toState.name == 'tab.jobs' || toState.name == 'formdata'
                                ) {
                            } else {
                                $state.transitionTo('tab.home');
                                event.preventDefault(); 
                            }
                        } else {
                            if (toState.name == 'login' || toState.name == 'signup') {

                            } else {
                                $state.transitionTo("login");
                                event.preventDefault();
                            }
                        }
                    })
            }
        }
    }

})();