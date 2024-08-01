import {
  bootstrapLazy,
  setNonce
} from "./chunk-HZFM5WJ6.js";
import "./chunk-PNDESK4O.js";

// node_modules/@facephi/sdk-web-wc/dist/esm/polyfills/index.js
function applyPolyfills() {
  var promises = [];
  if (typeof window !== "undefined") {
    var win = window;
    if (!win.customElements || win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove || !win.Element.prototype.getRootNode)) {
      promises.push(import(
        /* webpackChunkName: "polyfills-dom" */
        "./dom-DT4CBLQA.js"
      ));
    }
    var checkIfURLIsSupported = function() {
      try {
        var u = new URL("b", "http://a");
        u.pathname = "c%20d";
        return u.href === "http://a/c%20d" && u.searchParams;
      } catch (e) {
        return false;
      }
    };
    if ("function" !== typeof Object.assign || !Object.entries || !Array.prototype.find || !Array.prototype.includes || !String.prototype.startsWith || !String.prototype.endsWith || win.NodeList && !win.NodeList.prototype.forEach || !win.fetch || !checkIfURLIsSupported() || typeof WeakMap == "undefined") {
      promises.push(import(
        /* webpackChunkName: "polyfills-core-js" */
        "./core-js-4B3HJYXI.js"
      ));
    }
  }
  return Promise.all(promises);
}

// node_modules/@facephi/sdk-web-wc/dist/esm/global-3c267f2f.js
window.global = window;

