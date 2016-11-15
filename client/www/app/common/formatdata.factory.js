(function() {
    'use strict';
    angular
        .module('cot')
        .factory('formatData',formatData);
    function formatData(configuration, $crypto) {
        return {
            format: function(res) {
                console.log(res);
                  _.forEach(res, function(value) {
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
                    if(value.type == 'News')
                       value.titlePic = 'img/news.png';
                    if(value.type == 'Job')
                       value.titlePic = 'img/job.png';
                    if(value.type == 'Event')
                       value.titlePic = 'img/event.png';
                    value.date_time = moment.unix(value.date_time).format("DD/MM/YYYY HH:mm");
                    value.title = $crypto.decrypt(value.title);
                    value.description = $crypto.decrypt(value.description);
                });
                return res; 
            },
        };
    }

})();