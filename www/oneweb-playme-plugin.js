var exec = require("cordova/exec");

module.exports = (function() {
  document.addEventListener("click", function() {
    console.log("Exit App");
    webview.ExitApp();
  });
})();
