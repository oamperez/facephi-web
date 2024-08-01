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

// node_modules/@facephi/sdk-web-wc/dist/esm/facephi-selphi-widget.entry.js
var LivenessMode;
(function(LivenessMode2) {
  LivenessMode2[LivenessMode2["None"] = 0] = "None";
  LivenessMode2[LivenessMode2["Passive"] = 3] = "Passive";
})(LivenessMode || (LivenessMode = {}));
var CameraType;
(function(CameraType2) {
  CameraType2[CameraType2["Front"] = 0] = "Front";
  CameraType2[CameraType2["Back"] = 1] = "Back";
})(CameraType || (CameraType = {}));
var EventsFaceCapture;
(function(EventsFaceCapture2) {
  EventsFaceCapture2["trackStatus"] = "onFaceTrackStatus";
  EventsFaceCapture2["success"] = "onFaceExtractionFinished";
  EventsFaceCapture2["cancel"] = "onFaceUserCancel";
  EventsFaceCapture2["exception"] = "onFaceExceptionCaptured";
  EventsFaceCapture2["start"] = "onFaceStart";
  EventsFaceCapture2["timeout"] = "onFaceExtractionTimeout";
})(EventsFaceCapture || (EventsFaceCapture = {}));
var AuthenticationException;
(function(AuthenticationException2) {
  AuthenticationException2["timeout"] = "SELPHI_TIMEOUT";
  AuthenticationException2["userCancel"] = "SELPHI_CANCEL_BY_USER";
})(AuthenticationException || (AuthenticationException = {}));
var CameraRotation;
(function(CameraRotation2) {
  CameraRotation2[CameraRotation2["noCameraRotation"] = 0] = "noCameraRotation";
  CameraRotation2[CameraRotation2["degrees90"] = 1] = "degrees90";
  CameraRotation2[CameraRotation2["degrees180"] = 2] = "degrees180";
  CameraRotation2[CameraRotation2["degrees270"] = 3] = "degrees270";
})(CameraRotation || (CameraRotation = {}));
var styleCss = ":host{flex:1;height:100%;width:100%;display:flex}";
var SelphiWidget = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.moduleLoaded = createEvent(this, "moduleLoaded", 7);
    this.exceptionCaptured = createEvent(this, "exceptionCaptured", 7);
    this.userCancel = createEvent(this, "userCancel", 7);
    this.trackStatus = createEvent(this, "trackStatus", 7);
    this.stabilising = createEvent(this, "stabilising", 7);
    this.extractionTimeout = createEvent(this, "extractionTimeout", 7);
    this.extractionFinish = createEvent(this, "extractionFinish", 7);
    this.livenessErrorButtonClick = createEvent(this, "livenessErrorButtonClick", 7);
    this.timeoutErrorButtonClick = createEvent(this, "timeoutErrorButtonClick", 7);
    this.device = useDeviceInfo().device;
    this.node = void 0;
    this.loading = true;
    this.error = void 0;
    this.bundlePath = void 0;
    this.showLog = void 0;
    this.debugMode = void 0;
    this.language = void 0;
    this.accessibility = false;
    this.accessibleElements = ["button", "buttonImage"];
    this.tutorial = void 0;
    this.antispoofEnabled = false;
    this.externalCamera = void 0;
    this.cameraWidth = void 0;
    this.cameraHeight = void 0;
    this.cameraType = CameraType.Front;
    this.cameraRotation = CameraRotation.noCameraRotation;
    this.stabilizationStage = false;
    this.faceTracking = false;
    this.interactible = void 0;
    this.timeout = void 0;
    this.authenticateTime = 1;
    this.imageQuality = void 0;
    this.imageFormat = void 0;
    this.cropImage = void 0;
    this.cropFactor = void 0;
    this.logImages = void 0;
    this.bundlePathExternal = void 0;
    this.component = void 0;
  }
  watchNode(newValue) {
    if (newValue) {
      this.node.addEventListener("onModuleLoaded", this.onModuleLoaded.bind(this));
      this.node.addEventListener("onExtractionFinish", this.onExtractionFinish.bind(this));
      this.node.addEventListener("onUserCancel", this.onUserCancel.bind(this));
      this.node.addEventListener("onExceptionCaptured", this.onExceptionCaptured.bind(this));
      this.node.addEventListener("onLivenessErrorButtonClick", this.onLivenessErrorButtonClick.bind(this));
      this.node.addEventListener("onExtractionTimeout", this.onExtractionTimeout.bind(this));
      this.node.addEventListener("onTimeoutErrorButtonClick", this.onTimeoutErrorButtonClick.bind(this));
      this.node.addEventListener("onTrackStatus", this.onTrackStatus.bind(this));
      this.handleVideo();
    }
  }
  onTrackStatus(event) {
    this.trackStatus.emit(event);
  }
  onModuleLoaded(event) {
    this.moduleLoaded.emit(event);
  }
  onExtractionFinish(event) {
    this.extractionFinish.emit(event);
    event.stopPropagation();
    if (this.trackingElement) {
      this.trackingElement.trackingAsset(event.detail.bestImage.src, AssetsType.selfie);
    }
  }
  onUserCancel(event) {
    this.userCancel.emit(event);
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.cancelled, TrackingReason.selphiCancelUser);
    }
  }
  onExceptionCaptured(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.denied, TrackingReason.selphiInternalError);
    }
    this.exceptionCaptured.emit(event);
  }
  onLivenessErrorButtonClick(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.denied, TrackingReason.selphiInternalError);
    }
    this.livenessErrorButtonClick.emit(event);
  }
  onExtractionTimeout(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.expired, TrackingReason.selphiTimeout);
    }
    this.extractionTimeout.emit(event);
  }
  onTimeoutErrorButtonClick(event) {
    if (this.trackingElement) {
      this.trackingElement.trackingStatus(TrackingStatus.expired, TrackingReason.selphiTimeout);
    }
    this.timeoutErrorButtonClick.emit(event);
  }
  handleVideo() {
    if (this.channel) {
      const streamList = [this.channel.video.getMediaStreamTrack(), this.channel.audio.getMediaStreamTrack()];
      if (this.node) {
        this.node.setAttribute("externalcamera", "true");
        this.node.mountExternalCamera(new MediaStream(streamList));
      }
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
        await this.videoElement.setCameraFront();
      }
    }
  }
  async componentDidLoad() {
    await customElements.whenDefined("facephi-sdk-provider");
    this.trackingElement = document.querySelector("facephi-sdk-provider");
    if (this.trackingElement) {
      this.trackingElement.trackingEvent(TrackingSteps.selphiWidget, TrackingSteps.selphiWidget);
      await this.checkVideo();
      this.loading = false;
    } else {
      this.loading = false;
    }
    if (this.node) {
      this.node.addEventListener("onExtractionFinish", this.onExtractionFinish.bind(this));
      this.node.addEventListener("onUserCancel", this.onUserCancel.bind(this));
      this.node.addEventListener("onExceptionCaptured", this.onExceptionCaptured.bind(this));
      this.node.addEventListener("onLivenessErrorButtonClick", this.onLivenessErrorButtonClick.bind(this));
      this.node.addEventListener("onExtractionTimeout", this.onExtractionTimeout.bind(this));
      this.node.addEventListener("onTimeoutErrorButtonClick", this.onTimeoutErrorButtonClick.bind(this));
      if (this.trackStatus) {
        this.node.addEventListener("onTrackStatus", this.trackStatus);
      }
    }
  }
  updateComponent(newValue) {
    if (newValue) {
      this.error = void 0;
    } else {
      this.error = ERRORS.SELPHI_NOT_LICENSED;
    }
  }
  connectedCallback() {
    var _a;
    if (state.components) {
      this.component = (_a = state.components[LicenseComponents.selphiWidget]) !== null && _a !== void 0 ? _a : null;
    }
    this.disconnectComponent = onChange("components", (components) => {
      var _a2;
      this.component = (_a2 = components[LicenseComponents.selphiWidget]) !== null && _a2 !== void 0 ? _a2 : null;
    });
  }
  disconnectedCallback() {
    if (this.node) {
      this.node.removeEventListener("onExtractionFinish", this.onExtractionFinish.bind(this));
      this.node.removeEventListener("onUserCancel", this.onUserCancel.bind(this));
      this.node.removeEventListener("onExceptionCaptured", this.onExceptionCaptured.bind(this));
      this.node.removeEventListener("onLivenessErrorButtonClick", this.onLivenessErrorButtonClick.bind(this));
      this.node.removeEventListener("onExtractionTimeout", this.onExtractionTimeout.bind(this));
      this.node.removeEventListener("onTimeoutErrorButtonClick", this.onTimeoutErrorButtonClick.bind(this));
      if (this.trackStatus) {
        this.node.removeEventListener("onTrackStatus", this.trackStatus);
      }
    }
    this.disconnectComponent();
  }
  render() {
    return h(Host, null, !this.loading ? this.error ? h("p", null, this.error) : h("facephi-selphi", { ref: (el) => this.node = el, bundlePath: this.bundlePathExternal ? this.bundlePathExternal : window.location.origin + this.bundlePath, language: this.language, livenessMode: LivenessMode.Passive, interactible: setWidgetParam(this.interactible), tutorial: setWidgetParam(this.tutorial), logImages: setWidgetParam(this.logImages), cropFactor: this.cropFactor, cropImage: setWidgetParam(this.cropImage), externalCamera: setWidgetParam(this.externalCamera), showLog: setWidgetParam(this.showLog), debugMode: setWidgetParam(this.debugMode), accessibility: setWidgetParam(this.accessibility), accessibleElements: this.accessibleElements, cameraWidth: this.cameraWidth, cameraHeight: this.cameraHeight, cameraRotation: this.cameraRotation, cameraType: this.cameraType, antispoofEnabled: setWidgetParam(this.antispoofEnabled), stabilizationStage: setWidgetParam(this.stabilizationStage), faceTracking: setWidgetParam(this.faceTracking), timeout: this.timeout, imageQuality: this.imageQuality, imageFormat: this.imageFormat, authenticateTime: this.authenticateTime }) : null);
  }
  static get watchers() {
    return {
      "node": ["watchNode"],
      "component": ["updateComponent"]
    };
  }
};
SelphiWidget.style = styleCss;
export {
  SelphiWidget as facephi_selphi_widget
};
//# sourceMappingURL=facephi-selphi-widget.entry-R4BYTYTV.js.map
