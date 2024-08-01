import {
  ERRORS
} from "./chunk-HSXMT2AK.js";
import {
  LicenseComponents,
  TrackingReason,
  TrackingStatus,
  TrackingSteps,
  onChange,
  state
} from "./chunk-Z6DSV6CQ.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-HZFM5WJ6.js";
import "./chunk-PNDESK4O.js";

// node_modules/@facephi/sdk-web-wc/dist/esm/facephi-video-recruitment-widget.entry.js
var videoRecruitmentWidgetCss = ":host{flex:1;height:100%;width:100%;display:flex;margin:0;padding:0}";
var VideoRecruitmentWidget = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fullScreen = void 0;
    this.language = void 0;
    this.loading = true;
    this.error = void 0;
    this.operationId = void 0;
    this.tenantId = void 0;
    this.videoOptions = void 0;
    this.component = void 0;
  }
  updateComponent(newValue) {
    if (newValue) {
      this.videoOptions = { apiKey: newValue.parameters.apiKey, baseUrl: newValue.parameters.baseUrl };
      this.loading = false;
      this.error = void 0;
    } else {
      this.loading = false;
      this.error = ERRORS.VIDEO_RECRUITMENT_NOT_LICENSED;
    }
  }
  connectedCallback() {
    var _a, _b, _c;
    if (state.components) {
      this.component = (_a = state.components[LicenseComponents.videoRecruitment]) !== null && _a !== void 0 ? _a : null;
      this.tenantId = (_c = (_b = state.components[LicenseComponents.tracking]) === null || _b === void 0 ? void 0 : _b.parameters) === null || _c === void 0 ? void 0 : _c.tenantId;
    }
    this.disconnectComponent = onChange("components", (components) => {
      var _a2, _b2, _c2;
      this.component = (_a2 = components[LicenseComponents.videoRecruitment]) !== null && _a2 !== void 0 ? _a2 : null;
      this.tenantId = (_c2 = (_b2 = components[LicenseComponents.tracking]) === null || _b2 === void 0 ? void 0 : _b2.parameters) === null || _c2 === void 0 ? void 0 : _c2.tenantId;
    });
  }
  handleUserCancel() {
    if (this.sdkProvider) {
      this.sdkProvider.trackingStatus(TrackingStatus.cancelled, TrackingReason.videoRecruitmentCancelUser);
    }
  }
  handleOperationId(event) {
    this.operationId = event.detail;
  }
  watchOperationId() {
    if (this.operationId) {
      this.sdkProvider.trackingEvent(TrackingSteps.videoRecruitmentWidget, TrackingSteps.videoRecruitmentWidget);
      this.loading = false;
    }
  }
  async componentWillLoad() {
    await customElements.whenDefined("facephi-sdk-provider");
    this.sdkProvider = document.querySelector("facephi-sdk-provider");
    this.sdkProvider.addEventListener("emitOperationId", this.handleOperationId.bind(this));
    this.host.addEventListener("userCancel", this.handleUserCancel.bind(this));
  }
  disconnectedCallback() {
    this.sdkProvider.removeEventListener("emitOperationId", this.handleOperationId);
    this.host.removeEventListener("userCancel", this.handleUserCancel);
    this.disconnectComponent();
  }
  render() {
    var _a, _b;
    return h(Host, null, !this.loading ? this.error ? h("p", null, this.error) : h("video-recruitment", { fullScreen: this.fullScreen, language: this.language, operationId: this.operationId, tenantId: this.tenantId, apiKey: (_a = this.videoOptions) === null || _a === void 0 ? void 0 : _a.apiKey, apiUrl: `wss://${(_b = this.videoOptions) === null || _b === void 0 ? void 0 : _b.baseUrl}/identification` }) : null);
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "component": ["updateComponent"],
      "operationId": ["watchOperationId"]
    };
  }
};
VideoRecruitmentWidget.style = videoRecruitmentWidgetCss;
export {
  VideoRecruitmentWidget as facephi_video_recruitment_widget
};
//# sourceMappingURL=facephi-video-recruitment-widget.entry-RHX7MJPS.js.map
