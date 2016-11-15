(function() {
    'use strict';
    angular
        .module('cot')
        .factory('formatData',formatData);
    function formatData(configuration, $crypto) {
        return {
            format: function(res) {
                  _.forEach(res, function(value) {
                    if (!value.image) {
                        if(value.type == 'News')
                           value.image = configuration.DefaultNewsLogo;
                        if(value.type == 'Job')
                           value.image = configuration.DefaultJobLogo;
                        if(value.type == 'Event')
                           value.image = configuration.DefaultEventLogo; 
                    } else {
                        value.image = configuration.ImageUrl + value.image;
                    }
                    value.date_time = moment.unix(value.date_time).format("DD/MM/YYYY HH:mm");
                    value.title = $crypto.decrypt(value.title);
                    value.description = $crypto.decrypt(value.description);
                });
                return res; 
            },
        };
    }

})();