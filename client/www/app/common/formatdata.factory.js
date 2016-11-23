(function() {
    'use strict';
    angular
        .module('cot')
        .factory('formatData',formatData);
    function formatData(configuration, $crypto, localStorageService) {
        return {
            format: function(res) {
                  _.forEach(res, function(value) {
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
                    
                    // if(value.type == 'News')
                    //    value.titlePic = 'img/news.png';
                    // if(value.type == 'Job')
                    //    value.titlePic = 'img/job.png';
                    // if(value.type == 'Event')
                    //    value.titlePic = 'img/event.png';
                    value.date_time = moment.unix(value.date_time).format("DD/MM/YYYY HH:mm");
                    value.title = $crypto.decrypt(value.title);
                    value.description = $crypto.decrypt(value.description);
                });
                return res; 
            },
        };
    }

})();