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
                            if (toState.name == 'tab.dash' || toState.name == 'tab.chats' || toState.name == 'tab.account' || toState.name == 'tab.feed' 
                                || toState.name =='tab.feedDetails' || toState.name =='tab.event'
                                || toState.name == 'tab.jobs' || toState.name == 'formdata' || toState.name == 'stuff' || toState.name == 'profile_pic'|| 
                                toState.name == 'fellows' || toState.name == 'nots' || toState.name == 'userprofile'
                                ) {
                            } else {
                                $state.transitionTo('tab.feed');
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