(function() {
    angular.module('cot').controller('notsCtrl', notsCtrl);

    function notsCtrl($scope,$state, $ionicLoading, ajaxRequest, localStorageService, $crypto, $filter) {
        var self = this;
        var msg = []; 
        $ionicLoading.show();
        ajaxRequest.send('allnots.php?email='+ localStorageService.get('UserData')[0].email, '', 'GET').then(function(res){
          $ionicLoading.hide(); 
          if(res !== 2){
            seen();
               _.forEach(res, function(value) {
                    value.title = $crypto.decrypt(value.title);
                   if(value.unseen !== 0){
                     if(value.accept){
                        value.accept = value.accept.split(",");
                        console.log(value.accept)
                        console.log('l= '+value.accept.length)
                        console.log('lu= '+value.unseen)
                        for(var i=value.accept.length-1; i>=value.accept.length-value.unseen; i--){
                            console.log(i)
                            console.log(value.accept[i])
                            var name = $filter('capitalize')(value.accept[i]);
                            var objt = {
                                m: name +' is accepted your event '+ value.title,
                                s: 'Event'
                            }
                            msg.push(objt);
                        }

                     }
                     else if(value.apply){
                         value.apply = value.apply.split(",");
                         for(var i=value.apply.length-1; i>=value.apply.length-value.unseen; i--){
                            console.log(i)
                            console.log(value.apply[i])
                            var name = $filter('capitalize')(value.apply[i]);
                            var objt = {
                                m:name +' is applied the job '+ value.title,
                                s: 'Job'
                            }
                            msg.push(objt);
                        }
                      }

                   }
               });
            self.msg = msg;
          }

        }).catch(function(e){
            $ionicLoading.hide();
        });

        function seen(){
            ajaxRequest.send('notsseen.php?email='+localStorageService.get('UserData')[0].email,'','GET').then(function(res){
                console.log(res);
            })
        }
      
        self.go = function(data){
            console.log(data);
            $state.go('stuff',{
                'title': data.s
            })

        }







    }
})();