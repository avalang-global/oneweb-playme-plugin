var exec = require("cordova/exec");

window.GET_PLAYME_TOKEN = function() {
  return new Promise((resolve, reject) => {
    if (!window.__PLAYME__ && window.__PLAYME__ !== "playme") {
      let pathname = window.location.pathname;
      let splitPath = pathname.split("/");
      if (splitPath[splitPath.length - 1] === "index.html") {
        let idApp = "";
        if (splitPath[splitPath.length - 4] === "files") {
          idApp = splitPath[splitPath.length - 3];
        }
        if (splitPath[splitPath.length - 4] === "NoCloud") {
          idApp = splitPath[splitPath.length - 3];
        } else {
          idApp =
            splitPath[splitPath.length - 3] +
            "/" +
            splitPath[splitPath.length - 4];
        }
        selectDB("SELECT * FROM playme_token WHERE id_app = ?", [
          splitPath[splitPath.length - 3]
        ])
          .then(async res => {
            let result = {
              id_app: res.item(0).id_app,
              fcm_token: window.localStorage.device_token,
              playme_token: res.item(0).playme_token
            };
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      }
    } else {
    }
  });
};

function selectDB(query, variables = []) {
  return new Promise(async (resolve, reject) => {
    try {
      let database = window.sqlitePlugin.openDatabase({
        name: "playme.db",
        location: "default"
      });
      database.transaction(
        tx => {
          tx.executeSql(
            query,
            variables,
            function(tx, rs) {
              resolve(rs.rows);
            },
            function(tx, error) {
              console.error(error);
              reject(error);
            }
          );
        },
        function(error) {
          console.error(error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

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

/*global cordova, module */
("use strict");
module.exports = (function() {
  var _show = function(
    notificationData,
    url,
    successCallback,
    errorCallback,
    loading
  ) {
    if (loading) {
      cordova.exec(successCallback, errorCallback, "WebViewPlugin", "show", [
        url,
        loading,
        notificationData
      ]);
    } else {
      cordova.exec(successCallback, errorCallback, "WebViewPlugin", "show", [
        url,
        false,
        notificationData
      ]);
    }
  };

  var _hide = function(successCallback, errorCallback, params) {
    cordova.exec(
      successCallback,
      errorCallback,
      "WebViewPlugin",
      "hide",
      params ? params : []
    );
  };

  var _hideLoading = function(successCallback, errorCallback) {
    cordova.exec(
      successCallback,
      errorCallback,
      "WebViewPlugin",
      "hideLoading",
      []
    );
  };

  var _subscribeCallback = function(successCallback, errorCallback) {
    cordova.exec(
      successCallback,
      errorCallback,
      "WebViewPlugin",
      "subscribeCallback",
      []
    );
  };

  var _subscribeExitCallback = function(successCallback, errorCallback) {
    cordova.exec(
      successCallback,
      errorCallback,
      "WebViewPlugin",
      "subscribeExitCallback",
      []
    );
  };

  var _exitApp = function() {
    cordova.exec(
      function() {},
      function() {},
      "WebViewPlugin",
      "exitApp",
      []
    );
  };

  var _setWebViewBehavior = function() {
    cordova.exec(
      function() {},
      function() {},
      "WebViewPlugin",
      "webViewAdjustmenBehavior",
      []
    );
  };

  return {
    Show: _show,
    Hide: _hide,
    Close: _hide,
    SubscribeCallback: _subscribeCallback,
    SubscribeExitCallback: _subscribeExitCallback,
    ExitApp: _exitApp,
    HideLoading: _hideLoading,
    SetWebViewBehavior: _setWebViewBehavior
  };
})();
