(function() {
        'use strict';
        angular.module('cot').factory('createfolder', createfolder);
        function createfolder(localStorageService) {
            var service = {};
            service.create = function() {
                document.addEventListener("deviceready", function() {
                    var folderName = 'abcd';
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
                    function fileSystemSuccess(fileSystem) {
                        console.log(fileSystem)
                        var download_link = encodeURI(URL);
                        var directoryEntry = fileSystem.root; 
                        directoryEntry.getDirectory(folderName, {
                            create: true,
                            exclusive: false
                        }, onDirectorySuccess, onDirectoryFail); 
                    }
                    function onDirectorySuccess(parent) {
                    	localStorageService.set('Filepermission', true);
                    }
                    function onDirectoryFail(error) {
                        console.log("Unable to create new directory: " + error.code);
                    }
                    function fileSystemFail(evt) {
                        console.log(evt.target.error.code);
                    }
                });
            }
            return service;
        }    
})();