// node_modules/@facephi/sdk-web-wc/dist/esm/loader.js
var defineCustomElements = (win, options) => {
  if (typeof window === "undefined") return void 0;
  return bootstrapLazy([["facephi-video-recruitment-widget", [[1, "facephi-video-recruitment-widget", { "fullScreen": [4, "full-screen"], "language": [1], "loading": [32], "error": [32], "operationId": [32], "tenantId": [32], "videoOptions": [32], "component": [32] }, null, { "component": ["updateComponent"], "operationId": ["watchOperationId"] }]]], ["facephi-sdk-provider", [[1, "facephi-sdk-provider", { "customerId": [1, "customer-id"], "apikey": [1], "type": [1], "steps": [1], "disabled": [4], "bundlePath": [1, "bundle-path"], "loading": [32], "operationId": [32], "components": [32], "error": [32], "trackingParameters": [32], "trackingEvent": [64], "getComponents": [64], "trackingAsset": [64], "trackingStatus": [64], "getOperationId": [64] }, null, { "operationId": ["watchOperationId"], "components": ["watchComponents"] }]]], ["facephi-selphi-widget", [[1, "facephi-selphi-widget", { "bundlePath": [1, "bundle-path"], "showLog": [4, "show-log"], "debugMode": [4, "debug-mode"], "language": [1], "accessibility": [4], "accessibleElements": [16], "tutorial": [4], "antispoofEnabled": [4, "antispoof-enabled"], "externalCamera": [4, "external-camera"], "cameraWidth": [2, "camera-width"], "cameraHeight": [2, "camera-height"], "cameraType": [2, "camera-type"], "cameraRotation": [2, "camera-rotation"], "stabilizationStage": [4, "stabilization-stage"], "faceTracking": [4, "face-tracking"], "interactible": [4], "timeout": [2], "authenticateTime": [2, "authenticate-time"], "imageQuality": [2, "image-quality"], "imageFormat": [1, "image-format"], "cropImage": [4, "crop-image"], "cropFactor": [2, "crop-factor"], "logImages": [4, "log-images"], "bundlePathExternal": [1, "bundle-path-external"], "node": [32], "loading": [32], "error": [32], "component": [32] }, null, { "node": ["watchNode"], "component": ["updateComponent"] }]]], ["facephi-selphid-widget", [[1, "facephi-selphid-widget", { "bundlePath": [1, "bundle-path"], "licenseKey": [1, "license-key"], "showLog": [4, "show-log"], "debugMode": [4, "debug-mode"], "language": [1], "accessibility": [1], "accessibleElements": [16], "initialTip": [4, "initial-tip"], "forceLandscape": [4, "force-landscape"], "canvasHD": [4, "canvas-h-d"], "cameraOverflow": [4, "camera-overflow"], "cameraMirror": [4, "camera-mirror"], "cameraId": [1, "camera-id"], "externalCamera": [4, "external-camera"], "cameraWidth": [2, "camera-width"], "cameraHeight": [2, "camera-height"], "dpiList": [16], "documentAspectRatio": [2, "document-aspect-ratio"], "documentMode": [2, "document-mode"], "documentType": [2, "document-type"], "previewCapture": [4, "preview-capture"], "blurredThreshold": [2, "blurred-threshold"], "captureTimeout": [2, "capture-timeout"], "captureRetries": [2, "capture-retries"], "askSimpleMode": [4, "ask-simple-mode"], "imageFormat": [1, "image-format"], "imageQuality": [2, "image-quality"], "cropFactor": [2, "crop-factor"], "scanMode": [2, "scan-mode"], "specificdata": [1], "allowUnknownDocuments": [4, "allow-unknown-documents"], "allowUncertain": [4, "allow-uncertain"], "barcode": [4], "barcodeSide": [2, "barcode-side"], "maxAllowedMismatches": [2, "max-allowed-mismatches"], "progressiveMismatches": [2, "progressive-mismatches"], "cameraSelection": [4, "camera-selection"], "startSimpleMode": [4, "start-simple-mode"], "lightweight": [4], "node": [32], "loading": [32], "error": [32], "license": [32], "component": [32] }, null, { "component": ["updateComponent"], "node": ["watchNode"] }]]], ["facephi-video-provider", [[1, "facephi-video-provider", { "loading": [32], "tenantId": [32], "operationId": [32], "videoOptions": [32], "component": [32], "stopVideo": [64], "setCameraRear": [64], "setCameraFront": [64], "getChannel": [64] }, null, { "component": ["updateComponent"], "tenantId": ["updateTenantId"], "operationId": ["updateOperationId"], "videoOptions": ["checkVideoOptions"], "loading": ["handleLoading"] }]]], ["button-icon_10", [[0, "button-icon", { "iconName": [1, "icon-name"], "size": [8] }], [0, "custom-icon", { "iconName": [1, "icon-name"], "size": [8], "color": [1] }], [1, "check-circle-icon", { "size": [8], "color": [1] }], [1, "close-circle-icon", { "size": [8], "color": [1] }], [0, "close-icon", { "size": [8] }], [1, "hourglass-low-icon", { "size": [8], "color": [1] }], [1, "identification-card-back-icon", { "size": [8] }], [0, "identification-card-icon", { "size": [8] }], [1, "user-focus-icon", { "size": [8] }], [1, "warning-circle-icon", { "size": [8], "color": [1] }]]], ["button-component_3", [[0, "lottie-animation", { "loop": [4], "animation": [16], "preserveAspectRatio": [1, "preserve-aspect-ratio"] }], [4, "modal-base"], [4, "button-component", { "variant": [1] }]]], ["captured-container_7", [[0, "video-container", { "loading": [4], "state": [16], "language": [1], "error": [1], "finish": [4], "video": [16], "showModal": [32], "videoRef": [32] }, null, { "videoRef": ["watchVideo"] }], [4, "screen-layout", { "fullScreen": [4, "full-screen"], "state": [16], "time": [1], "language": [1] }], [0, "modal-start", { "language": [1] }], [0, "modal-state", { "language": [1], "type": [1] }], [0, "captured-container", { "iconCaptured": [1, "icon-captured"] }], [0, "instrutions-container", { "iconName": [1, "icon-name"], "message": [1] }], [0, "loading-container"]]], ["video-recruitment", [[1, "video-recruitment", { "apiUrl": [1, "api-url"], "apiKey": [1, "api-key"], "operationId": [1, "operation-id"], "tenantId": [1, "tenant-id"], "language": [1], "fullScreen": [4, "full-screen"], "close": [32], "loading": [32], "finish": [32], "recording": [32], "credentials": [32], "videoTracks": [32], "tracks": [32], "currentState": [32], "time": [32], "errorType": [32] }, null, { "videoTracks": ["watchVideoTracks"], "credentials": ["watchCrendentials"], "recording": ["watchRecording"], "errorType": ["watchErrorType"], "currentState": ["watchCurrentState"], "tracks": ["watchTracks"] }]]]], options);
};

// node_modules/@facephi/sdk-web-wc/loader/index.js
(function() {
  if ("undefined" !== typeof window && void 0 !== window.Reflect && void 0 !== window.customElements) {
    var a = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(a, [], this.constructor);
    };
    HTMLElement.prototype = a.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, a);
  }
})();
export {
  applyPolyfills,
  defineCustomElements,
  setNonce
};
//# sourceMappingURL=@facephi_sdk-web-wc_loader.js.map
