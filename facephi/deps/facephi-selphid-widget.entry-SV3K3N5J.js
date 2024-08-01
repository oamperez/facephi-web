import {
  setWidgetParam
} from "./chunk-ZY4HURDB.js";
import {
  useDeviceInfo
} from "./chunk-BXFY6GLP.js";
import {
  ERRORS,
  MOBILE
} from "./chunk-HSXMT2AK.js";
import {
  AssetsType,
  LicenseComponents,
  TrackingReason,
  TrackingStatus,
  TrackingSteps,
  onChange,
  state
} from "./chunk-Z6DSV6CQ.js";
import "./chunk-PBCZEAHA.js";
import {
  Host,
  createEvent,
  h,
  registerInstance
} from "./chunk-HZFM5WJ6.js";
import "./chunk-PNDESK4O.js";

// node_modules/@facephi/sdk-web-wc/dist/esm/facephi-selphid-widget.entry.js
var styleCss = ":host{flex:1;height:100%;width:100%;display:flex}";
var SelphidWidget = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.moduleLoaded = createEvent(this, "moduleLoaded", 7);
    this.extractionFinish = createEvent(this, "extractionFinish", 7);
    this.extractionTimeout = createEvent(this, "extractionTimeout", 7);
    this.exceptionCaptured = createEvent(this, "exceptionCaptured", 7);
    this.userCancelled = createEvent(this, "userCancelled", 7);
    this.userCancel = createEvent(this, "userCancel", 7);
    this.trackStatus = createEvent(this, "trackStatus", 7);
    this.device = useDeviceInfo().device;
    this.node = void 0;
    this.loading = true;
    this.error = void 0;
    this.bundlePath = void 0;
    this.licenseKey = void 0;
    this.license = void 0;
    this.showLog = false;
    this.debugMode = false;
    this.language = void 0;
    this.accessibility = void 0;
    this.accessibleElements = ["button", "buttonImage"];
    this.initialTip = void 0;
    this.forceLandscape = void 0;
    this.canvasHD = void 0;
    this.cameraOverflow = void 0;
    this.cameraMirror = void 0;
    this.cameraId = void 0;
    this.externalCamera = false;
    this.cameraWidth = 1280;
    this.cameraHeight = 720;
    this.dpiList = void 0;
    this.documentAspectRatio = void 0;
    this.documentMode = void 0;
    this.documentType = void 0;
    this.previewCapture = void 0;
    this.blurredThreshold = void 0;
    this.captureTimeout = void 0;
    this.captureRetries = void 0;
    this.askSimpleMode = void 0;
    this.imageFormat = "image/jpeg";
    this.imageQuality = void 0;
    this.cropFactor = void 0;
    this.scanMode = void 0;
    this.specificdata = void 0;
    this.allowUnknownDocuments = void 0;
    this.allowUncertain = void 0;
    this.barcode = void 0;
    this.barcodeSide = void 0;
    this.maxAllowedMismatches = void 0;
    this.progressiveMismatches = void 0;
    this.cameraSelection = void 0;
    this.startSimpleMode = false;
    this.lightweight = false;
    this.component = void 0;
  }
  onModuleLoaded(event) {
    this.moduleLoaded.emit(event);
  }
  updateComponent(newValue) {
    if (newValue) {
      this.license = newValue.parameters.license;
      this.error = void 0;
      this.loading = false;
    } else {
      this.error = ERRORS.SELPHID_NOT_LICENSED;
      this.loading = false;
    }
  }
  connectedCallback() {
    var _a;
    if (state.components) {
      this.component = (_a = state.components[LicenseComponents.selphidWidget]) !== null && _a !== void 0 ? _a : null;
    }
    this.disconnectComponent = onChange("components", (components) => {
      var _a2;
      this.component = (_a2 = components[LicenseComponents.selphidWidget]) !== null && _a2 !== void 0 ? _a2 : null;
    });
  }
  watchNode(newValue) {
    if (newValue) {
      try {
        this.node.addEventListener("onModuleLoaded", this.onModuleLoaded.bind(this));
        this.node.addEventListener("onExtractionFinished", this.onExtractionFinished.bind(this));
        this.node.addEventListener("onUserCancelled", this.onUserCancel.bind(this));
        this.node.addEventListener("onExceptionCaptured", this.onExceptionCaptured.bind(this));
        this.node.addEventListener("onExtractionTimeout", this.onExtractionTimeout.bind(this));
        this.node.addEventListener("onTrackStatus", this.onTrackStatus.bind(this));
        this.handleVideo();
      } catch (e) {
      }
    }
  }
  onExtractionFinished(event) {
    this.extractionFinish.emit(event);
    event.stopPropagation();
    if (this.trackingElement) {
      this.trackingElement.trackingAsset(event.detail.images.frontDocument, AssetsType.documentFront);
      this.trackingElement.trackingAsset(event.detail.images.backDocument, AssetsType.documentBack);
    }
  }
  onUserCancel(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.cancelled, TrackingReason.selphidCancelUser);
    }
    this.userCancelled.emit(event);
    this.userCancel.emit(event);
  }
  onExceptionCaptured(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.denied, TrackingReason.selphidInternalError);
    }
    this.exceptionCaptured.emit(event);
  }
  onExtractionTimeout(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.expired, TrackingReason.selphidTimeout);
    }
    this.extractionTimeout.emit(event);
  }
  onTrackStatus(event) {
    this.trackStatus.emit(event);
  }
  handleVideo() {
    if (this.channel) {
      const streamList = [this.channel.video.getMediaStreamTrack(), this.channel.audio.getMediaStreamTrack()];
      if (this.node) {
        this.node.setAttribute("externalcamera", "true");
        this.node.setAttribute("cameramirror", "true");
        if (this.device.type === MOBILE) {
          this.node.setAttribute("cameramirror", "false");
        }
        this.node.mountExternalCamera(new MediaStream(streamList));
      }
    } else if (this.node) {
      this.node.setAttribute("cameramirror", "true");
    }
  }
  async checkVideo() {
    await customElements.whenDefined("facephi-video-provider");
    this.videoElement = document.querySelector("facephi-video-provider");
    if (this.videoElement) {
      this.videoElement.getChannel().then((channel) => {
        this.channel = channel;
        this.handleVideo();
      });
      this.videoElement.addEventListener("changeChannel", (event) => {
        this.channel = event.detail;
        this.handleVideo();
      });
      if (this.device.type === MOBILE) {
        await this.videoElement.setCameraRear();
      }
    }
  }
  async componentDidLoad() {
    await customElements.whenDefined("facephi-sdk-provider");
    this.trackingElement = document.querySelector("facephi-sdk-provider");
    if (this.licenseKey) {
      this.license = this.licenseKey;
    }
    this.license = this.licenseKey;
    if (this.trackingElement) {
      this.trackingElement.trackingEvent(TrackingSteps.selphidWidget, TrackingSteps.selphidWidget);
      await this.checkVideo();
    }
    if (this.licenseKey) {
      this.loading = false;
    }
  }
  disconnectedCallback() {
    if (this.node) {
      this.node.removeEventListener("onModuleLoaded", this.onModuleLoaded.bind(this));
      this.node.removeEventListener("onExtractionFinished", this.onExtractionFinished.bind(this));
      this.node.removeEventListener("onUserCancelled", this.onUserCancel.bind(this));
      this.node.removeEventListener("onExceptionCaptured", this.onExceptionCaptured.bind(this));
      this.node.removeEventListener("onExtractionTimeout", this.onExtractionTimeout.bind(this));
      this.node.removeEventListener("onTrackStatus", this.onTrackStatus.bind(this));
    }
    this.disconnectComponent();
  }
  render() {
    return h(Host, null, !this.loading ? this.error ? h("p", null, this.error) : h("facephi-selphid", { ref: (el) => this.node = el, bundlePath: this.bundlePath, licenseKey: this.license, documentAspectRatio: this.documentAspectRatio, documentMode: this.documentMode, documentType: this.documentType, previewCapture: setWidgetParam(this.previewCapture), blurredThreshold: this.blurredThreshold, captureTimeout: this.captureTimeout, captureRetries: this.captureRetries, askSimpleMode: setWidgetParam(this.askSimpleMode), language: this.language, canvasHD: setWidgetParam(this.canvasHD), cameraOverflow: setWidgetParam(this.cameraOverflow), imageFormat: this.imageFormat, imageQuality: this.imageQuality, cropFactor: this.cropFactor, scanMode: this.scanMode, specificdata: this.specificdata, allowUnknownDocuments: setWidgetParam(this.allowUnknownDocuments), allowUncertain: setWidgetParam(this.allowUncertain), maxAllowedMismatches: this.maxAllowedMismatches, progressiveMismatches: this.progressiveMismatches, cameraSelection: setWidgetParam(this.cameraSelection), forceLandscape: setWidgetParam(this.forceLandscape), initialTip: setWidgetParam(this.initialTip), cameraWidth: this.cameraWidth, cameraHeight: this.cameraHeight, cameraMirror: setWidgetParam(this.cameraMirror), cameraId: this.cameraId, showLog: setWidgetParam(this.showLog), debugMode: setWidgetParam(this.debugMode), startSimpleMode: setWidgetParam(this.startSimpleMode), lightweight: setWidgetParam(this.lightweight), style: {
      width: "100%",
      height: this.forceLandscape ? "56.25%" : "100%"
    }, externalCamera: setWidgetParam(this.externalCamera), barcode: setWidgetParam(this.barcode), barcodeSide: this.barcodeSide }) : null);
  }
  static get watchers() {
    return {
      "component": ["updateComponent"],
      "node": ["watchNode"]
    };
  }
};
SelphidWidget.style = styleCss;
export {
  SelphidWidget as facephi_selphid_widget
};
//# sourceMappingURL=facephi-selphid-widget.entry-SV3K3N5J.js.map
