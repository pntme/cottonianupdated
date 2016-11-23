(function(){
angular.module('cot').directive('dynamicUrl', dynamicUrl);

function dynamicUrl(){
return {
    restrict: 'A',
    link: function postLink(scope, element, attr) {
        element.attr('src', attr.dynamicUrlSrc);
    }
}
}
})();