package avalant.playme.webview;

import org.apache.cordova.CallbackContext;

public class SubscribeExitCallback {
    private static SubscribeExitCallback ourInstance;

    private CallbackContext callbackContext;

    public static SubscribeExitCallback getInstance() {
        if (ourInstance == null) {
            ourInstance = new SubscribeExitCallback();
        }
        return ourInstance;
    }

    private SubscribeExitCallback() {

    }

    public CallbackContext getCallbackContext() {
        return callbackContext;
    }

    public void setCallbackContext(CallbackContext callbackContext) {
        this.callbackContext = callbackContext;
    }
}
