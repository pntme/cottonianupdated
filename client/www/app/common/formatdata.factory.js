(function() {   
    'use strict';
    angular
        .module('cot')
        .factory('formatData',formatData);
    function formatData(configuration, $crypto, localStorageService, $filter) {
        var service = {};
        var self = this;
            service.format =  function(res) {
                  _.forEach(res, function(value) {
                    if(value.user == localStorageService.get('UserData')[0].email)
                        value.me = true;
                    else
                        value.me = false;
                    if(value.type == 'News')
                          value.message = ' has posted a '+ value.type + ' update';
                    else if(value.type == 'Job')
                         value.message = ' has posted a '+ value.type;
                    else if(value.type == 'Event')
                         value.message = ' has posted an '+ value.type;
                    if(value.accept){
                        value.accept = value.accept.split(",");
                        var find = _.find(value.accept, function(o) { return o == localStorageService.get('UserData')[0].fullname; });
                        if(find)
                            value.accepted = true;
                    }else{
                        value.accept =[];
                    }
                    if(value.apply){
                        value.apply = value.apply.split(",");
                        var find = _.find(value.apply, function(o) { return o == localStorageService.get('UserData')[0].fullname; });
                        if(find)
                            value.applied = true;
                    }else{
                        value.apply =[];
                    }

                    if(value.video){
                        value.image = configuration.DefaultVideo;
                        value.TextInstruction = 'Video found, Click on icon to play';
                    }
                    else if (!value.image) {
                        if(value.type == 'News')
                           value.image = configuration.DefaultNewsLogo;
                        if(value.type == 'Job')
                           value.image = configuration.DefaultJobLogo;
                        if(value.type == 'Event')
                           value.image = configuration.DefaultEventLogo; 
                    } else {
                        value.image = configuration.ImageUrl + value.image;
                    }
                    value.titlePic = service.formatPic(value.UserData).User_image;
                    value.date_time = moment.unix(value.date_time).format("DD/MM/YYYY HH:mm");
                    value.title = $crypto.decrypt(value.title);
                    value.description = $crypto.decrypt(value.description);
                });
                return res; 
            },

         service.formatPic = function(data){
            if (data.profile_pic) {
                    data.User_image = data.profile_pic;
            }else if(data.socialpic){
                 data.User_image = data.socialpic;
            } else {
                data.User_image = configuration.ImageUrl + 'user.jpg';
            }
            return data;
         }

         service.FormDatatoSend = function(data){
            if(data.type == 'News'){
                data.api = 'updatenews.php';
                data.msg = 'New news posted';
            }if(data.type == 'Event'){
                data.api = 'updateevent.php';
                data.msg = 'New event posted';
            }if(data.type == 'Job'){
                data.api = 'updatejob.php';
                data.msg = 'New job posted';
            }
            return data;
         }
        return service;
    }

})();