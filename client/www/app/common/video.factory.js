(function(){
'use strict';
angular.module('cot').factory('video', video);
function video($document){
 var videoElement;
 return {
          videoElement: videoElement,
          play: function(filename) {
             videoElement = $document[0].getElementById('video');
             videoElement.src = filename;
             //videoElement.play();
          },
          resume: function() {
             videoElement.play();
          },
          pause: function() {
             videoElement.pause();
          },
          stop: function() {
             videoElement.pause();
             videoElement.src = videoElement.currentSrc; /** http://stackoverflow.com/a/16978083/1015046 **/
          },
          incVol: function() {
             if(videoElement.volume < 1) {
                videoElement.volume = (videoElement.volume + 0.1).toFixed(2);
             }
             return videoElement.volume;
          },
          decVol: function() {
             if(videoElement.volume > 0) {
                videoElement.volume = (videoElement.volume - 0.1).toFixed(2);
             }
             return videoElement.volume;
          },
          timer: function(callback) {
             videoElement.ontimeupdate = function() {
                callback(videoElement.duration, videoElement.currentTime)
             };
          },
       }
}

})();






