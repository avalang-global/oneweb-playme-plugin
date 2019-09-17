var exec = require("cordova/exec");

module.exports = (function() {
  touchExitApp();
})();

function touchExitApp() {
  var toucstartY1 = 0;
  var toucstartY2 = 0;
  var toucstartY3 = 0;
  var toucstartY4 = 0;
  document.addEventListener(
    "touchstart",
    function(e) {
      if (e.touches.length == 4) {
        toucstartY1 = e.touches[0].screenY;
        toucstartY2 = e.touches[1].screenY;
        toucstartY3 = e.touches[2].screenY;
        toucstartY4 = e.touches[3].screenY;
      } else {
        toucstartY1 = 0;
        toucstartY2 = 0;
        toucstartY3 = 0;
        toucstartY4 = 0;
      }
    },
    false
  );
  document.addEventListener(
    "touchmove",
    function(e) {
      console.log("touch move2", e);
      if (e.changedTouches.length == 4) {
        var deltaY1 = e.changedTouches[0].screenY - toucstartY1;
        var deltaY2 = e.changedTouches[1].screenY - toucstartY2;
        var deltaY3 = e.changedTouches[2].screenY - toucstartY3;
        var deltaY4 = e.changedTouches[3].screenY - toucstartY4;
        if (deltaY1 > 250 && deltaY2 > 250 && deltaY3 > 250 && deltaY4 > 250) {
          if (!window.__PLAYME__ && window.__PLAYME__ !== "playme") {
            console.log("ExitApp Success!");
            cordova.exec(
              function() {},
              function() {},
              "WebViewPlugin",
              "exitApp",
              []
            );
          }
        }
      }
    },
    false
  );
}
