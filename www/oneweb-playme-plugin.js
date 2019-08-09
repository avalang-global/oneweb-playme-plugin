var exec = require("cordova/exec");

module.exports = (function() {
  touchExitApp();
})();

function touchExitApp(){
  var toucstartY1 = 0;
  var toucstartY2 = 0;
  var toucstartY3 = 0;
  document.addEventListener(
    "touchstart",
    function(e) {
      if (e.touches.length == 3) {
        toucstartY1 = e.touches[0].screenY;
        toucstartY2 = e.touches[1].screenY;
        toucstartY3 = e.touches[2].screenY;
      } else {
        toucstartY1 = 0;
        toucstartY2 = 0;
        toucstartY3 = 0;
      }
    },
    false
  );
  document.addEventListener(
    "touchmove",
    function(e) {
      console.log("length: " + e.changedTouches.length, e);
      if (e.changedTouches.length == 3) {
        var deltaY1 = e.changedTouches[0].screenY - toucstartY1;
        var deltaY2 = e.changedTouches[1].screenY - toucstartY2;
        var deltaY3 = e.changedTouches[2].screenY - toucstartY3;
        console.log(
          "Delta=> F1: " + deltaY1 + " , F2: " + deltaY2 + " , F3: " + deltaY3
        );
        if (deltaY1 > 250 && deltaY2 > 250 && deltaY3 > 250) {
          if(!window.__PLAYME__&&window.__PLAYME__!=="playme"){
            console.log("ExitApp Success!");
            cordova.exec(function(){},function(){}, 'WebViewPlugin', 'exitApp', []);
          }
        }
      }
    },
    false
  );
}