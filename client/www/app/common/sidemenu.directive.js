(function(){
angular.module('cot').directive('sidemenu', sidemenu);
function sidemenu(){
 return{
 	restrict: 'E',
 	templateUrl: 'app/menu/sidemenu.html',
 	controller: 'sidemenuCtrl',
 	controllerAs: 'sidemenu'
 }

}
})();



