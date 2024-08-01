import "./chunk-PNDESK4O.js";

// node_modules/@facephi/selphi-widget-web/selphi-widget-web.min.js
var e = { d: (t2, i2) => {
  for (var l2 in i2) e.o(i2, l2) && !e.o(t2, l2) && Object.defineProperty(t2, l2, { enumerable: true, get: i2[l2] });
} };
e.g = function() {
  if ("object" == typeof globalThis) return globalThis;
  try {
    return this || new Function("return this")();
  } catch (e2) {
    if ("object" == typeof window) return window;
  }
}(), e.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
var t = {};
e.d(t, { w: () => V });
var i = class {
  constructor(e2, t2, i2) {
    this.graphUrl = e2, this.graphReadyEvent = t2, this.graphNewStateEvent = i2, this.xmlHttpWidget = new XMLHttpRequest(), this.xmlHttpWidget.onreadystatechange = this.readyEvent.bind(this), this.xmlHttpWidget.open("GET", this.graphUrl), this.xmlHttpWidget.send(null);
  }
  readyEvent(e2) {
    if (4 == e2.target.readyState && 200 == e2.target.status) {
      var t2 = new DOMParser();
      this.xmlDoc = t2.parseFromString(e2.target.responseText, "text/xml"), this.graphReadyEvent();
    }
  }
  setInitialState(e2) {
    null != this.xmlDoc.querySelector("[name='" + e2 + "']") && (this.state = e2, this.graphNewStateEvent(this.state));
  }
  sendMessage(e2) {
    var t2 = this.xmlDoc.querySelector("[name='" + this.state + "']");
    if (null != t2) {
      var i2 = t2.querySelector("[message='" + e2 + "']");
      if (null != i2 || (e2 = e2.split("//")[0], null != (i2 = t2.querySelector("[message='" + e2 + "']")))) {
        var l2 = i2.getAttribute("to");
        this.state = l2, this.graphNewStateEvent(this.state);
      }
    }
  }
};
var l = class {
  constructor(e2, t2, i2, l2, c2, a2, d2) {
    var s2 = "";
    this.status = 0, this.logDebug = false, this.eventStatus = l2, this.caller = i2, this.baseURL = e2, t2.length > 0 && (s2 = t2 + "."), this.widgetLoaded = 0, this.languageCustomLoaded = 0, this.languageDefaultLoaded = 0, this.urlWidget = e2 + "/widget.xml", this.urlLanguageCustom = e2 + "/strings/strings." + s2 + "xml", this.urlLanguageDefault = e2 + "/strings/strings.es.xml", this.resourceDict = {}, this.dpiList = c2, this.browserDpi = a2, this.scaleFactor = d2;
    for (var m2 = 163 * a2 * d2, h2 = this.dpiList.length - 1, n2 = 0; n2 < this.dpiList.length; n2++) if (this.dpiList[n2] > m2) {
      h2 = n2;
      break;
    }
    this.dpi = this.dpiList[h2], this.imageScale = 163 / this.dpi, this.xmlHttpWidget = new XMLHttpRequest(), this.xmlHttpWidget.rm = this, this.xmlHttpWidget.onreadystatechange = (e3) => {
      if (4 == e3.target.readyState && 200 == e3.target.status) {
        var t3 = new DOMParser();
        e3.target.rm.widgetLoaded = 1, e3.target.rm.xmlDoc = t3.parseFromString(e3.target.responseText, "text/xml");
      } else 4 == e3.target.readyState && 200 != e3.target.status && (e3.target.rm.widgetLoaded = -1);
      e3.target.rm.readyEvent(e3);
    }, this.xmlHttpWidget.open("GET", this.urlWidget), this.xmlHttpWidget.send(null), this.xmlHttpLanguageCustom = new XMLHttpRequest(), this.xmlHttpLanguageCustom.rm = this, this.xmlHttpLanguageCustom.onreadystatechange = (e3) => {
      4 == e3.target.readyState && 200 == e3.target.status ? e3.target.rm.languageCustomLoaded = 1 : 4 == e3.target.readyState && 200 != e3.target.status && (e3.target.rm.languageCustomLoaded = -1), e3.target.rm.readyEvent(e3);
    }, this.xmlHttpLanguageCustom.open("GET", this.urlLanguageCustom), this.xmlHttpLanguageCustom.send(null);
  }
  readyEvent(e2) {
    if (0 !== e2.target.rm.widgetLoaded && (0 !== e2.target.rm.languageCustomLoaded || 0 !== e2.target.rm.languageDefaultLoaded)) {
      if (-1 == e2.target.rm.widgetLoaded) e2.target.rm.status = -1;
      else if (1 == e2.target.rm.languageCustomLoaded) {
        var t2 = e2.target.rm.xmlHttpLanguageCustom.responseText, i2 = new DOMParser();
        e2.target.rm.xmlLang = i2.parseFromString(t2, "text/xml"), e2.target.rm.status = 1;
      } else 1 == e2.target.rm.languageDefaultLoaded ? (t2 = e2.target.rm.xmlHttpLanguageDefault.responseText, i2 = new DOMParser(), e2.target.rm.xmlLang = i2.parseFromString(t2, "text/xml"), e2.target.rm.status = 1) : e2.target.rm.status = -1;
      if (1 == e2.target.rm.status) {
        let t3, i3 = {}, l2 = e2.target.rm.xmlDoc.querySelectorAll("[font]");
        for (let e3 = 0; e3 < l2.length; e3++) t3 = l2[e3].getAttribute("font"), t3.length > 0 && (i3[t3] = t3);
        e2.target.rm.fontRequestVector = [];
        let c2, a2 = document.getElementById("FPhi_Widget_style");
        for (c2 in null != a2 && a2.remove(), a2 = document.createElement("style"), a2.id = "FPhi_Widget_style", i3) {
          let t4 = e2.target.rm.getResourceUrlBase(i3[c2]), l3 = i3[c2], d2 = new XMLHttpRequest();
          d2.open("GET", t4, false), d2.send(), 200 == d2.status && a2.appendChild(document.createTextNode("@font-face { font-family: '" + l3 + "'; src: url('" + t4 + "'); }"));
        }
        document.head.appendChild(a2), e2.target.rm.eventStatus(e2.target.rm.caller, true);
      } else e2.target.rm.eventStatus(e2.target.rm.caller, false);
    }
  }
  static httpGet(e2, t2) {
    var i2 = new XMLHttpRequest();
    return i2.onreadystatechange = t2, i2.open("GET", e2), i2.send(null), 200 != i2.status ? "" : i2.responseText;
  }
  getElement(e2, t2, i2) {
    if ("facephi-widget-conf" == e2) return this.xmlDoc.getElementsByTagName("facephi-widget-conf")[0];
    var l2 = "_portrait";
    i2 && (l2 = "_landscape");
    var c2 = this.xmlDoc.querySelector("[id=" + e2 + l2 + "]");
    if (null != c2 && null != c2 || (c2 = this.xmlDoc.querySelector("[id=" + e2 + "]")), this.logDebug && console.log(c2), null != c2) {
      var a2 = c2.querySelector("[id=" + t2 + "]");
      return this.logDebug && console.log(a2), null == a2 ? void console.log("ResourceManager::getElement Error. elementId=" + t2 + " undefined. Please verify resource's bundle.") : a2;
    }
    console.log("ResourceManager::getElement Error. viewId=" + e2 + " undefined. Please verify resource's bundle.");
  }
  getElements(e2, t2) {
    var i2 = "_portrait";
    t2 && (i2 = "_landscape");
    var l2 = this.xmlDoc.querySelector("[id=" + e2 + i2 + "]");
    null != l2 && null != l2 || (l2 = this.xmlDoc.querySelector("[id=" + e2 + "]"));
    var c2 = [];
    if (l2) {
      for (var a2 = 0; a2 < l2.childNodes.length; a2++) if (l2.childNodes[a2].nodeType == Node.ELEMENT_NODE) {
        var d2 = null;
        void 0 !== l2.childNodes[a2].attributes.mode && (d2 = l2.childNodes[a2].attributes.mode.value), c2.push({ type: l2.childNodes[a2].nodeName, id: l2.childNodes[a2].attributes.id.value, mode: d2 });
      }
    }
    return 0 == c2.length && console.log("FPhi.ResourceManager: No elements for view=" + e2), c2;
  }
  isAttributeAvailable(e2, t2, i2, l2) {
    var c2 = null;
    if ("facephi-widget-conf" == e2) c2 = this.xmlDoc.getElementsByTagName("facephi-widget-conf")[0];
    else {
      var a2 = "_portrait";
      i2 && (a2 = "_landscape");
      var d2 = this.xmlDoc.querySelector("[id=" + e2 + a2 + "]");
      if (null != d2 && null != d2 || (d2 = this.xmlDoc.querySelector("[id=" + e2 + "]")), null != d2) {
        var s2 = d2.querySelector("[id=" + t2 + "]");
        null != s2 && (c2 = s2);
      }
    }
    if (null == c2 || null == c2) return false;
    var m2 = c2.getAttribute(l2);
    return null != m2 && null != m2;
  }
  getSetupColor(e2, t2, i2, l2) {
    var c2 = this.getElement(e2, t2, i2);
    if (null == c2 || null == c2) return null;
    var a2, d2, s2, m2, h2 = c2.getAttribute(l2);
    return null == h2 || null == h2 ? null : (9 == h2.length && (a2 = parseInt(h2.substring(1, 3), 16), d2 = parseInt(h2.substring(3, 5), 16), s2 = parseInt(h2.substring(5, 7), 16), m2 = parseInt(h2.substring(7, 9), 16), h2 = "rgba(" + a2 + ", " + d2 + ", " + s2 + ", " + (m2 /= 255).toFixed(3) + ")"), h2);
  }
  getSetupColorWithAlpha(e2, t2, i2, l2, c2) {
    var a2 = this.getElement(e2, t2, i2).getAttribute(l2);
    return "rgba(" + parseInt(a2.substring(1, 3), 16) + ", " + parseInt(a2.substring(3, 5), 16) + ", " + parseInt(a2.substring(5, 7), 16) + ", " + c2.toFixed(3) + ")";
  }
  getSetupFloat(e2, t2, i2, l2) {
    var c2 = this.getElement(e2, t2, i2).getAttribute(l2);
    return parseFloat(c2);
  }
  getSetupAlign(e2, t2, i2, l2) {
    return this.getElement(e2, t2, i2).getAttribute(l2);
  }
  getSetupResourceId(e2, t2, i2, l2) {
    var c2 = this.getElement(e2, t2, i2).getAttribute(l2), a2 = c2.split(",");
    return a2 && a2.length > 1 ? a2[Math.floor(Math.random() * a2.length)].trim() : c2;
  }
  getSetupTextId(e2, t2, i2, l2) {
    return this.getElement(e2, t2, i2).getAttribute(l2);
  }
  getSetupNodeType(e2, t2, i2) {
    return this.getElement(e2, t2, i2).getAttribute("content_type");
  }
  getResourceUrl(e2) {
    return this.baseURL + "/resources/" + this.dpi + "dpi/" + e2;
  }
  getResourceUrlBase(e2) {
    return this.baseURL + "/resources/" + this.dpiList[0] + "dpi/" + e2;
  }
  getImageScale() {
    return this.imageScale;
  }
  getImage(e2) {
    if (!(e2 in this.resourceDict)) {
      var t2 = this.getResourceUrl(e2), i2 = document.createElement("img");
      i2.src = t2, this.resourceDict[e2] = i2;
    }
    return this.resourceDict[e2];
  }
  translate(e2) {
    var t2 = e2, i2 = this.xmlLang.querySelector("[id=" + e2 + "]");
    return this.logDebug && console.log(i2), null != i2 && (t2 = i2.textContent), t2;
  }
};
var c = "";
var a = 2;
var d = class {
  static printDebug(...e2) {
    0 >= a && console.debug(`<D> [${c}] ${e2}`);
  }
  static printInfo(...e2) {
    1 >= a && console.debug(`<I> [${c}] ${e2}`);
  }
  static printWarning(...e2) {
    2 >= a && console.warn(`<W> [${c}] ${e2}`);
  }
  static printError(...e2) {
    3 >= a && console.error(`<E> [${c}] ${e2}`);
  }
  static setLoggerLevel(e2) {
    a = e2;
  }
  static setLoggerTag(e2) {
    c = e2;
  }
};
var s = { LivenessMode: { None: 0, Passive: 3 }, ExceptionType: { CameraError: 0, ExtractorError: 1, ControlNotInitializedError: 2, ImageCropResizeError: 3, UnexpectedCaptureError: 4, InitializingEngineError: 5 }, TemplateFormat: { ByteArray: 0, Base64: 1 }, ImageFormat: { None: 0, Gray_8bpp: 1, RGB_24bpp: 2, BGR_24bpp: 3, ARGB_32bpp: 4, YUV_NV21: 5, ABGR_32bpp: 6, BGRA_32bpp: 7, RGBA_32bpp: 8 }, SampleDiagnostic: { Ok: 0, FaceNotFound: 1, RightEyeNotFound: 2, LeftEyeNotFound: 3, EyesNotFound: 4, FaceTooFar: 5, FaceTooClose: 6, TooCloseToWindowSide: 7, AngleExceeded: 8, QualityCheckFailed: 9, NotRated: 10, TooManyFaces: 11 }, FinalDiagnostic: { InsufficientValidSamples: 0, TemplateCreationInProgress: 1, TemplateCreated: 2 }, LivenessDiagnostic: { NotRated: 0, PhotoDetected: 1, LivenessDetected: 2, Unsuccess: 3, UnsuccessLowPerformance: 4, UnsuccessGlasses: 5, UnsuccessLight: 6, UnsuccessNoMovement: 7, UnsuccessWrongDirection: 8, UnsuccessTooFar: 9 }, CameraType: { Front: 0, Back: 1 }, TrackStatus: { ChangeState: 0, Tap: 1, FaceState: 2, AccessibilityData: 3, Diagnostic: 4 }, RecorderType: { Local: 0, Remote: 1 }, VideoQuality: { Low: 0, Medium: 1, High: 2 }, Version: "5.40.0" };
if (!m) var m = {};
m.Selphi = s;
var h = class _h extends HTMLElement {
  constructor() {
    super(), d.setLoggerTag("selphi-widget-web"), d.setLoggerLevel(0);
    let t2 = "closed";
    if ("undefined" != typeof window && void 0 !== window.openShadow && true === window.openShadow && (t2 = "open"), this.__widgetContainer = this.attachShadow({ mode: t2 }), this.__widgetStyles = document.createElement("style"), this.__widgetStyles.innerText = "\n            :host { display: block; position: relative; margin: 0; padding: 0; width: 100%; height: 100%; min-height: 300px; min-width: 300px }\n            #accessibilityContainer { position: absolute; z-index: 999; width: 100%; height: 100% }\n            #cameraContainer { width: 100%; height: 100%; min-height: 300px; min-width: 300px }\n        ", this.__widgetContainer.append(this.__widgetStyles), this.__config = new m.Selphi.ConfigurationManager(), this.__config.setContainer(this.__widgetContainer), this.__externalCamera = null, this.__elementMounted = false, this.__accessibilityHasEnabled = false, "function" == typeof queueMicrotask) queueMicrotask.bind("undefined" != typeof window ? window : e.g);
    else {
      let e2 = null;
      window.queueMicrotask = (t3) => (e2 || (e2 = Promise.resolve())).then(t3).catch((e3) => setTimeout(() => {
        throw e3;
      }, 0));
    }
  }
  static get attributes() {
    return { bundlepath: { type: "string", property: "bundlePath", private: false }, resourcespath: { type: "string", property: "resourcesPath", private: false }, graphpath: { type: "string", property: "graphPath", private: false }, timeout: { type: "number", property: "timeout", private: false }, language: { type: "string", property: "language", private: false }, dpilist: { type: "string", property: "dpiList", private: false }, tutorial: { type: "boolean", property: "tutorial", private: false }, interactible: { type: "boolean", property: "interactible", private: false }, logimages: { type: "boolean", property: "logImages", private: false }, minlogimages: { type: "number", property: "minLogImages", private: false }, stabilizationstage: { type: "boolean", property: "stabilizationStage", private: false }, antispoofenabled: { type: "boolean", property: "antispoofEnabled", private: false }, camerawidth: { type: "number", property: "cameraWidth", private: false }, cameraheight: { type: "number", property: "cameraHeight", private: false }, camerarotation: { type: "number", property: "cameraRotation", private: false }, cameratype: { type: "number", property: "cameraType", private: false }, cameraswitchbutton: { type: "boolean", property: "cameraSwitchButton", private: false }, cameraid: { type: "string", property: "cameraId", private: false }, livenessmode: { type: "number", property: "livenessMode", private: false }, livenessprecision: { type: "number", property: "livenessPrecision", private: false }, livenessmodeinitialerror: { type: "number", property: "livenessMoveInitialError", private: false }, livenessmoveinfotime: { type: "number", property: "livenessMoveInfoTime", private: false }, cropfactor: { type: "number", property: "cropFactor", private: false }, cropimage: { type: "boolean", property: "cropImage", private: false }, authenticatetime: { type: "number", property: "authenticateTime", private: false }, imageformat: { type: "string", property: "imageFormat", private: false }, imagequality: { type: "number", property: "imageQuality", private: false }, templateformat: { type: "number", property: "templateFormat", private: false }, videorecord: { type: "boolean", property: "videoRecord", private: false }, videorecordrate: { type: "number", property: "videoRecordRate", private: false }, videorecordscale: { type: "number", property: "videoRecordScale", private: false }, videoquality: { type: "number", property: "videoQuality", private: false }, videorecordtype: { type: "number", property: "videoRecordType", private: false }, showlog: { type: "boolean", property: "showLog", private: false }, debugmode: { type: "boolean", property: "debugMode", private: false }, externalcamera: { type: "boolean", property: "externalCamera", private: true }, epheremalkey: { type: "string", property: "epheremalKey", private: true }, facetracking: { type: "boolean", property: "faceTracking", private: false }, accessibility: { type: "boolean", property: "accessibility", private: false }, accessibleelements: { type: "array", property: "accessibleElements", private: false }, onmoduleloaded: { type: "event", property: "FPhi.UserControl.ModuleLoaded.event", private: false }, onstabilizing: { type: "event", property: "FPhi.UserControl.Stabilizing.event", private: false }, onextractionfinish: { type: "event", property: "FPhi.UserControl.Finish.event", private: false }, onusercancel: { type: "event", property: "FPhi.UserControl.UserCancel.event", private: false }, onexceptioncaptured: { type: "event", property: "FPhi.UserControl.ExceptionCaptured.event", private: false }, onlivenesserror: { type: "event", property: "FPhi.UserControl.LivenessError.event", private: false }, onlivenesserrorbuttonclick: { type: "event", property: "FPhi.UserControl.LivenessErrorButtonClick.event", private: false }, onextractiontimeout: { type: "event", property: "FPhi.UserControl.ExtractionTimeout.event", private: false }, ontimeouterrorbuttonclick: { type: "event", property: "FPhi.UserControl.TimeoutErrorButtonClick.event", private: false }, ontrackstatus: { type: "event", property: "FPhi.UserControl.TrackStatus.event", private: false }, onaccessibilitystatus: { type: "event", property: "FPhi.UserControl.AccessibilityStatus.event", private: false } };
  }
  connectedCallback() {
    queueMicrotask(() => this.__createUserControl(this.__config).__startUserControl().then(() => this.__elementMounted = true));
  }
  disconnectedCallback() {
    queueMicrotask(() => this.__stopUserControl().then(() => this.__elementMounted = false));
  }
  reconnectedCallback() {
    queueMicrotask(async () => this.__restartUserControl(this.__config));
  }
  attributeChangedCallback(e2, t2, i2) {
    this.__setNativeConfiguration(e2, i2) && this.reconnectedCallback();
  }
  addWidgetEventListener(e2, t2) {
    this.addEventListener(e2, t2, true);
  }
  addEventListener(e2, t2, i2) {
    const l2 = e2.toLowerCase().replace("-", ""), c2 = _h.attributes[l2];
    this.__widgetContainer.addEventListener(c2.property, t2, i2);
  }
  static get observedAttributes() {
    return Object.getOwnPropertyNames(this.attributes);
  }
  mountExternalCamera(e2) {
    "true" === this.getAttribute("externalcamera") ? (this.__externalCamera = e2, this.__elementMounted && this.reconnectedCallback()) : d.printWarning("FPhi.Widget.Component: An external camera has been tried to be inserted, but we weren't expecting it, so it will be ignored....");
  }
  static generateTemplateRawFromByteArray(e2, t2, i2) {
    const l2 = new m.Selphi.ConfigurationManager();
    "string" == typeof e2 ? l2.setBundlePath(e2) : "object" == typeof e2 && Object.keys(e2).forEach((t3) => {
      const i3 = _h.__getSetterAttr(t3, l2);
      (l2 ? i3.bind(l2) : i3)(e2[t3]);
    }), l2.setContainer(document.createElement("div")), new m.Selphi.Widget(l2).GenerateTemplateRawFromByteArray(t2, i2);
  }
  static async checkCapabilities() {
    return await m.Selphi.CheckCapabilities();
  }
  routeClick(e2, t2) {
    this.__fphiWidget.routeClick(e2, t2);
  }
  __createUserControl(e2) {
    return this.__fphiWidget = new m.Selphi.Widget(e2), (null !== this.getAttribute("debugMode") && void 0 !== this.getAttribute("debugMode") || null !== this.getAttribute("debugmode") && void 0 !== this.getAttribute("debugmode")) && (this.__fphiWidget.debug = _h.__tryParsePrimitive(this.getAttribute("debugMode"))), this;
  }
  async __startUserControl() {
    return this.__fphiWidget && (null !== this.__externalCamera ? this.__fphiWidget.Start(this.__externalCamera) : this.__fphiWidget.Start()), this;
  }
  async __stopUserControl() {
    return this.__fphiWidget && (this.__fphiWidget.Stop(), this.__fphiWidget = null), this;
  }
  async __restartUserControl(e2) {
    try {
      if (this.__fphiWidget) {
        const t2 = new m.Selphi.Widget(e2), i2 = this.__fphiWidget;
        this.__cleanWidgetContainer(), this.__fphiWidget = t2, await this.__startUserControl(), i2.Stop();
      }
    } catch (e3) {
    }
  }
  __setNativeConfiguration(e2, t2) {
    let i2 = false;
    if (void 0 !== _h.attributes[e2] && null !== _h.attributes[e2]) {
      const l2 = _h.attributes[e2].property, c2 = _h.attributes[e2].type, a2 = t2, s2 = Reflect.get(this.__config, l2);
      if (null != t2 && a2 !== s2) {
        let e3 = "event" !== c2 ? _h.__tryParsePrimitive(t2) : _h.__tryParseFunction(t2);
        if (d.printDebug(`${l2} = ${e3}`), "debugMode" === l2) void 0 !== this.__fphiWidget && null !== this.__fphiWidget && "function" != typeof e3 && (this.__fphiWidget.debug = e3, i2 = i2 || false);
        else {
          if ("accessibility" !== l2 || true !== e3 || this.__accessibilityHasEnabled || (this.accessibilityRoot = document.createElement("div"), this.accessibilityRoot.id = "accessibilityContainer", this.__widgetContainer.append(this.accessibilityRoot), this.__accessibilityHasEnabled = true), "function" == typeof e3 && "event" === c2) this.__widgetContainer.addEventListener(l2, e3, true);
          else {
            const t3 = _h.__getSetterAttr(l2, this.__config);
            (this.__config ? t3.bind(this.__config) : t3)(e3);
          }
          i2 = this.__elementMounted;
        }
      }
    }
    return i2;
  }
  __cleanWidgetContainer() {
    this.__widgetContainer.innerHTML = "", this.__widgetContainer.append(this.__widgetStyles);
  }
  static __getSetterAttr(e2, t2) {
    return t2["set" + e2.charAt(0).toUpperCase() + e2.slice(1)];
  }
  static __tryParsePrimitive(e2) {
    try {
      return JSON.parse(e2);
    } catch (t2) {
      return e2.toString();
    }
  }
  static __tryParseFunction(e2) {
    try {
      return new Function("event", e2);
    } catch (t2) {
      return e2.toString();
    }
  }
};
var n = class {
  constructor(e2) {
    this.width = 0, this.height = 0, this.landscape = false;
  }
  cacheResources() {
  }
  setCanvasSize(e2, t2) {
    this.width = e2, this.height = t2, this.landscape = this.width >= this.height;
  }
  getCameraRect(e2, t2, i2, l2) {
    this.setCanvasSize(e2.canvas.clientWidth, e2.canvas.clientHeight);
    var c2 = this.scaleRect({ width: t2, height: i2 }, { x: 0, y: 0, width: this.width, height: this.height });
    return c2.visible = true, c2;
  }
  getResourceIdForState(e2) {
    throw new Error("FPhi.Widget.drawer.abstract.js: Can't instantiate abstract class");
  }
  onMouseMove(e2, t2, i2, l2, c2) {
    e2.style.cursor = "button" == c2 || "buttonImage" == c2 ? "pointer" : "default";
  }
  draw(e2, t2, i2, l2, c2, a2, d2, s2, m2) {
    throw new Error("Can't instantiate abstract class");
  }
  getLayout(e2, t2, i2, l2, c2, a2, d2) {
    throw new Error("Can't instantiate abstract class");
  }
  cacheAnimation(e2, t2) {
    if (this.rm.isAttributeAvailable(e2, t2, this.landscape, "id")) for (var i2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "name"), l2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "ext"), c2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "start")), a2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "end")), d2 = c2; d2 <= a2; d2++) {
      var s2 = i2 + ("0" + d2).slice(-2) + "." + l2;
      this.rm.getImage(s2);
    }
  }
  scaleRect(e2, t2, i2) {
    var l2 = t2.x + t2.width / 2, c2 = t2.y + t2.height / 2, a2 = t2.width / e2.width, d2 = t2.height / e2.height, s2 = e2.width * a2, m2 = e2.height * a2;
    return null == i2 ? m2 < t2.height && (s2 = e2.width * d2, m2 = e2.height * d2) : m2 >= t2.height && (s2 = e2.width * d2, m2 = e2.height * d2), { x: l2 - s2 / 2, y: c2 - m2 / 2, width: s2, height: m2 };
  }
  drawButtonImage(e2, t2, i2, l2, c2, a2, d2, s2) {
    var m2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "value"), h2 = this.rm.getImage(m2), n2 = this.canvasSizeFactor * this.rm.getImageScale(), Z2 = h2.width * n2, b2 = h2.height * n2;
    e2.drawImage(h2, t2.x + t2.width / 2 - Z2 / 2, t2.y + t2.height / 2 - b2 / 2, Z2, b2);
  }
  fillRoundRect(e2, t2, i2, l2, c2, a2) {
    l2 < 2 * a2 && (a2 = l2 / 2), c2 < 2 * a2 && (a2 = c2 / 2), e2.beginPath(), e2.moveTo(t2 + a2, i2), e2.arcTo(t2 + l2, i2, t2 + l2, i2 + c2, a2), e2.arcTo(t2 + l2, i2 + c2, t2, i2 + c2, a2), e2.arcTo(t2, i2 + c2, t2, i2, a2), e2.arcTo(t2, i2, t2 + l2, i2, a2), e2.closePath(), e2.fill();
  }
  drawButton(e2, t2, i2, l2) {
    if (this.rm.isAttributeAvailable(i2, l2, this.landscape, "radius")) {
      let c3 = this.rm.getSetupFloat(i2, l2, this.landscape, "radius");
      e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "decorator"), this.fillRoundRect(e2, t2.x, t2.y + 4, t2.width, t2.height - 4, c3), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "background"), this.fillRoundRect(e2, t2.x, t2.y, t2.width, t2.height - 4, c3);
    } else e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "decorator"), e2.fillRect(t2.x, t2.y + 4, t2.width, t2.height - 4), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "background"), e2.fillRect(t2.x, t2.y, t2.width, t2.height - 4);
    var c2 = this.rm.getSetupAlign(i2, l2, this.landscape, "align"), a2 = this.rm.getSetupNodeType(i2, l2), d2 = 10 * this.canvasSizeFactor;
    if ("TEXT_ID" == a2) {
      var s2 = this.rm.getSetupTextId(i2, l2, this.landscape, "content"), m2 = this.rm.translate(s2), h2 = this.rm.getSetupFloat(i2, l2, this.landscape, "font_size");
      h2 = Math.round(h2 * this.fontSizeFactor);
      var n2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "font");
      e2.font = h2 + "px '" + n2 + "'", e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "foreground");
      var Z2 = e2.measureText(m2);
      "LEFT" == c2 ? e2.fillText(m2, t2.x + d2, t2.y + t2.height / 2) : "RIGHT" == c2 ? e2.fillText(m2, t2.x + t2.width - Z2.width - d2, t2.y + t2.height / 2) : e2.fillText(m2, t2.x + t2.width / 2 - Z2.width / 2, t2.y + t2.height / 2);
    } else {
      s2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "content");
      var b2 = this.rm.getImage(s2), o2 = this.canvasSizeFactor * this.rm.getImageScale();
      "LEFT" == c2 ? e2.drawImage(b2, t2.x + d2, t2.y + t2.height / 2 - b2.height * o2 / 2, b2.width * o2, b2.height * o2) : "RIGHT" == c2 ? e2.drawImage(b2, t2.x + t2.width - b2.width * o2 - d2, t2.y + t2.height / 2 - b2.height * o2 / 2, b2.width * o2, b2.height * o2) : e2.drawImage(b2, t2.x + t2.width / 2 - b2.width * o2 / 2, t2.y + t2.height / 2 - b2.height * o2 / 2, b2.width * o2, b2.height * o2);
    }
  }
  drawImage(e2, t2, i2, l2, c2, a2, d2, s2) {
    var m2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "value"), h2 = this.rm.getImage(m2), n2 = false;
    if (this.rm.isAttributeAvailable(i2, l2, this.landscape, "scale") && "CONTAINER" == this.rm.getSetupResourceId(i2, l2, this.landscape, "scale") && (n2 = true), n2) e2.drawImage(h2, t2.x, t2.y, t2.width, t2.height);
    else {
      var Z2 = this.canvasSizeFactor * this.rm.getImageScale(), b2 = h2.width * Z2, o2 = h2.height * Z2;
      e2.drawImage(h2, t2.x + t2.width / 2 - b2 / 2, t2.y + t2.height / 2 - o2 / 2, b2, o2);
    }
  }
  drawImageWithClippingCircle(e2, t2, i2, l2, c2, a2) {
    e2.save(), e2.beginPath(), e2.arc(l2, c2, a2, 0, 2 * Math.PI, false), e2.clip(), e2.drawImage(i2, t2.x, t2.y, t2.width, t2.height), e2.restore();
  }
  drawStringMultiline(e2, t2, i2, l2, c2, a2, d2, s2, m2, h2 = []) {
    if (!(a2 <= 0)) {
      e2.imageSmoothingEnabled = false, a2 = Math.round(a2 * this.fontSizeFactor), e2.font = a2 + "px '" + c2 + "'", e2.fillStyle = l2, e2.textBaseline = "middle";
      var n2 = t2.split("\n");
      if (h2.length > 0) {
        let o3 = true;
        for (var Z2 = 0; Z2 < n2.length; Z2++) {
          var b2 = e2.measureText(n2[Z2]);
          let t3 = Z2;
          t3 >= h2.length && (t3 = h2.length - 1), b2.width > i2.width * h2[t3] && (o3 = false);
        }
        if (0 == o3) return void this.drawStringMultiline(e2, t2, i2, l2, c2, a2 - 1, d2, s2, m2, h2);
      }
      var o2 = i2.y;
      if ("CENTER" == m2) {
        var r2 = n2.length * d2;
        o2 = i2.y + i2.height / 2 - r2 / 2 + a2 / 2;
      } else "BOTTOM" == m2 && (r2 = n2.length * d2, o2 = i2.y + i2.height - r2);
      for (Z2 = 0; Z2 < n2.length; Z2++) {
        b2 = e2.measureText(n2[Z2]);
        var g2 = i2.width / 2 - b2.width / 2;
        "LEFT" == s2 ? g2 = 0 : "RIGHT" == s2 && (g2 = i2.width - b2.width), e2.fillText(n2[Z2], i2.x + g2, o2 + Z2 * d2);
      }
    }
  }
};
if (!Z) var Z = {};
Z.SelphID = s;
var b = class extends n {
  constructor(e2) {
    super(e2), this.livenessMode = e2.livenessMode, this.stabilizationStage = e2.stabilizationStage, this.canvasSizeFactor = e2.canvasSizeFactor, this.fontSizeFactor = e2.fontSizeFactor, this.buttonHeight = 60 * this.canvasSizeFactor, this.faceCenterOffset = { x: 0, y: 0 }, this.faceCenterOffsetTarget = { x: 0, y: 0 }, this.enableButtonCamera = e2.enableButtonCamera, this.cameraCount = 0;
  }
  setCanvasSize(e2, t2) {
    this.width = e2, this.height = t2, this.landscape = this.width >= this.height, this.circleX = this.width / 2, this.circleY = 0.38 * this.height, this.circleRadius = 0.31 * this.height, this.circleRadius > this.width / 2 - 15 && (this.circleRadius = this.width / 2 - 15);
  }
  getCameraRect(e2, t2, i2, l2) {
    this.setCanvasSize(e2.canvas.clientWidth, e2.canvas.clientHeight);
    var c2 = this.scaleRect({ width: t2, height: i2 }, { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius });
    return c2.visible = true, c2;
  }
  faceInsideCircle(e2) {
    var t2 = this.circleRadius, i2 = this.circleX, l2 = this.circleY, c2 = i2 - t2, a2 = i2 + t2, d2 = l2 - t2, s2 = l2 + t2, m2 = { x: e2.x, y: e2.y, width: e2.width, height: e2.height };
    return Math.max(0, Math.min(m2.x + m2.width, a2) - Math.max(m2.x, c2)) * Math.max(0, Math.min(m2.y + m2.height, s2) - Math.max(m2.y, d2)) / (m2.width * m2.height) > 0.75;
  }
  getResourceIdForState(e2) {
    return "UCWaitingFaceStart" == e2 || "UCCameraSwitch" == e2 ? "StartExtractor" : "UCExtracting" == e2 || "UCLivenessDetectionStep1" == e2 || "UCLivenessDetectionStep2" == e2 || "UCLivenessDetectionStep3" == e2 || "UCWaitingEyeDetection" == e2 ? "Extractor" : "UCLivenessMoveStabilizing" == e2 || "UCLivenessMoveStabilized" == e2 || "UCLivenessMoveDetecting" == e2 || "UCLivenessMoveProcessing" == e2 ? "LivenessMove" : "UCLivenessMoveInfo" == e2 ? "LivenessInfo" : "UCTutorialRegister1" == e2 ? "RegistrationTips" : "UCTutorialRegister2" == e2 ? "FaceMovementTips" : "UCShowResults" == e2 ? "Results" : "UCWizardCompleted" == e2 ? "Success" : "UCTutorialBlink1" == e2 ? "Tutorial1" : "UCTutorialBlink2" == e2 ? "Tutorial2" : "UCTutorialBlink3" == e2 ? "Tutorial3" : "UCTutorialMove1" == e2 ? "TutorialMove1" : "UCTutorialMove2" == e2 ? "TutorialMove2" : "UCTutorialMove3" == e2 ? "TutorialMove3" : "UCWaitRecording" == e2 ? "WaitRecording" : "UCErrors" == e2 || "UCErrorFinish" == e2 ? "Error" : "UCFinish" == e2 ? "Finish" : null;
  }
  onMouseMove(e2, t2, i2, l2, c2) {
    e2.style.cursor = "button" == c2 || "buttonImage" == c2 ? "pointer" : "default";
  }
  draw(e2, t2, i2, l2, c2, a2, d2, s2, m2) {
    if (e2.imageSmoothingEnabled = true, "background" == c2) this.drawBackground(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("backgroundFull" == c2) this.drawBackgroundFull(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("button" == c2) this.drawButton(e2, t2, i2, l2);
    else if ("buttonImage" == c2) this.drawButtonImage(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("image" == c2) this.drawImage(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("imageError" == c2) this.drawImageError(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("text" == c2) this.drawText(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("faceSearcher" == c2) this.drawFaceSearcher(e2, t2, i2, l2, a2, d2, s2, m2);
    else if ("video" == c2) "Extractor" == i2 || this.drawImageWithClippingCircle(e2, t2, m2.player, t2.x + t2.width / 2, t2.y + t2.height / 2, t2.width / 2);
    else if ("camera" == c2) {
      var h2 = m2.progress, n2 = this.rm.getSetupFloat("facephi-widget-conf", "", this.landscape, "width_progress_bar"), Z2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_progress_bar"), b2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_warning_message"), o2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_excellent"), r2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_low");
      let c3 = "solid";
      this.rm.isAttributeAvailable(i2, l2, this.landscape, "type") && (c3 = this.rm.getSetupResourceId(i2, l2, this.landscape, "type")), e2.save(), e2.beginPath(), e2.arc(this.circleX, this.circleY, this.circleRadius, 0, 2 * Math.PI, false), e2.clip(), "UCLivenessMoveStabilizing" != m2.state && "UCLivenessMoveStabilized" != m2.state && "UCLivenessMoveDetecting" != m2.state && "UCLivenessMoveProcessing" != m2.state || (e2.fillStyle = "#00000033", e2.fillRect(t2.x, t2.y, t2.width, t2.height)), e2.restore();
      var g2 = Z2;
      if ("Warning" == s2 && (g2 = b2), "UCLivenessMoveStabilized" == m2.state || "UCLivenessMoveDetecting" == m2.state || "UCLivenessMoveProcessing" == m2.state) h2 = 1, g2 = m2.liveness_move_last_result ? o2 : r2, "UCLivenessMoveDetecting" != m2.state && "UCLivenessMoveProcessing" != m2.state || (e2.beginPath(), e2.strokeStyle = Z2, e2.lineWidth = n2, e2.lineCap = "round", e2.arc(this.circleX, this.circleY, this.circleRadius - e2.lineWidth / 2 + 0.5, -Math.PI / 2, 2 * Math.PI - Math.PI / 2), e2.stroke());
      else if (h2 > 1 && (h2 = 1), h2 = h2 * h2 * (3 - 2 * h2), "solid" == c3) "UCLivenessMoveStabilizing" == m2.state && (h2 = 1), 0 == h2 && "Warning" == s2 && (e2.beginPath(), e2.strokeStyle = r2, e2.lineWidth = n2, e2.lineCap = "round", e2.arc(this.circleX, this.circleY, this.circleRadius - e2.lineWidth / 2 + 0.5, -Math.PI / 2, 2 * Math.PI - Math.PI / 2), e2.stroke()), e2.beginPath(), e2.strokeStyle = g2, e2.lineWidth = n2, e2.lineCap = "round", e2.arc(this.circleX, this.circleY, this.circleRadius - e2.lineWidth / 2 + 0.5, -Math.PI / 2, 2 * Math.PI * h2 - Math.PI / 2), e2.stroke();
      else if ("bars" == c3) {
        let t3 = this.rm.getSetupFloat(i2, l2, this.landscape, "elements"), c4 = this.rm.getSetupFloat(i2, l2, this.landscape, "area");
        c4 = 2 * Math.PI * this.circleRadius / t3 * c4;
        let a3 = 2;
        this.rm.isAttributeAvailable(i2, l2, this.landscape, "offset") && (a3 = this.rm.getSetupFloat(i2, l2, this.landscape, "offset"));
        let d3 = "#939298";
        this.rm.isAttributeAvailable(i2, l2, this.landscape, "background_color") && (d3 = this.rm.getSetupColor(i2, l2, this.landscape, "background_color")), "Warning" != s2 && 0 == h2 && (g2 = d3);
        let Z3 = 2 * Math.PI * h2;
        e2.save(), e2.translate(this.circleX, this.circleY);
        let b3 = 2 * Math.PI / t3;
        for (let i3 = 0; i3 < t3; i3++) (b3 * i3 < Z3 || 0 == Z3) && "UCExtracting" == m2.state ? e2.fillStyle = g2 : e2.fillStyle = d3, e2.fillRect(-c4 / 2, -this.circleRadius - a3 - n2, c4, n2), e2.rotate(b3);
        e2.restore();
      }
    } else if ("results" == c2) {
      var u2 = d2 / (1 + 1.5 * m2.progress);
      u2 > 1 && (u2 = 1), u2 = (u2 *= 2 - u2) < 0.5 ? 2 * u2 * u2 : (4 - 2 * u2) * u2 - 1, e2.beginPath(), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "background_color"), e2.arc(this.circleX, this.circleY, this.circleRadius, -Math.PI / 2, 2 * Math.PI - Math.PI / 2), e2.fill();
      var I2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_excellent");
      m2.progress <= 0.33 ? I2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_low") : m2.progress <= 0.66 && (I2 = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_good")), e2.beginPath(), e2.strokeStyle = I2, e2.lineWidth = this.rm.getSetupFloat("facephi-widget-conf", "", this.landscape, "width_progress_bar"), e2.lineCap = "round", e2.arc(this.circleX, this.circleY, this.circleRadius - e2.lineWidth / 2 * 0.5, -Math.PI / 2, 2 * Math.PI * m2.progress * u2 - Math.PI / 2), e2.stroke();
      var y2 = "", G2 = "";
      m2.progress >= 1 ? (y2 = this.rm.translate("results_quality_excellent"), G2 = this.rm.translate("results_quality_message")) : m2.progress >= 0.333 ? (y2 = this.rm.translate("results_quality_good"), G2 = this.rm.translate("results_quality_message")) : (y2 = this.rm.translate("results_quality_low"), G2 = this.rm.translate("results_quality_message"));
      var X2 = this.rm.getSetupFloat(i2, l2, this.landscape, "fontResult_size"), p2 = X2 + 1, W2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "fontResult"), V2 = "CENTER", R2 = "TOP";
      this.drawStringMultiline(e2, y2, { x: 0, y: this.circleY - 5, width: this.width, height: this.height }, I2, W2, X2, p2, V2, R2), p2 = (X2 = this.rm.getSetupFloat(i2, l2, this.landscape, "fontQuality_size")) + 1, W2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "fontQuality"), V2 = "CENTER", R2 = "TOP", this.drawStringMultiline(e2, G2, { x: 0, y: this.circleY + 5 + X2, width: this.width, height: this.height }, I2, W2, X2, p2, V2, R2);
    } else if ("animation" == c2) {
      var C2 = 0;
      "livenessMoveDirection" in m2 && (C2 = m2.livenessMoveDirection), "liveness_move" != l2 && (C2 = 0), this.drawAnimation(e2, t2, i2, l2, a2, d2, s2, m2, C2);
    } else if ("progress" == l2) e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "background_color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "progress_color"), e2.fillRect(t2.x, t2.y, t2.width * m2.progress, t2.height);
    else if ("progressRecord" == l2) {
      e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "background_color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "progress_color");
      let c3 = 0.2 * t2.width, a3 = d2 % 2 / 1.6, s3 = t2.width * a3 - c3, m3 = s3 + c3;
      s3 < 0 && (s3 = 0), s3 > t2.width && (s3 = t2.width), m3 > t2.width && (m3 = t2.width), e2.fillRect(t2.x + s3, t2.y, m3 - s3, t2.height);
    }
  }
  getLayout(e2, t2, i2, l2, c2, a2, d2) {
    if ("Tutorial1" == e2 || "Tutorial2" == e2 || "Tutorial3" == e2 || "TutorialMove1" == e2 || "TutorialMove2" == e2 || "TutorialMove3" == e2) {
      if ("background" == t2) return { x: 0, y: 0, width: this.width, height: this.height };
      if ("backgroundFull" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
      if ("video" == i2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
      if ("tip" == t2) return { x: 0, y: 0.75 * this.height, width: this.width, height: 0.1 * this.height };
      if ("tip_detail" == t2) return { x: 0, y: 0.82 * this.height, width: this.width, height: 0.1 * this.height };
      if ("button_skip" == t2) return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_back" == t2) return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_next" == t2) return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_done" == t2) return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_exit" == t2) {
        var s2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "value"), m2 = this.rm.getImage(s2), h2 = this.canvasSizeFactor * this.rm.getImageScale(), n2 = m2.width * h2, Z2 = m2.height * h2;
        return { x: this.width - n2 - 30, y: 0, width: n2 + 30, height: Z2 + 30 };
      }
      if ("liveness_move" == t2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
    } else {
      if ("background" == t2) return { x: 0, y: 0, width: this.width, height: this.height };
      if ("backgroundFull" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
      if ("tip_video" == t2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
      if ("imageError" == t2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
      if ("video_success" == t2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
      if ("extraction_video" == t2) return { x: this.width / 2 - 0.1 * this.width, y: 0.73 * this.height, width: 0.2 * this.width, height: 0.2 * this.width };
      if ("tip" == t2) return { x: 0, y: 0.75 * this.height, width: this.width, height: 0.1 * this.height };
      if ("text_error" == t2) return { x: 0, y: 0.75 * this.height, width: this.width, height: 0.1 * this.height };
      if ("text" == t2) return { x: 0, y: this.circleY + this.circleRadius + 10, width: this.width, height: this.height - this.buttonHeight + 10 - (this.circleY + this.circleRadius) };
      if ("tip_detail" == t2) return { x: 0, y: 0.82 * this.height, width: this.width, height: 0.1 * this.height };
      if ("button_skip" == t2) return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_next" == t2) return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_done" == t2) return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_audio" == t2) return { x: this.width / 2 - 100, y: 0, width: 37, height: 37 };
      if ("button_audio_text" == t2) return { x: this.width / 2 - 60, y: 0, width: 125, height: 35 };
      if ("button_start" == t2) {
        let e3 = 209 * this.canvasSizeFactor;
        return { x: this.width / 2 - e3 / 2, y: this.height - this.buttonHeight + 10, width: e3, height: this.buttonHeight - 10 };
      }
      if ("button_error" == t2) return { x: this.width / 4, y: this.height - this.buttonHeight + 10, width: this.width / 2, height: this.buttonHeight - 10 };
      if ("button_back" == t2) return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
      if ("button_repeat" == t2) return { x: 0.05 * this.width, y: this.height - this.buttonHeight, width: 0.4 * this.width, height: this.buttonHeight };
      if ("button_finish" == t2) return { x: 0.55 * this.width, y: this.height - this.buttonHeight, width: 0.4 * this.width, height: this.buttonHeight };
      if ("button_exit" == t2) return s2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "value"), m2 = this.rm.getImage(s2), h2 = this.canvasSizeFactor * this.rm.getImageScale(), n2 = m2.width * h2, Z2 = m2.height * h2, { x: this.width - n2 - 30, y: 0, width: n2 + 30, height: Z2 + 30 };
      if ("button_info" == t2) ;
      else {
        if ("button_camera" == t2) return this.cameraCount < 2 || !this.enableButtonCamera ? null : (s2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "value"), m2 = this.rm.getImage(s2), h2 = this.canvasSizeFactor * this.rm.getImageScale(), n2 = m2.width * h2, Z2 = m2.height * h2, { x: this.width - n2 - 30, y: this.height - Z2 - 18, width: n2 + 30, height: Z2 + 18 });
        if ("warning" == t2) return { x: 0, y: this.circleY + this.circleRadius + 10, width: this.width, height: this.height - this.buttonHeight + 10 - (this.circleY + this.circleRadius) };
        if ("warningTooFar" == t2) return { x: 0, y: 0.89 * this.height, width: this.width, height: 0.1 * this.height };
        if ("camera" == i2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("results" == i2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("liveness_move_text" == t2) return "UCLivenessMoveProcessing" == d2.state && c2 < 0.5 ? null : { x: 0, y: this.circleY + this.circleRadius + 10, width: this.width, height: this.height - this.buttonHeight + 10 - (this.circleY + this.circleRadius) };
        if ("liveness_move_tip_text" == t2) return { x: this.circleX - this.circleRadius, y: this.circleY - 0.39 * this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("livenessInfo_text" == t2) return { x: 0, y: 0.89 * this.height, width: this.width, height: 0.1 * this.height };
        if ("liveness_move" == t2) {
          if ("UCLivenessMoveDetecting" == d2.state && c2 >= 0.25 && c2 < 1.75) {
            var b2 = false;
            return this.rm.isAttributeAvailable(e2, t2, this.landscape, "fullscreen") && "true" == this.rm.getSetupResourceId(e2, t2, this.landscape, "fullscreen") && (b2 = true), b2 ? { x: 0, y: 0, width: this.width, height: this.height } : { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
          }
          return null;
        }
        if ("liveness_move_left" == t2 || "liveness_move_right" == t2 || "liveness_move_top" == t2 || "liveness_move_bottom" == t2) return "UCLivenessMoveDetecting" == d2.state && c2 >= 0.25 && c2 < 1.75 ? 0 == d2.livenessMoveDirection && "liveness_move_top" != t2 || 2 == d2.livenessMoveDirection && "liveness_move_bottom" != t2 || 1 == d2.livenessMoveDirection && "liveness_move_right" != t2 || 3 == d2.livenessMoveDirection && "liveness_move_left" != t2 ? null : (b2 = false, this.rm.isAttributeAvailable(e2, t2, this.landscape, "fullscreen") && "true" == this.rm.getSetupResourceId(e2, t2, this.landscape, "fullscreen") && (b2 = true), b2 ? { x: 0, y: 0, width: this.width, height: this.height } : { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius }) : null;
        if ("face_searcher" == t2) return { x: 0, y: 0, width: this.width, height: this.height };
        if ("livenessMoveGlasses" == t2) {
          if (0 == d2.livenessMoveFailReason) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        } else if ("livenessMoveInfo" == t2) {
          if (1 == d2.livenessMoveFailReason) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        } else if ("progress" == t2) {
          if ("UCLivenessMoveProcessing" == d2.state && c2 > this.processingMoveProgressStartTime) return { x: this.circleX - this.circleRadius, y: 0.8 * this.height, width: 2 * this.circleRadius, height: 19 };
        } else if ("progressRecord" == t2) return { x: 0.146 * this.width, y: 0.52 * this.height, width: 0.7 * this.width, height: 18 };
      }
    }
    return null;
  }
  drawBackground(e2, t2, i2, l2, c2, a2, d2, s2) {
    e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "top"), e2.fillRect(t2.x, t2.y, t2.width, this.circleY - this.circleRadius + 1), "true" == this.rm.getSetupResourceId(i2, l2, this.landscape, "clipped").toLowerCase() && (e2.save(), e2.beginPath(), e2.arc(this.circleX, this.circleY, this.circleRadius, 0, 2 * Math.PI, false), e2.rect(0, 0, this.width, this.height), e2.clip("evenodd")), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "middle_top"), e2.fillRect(t2.x, this.circleY - this.circleRadius, t2.width, 2 * this.circleRadius + 1), "true" == this.rm.getSetupResourceId(i2, l2, this.landscape, "clipped").toLowerCase() && e2.restore(), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "middle_bottom"), e2.fillRect(t2.x, this.circleY + this.circleRadius, t2.width, this.height - this.buttonHeight - (this.circleY + this.circleRadius) + 1), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "bottom"), e2.fillRect(t2.x, this.height - this.buttonHeight, t2.width, this.buttonHeight);
    var m2 = this.rm.getSetupColor(i2, l2, this.landscape, "pagination_separator");
    null != m2 && (e2.fillStyle = m2, e2.fillRect(0, this.height - this.buttonHeight - 1, t2.width, 1));
  }
  drawBackgroundFull(e2, t2, i2, l2, c2, a2, d2, s2) {
    "true" == this.rm.getSetupResourceId(i2, l2, this.landscape, "clipped").toLowerCase() && (e2.save(), e2.beginPath(), e2.arc(this.circleX, this.circleY, this.circleRadius, 0, 2 * Math.PI, false), e2.rect(0, 0, this.width, this.height), e2.clip("evenodd")), e2.fillStyle = this.rm.getSetupColor(i2, l2, this.landscape, "color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height), "true" == this.rm.getSetupResourceId(i2, l2, this.landscape, "clipped").toLowerCase() && e2.restore();
  }
  drawPoint(e2, t2, i2, l2, c2) {
    e2.fillStyle = c2, e2.beginPath(), e2.arc(t2, i2, l2, 0, 2 * Math.PI), e2.fill();
  }
  drawLine(e2, t2, i2, l2, c2, a2) {
    e2.lineWidth = 1, e2.strokeStyle = a2, e2.beginPath(), e2.moveTo(t2, i2), e2.lineTo(l2, c2), e2.stroke();
  }
  drawFaceSearcher(e2, t2, i2, l2, c2, a2, d2, s2) {
    s2.progress;
    var m2 = s2.leftEyeData, h2 = s2.rightEyeData, n2 = s2.faceDataRect;
    n2 && (this.lastMoveFace = n2, null == this.moveFace && (this.moveFace = this.lastMoveFace)), m2 && (this.lastMoveLeftEye = m2, null == this.moveLeftEye && (this.moveLeftEye = this.lastMoveLeftEye)), h2 && (this.lastMoveRightEye = h2, null == this.moveRightEye && (this.moveRightEye = this.lastMoveRightEye)), this.moveFace && (this.moveFace.x += 0.1 * (this.lastMoveFace.x - this.moveFace.x), this.moveFace.y += 0.1 * (this.lastMoveFace.y - this.moveFace.y), this.moveFace.width += 0.1 * (this.lastMoveFace.width - this.moveFace.width), this.moveFace.height += 0.1 * (this.lastMoveFace.height - this.moveFace.height)), this.moveLeftEye && (this.moveLeftEye.x += 0.15 * (this.lastMoveLeftEye.x - this.moveLeftEye.x), this.moveLeftEye.y += 0.15 * (this.lastMoveLeftEye.y - this.moveLeftEye.y), this.drawPoint(e2, this.moveLeftEye.x - 0.05 * this.width, this.moveLeftEye.y, 2, "#ffffff"), this.drawPoint(e2, this.moveLeftEye.x + 0.04 * this.width, this.moveLeftEye.y, 2, "#ffffff"), this.drawPoint(e2, this.moveLeftEye.x - 0.02 * this.width, this.moveLeftEye.y - 0.05 * this.height, 2, "#ffffff"), this.drawLine(e2, this.moveLeftEye.x - 0.05 * this.width, this.moveLeftEye.y, this.moveLeftEye.x + 0.04 * this.width, this.moveLeftEye.y, "#ffffff"), this.drawLine(e2, this.moveLeftEye.x - 0.05 * this.width, this.moveLeftEye.y, this.moveLeftEye.x - 0.02 * this.width, this.moveLeftEye.y - 0.05 * this.height, "#ffffff"), this.drawLine(e2, this.moveLeftEye.x + 0.04 * this.width, this.moveLeftEye.y, this.moveLeftEye.x - 0.02 * this.width, this.moveLeftEye.y - 0.05 * this.height, "#ffffff"), this.moveFace && (this.drawLine(e2, this.moveLeftEye.x + 0.04 * this.width, this.moveLeftEye.y, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveLeftEye.x - 0.05 * this.width, this.moveLeftEye.y, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 - 0.15 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.02 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 - 0.15 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.02 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 - 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 - 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 - 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.5 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 - 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 - 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 - 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.5 * this.moveFace.height, "#ffffff"))), this.moveRightEye && (this.moveRightEye.x += 0.15 * (this.lastMoveRightEye.x - this.moveRightEye.x), this.moveRightEye.y += 0.15 * (this.lastMoveRightEye.y - this.moveRightEye.y), this.drawPoint(e2, this.moveRightEye.x + 0.05 * this.width, this.moveRightEye.y, 2, "#ffffff"), this.drawPoint(e2, this.moveRightEye.x - 0.04 * this.width, this.moveRightEye.y, 2, "#ffffff"), this.drawPoint(e2, this.moveRightEye.x + 0.02 * this.width, this.moveRightEye.y - 0.05 * this.height, 2, "#ffffff"), this.drawLine(e2, this.moveRightEye.x + 0.05 * this.width, this.moveRightEye.y, this.moveRightEye.x - 0.04 * this.width, this.moveRightEye.y, "#ffffff"), this.drawLine(e2, this.moveRightEye.x + 0.05 * this.width, this.moveRightEye.y, this.moveRightEye.x + 0.02 * this.width, this.moveRightEye.y - 0.05 * this.height, "#ffffff"), this.drawLine(e2, this.moveRightEye.x - 0.04 * this.width, this.moveRightEye.y, this.moveRightEye.x + 0.02 * this.width, this.moveRightEye.y - 0.05 * this.height, "#ffffff"), this.moveFace && (this.drawLine(e2, this.moveRightEye.x - 0.04 * this.width, this.moveRightEye.y, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveRightEye.x + 0.05 * this.width, this.moveRightEye.y, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 + 0.15 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.02 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 + 0.15 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.02 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 + 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.05 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 + 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 + 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.5 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 + 0.2 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.25 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2 + 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, "#ffffff"), this.drawLine(e2, this.moveFace.x + this.moveFace.width / 2 + 0.35 * this.moveFace.width, this.moveFace.y + this.moveFace.height / 2 + 0.3 * this.moveFace.height, this.moveFace.x + this.moveFace.width / 2, this.moveFace.y + this.moveFace.height / 2 + 0.5 * this.moveFace.height, "#ffffff")));
  }
  drawImageError(e2, t2, i2, l2, c2, a2, d2, s2) {
    var m2 = this.rm.getImage("livenessError.png");
    m2 = this.rm.getImage("timeout.png"), this.canvasSizeFactor, this.rm.getImageScale(), m2.width, m2.height;
    var h2 = this.scaleRect({ width: m2.width, height: m2.height }, t2);
    e2.drawImage(m2, h2.x, h2.y, h2.width, h2.height);
  }
  drawAnimation(e2, t2, i2, l2, c2, a2, d2, s2, m2) {
    var h2 = a2;
    switch ((h2 /= 2) > 1 && (h2 = 1), "videoProgress" in s2 && (h2 = s2.videoProgress), e2.save(), e2.translate(t2.x + t2.width / 2, t2.y + t2.height / 2), m2) {
      case 1:
        e2.rotate(3 * -Math.PI / 2);
        break;
      case 2:
        e2.rotate(Math.PI);
        break;
      case 3:
        e2.rotate(1 * -Math.PI / 2);
    }
    e2.translate(-(t2.x + t2.width / 2), -(t2.y + t2.height / 2));
    var n2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "name"), Z2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "ext"), b2 = parseInt(this.rm.getSetupResourceId(i2, l2, this.landscape, "start")), o2 = parseInt(this.rm.getSetupResourceId(i2, l2, this.landscape, "end")), r2 = n2 + ("0" + Math.floor((o2 - b2) * h2 + b2)).slice(-2) + "." + Z2, g2 = this.rm.getImage(r2);
    e2.drawImage(g2, t2.x, t2.y, t2.width, t2.height), e2.restore();
  }
  drawText(e2, t2, i2, l2, c2, a2, d2, s2) {
    var m2 = this.rm.getSetupFloat(i2, l2, this.landscape, "font_size"), h2 = m2 + 1;
    this.rm.isAttributeAvailable(i2, l2, this.landscape, "line_height") && (h2 = this.rm.getSetupFloat(i2, l2, this.landscape, "line_height"));
    var n2 = this.rm.getSetupColor(i2, l2, this.landscape, "color"), Z2 = this.rm.getSetupResourceId(i2, l2, this.landscape, "font"), b2 = "CENTER";
    this.rm.isAttributeAvailable(i2, l2, this.landscape, "align") && (b2 = this.rm.getSetupAlign(i2, l2, this.landscape, "align"));
    var o2 = "TOP";
    this.rm.isAttributeAvailable(i2, l2, this.landscape, "valign") && (o2 = this.rm.getSetupAlign(i2, l2, this.landscape, "valign"));
    var r2 = "";
    if ("Tutorial1" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorial1_tip") : this.rm.translate("tutorial1_tip_detail");
    else if ("Tutorial2" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorial2_tip") : this.rm.translate("tutorial2_tip_detail");
    else if ("Tutorial3" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorial3_tip") : this.rm.translate("tutorial3_tip_detail");
    else if ("TutorialMove1" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorialMove1_tip") : this.rm.translate("tutorialMove1_tip_detail");
    else if ("TutorialMove2" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorialMove2_tip") : this.rm.translate("tutorialMove2_tip_detail");
    else if ("TutorialMove3" == i2) r2 = "tip" == l2 ? this.rm.translate("tutorialMove3_tip") : this.rm.translate("tutorialMove3_tip_detail");
    else if ("RegistrationTips" == i2) r2 = "tip" == l2 ? this.rm.translate("registration_tips_title") : this.rm.translate("registration_tips_detail");
    else if ("FaceMovementTips" == i2) r2 = "tip" == l2 ? this.rm.translate("face_movement_tips_title") : this.rm.translate("face_movement_tips_detail");
    else if ("WaitRecording" == i2) r2 = this.rm.translate("waitRecording");
    else if ("StartExtractor" == i2) "text" == l2 && (r2 = this.rm.translate("start_extractor_title"));
    else if ("Extractor" == i2) "warning" == l2 && (r2 = this.rm.translate("error_message_face"));
    else if ("LivenessMove" == i2) {
      if ("liveness_move_text" == l2) if ("UCLivenessMoveStabilizing" == s2.state || "UCLivenessMoveStabilized" == s2.state) r2 = this.rm.translate("extracting_title");
      else if ("UCLivenessMoveDetecting" == s2.state) switch (s2.livenessMoveDirection) {
        case 0:
          r2 = this.rm.translate("liveness_move_tip_up");
          break;
        case 1:
          r2 = this.rm.translate("liveness_move_tip_right");
          break;
        case 2:
          r2 = this.rm.translate("liveness_move_tip_down");
          break;
        case 3:
          r2 = this.rm.translate("liveness_move_tip_left");
      }
      else "UCLivenessMoveProcessing" == s2.state && (r2 = this.rm.translate("liveness_move_processing"));
      else if ("warning" == l2 && ("UCLivenessMoveStabilizing" == s2.state || "UCLivenessMoveStabilized" == s2.state)) switch (s2.livenessMoveLastStabilizedStatus) {
        case 1:
          r2 = this.rm.translate("liveness_move_stabilizing_ok");
          break;
        case 2:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized");
          break;
        case 3:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_far");
          break;
        case 4:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_sun_glasses");
          break;
        case 5:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_close");
          break;
        case 6:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_movement");
          break;
        case 7:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_performance");
          break;
        case 8:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal");
          break;
        case 9:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_right");
          break;
        case 10:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_left");
          break;
        case 11:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_down");
          break;
        case 12:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_up");
          break;
        case 13:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_color");
          break;
        case 14:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_quality");
          break;
        case 15:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_face_quality");
          break;
        case 16:
          r2 = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_pattern_quality");
          break;
        case 17:
          r2 = this.rm.translate("liveness_move_stabilizing_ok_glasses");
          break;
        default:
          r2 = this.rm.translate("extracting_title");
      }
    } else if ("LivenessInfo" == i2) "livenessInfo_text" == l2 && (r2 = 0 == s2.livenessMoveFailReason ? this.rm.translate("liveness_move_info_sunglasses") : this.rm.translate("liveness_move_info_unsuccess"));
    else if ("Results" == i2) {
      if ("tip" == l2) {
        if (a2 < 1) n2 = "#00000000";
        else if (a2 >= 1) {
          var g2 = 2 * (a2 - 1);
          g2 > 1 && (g2 = 1), n2 = this.rm.getSetupColorWithAlpha(i2, l2, this.landscape, "color", g2);
        }
        r2 = s2.progress >= 1 ? this.rm.translate("results_message_excellent") : s2.progress >= 0.333 ? this.rm.translate("results_message_good") : this.rm.translate("results_message_low");
      }
    } else "Error" == i2 && "text_error" == l2 && (r2 = this.rm.translate("timeout"));
    this.drawStringMultiline(e2, r2, t2, n2, Z2, m2, h2, b2, o2);
  }
  drawBlind(e2, t2, i2, l2, c2, a2, d2, s2) {
    var m2 = (c2 - i2) / l2 * 0.5 + 0.5, h2 = 2 * l2 * m2, n2 = 2 * l2 * (1 - m2);
    e2.save(), e2.beginPath(), e2.arc(t2, i2, l2, 0, 2 * Math.PI, false), e2.clip(), e2.fillStyle = d2, e2.fillRect(t2 - l2, i2 - l2, 2 * l2, h2 * a2), e2.fillRect(t2 - l2, i2 + l2 - n2 + n2 * (1 - a2), 2 * l2, n2 * a2), e2.restore();
    var Z2 = this.rm.getSetupResourceId("facephi-widget-conf", "", this.landscape, "font_shutter_text");
    e2.fillStyle = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_shutter_text"), e2.font = 26 * this.fontSizeFactor + "px '" + Z2 + "'";
    var b2 = e2.measureText(s2);
    e2.fillText(s2, t2 - b2.width / 2, i2 + l2 - n2 + n2 * (1 - a2) + 30);
  }
};
var o = class {
  constructor(e2, t2, i2) {
    this.__width = e2, this.__height = t2, this.__rate = i2 > 30 ? 30 : i2, this.__rateInv = 1e3 / this.__rate, this.__lastFrame = performance.now();
  }
  frameReady(e2 = true) {
    let t2 = performance.now();
    return t2 - this.__lastFrame >= this.__rateInv && (e2 && (this.__lastFrame = t2), true);
  }
};
var r = "video";
var g = ["webm", "mp4", "ogg", "x-matroska"];
var u = ["should-not-be-supported", "vp8", "vp8.0", "vp9", "vp9.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];
var I = { Remote: class extends o {
  constructor(e2, t2, i2, l2, c2) {
    super(e2, t2, i2), this.__opennedConnection = false, this.__socket = new WebSocket("wss://ws-dev.facephi.cloud"), this.__socket.onopen = () => this.__opennedConnection = true, this.__canvas = document.createElement("canvas"), this.__canvas.width = e2, this.__canvas.height = t2, this.__rate = i2 > 30 ? 30 : i2, this.__lastFrameSended = 0, this.__startTime = 0, this.__lastFrameRecordedTime = 0;
  }
  initializeEngine() {
    return Promise.resolve();
  }
  storeFrame(e2) {
    return new Promise((t2, i2) => {
      if (this.frameReady()) {
        this.__startTime || (this.__startTime = performance.now()), this.__canvas.getContext("2d").putImageData(e2, 0, 0);
        let t3 = this.__canvas.toDataURL("image/jpeg");
        this.__lastFrameRecordedTime = performance.now(), this.sendFrame(t3);
      } else t2();
    });
  }
  addFrame(e2) {
    return new Promise((t2, i2) => {
      this.storeFrame(e2), t2();
    });
  }
  sendFrame(e2) {
    this.__opennedConnection && (this.__socket.send(JSON.stringify({ type: "VIDEO_FRAME", id: this.__lastFrameSended, dataURL: e2 })), this.__lastFrameSended++);
  }
  generateVideo() {
    return new Promise((e2, t2) => {
      if (this.__opennedConnection) {
        this.__socket.onerror = (e3) => t2(e3), this.__socket.onmessage = (t3) => {
          let i3 = JSON.parse(t3.data);
          if (i3.video) {
            const t4 = {};
            t4["videoURL-1"] = i3.video, e2(t4);
          }
        };
        let i2 = (this.__lastFrameRecordedTime - this.__startTime) / 1e3, l2 = parseInt(this.__lastFrameSended / i2);
        this.__socket.send(JSON.stringify({ type: "MAKE_VIDEO", FR: l2 })), this.__lastFrameSended = 0;
      } else e2();
    });
  }
  deinitializeEngine() {
    this.__socket.close();
  }
}, Local: class extends o {
  constructor(e2, t2, i2, l2, c2) {
    super(e2, t2, i2), this.engineInitialized = false, this.recording = false, this.videoQuality = l2, this.videoStream = c2, this.mediaRecorder = null, this.chunks = [], this.resetChunks = true, this.generateBlob = false, this.options = { supportedMimeTypes: [], blobType: [] };
  }
  initializeEngine() {
    return this.engineInitialized = true, Promise.resolve();
  }
  replaceCurrentRecorder(e2) {
    this.videoStream = e2, this.recording = false;
  }
  generateNewRecorder() {
    this.mediaRecorder && (this.resetChunks = false, this.mediaRecorder.stop()), this.recording = false;
  }
  async addFrame(e2) {
    return new Promise((e3, t2) => {
      var _a;
      if (!this.recording) {
        this.recording = true, console.log("Start recording...");
        const e4 = [25e4, 625e3, 1e6];
        "function" == typeof MediaRecorder.isTypeSupported ? (this.options = function(e5) {
          const t3 = MediaRecorder.isTypeSupported, i2 = [], l2 = [], c2 = g;
          for (const a2 of c2) {
            const c3 = `${e5}/${a2}`;
            for (const e6 of u) {
              const l3 = `${c3};codecs=${e6}`, a3 = `${c3};codecs=${e6.toUpperCase()}`;
              t3(l3) && i2.push(l3), t3(a3) && i2.push(a3);
            }
            t3(c3) && (i2.push(c3), l2.push(c3));
          }
          return { supportedMimeTypes: i2, blobType: l2 };
        }(r), console.log(`Using ${this.options.supportedMimeTypes[0]}`), this.mediaRecorder = new MediaRecorder(this.videoStream, { mimeType: (_a = this.options.supportedMimeTypes) == null ? void 0 : _a[0], videoBitsPerSecond: e4[this.videoQuality] })) : (console.log("Using default codecs for browser"), this.mediaRecorder = new MediaRecorder(this.videoStream, { videoBitsPerSecond: e4[this.videoQuality] })), this.mediaRecorder.start(), this.mediaRecorder.ondataavailable = (e5) => {
          this.chunks.push(e5.data), this.resetChunks ? this.chunks.pop() : this.resetChunks = true;
        }, this.mediaRecorder.onerror = (e5) => {
          console.log("Error: ", e5);
        }, this.mediaRecorder.onstart = () => {
          console.log(`Started & state = ${this.mediaRecorder.state}`);
        };
      }
      e3();
    });
  }
  async generateVideo() {
    return this.generateBlob = true, this.resetChunks = false, this.mediaRecorder.stop(), new Promise((e2) => {
      this.mediaRecorder.onstop = () => {
        var _a;
        if (this.generateBlob) {
          const t2 = {};
          for (let e3 = 0; e3 < this.chunks.length; e3++) {
            const i2 = new Blob([this.chunks[e3]], { type: (_a = this.options.blobType) == null ? void 0 : _a[0] }), l2 = window.URL.createObjectURL(i2);
            t2[`videoURL-${e3 + 1}`] = l2;
          }
          this.chunks = [], e2(t2);
        }
      };
    });
  }
  deinitializeEngine() {
    this.engineInitialized ? (console.log("Video recorder engine stopped"), this.mediaRecorder = null, this.engineInitialized = false, this.recording = false) : console.log("Video recorder engine is not initialized");
  }
} };
var y = class {
  static getAvailableEngines() {
    return Object.keys(I);
  }
  static generateInstance(e2, ...t2) {
    return new I[e2](...t2);
  }
};
var G = null;
var X = class {
  constructor(e2) {
    this.__licenseKey = "", this.__engineLocation = "", this.__minIOD = 40, this.__mapperToRealConfig(e2), this.__worker = new Worker((null === G && (G = URL.createObjectURL(new Blob([window.atob("Y29uc3QgZT0oLi4uZSk9PntlLmZvckVhY2goKGU9PntudWxsIT09ZSYmdm9pZCAwIT09ZS5kZWxldGUmJmUuZGVsZXRlKCl9KSl9LHQ9KGUsdCxyKT0+e2xldCBuPXQ7aWYobi5zYW1wbGVEaWFnbm9zdGljPXIuZ2V0U2FtcGxlRGlhZ25vc3RpYygpLnZhbHVlLHIuZ2V0U2FtcGxlRGlhZ25vc3RpYygpPT09ZS5TYW1wbGVEaWFnbm9zdGljLk9rKXtsZXQgdCxvLGEsaSxzO251bGwhPT0obz1yLmdldFRlbXBsYXRlKCkpJiZudWxsIT09KGk9bmV3IFVpbnQ4QXJyYXkoZS5nZXRCeXRlcyhvKSkpJiYobi50ZW1wbGF0ZT1pLG8uZGVsZXRlKCkpLG51bGwhPT0oYT1yLmdldFRlbXBsYXRlUmF3KCkpJiZudWxsIT09KHM9bmV3IFVpbnQ4QXJyYXkoZS5nZXRCeXRlcyhhKSkpJiYobi50ZW1wbGF0ZVJhdz1zLGEuZGVsZXRlKCkpLG51bGwhPT0odD1yLmdldFRlbXBsYXRlSW5mbygpKSYmKG4udGVtcGxhdGVTY29yZT10LmdldFRlbXBsYXRlU2NvcmUoKSxuLmZhY2lhbFNjb3JlPXIuZ2V0RmFjaWFsU2NvcmUoKSxuLnN1bkdsYXNzZXNTY29yZT10LmdldFN1bkdsYXNzZXNTY29yZSgpLHQuZGVsZXRlKCkpfXJldHVybiBudWxsIT09KGZhY2U9ci5nZXRGYWNlKCkpJiYobi5mYWNlPXt4OmZhY2UuWCx5OmZhY2UuWSx3aWR0aDpmYWNlLldpZHRoLGhlaWdodDpmYWNlLkhlaWdodH0pLG51bGwhPT0obGVmdEV5ZT1yLmdldExlZnRFeWUoKSkmJihuLmxlZnRFeWU9e3g6bGVmdEV5ZS5YLHk6bGVmdEV5ZS5ZfSksbnVsbCE9PShyaWdodEV5ZT1yLmdldFJpZ2h0RXllKCkpJiYobi5yaWdodEV5ZT17eDpyaWdodEV5ZS5YLHk6cmlnaHRFeWUuWX0pLG59O2xldCByPSIiLG49MjtjbGFzcyBve3N0YXRpYyBwcmludERlYnVnKC4uLmUpezA+PW4mJmNvbnNvbGUuZGVidWcoYDxEPiBbJHtyfV0gJHtlfWApfXN0YXRpYyBwcmludEluZm8oLi4uZSl7MT49biYmY29uc29sZS5kZWJ1ZyhgPEk+IFske3J9XSAke2V9YCl9c3RhdGljIHByaW50V2FybmluZyguLi5lKXsyPj1uJiZjb25zb2xlLndhcm4oYDxXPiBbJHtyfV0gJHtlfWApfXN0YXRpYyBwcmludEVycm9yKC4uLmUpezM+PW4mJmNvbnNvbGUuZXJyb3IoYDxFPiBbJHtyfV0gJHtlfWApfXN0YXRpYyBzZXRMb2dnZXJMZXZlbChlKXtuPWV9c3RhdGljIHNldExvZ2dlclRhZyhlKXtyPWV9fXZhciBhLGk9KGE9InVuZGVmaW5lZCIhPXR5cGVvZiBkb2N1bWVudCYmZG9jdW1lbnQuY3VycmVudFNjcmlwdD9kb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYzp2b2lkIDAsZnVuY3Rpb24oZSl7dmFyIHQscjsoZT12b2lkIDAhPT0oZT1lfHx7fSk/ZTp7fSkucmVhZHk9bmV3IFByb21pc2UoKGZ1bmN0aW9uKGUsbil7dD1lLHI9bn0pKTt2YXIgbixvLGk9T2JqZWN0LmFzc2lnbih7fSxlKSxzPVtdLHU9Ii4vdGhpcy5wcm9ncmFtIixjPSIiOyJ1bmRlZmluZWQiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQmJihjPWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSxhJiYoYz1hKSxjPTAhPT1jLmluZGV4T2YoImJsb2I6Iik/Yy5zdWJzdHIoMCxjLnJlcGxhY2UoL1s/I10uKi8sIiIpLmxhc3RJbmRleE9mKCIvIikrMSk6IiIsbj1lPT57dmFyIHQ9bmV3IFhNTEh0dHBSZXF1ZXN0O3JldHVybiB0Lm9wZW4oIkdFVCIsZSwhMSksdC5zZW5kKG51bGwpLHQucmVzcG9uc2VUZXh0fSxvPShlLHQscik9Pnt2YXIgbj1uZXcgWE1MSHR0cFJlcXVlc3Q7bi5vcGVuKCJHRVQiLGUsITApLG4ucmVzcG9uc2VUeXBlPSJhcnJheWJ1ZmZlciIsbi5vbmxvYWQ9KCk9PnsyMDA9PW4uc3RhdHVzfHwwPT1uLnN0YXR1cyYmbi5yZXNwb25zZT90KG4ucmVzcG9uc2UpOnIoKX0sbi5vbmVycm9yPXIsbi5zZW5kKG51bGwpfTt2YXIgbD1lLnByaW50fHxjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpLGQ9ZS5wcmludEVycnx8Y29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7T2JqZWN0LmFzc2lnbihlLGkpLGk9bnVsbCxlLmFyZ3VtZW50cyYmKHM9ZS5hcmd1bWVudHMpLGUudGhpc1Byb2dyYW0mJih1PWUudGhpc1Byb2dyYW0pLGUucXVpdCYmZS5xdWl0O3ZhciBmO2Uud2FzbUJpbmFyeSYmKGY9ZS53YXNtQmluYXJ5KSxlLm5vRXhpdFJ1bnRpbWUsIm9iamVjdCIhPXR5cGVvZiBXZWJBc3NlbWJseSYmTCgibm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZCIpO3ZhciBwPSExO2Z1bmN0aW9uIGgoZSx0KXtlfHxMKHQpfXZhciBtLHYseSxnLHcsRSxfLGIsayxQPSJ1bmRlZmluZWQiIT10eXBlb2YgVGV4dERlY29kZXI/bmV3IFRleHREZWNvZGVyKCJ1dGY4Iik6dm9pZCAwO2Z1bmN0aW9uIFQoZSx0LHIpe2Zvcih2YXIgbj10K3Isbz10O2Vbb10mJiEobz49bik7KSsrbztpZihvLXQ+MTYmJmUuYnVmZmVyJiZQKXJldHVybiBQLmRlY29kZShlLnN1YmFycmF5KHQsbykpO2Zvcih2YXIgYT0iIjt0PG87KXt2YXIgaT1lW3QrK107aWYoMTI4Jmkpe3ZhciBzPTYzJmVbdCsrXTtpZigxOTIhPSgyMjQmaSkpe3ZhciB1PTYzJmVbdCsrXTtpZigoaT0yMjQ9PSgyNDAmaSk/KDE1JmkpPDwxMnxzPDw2fHU6KDcmaSk8PDE4fHM8PDEyfHU8PDZ8NjMmZVt0KytdKTw2NTUzNilhKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpO2Vsc2V7dmFyIGM9aS02NTUzNjthKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2fGM+PjEwLDU2MzIwfDEwMjMmYyl9fWVsc2UgYSs9U3RyaW5nLmZyb21DaGFyQ29kZSgoMzEmaSk8PDZ8cyl9ZWxzZSBhKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpfXJldHVybiBhfWZ1bmN0aW9uIFMoZSx0KXtyZXR1cm4gZT9UKHksZSx0KToiIn1mdW5jdGlvbiBEKGUsdCxyLG4pe2lmKCEobj4wKSlyZXR1cm4gMDtmb3IodmFyIG89cixhPXIrbi0xLGk9MDtpPGUubGVuZ3RoOysraSl7dmFyIHM9ZS5jaGFyQ29kZUF0KGkpO2lmKHM+PTU1Mjk2JiZzPD01NzM0MyYmKHM9NjU1MzYrKCgxMDIzJnMpPDwxMCl8MTAyMyZlLmNoYXJDb2RlQXQoKytpKSksczw9MTI3KXtpZihyPj1hKWJyZWFrO3RbcisrXT1zfWVsc2UgaWYoczw9MjA0Nyl7aWYocisxPj1hKWJyZWFrO3RbcisrXT0xOTJ8cz4+Nix0W3IrK109MTI4fDYzJnN9ZWxzZSBpZihzPD02NTUzNSl7aWYocisyPj1hKWJyZWFrO3RbcisrXT0yMjR8cz4+MTIsdFtyKytdPTEyOHxzPj42JjYzLHRbcisrXT0xMjh8NjMmc31lbHNle2lmKHIrMz49YSlicmVhazt0W3IrK109MjQwfHM+PjE4LHRbcisrXT0xMjh8cz4+MTImNjMsdFtyKytdPTEyOHxzPj42JjYzLHRbcisrXT0xMjh8NjMmc319cmV0dXJuIHRbcl09MCxyLW99ZnVuY3Rpb24gQyhlKXtmb3IodmFyIHQ9MCxyPTA7cjxlLmxlbmd0aDsrK3Ipe3ZhciBuPWUuY2hhckNvZGVBdChyKTtuPD0xMjc/dCsrOm48PTIwNDc/dCs9MjpuPj01NTI5NiYmbjw9NTczNDM/KHQrPTQsKytyKTp0Kz0zfXJldHVybiB0fWUuSU5JVElBTF9NRU1PUlk7dmFyIEYsTSxBLCQseCxSPVtdLE89W10saj1bXSxJPTAsej1udWxsLE49bnVsbDtmdW5jdGlvbiBCKHQpe0krKyxlLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMmJmUubW9uaXRvclJ1bkRlcGVuZGVuY2llcyhJKX1mdW5jdGlvbiBXKHQpe2lmKEktLSxlLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMmJmUubW9uaXRvclJ1bkRlcGVuZGVuY2llcyhJKSwwPT1JJiYobnVsbCE9PXomJihjbGVhckludGVydmFsKHopLHo9bnVsbCksTikpe3ZhciByPU47Tj1udWxsLHIoKX19ZnVuY3Rpb24gTCh0KXtlLm9uQWJvcnQmJmUub25BYm9ydCh0KSxkKHQ9IkFib3J0ZWQoIit0KyIpIikscD0hMCx0Kz0iLiBCdWlsZCB3aXRoIC1zQVNTRVJUSU9OUyBmb3IgbW9yZSBpbmZvLiI7dmFyIG49bmV3IFdlYkFzc2VtYmx5LlJ1bnRpbWVFcnJvcih0KTt0aHJvdyByKG4pLG59ZnVuY3Rpb24gVSh0KXtmb3IoO3QubGVuZ3RoPjA7KXQuc2hpZnQoKShlKX0oTT0iRlBoaUV4dHJhY3Rvci53YXNtIikuc3RhcnRzV2l0aCgiZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LCIpfHwoQT1NLE09ZS5sb2NhdGVGaWxlP2UubG9jYXRlRmlsZShBLGMpOmMrQSk7dmFyIEg9W10sVj0wLFk9MCxxPVtdO2Z1bmN0aW9uIEcoZSl7dmFyIHQ9cVtlXTtyZXR1cm4gdHx8KGU+PXEubGVuZ3RoJiYocS5sZW5ndGg9ZSsxKSxxW2VdPXQ9Ri5nZXQoZSkpLHR9ZnVuY3Rpb24gWChlKXt0aGlzLmV4Y1B0cj1lLHRoaXMucHRyPWUtMjQsdGhpcy5zZXRfdHlwZT1mdW5jdGlvbihlKXtfW3RoaXMucHRyKzQ+PjJdPWV9LHRoaXMuZ2V0X3R5cGU9ZnVuY3Rpb24oKXtyZXR1cm4gX1t0aGlzLnB0cis0Pj4yXX0sdGhpcy5zZXRfZGVzdHJ1Y3Rvcj1mdW5jdGlvbihlKXtfW3RoaXMucHRyKzg+PjJdPWV9LHRoaXMuZ2V0X2Rlc3RydWN0b3I9ZnVuY3Rpb24oKXtyZXR1cm4gX1t0aGlzLnB0cis4Pj4yXX0sdGhpcy5zZXRfcmVmY291bnQ9ZnVuY3Rpb24oZSl7RVt0aGlzLnB0cj4+Ml09ZX0sdGhpcy5zZXRfY2F1Z2h0PWZ1bmN0aW9uKGUpe2U9ZT8xOjAsdlt0aGlzLnB0cisxMnwwXT1lfSx0aGlzLmdldF9jYXVnaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gMCE9dlt0aGlzLnB0cisxMnwwXX0sdGhpcy5zZXRfcmV0aHJvd249ZnVuY3Rpb24oZSl7ZT1lPzE6MCx2W3RoaXMucHRyKzEzfDBdPWV9LHRoaXMuZ2V0X3JldGhyb3duPWZ1bmN0aW9uKCl7cmV0dXJuIDAhPXZbdGhpcy5wdHIrMTN8MF19LHRoaXMuaW5pdD1mdW5jdGlvbihlLHQpe3RoaXMuc2V0X2FkanVzdGVkX3B0cigwKSx0aGlzLnNldF90eXBlKGUpLHRoaXMuc2V0X2Rlc3RydWN0b3IodCksdGhpcy5zZXRfcmVmY291bnQoMCksdGhpcy5zZXRfY2F1Z2h0KCExKSx0aGlzLnNldF9yZXRocm93bighMSl9LHRoaXMuYWRkX3JlZj1mdW5jdGlvbigpe3ZhciBlPUVbdGhpcy5wdHI+PjJdO0VbdGhpcy5wdHI+PjJdPWUrMX0sdGhpcy5yZWxlYXNlX3JlZj1mdW5jdGlvbigpe3ZhciBlPUVbdGhpcy5wdHI+PjJdO3JldHVybiBFW3RoaXMucHRyPj4yXT1lLTEsMT09PWV9LHRoaXMuc2V0X2FkanVzdGVkX3B0cj1mdW5jdGlvbihlKXtfW3RoaXMucHRyKzE2Pj4yXT1lfSx0aGlzLmdldF9hZGp1c3RlZF9wdHI9ZnVuY3Rpb24oKXtyZXR1cm4gX1t0aGlzLnB0cisxNj4+Ml19LHRoaXMuZ2V0X2V4Y2VwdGlvbl9wdHI9ZnVuY3Rpb24oKXtpZihCdCh0aGlzLmdldF90eXBlKCkpKXJldHVybiBfW3RoaXMuZXhjUHRyPj4yXTt2YXIgZT10aGlzLmdldF9hZGp1c3RlZF9wdHIoKTtyZXR1cm4gMCE9PWU/ZTp0aGlzLmV4Y1B0cn19dmFyIEo9IlRvIHVzZSBkbG9wZW4sIHlvdSBuZWVkIGVuYWJsZSBkeW5hbWljIGxpbmtpbmcsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZW1zY3JpcHRlbi1jb3JlL2Vtc2NyaXB0ZW4vd2lraS9MaW5raW5nIixLPXt9O2Z1bmN0aW9uIFEoZSl7Zm9yKDtlLmxlbmd0aDspe3ZhciB0PWUucG9wKCk7ZS5wb3AoKSh0KX19ZnVuY3Rpb24gWihlKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoRVtlPj4yXSl9dmFyIGVlPXt9LHRlPXt9LHJlPXt9LG5lPTQ4LG9lPTU3O2Z1bmN0aW9uIGFlKGUpe2lmKHZvaWQgMD09PWUpcmV0dXJuIl91bmtub3duIjt2YXIgdD0oZT1lLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywiJCIpKS5jaGFyQ29kZUF0KDApO3JldHVybiB0Pj1uZSYmdDw9b2U/Il8iK2U6ZX1mdW5jdGlvbiBpZShlLHQpe3JldHVybiBlPWFlKGUpLG5ldyBGdW5jdGlvbigiYm9keSIsInJldHVybiBmdW5jdGlvbiAiK2UrJygpIHtcbiAgICAidXNlIHN0cmljdCI7ICAgIHJldHVybiBib2R5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuJykodCl9ZnVuY3Rpb24gc2UoZSx0KXt2YXIgcj1pZSh0LChmdW5jdGlvbihlKXt0aGlzLm5hbWU9dCx0aGlzLm1lc3NhZ2U9ZTt2YXIgcj1uZXcgRXJyb3IoZSkuc3RhY2s7dm9pZCAwIT09ciYmKHRoaXMuc3RhY2s9dGhpcy50b1N0cmluZygpKyJcbiIrci5yZXBsYWNlKC9eRXJyb3IoOlteXG5dKik/XG4vLCIiKSl9KSk7cmV0dXJuIHIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZS5wcm90b3R5cGUpLHIucHJvdG90eXBlLmNvbnN0cnVjdG9yPXIsci5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwPT09dGhpcy5tZXNzYWdlP3RoaXMubmFtZTp0aGlzLm5hbWUrIjogIit0aGlzLm1lc3NhZ2V9LHJ9dmFyIHVlPXZvaWQgMDtmdW5jdGlvbiBjZShlKXt0aHJvdyBuZXcgdWUoZSl9ZnVuY3Rpb24gbGUoZSx0LHIpe2Z1bmN0aW9uIG4odCl7dmFyIG49cih0KTtuLmxlbmd0aCE9PWUubGVuZ3RoJiZjZSgiTWlzbWF0Y2hlZCB0eXBlIGNvbnZlcnRlciBjb3VudCIpO2Zvcih2YXIgbz0wO288ZS5sZW5ndGg7KytvKXZlKGVbb10sbltvXSl9ZS5mb3JFYWNoKChmdW5jdGlvbihlKXtyZVtlXT10fSkpO3ZhciBvPW5ldyBBcnJheSh0Lmxlbmd0aCksYT1bXSxpPTA7dC5mb3JFYWNoKCgoZSx0KT0+e3RlLmhhc093blByb3BlcnR5KGUpP29bdF09dGVbZV06KGEucHVzaChlKSxlZS5oYXNPd25Qcm9wZXJ0eShlKXx8KGVlW2VdPVtdKSxlZVtlXS5wdXNoKCgoKT0+e29bdF09dGVbZV0sKytpPT09YS5sZW5ndGgmJm4obyl9KSkpfSkpLDA9PT1hLmxlbmd0aCYmbihvKX1mdW5jdGlvbiBkZShlKXtzd2l0Y2goZSl7Y2FzZSAxOnJldHVybiAwO2Nhc2UgMjpyZXR1cm4gMTtjYXNlIDQ6cmV0dXJuIDI7Y2FzZSA4OnJldHVybiAzO2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biB0eXBlIHNpemU6ICIrZSl9fXZhciBmZT12b2lkIDA7ZnVuY3Rpb24gcGUoZSl7Zm9yKHZhciB0PSIiLHI9ZTt5W3JdOyl0Kz1mZVt5W3IrK11dO3JldHVybiB0fXZhciBoZT12b2lkIDA7ZnVuY3Rpb24gbWUoZSl7dGhyb3cgbmV3IGhlKGUpfWZ1bmN0aW9uIHZlKGUsdCxyPXt9KXtpZighKCJhcmdQYWNrQWR2YW5jZSJpbiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCJyZWdpc3RlclR5cGUgcmVnaXN0ZXJlZEluc3RhbmNlIHJlcXVpcmVzIGFyZ1BhY2tBZHZhbmNlIik7dmFyIG49dC5uYW1lO2lmKGV8fG1lKCd0eXBlICInK24rJyIgbXVzdCBoYXZlIGEgcG9zaXRpdmUgaW50ZWdlciB0eXBlaWQgcG9pbnRlcicpLHRlLmhhc093blByb3BlcnR5KGUpKXtpZihyLmlnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnMpcmV0dXJuO21lKCJDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnIituKyInIHR3aWNlIil9aWYodGVbZV09dCxkZWxldGUgcmVbZV0sZWUuaGFzT3duUHJvcGVydHkoZSkpe3ZhciBvPWVlW2VdO2RlbGV0ZSBlZVtlXSxvLmZvckVhY2goKGU9PmUoKSkpfX1mdW5jdGlvbiB5ZShlKXttZShlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzLm5hbWUrIiBpbnN0YW5jZSBhbHJlYWR5IGRlbGV0ZWQiKX12YXIgZ2U9ITE7ZnVuY3Rpb24gd2UoZSl7fWZ1bmN0aW9uIEVlKGUpe2UuY291bnQudmFsdWUtPTEsMD09PWUuY291bnQudmFsdWUmJmZ1bmN0aW9uKGUpe2Uuc21hcnRQdHI/ZS5zbWFydFB0clR5cGUucmF3RGVzdHJ1Y3RvcihlLnNtYXJ0UHRyKTplLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzLnJhd0Rlc3RydWN0b3IoZS5wdHIpfShlKX1mdW5jdGlvbiBfZShlLHQscil7aWYodD09PXIpcmV0dXJuIGU7aWYodm9pZCAwPT09ci5iYXNlQ2xhc3MpcmV0dXJuIG51bGw7dmFyIG49X2UoZSx0LHIuYmFzZUNsYXNzKTtyZXR1cm4gbnVsbD09PW4/bnVsbDpyLmRvd25jYXN0KG4pfXZhciBiZT17fTt2YXIga2U9W107ZnVuY3Rpb24gUGUoKXtmb3IoO2tlLmxlbmd0aDspe3ZhciBlPWtlLnBvcCgpO2UuJCQuZGVsZXRlU2NoZWR1bGVkPSExLGUuZGVsZXRlKCl9fXZhciBUZT12b2lkIDA7dmFyIFNlPXt9O2Z1bmN0aW9uIERlKGUsdCl7cmV0dXJuIHQucHRyVHlwZSYmdC5wdHJ8fGNlKCJtYWtlQ2xhc3NIYW5kbGUgcmVxdWlyZXMgcHRyIGFuZCBwdHJUeXBlIiksISF0LnNtYXJ0UHRyVHlwZSE9ISF0LnNtYXJ0UHRyJiZjZSgiQm90aCBzbWFydFB0clR5cGUgYW5kIHNtYXJ0UHRyIG11c3QgYmUgc3BlY2lmaWVkIiksdC5jb3VudD17dmFsdWU6MX0sQ2UoT2JqZWN0LmNyZWF0ZShlLHskJDp7dmFsdWU6dH19KSl9ZnVuY3Rpb24gQ2UoZSl7cmV0dXJuInVuZGVmaW5lZCI9PXR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeT8oQ2U9ZT0+ZSxlKTooZ2U9bmV3IEZpbmFsaXphdGlvblJlZ2lzdHJ5KChlPT57RWUoZS4kJCl9KSksQ2U9ZT0+e3ZhciB0PWUuJCQ7aWYodC5zbWFydFB0cil7dmFyIHI9eyQkOnR9O2dlLnJlZ2lzdGVyKGUscixlKX1yZXR1cm4gZX0sd2U9ZT0+Z2UudW5yZWdpc3RlcihlKSxDZShlKSl9ZnVuY3Rpb24gRmUoKXt9ZnVuY3Rpb24gTWUoZSx0LHIpe2lmKHZvaWQgMD09PWVbdF0ub3ZlcmxvYWRUYWJsZSl7dmFyIG49ZVt0XTtlW3RdPWZ1bmN0aW9uKCl7cmV0dXJuIGVbdF0ub3ZlcmxvYWRUYWJsZS5oYXNPd25Qcm9wZXJ0eShhcmd1bWVudHMubGVuZ3RoKXx8bWUoIkZ1bmN0aW9uICciK3IrIicgY2FsbGVkIHdpdGggYW4gaW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzICgiK2FyZ3VtZW50cy5sZW5ndGgrIikgLSBleHBlY3RzIG9uZSBvZiAoIitlW3RdLm92ZXJsb2FkVGFibGUrIikhIiksZVt0XS5vdmVybG9hZFRhYmxlW2FyZ3VtZW50cy5sZW5ndGhdLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sZVt0XS5vdmVybG9hZFRhYmxlPVtdLGVbdF0ub3ZlcmxvYWRUYWJsZVtuLmFyZ0NvdW50XT1ufX1mdW5jdGlvbiBBZSh0LHIsbil7ZS5oYXNPd25Qcm9wZXJ0eSh0KT8oKHZvaWQgMD09PW58fHZvaWQgMCE9PWVbdF0ub3ZlcmxvYWRUYWJsZSYmdm9pZCAwIT09ZVt0XS5vdmVybG9hZFRhYmxlW25dKSYmbWUoIkNhbm5vdCByZWdpc3RlciBwdWJsaWMgbmFtZSAnIit0KyInIHR3aWNlIiksTWUoZSx0LHQpLGUuaGFzT3duUHJvcGVydHkobikmJm1lKCJDYW5ub3QgcmVnaXN0ZXIgbXVsdGlwbGUgb3ZlcmxvYWRzIG9mIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBudW1iZXIgb2YgYXJndW1lbnRzICgiK24rIikhIiksZVt0XS5vdmVybG9hZFRhYmxlW25dPXIpOihlW3RdPXIsdm9pZCAwIT09biYmKGVbdF0ubnVtQXJndW1lbnRzPW4pKX1mdW5jdGlvbiAkZShlLHQscixuLG8sYSxpLHMpe3RoaXMubmFtZT1lLHRoaXMuY29uc3RydWN0b3I9dCx0aGlzLmluc3RhbmNlUHJvdG90eXBlPXIsdGhpcy5yYXdEZXN0cnVjdG9yPW4sdGhpcy5iYXNlQ2xhc3M9byx0aGlzLmdldEFjdHVhbFR5cGU9YSx0aGlzLnVwY2FzdD1pLHRoaXMuZG93bmNhc3Q9cyx0aGlzLnB1cmVWaXJ0dWFsRnVuY3Rpb25zPVtdfWZ1bmN0aW9uIHhlKGUsdCxyKXtmb3IoO3QhPT1yOyl0LnVwY2FzdHx8bWUoIkV4cGVjdGVkIG51bGwgb3IgaW5zdGFuY2Ugb2YgIityLm5hbWUrIiwgZ290IGFuIGluc3RhbmNlIG9mICIrdC5uYW1lKSxlPXQudXBjYXN0KGUpLHQ9dC5iYXNlQ2xhc3M7cmV0dXJuIGV9ZnVuY3Rpb24gUmUoZSx0KXtpZihudWxsPT09dClyZXR1cm4gdGhpcy5pc1JlZmVyZW5jZSYmbWUoIm51bGwgaXMgbm90IGEgdmFsaWQgIit0aGlzLm5hbWUpLDA7dC4kJHx8bWUoJ0Nhbm5vdCBwYXNzICInK1FlKHQpKyciIGFzIGEgJyt0aGlzLm5hbWUpLHQuJCQucHRyfHxtZSgiQ2Fubm90IHBhc3MgZGVsZXRlZCBvYmplY3QgYXMgYSBwb2ludGVyIG9mIHR5cGUgIit0aGlzLm5hbWUpO3ZhciByPXQuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3M7cmV0dXJuIHhlKHQuJCQucHRyLHIsdGhpcy5yZWdpc3RlcmVkQ2xhc3MpfWZ1bmN0aW9uIE9lKGUsdCl7dmFyIHI7aWYobnVsbD09PXQpcmV0dXJuIHRoaXMuaXNSZWZlcmVuY2UmJm1lKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKSx0aGlzLmlzU21hcnRQb2ludGVyPyhyPXRoaXMucmF3Q29uc3RydWN0b3IoKSxudWxsIT09ZSYmZS5wdXNoKHRoaXMucmF3RGVzdHJ1Y3RvcixyKSxyKTowO3QuJCR8fG1lKCdDYW5ub3QgcGFzcyAiJytRZSh0KSsnIiBhcyBhICcrdGhpcy5uYW1lKSx0LiQkLnB0cnx8bWUoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKSwhdGhpcy5pc0NvbnN0JiZ0LiQkLnB0clR5cGUuaXNDb25zdCYmbWUoIkNhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgIisodC4kJC5zbWFydFB0clR5cGU/dC4kJC5zbWFydFB0clR5cGUubmFtZTp0LiQkLnB0clR5cGUubmFtZSkrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSk7dmFyIG49dC4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcztpZihyPXhlKHQuJCQucHRyLG4sdGhpcy5yZWdpc3RlcmVkQ2xhc3MpLHRoaXMuaXNTbWFydFBvaW50ZXIpc3dpdGNoKHZvaWQgMD09PXQuJCQuc21hcnRQdHImJm1lKCJQYXNzaW5nIHJhdyBwb2ludGVyIHRvIHNtYXJ0IHBvaW50ZXIgaXMgaWxsZWdhbCIpLHRoaXMuc2hhcmluZ1BvbGljeSl7Y2FzZSAwOnQuJCQuc21hcnRQdHJUeXBlPT09dGhpcz9yPXQuJCQuc21hcnRQdHI6bWUoIkNhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgIisodC4kJC5zbWFydFB0clR5cGU/dC4kJC5zbWFydFB0clR5cGUubmFtZTp0LiQkLnB0clR5cGUubmFtZSkrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSk7YnJlYWs7Y2FzZSAxOnI9dC4kJC5zbWFydFB0cjticmVhaztjYXNlIDI6aWYodC4kJC5zbWFydFB0clR5cGU9PT10aGlzKXI9dC4kJC5zbWFydFB0cjtlbHNle3ZhciBvPXQuY2xvbmUoKTtyPXRoaXMucmF3U2hhcmUocixYZS50b0hhbmRsZSgoZnVuY3Rpb24oKXtvLmRlbGV0ZSgpfSkpKSxudWxsIT09ZSYmZS5wdXNoKHRoaXMucmF3RGVzdHJ1Y3RvcixyKX1icmVhaztkZWZhdWx0Om1lKCJVbnN1cHBvcnRpbmcgc2hhcmluZyBwb2xpY3kiKX1yZXR1cm4gcn1mdW5jdGlvbiBqZShlLHQpe2lmKG51bGw9PT10KXJldHVybiB0aGlzLmlzUmVmZXJlbmNlJiZtZSgibnVsbCBpcyBub3QgYSB2YWxpZCAiK3RoaXMubmFtZSksMDt0LiQkfHxtZSgnQ2Fubm90IHBhc3MgIicrUWUodCkrJyIgYXMgYSAnK3RoaXMubmFtZSksdC4kJC5wdHJ8fG1lKCJDYW5ub3QgcGFzcyBkZWxldGVkIG9iamVjdCBhcyBhIHBvaW50ZXIgb2YgdHlwZSAiK3RoaXMubmFtZSksdC4kJC5wdHJUeXBlLmlzQ29uc3QmJm1lKCJDYW5ub3QgY29udmVydCBhcmd1bWVudCBvZiB0eXBlICIrdC4kJC5wdHJUeXBlLm5hbWUrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSk7dmFyIHI9dC4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcztyZXR1cm4geGUodC4kJC5wdHIscix0aGlzLnJlZ2lzdGVyZWRDbGFzcyl9ZnVuY3Rpb24gSWUoZSx0LHIsbixvLGEsaSxzLHUsYyxsKXt0aGlzLm5hbWU9ZSx0aGlzLnJlZ2lzdGVyZWRDbGFzcz10LHRoaXMuaXNSZWZlcmVuY2U9cix0aGlzLmlzQ29uc3Q9bix0aGlzLmlzU21hcnRQb2ludGVyPW8sdGhpcy5wb2ludGVlVHlwZT1hLHRoaXMuc2hhcmluZ1BvbGljeT1pLHRoaXMucmF3R2V0UG9pbnRlZT1zLHRoaXMucmF3Q29uc3RydWN0b3I9dSx0aGlzLnJhd1NoYXJlPWMsdGhpcy5yYXdEZXN0cnVjdG9yPWwsb3x8dm9pZCAwIT09dC5iYXNlQ2xhc3M/dGhpcy50b1dpcmVUeXBlPU9lOm4/KHRoaXMudG9XaXJlVHlwZT1SZSx0aGlzLmRlc3RydWN0b3JGdW5jdGlvbj1udWxsKToodGhpcy50b1dpcmVUeXBlPWplLHRoaXMuZGVzdHJ1Y3RvckZ1bmN0aW9uPW51bGwpfWZ1bmN0aW9uIHplKHQscixuKXtlLmhhc093blByb3BlcnR5KHQpfHxjZSgiUmVwbGFjaW5nIG5vbmV4aXN0YW50IHB1YmxpYyBzeW1ib2wiKSx2b2lkIDAhPT1lW3RdLm92ZXJsb2FkVGFibGUmJnZvaWQgMCE9PW4/ZVt0XS5vdmVybG9hZFRhYmxlW25dPXI6KGVbdF09cixlW3RdLmFyZ0NvdW50PW4pfWZ1bmN0aW9uIE5lKHQscil7dmFyIG4sbyxhLGk9KHQ9cGUodCkpLmluY2x1ZGVzKCJqIik/KG49dCxvPXIsYT1bXSxmdW5jdGlvbigpe3JldHVybiBhLmxlbmd0aD0wLE9iamVjdC5hc3NpZ24oYSxhcmd1bWVudHMpLGZ1bmN0aW9uKHQscixuKXtyZXR1cm4gdC5pbmNsdWRlcygiaiIpP2Z1bmN0aW9uKHQscixuKXt2YXIgbz1lWyJkeW5DYWxsXyIrdF07cmV0dXJuIG4mJm4ubGVuZ3RoP28uYXBwbHkobnVsbCxbcl0uY29uY2F0KG4pKTpvLmNhbGwobnVsbCxyKX0odCxyLG4pOkcocikuYXBwbHkobnVsbCxuKX0obixvLGEpfSk6RyhyKTtyZXR1cm4iZnVuY3Rpb24iIT10eXBlb2YgaSYmbWUoInVua25vd24gZnVuY3Rpb24gcG9pbnRlciB3aXRoIHNpZ25hdHVyZSAiK3QrIjogIityKSxpfXZhciBCZT12b2lkIDA7ZnVuY3Rpb24gV2UoZSl7dmFyIHQ9JHQoZSkscj1wZSh0KTtyZXR1cm4gTXQodCkscn1mdW5jdGlvbiBMZShlLHQpe3ZhciByPVtdLG49e307dGhyb3cgdC5mb3JFYWNoKChmdW5jdGlvbiBlKHQpe25bdF18fHRlW3RdfHwocmVbdF0/cmVbdF0uZm9yRWFjaChlKTooci5wdXNoKHQpLG5bdF09ITApKX0pKSxuZXcgQmUoZSsiOiAiK3IubWFwKFdlKS5qb2luKFsiLCAiXSkpfWZ1bmN0aW9uIFVlKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgRnVuY3Rpb24pKXRocm93IG5ldyBUeXBlRXJyb3IoIm5ld18gY2FsbGVkIHdpdGggY29uc3RydWN0b3IgdHlwZSAiK3R5cGVvZiBlKyIgd2hpY2ggaXMgbm90IGEgZnVuY3Rpb24iKTt2YXIgcj1pZShlLm5hbWV8fCJ1bmtub3duRnVuY3Rpb25OYW1lIiwoZnVuY3Rpb24oKXt9KSk7ci5wcm90b3R5cGU9ZS5wcm90b3R5cGU7dmFyIG49bmV3IHIsbz1lLmFwcGx5KG4sdCk7cmV0dXJuIG8gaW5zdGFuY2VvZiBPYmplY3Q/bzpufWZ1bmN0aW9uIEhlKGUsdCxyLG4sbyl7dmFyIGE9dC5sZW5ndGg7YTwyJiZtZSgiYXJnVHlwZXMgYXJyYXkgc2l6ZSBtaXNtYXRjaCEgTXVzdCBhdCBsZWFzdCBnZXQgcmV0dXJuIHZhbHVlIGFuZCAndGhpcycgdHlwZXMhIik7Zm9yKHZhciBpPW51bGwhPT10WzFdJiZudWxsIT09cixzPSExLHU9MTt1PHQubGVuZ3RoOysrdSlpZihudWxsIT09dFt1XSYmdm9pZCAwPT09dFt1XS5kZXN0cnVjdG9yRnVuY3Rpb24pe3M9ITA7YnJlYWt9dmFyIGM9InZvaWQiIT09dFswXS5uYW1lLGw9IiIsZD0iIjtmb3IodT0wO3U8YS0yOysrdSlsKz0oMCE9PXU/IiwgIjoiIikrImFyZyIrdSxkKz0oMCE9PXU/IiwgIjoiIikrImFyZyIrdSsiV2lyZWQiO3ZhciBmPSJyZXR1cm4gZnVuY3Rpb24gIithZShlKSsiKCIrbCsiKSB7XG5pZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gIisoYS0yKSsiKSB7XG50aHJvd0JpbmRpbmdFcnJvcignZnVuY3Rpb24gIitlKyIgY2FsbGVkIHdpdGggJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIGFyZ3VtZW50cywgZXhwZWN0ZWQgIisoYS0yKSsiIGFyZ3MhJyk7XG59XG4iO3MmJihmKz0idmFyIGRlc3RydWN0b3JzID0gW107XG4iKTt2YXIgcD1zPyJkZXN0cnVjdG9ycyI6Im51bGwiLGg9WyJ0aHJvd0JpbmRpbmdFcnJvciIsImludm9rZXIiLCJmbiIsInJ1bkRlc3RydWN0b3JzIiwicmV0VHlwZSIsImNsYXNzUGFyYW0iXSxtPVttZSxuLG8sUSx0WzBdLHRbMV1dO2ZvcihpJiYoZis9InZhciB0aGlzV2lyZWQgPSBjbGFzc1BhcmFtLnRvV2lyZVR5cGUoIitwKyIsIHRoaXMpO1xuIiksdT0wO3U8YS0yOysrdSlmKz0idmFyIGFyZyIrdSsiV2lyZWQgPSBhcmdUeXBlIit1KyIudG9XaXJlVHlwZSgiK3ArIiwgYXJnIit1KyIpOyAvLyAiK3RbdSsyXS5uYW1lKyJcbiIsaC5wdXNoKCJhcmdUeXBlIit1KSxtLnB1c2godFt1KzJdKTtpZihpJiYoZD0idGhpc1dpcmVkIisoZC5sZW5ndGg+MD8iLCAiOiIiKStkKSxmKz0oYz8idmFyIHJ2ID0gIjoiIikrImludm9rZXIoZm4iKyhkLmxlbmd0aD4wPyIsICI6IiIpK2QrIik7XG4iLHMpZis9InJ1bkRlc3RydWN0b3JzKGRlc3RydWN0b3JzKTtcbiI7ZWxzZSBmb3IodT1pPzE6Mjt1PHQubGVuZ3RoOysrdSl7dmFyIHY9MT09PXU/InRoaXNXaXJlZCI6ImFyZyIrKHUtMikrIldpcmVkIjtudWxsIT09dFt1XS5kZXN0cnVjdG9yRnVuY3Rpb24mJihmKz12KyJfZHRvcigiK3YrIik7IC8vICIrdFt1XS5uYW1lKyJcbiIsaC5wdXNoKHYrIl9kdG9yIiksbS5wdXNoKHRbdV0uZGVzdHJ1Y3RvckZ1bmN0aW9uKSl9cmV0dXJuIGMmJihmKz0idmFyIHJldCA9IHJldFR5cGUuZnJvbVdpcmVUeXBlKHJ2KTtcbnJldHVybiByZXQ7XG4iKSxmKz0ifVxuIixoLnB1c2goZiksVWUoRnVuY3Rpb24saCkuYXBwbHkobnVsbCxtKX1mdW5jdGlvbiBWZShlLHQpe2Zvcih2YXIgcj1bXSxuPTA7bjxlO24rKylyLnB1c2goX1t0KzQqbj4+Ml0pO3JldHVybiByfXZhciBZZT1bXSxxZT1be30se3ZhbHVlOnZvaWQgMH0se3ZhbHVlOm51bGx9LHt2YWx1ZTohMH0se3ZhbHVlOiExfV07ZnVuY3Rpb24gR2UoZSl7ZT40JiYwPT0tLXFlW2VdLnJlZmNvdW50JiYocWVbZV09dm9pZCAwLFllLnB1c2goZSkpfXZhciBYZT17dG9WYWx1ZTplPT4oZXx8bWUoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIrZSkscWVbZV0udmFsdWUpLHRvSGFuZGxlOmU9Pntzd2l0Y2goZSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UhMDpyZXR1cm4gMztjYXNlITE6cmV0dXJuIDQ7ZGVmYXVsdDp2YXIgdD1ZZS5sZW5ndGg/WWUucG9wKCk6cWUubGVuZ3RoO3JldHVybiBxZVt0XT17cmVmY291bnQ6MSx2YWx1ZTplfSx0fX19O2Z1bmN0aW9uIEplKGUsdCxyKXtzd2l0Y2godCl7Y2FzZSAwOnJldHVybiBmdW5jdGlvbihlKXt2YXIgdD1yP3Y6eTtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUodFtlXSl9O2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHQ9cj9nOnc7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKHRbZT4+MV0pfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PXI/RTpfO3JldHVybiB0aGlzLmZyb21XaXJlVHlwZSh0W2U+PjJdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKCJVbmtub3duIGludGVnZXIgdHlwZTogIitlKX19ZnVuY3Rpb24gS2UoZSx0KXt2YXIgcj10ZVtlXTtyZXR1cm4gdm9pZCAwPT09ciYmbWUodCsiIGhhcyB1bmtub3duIHR5cGUgIitXZShlKSkscn1mdW5jdGlvbiBRZShlKXtpZihudWxsPT09ZSlyZXR1cm4ibnVsbCI7dmFyIHQ9dHlwZW9mIGU7cmV0dXJuIm9iamVjdCI9PT10fHwiYXJyYXkiPT09dHx8ImZ1bmN0aW9uIj09PXQ/ZS50b1N0cmluZygpOiIiK2V9ZnVuY3Rpb24gWmUoZSx0KXtzd2l0Y2godCl7Y2FzZSAyOnJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoYltlPj4yXSl9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKGtbZT4+M10pfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gZmxvYXQgdHlwZTogIitlKX19ZnVuY3Rpb24gZXQoZSx0LHIpe3N3aXRjaCh0KXtjYXNlIDA6cmV0dXJuIHI/ZnVuY3Rpb24oZSl7cmV0dXJuIHZbZV19OmZ1bmN0aW9uKGUpe3JldHVybiB5W2VdfTtjYXNlIDE6cmV0dXJuIHI/ZnVuY3Rpb24oZSl7cmV0dXJuIGdbZT4+MV19OmZ1bmN0aW9uKGUpe3JldHVybiB3W2U+PjFdfTtjYXNlIDI6cmV0dXJuIHI/ZnVuY3Rpb24oZSl7cmV0dXJuIEVbZT4+Ml19OmZ1bmN0aW9uKGUpe3JldHVybiBfW2U+PjJdfTtkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gaW50ZWdlciB0eXBlOiAiK2UpfX12YXIgdHQ9InVuZGVmaW5lZCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoInV0Zi0xNmxlIik6dm9pZCAwO2Z1bmN0aW9uIHJ0KGUsdCl7Zm9yKHZhciByPWUsbj1yPj4xLG89bit0LzI7IShuPj1vKSYmd1tuXTspKytuO2lmKChyPW48PDEpLWU+MzImJnR0KXJldHVybiB0dC5kZWNvZGUoeS5zdWJhcnJheShlLHIpKTtmb3IodmFyIGE9IiIsaT0wOyEoaT49dC8yKTsrK2kpe3ZhciBzPWdbZSsyKmk+PjFdO2lmKDA9PXMpYnJlYWs7YSs9U3RyaW5nLmZyb21DaGFyQ29kZShzKX1yZXR1cm4gYX1mdW5jdGlvbiBudChlLHQscil7aWYodm9pZCAwPT09ciYmKHI9MjE0NzQ4MzY0NykscjwyKXJldHVybiAwO2Zvcih2YXIgbj10LG89KHItPTIpPDIqZS5sZW5ndGg/ci8yOmUubGVuZ3RoLGE9MDthPG87KythKXt2YXIgaT1lLmNoYXJDb2RlQXQoYSk7Z1t0Pj4xXT1pLHQrPTJ9cmV0dXJuIGdbdD4+MV09MCx0LW59ZnVuY3Rpb24gb3QoZSl7cmV0dXJuIDIqZS5sZW5ndGh9ZnVuY3Rpb24gYXQoZSx0KXtmb3IodmFyIHI9MCxuPSIiOyEocj49dC80KTspe3ZhciBvPUVbZSs0KnI+PjJdO2lmKDA9PW8pYnJlYWs7aWYoKytyLG8+PTY1NTM2KXt2YXIgYT1vLTY1NTM2O24rPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8YT4+MTAsNTYzMjB8MTAyMyZhKX1lbHNlIG4rPVN0cmluZy5mcm9tQ2hhckNvZGUobyl9cmV0dXJuIG59ZnVuY3Rpb24gaXQoZSx0LHIpe2lmKHZvaWQgMD09PXImJihyPTIxNDc0ODM2NDcpLHI8NClyZXR1cm4gMDtmb3IodmFyIG49dCxvPW4rci00LGE9MDthPGUubGVuZ3RoOysrYSl7dmFyIGk9ZS5jaGFyQ29kZUF0KGEpO2lmKGk+PTU1Mjk2JiZpPD01NzM0MyYmKGk9NjU1MzYrKCgxMDIzJmkpPDwxMCl8MTAyMyZlLmNoYXJDb2RlQXQoKythKSksRVt0Pj4yXT1pLCh0Kz00KSs0Pm8pYnJlYWt9cmV0dXJuIEVbdD4+Ml09MCx0LW59ZnVuY3Rpb24gc3QoZSl7Zm9yKHZhciB0PTAscj0wO3I8ZS5sZW5ndGg7KytyKXt2YXIgbj1lLmNoYXJDb2RlQXQocik7bj49NTUyOTYmJm48PTU3MzQzJiYrK3IsdCs9NH1yZXR1cm4gdH12YXIgdXQ9e307ZnVuY3Rpb24gY3QoZSl7dmFyIHQ9dXRbZV07cmV0dXJuIHZvaWQgMD09PXQ/cGUoZSk6dH12YXIgbHQsZHQ9W10sZnQ9W107bHQ9KCk9PnBlcmZvcm1hbmNlLm5vdygpO3ZhciBwdD17fTtmdW5jdGlvbiBodCgpe2lmKCFodC5zdHJpbmdzKXt2YXIgZT17VVNFUjoid2ViX3VzZXIiLExPR05BTUU6IndlYl91c2VyIixQQVRIOiIvIixQV0Q6Ii8iLEhPTUU6Ii9ob21lL3dlYl91c2VyIixMQU5HOigib2JqZWN0Ij09dHlwZW9mIG5hdmlnYXRvciYmbmF2aWdhdG9yLmxhbmd1YWdlcyYmbmF2aWdhdG9yLmxhbmd1YWdlc1swXXx8IkMiKS5yZXBsYWNlKCItIiwiXyIpKyIuVVRGLTgiLF86dXx8Ii4vdGhpcy5wcm9ncmFtIn07Zm9yKHZhciB0IGluIHB0KXZvaWQgMD09PXB0W3RdP2RlbGV0ZSBlW3RdOmVbdF09cHRbdF07dmFyIHI9W107Zm9yKHZhciB0IGluIGUpci5wdXNoKHQrIj0iK2VbdF0pO2h0LnN0cmluZ3M9cn1yZXR1cm4gaHQuc3RyaW5nc312YXIgbXQ9e2lzQWJzOmU9PiIvIj09PWUuY2hhckF0KDApLHNwbGl0UGF0aDplPT4vXihcLz98KShbXHNcU10qPykoKD86XC57MSwyfXxbXlwvXSs/fCkoXC5bXi5cL10qfCkpKD86W1wvXSopJC8uZXhlYyhlKS5zbGljZSgxKSxub3JtYWxpemVBcnJheTooZSx0KT0+e2Zvcih2YXIgcj0wLG49ZS5sZW5ndGgtMTtuPj0wO24tLSl7dmFyIG89ZVtuXTsiLiI9PT1vP2Uuc3BsaWNlKG4sMSk6Ii4uIj09PW8/KGUuc3BsaWNlKG4sMSkscisrKTpyJiYoZS5zcGxpY2UobiwxKSxyLS0pfWlmKHQpZm9yKDtyO3ItLSllLnVuc2hpZnQoIi4uIik7cmV0dXJuIGV9LG5vcm1hbGl6ZTplPT57dmFyIHQ9bXQuaXNBYnMoZSkscj0iLyI9PT1lLnN1YnN0cigtMSk7cmV0dXJuKGU9bXQubm9ybWFsaXplQXJyYXkoZS5zcGxpdCgiLyIpLmZpbHRlcigoZT0+ISFlKSksIXQpLmpvaW4oIi8iKSl8fHR8fChlPSIuIiksZSYmciYmKGUrPSIvIiksKHQ/Ii8iOiIiKStlfSxkaXJuYW1lOmU9Pnt2YXIgdD1tdC5zcGxpdFBhdGgoZSkscj10WzBdLG49dFsxXTtyZXR1cm4gcnx8bj8obiYmKG49bi5zdWJzdHIoMCxuLmxlbmd0aC0xKSkscituKToiLiJ9LGJhc2VuYW1lOmU9PntpZigiLyI9PT1lKXJldHVybiIvIjt2YXIgdD0oZT0oZT1tdC5ub3JtYWxpemUoZSkpLnJlcGxhY2UoL1wvJC8sIiIpKS5sYXN0SW5kZXhPZigiLyIpO3JldHVybi0xPT09dD9lOmUuc3Vic3RyKHQrMSl9LGpvaW46ZnVuY3Rpb24oKXt2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO3JldHVybiBtdC5ub3JtYWxpemUoZS5qb2luKCIvIikpfSxqb2luMjooZSx0KT0+bXQubm9ybWFsaXplKGUrIi8iK3QpfSx2dD17cmVzb2x2ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT0iIix0PSExLHI9YXJndW1lbnRzLmxlbmd0aC0xO3I+PS0xJiYhdDtyLS0pe3ZhciBuPXI+PTA/YXJndW1lbnRzW3JdOl90LmN3ZCgpO2lmKCJzdHJpbmciIT10eXBlb2Ygbil0aHJvdyBuZXcgVHlwZUVycm9yKCJBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncyIpO2lmKCFuKXJldHVybiIiO2U9bisiLyIrZSx0PW10LmlzQWJzKG4pfXJldHVybih0PyIvIjoiIikrKGU9bXQubm9ybWFsaXplQXJyYXkoZS5zcGxpdCgiLyIpLmZpbHRlcigoZT0+ISFlKSksIXQpLmpvaW4oIi8iKSl8fCIuIn0scmVsYXRpdmU6KGUsdCk9PntmdW5jdGlvbiByKGUpe2Zvcih2YXIgdD0wO3Q8ZS5sZW5ndGgmJiIiPT09ZVt0XTt0KyspO2Zvcih2YXIgcj1lLmxlbmd0aC0xO3I+PTAmJiIiPT09ZVtyXTtyLS0pO3JldHVybiB0PnI/W106ZS5zbGljZSh0LHItdCsxKX1lPXZ0LnJlc29sdmUoZSkuc3Vic3RyKDEpLHQ9dnQucmVzb2x2ZSh0KS5zdWJzdHIoMSk7Zm9yKHZhciBuPXIoZS5zcGxpdCgiLyIpKSxvPXIodC5zcGxpdCgiLyIpKSxhPU1hdGgubWluKG4ubGVuZ3RoLG8ubGVuZ3RoKSxpPWEscz0wO3M8YTtzKyspaWYobltzXSE9PW9bc10pe2k9czticmVha312YXIgdT1bXTtmb3Iocz1pO3M8bi5sZW5ndGg7cysrKXUucHVzaCgiLi4iKTtyZXR1cm4odT11LmNvbmNhdChvLnNsaWNlKGkpKSkuam9pbigiLyIpfX07ZnVuY3Rpb24geXQoZSx0LHIpe3ZhciBuPXI+MD9yOkMoZSkrMSxvPW5ldyBBcnJheShuKSxhPUQoZSxvLDAsby5sZW5ndGgpO3JldHVybiB0JiYoby5sZW5ndGg9YSksb312YXIgZ3Q9e3R0eXM6W10saW5pdDpmdW5jdGlvbigpe30sc2h1dGRvd246ZnVuY3Rpb24oKXt9LHJlZ2lzdGVyOmZ1bmN0aW9uKGUsdCl7Z3QudHR5c1tlXT17aW5wdXQ6W10sb3V0cHV0OltdLG9wczp0fSxfdC5yZWdpc3RlckRldmljZShlLGd0LnN0cmVhbV9vcHMpfSxzdHJlYW1fb3BzOntvcGVuOmZ1bmN0aW9uKGUpe3ZhciB0PWd0LnR0eXNbZS5ub2RlLnJkZXZdO2lmKCF0KXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDQzKTtlLnR0eT10LGUuc2Vla2FibGU9ITF9LGNsb3NlOmZ1bmN0aW9uKGUpe2UudHR5Lm9wcy5mc3luYyhlLnR0eSl9LGZzeW5jOmZ1bmN0aW9uKGUpe2UudHR5Lm9wcy5mc3luYyhlLnR0eSl9LHJlYWQ6ZnVuY3Rpb24oZSx0LHIsbixvKXtpZighZS50dHl8fCFlLnR0eS5vcHMuZ2V0X2NoYXIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjApO2Zvcih2YXIgYT0wLGk9MDtpPG47aSsrKXt2YXIgczt0cnl7cz1lLnR0eS5vcHMuZ2V0X2NoYXIoZS50dHkpfWNhdGNoKGUpe3Rocm93IG5ldyBfdC5FcnJub0Vycm9yKDI5KX1pZih2b2lkIDA9PT1zJiYwPT09YSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig2KTtpZihudWxsPT1zKWJyZWFrO2ErKyx0W3IraV09c31yZXR1cm4gYSYmKGUubm9kZS50aW1lc3RhbXA9RGF0ZS5ub3coKSksYX0sd3JpdGU6ZnVuY3Rpb24oZSx0LHIsbixvKXtpZighZS50dHl8fCFlLnR0eS5vcHMucHV0X2NoYXIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjApO3RyeXtmb3IodmFyIGE9MDthPG47YSsrKWUudHR5Lm9wcy5wdXRfY2hhcihlLnR0eSx0W3IrYV0pfWNhdGNoKGUpe3Rocm93IG5ldyBfdC5FcnJub0Vycm9yKDI5KX1yZXR1cm4gbiYmKGUubm9kZS50aW1lc3RhbXA9RGF0ZS5ub3coKSksYX19LGRlZmF1bHRfdHR5X29wczp7Z2V0X2NoYXI6ZnVuY3Rpb24oZSl7aWYoIWUuaW5wdXQubGVuZ3RoKXt2YXIgdD1udWxsO2lmKCJ1bmRlZmluZWQiIT10eXBlb2Ygd2luZG93JiYiZnVuY3Rpb24iPT10eXBlb2Ygd2luZG93LnByb21wdD9udWxsIT09KHQ9d2luZG93LnByb21wdCgiSW5wdXQ6ICIpKSYmKHQrPSJcbiIpOiJmdW5jdGlvbiI9PXR5cGVvZiByZWFkbGluZSYmbnVsbCE9PSh0PXJlYWRsaW5lKCkpJiYodCs9IlxuIiksIXQpcmV0dXJuIG51bGw7ZS5pbnB1dD15dCh0LCEwKX1yZXR1cm4gZS5pbnB1dC5zaGlmdCgpfSxwdXRfY2hhcjpmdW5jdGlvbihlLHQpe251bGw9PT10fHwxMD09PXQ/KGwoVChlLm91dHB1dCwwKSksZS5vdXRwdXQ9W10pOjAhPXQmJmUub3V0cHV0LnB1c2godCl9LGZzeW5jOmZ1bmN0aW9uKGUpe2Uub3V0cHV0JiZlLm91dHB1dC5sZW5ndGg+MCYmKGwoVChlLm91dHB1dCwwKSksZS5vdXRwdXQ9W10pfX0sZGVmYXVsdF90dHkxX29wczp7cHV0X2NoYXI6ZnVuY3Rpb24oZSx0KXtudWxsPT09dHx8MTA9PT10PyhkKFQoZS5vdXRwdXQsMCkpLGUub3V0cHV0PVtdKTowIT10JiZlLm91dHB1dC5wdXNoKHQpfSxmc3luYzpmdW5jdGlvbihlKXtlLm91dHB1dCYmZS5vdXRwdXQubGVuZ3RoPjAmJihkKFQoZS5vdXRwdXQsMCkpLGUub3V0cHV0PVtdKX19fTtmdW5jdGlvbiB3dChlKXtlPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIDY1NTM2Kk1hdGguY2VpbChlLzY1NTM2KX0oZSk7dmFyIHQ9eHQoNjU1MzYsZSk7cmV0dXJuIHQ/ZnVuY3Rpb24oZSx0KXtyZXR1cm4geS5maWxsKDAsZSxlK3QpLGV9KHQsZSk6MH12YXIgRXQ9e29wc190YWJsZTpudWxsLG1vdW50OmZ1bmN0aW9uKGUpe3JldHVybiBFdC5jcmVhdGVOb2RlKG51bGwsIi8iLDE2ODk1LDApfSxjcmVhdGVOb2RlOmZ1bmN0aW9uKGUsdCxyLG4pe2lmKF90LmlzQmxrZGV2KHIpfHxfdC5pc0ZJRk8ocikpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjMpO0V0Lm9wc190YWJsZXx8KEV0Lm9wc190YWJsZT17ZGlyOntub2RlOntnZXRhdHRyOkV0Lm5vZGVfb3BzLmdldGF0dHIsc2V0YXR0cjpFdC5ub2RlX29wcy5zZXRhdHRyLGxvb2t1cDpFdC5ub2RlX29wcy5sb29rdXAsbWtub2Q6RXQubm9kZV9vcHMubWtub2QscmVuYW1lOkV0Lm5vZGVfb3BzLnJlbmFtZSx1bmxpbms6RXQubm9kZV9vcHMudW5saW5rLHJtZGlyOkV0Lm5vZGVfb3BzLnJtZGlyLHJlYWRkaXI6RXQubm9kZV9vcHMucmVhZGRpcixzeW1saW5rOkV0Lm5vZGVfb3BzLnN5bWxpbmt9LHN0cmVhbTp7bGxzZWVrOkV0LnN0cmVhbV9vcHMubGxzZWVrfX0sZmlsZTp7bm9kZTp7Z2V0YXR0cjpFdC5ub2RlX29wcy5nZXRhdHRyLHNldGF0dHI6RXQubm9kZV9vcHMuc2V0YXR0cn0sc3RyZWFtOntsbHNlZWs6RXQuc3RyZWFtX29wcy5sbHNlZWsscmVhZDpFdC5zdHJlYW1fb3BzLnJlYWQsd3JpdGU6RXQuc3RyZWFtX29wcy53cml0ZSxhbGxvY2F0ZTpFdC5zdHJlYW1fb3BzLmFsbG9jYXRlLG1tYXA6RXQuc3RyZWFtX29wcy5tbWFwLG1zeW5jOkV0LnN0cmVhbV9vcHMubXN5bmN9fSxsaW5rOntub2RlOntnZXRhdHRyOkV0Lm5vZGVfb3BzLmdldGF0dHIsc2V0YXR0cjpFdC5ub2RlX29wcy5zZXRhdHRyLHJlYWRsaW5rOkV0Lm5vZGVfb3BzLnJlYWRsaW5rfSxzdHJlYW06e319LGNocmRldjp7bm9kZTp7Z2V0YXR0cjpFdC5ub2RlX29wcy5nZXRhdHRyLHNldGF0dHI6RXQubm9kZV9vcHMuc2V0YXR0cn0sc3RyZWFtOl90LmNocmRldl9zdHJlYW1fb3BzfX0pO3ZhciBvPV90LmNyZWF0ZU5vZGUoZSx0LHIsbik7cmV0dXJuIF90LmlzRGlyKG8ubW9kZSk/KG8ubm9kZV9vcHM9RXQub3BzX3RhYmxlLmRpci5ub2RlLG8uc3RyZWFtX29wcz1FdC5vcHNfdGFibGUuZGlyLnN0cmVhbSxvLmNvbnRlbnRzPXt9KTpfdC5pc0ZpbGUoby5tb2RlKT8oby5ub2RlX29wcz1FdC5vcHNfdGFibGUuZmlsZS5ub2RlLG8uc3RyZWFtX29wcz1FdC5vcHNfdGFibGUuZmlsZS5zdHJlYW0sby51c2VkQnl0ZXM9MCxvLmNvbnRlbnRzPW51bGwpOl90LmlzTGluayhvLm1vZGUpPyhvLm5vZGVfb3BzPUV0Lm9wc190YWJsZS5saW5rLm5vZGUsby5zdHJlYW1fb3BzPUV0Lm9wc190YWJsZS5saW5rLnN0cmVhbSk6X3QuaXNDaHJkZXYoby5tb2RlKSYmKG8ubm9kZV9vcHM9RXQub3BzX3RhYmxlLmNocmRldi5ub2RlLG8uc3RyZWFtX29wcz1FdC5vcHNfdGFibGUuY2hyZGV2LnN0cmVhbSksby50aW1lc3RhbXA9RGF0ZS5ub3coKSxlJiYoZS5jb250ZW50c1t0XT1vLGUudGltZXN0YW1wPW8udGltZXN0YW1wKSxvfSxnZXRGaWxlRGF0YUFzVHlwZWRBcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZS5jb250ZW50cz9lLmNvbnRlbnRzLnN1YmFycmF5P2UuY29udGVudHMuc3ViYXJyYXkoMCxlLnVzZWRCeXRlcyk6bmV3IFVpbnQ4QXJyYXkoZS5jb250ZW50cyk6bmV3IFVpbnQ4QXJyYXkoMCl9LGV4cGFuZEZpbGVTdG9yYWdlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZS5jb250ZW50cz9lLmNvbnRlbnRzLmxlbmd0aDowO2lmKCEocj49dCkpe3Q9TWF0aC5tYXgodCxyKihyPDEwNDg1NzY/MjoxLjEyNSk+Pj4wKSwwIT1yJiYodD1NYXRoLm1heCh0LDI1NikpO3ZhciBuPWUuY29udGVudHM7ZS5jb250ZW50cz1uZXcgVWludDhBcnJheSh0KSxlLnVzZWRCeXRlcz4wJiZlLmNvbnRlbnRzLnNldChuLnN1YmFycmF5KDAsZS51c2VkQnl0ZXMpLDApfX0scmVzaXplRmlsZVN0b3JhZ2U6ZnVuY3Rpb24oZSx0KXtpZihlLnVzZWRCeXRlcyE9dClpZigwPT10KWUuY29udGVudHM9bnVsbCxlLnVzZWRCeXRlcz0wO2Vsc2V7dmFyIHI9ZS5jb250ZW50cztlLmNvbnRlbnRzPW5ldyBVaW50OEFycmF5KHQpLHImJmUuY29udGVudHMuc2V0KHIuc3ViYXJyYXkoMCxNYXRoLm1pbih0LGUudXNlZEJ5dGVzKSkpLGUudXNlZEJ5dGVzPXR9fSxub2RlX29wczp7Z2V0YXR0cjpmdW5jdGlvbihlKXt2YXIgdD17fTtyZXR1cm4gdC5kZXY9X3QuaXNDaHJkZXYoZS5tb2RlKT9lLmlkOjEsdC5pbm89ZS5pZCx0Lm1vZGU9ZS5tb2RlLHQubmxpbms9MSx0LnVpZD0wLHQuZ2lkPTAsdC5yZGV2PWUucmRldixfdC5pc0RpcihlLm1vZGUpP3Quc2l6ZT00MDk2Ol90LmlzRmlsZShlLm1vZGUpP3Quc2l6ZT1lLnVzZWRCeXRlczpfdC5pc0xpbmsoZS5tb2RlKT90LnNpemU9ZS5saW5rLmxlbmd0aDp0LnNpemU9MCx0LmF0aW1lPW5ldyBEYXRlKGUudGltZXN0YW1wKSx0Lm10aW1lPW5ldyBEYXRlKGUudGltZXN0YW1wKSx0LmN0aW1lPW5ldyBEYXRlKGUudGltZXN0YW1wKSx0LmJsa3NpemU9NDA5Nix0LmJsb2Nrcz1NYXRoLmNlaWwodC5zaXplL3QuYmxrc2l6ZSksdH0sc2V0YXR0cjpmdW5jdGlvbihlLHQpe3ZvaWQgMCE9PXQubW9kZSYmKGUubW9kZT10Lm1vZGUpLHZvaWQgMCE9PXQudGltZXN0YW1wJiYoZS50aW1lc3RhbXA9dC50aW1lc3RhbXApLHZvaWQgMCE9PXQuc2l6ZSYmRXQucmVzaXplRmlsZVN0b3JhZ2UoZSx0LnNpemUpfSxsb29rdXA6ZnVuY3Rpb24oZSx0KXt0aHJvdyBfdC5nZW5lcmljRXJyb3JzWzQ0XX0sbWtub2Q6ZnVuY3Rpb24oZSx0LHIsbil7cmV0dXJuIEV0LmNyZWF0ZU5vZGUoZSx0LHIsbil9LHJlbmFtZTpmdW5jdGlvbihlLHQscil7aWYoX3QuaXNEaXIoZS5tb2RlKSl7dmFyIG47dHJ5e249X3QubG9va3VwTm9kZSh0LHIpfWNhdGNoKGUpe31pZihuKWZvcih2YXIgbyBpbiBuLmNvbnRlbnRzKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDU1KX1kZWxldGUgZS5wYXJlbnQuY29udGVudHNbZS5uYW1lXSxlLnBhcmVudC50aW1lc3RhbXA9RGF0ZS5ub3coKSxlLm5hbWU9cix0LmNvbnRlbnRzW3JdPWUsdC50aW1lc3RhbXA9ZS5wYXJlbnQudGltZXN0YW1wLGUucGFyZW50PXR9LHVubGluazpmdW5jdGlvbihlLHQpe2RlbGV0ZSBlLmNvbnRlbnRzW3RdLGUudGltZXN0YW1wPURhdGUubm93KCl9LHJtZGlyOmZ1bmN0aW9uKGUsdCl7dmFyIHI9X3QubG9va3VwTm9kZShlLHQpO2Zvcih2YXIgbiBpbiByLmNvbnRlbnRzKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDU1KTtkZWxldGUgZS5jb250ZW50c1t0XSxlLnRpbWVzdGFtcD1EYXRlLm5vdygpfSxyZWFkZGlyOmZ1bmN0aW9uKGUpe3ZhciB0PVsiLiIsIi4uIl07Zm9yKHZhciByIGluIGUuY29udGVudHMpZS5jb250ZW50cy5oYXNPd25Qcm9wZXJ0eShyKSYmdC5wdXNoKHIpO3JldHVybiB0fSxzeW1saW5rOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1FdC5jcmVhdGVOb2RlKGUsdCw0MTQ3MSwwKTtyZXR1cm4gbi5saW5rPXIsbn0scmVhZGxpbms6ZnVuY3Rpb24oZSl7aWYoIV90LmlzTGluayhlLm1vZGUpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDI4KTtyZXR1cm4gZS5saW5rfX0sc3RyZWFtX29wczp7cmVhZDpmdW5jdGlvbihlLHQscixuLG8pe3ZhciBhPWUubm9kZS5jb250ZW50cztpZihvPj1lLm5vZGUudXNlZEJ5dGVzKXJldHVybiAwO3ZhciBpPU1hdGgubWluKGUubm9kZS51c2VkQnl0ZXMtbyxuKTtpZihpPjgmJmEuc3ViYXJyYXkpdC5zZXQoYS5zdWJhcnJheShvLG8raSkscik7ZWxzZSBmb3IodmFyIHM9MDtzPGk7cysrKXRbcitzXT1hW28rc107cmV0dXJuIGl9LHdyaXRlOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXtpZighbilyZXR1cm4gMDt2YXIgaT1lLm5vZGU7aWYoaS50aW1lc3RhbXA9RGF0ZS5ub3coKSx0LnN1YmFycmF5JiYoIWkuY29udGVudHN8fGkuY29udGVudHMuc3ViYXJyYXkpKXtpZihhKXJldHVybiBpLmNvbnRlbnRzPXQuc3ViYXJyYXkocixyK24pLGkudXNlZEJ5dGVzPW4sbjtpZigwPT09aS51c2VkQnl0ZXMmJjA9PT1vKXJldHVybiBpLmNvbnRlbnRzPXQuc2xpY2UocixyK24pLGkudXNlZEJ5dGVzPW4sbjtpZihvK248PWkudXNlZEJ5dGVzKXJldHVybiBpLmNvbnRlbnRzLnNldCh0LnN1YmFycmF5KHIscituKSxvKSxufWlmKEV0LmV4cGFuZEZpbGVTdG9yYWdlKGksbytuKSxpLmNvbnRlbnRzLnN1YmFycmF5JiZ0LnN1YmFycmF5KWkuY29udGVudHMuc2V0KHQuc3ViYXJyYXkocixyK24pLG8pO2Vsc2UgZm9yKHZhciBzPTA7czxuO3MrKylpLmNvbnRlbnRzW28rc109dFtyK3NdO3JldHVybiBpLnVzZWRCeXRlcz1NYXRoLm1heChpLnVzZWRCeXRlcyxvK24pLG59LGxsc2VlazpmdW5jdGlvbihlLHQscil7dmFyIG49dDtpZigxPT09cj9uKz1lLnBvc2l0aW9uOjI9PT1yJiZfdC5pc0ZpbGUoZS5ub2RlLm1vZGUpJiYobis9ZS5ub2RlLnVzZWRCeXRlcyksbjwwKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDI4KTtyZXR1cm4gbn0sYWxsb2NhdGU6ZnVuY3Rpb24oZSx0LHIpe0V0LmV4cGFuZEZpbGVTdG9yYWdlKGUubm9kZSx0K3IpLGUubm9kZS51c2VkQnl0ZXM9TWF0aC5tYXgoZS5ub2RlLnVzZWRCeXRlcyx0K3IpfSxtbWFwOmZ1bmN0aW9uKGUsdCxyLG4sbyl7aWYoIV90LmlzRmlsZShlLm5vZGUubW9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDMpO3ZhciBhLGkscz1lLm5vZGUuY29udGVudHM7aWYoMiZvfHxzLmJ1ZmZlciE9PW0pe2lmKChyPjB8fHIrdDxzLmxlbmd0aCkmJihzPXMuc3ViYXJyYXk/cy5zdWJhcnJheShyLHIrdCk6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocyxyLHIrdCkpLGk9ITAsIShhPXd0KHQpKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0OCk7di5zZXQocyxhKX1lbHNlIGk9ITEsYT1zLmJ5dGVPZmZzZXQ7cmV0dXJue3B0cjphLGFsbG9jYXRlZDppfX0sbXN5bmM6ZnVuY3Rpb24oZSx0LHIsbixvKXtyZXR1cm4gRXQuc3RyZWFtX29wcy53cml0ZShlLHQsMCxuLHIsITEpLDB9fX0sX3Q9e3Jvb3Q6bnVsbCxtb3VudHM6W10sZGV2aWNlczp7fSxzdHJlYW1zOltdLG5leHRJbm9kZToxLG5hbWVUYWJsZTpudWxsLGN1cnJlbnRQYXRoOiIvIixpbml0aWFsaXplZDohMSxpZ25vcmVQZXJtaXNzaW9uczohMCxFcnJub0Vycm9yOm51bGwsZ2VuZXJpY0Vycm9yczp7fSxmaWxlc3lzdGVtczpudWxsLHN5bmNGU1JlcXVlc3RzOjAsbG9va3VwUGF0aDooZSx0PXt9KT0+e2lmKCEoZT12dC5yZXNvbHZlKGUpKSlyZXR1cm57cGF0aDoiIixub2RlOm51bGx9O2lmKCh0PU9iamVjdC5hc3NpZ24oe2ZvbGxvd19tb3VudDohMCxyZWN1cnNlX2NvdW50OjB9LHQpKS5yZWN1cnNlX2NvdW50PjgpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMzIpO2Zvcih2YXIgcj1lLnNwbGl0KCIvIikuZmlsdGVyKChlPT4hIWUpKSxuPV90LnJvb3Qsbz0iLyIsYT0wO2E8ci5sZW5ndGg7YSsrKXt2YXIgaT1hPT09ci5sZW5ndGgtMTtpZihpJiZ0LnBhcmVudClicmVhaztpZihuPV90Lmxvb2t1cE5vZGUobixyW2FdKSxvPW10LmpvaW4yKG8sclthXSksX3QuaXNNb3VudHBvaW50KG4pJiYoIWl8fGkmJnQuZm9sbG93X21vdW50KSYmKG49bi5tb3VudGVkLnJvb3QpLCFpfHx0LmZvbGxvdylmb3IodmFyIHM9MDtfdC5pc0xpbmsobi5tb2RlKTspe3ZhciB1PV90LnJlYWRsaW5rKG8pO2lmKG89dnQucmVzb2x2ZShtdC5kaXJuYW1lKG8pLHUpLG49X3QubG9va3VwUGF0aChvLHtyZWN1cnNlX2NvdW50OnQucmVjdXJzZV9jb3VudCsxfSkubm9kZSxzKys+NDApdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMzIpfX1yZXR1cm57cGF0aDpvLG5vZGU6bn19LGdldFBhdGg6ZT0+e2Zvcih2YXIgdDs7KXtpZihfdC5pc1Jvb3QoZSkpe3ZhciByPWUubW91bnQubW91bnRwb2ludDtyZXR1cm4gdD8iLyIhPT1yW3IubGVuZ3RoLTFdP3IrIi8iK3Q6cit0OnJ9dD10P2UubmFtZSsiLyIrdDplLm5hbWUsZT1lLnBhcmVudH19LGhhc2hOYW1lOihlLHQpPT57Zm9yKHZhciByPTAsbj0wO248dC5sZW5ndGg7bisrKXI9KHI8PDUpLXIrdC5jaGFyQ29kZUF0KG4pfDA7cmV0dXJuKGUrcj4+PjApJV90Lm5hbWVUYWJsZS5sZW5ndGh9LGhhc2hBZGROb2RlOmU9Pnt2YXIgdD1fdC5oYXNoTmFtZShlLnBhcmVudC5pZCxlLm5hbWUpO2UubmFtZV9uZXh0PV90Lm5hbWVUYWJsZVt0XSxfdC5uYW1lVGFibGVbdF09ZX0saGFzaFJlbW92ZU5vZGU6ZT0+e3ZhciB0PV90Lmhhc2hOYW1lKGUucGFyZW50LmlkLGUubmFtZSk7aWYoX3QubmFtZVRhYmxlW3RdPT09ZSlfdC5uYW1lVGFibGVbdF09ZS5uYW1lX25leHQ7ZWxzZSBmb3IodmFyIHI9X3QubmFtZVRhYmxlW3RdO3I7KXtpZihyLm5hbWVfbmV4dD09PWUpe3IubmFtZV9uZXh0PWUubmFtZV9uZXh0O2JyZWFrfXI9ci5uYW1lX25leHR9fSxsb29rdXBOb2RlOihlLHQpPT57dmFyIHI9X3QubWF5TG9va3VwKGUpO2lmKHIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IocixlKTtmb3IodmFyIG49X3QuaGFzaE5hbWUoZS5pZCx0KSxvPV90Lm5hbWVUYWJsZVtuXTtvO289by5uYW1lX25leHQpe3ZhciBhPW8ubmFtZTtpZihvLnBhcmVudC5pZD09PWUuaWQmJmE9PT10KXJldHVybiBvfXJldHVybiBfdC5sb29rdXAoZSx0KX0sY3JlYXRlTm9kZTooZSx0LHIsbik9Pnt2YXIgbz1uZXcgX3QuRlNOb2RlKGUsdCxyLG4pO3JldHVybiBfdC5oYXNoQWRkTm9kZShvKSxvfSxkZXN0cm95Tm9kZTplPT57X3QuaGFzaFJlbW92ZU5vZGUoZSl9LGlzUm9vdDplPT5lPT09ZS5wYXJlbnQsaXNNb3VudHBvaW50OmU9PiEhZS5tb3VudGVkLGlzRmlsZTplPT4zMjc2OD09KDYxNDQwJmUpLGlzRGlyOmU9PjE2Mzg0PT0oNjE0NDAmZSksaXNMaW5rOmU9PjQwOTYwPT0oNjE0NDAmZSksaXNDaHJkZXY6ZT0+ODE5Mj09KDYxNDQwJmUpLGlzQmxrZGV2OmU9PjI0NTc2PT0oNjE0NDAmZSksaXNGSUZPOmU9PjQwOTY9PSg2MTQ0MCZlKSxpc1NvY2tldDplPT4hKDQ5MTUyJn5lKSxmbGFnTW9kZXM6e3I6MCwicisiOjIsdzo1NzcsIncrIjo1NzgsYToxMDg5LCJhKyI6MTA5MH0sbW9kZVN0cmluZ1RvRmxhZ3M6ZT0+e3ZhciB0PV90LmZsYWdNb2Rlc1tlXTtpZih2b2lkIDA9PT10KXRocm93IG5ldyBFcnJvcigiVW5rbm93biBmaWxlIG9wZW4gbW9kZTogIitlKTtyZXR1cm4gdH0sZmxhZ3NUb1Blcm1pc3Npb25TdHJpbmc6ZT0+e3ZhciB0PVsiciIsInciLCJydyJdWzMmZV07cmV0dXJuIDUxMiZlJiYodCs9InciKSx0fSxub2RlUGVybWlzc2lvbnM6KGUsdCk9Pl90Lmlnbm9yZVBlcm1pc3Npb25zfHwoIXQuaW5jbHVkZXMoInIiKXx8MjkyJmUubW9kZSkmJighdC5pbmNsdWRlcygidyIpfHwxNDYmZS5tb2RlKSYmKCF0LmluY2x1ZGVzKCJ4Iil8fDczJmUubW9kZSk/MDoyLG1heUxvb2t1cDplPT5fdC5ub2RlUGVybWlzc2lvbnMoZSwieCIpfHwoZS5ub2RlX29wcy5sb29rdXA/MDoyKSxtYXlDcmVhdGU6KGUsdCk9Pnt0cnl7cmV0dXJuIF90Lmxvb2t1cE5vZGUoZSx0KSwyMH1jYXRjaChlKXt9cmV0dXJuIF90Lm5vZGVQZXJtaXNzaW9ucyhlLCJ3eCIpfSxtYXlEZWxldGU6KGUsdCxyKT0+e3ZhciBuO3RyeXtuPV90Lmxvb2t1cE5vZGUoZSx0KX1jYXRjaChlKXtyZXR1cm4gZS5lcnJub312YXIgbz1fdC5ub2RlUGVybWlzc2lvbnMoZSwid3giKTtpZihvKXJldHVybiBvO2lmKHIpe2lmKCFfdC5pc0RpcihuLm1vZGUpKXJldHVybiA1NDtpZihfdC5pc1Jvb3Qobil8fF90LmdldFBhdGgobik9PT1fdC5jd2QoKSlyZXR1cm4gMTB9ZWxzZSBpZihfdC5pc0RpcihuLm1vZGUpKXJldHVybiAzMTtyZXR1cm4gMH0sbWF5T3BlbjooZSx0KT0+ZT9fdC5pc0xpbmsoZS5tb2RlKT8zMjpfdC5pc0RpcihlLm1vZGUpJiYoInIiIT09X3QuZmxhZ3NUb1Blcm1pc3Npb25TdHJpbmcodCl8fDUxMiZ0KT8zMTpfdC5ub2RlUGVybWlzc2lvbnMoZSxfdC5mbGFnc1RvUGVybWlzc2lvblN0cmluZyh0KSk6NDQsTUFYX09QRU5fRkRTOjQwOTYsbmV4dGZkOihlPTAsdD1fdC5NQVhfT1BFTl9GRFMpPT57Zm9yKHZhciByPWU7cjw9dDtyKyspaWYoIV90LnN0cmVhbXNbcl0pcmV0dXJuIHI7dGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMzMpfSxnZXRTdHJlYW06ZT0+X3Quc3RyZWFtc1tlXSxjcmVhdGVTdHJlYW06KGUsdCxyKT0+e190LkZTU3RyZWFtfHwoX3QuRlNTdHJlYW09ZnVuY3Rpb24oKXt0aGlzLnNoYXJlZD17fX0sX3QuRlNTdHJlYW0ucHJvdG90eXBlPXt9LE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKF90LkZTU3RyZWFtLnByb3RvdHlwZSx7b2JqZWN0OntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5ub2RlfSxzZXQ6ZnVuY3Rpb24oZSl7dGhpcy5ub2RlPWV9fSxpc1JlYWQ6e2dldDpmdW5jdGlvbigpe3JldHVybiAxIT0oMjA5NzE1NSZ0aGlzLmZsYWdzKX19LGlzV3JpdGU6e2dldDpmdW5jdGlvbigpe3JldHVybiEhKDIwOTcxNTUmdGhpcy5mbGFncyl9fSxpc0FwcGVuZDp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDEwMjQmdGhpcy5mbGFnc319LGZsYWdzOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zaGFyZWQuZmxhZ3N9LHNldDpmdW5jdGlvbihlKXt0aGlzLnNoYXJlZC5mbGFncz1lfX0scG9zaXRpb246e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNoYXJlZC5wb3NpdGlvbn0sc2V0OmZ1bmN0aW9uKGUpe3RoaXMuc2hhcmVkLnBvc2l0aW9uPWV9fX0pKSxlPU9iamVjdC5hc3NpZ24obmV3IF90LkZTU3RyZWFtLGUpO3ZhciBuPV90Lm5leHRmZCh0LHIpO3JldHVybiBlLmZkPW4sX3Quc3RyZWFtc1tuXT1lLGV9LGNsb3NlU3RyZWFtOmU9PntfdC5zdHJlYW1zW2VdPW51bGx9LGNocmRldl9zdHJlYW1fb3BzOntvcGVuOmU9Pnt2YXIgdD1fdC5nZXREZXZpY2UoZS5ub2RlLnJkZXYpO2Uuc3RyZWFtX29wcz10LnN0cmVhbV9vcHMsZS5zdHJlYW1fb3BzLm9wZW4mJmUuc3RyZWFtX29wcy5vcGVuKGUpfSxsbHNlZWs6KCk9Pnt0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig3MCl9fSxtYWpvcjplPT5lPj44LG1pbm9yOmU9PjI1NSZlLG1ha2VkZXY6KGUsdCk9PmU8PDh8dCxyZWdpc3RlckRldmljZTooZSx0KT0+e190LmRldmljZXNbZV09e3N0cmVhbV9vcHM6dH19LGdldERldmljZTplPT5fdC5kZXZpY2VzW2VdLGdldE1vdW50czplPT57Zm9yKHZhciB0PVtdLHI9W2VdO3IubGVuZ3RoOyl7dmFyIG49ci5wb3AoKTt0LnB1c2gobiksci5wdXNoLmFwcGx5KHIsbi5tb3VudHMpfXJldHVybiB0fSxzeW5jZnM6KGUsdCk9PnsiZnVuY3Rpb24iPT10eXBlb2YgZSYmKHQ9ZSxlPSExKSxfdC5zeW5jRlNSZXF1ZXN0cysrLF90LnN5bmNGU1JlcXVlc3RzPjEmJmQoIndhcm5pbmc6ICIrX3Quc3luY0ZTUmVxdWVzdHMrIiBGUy5zeW5jZnMgb3BlcmF0aW9ucyBpbiBmbGlnaHQgYXQgb25jZSwgcHJvYmFibHkganVzdCBkb2luZyBleHRyYSB3b3JrIik7dmFyIHI9X3QuZ2V0TW91bnRzKF90LnJvb3QubW91bnQpLG49MDtmdW5jdGlvbiBvKGUpe3JldHVybiBfdC5zeW5jRlNSZXF1ZXN0cy0tLHQoZSl9ZnVuY3Rpb24gYShlKXtpZihlKXJldHVybiBhLmVycm9yZWQ/dm9pZCAwOihhLmVycm9yZWQ9ITAsbyhlKSk7KytuPj1yLmxlbmd0aCYmbyhudWxsKX1yLmZvckVhY2goKHQ9PntpZighdC50eXBlLnN5bmNmcylyZXR1cm4gYShudWxsKTt0LnR5cGUuc3luY2ZzKHQsZSxhKX0pKX0sbW91bnQ6KGUsdCxyKT0+e3ZhciBuLG89Ii8iPT09cixhPSFyO2lmKG8mJl90LnJvb3QpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMTApO2lmKCFvJiYhYSl7dmFyIGk9X3QubG9va3VwUGF0aChyLHtmb2xsb3dfbW91bnQ6ITF9KTtpZihyPWkucGF0aCxuPWkubm9kZSxfdC5pc01vdW50cG9pbnQobikpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMTApO2lmKCFfdC5pc0RpcihuLm1vZGUpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDU0KX12YXIgcz17dHlwZTplLG9wdHM6dCxtb3VudHBvaW50OnIsbW91bnRzOltdfSx1PWUubW91bnQocyk7cmV0dXJuIHUubW91bnQ9cyxzLnJvb3Q9dSxvP190LnJvb3Q9dTpuJiYobi5tb3VudGVkPXMsbi5tb3VudCYmbi5tb3VudC5tb3VudHMucHVzaChzKSksdX0sdW5tb3VudDplPT57dmFyIHQ9X3QubG9va3VwUGF0aChlLHtmb2xsb3dfbW91bnQ6ITF9KTtpZighX3QuaXNNb3VudHBvaW50KHQubm9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMjgpO3ZhciByPXQubm9kZSxuPXIubW91bnRlZCxvPV90LmdldE1vdW50cyhuKTtPYmplY3Qua2V5cyhfdC5uYW1lVGFibGUpLmZvckVhY2goKGU9Pntmb3IodmFyIHQ9X3QubmFtZVRhYmxlW2VdO3Q7KXt2YXIgcj10Lm5hbWVfbmV4dDtvLmluY2x1ZGVzKHQubW91bnQpJiZfdC5kZXN0cm95Tm9kZSh0KSx0PXJ9fSkpLHIubW91bnRlZD1udWxsO3ZhciBhPXIubW91bnQubW91bnRzLmluZGV4T2Yobik7ci5tb3VudC5tb3VudHMuc3BsaWNlKGEsMSl9LGxvb2t1cDooZSx0KT0+ZS5ub2RlX29wcy5sb29rdXAoZSx0KSxta25vZDooZSx0LHIpPT57dmFyIG49X3QubG9va3VwUGF0aChlLHtwYXJlbnQ6ITB9KS5ub2RlLG89bXQuYmFzZW5hbWUoZSk7aWYoIW98fCIuIj09PW98fCIuLiI9PT1vKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDI4KTt2YXIgYT1fdC5tYXlDcmVhdGUobixvKTtpZihhKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKGEpO2lmKCFuLm5vZGVfb3BzLm1rbm9kKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDYzKTtyZXR1cm4gbi5ub2RlX29wcy5ta25vZChuLG8sdCxyKX0sY3JlYXRlOihlLHQpPT4odD12b2lkIDAhPT10P3Q6NDM4LHQmPTQwOTUsdHw9MzI3NjgsX3QubWtub2QoZSx0LDApKSxta2RpcjooZSx0KT0+KHQ9dm9pZCAwIT09dD90OjUxMSx0Jj0xMDIzLHR8PTE2Mzg0LF90Lm1rbm9kKGUsdCwwKSksbWtkaXJUcmVlOihlLHQpPT57Zm9yKHZhciByPWUuc3BsaXQoIi8iKSxuPSIiLG89MDtvPHIubGVuZ3RoOysrbylpZihyW29dKXtuKz0iLyIrcltvXTt0cnl7X3QubWtkaXIobix0KX1jYXRjaChlKXtpZigyMCE9ZS5lcnJubyl0aHJvdyBlfX19LG1rZGV2OihlLHQscik9Pih2b2lkIDA9PT1yJiYocj10LHQ9NDM4KSx0fD04MTkyLF90Lm1rbm9kKGUsdCxyKSksc3ltbGluazooZSx0KT0+e2lmKCF2dC5yZXNvbHZlKGUpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDQ0KTt2YXIgcj1fdC5sb29rdXBQYXRoKHQse3BhcmVudDohMH0pLm5vZGU7aWYoIXIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDQpO3ZhciBuPW10LmJhc2VuYW1lKHQpLG89X3QubWF5Q3JlYXRlKHIsbik7aWYobyl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcihvKTtpZighci5ub2RlX29wcy5zeW1saW5rKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDYzKTtyZXR1cm4gci5ub2RlX29wcy5zeW1saW5rKHIsbixlKX0scmVuYW1lOihlLHQpPT57dmFyIHIsbixvPW10LmRpcm5hbWUoZSksYT1tdC5kaXJuYW1lKHQpLGk9bXQuYmFzZW5hbWUoZSkscz1tdC5iYXNlbmFtZSh0KTtpZihyPV90Lmxvb2t1cFBhdGgoZSx7cGFyZW50OiEwfSkubm9kZSxuPV90Lmxvb2t1cFBhdGgodCx7cGFyZW50OiEwfSkubm9kZSwhcnx8IW4pdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDQpO2lmKHIubW91bnQhPT1uLm1vdW50KXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDc1KTt2YXIgdSxjPV90Lmxvb2t1cE5vZGUocixpKSxsPXZ0LnJlbGF0aXZlKGUsYSk7aWYoIi4iIT09bC5jaGFyQXQoMCkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMjgpO2lmKCIuIiE9PShsPXZ0LnJlbGF0aXZlKHQsbykpLmNoYXJBdCgwKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig1NSk7dHJ5e3U9X3QubG9va3VwTm9kZShuLHMpfWNhdGNoKGUpe31pZihjIT09dSl7dmFyIGQ9X3QuaXNEaXIoYy5tb2RlKSxmPV90Lm1heURlbGV0ZShyLGksZCk7aWYoZil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcihmKTtpZihmPXU/X3QubWF5RGVsZXRlKG4scyxkKTpfdC5tYXlDcmVhdGUobixzKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcihmKTtpZighci5ub2RlX29wcy5yZW5hbWUpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjMpO2lmKF90LmlzTW91bnRwb2ludChjKXx8dSYmX3QuaXNNb3VudHBvaW50KHUpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDEwKTtpZihuIT09ciYmKGY9X3Qubm9kZVBlcm1pc3Npb25zKHIsInciKSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoZik7X3QuaGFzaFJlbW92ZU5vZGUoYyk7dHJ5e3Iubm9kZV9vcHMucmVuYW1lKGMsbixzKX1jYXRjaChlKXt0aHJvdyBlfWZpbmFsbHl7X3QuaGFzaEFkZE5vZGUoYyl9fX0scm1kaXI6ZT0+e3ZhciB0PV90Lmxvb2t1cFBhdGgoZSx7cGFyZW50OiEwfSkubm9kZSxyPW10LmJhc2VuYW1lKGUpLG49X3QubG9va3VwTm9kZSh0LHIpLG89X3QubWF5RGVsZXRlKHQsciwhMCk7aWYobyl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcihvKTtpZighdC5ub2RlX29wcy5ybWRpcil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig2Myk7aWYoX3QuaXNNb3VudHBvaW50KG4pKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDEwKTt0Lm5vZGVfb3BzLnJtZGlyKHQsciksX3QuZGVzdHJveU5vZGUobil9LHJlYWRkaXI6ZT0+e3ZhciB0PV90Lmxvb2t1cFBhdGgoZSx7Zm9sbG93OiEwfSkubm9kZTtpZighdC5ub2RlX29wcy5yZWFkZGlyKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDU0KTtyZXR1cm4gdC5ub2RlX29wcy5yZWFkZGlyKHQpfSx1bmxpbms6ZT0+e3ZhciB0PV90Lmxvb2t1cFBhdGgoZSx7cGFyZW50OiEwfSkubm9kZTtpZighdCl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0NCk7dmFyIHI9bXQuYmFzZW5hbWUoZSksbj1fdC5sb29rdXBOb2RlKHQsciksbz1fdC5tYXlEZWxldGUodCxyLCExKTtpZihvKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKG8pO2lmKCF0Lm5vZGVfb3BzLnVubGluayl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig2Myk7aWYoX3QuaXNNb3VudHBvaW50KG4pKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDEwKTt0Lm5vZGVfb3BzLnVubGluayh0LHIpLF90LmRlc3Ryb3lOb2RlKG4pfSxyZWFkbGluazplPT57dmFyIHQ9X3QubG9va3VwUGF0aChlKS5ub2RlO2lmKCF0KXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDQ0KTtpZighdC5ub2RlX29wcy5yZWFkbGluayl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7cmV0dXJuIHZ0LnJlc29sdmUoX3QuZ2V0UGF0aCh0LnBhcmVudCksdC5ub2RlX29wcy5yZWFkbGluayh0KSl9LHN0YXQ6KGUsdCk9Pnt2YXIgcj1fdC5sb29rdXBQYXRoKGUse2ZvbGxvdzohdH0pLm5vZGU7aWYoIXIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDQpO2lmKCFyLm5vZGVfb3BzLmdldGF0dHIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjMpO3JldHVybiByLm5vZGVfb3BzLmdldGF0dHIocil9LGxzdGF0OmU9Pl90LnN0YXQoZSwhMCksY2htb2Q6KGUsdCxyKT0+e3ZhciBuO2lmKCEobj0ic3RyaW5nIj09dHlwZW9mIGU/X3QubG9va3VwUGF0aChlLHtmb2xsb3c6IXJ9KS5ub2RlOmUpLm5vZGVfb3BzLnNldGF0dHIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjMpO24ubm9kZV9vcHMuc2V0YXR0cihuLHttb2RlOjQwOTUmdHwtNDA5NiZuLm1vZGUsdGltZXN0YW1wOkRhdGUubm93KCl9KX0sbGNobW9kOihlLHQpPT57X3QuY2htb2QoZSx0LCEwKX0sZmNobW9kOihlLHQpPT57dmFyIHI9X3QuZ2V0U3RyZWFtKGUpO2lmKCFyKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDgpO190LmNobW9kKHIubm9kZSx0KX0sY2hvd246KGUsdCxyLG4pPT57dmFyIG87aWYoIShvPSJzdHJpbmciPT10eXBlb2YgZT9fdC5sb29rdXBQYXRoKGUse2ZvbGxvdzohbn0pLm5vZGU6ZSkubm9kZV9vcHMuc2V0YXR0cil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig2Myk7by5ub2RlX29wcy5zZXRhdHRyKG8se3RpbWVzdGFtcDpEYXRlLm5vdygpfSl9LGxjaG93bjooZSx0LHIpPT57X3QuY2hvd24oZSx0LHIsITApfSxmY2hvd246KGUsdCxyKT0+e3ZhciBuPV90LmdldFN0cmVhbShlKTtpZighbil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig4KTtfdC5jaG93bihuLm5vZGUsdCxyKX0sdHJ1bmNhdGU6KGUsdCk9PntpZih0PDApdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMjgpO3ZhciByO2lmKCEocj0ic3RyaW5nIj09dHlwZW9mIGU/X3QubG9va3VwUGF0aChlLHtmb2xsb3c6ITB9KS5ub2RlOmUpLm5vZGVfb3BzLnNldGF0dHIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNjMpO2lmKF90LmlzRGlyKHIubW9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMzEpO2lmKCFfdC5pc0ZpbGUoci5tb2RlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7dmFyIG49X3Qubm9kZVBlcm1pc3Npb25zKHIsInciKTtpZihuKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKG4pO3Iubm9kZV9vcHMuc2V0YXR0cihyLHtzaXplOnQsdGltZXN0YW1wOkRhdGUubm93KCl9KX0sZnRydW5jYXRlOihlLHQpPT57dmFyIHI9X3QuZ2V0U3RyZWFtKGUpO2lmKCFyKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDgpO2lmKCEoMjA5NzE1NSZyLmZsYWdzKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7X3QudHJ1bmNhdGUoci5ub2RlLHQpfSx1dGltZTooZSx0LHIpPT57dmFyIG49X3QubG9va3VwUGF0aChlLHtmb2xsb3c6ITB9KS5ub2RlO24ubm9kZV9vcHMuc2V0YXR0cihuLHt0aW1lc3RhbXA6TWF0aC5tYXgodCxyKX0pfSxvcGVuOih0LHIsbik9PntpZigiIj09PXQpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDQpO3ZhciBvO2lmKG49dm9pZCAwPT09bj80Mzg6bixuPTY0JihyPSJzdHJpbmciPT10eXBlb2Ygcj9fdC5tb2RlU3RyaW5nVG9GbGFncyhyKTpyKT80MDk1Jm58MzI3Njg6MCwib2JqZWN0Ij09dHlwZW9mIHQpbz10O2Vsc2V7dD1tdC5ub3JtYWxpemUodCk7dHJ5e289X3QubG9va3VwUGF0aCh0LHtmb2xsb3c6ISgxMzEwNzImcil9KS5ub2RlfWNhdGNoKGUpe319dmFyIGE9ITE7aWYoNjQmcilpZihvKXtpZigxMjgmcil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyMCl9ZWxzZSBvPV90Lm1rbm9kKHQsbiwwKSxhPSEwO2lmKCFvKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDQ0KTtpZihfdC5pc0NocmRldihvLm1vZGUpJiYociY9LTUxMyksNjU1MzYmciYmIV90LmlzRGlyKG8ubW9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNTQpO2lmKCFhKXt2YXIgaT1fdC5tYXlPcGVuKG8scik7aWYoaSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcihpKX01MTImciYmIWEmJl90LnRydW5jYXRlKG8sMCksciY9LTEzMTcxMzt2YXIgcz1fdC5jcmVhdGVTdHJlYW0oe25vZGU6byxwYXRoOl90LmdldFBhdGgobyksZmxhZ3M6cixzZWVrYWJsZTohMCxwb3NpdGlvbjowLHN0cmVhbV9vcHM6by5zdHJlYW1fb3BzLHVuZ290dGVuOltdLGVycm9yOiExfSk7cmV0dXJuIHMuc3RyZWFtX29wcy5vcGVuJiZzLnN0cmVhbV9vcHMub3BlbihzKSwhZS5sb2dSZWFkRmlsZXN8fDEmcnx8KF90LnJlYWRGaWxlc3x8KF90LnJlYWRGaWxlcz17fSksdCBpbiBfdC5yZWFkRmlsZXN8fChfdC5yZWFkRmlsZXNbdF09MSkpLHN9LGNsb3NlOmU9PntpZihfdC5pc0Nsb3NlZChlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig4KTtlLmdldGRlbnRzJiYoZS5nZXRkZW50cz1udWxsKTt0cnl7ZS5zdHJlYW1fb3BzLmNsb3NlJiZlLnN0cmVhbV9vcHMuY2xvc2UoZSl9Y2F0Y2goZSl7dGhyb3cgZX1maW5hbGx5e190LmNsb3NlU3RyZWFtKGUuZmQpfWUuZmQ9bnVsbH0saXNDbG9zZWQ6ZT0+bnVsbD09PWUuZmQsbGxzZWVrOihlLHQscik9PntpZihfdC5pc0Nsb3NlZChlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig4KTtpZighZS5zZWVrYWJsZXx8IWUuc3RyZWFtX29wcy5sbHNlZWspdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNzApO2lmKDAhPXImJjEhPXImJjIhPXIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMjgpO3JldHVybiBlLnBvc2l0aW9uPWUuc3RyZWFtX29wcy5sbHNlZWsoZSx0LHIpLGUudW5nb3R0ZW49W10sZS5wb3NpdGlvbn0scmVhZDooZSx0LHIsbixvKT0+e2lmKG48MHx8bzwwKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDI4KTtpZihfdC5pc0Nsb3NlZChlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig4KTtpZigxPT0oMjA5NzE1NSZlLmZsYWdzKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig4KTtpZihfdC5pc0RpcihlLm5vZGUubW9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMzEpO2lmKCFlLnN0cmVhbV9vcHMucmVhZCl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7dmFyIGE9dm9pZCAwIT09bztpZihhKXtpZighZS5zZWVrYWJsZSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig3MCl9ZWxzZSBvPWUucG9zaXRpb247dmFyIGk9ZS5zdHJlYW1fb3BzLnJlYWQoZSx0LHIsbixvKTtyZXR1cm4gYXx8KGUucG9zaXRpb24rPWkpLGl9LHdyaXRlOihlLHQscixuLG8sYSk9PntpZihuPDB8fG88MCl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7aWYoX3QuaXNDbG9zZWQoZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoOCk7aWYoISgyMDk3MTU1JmUuZmxhZ3MpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDgpO2lmKF90LmlzRGlyKGUubm9kZS5tb2RlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigzMSk7aWYoIWUuc3RyZWFtX29wcy53cml0ZSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOCk7ZS5zZWVrYWJsZSYmMTAyNCZlLmZsYWdzJiZfdC5sbHNlZWsoZSwwLDIpO3ZhciBpPXZvaWQgMCE9PW87aWYoaSl7aWYoIWUuc2Vla2FibGUpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNzApfWVsc2Ugbz1lLnBvc2l0aW9uO3ZhciBzPWUuc3RyZWFtX29wcy53cml0ZShlLHQscixuLG8sYSk7cmV0dXJuIGl8fChlLnBvc2l0aW9uKz1zKSxzfSxhbGxvY2F0ZTooZSx0LHIpPT57aWYoX3QuaXNDbG9zZWQoZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoOCk7aWYodDwwfHxyPD0wKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDI4KTtpZighKDIwOTcxNTUmZS5mbGFncykpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoOCk7aWYoIV90LmlzRmlsZShlLm5vZGUubW9kZSkmJiFfdC5pc0RpcihlLm5vZGUubW9kZSkpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoNDMpO2lmKCFlLnN0cmVhbV9vcHMuYWxsb2NhdGUpdGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMTM4KTtlLnN0cmVhbV9vcHMuYWxsb2NhdGUoZSx0LHIpfSxtbWFwOihlLHQscixuLG8pPT57aWYoMiZuJiYhKDImbykmJjIhPSgyMDk3MTU1JmUuZmxhZ3MpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDIpO2lmKDE9PSgyMDk3MTU1JmUuZmxhZ3MpKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDIpO2lmKCFlLnN0cmVhbV9vcHMubW1hcCl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0Myk7cmV0dXJuIGUuc3RyZWFtX29wcy5tbWFwKGUsdCxyLG4sbyl9LG1zeW5jOihlLHQscixuLG8pPT5lLnN0cmVhbV9vcHMubXN5bmM/ZS5zdHJlYW1fb3BzLm1zeW5jKGUsdCxyLG4sbyk6MCxtdW5tYXA6ZT0+MCxpb2N0bDooZSx0LHIpPT57aWYoIWUuc3RyZWFtX29wcy5pb2N0bCl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig1OSk7cmV0dXJuIGUuc3RyZWFtX29wcy5pb2N0bChlLHQscil9LHJlYWRGaWxlOihlLHQ9e30pPT57aWYodC5mbGFncz10LmZsYWdzfHwwLHQuZW5jb2Rpbmc9dC5lbmNvZGluZ3x8ImJpbmFyeSIsInV0ZjgiIT09dC5lbmNvZGluZyYmImJpbmFyeSIhPT10LmVuY29kaW5nKXRocm93IG5ldyBFcnJvcignSW52YWxpZCBlbmNvZGluZyB0eXBlICInK3QuZW5jb2RpbmcrJyInKTt2YXIgcixuPV90Lm9wZW4oZSx0LmZsYWdzKSxvPV90LnN0YXQoZSkuc2l6ZSxhPW5ldyBVaW50OEFycmF5KG8pO3JldHVybiBfdC5yZWFkKG4sYSwwLG8sMCksInV0ZjgiPT09dC5lbmNvZGluZz9yPVQoYSwwKToiYmluYXJ5Ij09PXQuZW5jb2RpbmcmJihyPWEpLF90LmNsb3NlKG4pLHJ9LHdyaXRlRmlsZTooZSx0LHI9e30pPT57ci5mbGFncz1yLmZsYWdzfHw1Nzc7dmFyIG49X3Qub3BlbihlLHIuZmxhZ3Msci5tb2RlKTtpZigic3RyaW5nIj09dHlwZW9mIHQpe3ZhciBvPW5ldyBVaW50OEFycmF5KEModCkrMSksYT1EKHQsbywwLG8ubGVuZ3RoKTtfdC53cml0ZShuLG8sMCxhLHZvaWQgMCxyLmNhbk93bil9ZWxzZXtpZighQXJyYXlCdWZmZXIuaXNWaWV3KHQpKXRocm93IG5ldyBFcnJvcigiVW5zdXBwb3J0ZWQgZGF0YSB0eXBlIik7X3Qud3JpdGUobix0LDAsdC5ieXRlTGVuZ3RoLHZvaWQgMCxyLmNhbk93bil9X3QuY2xvc2Uobil9LGN3ZDooKT0+X3QuY3VycmVudFBhdGgsY2hkaXI6ZT0+e3ZhciB0PV90Lmxvb2t1cFBhdGgoZSx7Zm9sbG93OiEwfSk7aWYobnVsbD09PXQubm9kZSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0NCk7aWYoIV90LmlzRGlyKHQubm9kZS5tb2RlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig1NCk7dmFyIHI9X3Qubm9kZVBlcm1pc3Npb25zKHQubm9kZSwieCIpO2lmKHIpdGhyb3cgbmV3IF90LkVycm5vRXJyb3Iocik7X3QuY3VycmVudFBhdGg9dC5wYXRofSxjcmVhdGVEZWZhdWx0RGlyZWN0b3JpZXM6KCk9PntfdC5ta2RpcigiL3RtcCIpLF90Lm1rZGlyKCIvaG9tZSIpLF90Lm1rZGlyKCIvaG9tZS93ZWJfdXNlciIpfSxjcmVhdGVEZWZhdWx0RGV2aWNlczooKT0+e190Lm1rZGlyKCIvZGV2IiksX3QucmVnaXN0ZXJEZXZpY2UoX3QubWFrZWRldigxLDMpLHtyZWFkOigpPT4wLHdyaXRlOihlLHQscixuLG8pPT5ufSksX3QubWtkZXYoIi9kZXYvbnVsbCIsX3QubWFrZWRldigxLDMpKSxndC5yZWdpc3RlcihfdC5tYWtlZGV2KDUsMCksZ3QuZGVmYXVsdF90dHlfb3BzKSxndC5yZWdpc3RlcihfdC5tYWtlZGV2KDYsMCksZ3QuZGVmYXVsdF90dHkxX29wcyksX3QubWtkZXYoIi9kZXYvdHR5IixfdC5tYWtlZGV2KDUsMCkpLF90Lm1rZGV2KCIvZGV2L3R0eTEiLF90Lm1ha2VkZXYoNiwwKSk7dmFyIGU9ZnVuY3Rpb24oKXtpZigib2JqZWN0Ij09dHlwZW9mIGNyeXB0byYmImZ1bmN0aW9uIj09dHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpe3ZhciBlPW5ldyBVaW50OEFycmF5KDEpO3JldHVybigpPT4oY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhlKSxlWzBdKX1yZXR1cm4oKT0+TCgicmFuZG9tRGV2aWNlIil9KCk7X3QuY3JlYXRlRGV2aWNlKCIvZGV2IiwicmFuZG9tIixlKSxfdC5jcmVhdGVEZXZpY2UoIi9kZXYiLCJ1cmFuZG9tIixlKSxfdC5ta2RpcigiL2Rldi9zaG0iKSxfdC5ta2RpcigiL2Rldi9zaG0vdG1wIil9LGNyZWF0ZVNwZWNpYWxEaXJlY3RvcmllczooKT0+e190Lm1rZGlyKCIvcHJvYyIpO3ZhciBlPV90Lm1rZGlyKCIvcHJvYy9zZWxmIik7X3QubWtkaXIoIi9wcm9jL3NlbGYvZmQiKSxfdC5tb3VudCh7bW91bnQ6KCk9Pnt2YXIgdD1fdC5jcmVhdGVOb2RlKGUsImZkIiwxNjg5NSw3Myk7cmV0dXJuIHQubm9kZV9vcHM9e2xvb2t1cDooZSx0KT0+e3ZhciByPSt0LG49X3QuZ2V0U3RyZWFtKHIpO2lmKCFuKXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDgpO3ZhciBvPXtwYXJlbnQ6bnVsbCxtb3VudDp7bW91bnRwb2ludDoiZmFrZSJ9LG5vZGVfb3BzOntyZWFkbGluazooKT0+bi5wYXRofX07cmV0dXJuIG8ucGFyZW50PW8sb319LHR9fSx7fSwiL3Byb2Mvc2VsZi9mZCIpfSxjcmVhdGVTdGFuZGFyZFN0cmVhbXM6KCk9PntlLnN0ZGluP190LmNyZWF0ZURldmljZSgiL2RldiIsInN0ZGluIixlLnN0ZGluKTpfdC5zeW1saW5rKCIvZGV2L3R0eSIsIi9kZXYvc3RkaW4iKSxlLnN0ZG91dD9fdC5jcmVhdGVEZXZpY2UoIi9kZXYiLCJzdGRvdXQiLG51bGwsZS5zdGRvdXQpOl90LnN5bWxpbmsoIi9kZXYvdHR5IiwiL2Rldi9zdGRvdXQiKSxlLnN0ZGVycj9fdC5jcmVhdGVEZXZpY2UoIi9kZXYiLCJzdGRlcnIiLG51bGwsZS5zdGRlcnIpOl90LnN5bWxpbmsoIi9kZXYvdHR5MSIsIi9kZXYvc3RkZXJyIiksX3Qub3BlbigiL2Rldi9zdGRpbiIsMCksX3Qub3BlbigiL2Rldi9zdGRvdXQiLDEpLF90Lm9wZW4oIi9kZXYvc3RkZXJyIiwxKX0sZW5zdXJlRXJybm9FcnJvcjooKT0+e190LkVycm5vRXJyb3J8fChfdC5FcnJub0Vycm9yPWZ1bmN0aW9uKGUsdCl7dGhpcy5ub2RlPXQsdGhpcy5zZXRFcnJubz1mdW5jdGlvbihlKXt0aGlzLmVycm5vPWV9LHRoaXMuc2V0RXJybm8oZSksdGhpcy5tZXNzYWdlPSJGUyBlcnJvciJ9LF90LkVycm5vRXJyb3IucHJvdG90eXBlPW5ldyBFcnJvcixfdC5FcnJub0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1fdC5FcnJub0Vycm9yLFs0NF0uZm9yRWFjaCgoZT0+e190LmdlbmVyaWNFcnJvcnNbZV09bmV3IF90LkVycm5vRXJyb3IoZSksX3QuZ2VuZXJpY0Vycm9yc1tlXS5zdGFjaz0iPGdlbmVyaWMgZXJyb3IsIG5vIHN0YWNrPiJ9KSkpfSxzdGF0aWNJbml0OigpPT57X3QuZW5zdXJlRXJybm9FcnJvcigpLF90Lm5hbWVUYWJsZT1uZXcgQXJyYXkoNDA5NiksX3QubW91bnQoRXQse30sIi8iKSxfdC5jcmVhdGVEZWZhdWx0RGlyZWN0b3JpZXMoKSxfdC5jcmVhdGVEZWZhdWx0RGV2aWNlcygpLF90LmNyZWF0ZVNwZWNpYWxEaXJlY3RvcmllcygpLF90LmZpbGVzeXN0ZW1zPXtNRU1GUzpFdH19LGluaXQ6KHQscixuKT0+e190LmluaXQuaW5pdGlhbGl6ZWQ9ITAsX3QuZW5zdXJlRXJybm9FcnJvcigpLGUuc3RkaW49dHx8ZS5zdGRpbixlLnN0ZG91dD1yfHxlLnN0ZG91dCxlLnN0ZGVycj1ufHxlLnN0ZGVycixfdC5jcmVhdGVTdGFuZGFyZFN0cmVhbXMoKX0scXVpdDooKT0+e190LmluaXQuaW5pdGlhbGl6ZWQ9ITE7Zm9yKHZhciBlPTA7ZTxfdC5zdHJlYW1zLmxlbmd0aDtlKyspe3ZhciB0PV90LnN0cmVhbXNbZV07dCYmX3QuY2xvc2UodCl9fSxnZXRNb2RlOihlLHQpPT57dmFyIHI9MDtyZXR1cm4gZSYmKHJ8PTM2NSksdCYmKHJ8PTE0Nikscn0sZmluZE9iamVjdDooZSx0KT0+e3ZhciByPV90LmFuYWx5emVQYXRoKGUsdCk7cmV0dXJuIHIuZXhpc3RzP3Iub2JqZWN0Om51bGx9LGFuYWx5emVQYXRoOihlLHQpPT57dHJ5e2U9KG49X3QubG9va3VwUGF0aChlLHtmb2xsb3c6IXR9KSkucGF0aH1jYXRjaChlKXt9dmFyIHI9e2lzUm9vdDohMSxleGlzdHM6ITEsZXJyb3I6MCxuYW1lOm51bGwscGF0aDpudWxsLG9iamVjdDpudWxsLHBhcmVudEV4aXN0czohMSxwYXJlbnRQYXRoOm51bGwscGFyZW50T2JqZWN0Om51bGx9O3RyeXt2YXIgbj1fdC5sb29rdXBQYXRoKGUse3BhcmVudDohMH0pO3IucGFyZW50RXhpc3RzPSEwLHIucGFyZW50UGF0aD1uLnBhdGgsci5wYXJlbnRPYmplY3Q9bi5ub2RlLHIubmFtZT1tdC5iYXNlbmFtZShlKSxuPV90Lmxvb2t1cFBhdGgoZSx7Zm9sbG93OiF0fSksci5leGlzdHM9ITAsci5wYXRoPW4ucGF0aCxyLm9iamVjdD1uLm5vZGUsci5uYW1lPW4ubm9kZS5uYW1lLHIuaXNSb290PSIvIj09PW4ucGF0aH1jYXRjaChlKXtyLmVycm9yPWUuZXJybm99cmV0dXJuIHJ9LGNyZWF0ZVBhdGg6KGUsdCxyLG4pPT57ZT0ic3RyaW5nIj09dHlwZW9mIGU/ZTpfdC5nZXRQYXRoKGUpO2Zvcih2YXIgbz10LnNwbGl0KCIvIikucmV2ZXJzZSgpO28ubGVuZ3RoOyl7dmFyIGE9by5wb3AoKTtpZihhKXt2YXIgaT1tdC5qb2luMihlLGEpO3RyeXtfdC5ta2RpcihpKX1jYXRjaChlKXt9ZT1pfX1yZXR1cm4gaX0sY3JlYXRlRmlsZTooZSx0LHIsbixvKT0+e3ZhciBhPW10LmpvaW4yKCJzdHJpbmciPT10eXBlb2YgZT9lOl90LmdldFBhdGgoZSksdCksaT1fdC5nZXRNb2RlKG4sbyk7cmV0dXJuIF90LmNyZWF0ZShhLGkpfSxjcmVhdGVEYXRhRmlsZTooZSx0LHIsbixvLGEpPT57dmFyIGk9dDtlJiYoZT0ic3RyaW5nIj09dHlwZW9mIGU/ZTpfdC5nZXRQYXRoKGUpLGk9dD9tdC5qb2luMihlLHQpOmUpO3ZhciBzPV90LmdldE1vZGUobixvKSx1PV90LmNyZWF0ZShpLHMpO2lmKHIpe2lmKCJzdHJpbmciPT10eXBlb2Ygcil7Zm9yKHZhciBjPW5ldyBBcnJheShyLmxlbmd0aCksbD0wLGQ9ci5sZW5ndGg7bDxkOysrbCljW2xdPXIuY2hhckNvZGVBdChsKTtyPWN9X3QuY2htb2QodSwxNDZ8cyk7dmFyIGY9X3Qub3Blbih1LDU3Nyk7X3Qud3JpdGUoZixyLDAsci5sZW5ndGgsMCxhKSxfdC5jbG9zZShmKSxfdC5jaG1vZCh1LHMpfXJldHVybiB1fSxjcmVhdGVEZXZpY2U6KGUsdCxyLG4pPT57dmFyIG89bXQuam9pbjIoInN0cmluZyI9PXR5cGVvZiBlP2U6X3QuZ2V0UGF0aChlKSx0KSxhPV90LmdldE1vZGUoISFyLCEhbik7X3QuY3JlYXRlRGV2aWNlLm1ham9yfHwoX3QuY3JlYXRlRGV2aWNlLm1ham9yPTY0KTt2YXIgaT1fdC5tYWtlZGV2KF90LmNyZWF0ZURldmljZS5tYWpvcisrLDApO3JldHVybiBfdC5yZWdpc3RlckRldmljZShpLHtvcGVuOmU9PntlLnNlZWthYmxlPSExfSxjbG9zZTplPT57biYmbi5idWZmZXImJm4uYnVmZmVyLmxlbmd0aCYmbigxMCl9LHJlYWQ6KGUsdCxuLG8sYSk9Pntmb3IodmFyIGk9MCxzPTA7czxvO3MrKyl7dmFyIHU7dHJ5e3U9cigpfWNhdGNoKGUpe3Rocm93IG5ldyBfdC5FcnJub0Vycm9yKDI5KX1pZih2b2lkIDA9PT11JiYwPT09aSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig2KTtpZihudWxsPT11KWJyZWFrO2krKyx0W24rc109dX1yZXR1cm4gaSYmKGUubm9kZS50aW1lc3RhbXA9RGF0ZS5ub3coKSksaX0sd3JpdGU6KGUsdCxyLG8sYSk9Pntmb3IodmFyIGk9MDtpPG87aSsrKXRyeXtuKHRbcitpXSl9Y2F0Y2goZSl7dGhyb3cgbmV3IF90LkVycm5vRXJyb3IoMjkpfXJldHVybiBvJiYoZS5ub2RlLnRpbWVzdGFtcD1EYXRlLm5vdygpKSxpfX0pLF90Lm1rZGV2KG8sYSxpKX0sZm9yY2VMb2FkRmlsZTplPT57aWYoZS5pc0RldmljZXx8ZS5pc0ZvbGRlcnx8ZS5saW5rfHxlLmNvbnRlbnRzKXJldHVybiEwO2lmKCJ1bmRlZmluZWQiIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QpdGhyb3cgbmV3IEVycm9yKCJMYXp5IGxvYWRpbmcgc2hvdWxkIGhhdmUgYmVlbiBwZXJmb3JtZWQgKGNvbnRlbnRzIHNldCkgaW4gY3JlYXRlTGF6eUZpbGUsIGJ1dCBpdCB3YXMgbm90LiBMYXp5IGxvYWRpbmcgb25seSB3b3JrcyBpbiB3ZWIgd29ya2Vycy4gVXNlIC0tZW1iZWQtZmlsZSBvciAtLXByZWxvYWQtZmlsZSBpbiBlbWNjIG9uIHRoZSBtYWluIHRocmVhZC4iKTtpZighbil0aHJvdyBuZXcgRXJyb3IoIkNhbm5vdCBsb2FkIHdpdGhvdXQgcmVhZCgpIG9yIFhNTEh0dHBSZXF1ZXN0LiIpO3RyeXtlLmNvbnRlbnRzPXl0KG4oZS51cmwpLCEwKSxlLnVzZWRCeXRlcz1lLmNvbnRlbnRzLmxlbmd0aH1jYXRjaChlKXt0aHJvdyBuZXcgX3QuRXJybm9FcnJvcigyOSl9fSxjcmVhdGVMYXp5RmlsZTooZSx0LHIsbixvKT0+e2Z1bmN0aW9uIGEoKXt0aGlzLmxlbmd0aEtub3duPSExLHRoaXMuY2h1bmtzPVtdfWlmKGEucHJvdG90eXBlLmdldD1mdW5jdGlvbihlKXtpZighKGU+dGhpcy5sZW5ndGgtMXx8ZTwwKSl7dmFyIHQ9ZSV0aGlzLmNodW5rU2l6ZSxyPWUvdGhpcy5jaHVua1NpemV8MDtyZXR1cm4gdGhpcy5nZXR0ZXIocilbdF19fSxhLnByb3RvdHlwZS5zZXREYXRhR2V0dGVyPWZ1bmN0aW9uKGUpe3RoaXMuZ2V0dGVyPWV9LGEucHJvdG90eXBlLmNhY2hlTGVuZ3RoPWZ1bmN0aW9uKCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2lmKGUub3BlbigiSEVBRCIsciwhMSksZS5zZW5kKG51bGwpLCEoZS5zdGF0dXM+PTIwMCYmZS5zdGF0dXM8MzAwfHwzMDQ9PT1lLnN0YXR1cykpdGhyb3cgbmV3IEVycm9yKCJDb3VsZG4ndCBsb2FkICIrcisiLiBTdGF0dXM6ICIrZS5zdGF0dXMpO3ZhciB0LG49TnVtYmVyKGUuZ2V0UmVzcG9uc2VIZWFkZXIoIkNvbnRlbnQtbGVuZ3RoIikpLG89KHQ9ZS5nZXRSZXNwb25zZUhlYWRlcigiQWNjZXB0LVJhbmdlcyIpKSYmImJ5dGVzIj09PXQsYT0odD1lLmdldFJlc3BvbnNlSGVhZGVyKCJDb250ZW50LUVuY29kaW5nIikpJiYiZ3ppcCI9PT10LGk9MTA0ODU3NjtvfHwoaT1uKTt2YXIgcz10aGlzO3Muc2V0RGF0YUdldHRlcigoZT0+e3ZhciB0PWUqaSxvPShlKzEpKmktMTtpZihvPU1hdGgubWluKG8sbi0xKSx2b2lkIDA9PT1zLmNodW5rc1tlXSYmKHMuY2h1bmtzW2VdPSgoZSx0KT0+e2lmKGU+dCl0aHJvdyBuZXcgRXJyb3IoImludmFsaWQgcmFuZ2UgKCIrZSsiLCAiK3QrIikgb3Igbm8gYnl0ZXMgcmVxdWVzdGVkISIpO2lmKHQ+bi0xKXRocm93IG5ldyBFcnJvcigib25seSAiK24rIiBieXRlcyBhdmFpbGFibGUhIHByb2dyYW1tZXIgZXJyb3IhIik7dmFyIG89bmV3IFhNTEh0dHBSZXF1ZXN0O2lmKG8ub3BlbigiR0VUIixyLCExKSxuIT09aSYmby5zZXRSZXF1ZXN0SGVhZGVyKCJSYW5nZSIsImJ5dGVzPSIrZSsiLSIrdCksby5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIixvLm92ZXJyaWRlTWltZVR5cGUmJm8ub3ZlcnJpZGVNaW1lVHlwZSgidGV4dC9wbGFpbjsgY2hhcnNldD14LXVzZXItZGVmaW5lZCIpLG8uc2VuZChudWxsKSwhKG8uc3RhdHVzPj0yMDAmJm8uc3RhdHVzPDMwMHx8MzA0PT09by5zdGF0dXMpKXRocm93IG5ldyBFcnJvcigiQ291bGRuJ3QgbG9hZCAiK3IrIi4gU3RhdHVzOiAiK28uc3RhdHVzKTtyZXR1cm4gdm9pZCAwIT09by5yZXNwb25zZT9uZXcgVWludDhBcnJheShvLnJlc3BvbnNlfHxbXSk6eXQoby5yZXNwb25zZVRleHR8fCIiLCEwKX0pKHQsbykpLHZvaWQgMD09PXMuY2h1bmtzW2VdKXRocm93IG5ldyBFcnJvcigiZG9YSFIgZmFpbGVkISIpO3JldHVybiBzLmNodW5rc1tlXX0pKSwhYSYmbnx8KGk9bj0xLG49dGhpcy5nZXR0ZXIoMCkubGVuZ3RoLGk9bixsKCJMYXp5RmlsZXMgb24gZ3ppcCBmb3JjZXMgZG93bmxvYWQgb2YgdGhlIHdob2xlIGZpbGUgd2hlbiBsZW5ndGggaXMgYWNjZXNzZWQiKSksdGhpcy5fbGVuZ3RoPW4sdGhpcy5fY2h1bmtTaXplPWksdGhpcy5sZW5ndGhLbm93bj0hMH0sInVuZGVmaW5lZCIhPXR5cGVvZiBYTUxIdHRwUmVxdWVzdCl0aHJvdyJDYW5ub3QgZG8gc3luY2hyb25vdXMgYmluYXJ5IFhIUnMgb3V0c2lkZSB3ZWJ3b3JrZXJzIGluIG1vZGVybiBicm93c2Vycy4gVXNlIC0tZW1iZWQtZmlsZSBvciAtLXByZWxvYWQtZmlsZSBpbiBlbWNjIjt2YXIgaT17aXNEZXZpY2U6ITEsdXJsOnJ9LHM9X3QuY3JlYXRlRmlsZShlLHQsaSxuLG8pO2kuY29udGVudHM/cy5jb250ZW50cz1pLmNvbnRlbnRzOmkudXJsJiYocy5jb250ZW50cz1udWxsLHMudXJsPWkudXJsKSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyhzLHt1c2VkQnl0ZXM6e2dldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbnRlbnRzLmxlbmd0aH19fSk7dmFyIHU9e307ZnVuY3Rpb24gYyhlLHQscixuLG8pe3ZhciBhPWUubm9kZS5jb250ZW50cztpZihvPj1hLmxlbmd0aClyZXR1cm4gMDt2YXIgaT1NYXRoLm1pbihhLmxlbmd0aC1vLG4pO2lmKGEuc2xpY2UpZm9yKHZhciBzPTA7czxpO3MrKyl0W3Irc109YVtvK3NdO2Vsc2UgZm9yKHM9MDtzPGk7cysrKXRbcitzXT1hLmdldChvK3MpO3JldHVybiBpfXJldHVybiBPYmplY3Qua2V5cyhzLnN0cmVhbV9vcHMpLmZvckVhY2goKGU9Pnt2YXIgdD1zLnN0cmVhbV9vcHNbZV07dVtlXT1mdW5jdGlvbigpe3JldHVybiBfdC5mb3JjZUxvYWRGaWxlKHMpLHQuYXBwbHkobnVsbCxhcmd1bWVudHMpfX0pKSx1LnJlYWQ9KGUsdCxyLG4sbyk9PihfdC5mb3JjZUxvYWRGaWxlKHMpLGMoZSx0LHIsbixvKSksdS5tbWFwPShlLHQscixuLG8pPT57X3QuZm9yY2VMb2FkRmlsZShzKTt2YXIgYT13dCh0KTtpZighYSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0OCk7cmV0dXJuIGMoZSx2LGEsdCxyKSx7cHRyOmEsYWxsb2NhdGVkOiEwfX0scy5zdHJlYW1fb3BzPXUsc30sY3JlYXRlUHJlbG9hZGVkRmlsZTooZSx0LHIsbixhLGkscyx1LGMsbCk9Pnt2YXIgZD10P3Z0LnJlc29sdmUobXQuam9pbjIoZSx0KSk6ZTtmdW5jdGlvbiBmKHIpe2Z1bmN0aW9uIG8ocil7bCYmbCgpLHV8fF90LmNyZWF0ZURhdGFGaWxlKGUsdCxyLG4sYSxjKSxpJiZpKCksVygpfUJyb3dzZXIuaGFuZGxlZEJ5UHJlbG9hZFBsdWdpbihyLGQsbywoKCk9PntzJiZzKCksVygpfSkpfHxvKHIpfUIoKSwic3RyaW5nIj09dHlwZW9mIHI/ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGE9ImFsICIrZTtvKGUsKHQ9PntoKHQsJ0xvYWRpbmcgZGF0YSBmaWxlICInK2UrJyIgZmFpbGVkIChubyBhcnJheUJ1ZmZlcikuJyksZihuZXcgVWludDhBcnJheSh0KSksYSYmVygpfSksKHQ9PntpZighcil0aHJvdydMb2FkaW5nIGRhdGEgZmlsZSAiJytlKyciIGZhaWxlZC4nO3IoKX0pKSxhJiZCKCl9KHIsMCxzKTpmKHIpfSxpbmRleGVkREI6KCk9PndpbmRvdy5pbmRleGVkREJ8fHdpbmRvdy5tb3pJbmRleGVkREJ8fHdpbmRvdy53ZWJraXRJbmRleGVkREJ8fHdpbmRvdy5tc0luZGV4ZWREQixEQl9OQU1FOigpPT4iRU1fRlNfIit3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsREJfVkVSU0lPTjoyMCxEQl9TVE9SRV9OQU1FOiJGSUxFX0RBVEEiLHNhdmVGaWxlc1RvREI6KGUsdCxyKT0+e3Q9dHx8KCgpPT57fSkscj1yfHwoKCk9Pnt9KTt2YXIgbj1fdC5pbmRleGVkREIoKTt0cnl7dmFyIG89bi5vcGVuKF90LkRCX05BTUUoKSxfdC5EQl9WRVJTSU9OKX1jYXRjaChlKXtyZXR1cm4gcihlKX1vLm9udXBncmFkZW5lZWRlZD0oKT0+e2woImNyZWF0aW5nIGRiIiksby5yZXN1bHQuY3JlYXRlT2JqZWN0U3RvcmUoX3QuREJfU1RPUkVfTkFNRSl9LG8ub25zdWNjZXNzPSgpPT57dmFyIG49by5yZXN1bHQudHJhbnNhY3Rpb24oW190LkRCX1NUT1JFX05BTUVdLCJyZWFkd3JpdGUiKSxhPW4ub2JqZWN0U3RvcmUoX3QuREJfU1RPUkVfTkFNRSksaT0wLHM9MCx1PWUubGVuZ3RoO2Z1bmN0aW9uIGMoKXswPT1zP3QoKTpyKCl9ZS5mb3JFYWNoKChlPT57dmFyIHQ9YS5wdXQoX3QuYW5hbHl6ZVBhdGgoZSkub2JqZWN0LmNvbnRlbnRzLGUpO3Qub25zdWNjZXNzPSgpPT57KytpK3M9PXUmJmMoKX0sdC5vbmVycm9yPSgpPT57cysrLGkrcz09dSYmYygpfX0pKSxuLm9uZXJyb3I9cn0sby5vbmVycm9yPXJ9LGxvYWRGaWxlc0Zyb21EQjooZSx0LHIpPT57dD10fHwoKCk9Pnt9KSxyPXJ8fCgoKT0+e30pO3ZhciBuPV90LmluZGV4ZWREQigpO3RyeXt2YXIgbz1uLm9wZW4oX3QuREJfTkFNRSgpLF90LkRCX1ZFUlNJT04pfWNhdGNoKGUpe3JldHVybiByKGUpfW8ub251cGdyYWRlbmVlZGVkPXIsby5vbnN1Y2Nlc3M9KCk9Pnt2YXIgbj1vLnJlc3VsdDt0cnl7dmFyIGE9bi50cmFuc2FjdGlvbihbX3QuREJfU1RPUkVfTkFNRV0sInJlYWRvbmx5Iil9Y2F0Y2goZSl7cmV0dXJuIHZvaWQgcihlKX12YXIgaT1hLm9iamVjdFN0b3JlKF90LkRCX1NUT1JFX05BTUUpLHM9MCx1PTAsYz1lLmxlbmd0aDtmdW5jdGlvbiBsKCl7MD09dT90KCk6cigpfWUuZm9yRWFjaCgoZT0+e3ZhciB0PWkuZ2V0KGUpO3Qub25zdWNjZXNzPSgpPT57X3QuYW5hbHl6ZVBhdGgoZSkuZXhpc3RzJiZfdC51bmxpbmsoZSksX3QuY3JlYXRlRGF0YUZpbGUobXQuZGlybmFtZShlKSxtdC5iYXNlbmFtZShlKSx0LnJlc3VsdCwhMCwhMCwhMCksKytzK3U9PWMmJmwoKX0sdC5vbmVycm9yPSgpPT57dSsrLHMrdT09YyYmbCgpfX0pKSxhLm9uZXJyb3I9cn0sby5vbmVycm9yPXJ9fSxidD17REVGQVVMVF9QT0xMTUFTSzo1LGNhbGN1bGF0ZUF0OmZ1bmN0aW9uKGUsdCxyKXtpZihtdC5pc0Ficyh0KSlyZXR1cm4gdDt2YXIgbjtpZihuPS0xMDA9PT1lP190LmN3ZCgpOmJ0LmdldFN0cmVhbUZyb21GRChlKS5wYXRoLDA9PXQubGVuZ3RoKXtpZighcil0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0NCk7cmV0dXJuIG59cmV0dXJuIG10LmpvaW4yKG4sdCl9LGRvU3RhdDpmdW5jdGlvbihlLHQscil7dHJ5e3ZhciBuPWUodCl9Y2F0Y2goZSl7aWYoZSYmZS5ub2RlJiZtdC5ub3JtYWxpemUodCkhPT1tdC5ub3JtYWxpemUoX3QuZ2V0UGF0aChlLm5vZGUpKSlyZXR1cm4tNTQ7dGhyb3cgZX1FW3I+PjJdPW4uZGV2LEVbcis4Pj4yXT1uLmlubyxFW3IrMTI+PjJdPW4ubW9kZSxfW3IrMTY+PjJdPW4ubmxpbmssRVtyKzIwPj4yXT1uLnVpZCxFW3IrMjQ+PjJdPW4uZ2lkLEVbcisyOD4+Ml09bi5yZGV2LHg9W24uc2l6ZT4+PjAsKCQ9bi5zaXplLCtNYXRoLmFicygkKT49MT8kPjA/KDB8TWF0aC5taW4oK01hdGguZmxvb3IoJC80Mjk0OTY3Mjk2KSw0Mjk0OTY3Mjk1KSk+Pj4wOn5+K01hdGguY2VpbCgoJC0rKH5+JD4+PjApKS80Mjk0OTY3Mjk2KT4+PjA6MCldLEVbcis0MD4+Ml09eFswXSxFW3IrNDQ+PjJdPXhbMV0sRVtyKzQ4Pj4yXT00MDk2LEVbcis1Mj4+Ml09bi5ibG9ja3M7dmFyIG89bi5hdGltZS5nZXRUaW1lKCksYT1uLm10aW1lLmdldFRpbWUoKSxpPW4uY3RpbWUuZ2V0VGltZSgpO3JldHVybiB4PVtNYXRoLmZsb29yKG8vMWUzKT4+PjAsKCQ9TWF0aC5mbG9vcihvLzFlMyksK01hdGguYWJzKCQpPj0xPyQ+MD8oMHxNYXRoLm1pbigrTWF0aC5mbG9vcigkLzQyOTQ5NjcyOTYpLDQyOTQ5NjcyOTUpKT4+PjA6fn4rTWF0aC5jZWlsKCgkLSsofn4kPj4+MCkpLzQyOTQ5NjcyOTYpPj4+MDowKV0sRVtyKzU2Pj4yXT14WzBdLEVbcis2MD4+Ml09eFsxXSxfW3IrNjQ+PjJdPW8lMWUzKjFlMyx4PVtNYXRoLmZsb29yKGEvMWUzKT4+PjAsKCQ9TWF0aC5mbG9vcihhLzFlMyksK01hdGguYWJzKCQpPj0xPyQ+MD8oMHxNYXRoLm1pbigrTWF0aC5mbG9vcigkLzQyOTQ5NjcyOTYpLDQyOTQ5NjcyOTUpKT4+PjA6fn4rTWF0aC5jZWlsKCgkLSsofn4kPj4+MCkpLzQyOTQ5NjcyOTYpPj4+MDowKV0sRVtyKzcyPj4yXT14WzBdLEVbcis3Nj4+Ml09eFsxXSxfW3IrODA+PjJdPWElMWUzKjFlMyx4PVtNYXRoLmZsb29yKGkvMWUzKT4+PjAsKCQ9TWF0aC5mbG9vcihpLzFlMyksK01hdGguYWJzKCQpPj0xPyQ+MD8oMHxNYXRoLm1pbigrTWF0aC5mbG9vcigkLzQyOTQ5NjcyOTYpLDQyOTQ5NjcyOTUpKT4+PjA6fn4rTWF0aC5jZWlsKCgkLSsofn4kPj4+MCkpLzQyOTQ5NjcyOTYpPj4+MDowKV0sRVtyKzg4Pj4yXT14WzBdLEVbcis5Mj4+Ml09eFsxXSxfW3IrOTY+PjJdPWklMWUzKjFlMyx4PVtuLmlubz4+PjAsKCQ9bi5pbm8sK01hdGguYWJzKCQpPj0xPyQ+MD8oMHxNYXRoLm1pbigrTWF0aC5mbG9vcigkLzQyOTQ5NjcyOTYpLDQyOTQ5NjcyOTUpKT4+PjA6fn4rTWF0aC5jZWlsKCgkLSsofn4kPj4+MCkpLzQyOTQ5NjcyOTYpPj4+MDowKV0sRVtyKzEwND4+Ml09eFswXSxFW3IrMTA4Pj4yXT14WzFdLDB9LGRvTXN5bmM6ZnVuY3Rpb24oZSx0LHIsbixvKXtpZighX3QuaXNGaWxlKHQubm9kZS5tb2RlKSl0aHJvdyBuZXcgX3QuRXJybm9FcnJvcig0Myk7aWYoMiZuKXJldHVybiAwO3ZhciBhPXkuc2xpY2UoZSxlK3IpO190Lm1zeW5jKHQsYSxvLHIsbil9LHZhcmFyZ3M6dm9pZCAwLGdldDpmdW5jdGlvbigpe3JldHVybiBidC52YXJhcmdzKz00LEVbYnQudmFyYXJncy00Pj4yXX0sZ2V0U3RyOmZ1bmN0aW9uKGUpe3JldHVybiBTKGUpfSxnZXRTdHJlYW1Gcm9tRkQ6ZnVuY3Rpb24oZSl7dmFyIHQ9X3QuZ2V0U3RyZWFtKGUpO2lmKCF0KXRocm93IG5ldyBfdC5FcnJub0Vycm9yKDgpO3JldHVybiB0fX07ZnVuY3Rpb24ga3QoZSl7cmV0dXJuIGUlND09MCYmKGUlMTAwIT0wfHxlJTQwMD09MCl9dmFyIFB0PVszMSwyOSwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV0sVHQ9WzMxLDI4LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXTt1ZT1lLkludGVybmFsRXJyb3I9c2UoRXJyb3IsIkludGVybmFsRXJyb3IiKSxmdW5jdGlvbigpe2Zvcih2YXIgZT1uZXcgQXJyYXkoMjU2KSx0PTA7dDwyNTY7Kyt0KWVbdF09U3RyaW5nLmZyb21DaGFyQ29kZSh0KTtmZT1lfSgpLGhlPWUuQmluZGluZ0Vycm9yPXNlKEVycm9yLCJCaW5kaW5nRXJyb3IiKSxGZS5wcm90b3R5cGUuaXNBbGlhc09mPWZ1bmN0aW9uKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIEZlKSlyZXR1cm4hMTtpZighKGUgaW5zdGFuY2VvZiBGZSkpcmV0dXJuITE7Zm9yKHZhciB0PXRoaXMuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3Mscj10aGlzLiQkLnB0cixuPWUuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3Msbz1lLiQkLnB0cjt0LmJhc2VDbGFzczspcj10LnVwY2FzdChyKSx0PXQuYmFzZUNsYXNzO2Zvcig7bi5iYXNlQ2xhc3M7KW89bi51cGNhc3Qobyksbj1uLmJhc2VDbGFzcztyZXR1cm4gdD09PW4mJnI9PT1vfSxGZS5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtpZih0aGlzLiQkLnB0cnx8eWUodGhpcyksdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSlyZXR1cm4gdGhpcy4kJC5jb3VudC52YWx1ZSs9MSx0aGlzO3ZhciBlLHQ9Q2UoT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykseyQkOnt2YWx1ZTooZT10aGlzLiQkLHtjb3VudDplLmNvdW50LGRlbGV0ZVNjaGVkdWxlZDplLmRlbGV0ZVNjaGVkdWxlZCxwcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZTplLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlLHB0cjplLnB0cixwdHJUeXBlOmUucHRyVHlwZSxzbWFydFB0cjplLnNtYXJ0UHRyLHNtYXJ0UHRyVHlwZTplLnNtYXJ0UHRyVHlwZX0pfX0pKTtyZXR1cm4gdC4kJC5jb3VudC52YWx1ZSs9MSx0LiQkLmRlbGV0ZVNjaGVkdWxlZD0hMSx0fSxGZS5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKCl7dGhpcy4kJC5wdHJ8fHllKHRoaXMpLHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkJiYhdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSYmbWUoIk9iamVjdCBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgZGVsZXRpb24iKSx3ZSh0aGlzKSxFZSh0aGlzLiQkKSx0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlfHwodGhpcy4kJC5zbWFydFB0cj12b2lkIDAsdGhpcy4kJC5wdHI9dm9pZCAwKX0sRmUucHJvdG90eXBlLmlzRGVsZXRlZD1mdW5jdGlvbigpe3JldHVybiF0aGlzLiQkLnB0cn0sRmUucHJvdG90eXBlLmRlbGV0ZUxhdGVyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJCQucHRyfHx5ZSh0aGlzKSx0aGlzLiQkLmRlbGV0ZVNjaGVkdWxlZCYmIXRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUmJm1lKCJPYmplY3QgYWxyZWFkeSBzY2hlZHVsZWQgZm9yIGRlbGV0aW9uIiksa2UucHVzaCh0aGlzKSwxPT09a2UubGVuZ3RoJiZUZSYmVGUoUGUpLHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkPSEwLHRoaXN9LGUuZ2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudD1mdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyhTZSkubGVuZ3RofSxlLmdldExpdmVJbmhlcml0ZWRJbnN0YW5jZXM9ZnVuY3Rpb24oKXt2YXIgZT1bXTtmb3IodmFyIHQgaW4gU2UpU2UuaGFzT3duUHJvcGVydHkodCkmJmUucHVzaChTZVt0XSk7cmV0dXJuIGV9LGUuZmx1c2hQZW5kaW5nRGVsZXRlcz1QZSxlLnNldERlbGF5RnVuY3Rpb249ZnVuY3Rpb24oZSl7VGU9ZSxrZS5sZW5ndGgmJlRlJiZUZShQZSl9LEllLnByb3RvdHlwZS5nZXRQb2ludGVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJhd0dldFBvaW50ZWUmJihlPXRoaXMucmF3R2V0UG9pbnRlZShlKSksZX0sSWUucHJvdG90eXBlLmRlc3RydWN0b3I9ZnVuY3Rpb24oZSl7dGhpcy5yYXdEZXN0cnVjdG9yJiZ0aGlzLnJhd0Rlc3RydWN0b3IoZSl9LEllLnByb3RvdHlwZS5hcmdQYWNrQWR2YW5jZT04LEllLnByb3RvdHlwZS5yZWFkVmFsdWVGcm9tUG9pbnRlcj1aLEllLnByb3RvdHlwZS5kZWxldGVPYmplY3Q9ZnVuY3Rpb24oZSl7bnVsbCE9PWUmJmUuZGVsZXRlKCl9LEllLnByb3RvdHlwZS5mcm9tV2lyZVR5cGU9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5nZXRQb2ludGVlKGUpO2lmKCF0KXJldHVybiB0aGlzLmRlc3RydWN0b3IoZSksbnVsbDt2YXIgcj1mdW5jdGlvbihlLHQpe3JldHVybiB0PWZ1bmN0aW9uKGUsdCl7Zm9yKHZvaWQgMD09PXQmJm1lKCJwdHIgc2hvdWxkIG5vdCBiZSB1bmRlZmluZWQiKTtlLmJhc2VDbGFzczspdD1lLnVwY2FzdCh0KSxlPWUuYmFzZUNsYXNzO3JldHVybiB0fShlLHQpLFNlW3RdfSh0aGlzLnJlZ2lzdGVyZWRDbGFzcyx0KTtpZih2b2lkIDAhPT1yKXtpZigwPT09ci4kJC5jb3VudC52YWx1ZSlyZXR1cm4gci4kJC5wdHI9dCxyLiQkLnNtYXJ0UHRyPWUsci5jbG9uZSgpO3ZhciBuPXIuY2xvbmUoKTtyZXR1cm4gdGhpcy5kZXN0cnVjdG9yKGUpLG59ZnVuY3Rpb24gbygpe3JldHVybiB0aGlzLmlzU21hcnRQb2ludGVyP0RlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMucG9pbnRlZVR5cGUscHRyOnQsc21hcnRQdHJUeXBlOnRoaXMsc21hcnRQdHI6ZX0pOkRlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMscHRyOmV9KX12YXIgYSxpPXRoaXMucmVnaXN0ZXJlZENsYXNzLmdldEFjdHVhbFR5cGUodCkscz1iZVtpXTtpZighcylyZXR1cm4gby5jYWxsKHRoaXMpO2E9dGhpcy5pc0NvbnN0P3MuY29uc3RQb2ludGVyVHlwZTpzLnBvaW50ZXJUeXBlO3ZhciB1PV9lKHQsdGhpcy5yZWdpc3RlcmVkQ2xhc3MsYS5yZWdpc3RlcmVkQ2xhc3MpO3JldHVybiBudWxsPT09dT9vLmNhbGwodGhpcyk6dGhpcy5pc1NtYXJ0UG9pbnRlcj9EZShhLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTphLHB0cjp1LHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOmV9KTpEZShhLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTphLHB0cjp1fSl9LEJlPWUuVW5ib3VuZFR5cGVFcnJvcj1zZShFcnJvciwiVW5ib3VuZFR5cGVFcnJvciIpLGUuY291bnRfZW12YWxfaGFuZGxlcz1mdW5jdGlvbigpe2Zvcih2YXIgZT0wLHQ9NTt0PHFlLmxlbmd0aDsrK3Qpdm9pZCAwIT09cWVbdF0mJisrZTtyZXR1cm4gZX0sZS5nZXRfZmlyc3RfZW12YWw9ZnVuY3Rpb24oKXtmb3IodmFyIGU9NTtlPHFlLmxlbmd0aDsrK2UpaWYodm9pZCAwIT09cWVbZV0pcmV0dXJuIHFlW2VdO3JldHVybiBudWxsfTt2YXIgU3Q9ZnVuY3Rpb24oZSx0LHIsbil7ZXx8KGU9dGhpcyksdGhpcy5wYXJlbnQ9ZSx0aGlzLm1vdW50PWUubW91bnQsdGhpcy5tb3VudGVkPW51bGwsdGhpcy5pZD1fdC5uZXh0SW5vZGUrKyx0aGlzLm5hbWU9dCx0aGlzLm1vZGU9cix0aGlzLm5vZGVfb3BzPXt9LHRoaXMuc3RyZWFtX29wcz17fSx0aGlzLnJkZXY9bn07T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU3QucHJvdG90eXBlLHtyZWFkOntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4hKDM2NSZ+dGhpcy5tb2RlKX0sc2V0OmZ1bmN0aW9uKGUpe2U/dGhpcy5tb2RlfD0zNjU6dGhpcy5tb2RlJj0tMzY2fX0sd3JpdGU6e2dldDpmdW5jdGlvbigpe3JldHVybiEoMTQ2Jn50aGlzLm1vZGUpfSxzZXQ6ZnVuY3Rpb24oZSl7ZT90aGlzLm1vZGV8PTE0Njp0aGlzLm1vZGUmPS0xNDd9fSxpc0ZvbGRlcjp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF90LmlzRGlyKHRoaXMubW9kZSl9fSxpc0RldmljZTp7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF90LmlzQ2hyZGV2KHRoaXMubW9kZSl9fX0pLF90LkZTTm9kZT1TdCxfdC5zdGF0aWNJbml0KCk7dmFyIER0LEN0PXthOmZ1bmN0aW9uKGUsdCxyLG4pe0woIkFzc2VydGlvbiBmYWlsZWQ6ICIrUyhlKSsiLCBhdDogIitbdD9TKHQpOiJ1bmtub3duIGZpbGVuYW1lIixyLG4/UyhuKToidW5rbm93biBmdW5jdGlvbiJdKX0sdDpmdW5jdGlvbihlKXt2YXIgdD1uZXcgWChlKTtyZXR1cm4gdC5nZXRfY2F1Z2h0KCl8fCh0LnNldF9jYXVnaHQoITApLFYtLSksdC5zZXRfcmV0aHJvd24oITEpLEgucHVzaCh0KSxmdW5jdGlvbihlKXtlLmFkZF9yZWYoKX0odCksdC5nZXRfZXhjZXB0aW9uX3B0cigpfSx5OmZ1bmN0aW9uKCl7UnQoMCksZnVuY3Rpb24oZSl7aWYoZS5yZWxlYXNlX3JlZigpJiYhZS5nZXRfcmV0aHJvd24oKSl7dmFyIHQ9ZS5nZXRfZGVzdHJ1Y3RvcigpO3QmJkcodCkoZS5leGNQdHIpLHp0KGUuZXhjUHRyKX19KEgucG9wKCkpLFk9MH0sZDpmdW5jdGlvbigpe3ZhciBlPVk7aWYoIWUpcmV0dXJuIE90KDApLDA7dmFyIHQ9bmV3IFgoZSk7dC5zZXRfYWRqdXN0ZWRfcHRyKGUpO3ZhciByPXQuZ2V0X3R5cGUoKTtpZighcilyZXR1cm4gT3QoMCksZTtmb3IodmFyIG49MDtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXt2YXIgbz1hcmd1bWVudHNbbl07aWYoMD09PW98fG89PT1yKWJyZWFrO3ZhciBhPXQucHRyKzE2O2lmKE50KG8scixhKSlyZXR1cm4gT3QobyksZX1yZXR1cm4gT3QociksZX0sbTpmdW5jdGlvbigpe3ZhciBlPVk7aWYoIWUpcmV0dXJuIE90KDApLDA7dmFyIHQ9bmV3IFgoZSk7dC5zZXRfYWRqdXN0ZWRfcHRyKGUpO3ZhciByPXQuZ2V0X3R5cGUoKTtpZighcilyZXR1cm4gT3QoMCksZTtmb3IodmFyIG49MDtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXt2YXIgbz1hcmd1bWVudHNbbl07aWYoMD09PW98fG89PT1yKWJyZWFrO3ZhciBhPXQucHRyKzE2O2lmKE50KG8scixhKSlyZXR1cm4gT3QobyksZX1yZXR1cm4gT3QociksZX0sTjpmdW5jdGlvbigpe3ZhciBlPUgucG9wKCk7ZXx8TCgibm8gZXhjZXB0aW9uIHRvIHRocm93Iik7dmFyIHQ9ZS5leGNQdHI7dGhyb3cgZS5nZXRfcmV0aHJvd24oKXx8KEgucHVzaChlKSxlLnNldF9yZXRocm93bighMCksZS5zZXRfY2F1Z2h0KCExKSxWKyspLFk9dCx0fSxjOmZ1bmN0aW9uKGUsdCxyKXt0aHJvdyBuZXcgWChlKS5pbml0KHQsciksWT1lLFYrKyxlfSxZOmZ1bmN0aW9uKCl7cmV0dXJuIFZ9LGg6ZnVuY3Rpb24oZSl7dGhyb3cgWXx8KFk9ZSksZX0sZmE6ZnVuY3Rpb24oZSl7fSxoYTpmdW5jdGlvbihlLHQpe0woSil9LGdhOmZ1bmN0aW9uKGUsdCl7TChKKX0sTzpmdW5jdGlvbihlKXt2YXIgdD1LW2VdO2RlbGV0ZSBLW2VdO3ZhciByPXQucmF3Q29uc3RydWN0b3Isbj10LnJhd0Rlc3RydWN0b3Isbz10LmZpZWxkcztsZShbZV0sby5tYXAoKGU9PmUuZ2V0dGVyUmV0dXJuVHlwZSkpLmNvbmNhdChvLm1hcCgoZT0+ZS5zZXR0ZXJBcmd1bWVudFR5cGUpKSksKGU9Pnt2YXIgYT17fTtyZXR1cm4gby5mb3JFYWNoKCgodCxyKT0+e3ZhciBuPXQuZmllbGROYW1lLGk9ZVtyXSxzPXQuZ2V0dGVyLHU9dC5nZXR0ZXJDb250ZXh0LGM9ZVtyK28ubGVuZ3RoXSxsPXQuc2V0dGVyLGQ9dC5zZXR0ZXJDb250ZXh0O2Fbbl09e3JlYWQ6ZT0+aS5mcm9tV2lyZVR5cGUocyh1LGUpKSx3cml0ZTooZSx0KT0+e3ZhciByPVtdO2woZCxlLGMudG9XaXJlVHlwZShyLHQpKSxRKHIpfX19KSksW3tuYW1lOnQubmFtZSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7dmFyIHQ9e307Zm9yKHZhciByIGluIGEpdFtyXT1hW3JdLnJlYWQoZSk7cmV0dXJuIG4oZSksdH0sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbyBpbiBhKWlmKCEobyBpbiB0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCdNaXNzaW5nIGZpZWxkOiAgIicrbysnIicpO3ZhciBpPXIoKTtmb3IobyBpbiBhKWFbb10ud3JpdGUoaSx0W29dKTtyZXR1cm4gbnVsbCE9PWUmJmUucHVzaChuLGkpLGl9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6WixkZXN0cnVjdG9yRnVuY3Rpb246bn1dfSkpfSxVOmZ1bmN0aW9uKGUsdCxyLG4sbyl7fSxrYTpmdW5jdGlvbihlLHQscixuLG8pe3ZhciBhPWRlKHIpO3ZlKGUse25hbWU6dD1wZSh0KSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ/bjpvfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3ZhciBuO2lmKDE9PT1yKW49djtlbHNlIGlmKDI9PT1yKW49ZztlbHNle2lmKDQhPT1yKXRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gYm9vbGVhbiB0eXBlIHNpemU6ICIrdCk7bj1FfXJldHVybiB0aGlzLmZyb21XaXJlVHlwZShuW2U+PmFdKX0sZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX0sczpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMsdSxjLGwsZCxmKXtsPXBlKGwpLGE9TmUobyxhKSxzJiYocz1OZShpLHMpKSxjJiYoYz1OZSh1LGMpKSxmPU5lKGQsZik7dmFyIHA9YWUobCk7QWUocCwoZnVuY3Rpb24oKXtMZSgiQ2Fubm90IGNvbnN0cnVjdCAiK2wrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIsW25dKX0pKSxsZShbZSx0LHJdLG4/W25dOltdLChmdW5jdGlvbih0KXt2YXIgcixvO3Q9dFswXSxvPW4/KHI9dC5yZWdpc3RlcmVkQ2xhc3MpLmluc3RhbmNlUHJvdG90eXBlOkZlLnByb3RvdHlwZTt2YXIgaT1pZShwLChmdW5jdGlvbigpe2lmKE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKSE9PXUpdGhyb3cgbmV3IGhlKCJVc2UgJ25ldycgdG8gY29uc3RydWN0ICIrbCk7aWYodm9pZCAwPT09ZC5jb25zdHJ1Y3Rvcl9ib2R5KXRocm93IG5ldyBoZShsKyIgaGFzIG5vIGFjY2Vzc2libGUgY29uc3RydWN0b3IiKTt2YXIgZT1kLmNvbnN0cnVjdG9yX2JvZHlbYXJndW1lbnRzLmxlbmd0aF07aWYodm9pZCAwPT09ZSl0aHJvdyBuZXcgaGUoIlRyaWVkIHRvIGludm9rZSBjdG9yIG9mICIrbCsiIHdpdGggaW52YWxpZCBudW1iZXIgb2YgcGFyYW1ldGVycyAoIithcmd1bWVudHMubGVuZ3RoKyIpIC0gZXhwZWN0ZWQgKCIrT2JqZWN0LmtleXMoZC5jb25zdHJ1Y3Rvcl9ib2R5KS50b1N0cmluZygpKyIpIHBhcmFtZXRlcnMgaW5zdGVhZCEiKTtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KSksdT1PYmplY3QuY3JlYXRlKG8se2NvbnN0cnVjdG9yOnt2YWx1ZTppfX0pO2kucHJvdG90eXBlPXU7dmFyIGQ9bmV3ICRlKGwsaSx1LGYscixhLHMsYyksaD1uZXcgSWUobCxkLCEwLCExLCExKSxtPW5ldyBJZShsKyIqIixkLCExLCExLCExKSx2PW5ldyBJZShsKyIgY29uc3QqIixkLCExLCEwLCExKTtyZXR1cm4gYmVbZV09e3BvaW50ZXJUeXBlOm0sY29uc3RQb2ludGVyVHlwZTp2fSx6ZShwLGkpLFtoLG0sdl19KSl9LEk6ZnVuY3Rpb24oZSx0LHIsbixvLGEsaSl7dmFyIHM9VmUocixuKTt0PXBlKHQpLGE9TmUobyxhKSxsZShbXSxbZV0sKGZ1bmN0aW9uKGUpe3ZhciBuPShlPWVbMF0pLm5hbWUrIi4iK3Q7ZnVuY3Rpb24gbygpe0xlKCJDYW5ub3QgY2FsbCAiK24rIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIscyl9dC5zdGFydHNXaXRoKCJAQCIpJiYodD1TeW1ib2xbdC5zdWJzdHJpbmcoMildKTt2YXIgdT1lLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3RvcjtyZXR1cm4gdm9pZCAwPT09dVt0XT8oby5hcmdDb3VudD1yLTEsdVt0XT1vKTooTWUodSx0LG4pLHVbdF0ub3ZlcmxvYWRUYWJsZVtyLTFdPW8pLGxlKFtdLHMsKGZ1bmN0aW9uKGUpe3ZhciBvPVtlWzBdLG51bGxdLmNvbmNhdChlLnNsaWNlKDEpKSxzPUhlKG4sbyxudWxsLGEsaSk7cmV0dXJuIHZvaWQgMD09PXVbdF0ub3ZlcmxvYWRUYWJsZT8ocy5hcmdDb3VudD1yLTEsdVt0XT1zKTp1W3RdLm92ZXJsb2FkVGFibGVbci0xXT1zLFtdfSkpLFtdfSkpfSxwOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXtoKHQ+MCk7dmFyIGk9VmUodCxyKTtvPU5lKG4sbyksbGUoW10sW2VdLChmdW5jdGlvbihlKXt2YXIgcj0iY29uc3RydWN0b3IgIisoZT1lWzBdKS5uYW1lO2lmKHZvaWQgMD09PWUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHkmJihlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5PVtdKSx2b2lkIDAhPT1lLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W3QtMV0pdGhyb3cgbmV3IGhlKCJDYW5ub3QgcmVnaXN0ZXIgbXVsdGlwbGUgY29uc3RydWN0b3JzIHdpdGggaWRlbnRpY2FsIG51bWJlciBvZiBwYXJhbWV0ZXJzICgiKyh0LTEpKyIpIGZvciBjbGFzcyAnIitlLm5hbWUrIichIE92ZXJsb2FkIHJlc29sdXRpb24gaXMgY3VycmVudGx5IG9ubHkgcGVyZm9ybWVkIHVzaW5nIHRoZSBwYXJhbWV0ZXIgY291bnQsIG5vdCBhY3R1YWwgdHlwZSBpbmZvISIpO3JldHVybiBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W3QtMV09KCk9PntMZSgiQ2Fubm90IGNvbnN0cnVjdCAiK2UubmFtZSsiIGR1ZSB0byB1bmJvdW5kIHR5cGVzIixpKX0sbGUoW10saSwoZnVuY3Rpb24obil7cmV0dXJuIG4uc3BsaWNlKDEsMCxudWxsKSxlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W3QtMV09SGUocixuLG51bGwsbyxhKSxbXX0pKSxbXX0pKX0sZjpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMpe3ZhciB1PVZlKHIsbik7dD1wZSh0KSxhPU5lKG8sYSksbGUoW10sW2VdLChmdW5jdGlvbihlKXt2YXIgbj0oZT1lWzBdKS5uYW1lKyIuIit0O2Z1bmN0aW9uIG8oKXtMZSgiQ2Fubm90IGNhbGwgIituKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLHUpfXQuc3RhcnRzV2l0aCgiQEAiKSYmKHQ9U3ltYm9sW3Quc3Vic3RyaW5nKDIpXSkscyYmZS5yZWdpc3RlcmVkQ2xhc3MucHVyZVZpcnR1YWxGdW5jdGlvbnMucHVzaCh0KTt2YXIgYz1lLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSxsPWNbdF07cmV0dXJuIHZvaWQgMD09PWx8fHZvaWQgMD09PWwub3ZlcmxvYWRUYWJsZSYmbC5jbGFzc05hbWUhPT1lLm5hbWUmJmwuYXJnQ291bnQ9PT1yLTI/KG8uYXJnQ291bnQ9ci0yLG8uY2xhc3NOYW1lPWUubmFtZSxjW3RdPW8pOihNZShjLHQsbiksY1t0XS5vdmVybG9hZFRhYmxlW3ItMl09byksbGUoW10sdSwoZnVuY3Rpb24obyl7dmFyIHM9SGUobixvLGUsYSxpKTtyZXR1cm4gdm9pZCAwPT09Y1t0XS5vdmVybG9hZFRhYmxlPyhzLmFyZ0NvdW50PXItMixjW3RdPXMpOmNbdF0ub3ZlcmxvYWRUYWJsZVtyLTJdPXMsW119KSksW119KSl9LGphOmZ1bmN0aW9uKGUsdCl7dmUoZSx7bmFtZTp0PXBlKHQpLGZyb21XaXJlVHlwZTpmdW5jdGlvbihlKXt2YXIgdD1YZS50b1ZhbHVlKGUpO3JldHVybiBHZShlKSx0fSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIFhlLnRvSGFuZGxlKHQpfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlosZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX0sdTpmdW5jdGlvbihlLHQscixuKXt2YXIgbz1kZShyKTtmdW5jdGlvbiBhKCl7fXQ9cGUodCksYS52YWx1ZXM9e30sdmUoZSx7bmFtZTp0LGNvbnN0cnVjdG9yOmEsZnJvbVdpcmVUeXBlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yLnZhbHVlc1tlXX0sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe3JldHVybiB0LnZhbHVlfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOkplKHQsbyxuKSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pLEFlKHQsYSl9LGo6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPUtlKGUsImVudW0iKTt0PXBlKHQpO3ZhciBvPW4uY29uc3RydWN0b3IsYT1PYmplY3QuY3JlYXRlKG4uY29uc3RydWN0b3IucHJvdG90eXBlLHt2YWx1ZTp7dmFsdWU6cn0sY29uc3RydWN0b3I6e3ZhbHVlOmllKG4ubmFtZSsiXyIrdCwoZnVuY3Rpb24oKXt9KSl9fSk7by52YWx1ZXNbcl09YSxvW3RdPWF9LEw6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPWRlKHIpO3ZlKGUse25hbWU6dD1wZSh0KSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdH0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpaZSh0LG4pLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSl9LFE6ZnVuY3Rpb24oZSx0LHIsbixvLGEpe3ZhciBpPVZlKHQscik7ZT1wZShlKSxvPU5lKG4sbyksQWUoZSwoZnVuY3Rpb24oKXtMZSgiQ2Fubm90IGNhbGwgIitlKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLGkpfSksdC0xKSxsZShbXSxpLChmdW5jdGlvbihyKXt2YXIgbj1bclswXSxudWxsXS5jb25jYXQoci5zbGljZSgxKSk7cmV0dXJuIHplKGUsSGUoZSxuLG51bGwsbyxhKSx0LTEpLFtdfSkpfSx3OmZ1bmN0aW9uKGUsdCxyLG4sbyl7dD1wZSh0KSwtMT09PW8mJihvPTQyOTQ5NjcyOTUpO3ZhciBhPWRlKHIpLGk9ZT0+ZTtpZigwPT09bil7dmFyIHM9MzItOCpyO2k9ZT0+ZTw8cz4+PnN9dmFyIHU9dC5pbmNsdWRlcygidW5zaWduZWQiKTt2ZShlLHtuYW1lOnQsZnJvbVdpcmVUeXBlOmksdG9XaXJlVHlwZTp1P2Z1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMubmFtZSx0Pj4+MH06ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5uYW1lLHR9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6ZXQodCxhLDAhPT1uKSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfSxuOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1bSW50OEFycmF5LFVpbnQ4QXJyYXksSW50MTZBcnJheSxVaW50MTZBcnJheSxJbnQzMkFycmF5LFVpbnQzMkFycmF5LEZsb2F0MzJBcnJheSxGbG9hdDY0QXJyYXldW3RdO2Z1bmN0aW9uIG8oZSl7dmFyIHQ9XyxyPXRbZT4+PTJdLG89dFtlKzFdO3JldHVybiBuZXcgbihtLG8scil9dmUoZSx7bmFtZTpyPXBlKHIpLGZyb21XaXJlVHlwZTpvLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6b30se2lnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnM6ITB9KX0sTTpmdW5jdGlvbihlLHQpe3ZhciByPSJzdGQ6OnN0cmluZyI9PT0odD1wZSh0KSk7dmUoZSx7bmFtZTp0LGZyb21XaXJlVHlwZTpmdW5jdGlvbihlKXt2YXIgdCxuPV9bZT4+Ml0sbz1lKzQ7aWYocilmb3IodmFyIGE9byxpPTA7aTw9bjsrK2kpe3ZhciBzPW8raTtpZihpPT1ufHwwPT15W3NdKXt2YXIgdT1TKGEscy1hKTt2b2lkIDA9PT10P3Q9dToodCs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSx0Kz11KSxhPXMrMX19ZWxzZXt2YXIgYz1uZXcgQXJyYXkobik7Zm9yKGk9MDtpPG47KytpKWNbaV09U3RyaW5nLmZyb21DaGFyQ29kZSh5W28raV0pO3Q9Yy5qb2luKCIiKX1yZXR1cm4gTXQoZSksdH0sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe3ZhciBuO3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciYmKHQ9bmV3IFVpbnQ4QXJyYXkodCkpO3ZhciBvPSJzdHJpbmciPT10eXBlb2YgdDtvfHx0IGluc3RhbmNlb2YgVWludDhBcnJheXx8dCBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx0IGluc3RhbmNlb2YgSW50OEFycmF5fHxtZSgiQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBzdGQ6OnN0cmluZyIpLG49ciYmbz9DKHQpOnQubGVuZ3RoO3ZhciBhPUF0KDQrbisxKSxpPWErNDtpZihfW2E+PjJdPW4sciYmbylEKHQseSxpLG4rMSk7ZWxzZSBpZihvKWZvcih2YXIgcz0wO3M8bjsrK3Mpe3ZhciB1PXQuY2hhckNvZGVBdChzKTt1PjI1NSYmKE10KGkpLG1lKCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHMiKSkseVtpK3NdPXV9ZWxzZSBmb3Iocz0wO3M8bjsrK3MpeVtpK3NdPXRbc107cmV0dXJuIG51bGwhPT1lJiZlLnB1c2goTXQsYSksYX0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpaLGRlc3RydWN0b3JGdW5jdGlvbjpmdW5jdGlvbihlKXtNdChlKX19KX0sSDpmdW5jdGlvbihlLHQscil7dmFyIG4sbyxhLGkscztyPXBlKHIpLDI9PT10PyhuPXJ0LG89bnQsaT1vdCxhPSgpPT53LHM9MSk6ND09PXQmJihuPWF0LG89aXQsaT1zdCxhPSgpPT5fLHM9MiksdmUoZSx7bmFtZTpyLGZyb21XaXJlVHlwZTpmdW5jdGlvbihlKXtmb3IodmFyIHIsbz1fW2U+PjJdLGk9YSgpLHU9ZSs0LGM9MDtjPD1vOysrYyl7dmFyIGw9ZSs0K2MqdDtpZihjPT1vfHwwPT1pW2w+PnNdKXt2YXIgZD1uKHUsbC11KTt2b2lkIDA9PT1yP3I9ZDoocis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxyKz1kKSx1PWwrdH19cmV0dXJuIE10KGUpLHJ9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZSxuKXsic3RyaW5nIiE9dHlwZW9mIG4mJm1lKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIEMrKyBzdHJpbmcgdHlwZSAiK3IpO3ZhciBhPWkobiksdT1BdCg0K2ErdCk7cmV0dXJuIF9bdT4+Ml09YT4+cyxvKG4sdSs0LGErdCksbnVsbCE9PWUmJmUucHVzaChNdCx1KSx1fSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlosZGVzdHJ1Y3RvckZ1bmN0aW9uOmZ1bmN0aW9uKGUpe010KGUpfX0pfSxQOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXtLW2VdPXtuYW1lOnBlKHQpLHJhd0NvbnN0cnVjdG9yOk5lKHIsbikscmF3RGVzdHJ1Y3RvcjpOZShvLGEpLGZpZWxkczpbXX19LEM6ZnVuY3Rpb24oZSx0LHIsbixvLGEsaSxzLHUsYyl7S1tlXS5maWVsZHMucHVzaCh7ZmllbGROYW1lOnBlKHQpLGdldHRlclJldHVyblR5cGU6cixnZXR0ZXI6TmUobixvKSxnZXR0ZXJDb250ZXh0OmEsc2V0dGVyQXJndW1lbnRUeXBlOmksc2V0dGVyOk5lKHMsdSksc2V0dGVyQ29udGV4dDpjfSl9LGxhOmZ1bmN0aW9uKGUsdCl7dmUoZSx7aXNWb2lkOiEwLG5hbWU6dD1wZSh0KSxhcmdQYWNrQWR2YW5jZTowLGZyb21XaXJlVHlwZTpmdW5jdGlvbigpe30sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe319KX0sZWE6ZnVuY3Rpb24oKXtyZXR1cm4hMH0scGE6ZnVuY3Rpb24oZSx0LHIpe2U9WGUudG9WYWx1ZShlKSx0PUtlKHQsImVtdmFsOjphcyIpO3ZhciBuPVtdLG89WGUudG9IYW5kbGUobik7cmV0dXJuIF9bcj4+Ml09byx0LnRvV2lyZVR5cGUobixlKX0sbmE6ZnVuY3Rpb24oZSx0LHIsbil7KGU9ZHRbZV0pKHQ9WGUudG9WYWx1ZSh0KSxyPWN0KHIpLG51bGwsbil9LEI6R2UsbWE6ZnVuY3Rpb24oZSx0KXt2YXIgcj1mdW5jdGlvbihlLHQpe2Zvcih2YXIgcj1uZXcgQXJyYXkoZSksbj0wO248ZTsrK24pcltuXT1LZShfW3QrNCpuPj4yXSwicGFyYW1ldGVyICIrbik7cmV0dXJuIHJ9KGUsdCksbj1yWzBdLG89bi5uYW1lKyJfJCIrci5zbGljZSgxKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLm5hbWV9KSkuam9pbigiXyIpKyIkIixhPWZ0W29dO2lmKHZvaWQgMCE9PWEpcmV0dXJuIGE7Zm9yKHZhciBpPVsicmV0VHlwZSJdLHM9W25dLHU9IiIsYz0wO2M8ZS0xOysrYyl1Kz0oMCE9PWM/IiwgIjoiIikrImFyZyIrYyxpLnB1c2goImFyZ1R5cGUiK2MpLHMucHVzaChyWzErY10pO3ZhciBsLGQsZj0icmV0dXJuIGZ1bmN0aW9uICIrYWUoIm1ldGhvZENhbGxlcl8iK28pKyIoaGFuZGxlLCBuYW1lLCBkZXN0cnVjdG9ycywgYXJncykge1xuIixwPTA7Zm9yKGM9MDtjPGUtMTsrK2MpZis9IiAgICB2YXIgYXJnIitjKyIgPSBhcmdUeXBlIitjKyIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJncyIrKHA/IisiK3A6IiIpKyIpO1xuIixwKz1yW2MrMV0uYXJnUGFja0FkdmFuY2U7Zm9yKGYrPSIgICAgdmFyIHJ2ID0gaGFuZGxlW25hbWVdKCIrdSsiKTtcbiIsYz0wO2M8ZS0xOysrYylyW2MrMV0uZGVsZXRlT2JqZWN0JiYoZis9IiAgICBhcmdUeXBlIitjKyIuZGVsZXRlT2JqZWN0KGFyZyIrYysiKTtcbiIpO3JldHVybiBuLmlzVm9pZHx8KGYrPSIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xuIiksZis9In07XG4iLGkucHVzaChmKSxsPVVlKEZ1bmN0aW9uLGkpLmFwcGx5KG51bGwscyksZD1kdC5sZW5ndGgsZHQucHVzaChsKSxhPWQsZnRbb109YSxhfSxyYTpmdW5jdGlvbihlLHQpe3JldHVybiBlPVhlLnRvVmFsdWUoZSksdD1YZS50b1ZhbHVlKHQpLFhlLnRvSGFuZGxlKGVbdF0pfSxGOmZ1bmN0aW9uKGUpe2U+NCYmKHFlW2VdLnJlZmNvdW50Kz0xKX0scWE6ZnVuY3Rpb24oZSl7cmV0dXJuIFhlLnRvSGFuZGxlKGN0KGUpKX0sb2E6ZnVuY3Rpb24oZSl7UShYZS50b1ZhbHVlKGUpKSxHZShlKX0sejpmdW5jdGlvbihlLHQpe3ZhciByPShlPUtlKGUsIl9lbXZhbF90YWtlX3ZhbHVlIikpLnJlYWRWYWx1ZUZyb21Qb2ludGVyKHQpO3JldHVybiBYZS50b0hhbmRsZShyKX0sYjpmdW5jdGlvbigpe0woIiIpfSxLOmZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCl9LF86ZnVuY3Rpb24oKXtyZXR1cm4geS5sZW5ndGh9LEc6bHQsZGE6ZnVuY3Rpb24oZSx0LHIpe3kuY29weVdpdGhpbihlLHQsdCtyKX0sWjpmdW5jdGlvbihlKXt5Lmxlbmd0aCxMKCJPT00iKX0sJDpmdW5jdGlvbihlLHQpe3ZhciByPTA7cmV0dXJuIGh0KCkuZm9yRWFjaCgoZnVuY3Rpb24obixvKXt2YXIgYT10K3I7X1tlKzQqbz4+Ml09YSxmdW5jdGlvbihlLHQscil7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDsrK24pdlswfHQrK109ZS5jaGFyQ29kZUF0KG4pO3ZbMHx0XT0wfShuLGEpLHIrPW4ubGVuZ3RoKzF9KSksMH0sYWE6ZnVuY3Rpb24oZSx0KXt2YXIgcj1odCgpO19bZT4+Ml09ci5sZW5ndGg7dmFyIG49MDtyZXR1cm4gci5mb3JFYWNoKChmdW5jdGlvbihlKXtuKz1lLmxlbmd0aCsxfSkpLF9bdD4+Ml09biwwfSxpYTpmdW5jdGlvbihlKXt0cnl7dmFyIHQ9YnQuZ2V0U3RyZWFtRnJvbUZEKGUpO3JldHVybiBfdC5jbG9zZSh0KSwwfWNhdGNoKGUpe2lmKHZvaWQgMD09PV90fHwhKGUgaW5zdGFuY2VvZiBfdC5FcnJub0Vycm9yKSl0aHJvdyBlO3JldHVybiBlLmVycm5vfX0sY2E6ZnVuY3Rpb24oZSx0LHIsbil7dHJ5e3ZhciBvPWZ1bmN0aW9uKGUsdCxyLG4pe2Zvcih2YXIgbz0wLGE9MDthPHI7YSsrKXt2YXIgaT1fW3Q+PjJdLHM9X1t0KzQ+PjJdO3QrPTg7dmFyIHU9X3QucmVhZChlLHYsaSxzLHVuZGVmaW5lZCk7aWYodTwwKXJldHVybi0xO2lmKG8rPXUsdTxzKWJyZWFrfXJldHVybiBvfShidC5nZXRTdHJlYW1Gcm9tRkQoZSksdCxyKTtyZXR1cm4gX1tuPj4yXT1vLDB9Y2F0Y2goZSl7aWYodm9pZCAwPT09X3R8fCEoZSBpbnN0YW5jZW9mIF90LkVycm5vRXJyb3IpKXRocm93IGU7cmV0dXJuIGUuZXJybm99fSxUOmZ1bmN0aW9uKGUsdCxyLG4sbyl7dHJ5e3ZhciBhPSh1PXIpKzIwOTcxNTI+Pj4wPDQxOTQzMDUtISEocz10KT8ocz4+PjApKzQyOTQ5NjcyOTYqdTpOYU47aWYoaXNOYU4oYSkpcmV0dXJuIDYxO3ZhciBpPWJ0LmdldFN0cmVhbUZyb21GRChlKTtyZXR1cm4gX3QubGxzZWVrKGksYSxuKSx4PVtpLnBvc2l0aW9uPj4+MCwoJD1pLnBvc2l0aW9uLCtNYXRoLmFicygkKT49MT8kPjA/KDB8TWF0aC5taW4oK01hdGguZmxvb3IoJC80Mjk0OTY3Mjk2KSw0Mjk0OTY3Mjk1KSk+Pj4wOn5+K01hdGguY2VpbCgoJC0rKH5+JD4+PjApKS80Mjk0OTY3Mjk2KT4+PjA6MCldLEVbbz4+Ml09eFswXSxFW28rND4+Ml09eFsxXSxpLmdldGRlbnRzJiYwPT09YSYmMD09PW4mJihpLmdldGRlbnRzPW51bGwpLDB9Y2F0Y2goZSl7aWYodm9pZCAwPT09X3R8fCEoZSBpbnN0YW5jZW9mIF90LkVycm5vRXJyb3IpKXRocm93IGU7cmV0dXJuIGUuZXJybm99dmFyIHMsdX0sYmE6ZnVuY3Rpb24oZSx0LHIsbil7dHJ5e3ZhciBvPWZ1bmN0aW9uKGUsdCxyLG4pe2Zvcih2YXIgbz0wLGE9MDthPHI7YSsrKXt2YXIgaT1fW3Q+PjJdLHM9X1t0KzQ+PjJdO3QrPTg7dmFyIHU9X3Qud3JpdGUoZSx2LGkscyx1bmRlZmluZWQpO2lmKHU8MClyZXR1cm4tMTtvKz11fXJldHVybiBvfShidC5nZXRTdHJlYW1Gcm9tRkQoZSksdCxyKTtyZXR1cm4gX1tuPj4yXT1vLDB9Y2F0Y2goZSl7aWYodm9pZCAwPT09X3R8fCEoZSBpbnN0YW5jZW9mIF90LkVycm5vRXJyb3IpKXRocm93IGU7cmV0dXJuIGUuZXJybm99fSxWOmZ1bmN0aW9uKGUpe3ZhciB0PWp0KCk7dHJ5e3JldHVybiBHKGUpKCl9Y2F0Y2goZSl7aWYoSXQodCksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9anQoKTt0cnl7cmV0dXJuIEcoZSkodCl9Y2F0Y2goZSl7aWYoSXQociksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxnOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1qdCgpO3RyeXtyZXR1cm4gRyhlKSh0LHIpfWNhdGNoKGUpe2lmKEl0KG4pLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0scjpmdW5jdGlvbihlLHQscixuKXt2YXIgbz1qdCgpO3RyeXtyZXR1cm4gRyhlKSh0LHIsbil9Y2F0Y2goZSl7aWYoSXQobyksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxXOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXt2YXIgaT1qdCgpO3RyeXtyZXR1cm4gRyhlKSh0LHIsbixvLGEpfWNhdGNoKGUpe2lmKEl0KGkpLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0seDpmdW5jdGlvbihlLHQscixuLG8sYSxpKXt2YXIgcz1qdCgpO3RyeXtyZXR1cm4gRyhlKSh0LHIsbixvLGEsaSl9Y2F0Y2goZSl7aWYoSXQocyksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxKOmZ1bmN0aW9uKGUsdCxyLG4sbyxhLGkscyl7dmFyIHU9anQoKTt0cnl7cmV0dXJuIEcoZSkodCxyLG4sbyxhLGkscyl9Y2F0Y2goZSl7aWYoSXQodSksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxFOmZ1bmN0aW9uKGUsdCxyLG4sbyxhLGkscyx1LGMsbCxkKXt2YXIgZj1qdCgpO3RyeXtyZXR1cm4gRyhlKSh0LHIsbixvLGEsaSxzLHUsYyxsLGQpfWNhdGNoKGUpe2lmKEl0KGYpLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0sUjpmdW5jdGlvbihlLHQscixuLG8pe3ZhciBhPWp0KCk7dHJ5e3JldHVybiBMdChlLHQscixuLG8pfWNhdGNoKGUpe2lmKEl0KGEpLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0sUzpmdW5jdGlvbihlKXt2YXIgdD1qdCgpO3RyeXtyZXR1cm4gV3QoZSl9Y2F0Y2goZSl7aWYoSXQodCksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxsOmZ1bmN0aW9uKGUpe3ZhciB0PWp0KCk7dHJ5e0coZSkoKX1jYXRjaChlKXtpZihJdCh0KSxlIT09ZSswKXRocm93IGU7UnQoMSwwKX19LGs6ZnVuY3Rpb24oZSx0KXt2YXIgcj1qdCgpO3RyeXtHKGUpKHQpfWNhdGNoKGUpe2lmKEl0KHIpLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0saTpmdW5jdGlvbihlLHQscil7dmFyIG49anQoKTt0cnl7RyhlKSh0LHIpfWNhdGNoKGUpe2lmKEl0KG4pLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0sdjpmdW5jdGlvbihlLHQscixuKXt2YXIgbz1qdCgpO3RyeXtHKGUpKHQscixuKX1jYXRjaChlKXtpZihJdChvKSxlIT09ZSswKXRocm93IGU7UnQoMSwwKX19LG86ZnVuY3Rpb24oZSx0LHIsbixvKXt2YXIgYT1qdCgpO3RyeXtHKGUpKHQscixuLG8pfWNhdGNoKGUpe2lmKEl0KGEpLGUhPT1lKzApdGhyb3cgZTtSdCgxLDApfX0scTpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMpe3ZhciB1PWp0KCk7dHJ5e0coZSkodCxyLG4sbyxhLGkscyl9Y2F0Y2goZSl7aWYoSXQodSksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxBOmZ1bmN0aW9uKGUsdCxyLG4sbyxhLGkscyx1LGMsbCl7dmFyIGQ9anQoKTt0cnl7RyhlKSh0LHIsbixvLGEsaSxzLHUsYyxsKX1jYXRjaChlKXtpZihJdChkKSxlIT09ZSswKXRocm93IGU7UnQoMSwwKX19LEQ6ZnVuY3Rpb24oZSx0LHIsbixvLGEsaSxzLHUsYyxsLGQsZixwLGgsbSl7dmFyIHY9anQoKTt0cnl7RyhlKSh0LHIsbixvLGEsaSxzLHUsYyxsLGQsZixwLGgsbSl9Y2F0Y2goZSl7aWYoSXQodiksZSE9PWUrMCl0aHJvdyBlO1J0KDEsMCl9fSxYOmZ1bmN0aW9uKGUsdCxyLG4sbyl7cmV0dXJuIGZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBvPUVbbis0MD4+Ml0sYT17dG1fc2VjOkVbbj4+Ml0sdG1fbWluOkVbbis0Pj4yXSx0bV9ob3VyOkVbbis4Pj4yXSx0bV9tZGF5OkVbbisxMj4+Ml0sdG1fbW9uOkVbbisxNj4+Ml0sdG1feWVhcjpFW24rMjA+PjJdLHRtX3dkYXk6RVtuKzI0Pj4yXSx0bV95ZGF5OkVbbisyOD4+Ml0sdG1faXNkc3Q6RVtuKzMyPj4yXSx0bV9nbXRvZmY6RVtuKzM2Pj4yXSx0bV96b25lOm8/UyhvKToiIn0saT1TKHIpLHM9eyIlYyI6IiVhICViICVkICVIOiVNOiVTICVZIiwiJUQiOiIlbS8lZC8leSIsIiVGIjoiJVktJW0tJWQiLCIlaCI6IiViIiwiJXIiOiIlSTolTTolUyAlcCIsIiVSIjoiJUg6JU0iLCIlVCI6IiVIOiVNOiVTIiwiJXgiOiIlbS8lZC8leSIsIiVYIjoiJUg6JU06JVMiLCIlRWMiOiIlYyIsIiVFQyI6IiVDIiwiJUV4IjoiJW0vJWQvJXkiLCIlRVgiOiIlSDolTTolUyIsIiVFeSI6IiV5IiwiJUVZIjoiJVkiLCIlT2QiOiIlZCIsIiVPZSI6IiVlIiwiJU9IIjoiJUgiLCIlT0kiOiIlSSIsIiVPbSI6IiVtIiwiJU9NIjoiJU0iLCIlT1MiOiIlUyIsIiVPdSI6IiV1IiwiJU9VIjoiJVUiLCIlT1YiOiIlViIsIiVPdyI6IiV3IiwiJU9XIjoiJVciLCIlT3kiOiIleSJ9O2Zvcih2YXIgdSBpbiBzKWk9aS5yZXBsYWNlKG5ldyBSZWdFeHAodSwiZyIpLHNbdV0pO3ZhciBjPVsiU3VuZGF5IiwiTW9uZGF5IiwiVHVlc2RheSIsIldlZG5lc2RheSIsIlRodXJzZGF5IiwiRnJpZGF5IiwiU2F0dXJkYXkiXSxsPVsiSmFudWFyeSIsIkZlYnJ1YXJ5IiwiTWFyY2giLCJBcHJpbCIsIk1heSIsIkp1bmUiLCJKdWx5IiwiQXVndXN0IiwiU2VwdGVtYmVyIiwiT2N0b2JlciIsIk5vdmVtYmVyIiwiRGVjZW1iZXIiXTtmdW5jdGlvbiBkKGUsdCxyKXtmb3IodmFyIG49Im51bWJlciI9PXR5cGVvZiBlP2UudG9TdHJpbmcoKTplfHwiIjtuLmxlbmd0aDx0OyluPXJbMF0rbjtyZXR1cm4gbn1mdW5jdGlvbiBmKGUsdCl7cmV0dXJuIGQoZSx0LCIwIil9ZnVuY3Rpb24gcChlLHQpe2Z1bmN0aW9uIHIoZSl7cmV0dXJuIGU8MD8tMTplPjA/MTowfXZhciBuO3JldHVybiAwPT09KG49cihlLmdldEZ1bGxZZWFyKCktdC5nZXRGdWxsWWVhcigpKSkmJjA9PT0obj1yKGUuZ2V0TW9udGgoKS10LmdldE1vbnRoKCkpKSYmKG49cihlLmdldERhdGUoKS10LmdldERhdGUoKSkpLG59ZnVuY3Rpb24gaChlKXtzd2l0Y2goZS5nZXREYXkoKSl7Y2FzZSAwOnJldHVybiBuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCktMSwxMSwyOSk7Y2FzZSAxOnJldHVybiBlO2Nhc2UgMjpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLDAsMyk7Y2FzZSAzOnJldHVybiBuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksMCwyKTtjYXNlIDQ6cmV0dXJuIG5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSwwLDEpO2Nhc2UgNTpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLTEsMTEsMzEpO2Nhc2UgNjpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLTEsMTEsMzApfX1mdW5jdGlvbiBtKGUpe3ZhciB0PWZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByPW5ldyBEYXRlKGUuZ2V0VGltZSgpKTt0PjA7KXt2YXIgbj1rdChyLmdldEZ1bGxZZWFyKCkpLG89ci5nZXRNb250aCgpLGE9KG4/UHQ6VHQpW29dO2lmKCEodD5hLXIuZ2V0RGF0ZSgpKSlyZXR1cm4gci5zZXREYXRlKHIuZ2V0RGF0ZSgpK3QpLHI7dC09YS1yLmdldERhdGUoKSsxLHIuc2V0RGF0ZSgxKSxvPDExP3Iuc2V0TW9udGgobysxKTooci5zZXRNb250aCgwKSxyLnNldEZ1bGxZZWFyKHIuZ2V0RnVsbFllYXIoKSsxKSl9cmV0dXJuIHJ9KG5ldyBEYXRlKGUudG1feWVhcisxOTAwLDAsMSksZS50bV95ZGF5KSxyPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSwwLDQpLG49bmV3IERhdGUodC5nZXRGdWxsWWVhcigpKzEsMCw0KSxvPWgociksYT1oKG4pO3JldHVybiBwKG8sdCk8PTA/cChhLHQpPD0wP3QuZ2V0RnVsbFllYXIoKSsxOnQuZ2V0RnVsbFllYXIoKTp0LmdldEZ1bGxZZWFyKCktMX12YXIgeT17IiVhIjpmdW5jdGlvbihlKXtyZXR1cm4gY1tlLnRtX3dkYXldLnN1YnN0cmluZygwLDMpfSwiJUEiOmZ1bmN0aW9uKGUpe3JldHVybiBjW2UudG1fd2RheV19LCIlYiI6ZnVuY3Rpb24oZSl7cmV0dXJuIGxbZS50bV9tb25dLnN1YnN0cmluZygwLDMpfSwiJUIiOmZ1bmN0aW9uKGUpe3JldHVybiBsW2UudG1fbW9uXX0sIiVDIjpmdW5jdGlvbihlKXtyZXR1cm4gZigoZS50bV95ZWFyKzE5MDApLzEwMHwwLDIpfSwiJWQiOmZ1bmN0aW9uKGUpe3JldHVybiBmKGUudG1fbWRheSwyKX0sIiVlIjpmdW5jdGlvbihlKXtyZXR1cm4gZChlLnRtX21kYXksMiwiICIpfSwiJWciOmZ1bmN0aW9uKGUpe3JldHVybiBtKGUpLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDIpfSwiJUciOmZ1bmN0aW9uKGUpe3JldHVybiBtKGUpfSwiJUgiOmZ1bmN0aW9uKGUpe3JldHVybiBmKGUudG1faG91ciwyKX0sIiVJIjpmdW5jdGlvbihlKXt2YXIgdD1lLnRtX2hvdXI7cmV0dXJuIDA9PXQ/dD0xMjp0PjEyJiYodC09MTIpLGYodCwyKX0sIiVqIjpmdW5jdGlvbihlKXtyZXR1cm4gZihlLnRtX21kYXkrZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9MCxuPTA7bjw9dDtyKz1lW24rK10pO3JldHVybiByfShrdChlLnRtX3llYXIrMTkwMCk/UHQ6VHQsZS50bV9tb24tMSksMyl9LCIlbSI6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZS50bV9tb24rMSwyKX0sIiVNIjpmdW5jdGlvbihlKXtyZXR1cm4gZihlLnRtX21pbiwyKX0sIiVuIjpmdW5jdGlvbigpe3JldHVybiJcbiJ9LCIlcCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG1faG91cj49MCYmZS50bV9ob3VyPDEyPyJBTSI6IlBNIn0sIiVTIjpmdW5jdGlvbihlKXtyZXR1cm4gZihlLnRtX3NlYywyKX0sIiV0IjpmdW5jdGlvbigpe3JldHVybiJcdCJ9LCIldSI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG1fd2RheXx8N30sIiVVIjpmdW5jdGlvbihlKXt2YXIgdD1lLnRtX3lkYXkrNy1lLnRtX3dkYXk7cmV0dXJuIGYoTWF0aC5mbG9vcih0LzcpLDIpfSwiJVYiOmZ1bmN0aW9uKGUpe3ZhciB0PU1hdGguZmxvb3IoKGUudG1feWRheSs3LShlLnRtX3dkYXkrNiklNykvNyk7aWYoKGUudG1fd2RheSszNzEtZS50bV95ZGF5LTIpJTc8PTImJnQrKyx0KXtpZig1Mz09dCl7dmFyIHI9KGUudG1fd2RheSszNzEtZS50bV95ZGF5KSU3OzQ9PXJ8fDM9PXImJmt0KGUudG1feWVhcil8fCh0PTEpfX1lbHNle3Q9NTI7dmFyIG49KGUudG1fd2RheSs3LWUudG1feWRheS0xKSU3Oyg0PT1ufHw1PT1uJiZrdChlLnRtX3llYXIlNDAwLTEpKSYmdCsrfXJldHVybiBmKHQsMil9LCIldyI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG1fd2RheX0sIiVXIjpmdW5jdGlvbihlKXt2YXIgdD1lLnRtX3lkYXkrNy0oZS50bV93ZGF5KzYpJTc7cmV0dXJuIGYoTWF0aC5mbG9vcih0LzcpLDIpfSwiJXkiOmZ1bmN0aW9uKGUpe3JldHVybihlLnRtX3llYXIrMTkwMCkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMil9LCIlWSI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG1feWVhcisxOTAwfSwiJXoiOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG1fZ210b2ZmLHI9dD49MDtyZXR1cm4gdD0odD1NYXRoLmFicyh0KS82MCkvNjAqMTAwK3QlNjAsKHI/IisiOiItIikrU3RyaW5nKCIwMDAwIit0KS5zbGljZSgtNCl9LCIlWiI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUudG1fem9uZX0sIiUlIjpmdW5jdGlvbigpe3JldHVybiIlIn19O2Zvcih2YXIgdSBpbiBpPWkucmVwbGFjZSgvJSUvZywiXDBcMCIpLHkpaS5pbmNsdWRlcyh1KSYmKGk9aS5yZXBsYWNlKG5ldyBSZWdFeHAodSwiZyIpLHlbdV0oYSkpKTt2YXIgZz15dChpPWkucmVwbGFjZSgvXDBcMC9nLCIlIiksITEpO3JldHVybiBnLmxlbmd0aD50PzA6KGZ1bmN0aW9uKGUsdCl7di5zZXQoZSx0KX0oZyxlKSxnLmxlbmd0aC0xKX0oZSx0LHIsbil9fSxGdD1mdW5jdGlvbigpe3ZhciB0PXthOkN0fTtmdW5jdGlvbiBuKHQscil7dmFyIG4sbyxhPXQuZXhwb3J0cztlLmFzbT1hLG49ZS5hc20uc2EuYnVmZmVyLG09bixlLkhFQVA4PXY9bmV3IEludDhBcnJheShuKSxlLkhFQVAxNj1nPW5ldyBJbnQxNkFycmF5KG4pLGUuSEVBUDMyPUU9bmV3IEludDMyQXJyYXkobiksZS5IRUFQVTg9eT1uZXcgVWludDhBcnJheShuKSxlLkhFQVBVMTY9dz1uZXcgVWludDE2QXJyYXkobiksZS5IRUFQVTMyPV89bmV3IFVpbnQzMkFycmF5KG4pLGUuSEVBUEYzMj1iPW5ldyBGbG9hdDMyQXJyYXkobiksZS5IRUFQRjY0PWs9bmV3IEZsb2F0NjRBcnJheShuKSxGPWUuYXNtLnlhLG89ZS5hc20udGEsTy51bnNoaWZ0KG8pLFcoKX1pZihCKCksZS5pbnN0YW50aWF0ZVdhc20pdHJ5e3JldHVybiBlLmluc3RhbnRpYXRlV2FzbSh0LG4pfWNhdGNoKGUpe2QoIk1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICIrZSkscihlKX1yZXR1cm4gbihmdW5jdGlvbihlLHQpe3ZhciByLG4sbzt0cnl7bz1mdW5jdGlvbihlKXt0cnl7aWYoZT09TSYmZilyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZik7dGhyb3cic3luYyBmZXRjaGluZyBvZiB0aGUgd2FzbSBmYWlsZWQ6IHlvdSBjYW4gcHJlbG9hZCBpdCB0byBNb2R1bGVbJ3dhc21CaW5hcnknXSBtYW51YWxseSwgb3IgZW1jYy5weSB3aWxsIGRvIHRoYXQgZm9yIHlvdSB3aGVuIGdlbmVyYXRpbmcgSFRNTCAoYnV0IG5vdCBKUykifWNhdGNoKGUpe0woZSl9fShlKSxuPW5ldyBXZWJBc3NlbWJseS5Nb2R1bGUobykscj1uZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2Uobix0KX1jYXRjaChlKXt2YXIgYT1lLnRvU3RyaW5nKCk7dGhyb3cgZCgiZmFpbGVkIHRvIGNvbXBpbGUgd2FzbSBtb2R1bGU6ICIrYSksKGEuaW5jbHVkZXMoImltcG9ydGVkIE1lbW9yeSIpfHxhLmluY2x1ZGVzKCJtZW1vcnkgaW1wb3J0IikpJiZkKCJNZW1vcnkgc2l6ZSBpbmNvbXBhdGliaWxpdHkgaXNzdWVzIG1heSBiZSBkdWUgdG8gY2hhbmdpbmcgSU5JVElBTF9NRU1PUlkgYXQgcnVudGltZSB0byBzb21ldGhpbmcgdG9vIGxhcmdlLiBVc2UgQUxMT1dfTUVNT1JZX0dST1dUSCB0byBhbGxvdyBhbnkgc2l6ZSBtZW1vcnkgKGFuZCBhbHNvIG1ha2Ugc3VyZSBub3QgdG8gc2V0IElOSVRJQUxfTUVNT1JZIGF0IHJ1bnRpbWUgdG8gc29tZXRoaW5nIHNtYWxsZXIgdGhhbiBpdCB3YXMgYXQgY29tcGlsZSB0aW1lKS4iKSxlfXJldHVybltyLG5dfShNLHQpWzBdKSxlLmFzbX0oKSxNdD0oZS5fX193YXNtX2NhbGxfY3RvcnM9RnQudGEsZS5fZnJlZT1GdC51YSksQXQ9ZS5fbWFsbG9jPUZ0LnZhLCR0PWUuX19fZ2V0VHlwZU5hbWU9RnQud2EseHQ9KGUuX19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncz1GdC54YSxlLl9lbXNjcmlwdGVuX2J1aWx0aW5fbWVtYWxpZ249RnQuemEpLFJ0PWUuX3NldFRocmV3PUZ0LkFhLE90PWUuc2V0VGVtcFJldDA9RnQuQmEsanQ9ZS5zdGFja1NhdmU9RnQuQ2EsSXQ9ZS5zdGFja1Jlc3RvcmU9RnQuRGEsenQ9ZS5fX19jeGFfZnJlZV9leGNlcHRpb249RnQuRWEsTnQ9ZS5fX19jeGFfY2FuX2NhdGNoPUZ0LkZhLEJ0PWUuX19fY3hhX2lzX3BvaW50ZXJfdHlwZT1GdC5HYSxXdD1lLmR5bkNhbGxfaj1GdC5IYSxMdD0oZS5keW5DYWxsX2pqaj1GdC5JYSxlLmR5bkNhbGxfaWlpaj1GdC5KYSk7ZnVuY3Rpb24gVXQocil7ZnVuY3Rpb24gbigpe0R0fHwoRHQ9ITAsZS5jYWxsZWRSdW49ITAscHx8KGUubm9GU0luaXR8fF90LmluaXQuaW5pdGlhbGl6ZWR8fF90LmluaXQoKSxfdC5pZ25vcmVQZXJtaXNzaW9ucz0hMSxndC5pbml0KCksVShPKSx0KGUpLGUub25SdW50aW1lSW5pdGlhbGl6ZWQmJmUub25SdW50aW1lSW5pdGlhbGl6ZWQoKSxmdW5jdGlvbigpe2lmKGUucG9zdFJ1bilmb3IoImZ1bmN0aW9uIj09dHlwZW9mIGUucG9zdFJ1biYmKGUucG9zdFJ1bj1bZS5wb3N0UnVuXSk7ZS5wb3N0UnVuLmxlbmd0aDspdD1lLnBvc3RSdW4uc2hpZnQoKSxqLnVuc2hpZnQodCk7dmFyIHQ7VShqKX0oKSkpfXI9cnx8cyxJPjB8fChmdW5jdGlvbigpe2lmKGUucHJlUnVuKWZvcigiZnVuY3Rpb24iPT10eXBlb2YgZS5wcmVSdW4mJihlLnByZVJ1bj1bZS5wcmVSdW5dKTtlLnByZVJ1bi5sZW5ndGg7KXQ9ZS5wcmVSdW4uc2hpZnQoKSxSLnVuc2hpZnQodCk7dmFyIHQ7VShSKX0oKSxJPjB8fChlLnNldFN0YXR1cz8oZS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3NldFRpbWVvdXQoKGZ1bmN0aW9uKCl7ZS5zZXRTdGF0dXMoIiIpfSksMSksbigpfSksMSkpOm4oKSkpfWlmKGUuZHluQ2FsbF9qaWppPUZ0LkthLGUuZHluQ2FsbF92aWlqaWk9RnQuTGEsZS5keW5DYWxsX2lpaWlpaj1GdC5NYSxlLmR5bkNhbGxfaWlpaWlqaj1GdC5OYSxlLmR5bkNhbGxfaWlpaWlpamo9RnQuT2EsTj1mdW5jdGlvbiBlKCl7RHR8fFV0KCksRHR8fChOPWUpfSxlLnByZUluaXQpZm9yKCJmdW5jdGlvbiI9PXR5cGVvZiBlLnByZUluaXQmJihlLnByZUluaXQ9W2UucHJlSW5pdF0pO2UucHJlSW5pdC5sZW5ndGg+MDspZS5wcmVJbml0LnBvcCgpKCk7cmV0dXJuIFV0KCksZX0pO2NvbnN0IHM9aTt2YXIgdT1udWxsLGM9bnVsbCxsPW51bGwsZD0iIjtjb25zdCBmPWFzeW5jKCk9PntlKGMsbCxudWxsLHUpLGNsb3NlKCl9O28uc2V0TG9nZ2VyTGV2ZWwoMiksby5zZXRMb2dnZXJUYWcoInNlbHBoaS13b3JrZXItZW5naW5lIiksc2VsZi5vbm1lc3NhZ2U9cj0+e3N3aXRjaChyLmRhdGEuY21kKXtjYXNlInByZUluaXQiOihhc3luYyBlPT57by5wcmludERlYnVnKCJSZWNlaXZlZCBtZXNzYWdlIGluIHByZUluaXQgZXZlbnQiKSxkPWUuYnVuZGxlUGF0aDt0cnl7bGV0IGU9YXdhaXQoYXdhaXQgZmV0Y2goZCsiL0ZQaGlFeHRyYWN0b3Iud2FzbSIpKS5hcnJheUJ1ZmZlcigpLHQ9bmV3IFdlYkFzc2VtYmx5Lk1lbW9yeSh7aW5pdGlhbDoxLG1heGltdW06NDA5Nn0pO3U9YXdhaXQgcyh7d2FzbUJpbmFyeTplLHdhc21NZW1vcnk6dCxvblJ1bnRpbWVJbml0aWFsaXplZDooKT0+c2VsZi5wb3N0TWVzc2FnZSh7Y21kOiJyZWFkeSJ9KX0pLG8ucHJpbnREZWJ1ZygiUHJlbG9hZGluZyB3YXNtIG1vZHVsZSBmcm9tIHBhdGg6ICIrZCsiL0ZQaGlFeHRyYWN0b3Iud2FzbSIpfWNhdGNoKGUpe2UgaW5zdGFuY2VvZiBSYW5nZUVycm9yP28ucHJpbnRFcnJvcigiSXQgbG9va3MgbGlrZSB5b3UgaGF2ZSB0cmllZCB0byBpbnN0YW50aWF0ZSBtb3JlIG1lbW9yeSB0aGFuIHRoZSBkZXZpY2UgaXMgYWxsb3dpbmcsIHRoaXMgbWF5IG1lYW4gdGhhdCBub3QgZW5vdWdoIG1lbW9yeSBoYXMgYmVlbiBhbGxvY2F0ZWQgdG8gdGhlIGJyb3dzZXIgdGFiIG9yIHRoYXQgdGhlIHdlYiBhcHBsaWNhdGlvbiBpcyBjb25zdW1pbmcgbW9yZSByZXNvdXJjZXMgdGhhbiBleHBlY3RlZC4iKTplIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuTGlua0Vycm9yP28ucHJpbnRFcnJvcigiSXQgaGFzIGJlZW4gZGV0ZWN0ZWQgdGhhdCB0aGUgcmVzb3VyY2UgYnVuZGxlIGRlbGl2ZXJlZCB3aXRoIHRoaXMgdmVyc2lvbiBpcyBub3QgYmVpbmcgdXNlZC4gUGxlYXNlIGNoZWNrIHRoZSB5YXJuLmxvY2sgb3IgcGFja2FnZS1sb2NrLmpzb24gZmlsZSBvZiB0aGUgcHJvamVjdCBpbiBjYXNlIHlvdSBhcmUgdXNpbmcgdGhlIFdlYiBTREssIG90aGVyd2lzZSBtYW51YWxseSB1cGRhdGUgdGhlIHJlc291cmNlIGRpcmVjdG9yeSBhbmQgdHJ5IGFnYWluLiIpOm8ucHJpbnRFcnJvcigiW1dvcmtlcl06ICIrZSl9fSkoci5kYXRhKTticmVhaztjYXNlImluaXQiOihhc3luYyB0PT57bGV0IHI9dC5taW5JT0Q7dHJ5e2xldCB0PW5ldyB1LkV4dHJhY3RvckNvbmZpZ3VyYXRpb25NYW5hZ2VyO3Quc2V0TWluaW11bURpc3RhbmNlQmV0d2VlbkV5ZXNBbGxvd2VkKHIpLHQuc2V0SW1hZ2VRdWFsaXR5RmlsdGVyKHUuSW1hZ2VRdWFsaXR5RmlsdGVyLk1lZGl1bSksdC5zZXRQYXR0ZXJuUXVhbGl0eUZpbHRlcih1LlBhdHRlcm5RdWFsaXR5RmlsdGVyLk1lZGl1bSksYz1uZXcgdS5FeHRyYWN0b3IodCksZSh0KSxvLnByaW50RGVidWcoIlNlbHBoaSBFeHRyYWN0b3IgSW5zdGFuY2VkIiksc2VsZi5wb3N0TWVzc2FnZSh7Y21kOiJpbml0In0pfWNhdGNoKGUpe28ucHJpbnRFcnJvcihlKX19KShyLmRhdGEpO2JyZWFrO2Nhc2UidG9rZW5pemUiOihhc3luYyB0PT57bGV0IHI9e2NtZDoidG9rZW5pemUifTtvLnByaW50RGVidWcoIlJlY2VpdmVkIG1lc3NhZ2UgaW4gdG9rZW5pemUgZXZlbnQiKTtsZXQgbj10LmRhdGEsYT10LmRhdGEubGVuZ3RoLGk9bmV3IHUuRXh0cmFjdG9yLHM9bmV3IHUuVmVjdG9yVWNoYXI7Zm9yKGxldCBlPTA7ZTxhO2UrKylzLnB1c2hfYmFjayhuLmNoYXJDb2RlQXQoZSkpO2xldCBjPWkudG9rZW5pemUocyk7ci5kYXRhPWJ0b2EoKGU9PntsZXQgdD1bXTtmb3IobGV0IHI9MDtyPGUubGVuZ3RoO3IrPTMyNzY4KXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZS5zdWJhcnJheShyLHIrMzI3NjgpKSk7cmV0dXJuIHQuam9pbigiIil9KSh1LmdldEJ5dGVzKGMpKSksZShzLGMsaSksby5wcmludERlYnVnKCJTZW50IG1lc3NhZ2UgZnJvbSB0b2tlbml6ZSBldmVudCIpLHNlbGYucG9zdE1lc3NhZ2UociksYXdhaXQgZigpfSkoci5kYXRhKTticmVhaztjYXNlImRldGVjdCI6KGFzeW5jIHI9PntsZXQgbj17Y21kOiJkZXRlY3QifTtvLnByaW50RGVidWcoIlJlY2VpdmVkIG1lc3NhZ2UgaW4gZGV0ZWN0IGV2ZW50Iik7bGV0IGE9dS5JbWFnZS5nZXRGUGhpSW1hZ2Uoci5kYXRhLHIuaGVpZ2h0LHIud2lkdGgsdS5JbWFnZUZvcm1hdC5SR0JBXzMyYnBwKSxpPWMuZGV0ZWN0KGEpLHM9bnVsbDtpJiYocz1pLmdldCgwKSxuPXQodSxuLHMpKSxlKHMsYSxpKSxvLnByaW50RGVidWcoIlNlbnQgbWVzc2FnZSBmcm9tIGRldGVjdCBldmVudCIpLHNlbGYucG9zdE1lc3NhZ2Uobil9KShyLmRhdGEpO2JyZWFrO2Nhc2UiaW5pdFN0cmVhbUV4dHJhY3Rpb24iOihhc3luYyB0PT57Yy5zdG9wU3RyZWFtRXh0cmFjdGlvbigpLG8ucHJpbnREZWJ1ZygiUmVjZWl2ZWQgbWVzc2FnZSBpbiBpbml0U3RyZWFtRXh0cmFjdGlvbiBldmVudCIpO2xldCByPW51bGwsbj1uZXcgdS5FeHRyYWN0aW9uT3B0aW9ucztyPTE9PT10LmV4dHJhY3Rpb25Nb2RlP3UuRXh0cmFjdGlvbk1vZGUuUmVnaXN0ZXI6dS5FeHRyYWN0aW9uTW9kZS5BdXRoZW50aWNhdGUsbi5zZXRFeHRyYWN0aW9uTW9kZShyKSxuLnNldFJhd1RlbXBsYXRlcygxKSxjLmluaXRTdHJlYW1FeHRyYWN0aW9uU21hcnRXaXRoRXh0cmFjdGlvbk9wdGlvbnMobiksZShuLHIpLG8ucHJpbnREZWJ1ZygiU2VudCBtZXNzYWdlIGZyb20gaW5pdFN0cmVhbUV4dHJhY3Rpb24gZXZlbnQiKSxzZWxmLnBvc3RNZXNzYWdlKHtjbWQ6ImluaXRTdHJlYW1FeHRyYWN0aW9uIn0pfSkoci5kYXRhKTticmVhaztjYXNlImV4dHJhY3ROZXh0U21hcnQiOihhc3luYyByPT57bGV0IG49e2NtZDoiZXh0cmFjdE5leHRTbWFydCJ9O28ucHJpbnREZWJ1ZygiUmVjZWl2ZWQgbWVzc2FnZSBpbiBleHRyYWN0TmV4dFNtYXJ0IGV2ZW50Iik7bGV0IGE9dS5JbWFnZS5nZXRGUGhpSW1hZ2Uoci5kYXRhLHIuaGVpZ2h0LHIud2lkdGgsdS5JbWFnZUZvcm1hdC5SR0JBXzMyYnBwKSxpPWMuZXh0cmFjdE5leHRTbWFydChhKTtudWxsIT09bCYmbC5kZWxldGUoKSxsPWksbj10KHUsbixpKSxlKGEpLG8ucHJpbnREZWJ1ZygiU2VudCBtZXNzYWdlIGZyb20gZXh0cmFjdE5leHRTbWFydCBldmVudCIpLHNlbGYucG9zdE1lc3NhZ2Uobil9KShyLmRhdGEpO2JyZWFrO2Nhc2UiaW5pdExpdmVuZXNzTW92ZVN0YWJpbGl6YXRpb24iOihhc3luYygpPT57by5wcmludERlYnVnKCJSZWNlaXZlZCBtZXNzYWdlIGluIGluaXRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIGV2ZW50IiksYy5pbml0TGl2ZW5lc3NITUNDU3RhYmlsaXphdGlvbigpLG8ucHJpbnREZWJ1ZygiU2VudCBtZXNzYWdlIGZyb20gaW5pdExpdmVuZXNzTW92ZVN0YWJpbGl6YXRpb24gZXZlbnQiKSxzZWxmLnBvc3RNZXNzYWdlKHtjbWQ6ImluaXRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIn0pfSkoci5kYXRhKTticmVhaztjYXNlIm5leHRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIjooYXN5bmMgcj0+e2xldCBuPXtjbWQ6Im5leHRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIn07by5wcmludERlYnVnKCJSZWNlaXZlZCBtZXNzYWdlIGluIG5leHRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIGV2ZW50Iik7bGV0IGE9dS5JbWFnZS5nZXRGUGhpSW1hZ2Uoci5kYXRhLHIuaGVpZ2h0LHIud2lkdGgsdS5JbWFnZUZvcm1hdC5SR0JBXzMyYnBwKSxpPWMubmV4dExpdmVuZXNzSE1DQ1N0YWJpbGl6YXRpb24oYSxwZXJmb3JtYW5jZS5ub3coKSk7bnVsbCE9PWwmJmwuZGVsZXRlKCksbD1pLG49dCh1LG4saSksbi5mYWNlU3RhYmlsaXplZD1pLmdldEZhY2VTdGFiaWxpemVkU3RhdHVzKCksZShhKSxvLnByaW50RGVidWcoIlNlbnQgbWVzc2FnZSBmcm9tIG5leHRMaXZlbmVzc01vdmVTdGFiaWxpemF0aW9uIGV2ZW50Iiksc2VsZi5wb3N0TWVzc2FnZShuKX0pKHIuZGF0YSk7YnJlYWs7Y2FzZSJ2ZXJzaW9uIjooYXN5bmMoKT0+e2xldCBlPXtjbWQ6InZlcnNpb24ifTtlLnZlcnNpb249dS5FeHRyYWN0b3IuZ2V0VmVyc2lvbigpLHNlbGYucG9zdE1lc3NhZ2UoZSl9KShyLmRhdGEpO2JyZWFrO2Nhc2UiZGVzdHJveSI6ZihyLmRhdGEpO2JyZWFrO2RlZmF1bHQ6by5wcmludERlYnVnKCJVbmtub3cgTWVzc2FnZSIpfX07")], { type: "text/javascript" }))), G));
  }
  async initializeEngine() {
    try {
      this.__worker.postMessage({ cmd: "preInit", licenseKey: this.__licenseKey, bundlePath: this.__engineLocation + "/FPhi.Engine.Facephi" }), await new Promise((e2) => {
        this.__worker.onmessage = (t2) => {
          "ready" === t2.data.cmd && e2();
        };
      }), this.__worker.postMessage({ cmd: "init", minIOD: this.__minIOD }), await new Promise((e2) => {
        this.__worker.onmessage = (t2) => {
          "init" === t2.data.cmd ? this.__worker.postMessage({ cmd: "initLivenessMoveStabilization" }) : "initLivenessMoveStabilization" === t2.data.cmd ? this.__worker.postMessage({ cmd: "initStreamExtraction", extractionMode: 0 }) : "initStreamExtraction" === t2.data.cmd && e2();
        };
      });
    } catch (e2) {
      throw new Error("Fail to initialize the engine!");
    }
  }
  detect(e2) {
    return new Promise((t2) => {
      this.__worker.onmessage = (e3) => {
        "detect" === e3.data.cmd && t2(this.__cleanOutputWorker(e3.data));
      }, this.__worker.postMessage({ cmd: "detect", data: e2.data, width: e2.width, height: e2.height, format: 8 });
    });
  }
  extractionNextSmart(e2) {
    return new Promise((t2) => {
      this.__worker.onmessage = (e3) => {
        "extractNextSmart" === e3.data.cmd && t2(this.__cleanOutputWorker(e3.data));
      }, this.__worker.postMessage({ cmd: "extractNextSmart", data: e2.data, width: e2.width, height: e2.height, format: 8 });
    });
  }
  nextLivenessMoveStabilization(e2) {
    return new Promise((t2) => {
      this.__worker.onmessage = (e3) => {
        "nextLivenessMoveStabilization" === e3.data.cmd && t2(this.__cleanOutputWorker(e3.data));
      }, this.__worker.postMessage({ cmd: "nextLivenessMoveStabilization", data: e2.data, width: e2.width, height: e2.height, format: 8 });
    });
  }
  tokenize(e2) {
    return new Promise((t2) => {
      this.__worker.onmessage = (e3) => {
        "tokenize" === e3.data.cmd && t2(e3.data.data);
      }, this.__worker.postMessage({ cmd: "tokenize", data: e2 });
    });
  }
  getVersion() {
    return new Promise((e2) => {
      this.__worker.onmessage = (t2) => {
        "version" === t2.data.cmd && e2(t2.data.version);
      }, this.__worker.postMessage({ cmd: "version" });
    });
  }
  async finalizeEngine() {
    this.__worker.postMessage({ cmd: "destroy" });
  }
  get __attributes() {
    return { minIOD: { type: "string", property: "__minIOD" }, licenseKey: { type: "string", property: "__licenseKey" }, bundlePath: { type: "string", property: "__engineLocation" } };
  }
  __mapperToRealConfig(e2) {
    for (const [t2, i2] of Object.entries(e2)) void 0 !== this.__attributes[t2] && (this[this.__attributes[t2].property] = i2);
  }
  __cleanOutputWorker(e2) {
    return { sampleDiagnostic: e2.sampleDiagnostic, template: e2.template, templateRaw: e2.templateRaw, face: e2.face, leftEye: e2.leftEye, rightEye: e2.rightEye, templateScore: e2.templateScore, facialScore: e2.facialScore, sunGlassesScore: e2.sunGlassesScore, faceStabilized: e2.faceStabilized };
  }
};
var p = null;
var W = class _W {
  static async __checkWorker(e2) {
    if (!_W.worker) {
      let t2 = _W, i2 = new Worker((null === p && (p = URL.createObjectURL(new Blob([window.atob("dmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTsKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvUnVudGltZS5qcwoKdmFyIE1vZHVsZSA9IChmdW5jdGlvbigpIHsKICB2YXIgX3NjcmlwdERpciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjIDogdW5kZWZpbmVkOwogIAogIHJldHVybiAoCmZ1bmN0aW9uKE1vZHVsZSkgewogIE1vZHVsZSA9IE1vZHVsZSB8fCB7fTsKCnZhciBNb2R1bGU9dHlwZW9mIE1vZHVsZSE9PSJ1bmRlZmluZWQiP01vZHVsZTp7fTt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdH0pO3ZhciBtb2R1bGVPdmVycmlkZXM9e307dmFyIGtleTtmb3Ioa2V5IGluIE1vZHVsZSl7aWYoTW9kdWxlLmhhc093blByb3BlcnR5KGtleSkpe21vZHVsZU92ZXJyaWRlc1trZXldPU1vZHVsZVtrZXldfX12YXIgYXJndW1lbnRzXz1bXTt2YXIgdGhpc1Byb2dyYW09Ii4vdGhpcy5wcm9ncmFtIjt2YXIgcXVpdF89ZnVuY3Rpb24oc3RhdHVzLHRvVGhyb3cpe3Rocm93IHRvVGhyb3d9O3ZhciBFTlZJUk9OTUVOVF9JU19XRUI9dHJ1ZTt2YXIgRU5WSVJPTk1FTlRfSVNfV09SS0VSPWZhbHNlO3ZhciBzY3JpcHREaXJlY3Rvcnk9IiI7ZnVuY3Rpb24gbG9jYXRlRmlsZShwYXRoKXtpZihNb2R1bGVbImxvY2F0ZUZpbGUiXSl7cmV0dXJuIE1vZHVsZVsibG9jYXRlRmlsZSJdKHBhdGgsc2NyaXB0RGlyZWN0b3J5KX1yZXR1cm4gc2NyaXB0RGlyZWN0b3J5K3BhdGh9dmFyIHJlYWRfLHJlYWRBc3luYyxyZWFkQmluYXJ5LHNldFdpbmRvd1RpdGxlO2lmKEVOVklST05NRU5UX0lTX1dFQnx8RU5WSVJPTk1FTlRfSVNfV09SS0VSKXtpZihFTlZJUk9OTUVOVF9JU19XT1JLRVIpe3NjcmlwdERpcmVjdG9yeT1zZWxmLmxvY2F0aW9uLmhyZWZ9ZWxzZSBpZih0eXBlb2YgZG9jdW1lbnQhPT0idW5kZWZpbmVkIiYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCl7c2NyaXB0RGlyZWN0b3J5PWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjfWlmKF9zY3JpcHREaXIpe3NjcmlwdERpcmVjdG9yeT1fc2NyaXB0RGlyfWlmKHNjcmlwdERpcmVjdG9yeS5pbmRleE9mKCJibG9iOiIpIT09MCl7c2NyaXB0RGlyZWN0b3J5PXNjcmlwdERpcmVjdG9yeS5zdWJzdHIoMCxzY3JpcHREaXJlY3RvcnkubGFzdEluZGV4T2YoIi8iKSsxKX1lbHNle3NjcmlwdERpcmVjdG9yeT0iIn17cmVhZF89ZnVuY3Rpb24odXJsKXt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5zZW5kKG51bGwpO3JldHVybiB4aHIucmVzcG9uc2VUZXh0fTtpZihFTlZJUk9OTUVOVF9JU19XT1JLRVIpe3JlYWRCaW5hcnk9ZnVuY3Rpb24odXJsKXt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX19cmVhZEFzeW5jPWZ1bmN0aW9uKHVybCxvbmxvYWQsb25lcnJvcil7dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3Q7eGhyLm9wZW4oIkdFVCIsdXJsLHRydWUpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIub25sb2FkPWZ1bmN0aW9uKCl7aWYoeGhyLnN0YXR1cz09MjAwfHx4aHIuc3RhdHVzPT0wJiZ4aHIucmVzcG9uc2Upe29ubG9hZCh4aHIucmVzcG9uc2UpO3JldHVybn1vbmVycm9yKCl9O3hoci5vbmVycm9yPW9uZXJyb3I7eGhyLnNlbmQobnVsbCl9fXNldFdpbmRvd1RpdGxlPWZ1bmN0aW9uKHRpdGxlKXtkb2N1bWVudC50aXRsZT10aXRsZX19ZWxzZXt9dmFyIG91dD1Nb2R1bGVbInByaW50Il18fGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7dmFyIGVycj1Nb2R1bGVbInByaW50RXJyIl18fGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO2ZvcihrZXkgaW4gbW9kdWxlT3ZlcnJpZGVzKXtpZihtb2R1bGVPdmVycmlkZXMuaGFzT3duUHJvcGVydHkoa2V5KSl7TW9kdWxlW2tleV09bW9kdWxlT3ZlcnJpZGVzW2tleV19fW1vZHVsZU92ZXJyaWRlcz1udWxsO2lmKE1vZHVsZVsiYXJndW1lbnRzIl0pYXJndW1lbnRzXz1Nb2R1bGVbImFyZ3VtZW50cyJdO2lmKE1vZHVsZVsidGhpc1Byb2dyYW0iXSl0aGlzUHJvZ3JhbT1Nb2R1bGVbInRoaXNQcm9ncmFtIl07aWYoTW9kdWxlWyJxdWl0Il0pcXVpdF89TW9kdWxlWyJxdWl0Il07dmFyIHRlbXBSZXQwPTA7dmFyIHNldFRlbXBSZXQwPWZ1bmN0aW9uKHZhbHVlKXt0ZW1wUmV0MD12YWx1ZX07dmFyIHdhc21CaW5hcnk7aWYoTW9kdWxlWyJ3YXNtQmluYXJ5Il0pd2FzbUJpbmFyeT1Nb2R1bGVbIndhc21CaW5hcnkiXTt2YXIgbm9FeGl0UnVudGltZT1Nb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTtpZih0eXBlb2YgV2ViQXNzZW1ibHkhPT0ib2JqZWN0Iil7YWJvcnQoIm5vIG5hdGl2ZSB3YXNtIHN1cHBvcnQgZGV0ZWN0ZWQiKX12YXIgd2FzbU1lbW9yeTt2YXIgQUJPUlQ9ZmFsc2U7dmFyIEVYSVRTVEFUVVM7ZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbix0ZXh0KXtpZighY29uZGl0aW9uKXthYm9ydCgiQXNzZXJ0aW9uIGZhaWxlZDogIit0ZXh0KX19dmFyIFVURjhEZWNvZGVyPXR5cGVvZiBUZXh0RGVjb2RlciE9PSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmOCIpOnVuZGVmaW5lZDtmdW5jdGlvbiBVVEY4QXJyYXlUb1N0cmluZyhoZWFwLGlkeCxtYXhCeXRlc1RvUmVhZCl7dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcFtlbmRQdHJdJiYhKGVuZFB0cj49ZW5kSWR4KSkrK2VuZFB0cjtpZihlbmRQdHItaWR4PjE2JiZoZWFwLnN1YmFycmF5JiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwLnN1YmFycmF5KGlkeCxlbmRQdHIpKX1lbHNle3ZhciBzdHI9IiI7d2hpbGUoaWR4PGVuZFB0cil7dmFyIHUwPWhlYXBbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcFtpZHgrK10mNjM7aWYoKHUwJjIyNCk9PTE5Mil7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKCh1MCYzMSk8PDZ8dTEpO2NvbnRpbnVlfXZhciB1Mj1oZWFwW2lkeCsrXSY2MztpZigodTAmMjQwKT09MjI0KXt1MD0odTAmMTUpPDwxMnx1MTw8Nnx1Mn1lbHNle3UwPSh1MCY3KTw8MTh8dTE8PDEyfHUyPDw2fGhlYXBbaWR4KytdJjYzfWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApfWVsc2V7dmFyIGNoPXUwLTY1NTM2O3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxjaD4+MTAsNTYzMjB8Y2gmMTAyMyl9fX1yZXR1cm4gc3RyfWZ1bmN0aW9uIFVURjhUb1N0cmluZyhwdHIsbWF4Qnl0ZXNUb1JlYWQpe3JldHVybiBwdHI/VVRGOEFycmF5VG9TdHJpbmcoSEVBUFU4LHB0cixtYXhCeXRlc1RvUmVhZCk6IiJ9ZnVuY3Rpb24gc3RyaW5nVG9VVEY4QXJyYXkoc3RyLGhlYXAsb3V0SWR4LG1heEJ5dGVzVG9Xcml0ZSl7aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyM31pZih1PD0xMjcpe2lmKG91dElkeD49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPXV9ZWxzZSBpZih1PD0yMDQ3KXtpZihvdXRJZHgrMT49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTE5Mnx1Pj42O2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfWVsc2V7aWYob3V0SWR4KzM+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT0yNDB8dT4+MTg7aGVhcFtvdXRJZHgrK109MTI4fHU+PjEyJjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fWZ1bmN0aW9uIHN0cmluZ1RvVVRGOChzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSl7cmV0dXJuIHN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSl9ZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEY4KHN0cil7dmFyIGxlbj0wO2Zvcih2YXIgaT0wO2k8c3RyLmxlbmd0aDsrK2kpe3ZhciB1PXN0ci5jaGFyQ29kZUF0KGkpO2lmKHU+PTU1Mjk2JiZ1PD01NzM0Myl1PTY1NTM2KygodSYxMDIzKTw8MTApfHN0ci5jaGFyQ29kZUF0KCsraSkmMTAyMztpZih1PD0xMjcpKytsZW47ZWxzZSBpZih1PD0yMDQ3KWxlbis9MjtlbHNlIGlmKHU8PTY1NTM1KWxlbis9MztlbHNlIGxlbis9NH1yZXR1cm4gbGVufXZhciBVVEYxNkRlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT09InVuZGVmaW5lZCI/bmV3IFRleHREZWNvZGVyKCJ1dGYtMTZsZSIpOnVuZGVmaW5lZDtmdW5jdGlvbiBVVEYxNlRvU3RyaW5nKHB0cixtYXhCeXRlc1RvUmVhZCl7dmFyIGVuZFB0cj1wdHI7dmFyIGlkeD1lbmRQdHI+PjE7dmFyIG1heElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQvMjt3aGlsZSghKGlkeD49bWF4SWR4KSYmSEVBUFUxNltpZHhdKSsraWR4O2VuZFB0cj1pZHg8PDE7aWYoZW5kUHRyLXB0cj4zMiYmVVRGMTZEZWNvZGVyKXtyZXR1cm4gVVRGMTZEZWNvZGVyLmRlY29kZShIRUFQVTguc3ViYXJyYXkocHRyLGVuZFB0cikpfWVsc2V7dmFyIHN0cj0iIjtmb3IodmFyIGk9MDshKGk+PW1heEJ5dGVzVG9SZWFkLzIpOysraSl7dmFyIGNvZGVVbml0PUhFQVAxNltwdHIraSoyPj4xXTtpZihjb2RlVW5pdD09MClicmVhaztzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVVuaXQpfXJldHVybiBzdHJ9fWZ1bmN0aW9uIHN0cmluZ1RvVVRGMTYoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe2lmKG1heEJ5dGVzVG9Xcml0ZT09PXVuZGVmaW5lZCl7bWF4Qnl0ZXNUb1dyaXRlPTIxNDc0ODM2NDd9aWYobWF4Qnl0ZXNUb1dyaXRlPDIpcmV0dXJuIDA7bWF4Qnl0ZXNUb1dyaXRlLT0yO3ZhciBzdGFydFB0cj1vdXRQdHI7dmFyIG51bUNoYXJzVG9Xcml0ZT1tYXhCeXRlc1RvV3JpdGU8c3RyLmxlbmd0aCoyP21heEJ5dGVzVG9Xcml0ZS8yOnN0ci5sZW5ndGg7Zm9yKHZhciBpPTA7aTxudW1DaGFyc1RvV3JpdGU7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7SEVBUDE2W291dFB0cj4+MV09Y29kZVVuaXQ7b3V0UHRyKz0yfUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn1mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjE2KHN0cil7cmV0dXJuIHN0ci5sZW5ndGgqMn1mdW5jdGlvbiBVVEYzMlRvU3RyaW5nKHB0cixtYXhCeXRlc1RvUmVhZCl7dmFyIGk9MDt2YXIgc3RyPSIiO3doaWxlKCEoaT49bWF4Qnl0ZXNUb1JlYWQvNCkpe3ZhciB1dGYzMj1IRUFQMzJbcHRyK2kqND4+Ml07aWYodXRmMzI9PTApYnJlYWs7KytpO2lmKHV0ZjMyPj02NTUzNil7dmFyIGNoPXV0ZjMyLTY1NTM2O3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxjaD4+MTAsNTYzMjB8Y2gmMTAyMyl9ZWxzZXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodXRmMzIpfX1yZXR1cm4gc3RyfWZ1bmN0aW9uIHN0cmluZ1RvVVRGMzIoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe2lmKG1heEJ5dGVzVG9Xcml0ZT09PXVuZGVmaW5lZCl7bWF4Qnl0ZXNUb1dyaXRlPTIxNDc0ODM2NDd9aWYobWF4Qnl0ZXNUb1dyaXRlPDQpcmV0dXJuIDA7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgZW5kUHRyPXN0YXJ0UHRyK21heEJ5dGVzVG9Xcml0ZS00O2Zvcih2YXIgaT0wO2k8c3RyLmxlbmd0aDsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtpZihjb2RlVW5pdD49NTUyOTYmJmNvZGVVbml0PD01NzM0Myl7dmFyIHRyYWlsU3Vycm9nYXRlPXN0ci5jaGFyQ29kZUF0KCsraSk7Y29kZVVuaXQ9NjU1MzYrKChjb2RlVW5pdCYxMDIzKTw8MTApfHRyYWlsU3Vycm9nYXRlJjEwMjN9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9ZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEYzMihzdHIpe3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NH1yZXR1cm4gbGVufXZhciBidWZmZXIsSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVHbG9iYWxCdWZmZXJBbmRWaWV3cyhidWYpe2J1ZmZlcj1idWY7TW9kdWxlWyJIRUFQOCJdPUhFQVA4PW5ldyBJbnQ4QXJyYXkoYnVmKTtNb2R1bGVbIkhFQVAxNiJdPUhFQVAxNj1uZXcgSW50MTZBcnJheShidWYpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQVTgiXT1IRUFQVTg9bmV3IFVpbnQ4QXJyYXkoYnVmKTtNb2R1bGVbIkhFQVBVMTYiXT1IRUFQVTE2PW5ldyBVaW50MTZBcnJheShidWYpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQRjMyIl09SEVBUEYzMj1uZXcgRmxvYXQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQRjY0Il09SEVBUEY2ND1uZXcgRmxvYXQ2NEFycmF5KGJ1Zil9dmFyIElOSVRJQUxfTUVNT1JZPU1vZHVsZVsiSU5JVElBTF9NRU1PUlkiXXx8ODM4ODYwODt2YXIgd2FzbVRhYmxlO3ZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRNQUlOX189W107dmFyIF9fQVRQT1NUUlVOX189W107dmFyIHJ1bnRpbWVJbml0aWFsaXplZD1mYWxzZTtfX0FUSU5JVF9fLnB1c2goe2Z1bmM6ZnVuY3Rpb24oKXtfX193YXNtX2NhbGxfY3RvcnMoKX19KTtmdW5jdGlvbiBwcmVSdW4oKXtpZihNb2R1bGVbInByZVJ1biJdKXtpZih0eXBlb2YgTW9kdWxlWyJwcmVSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInByZVJ1biJdPVtNb2R1bGVbInByZVJ1biJdXTt3aGlsZShNb2R1bGVbInByZVJ1biJdLmxlbmd0aCl7YWRkT25QcmVSdW4oTW9kdWxlWyJwcmVSdW4iXS5zaGlmdCgpKX19Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBSRVJVTl9fKX1mdW5jdGlvbiBpbml0UnVudGltZSgpe3J1bnRpbWVJbml0aWFsaXplZD10cnVlO2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pfWZ1bmN0aW9uIHByZU1haW4oKXtjYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUTUFJTl9fKX1mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpfX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUE9TVFJVTl9fKX1mdW5jdGlvbiBhZGRPblByZVJ1bihjYil7X19BVFBSRVJVTl9fLnVuc2hpZnQoY2IpfWZ1bmN0aW9uIGFkZE9uUG9zdFJ1bihjYil7X19BVFBPU1RSVU5fXy51bnNoaWZ0KGNiKX12YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIHJ1bkRlcGVuZGVuY3lXYXRjaGVyPW51bGw7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpfX1mdW5jdGlvbiByZW1vdmVSdW5EZXBlbmRlbmN5KGlkKXtydW5EZXBlbmRlbmNpZXMtLTtpZihNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXSl7TW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0ocnVuRGVwZW5kZW5jaWVzKX1pZihydW5EZXBlbmRlbmNpZXM9PTApe2lmKHJ1bkRlcGVuZGVuY3lXYXRjaGVyIT09bnVsbCl7Y2xlYXJJbnRlcnZhbChydW5EZXBlbmRlbmN5V2F0Y2hlcik7cnVuRGVwZW5kZW5jeVdhdGNoZXI9bnVsbH1pZihkZXBlbmRlbmNpZXNGdWxmaWxsZWQpe3ZhciBjYWxsYmFjaz1kZXBlbmRlbmNpZXNGdWxmaWxsZWQ7ZGVwZW5kZW5jaWVzRnVsZmlsbGVkPW51bGw7Y2FsbGJhY2soKX19fU1vZHVsZVsicHJlbG9hZGVkSW1hZ2VzIl09e307TW9kdWxlWyJwcmVsb2FkZWRBdWRpb3MiXT17fTtmdW5jdGlvbiBhYm9ydCh3aGF0KXtpZihNb2R1bGVbIm9uQWJvcnQiXSl7TW9kdWxlWyJvbkFib3J0Il0od2hhdCl9d2hhdCs9IiI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7RVhJVFNUQVRVUz0xO3doYXQ9ImFib3J0KCIrd2hhdCsiKS4gQnVpbGQgd2l0aCAtcyBBU1NFUlRJT05TPTEgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9ZnVuY3Rpb24gaGFzUHJlZml4KHN0cixwcmVmaXgpe3JldHVybiBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGg/c3RyLnN0YXJ0c1dpdGgocHJlZml4KTpzdHIuaW5kZXhPZihwcmVmaXgpPT09MH12YXIgZGF0YVVSSVByZWZpeD0iZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LCI7ZnVuY3Rpb24gaXNEYXRhVVJJKGZpbGVuYW1lKXtyZXR1cm4gaGFzUHJlZml4KGZpbGVuYW1lLGRhdGFVUklQcmVmaXgpfXZhciB3YXNtQmluYXJ5RmlsZT0iRkJUb2tlbml6ZXIud2FzbSI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpfWZ1bmN0aW9uIGdldEJpbmFyeShmaWxlKXt0cnl7aWYoZmlsZT09d2FzbUJpbmFyeUZpbGUmJndhc21CaW5hcnkpe3JldHVybiBuZXcgVWludDhBcnJheSh3YXNtQmluYXJ5KX1pZihyZWFkQmluYXJ5KXtyZXR1cm4gcmVhZEJpbmFyeShmaWxlKX1lbHNle3Rocm93InN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkOiB5b3UgY2FuIHByZWxvYWQgaXQgdG8gTW9kdWxlWyd3YXNtQmluYXJ5J10gbWFudWFsbHksIG9yIGVtY2MucHkgd2lsbCBkbyB0aGF0IGZvciB5b3Ugd2hlbiBnZW5lcmF0aW5nIEhUTUwgKGJ1dCBub3QgSlMpIn19Y2F0Y2goZXJyKXthYm9ydChlcnIpfX1mdW5jdGlvbiBpbnN0YW50aWF0ZVN5bmMoZmlsZSxpbmZvKXt2YXIgaW5zdGFuY2U7dmFyIG1vZHVsZTt2YXIgYmluYXJ5O3RyeXtiaW5hcnk9Z2V0QmluYXJ5KGZpbGUpO21vZHVsZT1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKGJpbmFyeSk7aW5zdGFuY2U9bmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG1vZHVsZSxpbmZvKX1jYXRjaChlKXt2YXIgc3RyPWUudG9TdHJpbmcoKTtlcnIoImZhaWxlZCB0byBjb21waWxlIHdhc20gbW9kdWxlOiAiK3N0cik7aWYoc3RyLmluZGV4T2YoImltcG9ydGVkIE1lbW9yeSIpPj0wfHxzdHIuaW5kZXhPZigibWVtb3J5IGltcG9ydCIpPj0wKXtlcnIoIk1lbW9yeSBzaXplIGluY29tcGF0aWJpbGl0eSBpc3N1ZXMgbWF5IGJlIGR1ZSB0byBjaGFuZ2luZyBJTklUSUFMX01FTU9SWSBhdCBydW50aW1lIHRvIHNvbWV0aGluZyB0b28gbGFyZ2UuIFVzZSBBTExPV19NRU1PUllfR1JPV1RIIHRvIGFsbG93IGFueSBzaXplIG1lbW9yeSAoYW5kIGFsc28gbWFrZSBzdXJlIG5vdCB0byBzZXQgSU5JVElBTF9NRU1PUlkgYXQgcnVudGltZSB0byBzb21ldGhpbmcgc21hbGxlciB0aGFuIGl0IHdhcyBhdCBjb21waWxlIHRpbWUpLiIpfXRocm93IGV9cmV0dXJuW2luc3RhbmNlLG1vZHVsZV19ZnVuY3Rpb24gY3JlYXRlV2FzbSgpe3ZhciBpbmZvPXsiYSI6YXNtTGlicmFyeUFyZ307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7dmFyIGV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0cztNb2R1bGVbImFzbSJdPWV4cG9ydHM7d2FzbU1lbW9yeT1Nb2R1bGVbImFzbSJdWyJCIl07dXBkYXRlR2xvYmFsQnVmZmVyQW5kVmlld3Mod2FzbU1lbW9yeS5idWZmZXIpO3dhc21UYWJsZT1Nb2R1bGVbImFzbSJdWyJFIl07cmVtb3ZlUnVuRGVwZW5kZW5jeSgid2FzbS1pbnN0YW50aWF0ZSIpfWFkZFJ1bkRlcGVuZGVuY3koIndhc20taW5zdGFudGlhdGUiKTtpZihNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKXt0cnl7dmFyIGV4cG9ydHM9TW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXShpbmZvLHJlY2VpdmVJbnN0YW5jZSk7cmV0dXJuIGV4cG9ydHN9Y2F0Y2goZSl7ZXJyKCJNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiAiK2UpO3JldHVybiBmYWxzZX19dmFyIHJlc3VsdD1pbnN0YW50aWF0ZVN5bmMod2FzbUJpbmFyeUZpbGUsaW5mbyk7cmVjZWl2ZUluc3RhbmNlKHJlc3VsdFswXSxyZXN1bHRbMV0pO3JldHVybiBNb2R1bGVbImFzbSJdfWZ1bmN0aW9uIGNhbGxSdW50aW1lQ2FsbGJhY2tzKGNhbGxiYWNrcyl7d2hpbGUoY2FsbGJhY2tzLmxlbmd0aD4wKXt2YXIgY2FsbGJhY2s9Y2FsbGJhY2tzLnNoaWZ0KCk7aWYodHlwZW9mIGNhbGxiYWNrPT0iZnVuY3Rpb24iKXtjYWxsYmFjayhNb2R1bGUpO2NvbnRpbnVlfXZhciBmdW5jPWNhbGxiYWNrLmZ1bmM7aWYodHlwZW9mIGZ1bmM9PT0ibnVtYmVyIil7aWYoY2FsbGJhY2suYXJnPT09dW5kZWZpbmVkKXt3YXNtVGFibGUuZ2V0KGZ1bmMpKCl9ZWxzZXt3YXNtVGFibGUuZ2V0KGZ1bmMpKGNhbGxiYWNrLmFyZyl9fWVsc2V7ZnVuYyhjYWxsYmFjay5hcmc9PT11bmRlZmluZWQ/bnVsbDpjYWxsYmFjay5hcmcpfX19dmFyIEV4Y2VwdGlvbkluZm9BdHRycz17REVTVFJVQ1RPUl9PRkZTRVQ6MCxSRUZDT1VOVF9PRkZTRVQ6NCxUWVBFX09GRlNFVDo4LENBVUdIVF9PRkZTRVQ6MTIsUkVUSFJPV05fT0ZGU0VUOjEzLFNJWkU6MTZ9O2Z1bmN0aW9uIF9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24oc2l6ZSl7cmV0dXJuIF9tYWxsb2Moc2l6ZStFeGNlcHRpb25JbmZvQXR0cnMuU0laRSkrRXhjZXB0aW9uSW5mb0F0dHJzLlNJWkV9ZnVuY3Rpb24gRXhjZXB0aW9uSW5mbyhleGNQdHIpe3RoaXMuZXhjUHRyPWV4Y1B0cjt0aGlzLnB0cj1leGNQdHItRXhjZXB0aW9uSW5mb0F0dHJzLlNJWkU7dGhpcy5zZXRfdHlwZT1mdW5jdGlvbih0eXBlKXtIRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlRZUEVfT0ZGU0VUPj4yXT10eXBlfTt0aGlzLmdldF90eXBlPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVAzMlt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuVFlQRV9PRkZTRVQ+PjJdfTt0aGlzLnNldF9kZXN0cnVjdG9yPWZ1bmN0aW9uKGRlc3RydWN0b3Ipe0hFQVAzMlt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuREVTVFJVQ1RPUl9PRkZTRVQ+PjJdPWRlc3RydWN0b3J9O3RoaXMuZ2V0X2Rlc3RydWN0b3I9ZnVuY3Rpb24oKXtyZXR1cm4gSEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5ERVNUUlVDVE9SX09GRlNFVD4+Ml19O3RoaXMuc2V0X3JlZmNvdW50PWZ1bmN0aW9uKHJlZmNvdW50KXtIRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml09cmVmY291bnR9O3RoaXMuc2V0X2NhdWdodD1mdW5jdGlvbihjYXVnaHQpe2NhdWdodD1jYXVnaHQ/MTowO0hFQVA4W3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5DQVVHSFRfT0ZGU0VUPj4wXT1jYXVnaHR9O3RoaXMuZ2V0X2NhdWdodD1mdW5jdGlvbigpe3JldHVybiBIRUFQOFt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuQ0FVR0hUX09GRlNFVD4+MF0hPTB9O3RoaXMuc2V0X3JldGhyb3duPWZ1bmN0aW9uKHJldGhyb3duKXtyZXRocm93bj1yZXRocm93bj8xOjA7SEVBUDhbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFVEhST1dOX09GRlNFVD4+MF09cmV0aHJvd259O3RoaXMuZ2V0X3JldGhyb3duPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVA4W3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRVRIUk9XTl9PRkZTRVQ+PjBdIT0wfTt0aGlzLmluaXQ9ZnVuY3Rpb24odHlwZSxkZXN0cnVjdG9yKXt0aGlzLnNldF90eXBlKHR5cGUpO3RoaXMuc2V0X2Rlc3RydWN0b3IoZGVzdHJ1Y3Rvcik7dGhpcy5zZXRfcmVmY291bnQoMCk7dGhpcy5zZXRfY2F1Z2h0KGZhbHNlKTt0aGlzLnNldF9yZXRocm93bihmYWxzZSl9O3RoaXMuYWRkX3JlZj1mdW5jdGlvbigpe3ZhciB2YWx1ZT1IRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml07SEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRUZDT1VOVF9PRkZTRVQ+PjJdPXZhbHVlKzF9O3RoaXMucmVsZWFzZV9yZWY9ZnVuY3Rpb24oKXt2YXIgcHJldj1IRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml07SEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRUZDT1VOVF9PRkZTRVQ+PjJdPXByZXYtMTtyZXR1cm4gcHJldj09PTF9fXZhciBleGNlcHRpb25MYXN0PTA7dmFyIHVuY2F1Z2h0RXhjZXB0aW9uQ291bnQ9MDtmdW5jdGlvbiBfX19jeGFfdGhyb3cocHRyLHR5cGUsZGVzdHJ1Y3Rvcil7dmFyIGluZm89bmV3IEV4Y2VwdGlvbkluZm8ocHRyKTtpbmZvLmluaXQodHlwZSxkZXN0cnVjdG9yKTtleGNlcHRpb25MYXN0PXB0cjt1bmNhdWdodEV4Y2VwdGlvbkNvdW50Kys7dGhyb3cgcHRyfWZ1bmN0aW9uIGdldFNoaWZ0RnJvbVNpemUoc2l6ZSl7c3dpdGNoKHNpemUpe2Nhc2UgMTpyZXR1cm4gMDtjYXNlIDI6cmV0dXJuIDE7Y2FzZSA0OnJldHVybiAyO2Nhc2UgODpyZXR1cm4gMztkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gdHlwZSBzaXplOiAiK3NpemUpfX1mdW5jdGlvbiBlbWJpbmRfaW5pdF9jaGFyQ29kZXMoKXt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpfWVtYmluZF9jaGFyQ29kZXM9Y29kZXN9dmFyIGVtYmluZF9jaGFyQ29kZXM9dW5kZWZpbmVkO2Z1bmN0aW9uIHJlYWRMYXRpbjFTdHJpbmcocHRyKXt2YXIgcmV0PSIiO3ZhciBjPXB0cjt3aGlsZShIRUFQVThbY10pe3JldCs9ZW1iaW5kX2NoYXJDb2Rlc1tIRUFQVThbYysrXV19cmV0dXJuIHJldH12YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgdHlwZURlcGVuZGVuY2llcz17fTt2YXIgY2hhcl8wPTQ4O3ZhciBjaGFyXzk9NTc7ZnVuY3Rpb24gbWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpe2lmKHVuZGVmaW5lZD09PW5hbWUpe3JldHVybiJfdW5rbm93biJ9bmFtZT1uYW1lLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywiJCIpO3ZhciBmPW5hbWUuY2hhckNvZGVBdCgwKTtpZihmPj1jaGFyXzAmJmY8PWNoYXJfOSl7cmV0dXJuIl8iK25hbWV9ZWxzZXtyZXR1cm4gbmFtZX19ZnVuY3Rpb24gY3JlYXRlTmFtZWRGdW5jdGlvbihuYW1lLGJvZHkpe25hbWU9bWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpO3JldHVybiBuZXcgRnVuY3Rpb24oImJvZHkiLCJyZXR1cm4gZnVuY3Rpb24gIituYW1lKyIoKSB7XG4iKycgICAgInVzZSBzdHJpY3QiOycrIiAgICByZXR1cm4gYm9keS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuIisifTtcbiIpKGJvZHkpfWZ1bmN0aW9uIGV4dGVuZEVycm9yKGJhc2VFcnJvclR5cGUsZXJyb3JOYW1lKXt2YXIgZXJyb3JDbGFzcz1jcmVhdGVOYW1lZEZ1bmN0aW9uKGVycm9yTmFtZSxmdW5jdGlvbihtZXNzYWdlKXt0aGlzLm5hbWU9ZXJyb3JOYW1lO3RoaXMubWVzc2FnZT1tZXNzYWdlO3ZhciBzdGFjaz1uZXcgRXJyb3IobWVzc2FnZSkuc3RhY2s7aWYoc3RhY2shPT11bmRlZmluZWQpe3RoaXMuc3RhY2s9dGhpcy50b1N0cmluZygpKyJcbiIrc3RhY2sucmVwbGFjZSgvXkVycm9yKDpbXlxuXSopP1xuLywiIil9fSk7ZXJyb3JDbGFzcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiYXNlRXJyb3JUeXBlLnByb3RvdHlwZSk7ZXJyb3JDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3I9ZXJyb3JDbGFzcztlcnJvckNsYXNzLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe2lmKHRoaXMubWVzc2FnZT09PXVuZGVmaW5lZCl7cmV0dXJuIHRoaXMubmFtZX1lbHNle3JldHVybiB0aGlzLm5hbWUrIjogIit0aGlzLm1lc3NhZ2V9fTtyZXR1cm4gZXJyb3JDbGFzc312YXIgQmluZGluZ0Vycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiB0aHJvd0JpbmRpbmdFcnJvcihtZXNzYWdlKXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKG1lc3NhZ2UpfXZhciBJbnRlcm5hbEVycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiB0aHJvd0ludGVybmFsRXJyb3IobWVzc2FnZSl7dGhyb3cgbmV3IEludGVybmFsRXJyb3IobWVzc2FnZSl9ZnVuY3Rpb24gd2hlbkRlcGVuZGVudFR5cGVzQXJlUmVzb2x2ZWQobXlUeXBlcyxkZXBlbmRlbnRUeXBlcyxnZXRUeXBlQ29udmVydGVycyl7bXlUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpe3R5cGVEZXBlbmRlbmNpZXNbdHlwZV09ZGVwZW5kZW50VHlwZXN9KTtmdW5jdGlvbiBvbkNvbXBsZXRlKHR5cGVDb252ZXJ0ZXJzKXt2YXIgbXlUeXBlQ29udmVydGVycz1nZXRUeXBlQ29udmVydGVycyh0eXBlQ29udmVydGVycyk7aWYobXlUeXBlQ29udmVydGVycy5sZW5ndGghPT1teVR5cGVzLmxlbmd0aCl7dGhyb3dJbnRlcm5hbEVycm9yKCJNaXNtYXRjaGVkIHR5cGUgY29udmVydGVyIGNvdW50Iil9Zm9yKHZhciBpPTA7aTxteVR5cGVzLmxlbmd0aDsrK2kpe3JlZ2lzdGVyVHlwZShteVR5cGVzW2ldLG15VHlwZUNvbnZlcnRlcnNbaV0pfX12YXIgdHlwZUNvbnZlcnRlcnM9bmV3IEFycmF5KGRlcGVuZGVudFR5cGVzLmxlbmd0aCk7dmFyIHVucmVnaXN0ZXJlZFR5cGVzPVtdO3ZhciByZWdpc3RlcmVkPTA7ZGVwZW5kZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihkdCxpKXtpZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkoZHQpKXt0eXBlQ29udmVydGVyc1tpXT1yZWdpc3RlcmVkVHlwZXNbZHRdfWVsc2V7dW5yZWdpc3RlcmVkVHlwZXMucHVzaChkdCk7aWYoIWF3YWl0aW5nRGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KGR0KSl7YXdhaXRpbmdEZXBlbmRlbmNpZXNbZHRdPVtdfWF3YWl0aW5nRGVwZW5kZW5jaWVzW2R0XS5wdXNoKGZ1bmN0aW9uKCl7dHlwZUNvbnZlcnRlcnNbaV09cmVnaXN0ZXJlZFR5cGVzW2R0XTsrK3JlZ2lzdGVyZWQ7aWYocmVnaXN0ZXJlZD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fSl9fSk7aWYoMD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKXtvcHRpb25zPW9wdGlvbnN8fHt9O2lmKCEoImFyZ1BhY2tBZHZhbmNlImluIHJlZ2lzdGVyZWRJbnN0YW5jZSkpe3Rocm93IG5ldyBUeXBlRXJyb3IoInJlZ2lzdGVyVHlwZSByZWdpc3RlcmVkSW5zdGFuY2UgcmVxdWlyZXMgYXJnUGFja0FkdmFuY2UiKX12YXIgbmFtZT1yZWdpc3RlcmVkSW5zdGFuY2UubmFtZTtpZighcmF3VHlwZSl7dGhyb3dCaW5kaW5nRXJyb3IoJ3R5cGUgIicrbmFtZSsnIiBtdXN0IGhhdmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIHR5cGVpZCBwb2ludGVyJyl9aWYocmVnaXN0ZXJlZFR5cGVzLmhhc093blByb3BlcnR5KHJhd1R5cGUpKXtpZihvcHRpb25zLmlnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnMpe3JldHVybn1lbHNle3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnIituYW1lKyInIHR3aWNlIil9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7ZGVsZXRlIHR5cGVEZXBlbmRlbmNpZXNbcmF3VHlwZV07aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNiKXtjYigpfSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wocmF3VHlwZSxuYW1lLHNpemUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpe3ZhciBzaGlmdD1nZXRTaGlmdEZyb21TaXplKHNpemUpO25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZ1bmN0aW9uKHd0KXtyZXR1cm4hIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6OCwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwO2lmKHNpemU9PT0xKXtoZWFwPUhFQVA4fWVsc2UgaWYoc2l6ZT09PTIpe2hlYXA9SEVBUDE2fWVsc2UgaWYoc2l6ZT09PTQpe2hlYXA9SEVBUDMyfWVsc2V7dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBib29sZWFuIHR5cGUgc2l6ZTogIituYW1lKX1yZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oaGVhcFtwb2ludGVyPj5zaGlmdF0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIENsYXNzSGFuZGxlX2lzQWxpYXNPZihvdGhlcil7aWYoISh0aGlzIGluc3RhbmNlb2YgQ2xhc3NIYW5kbGUpKXtyZXR1cm4gZmFsc2V9aWYoIShvdGhlciBpbnN0YW5jZW9mIENsYXNzSGFuZGxlKSl7cmV0dXJuIGZhbHNlfXZhciBsZWZ0Q2xhc3M9dGhpcy4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgbGVmdD10aGlzLiQkLnB0cjt2YXIgcmlnaHRDbGFzcz1vdGhlci4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcmlnaHQ9b3RoZXIuJCQucHRyO3doaWxlKGxlZnRDbGFzcy5iYXNlQ2xhc3Mpe2xlZnQ9bGVmdENsYXNzLnVwY2FzdChsZWZ0KTtsZWZ0Q2xhc3M9bGVmdENsYXNzLmJhc2VDbGFzc313aGlsZShyaWdodENsYXNzLmJhc2VDbGFzcyl7cmlnaHQ9cmlnaHRDbGFzcy51cGNhc3QocmlnaHQpO3JpZ2h0Q2xhc3M9cmlnaHRDbGFzcy5iYXNlQ2xhc3N9cmV0dXJuIGxlZnRDbGFzcz09PXJpZ2h0Q2xhc3MmJmxlZnQ9PT1yaWdodH1mdW5jdGlvbiBzaGFsbG93Q29weUludGVybmFsUG9pbnRlcihvKXtyZXR1cm57Y291bnQ6by5jb3VudCxkZWxldGVTY2hlZHVsZWQ6by5kZWxldGVTY2hlZHVsZWQscHJlc2VydmVQb2ludGVyT25EZWxldGU6by5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSxwdHI6by5wdHIscHRyVHlwZTpvLnB0clR5cGUsc21hcnRQdHI6by5zbWFydFB0cixzbWFydFB0clR5cGU6by5zbWFydFB0clR5cGV9fWZ1bmN0aW9uIHRocm93SW5zdGFuY2VBbHJlYWR5RGVsZXRlZChvYmope2Z1bmN0aW9uIGdldEluc3RhbmNlVHlwZU5hbWUoaGFuZGxlKXtyZXR1cm4gaGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzLm5hbWV9dGhyb3dCaW5kaW5nRXJyb3IoZ2V0SW5zdGFuY2VUeXBlTmFtZShvYmopKyIgaW5zdGFuY2UgYWxyZWFkeSBkZWxldGVkIil9dmFyIGZpbmFsaXphdGlvbkdyb3VwPWZhbHNlO2Z1bmN0aW9uIGRldGFjaEZpbmFsaXplcihoYW5kbGUpe31mdW5jdGlvbiBydW5EZXN0cnVjdG9yKCQkKXtpZigkJC5zbWFydFB0cil7JCQuc21hcnRQdHJUeXBlLnJhd0Rlc3RydWN0b3IoJCQuc21hcnRQdHIpfWVsc2V7JCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3MucmF3RGVzdHJ1Y3RvcigkJC5wdHIpfX1mdW5jdGlvbiByZWxlYXNlQ2xhc3NIYW5kbGUoJCQpeyQkLmNvdW50LnZhbHVlLT0xO3ZhciB0b0RlbGV0ZT0wPT09JCQuY291bnQudmFsdWU7aWYodG9EZWxldGUpe3J1bkRlc3RydWN0b3IoJCQpfX1mdW5jdGlvbiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKXtpZigidW5kZWZpbmVkIj09PXR5cGVvZiBGaW5hbGl6YXRpb25Hcm91cCl7YXR0YWNoRmluYWxpemVyPWZ1bmN0aW9uKGhhbmRsZSl7cmV0dXJuIGhhbmRsZX07cmV0dXJuIGhhbmRsZX1maW5hbGl6YXRpb25Hcm91cD1uZXcgRmluYWxpemF0aW9uR3JvdXAoZnVuY3Rpb24oaXRlcil7Zm9yKHZhciByZXN1bHQ9aXRlci5uZXh0KCk7IXJlc3VsdC5kb25lO3Jlc3VsdD1pdGVyLm5leHQoKSl7dmFyICQkPXJlc3VsdC52YWx1ZTtpZighJCQucHRyKXtjb25zb2xlLndhcm4oIm9iamVjdCBhbHJlYWR5IGRlbGV0ZWQ6ICIrJCQucHRyKX1lbHNle3JlbGVhc2VDbGFzc0hhbmRsZSgkJCl9fX0pO2F0dGFjaEZpbmFsaXplcj1mdW5jdGlvbihoYW5kbGUpe2ZpbmFsaXphdGlvbkdyb3VwLnJlZ2lzdGVyKGhhbmRsZSxoYW5kbGUuJCQsaGFuZGxlLiQkKTtyZXR1cm4gaGFuZGxlfTtkZXRhY2hGaW5hbGl6ZXI9ZnVuY3Rpb24oaGFuZGxlKXtmaW5hbGl6YXRpb25Hcm91cC51bnJlZ2lzdGVyKGhhbmRsZS4kJCl9O3JldHVybiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKX1mdW5jdGlvbiBDbGFzc0hhbmRsZV9jbG9uZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUpe3RoaXMuJCQuY291bnQudmFsdWUrPTE7cmV0dXJuIHRoaXN9ZWxzZXt2YXIgY2xvbmU9YXR0YWNoRmluYWxpemVyKE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLHskJDp7dmFsdWU6c2hhbGxvd0NvcHlJbnRlcm5hbFBvaW50ZXIodGhpcy4kJCl9fSkpO2Nsb25lLiQkLmNvdW50LnZhbHVlKz0xO2Nsb25lLiQkLmRlbGV0ZVNjaGVkdWxlZD1mYWxzZTtyZXR1cm4gY2xvbmV9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkJiYhdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSl7dGhyb3dCaW5kaW5nRXJyb3IoIk9iamVjdCBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgZGVsZXRpb24iKX1kZXRhY2hGaW5hbGl6ZXIodGhpcyk7cmVsZWFzZUNsYXNzSGFuZGxlKHRoaXMuJCQpO2lmKCF0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlKXt0aGlzLiQkLnNtYXJ0UHRyPXVuZGVmaW5lZDt0aGlzLiQkLnB0cj11bmRlZmluZWR9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2lzRGVsZXRlZCgpe3JldHVybiF0aGlzLiQkLnB0cn12YXIgZGVsYXlGdW5jdGlvbj11bmRlZmluZWQ7dmFyIGRlbGV0aW9uUXVldWU9W107ZnVuY3Rpb24gZmx1c2hQZW5kaW5nRGVsZXRlcygpe3doaWxlKGRlbGV0aW9uUXVldWUubGVuZ3RoKXt2YXIgb2JqPWRlbGV0aW9uUXVldWUucG9wKCk7b2JqLiQkLmRlbGV0ZVNjaGVkdWxlZD1mYWxzZTtvYmpbImRlbGV0ZSJdKCl9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZUxhdGVyKCl7aWYoIXRoaXMuJCQucHRyKXt0aHJvd0luc3RhbmNlQWxyZWFkeURlbGV0ZWQodGhpcyl9aWYodGhpcy4kJC5kZWxldGVTY2hlZHVsZWQmJiF0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlKXt0aHJvd0JpbmRpbmdFcnJvcigiT2JqZWN0IGFscmVhZHkgc2NoZWR1bGVkIGZvciBkZWxldGlvbiIpfWRlbGV0aW9uUXVldWUucHVzaCh0aGlzKTtpZihkZWxldGlvblF1ZXVlLmxlbmd0aD09PTEmJmRlbGF5RnVuY3Rpb24pe2RlbGF5RnVuY3Rpb24oZmx1c2hQZW5kaW5nRGVsZXRlcyl9dGhpcy4kJC5kZWxldGVTY2hlZHVsZWQ9dHJ1ZTtyZXR1cm4gdGhpc31mdW5jdGlvbiBpbml0X0NsYXNzSGFuZGxlKCl7Q2xhc3NIYW5kbGUucHJvdG90eXBlWyJpc0FsaWFzT2YiXT1DbGFzc0hhbmRsZV9pc0FsaWFzT2Y7Q2xhc3NIYW5kbGUucHJvdG90eXBlWyJjbG9uZSJdPUNsYXNzSGFuZGxlX2Nsb25lO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiZGVsZXRlIl09Q2xhc3NIYW5kbGVfZGVsZXRlO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiaXNEZWxldGVkIl09Q2xhc3NIYW5kbGVfaXNEZWxldGVkO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiZGVsZXRlTGF0ZXIiXT1DbGFzc0hhbmRsZV9kZWxldGVMYXRlcn1mdW5jdGlvbiBDbGFzc0hhbmRsZSgpe312YXIgcmVnaXN0ZXJlZFBvaW50ZXJzPXt9O2Z1bmN0aW9uIGVuc3VyZU92ZXJsb2FkVGFibGUocHJvdG8sbWV0aG9kTmFtZSxodW1hbk5hbWUpe2lmKHVuZGVmaW5lZD09PXByb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGUpe3ZhciBwcmV2RnVuYz1wcm90b1ttZXRob2ROYW1lXTtwcm90b1ttZXRob2ROYW1lXT1mdW5jdGlvbigpe2lmKCFwcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlLmhhc093blByb3BlcnR5KGFyZ3VtZW50cy5sZW5ndGgpKXt0aHJvd0JpbmRpbmdFcnJvcigiRnVuY3Rpb24gJyIraHVtYW5OYW1lKyInIGNhbGxlZCB3aXRoIGFuIGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIithcmd1bWVudHMubGVuZ3RoKyIpIC0gZXhwZWN0cyBvbmUgb2YgKCIrcHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZSsiKSEiKX1yZXR1cm4gcHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmd1bWVudHMubGVuZ3RoXS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGU9W107cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVtwcmV2RnVuYy5hcmdDb3VudF09cHJldkZ1bmN9fWZ1bmN0aW9uIGV4cG9zZVB1YmxpY1N5bWJvbChuYW1lLHZhbHVlLG51bUFyZ3VtZW50cyl7aWYoTW9kdWxlLmhhc093blByb3BlcnR5KG5hbWUpKXtpZih1bmRlZmluZWQ9PT1udW1Bcmd1bWVudHN8fHVuZGVmaW5lZCE9PU1vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlJiZ1bmRlZmluZWQhPT1Nb2R1bGVbbmFtZV0ub3ZlcmxvYWRUYWJsZVtudW1Bcmd1bWVudHNdKXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIHB1YmxpYyBuYW1lICciK25hbWUrIicgdHdpY2UiKX1lbnN1cmVPdmVybG9hZFRhYmxlKE1vZHVsZSxuYW1lLG5hbWUpO2lmKE1vZHVsZS5oYXNPd25Qcm9wZXJ0eShudW1Bcmd1bWVudHMpKXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIG92ZXJsb2FkcyBvZiBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIitudW1Bcmd1bWVudHMrIikhIil9TW9kdWxlW25hbWVdLm92ZXJsb2FkVGFibGVbbnVtQXJndW1lbnRzXT12YWx1ZX1lbHNle01vZHVsZVtuYW1lXT12YWx1ZTtpZih1bmRlZmluZWQhPT1udW1Bcmd1bWVudHMpe01vZHVsZVtuYW1lXS5udW1Bcmd1bWVudHM9bnVtQXJndW1lbnRzfX19ZnVuY3Rpb24gUmVnaXN0ZXJlZENsYXNzKG5hbWUsY29uc3RydWN0b3IsaW5zdGFuY2VQcm90b3R5cGUscmF3RGVzdHJ1Y3RvcixiYXNlQ2xhc3MsZ2V0QWN0dWFsVHlwZSx1cGNhc3QsZG93bmNhc3Qpe3RoaXMubmFtZT1uYW1lO3RoaXMuY29uc3RydWN0b3I9Y29uc3RydWN0b3I7dGhpcy5pbnN0YW5jZVByb3RvdHlwZT1pbnN0YW5jZVByb3RvdHlwZTt0aGlzLnJhd0Rlc3RydWN0b3I9cmF3RGVzdHJ1Y3Rvcjt0aGlzLmJhc2VDbGFzcz1iYXNlQ2xhc3M7dGhpcy5nZXRBY3R1YWxUeXBlPWdldEFjdHVhbFR5cGU7dGhpcy51cGNhc3Q9dXBjYXN0O3RoaXMuZG93bmNhc3Q9ZG93bmNhc3Q7dGhpcy5wdXJlVmlydHVhbEZ1bmN0aW9ucz1bXX1mdW5jdGlvbiB1cGNhc3RQb2ludGVyKHB0cixwdHJDbGFzcyxkZXNpcmVkQ2xhc3Mpe3doaWxlKHB0ckNsYXNzIT09ZGVzaXJlZENsYXNzKXtpZighcHRyQ2xhc3MudXBjYXN0KXt0aHJvd0JpbmRpbmdFcnJvcigiRXhwZWN0ZWQgbnVsbCBvciBpbnN0YW5jZSBvZiAiK2Rlc2lyZWRDbGFzcy5uYW1lKyIsIGdvdCBhbiBpbnN0YW5jZSBvZiAiK3B0ckNsYXNzLm5hbWUpfXB0cj1wdHJDbGFzcy51cGNhc3QocHRyKTtwdHJDbGFzcz1wdHJDbGFzcy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBjb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZShkZXN0cnVjdG9ycyxoYW5kbGUpe2lmKGhhbmRsZT09PW51bGwpe2lmKHRoaXMuaXNSZWZlcmVuY2Upe3Rocm93QmluZGluZ0Vycm9yKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKX1yZXR1cm4gMH1pZighaGFuZGxlLiQkKXt0aHJvd0JpbmRpbmdFcnJvcignQ2Fubm90IHBhc3MgIicrX2VtYmluZF9yZXByKGhhbmRsZSkrJyIgYXMgYSAnK3RoaXMubmFtZSl9aWYoIWhhbmRsZS4kJC5wdHIpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBkZWxldGVkIG9iamVjdCBhcyBhIHBvaW50ZXIgb2YgdHlwZSAiK3RoaXMubmFtZSl9dmFyIGhhbmRsZUNsYXNzPWhhbmRsZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcHRyPXVwY2FzdFBvaW50ZXIoaGFuZGxlLiQkLnB0cixoYW5kbGVDbGFzcyx0aGlzLnJlZ2lzdGVyZWRDbGFzcyk7cmV0dXJuIHB0cn1mdW5jdGlvbiBnZW5lcmljUG9pbnRlclRvV2lyZVR5cGUoZGVzdHJ1Y3RvcnMsaGFuZGxlKXt2YXIgcHRyO2lmKGhhbmRsZT09PW51bGwpe2lmKHRoaXMuaXNSZWZlcmVuY2Upe3Rocm93QmluZGluZ0Vycm9yKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKX1pZih0aGlzLmlzU21hcnRQb2ludGVyKXtwdHI9dGhpcy5yYXdDb25zdHJ1Y3RvcigpO2lmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaCh0aGlzLnJhd0Rlc3RydWN0b3IscHRyKX1yZXR1cm4gcHRyfWVsc2V7cmV0dXJuIDB9fWlmKCFoYW5kbGUuJCQpe3Rocm93QmluZGluZ0Vycm9yKCdDYW5ub3QgcGFzcyAiJytfZW1iaW5kX3JlcHIoaGFuZGxlKSsnIiBhcyBhICcrdGhpcy5uYW1lKX1pZighaGFuZGxlLiQkLnB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKX1pZighdGhpcy5pc0NvbnN0JiZoYW5kbGUuJCQucHRyVHlwZS5pc0NvbnN0KXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAiKyhoYW5kbGUuJCQuc21hcnRQdHJUeXBlP2hhbmRsZS4kJC5zbWFydFB0clR5cGUubmFtZTpoYW5kbGUuJCQucHRyVHlwZS5uYW1lKSsiIHRvIHBhcmFtZXRlciB0eXBlICIrdGhpcy5uYW1lKX12YXIgaGFuZGxlQ2xhc3M9aGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3B0cj11cGNhc3RQb2ludGVyKGhhbmRsZS4kJC5wdHIsaGFuZGxlQ2xhc3MsdGhpcy5yZWdpc3RlcmVkQ2xhc3MpO2lmKHRoaXMuaXNTbWFydFBvaW50ZXIpe2lmKHVuZGVmaW5lZD09PWhhbmRsZS4kJC5zbWFydFB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIlBhc3NpbmcgcmF3IHBvaW50ZXIgdG8gc21hcnQgcG9pbnRlciBpcyBpbGxlZ2FsIil9c3dpdGNoKHRoaXMuc2hhcmluZ1BvbGljeSl7Y2FzZSAwOmlmKGhhbmRsZS4kJC5zbWFydFB0clR5cGU9PT10aGlzKXtwdHI9aGFuZGxlLiQkLnNtYXJ0UHRyfWVsc2V7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgIisoaGFuZGxlLiQkLnNtYXJ0UHRyVHlwZT9oYW5kbGUuJCQuc21hcnRQdHJUeXBlLm5hbWU6aGFuZGxlLiQkLnB0clR5cGUubmFtZSkrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSl9YnJlYWs7Y2FzZSAxOnB0cj1oYW5kbGUuJCQuc21hcnRQdHI7YnJlYWs7Y2FzZSAyOmlmKGhhbmRsZS4kJC5zbWFydFB0clR5cGU9PT10aGlzKXtwdHI9aGFuZGxlLiQkLnNtYXJ0UHRyfWVsc2V7dmFyIGNsb25lZEhhbmRsZT1oYW5kbGVbImNsb25lIl0oKTtwdHI9dGhpcy5yYXdTaGFyZShwdHIsX19lbXZhbF9yZWdpc3RlcihmdW5jdGlvbigpe2Nsb25lZEhhbmRsZVsiZGVsZXRlIl0oKX0pKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2godGhpcy5yYXdEZXN0cnVjdG9yLHB0cil9fWJyZWFrO2RlZmF1bHQ6dGhyb3dCaW5kaW5nRXJyb3IoIlVuc3VwcG9ydGluZyBzaGFyaW5nIHBvbGljeSIpfX1yZXR1cm4gcHRyfWZ1bmN0aW9uIG5vbkNvbnN0Tm9TbWFydFB0clJhd1BvaW50ZXJUb1dpcmVUeXBlKGRlc3RydWN0b3JzLGhhbmRsZSl7aWYoaGFuZGxlPT09bnVsbCl7aWYodGhpcy5pc1JlZmVyZW5jZSl7dGhyb3dCaW5kaW5nRXJyb3IoIm51bGwgaXMgbm90IGEgdmFsaWQgIit0aGlzLm5hbWUpfXJldHVybiAwfWlmKCFoYW5kbGUuJCQpe3Rocm93QmluZGluZ0Vycm9yKCdDYW5ub3QgcGFzcyAiJytfZW1iaW5kX3JlcHIoaGFuZGxlKSsnIiBhcyBhICcrdGhpcy5uYW1lKX1pZighaGFuZGxlLiQkLnB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKX1pZihoYW5kbGUuJCQucHRyVHlwZS5pc0NvbnN0KXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAiK2hhbmRsZS4kJC5wdHJUeXBlLm5hbWUrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSl9dmFyIGhhbmRsZUNsYXNzPWhhbmRsZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcHRyPXVwY2FzdFBvaW50ZXIoaGFuZGxlLiQkLnB0cixoYW5kbGVDbGFzcyx0aGlzLnJlZ2lzdGVyZWRDbGFzcyk7cmV0dXJuIHB0cn1mdW5jdGlvbiBzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUFUzMltwb2ludGVyPj4yXSl9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZ2V0UG9pbnRlZShwdHIpe2lmKHRoaXMucmF3R2V0UG9pbnRlZSl7cHRyPXRoaXMucmF3R2V0UG9pbnRlZShwdHIpfXJldHVybiBwdHJ9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvcihwdHIpe2lmKHRoaXMucmF3RGVzdHJ1Y3Rvcil7dGhpcy5yYXdEZXN0cnVjdG9yKHB0cil9fWZ1bmN0aW9uIFJlZ2lzdGVyZWRQb2ludGVyX2RlbGV0ZU9iamVjdChoYW5kbGUpe2lmKGhhbmRsZSE9PW51bGwpe2hhbmRsZVsiZGVsZXRlIl0oKX19ZnVuY3Rpb24gZG93bmNhc3RQb2ludGVyKHB0cixwdHJDbGFzcyxkZXNpcmVkQ2xhc3Mpe2lmKHB0ckNsYXNzPT09ZGVzaXJlZENsYXNzKXtyZXR1cm4gcHRyfWlmKHVuZGVmaW5lZD09PWRlc2lyZWRDbGFzcy5iYXNlQ2xhc3Mpe3JldHVybiBudWxsfXZhciBydj1kb3duY2FzdFBvaW50ZXIocHRyLHB0ckNsYXNzLGRlc2lyZWRDbGFzcy5iYXNlQ2xhc3MpO2lmKHJ2PT09bnVsbCl7cmV0dXJuIG51bGx9cmV0dXJuIGRlc2lyZWRDbGFzcy5kb3duY2FzdChydil9ZnVuY3Rpb24gZ2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudCgpe3JldHVybiBPYmplY3Qua2V5cyhyZWdpc3RlcmVkSW5zdGFuY2VzKS5sZW5ndGh9ZnVuY3Rpb24gZ2V0TGl2ZUluaGVyaXRlZEluc3RhbmNlcygpe3ZhciBydj1bXTtmb3IodmFyIGsgaW4gcmVnaXN0ZXJlZEluc3RhbmNlcyl7aWYocmVnaXN0ZXJlZEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShrKSl7cnYucHVzaChyZWdpc3RlcmVkSW5zdGFuY2VzW2tdKX19cmV0dXJuIHJ2fWZ1bmN0aW9uIHNldERlbGF5RnVuY3Rpb24oZm4pe2RlbGF5RnVuY3Rpb249Zm47aWYoZGVsZXRpb25RdWV1ZS5sZW5ndGgmJmRlbGF5RnVuY3Rpb24pe2RlbGF5RnVuY3Rpb24oZmx1c2hQZW5kaW5nRGVsZXRlcyl9fWZ1bmN0aW9uIGluaXRfZW1iaW5kKCl7TW9kdWxlWyJnZXRJbmhlcml0ZWRJbnN0YW5jZUNvdW50Il09Z2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudDtNb2R1bGVbImdldExpdmVJbmhlcml0ZWRJbnN0YW5jZXMiXT1nZXRMaXZlSW5oZXJpdGVkSW5zdGFuY2VzO01vZHVsZVsiZmx1c2hQZW5kaW5nRGVsZXRlcyJdPWZsdXNoUGVuZGluZ0RlbGV0ZXM7TW9kdWxlWyJzZXREZWxheUZ1bmN0aW9uIl09c2V0RGVsYXlGdW5jdGlvbn12YXIgcmVnaXN0ZXJlZEluc3RhbmNlcz17fTtmdW5jdGlvbiBnZXRCYXNlc3RQb2ludGVyKGNsYXNzXyxwdHIpe2lmKHB0cj09PXVuZGVmaW5lZCl7dGhyb3dCaW5kaW5nRXJyb3IoInB0ciBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCIpfXdoaWxlKGNsYXNzXy5iYXNlQ2xhc3Mpe3B0cj1jbGFzc18udXBjYXN0KHB0cik7Y2xhc3NfPWNsYXNzXy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBnZXRJbmhlcml0ZWRJbnN0YW5jZShjbGFzc18scHRyKXtwdHI9Z2V0QmFzZXN0UG9pbnRlcihjbGFzc18scHRyKTtyZXR1cm4gcmVnaXN0ZXJlZEluc3RhbmNlc1twdHJdfWZ1bmN0aW9uIG1ha2VDbGFzc0hhbmRsZShwcm90b3R5cGUscmVjb3JkKXtpZighcmVjb3JkLnB0clR5cGV8fCFyZWNvcmQucHRyKXt0aHJvd0ludGVybmFsRXJyb3IoIm1ha2VDbGFzc0hhbmRsZSByZXF1aXJlcyBwdHIgYW5kIHB0clR5cGUiKX12YXIgaGFzU21hcnRQdHJUeXBlPSEhcmVjb3JkLnNtYXJ0UHRyVHlwZTt2YXIgaGFzU21hcnRQdHI9ISFyZWNvcmQuc21hcnRQdHI7aWYoaGFzU21hcnRQdHJUeXBlIT09aGFzU21hcnRQdHIpe3Rocm93SW50ZXJuYWxFcnJvcigiQm90aCBzbWFydFB0clR5cGUgYW5kIHNtYXJ0UHRyIG11c3QgYmUgc3BlY2lmaWVkIil9cmVjb3JkLmNvdW50PXt2YWx1ZToxfTtyZXR1cm4gYXR0YWNoRmluYWxpemVyKE9iamVjdC5jcmVhdGUocHJvdG90eXBlLHskJDp7dmFsdWU6cmVjb3JkfX0pKX1mdW5jdGlvbiBSZWdpc3RlcmVkUG9pbnRlcl9mcm9tV2lyZVR5cGUocHRyKXt2YXIgcmF3UG9pbnRlcj10aGlzLmdldFBvaW50ZWUocHRyKTtpZighcmF3UG9pbnRlcil7dGhpcy5kZXN0cnVjdG9yKHB0cik7cmV0dXJuIG51bGx9dmFyIHJlZ2lzdGVyZWRJbnN0YW5jZT1nZXRJbmhlcml0ZWRJbnN0YW5jZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcyxyYXdQb2ludGVyKTtpZih1bmRlZmluZWQhPT1yZWdpc3RlcmVkSW5zdGFuY2Upe2lmKDA9PT1yZWdpc3RlcmVkSW5zdGFuY2UuJCQuY291bnQudmFsdWUpe3JlZ2lzdGVyZWRJbnN0YW5jZS4kJC5wdHI9cmF3UG9pbnRlcjtyZWdpc3RlcmVkSW5zdGFuY2UuJCQuc21hcnRQdHI9cHRyO3JldHVybiByZWdpc3RlcmVkSW5zdGFuY2VbImNsb25lIl0oKX1lbHNle3ZhciBydj1yZWdpc3RlcmVkSW5zdGFuY2VbImNsb25lIl0oKTt0aGlzLmRlc3RydWN0b3IocHRyKTtyZXR1cm4gcnZ9fWZ1bmN0aW9uIG1ha2VEZWZhdWx0SGFuZGxlKCl7aWYodGhpcy5pc1NtYXJ0UG9pbnRlcil7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0aGlzLnBvaW50ZWVUeXBlLHB0cjpyYXdQb2ludGVyLHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOnB0cn0pfWVsc2V7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0aGlzLHB0cjpwdHJ9KX19dmFyIGFjdHVhbFR5cGU9dGhpcy5yZWdpc3RlcmVkQ2xhc3MuZ2V0QWN0dWFsVHlwZShyYXdQb2ludGVyKTt2YXIgcmVnaXN0ZXJlZFBvaW50ZXJSZWNvcmQ9cmVnaXN0ZXJlZFBvaW50ZXJzW2FjdHVhbFR5cGVdO2lmKCFyZWdpc3RlcmVkUG9pbnRlclJlY29yZCl7cmV0dXJuIG1ha2VEZWZhdWx0SGFuZGxlLmNhbGwodGhpcyl9dmFyIHRvVHlwZTtpZih0aGlzLmlzQ29uc3Qpe3RvVHlwZT1yZWdpc3RlcmVkUG9pbnRlclJlY29yZC5jb25zdFBvaW50ZXJUeXBlfWVsc2V7dG9UeXBlPXJlZ2lzdGVyZWRQb2ludGVyUmVjb3JkLnBvaW50ZXJUeXBlfXZhciBkcD1kb3duY2FzdFBvaW50ZXIocmF3UG9pbnRlcix0aGlzLnJlZ2lzdGVyZWRDbGFzcyx0b1R5cGUucmVnaXN0ZXJlZENsYXNzKTtpZihkcD09PW51bGwpe3JldHVybiBtYWtlRGVmYXVsdEhhbmRsZS5jYWxsKHRoaXMpfWlmKHRoaXMuaXNTbWFydFBvaW50ZXIpe3JldHVybiBtYWtlQ2xhc3NIYW5kbGUodG9UeXBlLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0b1R5cGUscHRyOmRwLHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOnB0cn0pfWVsc2V7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0b1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRvVHlwZSxwdHI6ZHB9KX19ZnVuY3Rpb24gaW5pdF9SZWdpc3RlcmVkUG9pbnRlcigpe1JlZ2lzdGVyZWRQb2ludGVyLnByb3RvdHlwZS5nZXRQb2ludGVlPVJlZ2lzdGVyZWRQb2ludGVyX2dldFBvaW50ZWU7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlLmRlc3RydWN0b3I9UmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvcjtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGVbImFyZ1BhY2tBZHZhbmNlIl09ODtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGVbInJlYWRWYWx1ZUZyb21Qb2ludGVyIl09c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXI7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlWyJkZWxldGVPYmplY3QiXT1SZWdpc3RlcmVkUG9pbnRlcl9kZWxldGVPYmplY3Q7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlWyJmcm9tV2lyZVR5cGUiXT1SZWdpc3RlcmVkUG9pbnRlcl9mcm9tV2lyZVR5cGV9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXIobmFtZSxyZWdpc3RlcmVkQ2xhc3MsaXNSZWZlcmVuY2UsaXNDb25zdCxpc1NtYXJ0UG9pbnRlcixwb2ludGVlVHlwZSxzaGFyaW5nUG9saWN5LHJhd0dldFBvaW50ZWUscmF3Q29uc3RydWN0b3IscmF3U2hhcmUscmF3RGVzdHJ1Y3Rvcil7dGhpcy5uYW1lPW5hbWU7dGhpcy5yZWdpc3RlcmVkQ2xhc3M9cmVnaXN0ZXJlZENsYXNzO3RoaXMuaXNSZWZlcmVuY2U9aXNSZWZlcmVuY2U7dGhpcy5pc0NvbnN0PWlzQ29uc3Q7dGhpcy5pc1NtYXJ0UG9pbnRlcj1pc1NtYXJ0UG9pbnRlcjt0aGlzLnBvaW50ZWVUeXBlPXBvaW50ZWVUeXBlO3RoaXMuc2hhcmluZ1BvbGljeT1zaGFyaW5nUG9saWN5O3RoaXMucmF3R2V0UG9pbnRlZT1yYXdHZXRQb2ludGVlO3RoaXMucmF3Q29uc3RydWN0b3I9cmF3Q29uc3RydWN0b3I7dGhpcy5yYXdTaGFyZT1yYXdTaGFyZTt0aGlzLnJhd0Rlc3RydWN0b3I9cmF3RGVzdHJ1Y3RvcjtpZighaXNTbWFydFBvaW50ZXImJnJlZ2lzdGVyZWRDbGFzcy5iYXNlQ2xhc3M9PT11bmRlZmluZWQpe2lmKGlzQ29uc3Qpe3RoaXNbInRvV2lyZVR5cGUiXT1jb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZTt0aGlzLmRlc3RydWN0b3JGdW5jdGlvbj1udWxsfWVsc2V7dGhpc1sidG9XaXJlVHlwZSJdPW5vbkNvbnN0Tm9TbWFydFB0clJhd1BvaW50ZXJUb1dpcmVUeXBlO3RoaXMuZGVzdHJ1Y3RvckZ1bmN0aW9uPW51bGx9fWVsc2V7dGhpc1sidG9XaXJlVHlwZSJdPWdlbmVyaWNQb2ludGVyVG9XaXJlVHlwZX19ZnVuY3Rpb24gcmVwbGFjZVB1YmxpY1N5bWJvbChuYW1lLHZhbHVlLG51bUFyZ3VtZW50cyl7aWYoIU1vZHVsZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSl7dGhyb3dJbnRlcm5hbEVycm9yKCJSZXBsYWNpbmcgbm9uZXhpc3RhbnQgcHVibGljIHN5bWJvbCIpfWlmKHVuZGVmaW5lZCE9PU1vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlJiZ1bmRlZmluZWQhPT1udW1Bcmd1bWVudHMpe01vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlW251bUFyZ3VtZW50c109dmFsdWV9ZWxzZXtNb2R1bGVbbmFtZV09dmFsdWU7TW9kdWxlW25hbWVdLmFyZ0NvdW50PW51bUFyZ3VtZW50c319ZnVuY3Rpb24gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3Mpe3ZhciBmPU1vZHVsZVsiZHluQ2FsbF8iK3NpZ107cmV0dXJuIGFyZ3MmJmFyZ3MubGVuZ3RoP2YuYXBwbHkobnVsbCxbcHRyXS5jb25jYXQoYXJncykpOmYuY2FsbChudWxsLHB0cil9ZnVuY3Rpb24gZHluQ2FsbChzaWcscHRyLGFyZ3Mpe2lmKHNpZy5pbmRleE9mKCJqIikhPS0xKXtyZXR1cm4gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3MpfXJldHVybiB3YXNtVGFibGUuZ2V0KHB0cikuYXBwbHkobnVsbCxhcmdzKX1mdW5jdGlvbiBnZXREeW5DYWxsZXIoc2lnLHB0cil7dmFyIGFyZ0NhY2hlPVtdO3JldHVybiBmdW5jdGlvbigpe2FyZ0NhY2hlLmxlbmd0aD1hcmd1bWVudHMubGVuZ3RoO2Zvcih2YXIgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe2FyZ0NhY2hlW2ldPWFyZ3VtZW50c1tpXX1yZXR1cm4gZHluQ2FsbChzaWcscHRyLGFyZ0NhY2hlKX19ZnVuY3Rpb24gZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oc2lnbmF0dXJlLHJhd0Z1bmN0aW9uKXtzaWduYXR1cmU9cmVhZExhdGluMVN0cmluZyhzaWduYXR1cmUpO2Z1bmN0aW9uIG1ha2VEeW5DYWxsZXIoKXtpZihzaWduYXR1cmUuaW5kZXhPZigiaiIpIT0tMSl7cmV0dXJuIGdldER5bkNhbGxlcihzaWduYXR1cmUscmF3RnVuY3Rpb24pfXJldHVybiB3YXNtVGFibGUuZ2V0KHJhd0Z1bmN0aW9uKX12YXIgZnA9bWFrZUR5bkNhbGxlcigpO2lmKHR5cGVvZiBmcCE9PSJmdW5jdGlvbiIpe3Rocm93QmluZGluZ0Vycm9yKCJ1bmtub3duIGZ1bmN0aW9uIHBvaW50ZXIgd2l0aCBzaWduYXR1cmUgIitzaWduYXR1cmUrIjogIityYXdGdW5jdGlvbil9cmV0dXJuIGZwfXZhciBVbmJvdW5kVHlwZUVycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiBnZXRUeXBlTmFtZSh0eXBlKXt2YXIgcHRyPV9fX2dldFR5cGVOYW1lKHR5cGUpO3ZhciBydj1yZWFkTGF0aW4xU3RyaW5nKHB0cik7X2ZyZWUocHRyKTtyZXR1cm4gcnZ9ZnVuY3Rpb24gdGhyb3dVbmJvdW5kVHlwZUVycm9yKG1lc3NhZ2UsdHlwZXMpe3ZhciB1bmJvdW5kVHlwZXM9W107dmFyIHNlZW49e307ZnVuY3Rpb24gdmlzaXQodHlwZSl7aWYoc2Vlblt0eXBlXSl7cmV0dXJufWlmKHJlZ2lzdGVyZWRUeXBlc1t0eXBlXSl7cmV0dXJufWlmKHR5cGVEZXBlbmRlbmNpZXNbdHlwZV0pe3R5cGVEZXBlbmRlbmNpZXNbdHlwZV0uZm9yRWFjaCh2aXNpdCk7cmV0dXJufXVuYm91bmRUeXBlcy5wdXNoKHR5cGUpO3NlZW5bdHlwZV09dHJ1ZX10eXBlcy5mb3JFYWNoKHZpc2l0KTt0aHJvdyBuZXcgVW5ib3VuZFR5cGVFcnJvcihtZXNzYWdlKyI6ICIrdW5ib3VuZFR5cGVzLm1hcChnZXRUeXBlTmFtZSkuam9pbihbIiwgIl0pKX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzcyhyYXdUeXBlLHJhd1BvaW50ZXJUeXBlLHJhd0NvbnN0UG9pbnRlclR5cGUsYmFzZUNsYXNzUmF3VHlwZSxnZXRBY3R1YWxUeXBlU2lnbmF0dXJlLGdldEFjdHVhbFR5cGUsdXBjYXN0U2lnbmF0dXJlLHVwY2FzdCxkb3duY2FzdFNpZ25hdHVyZSxkb3duY2FzdCxuYW1lLGRlc3RydWN0b3JTaWduYXR1cmUscmF3RGVzdHJ1Y3Rvcil7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO2dldEFjdHVhbFR5cGU9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZ2V0QWN0dWFsVHlwZVNpZ25hdHVyZSxnZXRBY3R1YWxUeXBlKTtpZih1cGNhc3Qpe3VwY2FzdD1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbih1cGNhc3RTaWduYXR1cmUsdXBjYXN0KX1pZihkb3duY2FzdCl7ZG93bmNhc3Q9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZG93bmNhc3RTaWduYXR1cmUsZG93bmNhc3QpfXJhd0Rlc3RydWN0b3I9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZGVzdHJ1Y3RvclNpZ25hdHVyZSxyYXdEZXN0cnVjdG9yKTt2YXIgbGVnYWxGdW5jdGlvbk5hbWU9bWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpO2V4cG9zZVB1YmxpY1N5bWJvbChsZWdhbEZ1bmN0aW9uTmFtZSxmdW5jdGlvbigpe3Rocm93VW5ib3VuZFR5cGVFcnJvcigiQ2Fubm90IGNvbnN0cnVjdCAiK25hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIsW2Jhc2VDbGFzc1Jhd1R5cGVdKX0pO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtyYXdUeXBlLHJhd1BvaW50ZXJUeXBlLHJhd0NvbnN0UG9pbnRlclR5cGVdLGJhc2VDbGFzc1Jhd1R5cGU/W2Jhc2VDbGFzc1Jhd1R5cGVdOltdLGZ1bmN0aW9uKGJhc2Upe2Jhc2U9YmFzZVswXTt2YXIgYmFzZUNsYXNzO3ZhciBiYXNlUHJvdG90eXBlO2lmKGJhc2VDbGFzc1Jhd1R5cGUpe2Jhc2VDbGFzcz1iYXNlLnJlZ2lzdGVyZWRDbGFzcztiYXNlUHJvdG90eXBlPWJhc2VDbGFzcy5pbnN0YW5jZVByb3RvdHlwZX1lbHNle2Jhc2VQcm90b3R5cGU9Q2xhc3NIYW5kbGUucHJvdG90eXBlfXZhciBjb25zdHJ1Y3Rvcj1jcmVhdGVOYW1lZEZ1bmN0aW9uKGxlZ2FsRnVuY3Rpb25OYW1lLGZ1bmN0aW9uKCl7aWYoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpIT09aW5zdGFuY2VQcm90b3R5cGUpe3Rocm93IG5ldyBCaW5kaW5nRXJyb3IoIlVzZSAnbmV3JyB0byBjb25zdHJ1Y3QgIituYW1lKX1pZih1bmRlZmluZWQ9PT1yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihuYW1lKyIgaGFzIG5vIGFjY2Vzc2libGUgY29uc3RydWN0b3IiKX12YXIgYm9keT1yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keVthcmd1bWVudHMubGVuZ3RoXTtpZih1bmRlZmluZWQ9PT1ib2R5KXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKCJUcmllZCB0byBpbnZva2UgY3RvciBvZiAiK25hbWUrIiB3aXRoIGludmFsaWQgbnVtYmVyIG9mIHBhcmFtZXRlcnMgKCIrYXJndW1lbnRzLmxlbmd0aCsiKSAtIGV4cGVjdGVkICgiK09iamVjdC5rZXlzKHJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5KS50b1N0cmluZygpKyIpIHBhcmFtZXRlcnMgaW5zdGVhZCEiKX1yZXR1cm4gYm9keS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KTt2YXIgaW5zdGFuY2VQcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiYXNlUHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6Y29uc3RydWN0b3J9fSk7Y29uc3RydWN0b3IucHJvdG90eXBlPWluc3RhbmNlUHJvdG90eXBlO3ZhciByZWdpc3RlcmVkQ2xhc3M9bmV3IFJlZ2lzdGVyZWRDbGFzcyhuYW1lLGNvbnN0cnVjdG9yLGluc3RhbmNlUHJvdG90eXBlLHJhd0Rlc3RydWN0b3IsYmFzZUNsYXNzLGdldEFjdHVhbFR5cGUsdXBjYXN0LGRvd25jYXN0KTt2YXIgcmVmZXJlbmNlQ29udmVydGVyPW5ldyBSZWdpc3RlcmVkUG9pbnRlcihuYW1lLHJlZ2lzdGVyZWRDbGFzcyx0cnVlLGZhbHNlLGZhbHNlKTt2YXIgcG9pbnRlckNvbnZlcnRlcj1uZXcgUmVnaXN0ZXJlZFBvaW50ZXIobmFtZSsiKiIscmVnaXN0ZXJlZENsYXNzLGZhbHNlLGZhbHNlLGZhbHNlKTt2YXIgY29uc3RQb2ludGVyQ29udmVydGVyPW5ldyBSZWdpc3RlcmVkUG9pbnRlcihuYW1lKyIgY29uc3QqIixyZWdpc3RlcmVkQ2xhc3MsZmFsc2UsdHJ1ZSxmYWxzZSk7cmVnaXN0ZXJlZFBvaW50ZXJzW3Jhd1R5cGVdPXtwb2ludGVyVHlwZTpwb2ludGVyQ29udmVydGVyLGNvbnN0UG9pbnRlclR5cGU6Y29uc3RQb2ludGVyQ29udmVydGVyfTtyZXBsYWNlUHVibGljU3ltYm9sKGxlZ2FsRnVuY3Rpb25OYW1lLGNvbnN0cnVjdG9yKTtyZXR1cm5bcmVmZXJlbmNlQ29udmVydGVyLHBvaW50ZXJDb252ZXJ0ZXIsY29uc3RQb2ludGVyQ29udmVydGVyXX0pfWZ1bmN0aW9uIGhlYXAzMlZlY3RvclRvQXJyYXkoY291bnQsZmlyc3RFbGVtZW50KXt2YXIgYXJyYXk9W107Zm9yKHZhciBpPTA7aTxjb3VudDtpKyspe2FycmF5LnB1c2goSEVBUDMyWyhmaXJzdEVsZW1lbnQ+PjIpK2ldKX1yZXR1cm4gYXJyYXl9ZnVuY3Rpb24gcnVuRGVzdHJ1Y3RvcnMoZGVzdHJ1Y3RvcnMpe3doaWxlKGRlc3RydWN0b3JzLmxlbmd0aCl7dmFyIHB0cj1kZXN0cnVjdG9ycy5wb3AoKTt2YXIgZGVsPWRlc3RydWN0b3JzLnBvcCgpO2RlbChwdHIpfX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jb25zdHJ1Y3RvcihyYXdDbGFzc1R5cGUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUsaW52b2tlcixyYXdDb25zdHJ1Y3Rvcil7YXNzZXJ0KGFyZ0NvdW50PjApO3ZhciByYXdBcmdUeXBlcz1oZWFwMzJWZWN0b3JUb0FycmF5KGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcik7aW52b2tlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihpbnZva2VyU2lnbmF0dXJlLGludm9rZXIpO3ZhciBhcmdzPVtyYXdDb25zdHJ1Y3Rvcl07dmFyIGRlc3RydWN0b3JzPVtdO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPSJjb25zdHJ1Y3RvciAiK2NsYXNzVHlwZS5uYW1lO2lmKHVuZGVmaW5lZD09PWNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keSl7Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5PVtdfWlmKHVuZGVmaW5lZCE9PWNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keVthcmdDb3VudC0xXSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIGNvbnN0cnVjdG9ycyB3aXRoIGlkZW50aWNhbCBudW1iZXIgb2YgcGFyYW1ldGVycyAoIisoYXJnQ291bnQtMSkrIikgZm9yIGNsYXNzICciK2NsYXNzVHlwZS5uYW1lKyInISBPdmVybG9hZCByZXNvbHV0aW9uIGlzIGN1cnJlbnRseSBvbmx5IHBlcmZvcm1lZCB1c2luZyB0aGUgcGFyYW1ldGVyIGNvdW50LCBub3QgYWN0dWFsIHR5cGUgaW5mbyEiKX1jbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbYXJnQ291bnQtMV09ZnVuY3Rpb24gdW5ib3VuZFR5cGVIYW5kbGVyKCl7dGhyb3dVbmJvdW5kVHlwZUVycm9yKCJDYW5ub3QgY29uc3RydWN0ICIrY2xhc3NUeXBlLm5hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIscmF3QXJnVHlwZXMpfTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxyYXdBcmdUeXBlcyxmdW5jdGlvbihhcmdUeXBlcyl7Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W2FyZ0NvdW50LTFdPWZ1bmN0aW9uIGNvbnN0cnVjdG9yX2JvZHkoKXtpZihhcmd1bWVudHMubGVuZ3RoIT09YXJnQ291bnQtMSl7dGhyb3dCaW5kaW5nRXJyb3IoaHVtYW5OYW1lKyIgY2FsbGVkIHdpdGggIithcmd1bWVudHMubGVuZ3RoKyIgYXJndW1lbnRzLCBleHBlY3RlZCAiKyhhcmdDb3VudC0xKSl9ZGVzdHJ1Y3RvcnMubGVuZ3RoPTA7YXJncy5sZW5ndGg9YXJnQ291bnQ7Zm9yKHZhciBpPTE7aTxhcmdDb3VudDsrK2kpe2FyZ3NbaV09YXJnVHlwZXNbaV1bInRvV2lyZVR5cGUiXShkZXN0cnVjdG9ycyxhcmd1bWVudHNbaS0xXSl9dmFyIHB0cj1pbnZva2VyLmFwcGx5KG51bGwsYXJncyk7cnVuRGVzdHJ1Y3RvcnMoZGVzdHJ1Y3RvcnMpO3JldHVybiBhcmdUeXBlc1swXVsiZnJvbVdpcmVUeXBlIl0ocHRyKX07cmV0dXJuW119KTtyZXR1cm5bXX0pfWZ1bmN0aW9uIG5ld18oY29uc3RydWN0b3IsYXJndW1lbnRMaXN0KXtpZighKGNvbnN0cnVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJuZXdfIGNhbGxlZCB3aXRoIGNvbnN0cnVjdG9yIHR5cGUgIit0eXBlb2YgY29uc3RydWN0b3IrIiB3aGljaCBpcyBub3QgYSBmdW5jdGlvbiIpfXZhciBkdW1teT1jcmVhdGVOYW1lZEZ1bmN0aW9uKGNvbnN0cnVjdG9yLm5hbWV8fCJ1bmtub3duRnVuY3Rpb25OYW1lIixmdW5jdGlvbigpe30pO2R1bW15LnByb3RvdHlwZT1jb25zdHJ1Y3Rvci5wcm90b3R5cGU7dmFyIG9iaj1uZXcgZHVtbXk7dmFyIHI9Y29uc3RydWN0b3IuYXBwbHkob2JqLGFyZ3VtZW50TGlzdCk7cmV0dXJuIHIgaW5zdGFuY2VvZiBPYmplY3Q/cjpvYmp9ZnVuY3Rpb24gY3JhZnRJbnZva2VyRnVuY3Rpb24oaHVtYW5OYW1lLGFyZ1R5cGVzLGNsYXNzVHlwZSxjcHBJbnZva2VyRnVuYyxjcHBUYXJnZXRGdW5jKXt2YXIgYXJnQ291bnQ9YXJnVHlwZXMubGVuZ3RoO2lmKGFyZ0NvdW50PDIpe3Rocm93QmluZGluZ0Vycm9yKCJhcmdUeXBlcyBhcnJheSBzaXplIG1pc21hdGNoISBNdXN0IGF0IGxlYXN0IGdldCByZXR1cm4gdmFsdWUgYW5kICd0aGlzJyB0eXBlcyEiKX12YXIgaXNDbGFzc01ldGhvZEZ1bmM9YXJnVHlwZXNbMV0hPT1udWxsJiZjbGFzc1R5cGUhPT1udWxsO3ZhciBuZWVkc0Rlc3RydWN0b3JTdGFjaz1mYWxzZTtmb3IodmFyIGk9MTtpPGFyZ1R5cGVzLmxlbmd0aDsrK2kpe2lmKGFyZ1R5cGVzW2ldIT09bnVsbCYmYXJnVHlwZXNbaV0uZGVzdHJ1Y3RvckZ1bmN0aW9uPT09dW5kZWZpbmVkKXtuZWVkc0Rlc3RydWN0b3JTdGFjaz10cnVlO2JyZWFrfX12YXIgcmV0dXJucz1hcmdUeXBlc1swXS5uYW1lIT09InZvaWQiO3ZhciBhcmdzTGlzdD0iIjt2YXIgYXJnc0xpc3RXaXJlZD0iIjtmb3IodmFyIGk9MDtpPGFyZ0NvdW50LTI7KytpKXthcmdzTGlzdCs9KGkhPT0wPyIsICI6IiIpKyJhcmciK2k7YXJnc0xpc3RXaXJlZCs9KGkhPT0wPyIsICI6IiIpKyJhcmciK2krIldpcmVkIn12YXIgaW52b2tlckZuQm9keT0icmV0dXJuIGZ1bmN0aW9uICIrbWFrZUxlZ2FsRnVuY3Rpb25OYW1lKGh1bWFuTmFtZSkrIigiK2FyZ3NMaXN0KyIpIHtcbiIrImlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAiKyhhcmdDb3VudC0yKSsiKSB7XG4iKyJ0aHJvd0JpbmRpbmdFcnJvcignZnVuY3Rpb24gIitodW1hbk5hbWUrIiBjYWxsZWQgd2l0aCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLCBleHBlY3RlZCAiKyhhcmdDb3VudC0yKSsiIGFyZ3MhJyk7XG4iKyJ9XG4iO2lmKG5lZWRzRGVzdHJ1Y3RvclN0YWNrKXtpbnZva2VyRm5Cb2R5Kz0idmFyIGRlc3RydWN0b3JzID0gW107XG4ifXZhciBkdG9yU3RhY2s9bmVlZHNEZXN0cnVjdG9yU3RhY2s/ImRlc3RydWN0b3JzIjoibnVsbCI7dmFyIGFyZ3MxPVsidGhyb3dCaW5kaW5nRXJyb3IiLCJpbnZva2VyIiwiZm4iLCJydW5EZXN0cnVjdG9ycyIsInJldFR5cGUiLCJjbGFzc1BhcmFtIl07dmFyIGFyZ3MyPVt0aHJvd0JpbmRpbmdFcnJvcixjcHBJbnZva2VyRnVuYyxjcHBUYXJnZXRGdW5jLHJ1bkRlc3RydWN0b3JzLGFyZ1R5cGVzWzBdLGFyZ1R5cGVzWzFdXTtpZihpc0NsYXNzTWV0aG9kRnVuYyl7aW52b2tlckZuQm9keSs9InZhciB0aGlzV2lyZWQgPSBjbGFzc1BhcmFtLnRvV2lyZVR5cGUoIitkdG9yU3RhY2srIiwgdGhpcyk7XG4ifWZvcih2YXIgaT0wO2k8YXJnQ291bnQtMjsrK2kpe2ludm9rZXJGbkJvZHkrPSJ2YXIgYXJnIitpKyJXaXJlZCA9IGFyZ1R5cGUiK2krIi50b1dpcmVUeXBlKCIrZHRvclN0YWNrKyIsIGFyZyIraSsiKTsgLy8gIithcmdUeXBlc1tpKzJdLm5hbWUrIlxuIjthcmdzMS5wdXNoKCJhcmdUeXBlIitpKTthcmdzMi5wdXNoKGFyZ1R5cGVzW2krMl0pfWlmKGlzQ2xhc3NNZXRob2RGdW5jKXthcmdzTGlzdFdpcmVkPSJ0aGlzV2lyZWQiKyhhcmdzTGlzdFdpcmVkLmxlbmd0aD4wPyIsICI6IiIpK2FyZ3NMaXN0V2lyZWR9aW52b2tlckZuQm9keSs9KHJldHVybnM/InZhciBydiA9ICI6IiIpKyJpbnZva2VyKGZuIisoYXJnc0xpc3RXaXJlZC5sZW5ndGg+MD8iLCAiOiIiKSthcmdzTGlzdFdpcmVkKyIpO1xuIjtpZihuZWVkc0Rlc3RydWN0b3JTdGFjayl7aW52b2tlckZuQm9keSs9InJ1bkRlc3RydWN0b3JzKGRlc3RydWN0b3JzKTtcbiJ9ZWxzZXtmb3IodmFyIGk9aXNDbGFzc01ldGhvZEZ1bmM/MToyO2k8YXJnVHlwZXMubGVuZ3RoOysraSl7dmFyIHBhcmFtTmFtZT1pPT09MT8idGhpc1dpcmVkIjoiYXJnIisoaS0yKSsiV2lyZWQiO2lmKGFyZ1R5cGVzW2ldLmRlc3RydWN0b3JGdW5jdGlvbiE9PW51bGwpe2ludm9rZXJGbkJvZHkrPXBhcmFtTmFtZSsiX2R0b3IoIitwYXJhbU5hbWUrIik7IC8vICIrYXJnVHlwZXNbaV0ubmFtZSsiXG4iO2FyZ3MxLnB1c2gocGFyYW1OYW1lKyJfZHRvciIpO2FyZ3MyLnB1c2goYXJnVHlwZXNbaV0uZGVzdHJ1Y3RvckZ1bmN0aW9uKX19fWlmKHJldHVybnMpe2ludm9rZXJGbkJvZHkrPSJ2YXIgcmV0ID0gcmV0VHlwZS5mcm9tV2lyZVR5cGUocnYpO1xuIisicmV0dXJuIHJldDtcbiJ9ZWxzZXt9aW52b2tlckZuQm9keSs9In1cbiI7YXJnczEucHVzaChpbnZva2VyRm5Cb2R5KTt2YXIgaW52b2tlckZ1bmN0aW9uPW5ld18oRnVuY3Rpb24sYXJnczEpLmFwcGx5KG51bGwsYXJnczIpO3JldHVybiBpbnZva2VyRnVuY3Rpb259ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24ocmF3Q2xhc3NUeXBlLG1ldGhvZE5hbWUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUscmF3SW52b2tlcixjb250ZXh0LGlzUHVyZVZpcnR1YWwpe3ZhciByYXdBcmdUeXBlcz1oZWFwMzJWZWN0b3JUb0FycmF5KGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcik7bWV0aG9kTmFtZT1yZWFkTGF0aW4xU3RyaW5nKG1ldGhvZE5hbWUpO3Jhd0ludm9rZXI9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oaW52b2tlclNpZ25hdHVyZSxyYXdJbnZva2VyKTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxbcmF3Q2xhc3NUeXBlXSxmdW5jdGlvbihjbGFzc1R5cGUpe2NsYXNzVHlwZT1jbGFzc1R5cGVbMF07dmFyIGh1bWFuTmFtZT1jbGFzc1R5cGUubmFtZSsiLiIrbWV0aG9kTmFtZTtpZihpc1B1cmVWaXJ0dWFsKXtjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLnB1cmVWaXJ0dWFsRnVuY3Rpb25zLnB1c2gobWV0aG9kTmFtZSl9ZnVuY3Rpb24gdW5ib3VuZFR5cGVzSGFuZGxlcigpe3Rocm93VW5ib3VuZFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgIitodW1hbk5hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIscmF3QXJnVHlwZXMpfXZhciBwcm90bz1jbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlO3ZhciBtZXRob2Q9cHJvdG9bbWV0aG9kTmFtZV07aWYodW5kZWZpbmVkPT09bWV0aG9kfHx1bmRlZmluZWQ9PT1tZXRob2Qub3ZlcmxvYWRUYWJsZSYmbWV0aG9kLmNsYXNzTmFtZSE9PWNsYXNzVHlwZS5uYW1lJiZtZXRob2QuYXJnQ291bnQ9PT1hcmdDb3VudC0yKXt1bmJvdW5kVHlwZXNIYW5kbGVyLmFyZ0NvdW50PWFyZ0NvdW50LTI7dW5ib3VuZFR5cGVzSGFuZGxlci5jbGFzc05hbWU9Y2xhc3NUeXBlLm5hbWU7cHJvdG9bbWV0aG9kTmFtZV09dW5ib3VuZFR5cGVzSGFuZGxlcn1lbHNle2Vuc3VyZU92ZXJsb2FkVGFibGUocHJvdG8sbWV0aG9kTmFtZSxodW1hbk5hbWUpO3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGVbYXJnQ291bnQtMl09dW5ib3VuZFR5cGVzSGFuZGxlcn13aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxyYXdBcmdUeXBlcyxmdW5jdGlvbihhcmdUeXBlcyl7dmFyIG1lbWJlckZ1bmN0aW9uPWNyYWZ0SW52b2tlckZ1bmN0aW9uKGh1bWFuTmFtZSxhcmdUeXBlcyxjbGFzc1R5cGUscmF3SW52b2tlcixjb250ZXh0KTtpZih1bmRlZmluZWQ9PT1wcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlKXttZW1iZXJGdW5jdGlvbi5hcmdDb3VudD1hcmdDb3VudC0yO3Byb3RvW21ldGhvZE5hbWVdPW1lbWJlckZ1bmN0aW9ufWVsc2V7cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmdDb3VudC0yXT1tZW1iZXJGdW5jdGlvbn1yZXR1cm5bXX0pO3JldHVybltdfSl9dmFyIGVtdmFsX2ZyZWVfbGlzdD1bXTt2YXIgZW12YWxfaGFuZGxlX2FycmF5PVt7fSx7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX1dO2Z1bmN0aW9uIF9fZW12YWxfZGVjcmVmKGhhbmRsZSl7aWYoaGFuZGxlPjQmJjA9PT0tLWVtdmFsX2hhbmRsZV9hcnJheVtoYW5kbGVdLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXT11bmRlZmluZWQ7ZW12YWxfZnJlZV9saXN0LnB1c2goaGFuZGxlKX19ZnVuY3Rpb24gY291bnRfZW12YWxfaGFuZGxlcygpe3ZhciBjb3VudD0wO2Zvcih2YXIgaT01O2k8ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDsrK2kpe2lmKGVtdmFsX2hhbmRsZV9hcnJheVtpXSE9PXVuZGVmaW5lZCl7Kytjb3VudH19cmV0dXJuIGNvdW50fWZ1bmN0aW9uIGdldF9maXJzdF9lbXZhbCgpe2Zvcih2YXIgaT01O2k8ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDsrK2kpe2lmKGVtdmFsX2hhbmRsZV9hcnJheVtpXSE9PXVuZGVmaW5lZCl7cmV0dXJuIGVtdmFsX2hhbmRsZV9hcnJheVtpXX19cmV0dXJuIG51bGx9ZnVuY3Rpb24gaW5pdF9lbXZhbCgpe01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7TW9kdWxlWyJnZXRfZmlyc3RfZW12YWwiXT1nZXRfZmlyc3RfZW12YWx9ZnVuY3Rpb24gX19lbXZhbF9yZWdpc3Rlcih2YWx1ZSl7c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDp7cmV0dXJuIDF9Y2FzZSBudWxsOntyZXR1cm4gMn1jYXNlIHRydWU6e3JldHVybiAzfWNhc2UgZmFsc2U6e3JldHVybiA0fWRlZmF1bHQ6e3ZhciBoYW5kbGU9ZW12YWxfZnJlZV9saXN0Lmxlbmd0aD9lbXZhbF9mcmVlX2xpc3QucG9wKCk6ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXT17cmVmY291bnQ6MSx2YWx1ZTp2YWx1ZX07cmV0dXJuIGhhbmRsZX19fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsKHJhd1R5cGUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24oaGFuZGxlKXt2YXIgcnY9ZW12YWxfaGFuZGxlX2FycmF5W2hhbmRsZV0udmFsdWU7X19lbXZhbF9kZWNyZWYoaGFuZGxlKTtyZXR1cm4gcnZ9LCJ0b1dpcmVUeXBlIjpmdW5jdGlvbihkZXN0cnVjdG9ycyx2YWx1ZSl7cmV0dXJuIF9fZW12YWxfcmVnaXN0ZXIodmFsdWUpfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIGVudW1SZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LHNpZ25lZCl7c3dpdGNoKHNoaWZ0KXtjYXNlIDA6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwPXNpZ25lZD9IRUFQODpIRUFQVTg7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKGhlYXBbcG9pbnRlcl0pfTtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwPXNpZ25lZD9IRUFQMTY6SEVBUFUxNjtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oaGVhcFtwb2ludGVyPj4xXSl9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7dmFyIGhlYXA9c2lnbmVkP0hFQVAzMjpIRUFQVTMyO3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShoZWFwW3BvaW50ZXI+PjJdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKCJVbmtub3duIGludGVnZXIgdHlwZTogIituYW1lKX19ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfZW51bShyYXdUeXBlLG5hbWUsc2l6ZSxpc1NpZ25lZCl7dmFyIHNoaWZ0PWdldFNoaWZ0RnJvbVNpemUoc2l6ZSk7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO2Z1bmN0aW9uIGN0b3IoKXt9Y3Rvci52YWx1ZXM9e307cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSxjb25zdHJ1Y3RvcjpjdG9yLCJmcm9tV2lyZVR5cGUiOmZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yLnZhbHVlc1tjXX0sInRvV2lyZVR5cGUiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLGMpe3JldHVybiBjLnZhbHVlfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjplbnVtUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaGlmdCxpc1NpZ25lZCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTtleHBvc2VQdWJsaWNTeW1ib2wobmFtZSxjdG9yKX1mdW5jdGlvbiByZXF1aXJlUmVnaXN0ZXJlZFR5cGUocmF3VHlwZSxodW1hbk5hbWUpe3ZhciBpbXBsPXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXTtpZih1bmRlZmluZWQ9PT1pbXBsKXt0aHJvd0JpbmRpbmdFcnJvcihodW1hbk5hbWUrIiBoYXMgdW5rbm93biB0eXBlICIrZ2V0VHlwZU5hbWUocmF3VHlwZSkpfXJldHVybiBpbXBsfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2VudW1fdmFsdWUocmF3RW51bVR5cGUsbmFtZSxlbnVtVmFsdWUpe3ZhciBlbnVtVHlwZT1yZXF1aXJlUmVnaXN0ZXJlZFR5cGUocmF3RW51bVR5cGUsImVudW0iKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7dmFyIEVudW09ZW51bVR5cGUuY29uc3RydWN0b3I7dmFyIFZhbHVlPU9iamVjdC5jcmVhdGUoZW51bVR5cGUuY29uc3RydWN0b3IucHJvdG90eXBlLHt2YWx1ZTp7dmFsdWU6ZW51bVZhbHVlfSxjb25zdHJ1Y3Rvcjp7dmFsdWU6Y3JlYXRlTmFtZWRGdW5jdGlvbihlbnVtVHlwZS5uYW1lKyJfIituYW1lLGZ1bmN0aW9uKCl7fSl9fSk7RW51bS52YWx1ZXNbZW51bVZhbHVlXT1WYWx1ZTtFbnVtW25hbWVdPVZhbHVlfWZ1bmN0aW9uIF9lbWJpbmRfcmVwcih2KXtpZih2PT09bnVsbCl7cmV0dXJuIm51bGwifXZhciB0PXR5cGVvZiB2O2lmKHQ9PT0ib2JqZWN0Inx8dD09PSJhcnJheSJ8fHQ9PT0iZnVuY3Rpb24iKXtyZXR1cm4gdi50b1N0cmluZygpfWVsc2V7cmV0dXJuIiIrdn19ZnVuY3Rpb24gZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0KXtzd2l0Y2goc2hpZnQpe2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVBGMzJbcG9pbnRlcj4+Ml0pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjY0W3BvaW50ZXI+PjNdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKCJVbmtub3duIGZsb2F0IHR5cGU6ICIrbmFtZSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0KHJhd1R5cGUsbmFtZSxzaXplKXt2YXIgc2hpZnQ9Z2V0U2hpZnRGcm9tU2l6ZShzaXplKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpmdW5jdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHR5cGVvZiB2YWx1ZSE9PSJudW1iZXIiJiZ0eXBlb2YgdmFsdWUhPT0iYm9vbGVhbiIpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0ICInK19lbWJpbmRfcmVwcih2YWx1ZSkrJyIgdG8gJyt0aGlzLm5hbWUpfXJldHVybiB2YWx1ZX0sImFyZ1BhY2tBZHZhbmNlIjo4LCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0KSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIGludGVnZXJSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LHNpZ25lZCl7c3dpdGNoKHNoaWZ0KXtjYXNlIDA6cmV0dXJuIHNpZ25lZD9mdW5jdGlvbiByZWFkUzhGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDhbcG9pbnRlcl19OmZ1bmN0aW9uIHJlYWRVOEZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiBIRUFQVThbcG9pbnRlcl19O2Nhc2UgMTpyZXR1cm4gc2lnbmVkP2Z1bmN0aW9uIHJlYWRTMTZGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDE2W3BvaW50ZXI+PjFdfTpmdW5jdGlvbiByZWFkVTE2RnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIEhFQVBVMTZbcG9pbnRlcj4+MV19O2Nhc2UgMjpyZXR1cm4gc2lnbmVkP2Z1bmN0aW9uIHJlYWRTMzJGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDMyW3BvaW50ZXI+PjJdfTpmdW5jdGlvbiByZWFkVTMyRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIEhFQVBVMzJbcG9pbnRlcj4+Ml19O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBpbnRlZ2VyIHR5cGU6ICIrbmFtZSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2Upe25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtpZihtYXhSYW5nZT09PS0xKXttYXhSYW5nZT00Mjk0OTY3Mjk1fXZhciBzaGlmdD1nZXRTaGlmdEZyb21TaXplKHNpemUpO3ZhciBmcm9tV2lyZVR5cGU9ZnVuY3Rpb24odmFsdWUpe3JldHVybiB2YWx1ZX07aWYobWluUmFuZ2U9PT0wKXt2YXIgYml0c2hpZnQ9MzItOCpzaXplO2Zyb21XaXJlVHlwZT1mdW5jdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0fX12YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmRleE9mKCJ1bnNpZ25lZCIpIT0tMTtyZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHR5cGVvZiB2YWx1ZSE9PSJudW1iZXIiJiZ0eXBlb2YgdmFsdWUhPT0iYm9vbGVhbiIpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0ICInK19lbWJpbmRfcmVwcih2YWx1ZSkrJyIgdG8gJyt0aGlzLm5hbWUpfWlmKHZhbHVlPG1pblJhbmdlfHx2YWx1ZT5tYXhSYW5nZSl7dGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2luZyBhIG51bWJlciAiJytfZW1iaW5kX3JlcHIodmFsdWUpKyciIGZyb20gSlMgc2lkZSB0byBDL0MrKyBzaWRlIHRvIGFuIGFyZ3VtZW50IG9mIHR5cGUgIicrbmFtZSsnIiwgd2hpY2ggaXMgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2UgWycrbWluUmFuZ2UrIiwgIittYXhSYW5nZSsiXSEiKX1yZXR1cm4gaXNVbnNpZ25lZFR5cGU/dmFsdWU+Pj4wOnZhbHVlfDB9LCJhcmdQYWNrQWR2YW5jZSI6OCwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmludGVnZXJSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldyhyYXdUeXBlLGRhdGFUeXBlSW5kZXgsbmFtZSl7dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXtoYW5kbGU9aGFuZGxlPj4yO3ZhciBoZWFwPUhFQVBVMzI7dmFyIHNpemU9aGVhcFtoYW5kbGVdO3ZhciBkYXRhPWhlYXBbaGFuZGxlKzFdO3JldHVybiBuZXcgVEEoYnVmZmVyLGRhdGEsc2l6ZSl9bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZGVjb2RlTWVtb3J5VmlldywiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpkZWNvZGVNZW1vcnlWaWV3fSx7aWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9uczp0cnVlfSl9ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyhyYXdUeXBlLG5hbWUpe25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24odmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHN0cjtpZihzdGRTdHJpbmdJc1VURjgpe3ZhciBkZWNvZGVTdGFydFB0cj12YWx1ZSs0O2Zvcih2YXIgaT0wO2k8PWxlbmd0aDsrK2kpe3ZhciBjdXJyZW50Qnl0ZVB0cj12YWx1ZSs0K2k7aWYoaT09bGVuZ3RofHxIRUFQVThbY3VycmVudEJ5dGVQdHJdPT0wKXt2YXIgbWF4UmVhZD1jdXJyZW50Qnl0ZVB0ci1kZWNvZGVTdGFydFB0cjt2YXIgc3RyaW5nU2VnbWVudD1VVEY4VG9TdHJpbmcoZGVjb2RlU3RhcnRQdHIsbWF4UmVhZCk7aWYoc3RyPT09dW5kZWZpbmVkKXtzdHI9c3RyaW5nU2VnbWVudH1lbHNle3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnR9ZGVjb2RlU3RhcnRQdHI9Y3VycmVudEJ5dGVQdHIrMX19fWVsc2V7dmFyIGE9bmV3IEFycmF5KGxlbmd0aCk7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXthW2ldPVN0cmluZy5mcm9tQ2hhckNvZGUoSEVBUFU4W3ZhbHVlKzQraV0pfXN0cj1hLmpvaW4oIiIpfV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKX12YXIgZ2V0TGVuZ3RoO3ZhciB2YWx1ZUlzT2ZUeXBlU3RyaW5nPXR5cGVvZiB2YWx1ZT09PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIil9aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtnZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gbGVuZ3RoQnl0ZXNVVEY4KHZhbHVlKX19ZWxzZXtnZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gdmFsdWUubGVuZ3RofX12YXIgbGVuZ3RoPWdldExlbmd0aCgpO3ZhciBwdHI9X21hbGxvYyg0K2xlbmd0aCsxKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoO2lmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7c3RyaW5nVG9VVEY4KHZhbHVlLHB0cis0LGxlbmd0aCsxKX1lbHNle2lmKHZhbHVlSXNPZlR5cGVTdHJpbmcpe2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7dmFyIGNoYXJDb2RlPXZhbHVlLmNoYXJDb2RlQXQoaSk7aWYoY2hhckNvZGU+MjU1KXtfZnJlZShwdHIpO3Rocm93QmluZGluZ0Vycm9yKCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHMiKX1IRUFQVThbcHRyKzQraV09Y2hhckNvZGV9fWVsc2V7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyKzQraV09dmFsdWVbaV19fX1pZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKX1yZXR1cm4gcHRyfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246ZnVuY3Rpb24ocHRyKXtfZnJlZShwdHIpfX0pfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nKHJhd1R5cGUsY2hhclNpemUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9ZnVuY3Rpb24oKXtyZXR1cm4gSEVBUFUxNn07c2hpZnQ9MX1lbHNlIGlmKGNoYXJTaXplPT09NCl7ZGVjb2RlU3RyaW5nPVVURjMyVG9TdHJpbmc7ZW5jb2RlU3RyaW5nPXN0cmluZ1RvVVRGMzI7bGVuZ3RoQnl0ZXNVVEY9bGVuZ3RoQnl0ZXNVVEYzMjtnZXRIZWFwPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVBVMzJ9O3NoaWZ0PTJ9cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpmdW5jdGlvbih2YWx1ZSl7dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnR9ZWxzZXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplfX1fZnJlZSh2YWx1ZSk7cmV0dXJuIHN0cn0sInRvV2lyZVR5cGUiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtpZighKHR5cGVvZiB2YWx1ZT09PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICIrbmFtZSl9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKX1yZXR1cm4gcHRyfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246ZnVuY3Rpb24ocHRyKXtfZnJlZShwdHIpfX0pfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQocmF3VHlwZSxuYW1lKXtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse2lzVm9pZDp0cnVlLG5hbWU6bmFtZSwiYXJnUGFja0FkdmFuY2UiOjAsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24oKXtyZXR1cm4gdW5kZWZpbmVkfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIHVuZGVmaW5lZH19KX1mdW5jdGlvbiBfX2VtdmFsX2luY3JlZihoYW5kbGUpe2lmKGhhbmRsZT40KXtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXS5yZWZjb3VudCs9MX19ZnVuY3Rpb24gX19lbXZhbF90YWtlX3ZhbHVlKHR5cGUsYXJndil7dHlwZT1yZXF1aXJlUmVnaXN0ZXJlZFR5cGUodHlwZSwiX2VtdmFsX3Rha2VfdmFsdWUiKTt2YXIgdj10eXBlWyJyZWFkVmFsdWVGcm9tUG9pbnRlciJdKGFyZ3YpO3JldHVybiBfX2VtdmFsX3JlZ2lzdGVyKHYpfWZ1bmN0aW9uIF9hYm9ydCgpe2Fib3J0KCl9dmFyIF9lbXNjcmlwdGVuX2dldF9ub3c7X2Vtc2NyaXB0ZW5fZ2V0X25vdz1mdW5jdGlvbigpe3JldHVybiBwZXJmb3JtYW5jZS5ub3coKX07dmFyIF9lbXNjcmlwdGVuX2dldF9ub3dfaXNfbW9ub3RvbmljPXRydWU7ZnVuY3Rpb24gc2V0RXJyTm8odmFsdWUpe0hFQVAzMltfX19lcnJub19sb2NhdGlvbigpPj4yXT12YWx1ZTtyZXR1cm4gdmFsdWV9ZnVuY3Rpb24gX2Nsb2NrX2dldHRpbWUoY2xrX2lkLHRwKXt2YXIgbm93O2lmKGNsa19pZD09PTApe25vdz1EYXRlLm5vdygpfWVsc2UgaWYoKGNsa19pZD09PTF8fGNsa19pZD09PTQpJiZfZW1zY3JpcHRlbl9nZXRfbm93X2lzX21vbm90b25pYyl7bm93PV9lbXNjcmlwdGVuX2dldF9ub3coKX1lbHNle3NldEVyck5vKDI4KTtyZXR1cm4tMX1IRUFQMzJbdHA+PjJdPW5vdy8xZTN8MDtIRUFQMzJbdHArND4+Ml09bm93JTFlMyoxZTMqMWUzfDA7cmV0dXJuIDB9ZnVuY3Rpb24gX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZyhkZXN0LHNyYyxudW0pe0hFQVBVOC5jb3B5V2l0aGluKGRlc3Qsc3JjLHNyYytudW0pfWZ1bmN0aW9uIGFib3J0T25DYW5ub3RHcm93TWVtb3J5KHJlcXVlc3RlZFNpemUpe2Fib3J0KCJPT00iKX1mdW5jdGlvbiBfZW1zY3JpcHRlbl9yZXNpemVfaGVhcChyZXF1ZXN0ZWRTaXplKXthYm9ydE9uQ2Fubm90R3Jvd01lbW9yeShyZXF1ZXN0ZWRTaXplKX12YXIgU1lTQ0FMTFM9e21hcHBpbmdzOnt9LGJ1ZmZlcnM6W251bGwsW10sW11dLHByaW50Q2hhcjpmdW5jdGlvbihzdHJlYW0sY3Vycil7dmFyIGJ1ZmZlcj1TWVNDQUxMUy5idWZmZXJzW3N0cmVhbV07aWYoY3Vycj09PTB8fGN1cnI9PT0xMCl7KHN0cmVhbT09PTE/b3V0OmVycikoVVRGOEFycmF5VG9TdHJpbmcoYnVmZmVyLDApKTtidWZmZXIubGVuZ3RoPTB9ZWxzZXtidWZmZXIucHVzaChjdXJyKX19LHZhcmFyZ3M6dW5kZWZpbmVkLGdldDpmdW5jdGlvbigpe1NZU0NBTExTLnZhcmFyZ3MrPTQ7dmFyIHJldD1IRUFQMzJbU1lTQ0FMTFMudmFyYXJncy00Pj4yXTtyZXR1cm4gcmV0fSxnZXRTdHI6ZnVuY3Rpb24ocHRyKXt2YXIgcmV0PVVURjhUb1N0cmluZyhwdHIpO3JldHVybiByZXR9LGdldDY0OmZ1bmN0aW9uKGxvdyxoaWdoKXtyZXR1cm4gbG93fX07ZnVuY3Rpb24gX2ZkX2Nsb3NlKGZkKXtyZXR1cm4gMH1mdW5jdGlvbiBfZmRfc2VlayhmZCxvZmZzZXRfbG93LG9mZnNldF9oaWdoLHdoZW5jZSxuZXdPZmZzZXQpe31mdW5jdGlvbiBfZmRfd3JpdGUoZmQsaW92LGlvdmNudCxwbnVtKXt2YXIgbnVtPTA7Zm9yKHZhciBpPTA7aTxpb3ZjbnQ7aSsrKXt2YXIgcHRyPUhFQVAzMltpb3YraSo4Pj4yXTt2YXIgbGVuPUhFQVAzMltpb3YrKGkqOCs0KT4+Ml07Zm9yKHZhciBqPTA7ajxsZW47aisrKXtTWVNDQUxMUy5wcmludENoYXIoZmQsSEVBUFU4W3B0citqXSl9bnVtKz1sZW59SEVBUDMyW3BudW0+PjJdPW51bTtyZXR1cm4gMH1mdW5jdGlvbiBfc2V0VGVtcFJldDAoJGkpe3NldFRlbXBSZXQwKCRpfDApfWZ1bmN0aW9uIF90aW1lKHB0cil7dmFyIHJldD1EYXRlLm5vdygpLzFlM3wwO2lmKHB0cil7SEVBUDMyW3B0cj4+Ml09cmV0fXJldHVybiByZXR9ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09ZXh0ZW5kRXJyb3IoRXJyb3IsIkJpbmRpbmdFcnJvciIpO0ludGVybmFsRXJyb3I9TW9kdWxlWyJJbnRlcm5hbEVycm9yIl09ZXh0ZW5kRXJyb3IoRXJyb3IsIkludGVybmFsRXJyb3IiKTtpbml0X0NsYXNzSGFuZGxlKCk7aW5pdF9SZWdpc3RlcmVkUG9pbnRlcigpO2luaXRfZW1iaW5kKCk7VW5ib3VuZFR5cGVFcnJvcj1Nb2R1bGVbIlVuYm91bmRUeXBlRXJyb3IiXT1leHRlbmRFcnJvcihFcnJvciwiVW5ib3VuZFR5cGVFcnJvciIpO2luaXRfZW12YWwoKTt2YXIgYXNtTGlicmFyeUFyZz17ImMiOl9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24sImIiOl9fX2N4YV90aHJvdywieSI6X19lbWJpbmRfcmVnaXN0ZXJfYm9vbCwiZyI6X19lbWJpbmRfcmVnaXN0ZXJfY2xhc3MsImYiOl9fZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NvbnN0cnVjdG9yLCJhIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbiwieCI6X19lbWJpbmRfcmVnaXN0ZXJfZW12YWwsIkEiOl9fZW1iaW5kX3JlZ2lzdGVyX2VudW0sImsiOl9fZW1iaW5kX3JlZ2lzdGVyX2VudW1fdmFsdWUsIm8iOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LCJlIjpfX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyLCJkIjpfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldywicCI6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZywiaiI6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcsInoiOl9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQsImwiOl9fZW12YWxfZGVjcmVmLCJtIjpfX2VtdmFsX2luY3JlZiwiaCI6X19lbXZhbF90YWtlX3ZhbHVlLCJpIjpfYWJvcnQsInYiOl9jbG9ja19nZXR0aW1lLCJ0IjpfZW1zY3JpcHRlbl9tZW1jcHlfYmlnLCJ1IjpfZW1zY3JpcHRlbl9yZXNpemVfaGVhcCwidyI6X2ZkX2Nsb3NlLCJyIjpfZmRfc2VlaywibiI6X2ZkX3dyaXRlLCJzIjpfc2V0VGVtcFJldDAsInEiOl90aW1lfTt2YXIgYXNtPWNyZWF0ZVdhc20oKTt2YXIgX19fd2FzbV9jYWxsX2N0b3JzPU1vZHVsZVsiX19fd2FzbV9jYWxsX2N0b3JzIl09YXNtWyJDIl07dmFyIF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09YXNtWyJEIl07dmFyIF9fX2dldFR5cGVOYW1lPU1vZHVsZVsiX19fZ2V0VHlwZU5hbWUiXT1hc21bIkYiXTt2YXIgX19fZW1iaW5kX3JlZ2lzdGVyX25hdGl2ZV9hbmRfYnVpbHRpbl90eXBlcz1Nb2R1bGVbIl9fX2VtYmluZF9yZWdpc3Rlcl9uYXRpdmVfYW5kX2J1aWx0aW5fdHlwZXMiXT1hc21bIkciXTt2YXIgX19fZXJybm9fbG9jYXRpb249TW9kdWxlWyJfX19lcnJub19sb2NhdGlvbiJdPWFzbVsiSCJdO3ZhciBfZnJlZT1Nb2R1bGVbIl9mcmVlIl09YXNtWyJJIl07dmFyIGR5bkNhbGxfamlqaT1Nb2R1bGVbImR5bkNhbGxfamlqaSJdPWFzbVsiSiJdO3ZhciBjYWxsZWRSdW47ZGVwZW5kZW5jaWVzRnVsZmlsbGVkPWZ1bmN0aW9uIHJ1bkNhbGxlcigpe2lmKCFjYWxsZWRSdW4pcnVuKCk7aWYoIWNhbGxlZFJ1bilkZXBlbmRlbmNpZXNGdWxmaWxsZWQ9cnVuQ2FsbGVyfTtmdW5jdGlvbiBydW4oYXJncyl7YXJncz1hcmdzfHxhcmd1bWVudHNfO2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59cHJlUnVuKCk7aWYocnVuRGVwZW5kZW5jaWVzPjApe3JldHVybn1mdW5jdGlvbiBkb1J1bigpe2lmKGNhbGxlZFJ1bilyZXR1cm47Y2FsbGVkUnVuPXRydWU7TW9kdWxlWyJjYWxsZWRSdW4iXT10cnVlO2lmKEFCT1JUKXJldHVybjtpbml0UnVudGltZSgpO3ByZU1haW4oKTtyZWFkeVByb21pc2VSZXNvbHZlKE1vZHVsZSk7aWYoTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKU1vZHVsZVsib25SdW50aW1lSW5pdGlhbGl6ZWQiXSgpO3Bvc3RSdW4oKX1pZihNb2R1bGVbInNldFN0YXR1cyJdKXtNb2R1bGVbInNldFN0YXR1cyJdKCJSdW5uaW5nLi4uIik7c2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtNb2R1bGVbInNldFN0YXR1cyJdKCIiKX0sMSk7ZG9SdW4oKX0sMSl9ZWxzZXtkb1J1bigpfX1Nb2R1bGVbInJ1biJdPXJ1bjtpZihNb2R1bGVbInByZUluaXQiXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlSW5pdCJdPT0iZnVuY3Rpb24iKU1vZHVsZVsicHJlSW5pdCJdPVtNb2R1bGVbInByZUluaXQiXV07d2hpbGUoTW9kdWxlWyJwcmVJbml0Il0ubGVuZ3RoPjApe01vZHVsZVsicHJlSW5pdCJdLnBvcCgpKCl9fXJ1bigpOwoKCiAgcmV0dXJuIE1vZHVsZQp9Cik7Cn0pKCk7Ci8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gY29uc3QgUnVudGltZSA9IChNb2R1bGUpOwo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvd29ya2VyL1V0aWxzLmpzCi8qKgogKiBBdXhpbGlhciBtZXRob2QgdG8gZGVsZXRlIGEgV2ViQXNzZW1ibHkgU2lkZSBWYXJpYWJsZXMKICoKICogQHBhcmFtIHthcnJheX0gYXJyYXkgVGhlIGFycmF5IHdpdGggbiBlbGVtZW50cwogKi8KY29uc3QgZGVsZXRlV2FzbVZhciA9ICguLi5hcnJheSkgPT4gewogICAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7CiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gInVuZGVmaW5lZCIpIHsKICAgICAgICAgICAgb2JqLmRlbGV0ZSgpOwogICAgICAgIH0KICAgIH0pOwp9OwoKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuLi9sb2dnZXJfbW9kdWxlL3NyYy9NYWluLmpzCmNvbnN0IExvZ2dlckxldmVsID0gewogICAgREVCVUc6IDAsCiAgICBJTkZPOiAxLAogICAgV0FSTklORzogMiwKICAgIEVSUk9SOiAzCn07CgpsZXQgX19sb2dnZXJUYWcgPSAiIjsKbGV0IF9fY3VycmVudExvZ2dpbmdMZXZlbCA9IExvZ2dlckxldmVsLldBUk5JTkc7CgoKY2xhc3MgTG9nZ2VyIHsKCiAgICBzdGF0aWMgcHJpbnREZWJ1ZyguLi52YWx1ZXMpIHsKICAgICAgICBpZiAoTG9nZ2VyTGV2ZWwuREVCVUcgPj0gX19jdXJyZW50TG9nZ2luZ0xldmVsKSB7CiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYDxEPiBbJHtfX2xvZ2dlclRhZ31dICR7dmFsdWVzfWApOwogICAgICAgIH0KICAgIH0KCiAgICBzdGF0aWMgcHJpbnRJbmZvKC4uLnZhbHVlcykgewogICAgICAgIGlmIChMb2dnZXJMZXZlbC5JTkZPID49IF9fY3VycmVudExvZ2dpbmdMZXZlbCkgewogICAgICAgICAgICBjb25zb2xlLmRlYnVnKGA8ST4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHByaW50V2FybmluZyguLi52YWx1ZXMpIHsKICAgICAgICBpZiAoTG9nZ2VyTGV2ZWwuV0FSTklORyA+PSBfX2N1cnJlbnRMb2dnaW5nTGV2ZWwpIHsKICAgICAgICAgICAgY29uc29sZS53YXJuKGA8Vz4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHByaW50RXJyb3IoLi4udmFsdWVzKSB7CiAgICAgICAgaWYgKExvZ2dlckxldmVsLkVSUk9SID49IF9fY3VycmVudExvZ2dpbmdMZXZlbCkgewogICAgICAgICAgICBjb25zb2xlLmVycm9yKGA8RT4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHNldExvZ2dlckxldmVsKGxvZ2dlckx2bCkgewogICAgICAgIF9fY3VycmVudExvZ2dpbmdMZXZlbCA9IGxvZ2dlckx2bDsKICAgIH0KCiAgICBzdGF0aWMgc2V0TG9nZ2VyVGFnKGxvZ2dlclRhZykgewogICAgICAgIF9fbG9nZ2VyVGFnID0gbG9nZ2VyVGFnOwogICAgfQp9CgoKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3dvcmtlci9FdmVudHMuanMKCgoKCmxldCBpbnN0YW5jZSA9IG51bGw7CmxldCBidW5kbGVQYXRoID0gIiI7CmxldCB0b2tlbml6ZXIgPSBudWxsOwoKY29uc3QgcHJlaW5pdGlhbGl6ZVdvcmtlciA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICBMb2dnZXIucHJpbnREZWJ1ZygiUmVjZWl2ZWQgbWVzc2FnZSBpbiAiICsgInByZUluaXQiICsgIiBldmVudCIpOwoKICAgIC8vIFByb2Nlc3MgaW5wdXQgdmFyaWFibGVzCiAgICBidW5kbGVQYXRoID0gbWVzc2FnZS5idW5kbGVQYXRoOwoKICAgIHRyeSB7CiAgICAgICAgLyoKICAgICAgICAgKiBBc3luYyBmZXRjaCBiZWZvcmUgZ2V0IHRoZSBpbnN0YW5jZQogICAgICAgICAqIAogICAgICAgICAqIEltcG9ydGFudDogRHVlIHRvIHRoZSBuZWVkIG9mIHBhY2thZ2luZyB0aGUgV29ya2VyIGluc2lkZSB0aGUgc2VscGhpLXdpZGdldC13ZWIubWluLmpzIHVzaW5nCiAgICAgICAgICogICAgICAgICAgICBXZWJQYWNrLCBpcyBuZWVkZWQgdG8gYnVpbGQgdGhlIGV4dHJhY3RvciB1c2luZyB0aGlzIHBhcmFtZXRlcnM6CiAgICAgICAgICoKICAgICAgICAgKiAtcyBFWFBPUlRfRVM2PTEgLXMgVVNFX0VTNl9JTVBPUlRfTUVUQT0wIC1zIFdBU01fQVNZTkNfQ09NUElMQVRJT049MCAtcyBFTlZJUk9OTUVOVD0id2ViIgogICAgICAgICAqLwogICAgICAgIGxldCB3YXNtTW9kdWxlID0gYXdhaXQgKGF3YWl0IGZldGNoKGJ1bmRsZVBhdGggKyAiL0ZCVG9rZW5pemVyLndhc20iKSkuYXJyYXlCdWZmZXIoKTsKCiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgbW9kdWxlIGluIGdsb2JhbHMgbW9kdWxlCiAgICAgICAgaW5zdGFuY2UgPSBhd2FpdCBSdW50aW1lKHsKICAgICAgICAgICAgd2FzbUJpbmFyeSA6IHdhc21Nb2R1bGUsCiAgICAgICAgICAgIG9uUnVudGltZUluaXRpYWxpemVkIDogKCkgPT4gc2VsZi5wb3N0TWVzc2FnZSh7IGNtZDogInByZUluaXQiIH0pCiAgICAgICAgfSk7CgogICAgICAgIC8vIFJlcG9ydCB0aGUgc3VjY2Vzc2Z1bCBsb2FkIG9mIG1vZHVsZSB0byBkZWJ1ZyBtZXNzYWdlCiAgICAgICAgTG9nZ2VyLnByaW50RGVidWcoIlByZWxvYWRpbmcgd2FzbSBtb2R1bGUgZnJvbSBwYXRoOiAiICsgYnVuZGxlUGF0aCArICIvRkJUb2tlbml6ZXIud2FzbSIpOwogICAgfSBjYXRjaCAoZSkgewogICAgICAgIC8vIENyaXRpY2FsIGVycm9yIGhhcyBvY2N1cnJlZCBpbiB0aGUgV29ya2VyIFNpZGUsIHNlbmRpbmcgdG8gbWFpbiB0aHJlYWQKICAgICAgICBMb2dnZXIucHJpbnRFcnJvcigiW1dvcmtlcl06ICIgKyBlKTsKICAgIH0KfTsKCgpjb25zdCBpbml0aWFsaXplQXNzZW1ibHkgPSAoXykgPT4gewogICAgdG9rZW5pemVyID0gbmV3IGluc3RhbmNlLlRva2VuaXplcigpOwoKICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBjbWQ6ICJpbml0aWFsaXplQXNzZW1ibHkiIH0pOwp9OwoKCmNvbnN0IGNsZWFyID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgdG9rZW5pemVyLmNsZWFyKCk7CiAgICAgICAgfQoKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImNsZWFyIgogICAgICAgIH0pOwogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImNsZWFyIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgY2xlYXJpbmcgdGhlIHRva2VuaXplciEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZ2V0RG9jdW1lbnREYXRhID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IGtleXMgPSB0b2tlbml6ZXIuZ2V0RG9jdW1lbnREYXRhKCkua2V5cygpOwogICAgICAgICAgICBsZXQgb2JqUmVzdWx0PXt9OwogICAgICAgICAgICBmb3IobGV0IGlkeCA9IDA7IGlkeCA8IGtleXMuc2l6ZSgpOyBpZHgrKyl7CiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5cy5nZXQoaWR4KTsKICAgICAgICAgICAgICAgIG9ialJlc3VsdFtrZXldID0gdG9rZW5pemVyLmdldERvY3VtZW50RGF0YSgpLmdldChrZXkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIC8vTm8gZGViZXLDrWEgZGUgaGFiZXIgbmluZ8O6biBwcm9ibGVtYSBkZSBtZW1vcmlhIHlhIHF1ZSBrZXlzIHkgc3VzIHZhbG9yZXMgbm8gc29uIG9iamV0b3Mgd2FzbQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJnZXREb2N1bWVudERhdGEiLCBwYXlsb2FkOiBvYmpSZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfSBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImdldERvY3VtZW50RGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGRvY3VtZW50IGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZERvY3VtZW50RGF0YSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IG1hcERvY3VtZW50RGF0YSA9IG1lc3NhZ2UucGF5bG9hZDsKICAgICAgICBsZXQgZG9jdW1lbnREYXRhID0gbmV3IGluc3RhbmNlLk1hcFN0clN0cigpOwogICAgICAgIGZvciAoY29uc3Qga2V5IGluIG1hcERvY3VtZW50RGF0YSl7CiAgICAgICAgICAgIGRvY3VtZW50RGF0YS5zZXQoa2V5LG1hcERvY3VtZW50RGF0YVtrZXldKTsKICAgICAgICB9CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIHRva2VuaXplci5hZGREb2N1bWVudERhdGEoZG9jdW1lbnREYXRhKTsKICAgICAgICAgICAgLy8gZG9jdW1lbnREYXRhLmRlbGV0ZSgpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJhZGREb2N1bWVudERhdGEiCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZERvY3VtZW50RGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGFkZGluZyB0aGUgZG9jdW1lbnQgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgcmVtb3ZlRG9jdW1lbnREYXRhV2l0aEtleVN0YXJ0ZWRCeUtleSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IHN0YXJ0aW5nS2V5ID0gbWVzc2FnZS5rZXk7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIucmVtb3ZlRG9jdW1lbnREYXRhV2l0aEtleVN0YXJ0ZWRCeUtleShzdGFydGluZ0tleSk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJyZW1vdmVEb2N1bWVudERhdGFXaXRoS2V5U3RhcnRlZEJ5S2V5IiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogInJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCByZW1vdmluZyB0aGUga2V5IGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEV4dHJhRGF0YSA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCBrZXlzID0gdG9rZW5pemVyLmdldEV4dHJhRGF0YSgpLmtleXMoKTsKICAgICAgICAgICAgbGV0IG9ialJlc3VsdD17fTsKICAgICAgICAgICAgZm9yKGxldCBpZHggPSAwOyBpZHggPCBrZXlzLnNpemUoKTsgaWR4KyspewogICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXMuZ2V0KGlkeCk7CiAgICAgICAgICAgICAgICBvYmpSZXN1bHRba2V5XSA9IHRva2VuaXplci5nZXRFeHRyYURhdGEoKS5nZXQoa2V5KTsKICAgICAgICAgICAgfQogICAgICAgICAgICAvL05vIGRlYmVyw61hIGRlIGhhYmVyIG5pbmfDum4gcHJvYmxlbWEgZGUgbWVtb3JpYSB5YSBxdWUga2V5cyB5IHN1cyB2YWxvcmVzIG5vIHNvbiBvYmpldG9zIHdhc20KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RXh0cmFEYXRhIiwgcGF5bG9hZDogb2JqUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImdldEV4dHJhRGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGV4dHJhIGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZEV4dHJhRGF0YSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7CiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IG5ldyBpbnN0YW5jZS5NYXBTdHJTdHIoKTsKICAgICAgICBleHRyYURhdGEuc2V0KCJFeHRyYURhdGEiLHBheWxvYWQpOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgbWFwUmVzdWx0ID0gdG9rZW5pemVyLmFkZEV4dHJhRGF0YShleHRyYURhdGEpOwogICAgICAgICAgICAvL2V4dHJhRGF0YS5kZWxldGUoKTsKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiYWRkRXh0cmFEYXRhIiwgcGF5bG9hZDogbWFwUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZEV4dHJhRGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGFkZGluZyB0aGUgZXh0cmEgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZ2V0RG9jdW1lbnRNb2RlbCA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCB2ZWN0b3JSZXN1bHQgPSB0b2tlbml6ZXIuZ2V0RG9jdW1lbnRNb2RlbCgpOwoKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RG9jdW1lbnRNb2RlbCIsIHBheWxvYWQ6IHZlY3RvclJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXREb2N1bWVudE1vZGVsIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgZG9jdW1lbnQgbW9kZWwhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZERvY3VtZW50TW9kZWwgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCB2ZWN0b3JTdHJpbmcgPSBtZXNzYWdlLmtleTsKCiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IG1hcFJlc3VsdCA9IHRva2VuaXplci5hZGREb2N1bWVudE1vZGVsKHZlY3RvclN0cmluZyk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJhZGREb2N1bWVudE1vZGVsIiwgcGF5bG9hZDogbWFwUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZERvY3VtZW50TW9kZWwiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBhZGRpbmcgdGhlIGV4dHJhIGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEltYWdlRGF0YSA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZ2V0SW1hZ2VEYXRhKCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEltYWdlRGF0YSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXRJbWFnZURhdGEiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBnZXR0aW5nIHRoZSBpbWFnZSBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBhZGRJbWFnZURhdGEgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBtYXBLZXkgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIHRva2VuaXplci5hZGRJbWFnZURhdGEobWFwS2V5KTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImFkZEltYWdlRGF0YSIKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiYWRkSW1hZ2VEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgYWRkaW5nIHRoZSBpbWFnZSBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRJbnRlcm5hbERhdGEgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgbWFwUmVzdWx0ID0gdG9rZW5pemVyLmdldEludGVybmFsRGF0YSgpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJnZXRJbnRlcm5hbERhdGEiLCBwYXlsb2FkOiBtYXBSZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0SW50ZXJuYWxEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgaW50ZXJuYWwgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgYWRkSW50ZXJuYWxEYXRhID0gYXN5bmMgKG1lc3NhZ2UpID0+IHsKICAgIHRyeSB7CiAgICAgICAgY29uc3QgbWFwRGF0YSA9IG1lc3NhZ2UucGF5bG9hZDsKCiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgdG9rZW5pemVyLmFkZEludGVybmFsRGF0YShtYXBEYXRhKTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImFkZEludGVybmFsRGF0YSIKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiYWRkSW50ZXJuYWxEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgYWRkaW5nIHRoZSBpbnRlcm5hbCBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRFbmNyeXB0b3JUeXBlID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRva2VuaXplci5nZXRFbmNyeXB0b3JUeXBlKCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEVuY3J5cHRvclR5cGUiLCBwYXlsb2FkOiByZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdG9yVHlwZSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGVuY3J5dG9yIHR5cGUhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IHNldEVuY3J5cHRvclR5cGUgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCB0eXBlID0gbWVzc2FnZS50eXBlOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICB0b2tlbml6ZXIuc2V0RW5jcnlwdG9yVHlwZSh0eXBlKTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogInNldEVuY3J5cHRvclR5cGUiCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogInNldEVuY3J5cHRvclR5cGUiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBzZXR0aW5nIHRoZSBlbmNyeXB0b3IgdHlwZSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZW5jcnlwdERpY3Rpb25hcnkgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmVuY3J5cHREaWN0aW9uYXJ5KCk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJlbmNyeXB0RGljdGlvbmFyeSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJlbmNyeXB0RGljdGlvbmFyeSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGVuY3J5cHRpbmcgdGhlIGRpY3Rpb25hcnkhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEVuY3J5cHRlZERpY3Rpb25hcnlCaW5hcnkgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmdldEVuY3J5cHRlZERpY3Rpb25hcnlCaW5hcnkoKTsKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdGVkRGljdGlvbmFyeUJpbmFyeSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5IiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgZW5jcnl0dGVkIGRpY3Rpb25hcnkgYmluYXJ5ISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0ID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRva2VuaXplci5nZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0KCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEVuY3J5cHRlZERpY3Rpb25hcnlCYXNlNjQiLCBwYXlsb2FkOiByZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdGVkRGljdGlvbmFyeUJhc2U2NCIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGVuY3J5cHRlZCBkaWN0aW9uYXJ5IGluIGJhc2U2NCEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZGVjcnlwdERpY3Rpb25hcnlCaW5hcnkgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBkYXRhID0gbWVzc2FnZS5wYXlsb2FkOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmRlY3J5cHREaWN0aW9uYXJ5QmluYXJ5KGRhdGEpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSIsIHBheWxvYWQ6IHJlc3VsdC52YWx1ZQogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGRlY3J5cHRpbmcgdGhlIGRpY3Rpb25hcnkgaW4gYmluYXJ5ISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBkZWNyeXB0RGljdGlvbmFyeUJhc2U2NCA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZGVjcnlwdERpY3Rpb25hcnlCYXNlNjQoZGF0YSk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IiwgcGF5bG9hZDogcmVzdWx0LnZhbHVlCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZGVjcnlwdGluZyB0aGUgZGljdGlvbmFyeSBpbiBiYXNlNjQhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGVuY3J5cHRCdWZmZXIgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBidWZmZXIgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZW5jcnlwdEJ1ZmZlcihidWZmZXIpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJlbmNyeXB0QnVmZmVyIiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImVuY3J5cHRCdWZmZXIiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBlbmNyeXB0aW5nIHRoZSBidWZmZXIhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGRlY3J5cHRCdWZmZXIgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBidWZmZXIgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZGVjcnlwdEJ1ZmZlcihidWZmZXIpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJkZWNyeXB0QnVmZmVyIiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImRlY3J5cHRCdWZmZXIiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBkZWNyeXB0aW5nIHRoZSBidWZmZXIhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCi8qKgogKiBEZXN0cm95IGNyZWF0ZWQgb2JqZWN0cyBpbiBXZWJBc3NlbWJseSBzaWRlCiAqLwpjb25zdCBkZXN0cm95ID0gYXN5bmMgKF8pID0+IHsKICAgIC8vIERlc3Ryb3kgV2ViQXNzZW1ibHkgR2xvYmFscwogICAgZGVsZXRlV2FzbVZhcigKICAgICAgICBpbnN0YW5jZQogICAgKTsKCiAgICAvLyBDbG9zZSBXb3JrZXIgVGhyZWFkCiAgICBjbG9zZSgpOwp9OwoKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvTWFpbi5qcwovKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovCgoKc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkgewogICAgc3dpdGNoKG1lc3NhZ2UuZGF0YS5jbWQpIHsKICAgIGNhc2UgInByZUluaXQiOgogICAgICAgIHByZWluaXRpYWxpemVXb3JrZXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImluaXRpYWxpemVBc3NlbWJseSI6CiAgICAgICAgaW5pdGlhbGl6ZUFzc2VtYmx5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJjbGVhciI6CiAgICAgICAgY2xlYXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImdldERvY3VtZW50RGF0YSI6CiAgICAgICAgZ2V0RG9jdW1lbnREYXRhKG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7ICAgIAogICAgY2FzZSAiYWRkRG9jdW1lbnREYXRhIjoKICAgICAgICBhZGREb2N1bWVudERhdGEobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgInJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkiOgogICAgICAgIHJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImdldEV4dHJhRGF0YSI6CiAgICAgICAgY2xlYXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsgICAgCiAgICBjYXNlICJhZGRFeHRyYURhdGEiOgogICAgICAgIGFkZEV4dHJhRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0RG9jdW1lbnRNb2RlbCI6CiAgICAgICAgZ2V0RG9jdW1lbnRNb2RlbChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiYWRkRG9jdW1lbnRNb2RlbCI6CiAgICAgICAgYWRkRG9jdW1lbnRNb2RlbChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOyAgICAKICAgIGNhc2UgImdldEltYWdlRGF0YSI6CiAgICAgICAgZ2V0SW1hZ2VEYXRhKG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJhZGRJbWFnZURhdGEiOgogICAgICAgIGFkZEltYWdlRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0SW50ZXJuYWxEYXRhIjoKICAgICAgICBnZXRJbnRlcm5hbERhdGEobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsgICAgCiAgICBjYXNlICJhZGRJbnRlcm5hbERhdGEiOgogICAgICAgIGFkZEludGVybmFsRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0RW5jcnlwdG9yVHlwZSI6CiAgICAgICAgZ2V0RW5jcnlwdG9yVHlwZShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAic2V0RW5jcnlwdG9yVHlwZSI6CiAgICAgICAgc2V0RW5jcnlwdG9yVHlwZShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZW5jcnlwdERpY3Rpb25hcnkiOgogICAgICAgIGVuY3J5cHREaWN0aW9uYXJ5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5IjoKICAgICAgICBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0IjoKICAgICAgICBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSI6CiAgICAgICAgZGVjcnlwdERpY3Rpb25hcnlCaW5hcnkobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IjoKICAgICAgICBkZWNyeXB0RGljdGlvbmFyeUJhc2U2NChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZW5jcnlwdEJ1ZmZlciI6CiAgICAgICAgZW5jcnlwdEJ1ZmZlcihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZGVjcnlwdEJ1ZmZlciI6CiAgICAgICAgZGVjcnlwdEJ1ZmZlcihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZGVzdHJveSI6CiAgICAgICAgZGVzdHJveShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgfQp9Owo=")], { type: "text/javascript" }))), p));
      return i2.postMessage({ cmd: "preInit", bundlePath: e2 }), new Promise((e3) => {
        i2.onmessage = (l2) => {
          "preInit" === l2.data.cmd ? i2.postMessage({ cmd: "initializeAssembly" }) : "initializeAssembly" === l2.data.cmd && (t2.worker = i2, e3());
        };
      });
    }
  }
  static async clear(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "clear" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "clear" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getDocumentData(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getDocumentData" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getDocumentData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addDocumentData(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "addDocumentData", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "addDocumentData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async removeDocumentDataWithKeyStartedByKey(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "removeDocumentDataWithKeyStartedByKey", key: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "removeDocumentDataWithKeyStartedByKey" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getExtraData(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getExtraData" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getExtraData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addExtraData(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "addExtraData", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "addExtraData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getDocumentModel(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getDocumentModel" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getDocumentModel" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addDocumentModel(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "addDocumentModel", key: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "addDocumentModel" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getImageData(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getImageData" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getImageData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addImageData(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "addImageData", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "addImageData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getInternalData(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getInternalData" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getInternalData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addInternalData(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "addInternalData", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "addInternalData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getEncryptorType(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getEncryptorType" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getEncryptorType" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async setEncryptorType(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "setEncryptorType", type: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "setEncryptorType" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async encryptDictionary(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "encryptDictionary" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "encryptDictionary" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getEncryptedDictionaryBinary(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getEncryptedDictionaryBinary" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getEncryptedDictionaryBinary" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getEncryptedDictionaryBase64(e2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "getEncryptedDictionaryBase64" }), new Promise((e3, t2) => {
      _W.worker.onmessage = (i2) => {
        "getEncryptedDictionaryBase64" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptDictionaryBinary(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "decryptDictionaryBinary", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "decryptDictionaryBinary" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptDictionaryBase64(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "decryptDictionaryBase64", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "decryptDictionaryBase64" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async encryptBuffer(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "encryptBuffer", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "encryptBuffer" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptBuffer(e2, t2) {
    return await _W.__checkWorker(e2), _W.worker.postMessage({ cmd: "decryptBuffer", payload: t2 }), new Promise((e3, t3) => {
      _W.worker.onmessage = (i2) => {
        "decryptBuffer" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static destroyWorker() {
    _W.worker && (_W.worker.postMessage({ cmd: "destroy" }), _W.worker = null);
  }
};
var V = {};
function R(e2) {
  let t2 = "", i2 = new Uint8Array(e2), l2 = i2.byteLength;
  for (let e3 = 0; e3 < l2; e3++) t2 += String.fromCharCode(i2[e3]);
  return window.btoa(t2);
}
V.Selphi = s, V.Selphi.RecorderType = { Local: 0, Remote: 1 }, V.Selphi.RecorderStatus = { Ok: 0, Unknown: 1, SocketError: 2 }, V.Selphi.ConfigurationManager = class {
  constructor() {
    this.container = null, this.language = "es", this.dpiList = [163, 326, 489], this.cameraWidth = 1280, this.cameraHeight = 720, this.cameraId = null, this.cameraType = s.CameraType.Front, this.cameraSwitchButton = false, this.cameraRotation = 0, this.bundlePath = "", this.resourcesPath = this.bundlePath + "/FPhi.Widget.Resources", this.faceTracking = false, this.accessibility = false, this.accessibleElements = ["button", "buttonImage"], this.externalCamera = false, this.showLog = false, this.epheremalKey = "", this.onExtractionFinish = null, this.onUserCancel = null, this.onExceptionCaptured = null, this.onExtractionTimeout = null, this.onModuleLoaded = null, this.onLivenessError = null, this.onLivenessErrorButtonClick = null, this.onTimeoutErrorButtonClick = null, this.onStabilizing = null, this.onTrackStatus = null, this.onAccessibilityStatus = null, this.livenessMode = s.LivenessMode.None, this.tutorial = false, this.stabilizationStage = false, this.livenessPrecision = 2, this.livenessMoveInitialError = 0, this.livenessMoveInfoTime = 4, this.timeout = 3e4, this.interactible = true, this.authenticateTime = 1, this.graphPath = this.bundlePath + "/graph.xml", this.imageFormat = "image/jpeg", this.imageQuality = 0.92, this.logImages = false, this.minLogImages = 1, this.cropFactor = 1, this.cropImage = true, this.templateFormat = s.TemplateFormat.Base64, this.videoRecord = false, this.videoRecordRate = 10, this.videoRecordScale = 1, this.videoQuality = s.VideoQuality.Medium, this.videoRecordType = s.RecorderType.Remote, this.antispoofEnabled = false;
  }
  setExternalCamera(e2) {
    this.externalCamera = e2;
  }
  getExternalCamera() {
    return this.externalCamera;
  }
  setContainer(e2) {
    this.container = e2;
  }
  getContainer() {
    return this.container;
  }
  setLanguage(e2) {
    this.language = e2;
  }
  getLanguage() {
    return this.language;
  }
  setDpiList(e2) {
    this.dpiList = e2;
  }
  getDpiList() {
    return this.dpiList;
  }
  setCameraSwitchButton(e2) {
    this.cameraSwitchButton = e2;
  }
  getCameraSwitchButton() {
    return this.cameraSwitchButton;
  }
  setCameraWidth(e2) {
    this.cameraWidth = e2;
  }
  getCameraWidth() {
    return this.cameraWidth;
  }
  setCameraHeight(e2) {
    this.cameraHeight = e2;
  }
  getCameraHeight() {
    return this.cameraHeight;
  }
  setCameraType(e2) {
    this.cameraType = e2;
  }
  getCameraType() {
    return this.cameraType;
  }
  setCameraRotation(e2) {
    this.cameraRotation = e2;
  }
  getCameraRotation() {
    return this.cameraRotation;
  }
  setResourcesPath(e2) {
    this.resourcesPath = e2;
  }
  getResourcesPath() {
    return this.resourcesPath;
  }
  setBundlePath(e2) {
    this.bundlePath = e2, this.graphPath = this.bundlePath + "/graph.xml", this.resourcesPath = this.bundlePath + "/FPhi.Widget.Resources";
  }
  getTimeout() {
    return this.timeout;
  }
  setTimeout(e2) {
    this.timeout = e2;
  }
  getBundlePath() {
    return this.bundlePath;
  }
  setOnExtractionFinish(e2) {
    this.onExtractionFinish = e2;
  }
  getOnExtractionFinish() {
    return this.onExtractionFinish;
  }
  setOnUserCancel(e2) {
    this.onUserCancel = e2;
  }
  getOnUserCancel() {
    return this.onUserCancel;
  }
  setOnExceptionCaptured(e2) {
    this.onExceptionCaptured = e2;
  }
  getOnExceptionCaptured() {
    return this.onExceptionCaptured;
  }
  setOnExtractionTimeout(e2) {
    this.onExtractionTimeout = e2;
  }
  getOnExtractionTimeout() {
    return this.onExtractionTimeout;
  }
  setOnModuleLoaded(e2) {
    this.onModuleLoaded = e2;
  }
  getOnModuleLoaded() {
    return this.onModuleLoaded;
  }
  setOnLivenessError(e2) {
    this.onLivenessError = e2;
  }
  getOnLivenessError() {
    return this.onLivenessError;
  }
  setOnLivenessErrorButtonClick(e2) {
    this.onLivenessErrorButtonClick = e2;
  }
  getOnLivenessErrorButtonClick() {
    return this.onLivenessErrorButtonClick;
  }
  setOnTimeoutErrorButtonClick(e2) {
    this.onTimeoutErrorButtonClick = e2;
  }
  getOnTimeoutErrorButtonClick() {
    return this.onTimeoutErrorButtonClick;
  }
  setOnStabilizing(e2) {
    this.onStabilizing = e2;
  }
  getOnStabilizing() {
    return this.onStabilizing;
  }
  setOnTrackStatus(e2) {
    this.onTrackStatus = e2;
  }
  getOnTrackStatus() {
    return this.onTrackStatus;
  }
  setOnAccessibilityStatus(e2) {
    this.onAccessibilityStatus = e2;
  }
  getOnAccessibilityStatus() {
    return this.onAccessibilityStatus;
  }
  setLivenessMode(e2) {
    this.livenessMode = e2;
  }
  getLivenessMode() {
    return this.livenessMode;
  }
  setTutorial(e2) {
    this.tutorial = false;
  }
  getTutorial() {
    return this.tutorial;
  }
  setStabilizationStage(e2) {
    this.stabilizationStage = e2;
  }
  getStabilizationStage() {
    return this.stabilizationStage;
  }
  setLivenessPrecision(e2) {
    this.livenessPrecision = e2;
  }
  getLivenessPrecision() {
    return this.livenessPrecision;
  }
  setLivenessMoveInitialError(e2) {
    this.livenessMoveInitialError = e2;
  }
  getLivenessMoveInitialError() {
    return this.livenessMoveInitialError;
  }
  setLivenessMoveInfoTime(e2) {
    this.livenessMoveInfoTime = e2;
  }
  getLivenessMoveInfoTime() {
    return this.livenessMoveInfoTime;
  }
  setInteractible(e2) {
    this.interactible = e2;
  }
  getInteractible() {
    return this.interactible;
  }
  setAuthenticateTime(e2) {
    this.authenticateTime = e2;
  }
  getAuthenticateTime() {
    return this.authenticateTime;
  }
  setGraphPath(e2) {
    this.graphPath = e2;
  }
  getGraphPath() {
    return this.graphPath;
  }
  setImageFormat(e2) {
    this.imageFormat = e2;
  }
  getImageFormat() {
    return this.imageFormat;
  }
  setImageQuality(e2) {
    this.imageQuality = e2;
  }
  getImageQuality() {
    return this.imageQuality;
  }
  setCameraId(e2) {
    this.cameraId = e2;
  }
  getCameraId() {
    return this.cameraId;
  }
  setLogImages(e2) {
    this.logImages = e2;
  }
  getLogImages() {
    return this.logImages;
  }
  setMinLogImages(e2) {
    this.minLogImages = e2;
  }
  getMinLogImages() {
    return this.minLogImages;
  }
  setCropFactor(e2) {
    this.cropFactor = e2;
  }
  getCropFactor() {
    return this.cropFactor;
  }
  setCropImage(e2) {
    this.cropImage = e2;
  }
  getCropImage() {
    return this.cropImage;
  }
  setTemplateFormat(e2) {
    this.templateFormat = e2;
  }
  getTemplateFormat() {
    return this.templateFormat;
  }
  setVideoRecord(e2) {
    this.videoRecord = e2;
  }
  getVideoRecord() {
    return this.videoRecord;
  }
  setVideoRecordRate(e2) {
    this.videoRecordRate = e2;
  }
  getVideoRecordRate() {
    return this.videoRecordRate;
  }
  setVideoRecordScale(e2) {
    this.videoRecordScale = e2;
  }
  getVideoRecordScale() {
    return this.videoRecordScale;
  }
  setVideoQuality(e2) {
    this.videoQuality = e2;
  }
  getVideoQuality() {
    return this.videoQuality;
  }
  setVideoRecordType(e2) {
    this.videoRecordType = e2;
  }
  getVideoRecordType() {
    return this.videoRecordType;
  }
  setShowLog(e2) {
    this.showLog = e2;
  }
  getShowLog() {
    return this.showLog;
  }
  setAntispoofEnabled(e2) {
    this.antispoofEnabled = e2;
  }
  getAntispoofEnabled() {
    return this.antispoofEnabled;
  }
  setFaceTracking(e2) {
    this.faceTracking = e2;
  }
  getFaceTracking() {
    return this.faceTracking;
  }
  setAccessibility(e2) {
    this.accessibility = e2;
  }
  getAccessibility() {
    return this.accessibility;
  }
  setAccessibleElements(e2) {
    this.accessibleElements = e2;
  }
  getAccessibleElements() {
    return this.accessibleElements;
  }
  setEpheremalKey(e2) {
    this.epheremalKey = e2;
  }
  getEpheremalKey() {
    return this.epheremalKey;
  }
}, V.Selphi.TokenizerUtils = W, V.Selphi.Widget = function(e2) {
  d.setLoggerLevel(e2.getShowLog() ? 0 : 2), d.setLoggerTag("selphi-widget-web"), this.showLog = e2.getShowLog(), d.printInfo("Selphi Widget Web Version: " + V.Selphi.Version), this.cm = e2, this.audioBuffer = [], this.divContainer = this.cm.getContainer(), this.livenessMode = this.cm.getLivenessMode(), this.tutorial = false, this.stabilizationStage = this.cm.getStabilizationStage(), this.onExtractionFinish = this.cm.getOnExtractionFinish(), this.onUserCancel = this.cm.getOnUserCancel(), this.onExceptionCaptured = this.cm.getOnExceptionCaptured(), this.onExtractionTimeout = this.cm.getOnExtractionTimeout(), this.onModuleLoaded = this.cm.getOnModuleLoaded(), this.onLivenessError = this.cm.getOnLivenessError(), this.onLivenessErrorButtonClick = this.cm.getOnLivenessErrorButtonClick(), this.onTimeoutErrorButtonClick = this.cm.getOnTimeoutErrorButtonClick(), this.onStabilizing = this.cm.getOnStabilizing(), this.onTrackStatus = this.cm.getOnTrackStatus(), this.onAccessibilityStatus = this.cm.getOnAccessibilityStatus(), this.livenessPrecision = this.cm.getLivenessPrecision(), this.livenessMoveInitialError = this.cm.getLivenessMoveInitialError(), this.livenessMoveInfoTime = this.cm.getLivenessMoveInfoTime(), this.interactible = this.cm.getInteractible(), this.authenticateTime = this.cm.getAuthenticateTime(), this.graphPath = this.isPathAbsolute(this.cm.getGraphPath()) ? this.cm.getGraphPath() : this.getScriptPath() + this.cm.getGraphPath(), this.imageFormat = this.cm.getImageFormat(), this.imageQuality = this.cm.getImageQuality(), this.logImages = this.cm.getLogImages(), this.minLogImages = this.cm.getMinLogImages(), this.cropFactor = this.cm.getCropFactor(), this.cropImage = this.cm.getCropImage(), this.antispoofEnabled = this.cm.getAntispoofEnabled(), this.antiSpoofing = null, this.devicePixelRatio = window.devicePixelRatio, this.recorderWorking = false, this.recorder = null, this.engineInstance = null, this.epheremalKey = this.cm.getEpheremalKey(), this.bundlePath = this.isPathAbsolute(this.cm.getBundlePath()) ? this.cm.getBundlePath() : this.getScriptPath() + this.cm.getBundlePath(), d.printInfo("Serving from URL: " + this.bundlePath), this.wasmReady = false, this.wasmInitiated = false, this.resourceParent = null, this.workerWorking = false, this.language = this.cm.getLanguage(), this.cameraSwitchButton = this.cm.getCameraSwitchButton(), this.cameraReady = false, this.cameraWidth = this.cm.getCameraWidth(), this.cameraHeight = this.cm.getCameraHeight(), this.cameraType = this.cm.getCameraType(), this.cameraRotation = this.cm.getCameraRotation(), this.cameraId = this.cm.getCameraId(), this.canvasWidth = 500, this.canvasHeight = 500, this.faceTrackingOffset = { x: 0, y: 0 }, this.expectedExternalCamera = this.cm.getExternalCamera(), this.detectionTimeout = this.cm.getTimeout(), this.extractionTimeout = this.cm.getTimeout(), this.fontSizeFactor = this.canvasHeight / 500, this.canvasSizeFactor = this.canvasHeight / 500, this.baseURL = this.isPathAbsolute(this.cm.getResourcesPath()) ? this.cm.getResourcesPath() : this.getScriptPath() + this.cm.getResourcesPath(), this.dpiList = this.cm.getDpiList(), this.livenessMode === V.Selphi.LivenessMode.Passive && (this.livenessMode = V.Selphi.LivenessMode.None, this.cropImage = false), this.isBrowserFirefox = navigator.userAgent.toLowerCase().includes("firefox"), this.isWebView = navigator.userAgent.includes("wv") || navigator.userAgent.includes("Duck"), this.isIosMobile = navigator.userAgent.includes("iPod") || navigator.userAgent.includes("iPad") || navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("CriOS"), this.isMacOsSafari = navigator.userAgent.includes("Macintosh") && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome") && !navigator.userAgent.includes("Firefox"), this.rmReady = false, this.graphReady = false, this.rm = new l(this.baseURL, this.language, this, this.OnResourceManagerStatus, this.dpiList, window.devicePixelRatio, this.canvasSizeFactor), this.graph = new i(this.graphPath, this.OnGraphReady.bind(this), this.OnGraphNewState.bind(this)), this.drawer = new b({ livenessMode: this.cm.getLivenessMode(), stabilizationStage: this.cm.getStabilizationStage(), canvasSizeFactor: this.canvasSizeFactor, fontSizeFactor: this.fontSizeFactor, enableButtonCamera: !this.expectedExternalCamera }), this.divContainer.addEventListener("FPhi.UserControl.Finish.event", this.onExtractionFinish, true), this.divContainer.addEventListener("FPhi.UserControl.UserCancel.event", this.onUserCancel, true), this.divContainer.addEventListener("FPhi.UserControl.ExtractionTimeout.event", this.onExtractionTimeout, true), this.divContainer.addEventListener("FPhi.UserControl.LivenessError.event", this.onLivenessError, true), this.divContainer.addEventListener("FPhi.UserControl.LivenessErrorButtonClick.event", this.onLivenessErrorButtonClick, true), this.divContainer.addEventListener("FPhi.UserControl.TimeoutErrorButtonClick.event", this.onTimeoutErrorButtonClick, true), this.divContainer.addEventListener("FPhi.UserControl.ModuleLoaded.event", this.onModuleLoaded, true), this.divContainer.addEventListener("FPhi.UserControl.ExceptionCaptured.event", this.onExceptionCaptured, true), this.divContainer.addEventListener("FPhi.UserControl.Stabilizing.event", this.onStabilizing, true), this.divContainer.addEventListener("FPhi.UserControl.TrackStatus.event", this.onTrackStatus, true), this.divContainer.addEventListener("FPhi.UserControl.AccessibilityStatus.event", this.onAccessibilityStatus, true), this.antispoofEnabled && (this.antiSpoofing = document.createElement("idlive-face-capture"), this.antiSpoofing.setAttribute("auto_capture_disabled", ""), this.antiSpoofing.setAttribute("auto_close_disabled", ""), this.antiSpoofing.setAttribute("mask_hidden", ""), this.antiSpoofing.style = "width: 400px; height: 400px; display:none;", this.antiSpoofingStarted = false, this.antiSpoofingWorking = false, this.divContainer.host.parentElement.appendChild(this.antiSpoofing));
}, V.Selphi.Widget.prototype = { constructor: V.Selphi.Widget, language: "es", userTags: null, privateCanvas: null, extractor: null, extractorLiveness: null, extractorVersion: "", lastDetectResult: null, lastExtractionResult: null, lastExtractionResultWizard: null, faceAvailable: true, faceDataRect: null, faceAvailableDelayed: false, antispoofEnabled: false, antiSpoofing: null, antiSpoofingStarted: false, antiSpoofingWorking: false, faceTooFar: false, tooManyFaces: false, bestScore: 0, actualTime: 0, actualTimePrev: 0, epheremalKey: "", clockWaitingFace: null, clockWaitingStart: null, clockExtraction: null, clockExtractionPure: null, clockCycleTip: null, clockWizardCompleted: null, clockShowResults: null, clockImprove: null, clockLiveness1: null, clockLiveness2: null, clockLiveness3: null, clockLiveness3_finish: null, clockFinish: null, clockNewScenario: null, clockWarningIn: null, clockWarningOut: null, clockEyeDetection: null, clockEyeDetectionDetected: null, waitingTimeStart: 3, extractionTime: 5, extractionTimePartial: 0, extractionSmartMinScore: 0.5, engineInstance: null, face_mo: function() {
  return "MO";
}, face_o: function() {
  return "O";
}, face_sn: function() {
  return "SN";
}, face_spl: function() {
  return "SPL";
}, liveness1Time: 0.5, liveness3Time: 0.25, livenessActualRetrain: 0, livenessCalculating: false, livenessErrorString: "", livenessErrorImage: null, livenessMoveDirection: -1, livenessMoveActualSuccessfulAttempts: 0, livenessMoveActualFailedAttempts: 0, livenessMoveNextIndex: 0, livenessMoveGlassesFail: 0, livenessMoveInit: false, livenessMoveFailReason: 0, livenessMoveInfoTime: 3, livenessMoveLastStabilizedStatus: 0, livenessMoveStabilizedStatusHistory: [], livenessMoveHistory: [], livenessPrecision: 0, showImproveButton: false, face_alpha: function() {
  return String.fromCharCode(89, 52, 77);
}, maxResults: 15, graphicalScoreMax: 0, privateLastImage: null, privateImages: [], logImages: false, minLogImages: 1, workerWorking: false, privateLivenessImages: [], privateLivenessImageTemp: null, privateLivenessTimerDiagnostic: null, privateLivenessResults: [], privateEyesYLevel: 0, idContainer: null, divContainer: null, extractorContainer: null, videoSelectId: null, isMobileDevice: false, cameraContainer: null, cameraWidth: null, cameraHeight: null, cameraRotation: 0, cameraId: null, canvasWidth: null, canvasHeight: null, cameraStream: null, stopCameraStream: true, selectedSource: null, samplePeriod: 0, face_defa: function() {
  return "DEFA";
}, face_ke: function() {
  return "KE";
}, face_ck: function() {
  return "CK";
}, face_ap: function() {
  return "AP";
}, buttonHeight: 50, debug: false, interactible: true, recorderWorking: false, imageFormat: "image/png", forceMoveDirection: -1, authenticateTime: 1, globalTimeout: 30, fps: 0, fpse: 0, fpsframes: 0, fpseFrames: 0, fpsTime: null, fontSizeFactor: 1, canvasSizeFactor: 1, imageTips1: null, imageTips2: null, imageFaceMoving: [], imageCheck: null, imageError: null, imageArrow: null, face_cam: function() {
  return "CAM";
}, face_t: function() {
  return "TUAL";
}, face_ult: function() {
  return "ULT";
}, face_b: function() {
  return "B";
}, imageCamera: null, cropImage: true, cropFactor: 1, warningInTime: 0.8, warningOutTime: 0, detectionTimeout: 0, extractionTimeout: 0, sceneTimeout: 0, secondsWidget: 0, secondsState: 0, sendingTimeout: 2, cameraList: [], graphPath: "graph.xml", testedResolutions: [], facePositions: [], face_v: function() {
  return "VIR";
}, face_it: function() {
  return "IT";
}, face_s: function() {
  return "S";
}, face_fa: function() {
  return "FA";
}, GenerateTemplateRawFromByteArrayComplete: function(e2, t2, i2) {
  let l2 = document.createElement("canvas");
  l2.width = t2.naturalWidth, l2.height = t2.naturalHeight, l2.getContext("2d").drawImage(t2, 0, 0);
  let c2 = l2.toDataURL(this.imageFormat);
  c2 = c2.split(",")[1];
  let a2 = window.atob(c2);
  try {
    const t3 = new X({ bundlePath: e2.bundlePath, minIOD: 128 });
    t3.initializeEngine().then(() => t3.tokenize(a2).then(i2));
  } catch (t3) {
    return void e2.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { exceptionType: "engineError", message: "FPhi.Selphi.Widget: " + t3.message } }));
  }
}, GenerateTemplateRawFromByteArray: function(e2, t2) {
  e2.complete ? this.GenerateTemplateRawFromByteArrayComplete(this, e2, t2) : e2.onload = () => this.GenerateTemplateRawFromByteArrayComplete(this, e2, t2);
}, Start: function(e2) {
  this.qualityCheckFailed = false, this.Start_(e2);
}, Start_: async function(e2) {
  try {
    if (this.fpsTime = performance.now(), this.cameraContainer = document.createElement("div"), this.cameraContainer.id = "cameraContainer", this.cameraContainer.style.overflow = "hidden", this.cameraContainer.style.position = "relative", this.cameraContainer.style.width = this.divContainer.offsetWidth + "px", this.cameraContainer.style.height = this.divContainer.offsetHeight + "px", this.divContainer.appendChild(this.cameraContainer), this.cropFactor <= 0) {
      let e3 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: "Invalid value of CropFactor. Must be greather than 0.", exceptionType: 3 } });
      this.divContainer.dispatchEvent(e3), this.cropFactor = 1;
    }
    this.sceneTimeout <= 0 && (this.sceneTimeout = 0), this.loadingMessage = document.createElement("div"), this.cameraContainer.appendChild(this.loadingMessage), this.gifWait = document.createElement("img"), this.cameraContainer.appendChild(this.gifWait);
    let t2 = this;
    this.gifWait.style.display = "none", this.gifWait.addEventListener("load", this.onWaitingLoaded), this.gifWait.onload = () => {
      let e3 = t2.canvas.height / 2 - t2.gifWait.height / 2, i3 = t2.canvas.width / 2 - t2.gifWait.width / 2;
      t2.gifWait.style = "position:absolute; top:" + e3 + "px; left:" + i3 + "px;";
    }, this.gifWait.src = this.baseURL + "/resources/163dpi/loading.gif", document.featurePolicy && false === document.featurePolicy.allowsFeature("camera") && (d.printWarning("Feature Policy issue: Camera feature is restricted in the actual environment. Check your server HTTP Headers."), d.printWarning("https://developers.google.com/web/updates/2018/06/feature-policy#js")), window.location !== window.parent.location && d.printDebug("Selphi: widget running inside iframe."), this.selectedSource = null;
    let i2 = document.createElement("canvas");
    i2.id = "display", i2.style = "position:absolute; top:-1px; left:-1px; zIndex:1;", this.cameraContainer.appendChild(i2), i2.width = this.cameraContainer.offsetWidth + 2, i2.height = this.cameraContainer.offsetHeight + 2, this.canvas = i2, this.onCanvasResizeContext = this.onCanvasResize.bind(this), window.addEventListener("resize", this.onCanvasResizeContext, false);
    const l2 = navigator.userAgent;
    if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(l2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(l2.substring(0, 4))) && (this.isMobileDevice = true), this.engineInstance = new X({ minIOD: 40, bundlePath: this.bundlePath }), this.engineInstance.initializeEngine().then(() => {
      this.wasmReady = true, this.CheckDependencies(this);
    }).catch((e3) => {
      this.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { exceptionType: 5, message: `${e3.message}` } }));
    }), this.initCamera(this.cameraContainer, this.cameraWidth, this.cameraHeight), this.antispoofEnabled && (await new Function("url", "return import(url)")(`${this.bundlePath}/FPhi.Antispoofing/index-no-detector.js`), !window.loadedAnstispoof || this.isIosMobile || this.isMacOsSafari ? this.antiSpoofing.addEventListener("initialize", (e3) => {
      window.loadedAnstispoof = true, this.antiSpoofing.openCamera();
    }) : this.antiSpoofing.openCamera(), this.antiSpoofing.addEventListener("open", (e3) => {
      const { video: t3 } = e3.detail[0], i3 = t3.srcObject.getVideoTracks()[0], l3 = async () => {
        const { width: e4, height: l4 } = i3.getSettings();
        let c2, a2;
        this.stopCameraStream = true, this.cameraStream = t3.srcObject, this.video.srcObject = t3.srcObject, this.video.autoplay = true, this.video.controls = false, this.video.muted = true, this.video.volume = 0, this.isIosMobile ? (this.video.width = e4, this.video.height = l4, c2 = e4, a2 = l4) : t3.width < t3.height ? (this.video.width = l4, this.video.height = e4, c2 = l4, a2 = e4) : (this.video.width = e4, this.video.height = l4, c2 = e4, a2 = l4), this.video.onplay = () => {
          this.videoLoaded({ target: { videoWidth: c2, videoHeight: a2 } });
        }, await this.video.play();
      };
      (() => {
        try {
          this.cameraName = i3.label;
        } catch (e4) {
          this.cameraName = "Dummy Camera";
        }
        l3(), d.printDebug(`Video width: ${i3.getSettings().width}`), d.printDebug(`Video height: ${i3.getSettings().height}`);
      })();
    }), this.antiSpoofing.addEventListener("error", (e3) => {
      const { message: t3 } = e3.detail[0];
      d.printError(t3);
    }), this.antiSpoofing.addEventListener("close", (e3) => {
      if (this.divContainer) {
        let e4 = new CustomEvent("FPhi.UserControl.ExtractionTimeout.event");
        this.divContainer.dispatchEvent(e4), this.Stop();
      }
    }), this.waitForAntispoof = new Promise((e3) => {
      this.antiSpoofing.addEventListener("capture", async (t3) => {
        const i3 = t3.detail[0].encryptedFile;
        var l3 = new FileReader();
        l3.onloadend = async () => {
          this.encryptedLiveness = l3.result, this.workerWorking = false, this.antiSpoofingStarted = false, e3();
        }, this.encryptedLivenessRaw = i3, l3.readAsDataURL(i3);
      });
    })), !this.antispoofEnabled) if (null != e2) {
      d.printInfo("Detected external camera stream, using this..."), this.stopCameraStream = false, this.cameraStream = e2, this.video.srcObject = e2;
      const t3 = e2.getVideoTracks()[0], i3 = t3.getSettings();
      try {
        this.cameraName = t3.label;
      } catch (e3) {
        this.cameraName = "Dummy Camera";
      }
      d.printDebug(`Camera Width: ${i3.width}; Camera Height: ${i3.height}; Camera Framerate: ${i3.frameRate}`), this.video.onloadedmetadata = this.videoLoaded.bind(this), this.video.play();
      let l3 = this.canvas.getContext("2d", { alpha: true });
      this.setCameraPosition(l3, this.video);
    } else if (this.stopCameraStream = true, this.expectedExternalCamera) d.printDebug("Entering into loading state until waits the external camera...");
    else {
      if (d.printDebug("No detected external camera stream, running own stream..."), d.printDebug("Init process - Checked parameters are correctly"), document.featurePolicy && false === document.featurePolicy.allowsFeature("camera") && (d.printDebug("Feature Policy issue: Camera feature is restricted in the actual environment. Check your server HTTP Headers."), d.printDebug("https://developers.google.com/web/updates/2018/06/feature-policy#js")), this.cameraSwitchButton) {
        this.isBrowserFirefox || (await this.grantVideoPermission(), d.printDebug("Init process - Checked camera permissions")), this.cameras = [];
        try {
          const e4 = await navigator.mediaDevices.enumerateDevices();
          this.cameras = e4.filter((e5) => "videoinput" === e5.kind);
        } catch (e4) {
          d.printDebug("There was an error getting device media resources", e4);
        }
        if (this.isBrowserFirefox || this.isWebView) {
          if (this.sortedDeviceCameras = this.cameras, this.cameraCount = this.cameras.length, this.cameras.length > 1 && (this.drawer.cameraCount = this.cameraCount), d.printDebug(this.cameraCount + " cameras found."), this.cameraId && -1 === this.cameras.findIndex((e4) => e4.deviceId === this.cameraId)) {
            const e4 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: "Camera ID provided by implementator is not present on the device, or there might be some misspelling mistake", exceptionType: 0 } });
            this.divContainer && this.divContainer.dispatchEvent(e4);
          }
        } else {
          d.printDebug("Camera enumeration: ", this.cameras.length);
          let e4 = [], t3 = [], i3 = [], l3 = [];
          this.cameraCount = 0;
          for (let { deviceId: c2 } of this.cameras) try {
            let a2 = await navigator.mediaDevices.getUserMedia({ video: { deviceId: c2 } });
            if (a2.getVideoTracks().length > 0 && ("function" == typeof a2.getVideoTracks()[0].getCapabilities || "object" == typeof a2.getVideoTracks()[0].getSettings())) {
              const c3 = a2.getVideoTracks()[0], s2 = c3.getCapabilities ? c3.getCapabilities() : c3.getSettings();
              s2.focusMode ? (d.printDebug(`Reading camera with id: ${s2.deviceId}; name: ${c3.label}; focusDiscance: ${JSON.stringify(s2.focusDistance)}; facingMode: ${JSON.stringify(s2.facingMode)}`), "user" === s2.facingMode[0] ? (e4.push(s2), d.printDebug(`Pushing front camera with id: ${s2.deviceId}; name: ${c3.label}`)) : s2.focusMode.some((e5) => "continuous" === e5) ? (t3.push(s2), d.printDebug(`Pushing environment camera with id: ${s2.deviceId}; name: ${c3.label}`)) : (i3.push(s2), d.printDebug(`Ignoring camera with id: ${s2.deviceId}; name: ${c3.label}`))) : (l3.push(s2), d.printDebug(`Pushing camera with id: ${s2.deviceId}; name: ${c3.label}`)), c3.stop();
            }
            this.cameraCount++;
          } catch (e5) {
            d.printError(`CameraSwitchButton: Error opening camera with id "${c2 || null}".`), d.printError(`${e5}`);
            let t4 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: `Error in CameraSwitchButton function. Error opening camera with id "${c2 || null}". ${e5.message}`, exceptionType: 0 } });
            return this.divContainer && this.divContainer.dispatchEvent(t4), void this.Stop();
          }
          if (e4.sort((e5, t4) => e5.focusMode.some((e6) => "continuous" === e6) && t4.focusMode.every((e6) => "continuous" !== e6) ? -1 : e5.focusMode.every((e6) => "continuous" !== e6) && t4.focusMode.some((e6) => "continuous" === e6) ? 1 : 0), t3.sort((e5, t4) => e5.width.max > t4.width.max && t4.width.max < 1080 ? -1 : e5.width.max < t4.width.max && e5.width.max < 1080 ? 1 : e5.iso.max > t4.iso.max ? -1 : e5.iso.max < t4.iso.max ? 1 : e5.torch && !t4.torch ? -1 : !e5.torch && t4.torch ? 1 : void 0), this.sortedDeviceCameras = l3.concat(e4, t3, i3), this.sortedDeviceCameras.length > 0) {
            if (this.cameraId) {
              const e5 = this.sortedDeviceCameras.findIndex((e6) => e6.deviceId === this.cameraId);
              if (-1 !== e5) {
                const t4 = this.sortedDeviceCameras.splice(e5, 1);
                this.sortedDeviceCameras.unshift(t4[0]), d.printInfo(`Modified sorted camera list. Camera with ID: ${t4[0].deviceId} is going to be used initially`);
              } else {
                const e6 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: "Camera ID provided by implementator is not present on the device, or there might be some misspelling mistake", exceptionType: 0 } });
                this.divContainer && this.divContainer.dispatchEvent(e6);
              }
            } else if (this.cameraType === V.Selphi.CameraType.Back) if (t3.length > 0) {
              const e5 = this.sortedDeviceCameras.findIndex((e6) => e6.deviceId === t3[0].deviceId), i4 = this.sortedDeviceCameras.splice(e5, 1);
              this.sortedDeviceCameras.unshift(i4[0]), d.printInfo(`Modified sorted camera list. Camera with ID: ${i4[0].deviceId} is going to be used initially`);
            } else {
              const e5 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: "There are no rear cameras available within the used device", exceptionType: 0 } });
              this.divContainer && this.divContainer.dispatchEvent(e5);
            }
            this.forceCameraId = this.sortedDeviceCameras[0].deviceId, d.printDebug(this.cameraCount + " cameras found.");
          }
          this.sortedDeviceCameras.length > 1 && (this.drawer.cameraCount = this.cameraCount);
        }
      }
      d.printDebug("Init process - Checked available cameras"), this.selectedSource = null, this.setVideoInput(this);
      let e3 = this.canvas.getContext("2d", { alpha: true });
      this.setCameraPosition(e3, this.video);
    }
    this.widgetTime = performance.now(), this.stateTime = this.widgetTime, d.printDebug("Hardware concurrency: " + window.navigator.hardwareConcurrency);
  } catch (e3) {
    return this.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { exceptionType: "engineError", message: "FPhi.Selphi.Widget: " + e3.message } })), this.Stop(), void d.printError(e3.message);
  }
}, Finalize: function() {
  void 0 !== this.worker && null !== this.worker && (this.postMessage(this, { cmd: "destroy" }), this.worker = null), void 0 !== this.engineInstance && null !== this.engineInstance && this.engineInstance.finalizeEngine();
}, Stop: function() {
  if (null !== this.divContainer) {
    this.onCanvasResizeContext && (window.removeEventListener("resize", this.onCanvasResizeContext, false), this.onCanvasResizeContext = void 0), this.onVideoResizeContext && (this.video.removeEventListener("resize", this.onVideoResizeContext, false), this.onVideoResizeContext = void 0), this.divContainer.removeEventListener("FPhi.UserControl.Finish.event", this.onExtractionFinish, true), this.divContainer.removeEventListener("FPhi.UserControl.UserCancel.event", this.onUserCancel, true), this.divContainer.removeEventListener("FPhi.UserControl.ExtractionTimeout.event", this.onExtractionTimeout, true), this.divContainer.removeEventListener("FPhi.UserControl.LivenessError.event", this.onLivenessError, true), this.divContainer.removeEventListener("FPhi.UserControl.LivenessErrorButtonClick.event", this.onLivenessErrorButtonClick, true), this.divContainer.removeEventListener("FPhi.UserControl.TimeoutErrorButtonClick.event", this.onTimeoutErrorButtonClick, true), this.divContainer.removeEventListener("FPhi.UserControl.ModuleLoaded.event", this.onModuleLoaded, true), this.divContainer.removeEventListener("FPhi.UserControl.ExceptionCaptured.event", this.onExceptionCaptured, true), this.divContainer.removeEventListener("FPhi.UserControl.Stabilizing.event", this.onStabilizing, true), this.divContainer.removeEventListener("FPhi.UserControl.TrackStatus.event", this.onTrackStatus, true), this.divContainer.removeEventListener("FPhi.UserControl.AccessibilityStatus.event", this.onAccessibilityStatus, true), this.video.onloadedmetadata = null;
    let e2 = this.canvas;
    e2.onmousemove = null, e2.onclick = null, this.gifWait.onload = null, this.divContainer.removeChild(this.cameraContainer), this.divContainer = null, this.cameraContainer = null, this.antiSpoofing && this.antiSpoofing.closeCamera();
  }
  this.stopCameraStream && null !== this.cameraStream && this.cameraStream.getVideoTracks()[0].stop(), this.recorder && (this.recorder.deinitializeEngine(), this.recorder = null), this.rm && (this.rm.caller = null, this.rm = null), this.graph && (this.graph = null), this.drawer && (this.drawer = null), this.rmScript && (this.rmScript.onreadystatechange = null, this.rmScript.onload = null, this.rmScript = null), this.graphScript && (this.graphScript.onreadystatechange = null, this.graphScript.onload = null, this.graphScript = null), this.drawerScript && (this.drawerScript.onload = null, this.drawerScript = null), this.Finalize();
}, reconfigureWidget: function(e2) {
  this.imageFormat = e2.getImageFormat(), this.imageQuality = e2.getImageQuality(), this.cropFactor = e2.getCropFactor(), this.cropImage = e2.getCropImage(), d.printDebug("FPhi.Selphi.Widget.reconfigureWidget fired"), d.printDebug("  imageFormat: " + this.imageFormat), d.printDebug("  imageQuality: " + this.imageQuality), d.printDebug("  cropFactor: " + this.cropFactor), d.printDebug("  cropImage: " + this.cropImage);
}, printLog: function(e2) {
  this.showLog && console.log(e2);
}, onVideoResize: function() {
  this.cameraWidth = this.video.videoWidth, this.cameraHeight = this.video.videoHeight, 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = this.cameraWidth, this.privateCanvas.height = this.cameraHeight) : (this.privateCanvas.width = this.cameraHeight, this.privateCanvas.height = this.cameraWidth);
  let e2 = this.canvas.getContext("2d", { alpha: true });
  this.setCameraPosition(e2, this.video);
}, onCanvasResize: function() {
  if (!this.drawer || !this.rm) return;
  let e2 = this.canvas, t2 = e2.getContext("2d", { alpha: true }), i2 = this.video;
  if (0 === i2.videoWidth && 0 === i2.videoHeight || (this.cameraWidth = i2.videoWidth, this.cameraHeight = i2.videoHeight), 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = this.cameraWidth, this.privateCanvas.height = this.cameraHeight) : (this.privateCanvas.width = this.cameraHeight, this.privateCanvas.height = this.cameraWidth), this.cameraContainer.style.width = this.divContainer.offsetWidth + "px", this.cameraContainer.style.height = this.divContainer.offsetHeight + "px", e2.width = this.cameraContainer.offsetWidth + 2, e2.height = this.cameraContainer.offsetHeight + 2, this.drawer.setCanvasSize(e2.clientWidth, e2.clientHeight), this.elements) for (let e3 = 0; e3 < this.elements.length; e3++) null != this.elements[e3].videoPlayer && (this.elements[e3].videoPlayer.pause(), this.elements[e3].videoPlayer.removeAttribute("src"), this.elements[e3].videoPlayer.removeEventListener("ended", this.videoplayerEnded.bind(self), false), this.elements[e3].videoPlayer.load(), this.elements[e3].videoPlayer = null);
  this.rm && this.resourceParent && (this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape), this.startVideos(this)), this.setCameraPosition(t2, this.video), this.cm.getAccessibility() && true === this.cm.getInteractible() && this.elements && this.getAccessibilityData();
}, GetAvailableCameras: function() {
  return navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleCameraError) : null;
}, postMessage: function(e2, t2) {
  e2.worker.postMessage(t2);
}, setLastExtractionResult: function(e2, t2) {
  null !== e2.lastExtractionResult && e2.lastExtractionResult.delete(), e2.lastExtractionResult = t2;
}, setCameraPosition: function(e2, t2) {
  this.cameraVisibleRegion = this.drawer.getCameraRect(e2, this.cameraWidth, this.cameraHeight, this.resourceParent);
  let i2 = "";
  this.cameraType === V.Selphi.CameraType.Front ? i2 = "rotateY(180deg) " : this.cameraType === V.Selphi.CameraType.Back && (i2 = "rotateY(0deg) "), 1 === this.cameraRotation ? i2 += "rotateZ(90deg) " : 2 === this.cameraRotation ? i2 += "rotateZ(180deg) " : 3 === this.cameraRotation && (i2 += "rotateZ(270deg) "), this.cameraVisibleRegion.visible ? (t2.style.position = "absolute", t2.style.top = this.cameraVisibleRegion.y + "px", t2.style.left = this.cameraVisibleRegion.x + "px", t2.style.width = this.cameraVisibleRegion.width + "px", t2.style.height = this.cameraVisibleRegion.height + "px", t2.style.transform = i2, t2.style.zIndex = 0) : (t2.style.position = "absolute", t2.style.top = "-10000px", t2.style.left = "0px", t2.style.width = this.cameraVisibleRegion.width + "px", t2.style.height = this.cameraVisibleRegion.height + "px", t2.style.transform = i2, t2.style.zIndex = 0), t2.style.position = "sticky", t2.style.position = "absolute";
}, OnGraphNewState: function(e2) {
  this.stateTime = performance.now();
  let t2 = this.canvas;
  "UCNothing" !== this.state && void 0 !== this.state || (this.actualTime = this.stateTime, this.widgetTime = this.stateTime), this.secondsWidget = (this.actualTime - this.widgetTime) / 1e3, this.secondsState = (this.actualTime - this.stateTime) / 1e3, this.state = e2, this.resourceParent = this.drawer.getResourceIdForState(e2);
  let i2 = this.video;
  this.setCameraPosition(t2.getContext("2d", { alpha: true }), i2), d.printDebug("state: " + e2);
  for (let e3 = 0; e3 < this.audioBuffer.length; e3++) this.audioBuffer[e3].audio.pause();
  if (this.audioBuffer = [], null != this.elements) for (let e3 = 0; e3 < this.elements.length; e3++) null != this.elements[e3].videoPlayer && (this.elements[e3].videoPlayer.pause(), this.elements[e3].videoPlayer.removeAttribute("src"), this.elements[e3].videoPlayer.removeEventListener("ended", this.videoplayerEnded.bind(self), false), this.elements[e3].videoPlayer.load(), this.elements[e3].videoPlayer = null);
  if (this.elements = null, this.resourceParent && (this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape), this.startVideos(this)), "UCNothing" === e2) this.clockNewScenario = performance.now(), this.lastExtractionResult = null, this.bestScore = 0, this.faceAvailable = false, this.clockWaitingStart = null, this.clockExtraction = null, this.clockExtractionPure = null, this.clockLiveness = null, this.extractionTime = this.authenticateTime, this.livenessCalculating = false, this.privateLastImage = null, this.privateImages = [], this.privateLivenessImages = [], this.privateLivenessResults = [], this.livenessActualRetrain = 0, this.livenessErrorString = null, this.faceDataRect = { x: this.drawer.circleX, y: this.drawer.circleY, width: 0, height: 0 }, this.faceTrackingOffset = { x: 0, y: 0 };
  else if ("UCTutorialRegister2" === e2) this.clockNewScenario = performance.now();
  else if ("UCWaitingFaceStart" === e2) this.clockNewScenario = performance.now(), false === this.interactible && this.graph.sendMessage("Click//button_start");
  else if ("UCSelectTutorial" === e2) this.graph.sendMessage("SetMode//" + self.livenessMode + "," + (self.tutorial ? 1 : 0));
  else if ("UCExtracting" === e2) this.clockNewScenario = performance.now(), this.clockExtraction = performance.now(), this.clockExtractionPure = this.clockExtraction, this.extractionTimePartial = 0;
  else if ("UCCameraSwitch" === e2) {
    if (this.cameraStream) {
      let e3 = this.cameraStream.getVideoTracks(), t3 = this.cameraStream.getVideoTracks()[0].getSettings().deviceId, l2 = this.sortedDeviceCameras, c2 = -1, a2 = -1;
      l2.forEach((e4) => {
        e4.deviceId === t3 && (c2 = l2.indexOf(e4));
      }), a2 = c2 === l2.length - 1 ? 0 : c2 + 1, d.printInfo("Camera rotation list");
      for (let e4 = 0; e4 < l2.length; e4++) e4 === a2 ? d.printDebug("  * Camera id: " + l2[e4].deviceId + " name: " + l2[e4].label) : d.printInfo("  Camera id: " + l2[e4].deviceId + " name: " + l2[e4].label);
      this.video.pause(), e3.forEach(function(e4) {
        e4.stop();
      }), this.cameraStream = null, this.video.srcObject = null;
      let s2, m2, h2 = this.cm.getLivenessMode(), n2 = { audio: {}, video: {} };
      h2 === V.Selphi.LivenessMode.None ? (s2 = this.cm.getCameraWidth(), m2 = this.cm.getCameraHeight(), n2 = { video: { deviceId: l2[a2].deviceId, width: s2, height: m2 }, audio: false }) : h2 === V.Selphi.LivenessMode.Passive ? (s2 = 1280, m2 = 720, n2 = { video: { deviceId: l2[a2].deviceId, width: s2, height: m2 }, audio: false }) : d.printError('The selected "livenessMode" does not exist, it can only be used in passive or none mode.'), self = this, navigator.mediaDevices.getUserMedia(n2).then(async function(e4) {
        self.cameraStream = e4;
        const t4 = self.cameraStream.getVideoTracks()[0];
        if (n2.video.width > 1280 || n2.video.height > 720) try {
          await t4.applyConstraints({ width: { max: 1280, min: 640, ideal: s2 }, height: { max: 720, min: 480, ideal: m2 } });
        } catch (e5) {
          d.printWarning("Error applying resolution contraints to the track: " + e5.message);
        }
        const c3 = "function" === t4.getCapabilities ? t4.getCapabilities() : t4.getSettings();
        c3.facingMode && ("user" === c3.facingMode || "user" === c3.facingMode[0] ? (d.printDebug(`Selecting Front Camera for Play with id: ${c3.deviceId}; name: ${t4.name}`), self.cameraType = V.Selphi.CameraType.Front) : "environment" !== c3.facingMode && "environment" !== c3.facingMode[0] || (d.printDebug(`Selecting Rear Camera for Play with id: ${c3.deviceId}; name: ${t4.name}`), self.cameraType = V.Selphi.CameraType.Back)), self.cameraId = c3.deviceId, i2.srcObject = e4, self.cm.getVideoRecord() && self.cm.getVideoRecordType() === V.Selphi.RecorderType.Local && self.recorder.replaceCurrentRecorder(e4), self.switchTimeoutHandler = setTimeout(() => {
          self.video.pause(), self.cameraStream.getVideoTracks().forEach(function(e5) {
            e5.stop();
          }), self.graph.sendMessage("retry");
        }, 5e3), i2.play().then(() => {
          d.printDebug("Camera switch success. New camera with id: " + l2[a2].deviceId), clearTimeout(self.switchTimeoutHandler), self.setCameraPosition(self.canvas.getContext("2d", { alpha: true }), self.video), self.graph.sendMessage("cameraSwitched");
        }).catch((e5) => {
          d.printDebug("Camera switch unsuccess."), d.printDebug(e5), clearTimeout(self.switchTimeoutHandler), self.graph.sendMessage("retry");
        });
      }).catch(function(e4) {
        d.printDebug(`Fatal error camera switch. Error: ${e4}`);
      });
    }
  } else if ("UCShowResults" === e2) this.clockNewScenario = performance.now(), this.clockShowResults = performance.now(), null != this.lastExtractionResultWizard && (this.setLastExtractionResult(this.lastExtractionResultWizard), this.lastExtractionResultWizard = null);
  else if ("UCCancelByUser" === e2) {
    this.clockNewScenario = performance.now();
    let e3 = new CustomEvent("FPhi.UserControl.UserCancel.event");
    this.divContainer.dispatchEvent(e3), this.Stop();
  } else if ("UCLivenessDetectionStep1" === e2) this.clockNewScenario = performance.now(), this.clockLiveness1 = performance.now();
  else if ("UCLivenessDetectionStep2" === e2) this.clockLiveness2 = performance.now(), this.privateLivenessImages = [], this.privateLivenessResults = [];
  else if ("UCLivenessDetectionStep3" === e2) this.clockLiveness3_finish = null, this.clockLiveness3 = performance.now();
  else if ("UCWaitingEyeDetection" === e2) this.clockNewScenario = performance.now(), this.clockEyeDetection = performance.now(), this.clockEyeDetectionDetected = null;
  else if ("UCFinish" === e2) {
    this.clockNewScenario = performance.now(), this.clockFinish = performance.now();
    let e3 = Array.from(this.privateImages);
    this.sortImagesByFacialScore(this, e3);
    let t3, i3 = this.getImgTag(e3[0], false, this.cropFactor, this.imageFormat, this.imageQuality), l2 = this.getImgTag(e3[0], true, this.cropFactor, this.imageFormat, this.imageQuality), c2 = [];
    if (this.logImages) for (let e4 = 0; e4 < this.privateImages.length; e4++) void 0 !== this.privateImages[e4] && c2.push(this.getImgTag(this.privateImages[e4], this.cropImage, this.cropFactor, this.imageFormat, this.imageQuality));
    void 0 !== this.lastExtractionResult.templateRaw && (t3 = this.lastExtractionResult.templateRaw, this.cm.getTemplateFormat() === V.Selphi.TemplateFormat.Base64 && (t3 = R(t3)));
    let a2 = this.lastExtractionResult.template;
    this.cm.getTemplateFormat() === V.Selphi.TemplateFormat.Base64 && (a2 = R(a2));
    let d2 = { template: a2, bestImage: i3, bestImageCropped: l2, images: c2, timeStamp: this.privateLivenessResults, templateRaw: t3, livenessMoveFails: this.livenessMoveActualFailedAttempts, livenessMoveHistory: this.livenessMoveHistory, livenessMoveStabilizedHistory: this.livenessMoveStabilizedStatusHistory, livenessMoveStabilizedStatus: this.livenessMoveLastStabilizedStatus };
    this.cm.getVideoRecord() && (this.recordedVideo ? (d2.video = this.recordedVideo, d2.videoStatus = V.Selphi.RecorderStatus.Ok) : d2.videoStatus = V.Selphi.RecorderStatus.SocketError), this.antiSpoofing ? (this.antiSpoofing.takePhoto(), this.waitForAntispoof.then(() => {
      d2.encryptedLiveness = this.encryptedLiveness, d2.encryptedLivenessRaw = this.encryptedLivenessRaw, this.GenerateTemplateRawFromByteArray(i3, async (e4) => {
        i3.onload = null;
        const t4 = d2;
        t4.bestImageTokenized = e4;
        let l3 = new CustomEvent("FPhi.UserControl.Finish.event", { detail: t4 });
        this.divContainer.dispatchEvent(l3), this.Stop();
      });
    })) : this.GenerateTemplateRawFromByteArray(i3, async (e4) => {
      i3.onload = null, d2.bestImageTokenized = e4;
      let t4 = new CustomEvent("FPhi.UserControl.Finish.event", { detail: d2 });
      this.divContainer.dispatchEvent(t4), this.Stop();
    });
  } else if ("UCErrors" === e2) {
    let e3 = { livenessMoveFails: this.livenessMoveActualFailedAttempts, livenessMoveHistory: this.livenessMoveHistory, livenessMoveStabilizedHistory: this.livenessMoveStabilizedStatusHistory, livenessMoveStabilizedStatus: this.livenessMoveLastStabilizedStatus };
    if (this.lastExtractionResult && this.lastExtractionResult.sunGlassesScore && 1 === this.lastExtractionResult.sunGlassesScore && (e3.sunGlassesDetected = true), this.logImages) {
      let t3 = [];
      for (let e4 = 0; e4 < this.privateImages.length; e4++) void 0 !== this.privateImages[e4] && t3.push(this.getImgTag(this.privateImages[e4], this.cropImage, this.cropFactor, this.imageFormat, this.imageQuality));
      e3.images = t3, e3.timeStamp = this.privateLivenessResults;
    }
    if (this.clockNewScenario = performance.now(), this.livenessDiagnostic < 0) this.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExtractionTimeout.event", { detail: e3 }));
    else {
      e3.livenessErrorType = this.livenessDiagnostic;
      let t3 = new CustomEvent("FPhi.UserControl.LivenessError.event", { detail: e3 });
      this.divContainer.dispatchEvent(t3);
    }
  } else if ("UCErrorFinish" === e2) {
    let e3;
    -1 === this.livenessDiagnostic ? (e3 = new CustomEvent("FPhi.UserControl.TimeoutErrorButtonClick.event"), this.divContainer.dispatchEvent(e3)) : (e3 = new CustomEvent("FPhi.UserControl.LivenessErrorButtonClick.event"), this.divContainer.dispatchEvent(e3)), this.Stop();
  } else if ("UCLivenessMoveStabilizing" === e2) ;
  else if ("UCLivenessMoveStabilized" === e2) this.livenessMode === V.Selphi.LivenessMode.Move ? (false === this.livenessMoveInit && (this.postMessage(this, { cmd: "initLivenessMoveSequence", livenessPrecision: this.livenessPrecision }), this.livenessMoveInit = true), this.postMessage(this, { cmd: "nextLivenessMoveSequence" }), this.livenessMoveNextIndex = 0, this.graph.sendMessage("Move")) : this.graph.sendMessage("NoMove");
  else if ("UCLivenessMoveDetecting" === e2) this.privateLivenessImages = [];
  else if ("UCLivenessMoveProcessing" === e2) this.processingIndexBase = this.livenessMoveNextIndex;
  else if ("UCWaitRecording" === e2 && this.cm.getVideoRecord()) {
    d.printDebug("generating movie"), this.agProcessing = true;
    let e3 = this;
    this.agProcessingFirst = performance.now(), e3.recorderWorking = true, this.recorder.generateVideo().then(function(t3) {
      e3.recorderWorking = false, e3.recorderFinish = true, e3.recordedVideo = t3["videoURL-1"];
    }).catch(function(t3) {
      d.printError("Error generating video", t3.message), e3.recorderWorking = false, e3.recorderFinish = true;
    });
  }
  if (this.divContainer) {
    let t3 = new CustomEvent("FPhi.UserControl.TrackStatus.event", { detail: { code: V.Selphi.TrackStatus.ChangeState, timeStamp: this.secondsWidget, data: e2 } });
    this.divContainer.dispatchEvent(t3), this.cm.getAccessibility() && true === this.cm.getInteractible() && this.elements && this.getAccessibilityData();
  }
  null !== this.graph && this.graph.sendMessage("SetStatusFinished");
}, getAccessibilityData: function() {
  let e2 = this.canvas.getContext("2d", { alpha: true }), t2 = e2.canvas.width, i2 = e2.canvas.height, l2 = {};
  l2.state = this.state;
  let c2 = [];
  null === this.elements && (this.elements = []);
  for (let e3 = 0; e3 < this.elements.length; e3++) if (this.cm.getAccessibleElements().includes(this.elements[e3].type)) {
    let a2 = this.drawer.getLayout(this.resourceParent, this.elements[e3].id, this.elements[e3].type, this.secondsWidget, this.secondsState, "Normal", l2);
    a2 && (a2 = this.getLayoutFromXML(this.resourceParent, this.elements[e3].id, a2, t2, i2), c2.push({ id: this.elements[e3].id, type: this.elements[e3].type, x: a2.x, y: a2.y, width: a2.width, height: a2.height }));
  }
  if (c2.length > 0) {
    let e3 = new CustomEvent("FPhi.UserControl.AccessibilityStatus.event", { detail: { code: V.Selphi.TrackStatus.AccessibilityData, view: this.state, timeStamp: this.secondsWidget, data: c2 } });
    this.elements.length > 0 && this.divContainer.dispatchEvent(e3);
  }
}, getImageData: function(e2) {
  let t2 = e2.getContext("2d"), i2 = e2.height, l2 = e2.width;
  return { width: l2, height: i2, pixels: t2.getImageData(0, 0, l2, i2), time: performance.now() };
}, resetInternalVars: function() {
  this.privateCanvas = null, this.lastDetectResult = null, this.lastExtractionResult = null, this.lastExtractionResultWizard = null, this.clockWaitingFace = null, this.clockWaitingStart = null, this.clockExtraction = null, this.clockExtractionPure = null, this.clockCycleTip = null, this.clockWizardCompleted = null, this.clockShowResults = null, this.clockImprove = null, this.clockLiveness1 = null, this.clockLiveness2 = null, this.clockLiveness3 = null, this.clockLiveness3_finish = null, this.clockFinish = null, this.clockNewScenario = null, this.clockWarningIn = null, this.clockWarningOut = null, this.clockEyeDetection = null, this.clockEyeDetectionDetected = null, this.livenessErrorImage = null, this.livenessMoveStabilizedStatusHistory = [], this.livenessMoveHistory = [], this.privateLastImage = null, this.privateImages = [], this.privateLivenessImages = [], this.privateLivenessImageTemp = null, this.privateLivenessTimerDiagnostic = null, this.privateLivenessResults = [], this.extractorContainer = null, this.videoSelectId = null, this.canvasWidth = null, this.canvasHeight = null, this.fpsTime = null, this.imageTips2 = null, this.imageFaceMoving = [], this.imageCheck = null, this.imageError = null, this.imageArrow = null, this.imageCamera = null, this.facePositions = [], this.imageTips1 = null;
}, getImgTag: function(e2, t2, i2, l2, c2) {
  let a2 = document.createElement("canvas");
  a2.width = e2.width, a2.height = e2.height, a2.getContext("2d").putImageData(e2.pixels, 0, 0);
  let d2 = document.createElement("canvas");
  if (t2 && void 0 !== e2.extractionResult && void 0 !== e2.extractionResult.face) {
    let t3 = e2.extractionResult.face.width * i2, l3 = e2.extractionResult.face.height * i2, c3 = e2.extractionResult.face.x - (i2 - 1) * e2.extractionResult.face.width / 2, s3 = e2.extractionResult.face.y - (i2 - 1) * e2.extractionResult.face.height / 2;
    c3 < 0 && (t3 += c3, c3 = 0), s3 < 0 && (l3 += s3, s3 = 0), c3 + t3 >= e2.width && (t3 = e2.width - c3), s3 + l3 >= e2.height && (l3 = e2.height - s3), d2.width = t3, d2.height = l3, d2.getContext("2d").drawImage(a2, c3, s3, t3, l3, 0, 0, d2.width, d2.height);
  } else d2.width = e2.width, d2.height = e2.height, d2.getContext("2d").drawImage(a2, 0, 0, d2.width, d2.height);
  let s2 = document.createElement("img");
  return s2.src = d2.toDataURL(l2, c2), s2;
}, faceTrack: function() {
  if (this.secondsWidget < 1) return;
  let e2 = 0, t2 = 0;
  0 != this.faceDataRect.width && (e2 = Math.round(this.drawer.circleX - (this.faceDataRect.x + this.faceDataRect.width / 2)), t2 = Math.round(this.drawer.circleY - (this.faceDataRect.y + this.faceDataRect.height / 2))), this.faceTrackingOffset || (this.faceTrackingOffset = { x: 0, y: 0 }), this.faceTrackingOffset.x += 5 * (e2 - this.faceTrackingOffset.x) * ((this.actualTime - this.actualTimePrev) / 1e3), this.faceTrackingOffset.y += 5 * (t2 - this.faceTrackingOffset.y) * ((this.actualTime - this.actualTimePrev) / 1e3);
  let i2 = this.cameraVisibleRegion.x + this.faceTrackingOffset.x, l2 = this.cameraVisibleRegion.y + this.faceTrackingOffset.y;
  i2 > this.drawer.circleX - this.drawer.circleRadius && (i2 = this.drawer.circleX - this.drawer.circleRadius), l2 > this.drawer.circleY - this.drawer.circleRadius && (l2 = this.drawer.circleY - this.drawer.circleRadius), i2 + this.cameraVisibleRegion.width < this.drawer.circleX + this.drawer.circleRadius && (i2 = this.drawer.circleX + this.drawer.circleRadius - this.cameraVisibleRegion.width), l2 + this.cameraVisibleRegion.height < this.drawer.circleY + this.drawer.circleRadius && (l2 = this.drawer.circleY + this.drawer.circleRadius - this.cameraVisibleRegion.height), this.video.style.left = i2 + "px", this.video.style.top = l2 + "px";
}, startVideos: function(e2) {
  if (null != e2.elements) {
    for (let t2 = 0; t2 < e2.elements.length; t2++) if ("video" === e2.elements[t2].type) {
      let i2 = document.createElement("video");
      i2.hidden = true, i2.playsinline = true, i2.loop = false, i2.autoplay = true, i2.controls = false, i2.muted = true, i2.volume = 0, i2.src = e2.rm.getResourceUrlBase(e2.rm.getSetupResourceId(e2.resourceParent, e2.elements[t2].id, e2.drawer.landscape, "value")), i2.addEventListener("ended", e2.videoplayerEnded.bind(e2), false), i2.setAttribute("playsinline", ""), i2.setAttribute("webkit-playsinline", ""), i2.setAttribute("muted", true), i2.setAttribute("volume", 0), i2.addEventListener("play", () => {
        i2.muted = true, i2.volume = 0;
      }), i2.play(), e2.elements[t2].videoPlayer = i2;
    }
  }
}, canvasOnMove: function(e2) {
  if (this.elements) {
    for (let t2 = this.elements.length - 1; t2 >= 0; t2--) if (void 0 !== this.elements[t2].layout && e2.offsetX >= this.elements[t2].layout.x && e2.offsetX < this.elements[t2].layout.x + this.elements[t2].layout.width && e2.offsetY >= this.elements[t2].layout.y && e2.offsetY < this.elements[t2].layout.y + this.elements[t2].layout.height) {
      if ("button_info" === this.elements[t2].id) break;
      this.drawer.onMouseMove(e2.target, this.elements[t2].layout, this.resourceParent, this.elements[t2].id, this.elements[t2].type);
      break;
    }
  }
}, routeClick: function(e2, t2) {
  this.canvasOnClick({ offsetX: e2, offsetY: t2 });
}, canvasOnClick: function(e2) {
  if ("UCErrors" === this.state) {
    e2.offsetX;
    let t2 = e2.offsetY, i2 = this.canvasHeight - this.buttonHeight;
    d.printDebug("canvasOnClick", this.canvasHeight, i2, t2), t2 > i2 && this.graph.sendMessage("Click//button_error");
  } else {
    if (void 0 === this.elements) return;
    let t2 = null;
    for (let i2 = this.elements.length - 1; i2 >= 0; i2--) if (null != this.elements[i2].layout && e2.offsetX >= this.elements[i2].layout.x && e2.offsetX < this.elements[i2].layout.x + this.elements[i2].layout.width && e2.offsetY >= this.elements[i2].layout.y && e2.offsetY < this.elements[i2].layout.y + this.elements[i2].layout.height) {
      if (t2 = this.elements[i2].id, this.rm.isAttributeAvailable(this.resourceParent, t2, false, "audio")) {
        let e4 = this.rm.getSetupResourceId(this.resourceParent, t2, false, "audio"), i3 = this.rm.getResourceUrlBase(e4), l2 = null, c2 = false;
        for (let e5 = 0; e5 < this.audioBuffer.length; e5++) if (this.audioBuffer[e5].url == i3) {
          c2 = true, l2 = this.audioBuffer[e5].audio;
          break;
        }
        c2 ? (l2.currentTime = 0, l2.play()) : (l2 = new Audio(i3), this.audioBuffer.push({ url: i3, audio: l2 }), l2.play());
      }
      let e3 = "Click//" + this.elements[i2].id;
      this.graph.sendMessage(e3);
      break;
    }
    if (this.divContainer) {
      let e3 = new CustomEvent("FPhi.UserControl.TrackStatus.event", { detail: { code: V.Selphi.TrackStatus.Tap, timeStamp: this.secondsWidget, data: t2 } });
      this.divContainer.dispatchEvent(e3);
    }
  }
}, initCamera: function(e2, t2, i2) {
  let l2 = this.canvas;
  if (!this.video) {
    let t3 = document.createElement("video");
    t3.id = "live", t3.setAttribute("playsinline", ""), t3.setAttribute("webkit-playsinline", ""), t3.setAttribute("autoplay", ""), t3.setAttribute("muted", true), t3.setAttribute("volume", 0), t3.addEventListener("play", () => {
      t3.muted = true, t3.volume = 0;
    }), t3.style.display = "none", e2.insertBefore(t3, e2.firstChild), this.video = t3, this.onVideoResizeContext = this.onVideoResize.bind(this), t3.addEventListener("resize", this.onVideoResizeContext, false);
  }
  l2.imageSmoothingEnabled = true, l2.clientWidth, l2.clientHeight, l2 && (l2.style.display = "none", l2.onclick = this.canvasOnClick.bind(this), l2.onmousemove = this.canvasOnMove.bind(this), this.privateCanvas = document.createElement("canvas"), 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = t2, this.privateCanvas.height = i2) : (this.privateCanvas.width = i2, this.privateCanvas.height = t2));
}, userMedia: function() {
  return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || null;
}, grantVideoPermission: async function() {
  try {
    let e2 = { video: { width: 640, height: 480 }, audio: false };
    (await navigator.mediaDevices.getUserMedia(e2)).getTracks().forEach((e3) => {
      e3.stop();
    });
  } catch (e2) {
    this.divContainer.dispatchEvent(new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { exceptionType: 0, message: "" + e2.message } }));
  }
}, setVideoInput: function(e2) {
  e2.canvas && e2.playDevice(e2);
}, playDevice: function(e2) {
  let t2 = e2.video, i2 = e2.canvas.getContext("2d", { alpha: true }), l2 = { video: {}, audio: {} };
  window.stream && window.stream.getTracks().forEach((e3) => {
    e3.stop();
  }), l2 = e2.forceCameraId ? { video: { deviceId: e2.forceCameraId, width: e2.cameraWidth, height: e2.cameraHeight }, audio: false } : { video: { deviceId: e2.cameraId ? { exact: e2.cameraId } : void 0, width: e2.cameraWidth, height: e2.cameraHeight, facingMode: e2.cameraType === V.Selphi.CameraType.Front ? "user" : "environment" }, audio: false }, navigator.mediaDevices.getUserMedia(l2).then(async function(i3) {
    e2.cameraStream = i3;
    const c2 = e2.cameraStream.getVideoTracks()[0];
    if (l2.video.width > 1280 || l2.video.height > 720) try {
      await c2.applyConstraints({ width: { max: 1280, min: 640, ideal: e2.cameraWidth }, height: { max: 720, min: 480, ideal: e2.cameraHeight } });
    } catch (e3) {
      d.printWarning("Error applying resolution contraints to the track: " + e3.message);
    }
    const a2 = "function" === c2.getCapabilities ? c2.getCapabilities() : c2.getSettings();
    a2.facingMode && ("user" === a2.facingMode || "user" === a2.facingMode[0] ? (d.printDebug(`Selecting Camera for Play with id: ${a2.deviceId}; name: ${c2.name}; facingMode = ${JSON.stringify(a2.facingMode)}`), e2.cameraType = V.Selphi.CameraType.Front) : "environment" !== a2.facingMode && "environment" !== a2.facingMode[0] || (d.printDebug(`Selecting Camera for Play with id: ${a2.deviceId}; name: ${c2.name}; facingMode = ${JSON.stringify(a2.facingMode)}`), e2.cameraType = V.Selphi.CameraType.Back)), e2.cameraName = c2.label, d.printDebug("Camera selected for widget: " + c2.label), e2.cameraId = a2.deviceId, t2.onloadedmetadata = e2.videoLoaded.bind(e2), t2.srcObject = i3, t2.play();
  }).catch(function(l3) {
    const c2 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: `Error opening camera with id: ${e2.cameraId}`, exceptionType: 0 } });
    e2.divContainer && e2.divContainer.dispatchEvent(c2), d.printDebug(l3);
    let a2 = { video: { width: e2.cm.getCameraWidth(), height: e2.cm.getCameraHeight(), facingMode: e2.cameraType === V.Selphi.CameraType.Front ? "user" : "environment" }, audio: false };
    navigator.mediaDevices.getUserMedia(a2).then(async function(i3) {
      e2.cameraStream = i3;
      const l4 = i3.getVideoTracks()[0];
      if (a2.video.width > 1280 || a2.video.height > 720) try {
        await l4.applyConstraints({ width: { max: 1280, min: 640, ideal: e2.cameraWidth }, height: { max: 720, min: 480, ideal: e2.cameraHeight } });
      } catch (e3) {
        d.printWarning("Error applying resolution contraints to the track: " + e3.message);
      }
      const c3 = "function" === l4.getCapabilities ? l4.getCapabilities() : l4.getSettings();
      e2.cameraName = l4.label, d.printDebug("Camera selected for widget: " + l4.label), e2.cameraId = c3.deviceId, t2.onloadedmetadata = e2.videoLoaded.bind(e2), t2.srcObject = i3, t2.play();
    }).catch(function(t3) {
      e2.draw(e2, e2.imageCamera, i2);
      let l4 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: t3.message, exceptionType: 0 } });
      e2.divContainer.dispatchEvent(l4);
    });
  });
}, addCameraResolution: function(e2, t2, i2) {
  for (let l2 = 0; l2 < e2.length; l2++) if (e2[l2].width === t2 && e2[l2].height === i2) return;
  e2.push({ width: t2, height: i2 });
}, checkCameraResolutions: async function(e2, t2, i2) {
  let l2 = document.createElement("video");
  const c2 = await navigator.mediaDevices.enumerateDevices();
  for (let e3 = 0; e3 < c2.length; e3++) d.printDebug(c2[e3]);
  let a2 = { video: { width: { ideal: i2.cameraWidth }, height: { ideal: i2.cameraHeight }, facingMode: i2.cameraType === V.Selphi.CameraType.Front ? "user" : "environment" }, audio: false };
  try {
    const t3 = await navigator.mediaDevices.getUserMedia(a2);
    l2.srcObject = t3, l2.onloadedmetadata = async function(l3) {
      t3.getVideoTracks()[0];
      for (let l4 = 0; l4 < e2.length; l4++) {
        let c4 = { width: { exact: e2[l4].width }, height: { exact: e2[l4].height } };
        try {
          const a3 = t3.getVideoTracks()[0];
          await a3.applyConstraints(c4);
          let d2 = a3.getSettings();
          d2.resizeMode ? "none" === d2.resizeMode && i2.addCameraResolution(i2.testedResolutions, e2[l4].width, e2[l4].height) : i2.addCameraResolution(i2.testedResolutions, e2[l4].width, e2[l4].height);
        } catch (e3) {
        }
      }
      let c3 = "Camera resolutions: ";
      for (let e3 = 0; e3 < i2.testedResolutions.length; e3++) c3 = c3 + "[" + i2.testedResolutions[e3].width + "x" + i2.testedResolutions[e3].height + "]";
      d.printDebug(c3), t3.getTracks().forEach(function(e3) {
        e3.stop();
      }), i2.Start_();
    }, l2.play();
  } catch (e3) {
    self_Start_();
  }
}, handleRecorderDataAvailable: function(e2) {
  e2.data && e2.data.size > 0 && this.recordedBlobs.push(e2.data);
}, handleRecorderOnStop: function(e2) {
  this.recorderFinish = true;
}, mobileCheck: function() {
  let e2 = false;
  var t2;
  return t2 = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t2.substr(0, 4))) && (e2 = true), e2;
}, isIpadOS: function() {
  return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
}, gotDevices: function(e2) {
  let t2 = 0;
  for (let i3 = 0; i3 !== e2.length; ++i3) "videoinput" === e2[i3].kind && t2++;
  this.cameraList = new Array(t2);
  let i2 = 0;
  for (let t3 = 0; t3 !== e2.length; ++t3) {
    let l3 = e2[t3];
    if ("videoinput" === l3.kind) {
      let e3 = document.createElement("option");
      e3.value = l3.deviceId, e3.text = l3.label, this.cameraList[i2] = e3, i2++;
    }
  }
  let l2 = new CustomEvent("FPhi.UserControl.Cameras.event", { detail: { cameras: this.cameraList } });
  this.divContainer.dispatchEvent(l2);
}, handleCameraError: function(e2) {
}, fromCameraToScreen: function(e2, t2) {
  let i2 = e2.cameraWidth, l2 = e2.cameraHeight;
  1 !== e2.cameraRotation && 3 !== e2.cameraRotation || (i2 = e2.cameraHeight, l2 = e2.cameraWidth);
  let c2 = e2.canvas.getContext("2d", { alpha: true }), a2 = e2.drawer.getCameraRect(c2, i2, l2), d2 = a2.width / i2, s2 = a2.height / l2, m2 = { x: t2.x * d2, y: t2.y * s2, width: t2.width * d2, height: t2.height * s2 }, h2 = e2.reflectedX(a2.width, m2.x + m2.width);
  return m2.x = h2, m2.x += a2.x, m2.y += a2.y, m2;
}, fromCameraToScreenDetection: function(e2, t2) {
  let i2 = e2.cameraWidth, l2 = e2.cameraHeight;
  1 !== e2.cameraRotation && 3 !== e2.cameraRotation || (i2 = e2.cameraHeight, l2 = e2.cameraWidth);
  let c2 = e2.canvas.getContext("2d", { alpha: true });
  if (e2.drawer) {
    let a2 = e2.drawer.getCameraRect(c2, i2, l2), d2 = a2.width / i2, s2 = a2.height / l2, m2 = { x: t2.x * d2, y: t2.y * s2, width: t2.width * d2, height: t2.height * s2 }, h2 = e2.reflectedX(a2.width, m2.x + m2.width);
    return m2.x = h2, m2.x += a2.x, m2.y += a2.y, m2;
  }
  return { x: 0, y: 0, width: 0, height: 0 };
}, scaleRect: function(e2, t2, i2) {
  let l2 = t2.x + t2.width / 2, c2 = t2.y + t2.height / 2, a2 = t2.width / e2.width, d2 = t2.height / e2.height, s2 = e2.width * a2, m2 = e2.height * a2;
  return void 0 === i2 ? m2 < t2.height && (s2 = e2.width * d2, m2 = e2.height * d2) : m2 >= t2.height && (s2 = e2.width * d2, m2 = e2.height * d2), { x: l2 - s2 / 2, y: c2 - m2 / 2, width: s2, height: m2 };
}, scaleRectByFactor(e2, t2, i2) {
  let l2 = e2.x + 0.5 * e2.width, c2 = e2.y + 0.5 * e2.height, a2 = { x: 0, y: 0, width: 0, height: 0 };
  a2.width = e2.width *= t2, a2.height = e2.height *= i2, a2.x = e2.x, a2.y = e2.y;
  let d2 = e2.x + 0.5 * e2.width - l2, s2 = e2.y + 0.5 * e2.height - c2;
  return a2.x -= d2, a2.y -= s2, a2;
}, getGraphicalScore: function(e2) {
  let t2 = 100 * e2 / 90 * (100 * e2 / 90) * 0.9 + 0.1;
  return t2 > 1 && (t2 = 1), t2;
}, saveImageToCanvas: function(e2, t2) {
  let i2 = e2.cameraWidth, l2 = e2.cameraHeight;
  1 !== e2.cameraRotation && 3 !== e2.cameraRotation || (i2 = e2.cameraHeight, l2 = e2.cameraWidth), (i2 > 1280 || l2 > 720) && (i2 > l2 ? (l2 = l2 / i2 * 1280, i2 = 1280, l2 > 720 && (i2 = i2 / l2 * 720, l2 = 720)) : (i2 = l2 / i2 * 720, l2 = 1280, i2 > 720 && (l2 = l2 / i2 * 1280, i2 = 720))), e2.privateCanvas.width = i2, e2.privateCanvas.height = l2;
  let c2 = e2.privateCanvas.getContext("2d");
  switch (e2.cameraRotation) {
    case 0:
      c2.drawImage(t2, 0, 0, i2, l2);
      break;
    case 1:
      c2.save(), c2.translate(i2 / 2, l2 / 2), c2.rotate(Math.PI / 180 * 90), c2.drawImage(t2, -l2 / 2, -i2 / 2, l2, i2), c2.restore();
      break;
    case 2:
      c2.save(), c2.translate(i2 / 2, l2 / 2), c2.rotate(Math.PI), c2.drawImage(t2, -i2 / 2, -l2 / 2, i2, l2), c2.restore();
      break;
    case 3:
      c2.save(), c2.translate(i2 / 2, l2 / 2), c2.rotate(Math.PI / 180 * 270), c2.drawImage(t2, -l2 / 2, -i2 / 2, l2, i2), c2.restore();
  }
}, getLayoutFromXML: function(e2, t2, i2, l2, c2) {
  let a2 = "LEFT", d2 = "TOP", s2 = i2, m2 = false;
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "width")) {
    null == s2 && (s2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "width");
    s2.width = i3 <= 1 ? i3 * l2 : i3, m2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "height")) {
    null == s2 && (s2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "height");
    s2.height = i3 <= 1 ? i3 * c2 : i3, m2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "xAnchor") && (a2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "xAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "yAnchor") && (d2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "yAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "x")) {
    null == s2 && (s2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "x");
    s2.x = i3 <= 1 && i3 >= -1 ? i3 * l2 : i3, "CENTER" === a2 ? s2.x = l2 / 2 - s2.width / 2 + s2.x : "RIGHT" === a2 && (s2.x = l2 - s2.width + s2.x), m2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "y")) {
    null == s2 && (s2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "y");
    s2.y = i3 <= 1 && i3 >= -1 ? i3 * c2 : i3, "CENTER" === d2 ? s2.y = c2 / 2 - s2.height / 2 + s2.y : "BOTTOM" === d2 && (s2.y = c2 - s2.height + s2.y), m2 = true;
  }
  return s2;
}, draw: function(e2) {
  if (!this.drawer) return;
  if (!this.divContainer) return;
  this.cm.getFaceTracking() && (this.isMobileDevice || this.faceTrack());
  let t2 = this, i2 = t2.video, l2 = t2.canvas.getContext("2d", { alpha: true }), c2 = l2.canvas.clientWidth, a2 = l2.canvas.clientHeight;
  t2.canvasWidth = c2, t2.canvasHeight = a2, l2.clearRect(0, 0, c2, a2), t2.fpsframes++, t2.actualTimePrev = t2.actualTime, t2.actualTime = performance.now();
  let d2 = (t2.actualTime - t2.fpsTime) / 1e3;
  d2 > 1 && (t2.fps = t2.fpsframes / d2, t2.fpseframes > 0 ? t2.fpse = t2.fpseframes / d2 : t2.fpse = 0, t2.fpsTime = t2.actualTime, t2.fpsframes = 0, t2.fpseframes = 0), t2.video && (t2.videoWidthOld == t2.video.videoWidth && t2.videoHeightOld == t2.video.videoHeight || t2.onCanvasResize(), t2.videoWidthOld = t2.video.videoWidth, t2.videoHeightOld = t2.video.videoHeight);
  let s2 = "Normal";
  if (t2.actualTime - t2.widgetTime > 500 && ("UCWaitingFaceStart" !== t2.state && "UCExtracting" !== t2.state || t2.faceAvailableDelayed || (s2 = "Warning"), "UCLivenessMoveStabilizing" === t2.state && 1 !== t2.livenessMoveLastStabilizedStatus && 2 !== t2.livenessMoveLastStabilizedStatus && 17 !== t2.livenessMoveLastStabilizedStatus && (s2 = "Warning")), t2.iterateAutomata(t2, i2, l2), t2.secondsWidget = (t2.actualTime - t2.widgetTime) / 1e3, t2.secondsState = (t2.actualTime - t2.stateTime) / 1e3, void 0 !== t2.elements && null !== t2.elements) {
    let e3 = { progress: 0 };
    e3.faceDataRect = t2.faceDataRect, e3.leftEyeData = t2.leftEyeData, e3.rightEyeData = t2.rightEyeData, e3.state = t2.state, e3.livenessMoveLastStabilizedStatus = t2.livenessMoveLastStabilizedStatus, e3.interactible = t2.interactible, "UCExtracting" === t2.state ? 0 !== t2.extractionTime ? e3.progress = t2.extractionTimePartial / (1e3 * t2.extractionTime) : e3.progress = 0 : "UCShowResults" === t2.state ? e3.progress = t2.getGraphicalScore(t2.lastExtractionResult.templateScore) : "UCLivenessMoveDetecting" === t2.state ? e3.livenessMoveDirection = t2.livenessMoveDirection : "UCWaitingFaceStart" === t2.state || "UCWaitingFaceStartDecision" === t2.state ? e3.progress = 1 : "UCErrors" !== t2.state && "UCErrorFinish" !== t2.state || (e3.livenessDiagnostic = t2.livenessDiagnostic), e3.livenessMoveFailReason = t2.livenessMoveFailReason;
    for (let i3 = 0; i3 < t2.elements.length; i3++) {
      let d3 = null;
      if (null !== t2.rm && (d3 = t2.drawer.getLayout(t2.resourceParent, t2.elements[i3].id, t2.elements[i3].type, t2.secondsWidget, t2.secondsState, s2, e3)), null !== d3 && (d3 = t2.getLayoutFromXML(t2.resourceParent, t2.elements[i3].id, d3, c2, a2)), null !== d3) {
        t2.elements[i3].layout = d3;
        let c3 = t2.elements[i3].mode, a3 = false;
        if (c3) {
          let e4 = c3.split("|");
          for (let t3 = 0; t3 < e4.length; t3++) if (e4[t3] === s2) {
            a3 = true;
            break;
          }
        } else a3 = true;
        if (true === a3) {
          if ("video" === t2.elements[i3].type) e3.player = t2.elements[i3].videoPlayer;
          else if ("camera" === t2.elements[i3].type) if (e3.eyesYLevel = t2.privateEyesYLevel, e3.blindText = "", "UCLivenessDetectionStep1" === t2.state) {
            let i4 = t2.actualTime - t2.clockLiveness1;
            i4 /= 1e3 * t2.liveness1Time, i4 > 1 && (i4 = 1), i4 = (i4 - 1) * (i4 - 1) * (i4 - 1) + 1, e3.blind = 0.8 * i4;
          } else if ("UCLivenessDetectionStep2" === t2.state) e3.blind = 0.8, e3.blindText = t2.rm.translate("message_blink");
          else if ("UCLivenessDetectionStep3" === t2.state) {
            let i4 = 0;
            i4 = t2.actualTime - t2.clockLiveness3, i4 = i4 / (1e3 * t2.liveness3Time) * 0.2, i4 > 0.2 && (i4 = 0.2), e3.blind = 0.8 + i4;
          } else if ("UCWaitingEyeDetection" === t2.state) if (null == t2.clockEyeDetectionDetected) {
            let i4 = t2.actualTime - t2.clockEyeDetection, l3 = 0;
            i4 < 1e3 ? l3 = 1 : (l3 = (i4 - 1e3) / (1e3 * t2.liveness1Time), l3 < 0 ? l3 = 0 : l3 > 1 && (l3 = 1), l3 = 1 - l3), e3.blind = l3;
          } else {
            let i4 = (t2.actualTime - t2.clockEyeDetectionDetected) / (1e3 * t2.liveness3Time) * 0.2;
            i4 < 0 ? i4 = 0 : i4 > 0.2 && (i4 = 0.2), e3.blind = 1 - i4;
          }
          else e3.blind = 0;
          "button_info" !== t2.elements[i3].id && (t2.cm.getAccessibility() && t2.cm.getAccessibleElements().includes(t2.elements[i3].type) || t2.drawer.draw(l2, d3, t2.resourceParent, t2.elements[i3].id, t2.elements[i3].type, t2.secondsWidget, t2.secondsState, s2, e3));
        }
      }
    }
  } else if ("UCErrors" === t2.state) {
    l2.fillStyle = "white", l2.fillRect(0, 0, c2, a2);
    let e3 = t2.livenessErrorString, i3 = 15 * t2.fontSizeFactor, d3 = t2.rm.getSetupResourceId("facephi-widget-conf", "", t2.drawer.landscape, "font_warning_message");
    l2.font = i3 + "px '" + d3 + "'", l2.fillStyle = "black";
    let s3 = e3.split("\n");
    for (let e4 = 0; e4 < s3.length; e4++) {
      let a3 = l2.measureText(s3[e4]), d4 = 330 * t2.canvasSizeFactor + i3 * e4;
      l2.fillText(s3[e4], c2 / 2 - a3.width / 2, d4);
    }
    let m2 = t2.livenessErrorImage, h2 = t2.scaleRect({ width: m2.width, height: m2.height }, { x: 0.03 * c2, y: 0.378 * a2, width: 0.94 * c2, height: 0.1 * a2 }, true);
    l2.drawImage(m2, h2.x, h2.y, h2.width, h2.height), t2.drawButton(t2, l2, { x: 0, y: a2 - t2.buttonHeight, width: c2, height: t2.buttonHeight }, "Results", "button_finish"), t2.secondsState;
  }
  if (t2.debug && (t2.worker || t2.engineInstance)) {
    let e3 = 1;
    l2.font = "12px Poppins-SemiBold", l2.fillStyle = "black", l2.fillText("State: " + t2.state, 0, 20 * e3), e3++, l2.fillText("FPS: " + t2.fps.toFixed(2), 0, 20 * e3), e3++, l2.fillText("FPS Extractor: " + t2.fpse.toFixed(2), 0, 20 * e3), e3++, l2.fillText("Camera size: " + t2.cameraWidth + "x" + t2.cameraHeight + "px", 0, 20 * e3), e3++, l2.fillText("Canvas size: " + c2 + "x" + a2 + "px", 0, 20 * e3), e3++, l2.fillText("Camera rotation: " + t2.cameraRotation, 0, 20 * e3), e3++, l2.fillText("WidgetTime: " + t2.secondsWidget, 0, 20 * e3), e3++, l2.fillText("StateTime: " + t2.secondsState, 0, 20 * e3), e3++, l2.fillText("Mode: " + s2, 0, 20 * e3), e3++, l2.fillText("Images: " + t2.privateImages.length, 0, 20 * e3), e3++, l2.fillText("Face available: " + t2.faceAvailable, 0, 20 * e3), e3++, l2.fillText("EyesYLevel: " + Math.round(t2.privateEyesYLevel), 0, 20 * e3), e3++;
    let i3 = t2.lastDetectResult;
    if (null != i3) {
      if (void 0 !== i3.face) {
        l2.fillText("Face: [" + i3.face.x + "," + i3.face.y + "," + i3.face.width + "," + i3.face.height + "]", 0, 20 * e3), e3++, l2.beginPath(), l2.lineWidth = "3", l2.strokeStyle = "red";
        let c3 = t2.fromCameraToScreen(t2, { x: i3.face.x, y: i3.face.y, width: i3.face.width, height: i3.face.height });
        l2.rect(c3.x, c3.y, c3.width, c3.height), l2.stroke();
      }
      if (void 0 !== i3.leftEye) {
        l2.beginPath(), l2.lineWidth = "6", l2.strokeStyle = "red";
        let e4 = t2.fromCameraToScreen(t2, { x: i3.leftEye.x, y: i3.leftEye.y, width: 1, height: 1 });
        l2.rect(e4.x, e4.y, e4.width, e4.height), l2.stroke();
      }
      if (void 0 !== i3.rightEye) {
        l2.beginPath(), l2.lineWidth = "6", l2.strokeStyle = "red";
        let e4 = t2.fromCameraToScreen(t2, { x: i3.rightEye.x, y: i3.rightEye.y, width: 1, height: 1 });
        l2.rect(e4.x, e4.y, e4.width, e4.height), l2.stroke();
      }
    }
  }
  (t2.worker || t2.engineInstance) && setTimeout(t2.draw.bind(this), t2.samplePeriod);
}, reduceRect: function(e2, t2) {
  let i2 = e2.width * (1 - t2), l2 = e2.height * (1 - t2);
  return e2.x = e2.x + (e2.width - i2) / 2, e2.y = e2.y + (e2.height - l2) / 2, e2.width = i2, e2.height = l2, e2;
}, drawStringMultiline: function(e2, t2, i2, l2, c2, a2, d2) {
  let s2 = i2.split("\n");
  t2.imageSmoothingEnabled = false, d2 = Math.round(d2 * e2.fontSizeFactor), t2.font = "normal " + d2 + "px '" + a2 + "'", t2.fillStyle = c2;
  for (let i3 = 0; i3 < s2.length; i3++) {
    let c3 = t2.measureText(s2[i3]);
    t2.fillText(s2[i3], e2.canvasWidth / 2 - c3.width / 2, l2 + i3 * (d2 + 1));
  }
}, setOffInterface: function(e2, t2, i2) {
  e2.beginPath(), e2.lineWidth = "5", e2.fillStyle = "gray", e2.fillRect(0, 0, i2, i2), e2.stroke();
}, adaptText: function(e2, t2, i2, l2) {
  if (t2.font = l2, t2.measureText(i2).width > e2) {
    let c2 = l2.indexOf("px"), a2 = l2.substring(0, c2);
    return a2--, l2 = a2 + l2.substring(c2, l2.length), t2.font = l2, this.adaptText(e2, t2, i2, l2);
  }
  return true;
}, reflectedX: function(e2, t2) {
  return e2 - t2;
}, iterateAutomata: function(e2, t2, i2) {
  if (false === e2.cameraReady) return;
  let l2 = e2.faceAvailable;
  switch (e2.state) {
    case "UCNothing":
      let i3 = e2.canvas;
      null !== i3 && (i3.style.display = "inline-block");
      let l3 = "SetMode//" + e2.livenessMode + "," + (e2.tutorial ? 1 : 0);
      d.printDebug(l3), e2.graph.sendMessage(l3), e2.workerWorking = false;
      break;
    case "UCErrors":
      false === this.interactible && e2.secondsState > 2 && e2.graph.sendMessage("Click//button_error");
      break;
    case "UCTutorialRegister1":
    case "UCTutorialRegister2":
    case "UCShowResults":
      e2.evaluateScenarioTimeout(e2);
      break;
    case "UCWaitingFaceStart":
      e2.wasmReady && false === e2.workerWorking && (e2.saveImageToCanvas(e2, t2), e2.privateLastImage = e2.getImageData(e2.privateCanvas), d.printDebug("Sending data to engine!"), e2.workerWorking = true, e2.engineInstance.detect(e2.privateLastImage.pixels).then((t3) => {
        if (d.printDebug("Received data from engine!"), d.printDebug(JSON.stringify(t3)), e2.lastDetectResult = t3, e2.faceAvailable = false, e2.faceTooFar = t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.FaceTooFar, t3.face) {
          let i5 = e2.fromCameraToScreenDetection(e2, t3.face);
          (e2.drawer && e2.drawer.faceInsideCircle(i5) || e2.cm.getFaceTracking()) && (e2.faceAvailable = true, e2.faceDataRect = i5);
        }
        let i4 = t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.NotRated;
        if (false === e2.qualityCheckFailed && true === i4 && d.printDebug("timeout by phi_code_3"), e2.qualityCheckFailed = e2.qualityCheckFailed || i4, t3.leftEye) {
          let i5 = e2.fromCameraToScreenDetection(e2, { x: t3.leftEye.x, y: t3.leftEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i5.y, e2.leftEyeData = i5;
        }
        if (t3.rightEye) {
          let i5 = e2.fromCameraToScreenDetection(e2, { x: t3.rightEye.x, y: t3.rightEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i5.y, e2.rightEyeData = i5;
        }
        e2.lastExtractionResult && e2.lastExtractionResult.face ? e2.facePositions.push(e2.lastExtractionResult.SampleDiagnostic === V.Selphi.SampleDiagnostic.NotRated) : e2.facePositions.push(true), e2.workerWorking = false;
      }).catch((t3) => {
        d.printError(t3), e2.workerWorking = false;
      }), e2.evaluateScenarioTimeout(e2));
      break;
    case "UCWaitingFaceStartDecision":
      true === e2.stabilizationStage ? e2.graph.sendMessage("Stabilize") : e2.graph.sendMessage("Extract");
      break;
    case "UCExtracting":
      let c2 = false, a2 = false;
      if (navigator.userAgent && (navigator.userAgent.includes("Macintosh") && (c2 = true), navigator.userAgent.includes("Chrome") && (a2 = true)), e2.cameraName.toUpperCase().includes(e2.face_v() + e2.face_t()) || e2.cameraName.toUpperCase().includes(e2.face_o() + e2.face_b() + e2.face_s()) || e2.cameraName.toUpperCase().includes(e2.face_spl() + e2.face_it() + e2.face_cam()) || e2.cameraName.toUpperCase().includes(e2.face_fa() + e2.face_ke()) || e2.cameraName.toUpperCase().includes(e2.face_sn() + e2.face_ap()) || e2.cameraName.toUpperCase().includes(e2.face_defa() + e2.face_ult()) || e2.cameraName.toUpperCase().includes(e2.face_mo() + e2.face_ck()) || e2.cameraName.toUpperCase().includes(e2.face_alpha()) ? e2.actualTime - e2.clockExtractionPure > e2.extractionTimeout && e2.extractionTimeout > 0 && (e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout"), d.printDebug("timeout by phi_code_2")) : e2.faceAvailableDelayed && (e2.extractionTimePartial += e2.actualTime - e2.actualTimePrev), e2.actualTime - e2.clockExtractionPure > e2.detectionTimeout && e2.detectionTimeout > 0 && 0 === e2.privateImages.length) e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout");
      else if (e2.extractionTime > 0 && (e2.extractionTimePartial < 1e3 * e2.extractionTime || 0 === e2.privateImages.length)) e2.actualTime - e2.clockExtractionPure > e2.extractionTimeout && e2.extractionTimeout > 0 ? (e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout")) : false === e2.workerWorking && (e2.saveImageToCanvas(e2, t2), e2.privateLastImage = e2.getImageData(e2.privateCanvas), d.printDebug("Sending data to engine!"), e2.workerWorking = true, e2.engineInstance.extractionNextSmart(e2.privateLastImage.pixels).then((t3) => {
        if (d.printDebug("Received data from engine!"), d.printDebug(JSON.stringify(t3)), e2.faceTooFar = t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.FaceTooFar, e2.tooManyFaces = t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.TooManyFaces, e2.faceAvailable = false, t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.Ok) {
          e2.lastExtractionResult = t3;
          let i5 = e2.fromCameraToScreenDetection(e2, e2.lastExtractionResult.face);
          e2.drawer.faceInsideCircle(i5) && (e2.faceAvailable = true, e2.faceDataRect = i5);
        }
        let i4 = t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.NotRated;
        if (false === e2.qualityCheckFailed && true === i4 && d.printDebug("timeout by phi_code_3"), e2.qualityCheckFailed = e2.qualityCheckFailed || i4, t3.leftEye) {
          let i5 = e2.fromCameraToScreenDetection(e2, { x: t3.leftEye.x, y: t3.leftEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i5.y, e2.leftEyeData = i5;
        }
        if (t3.rightEye) {
          let i5 = e2.fromCameraToScreenDetection(e2, { x: t3.rightEye.x, y: t3.rightEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i5.y, e2.rightEyeData = i5;
        }
        e2.lastExtractionResult && e2.lastExtractionResult.face ? e2.facePositions.push(e2.lastExtractionResult.SampleDiagnostic === V.Selphi.SampleDiagnostic.NotRated) : e2.facePositions.push(true), e2.qualityCheckFailed && (t3.sampleDiagnostic = V.Selphi.SampleDiagnostic.NotRated), e2.privateLastImage && (e2.privateLastImage.extractionResult = t3), t3.sampleDiagnostic === V.Selphi.SampleDiagnostic.Ok && true === e2.faceAvailable && (e2.privateImages.length < 5 ? e2.privateImages.push(e2.privateLastImage) : e2.betterSustitution(e2, e2.privateImages, e2.privateLastImage)), this.tooManyFaces && (this.livenessMoveFailReason = 4, this.graph.sendMessage("TooManyFaces"), this.tooManyFaces = false), e2.workerWorking = false;
      }).catch((t3) => {
        d.printError(t3), e2.workerWorking = false;
      }));
      else {
        if (e2.cm.getLogImages() && e2.privateImages.length < e2.minLogImages) {
          let i4 = e2.privateImages.length ? e2.privateImages[e2.privateImages.length - 1].time : 0;
          const l4 = e2.privateImages.slice(-1)[0].extractionResult;
          for (; e2.privateImages.length < e2.minLogImages && e2.privateImages.length < 5; ) {
            e2.saveImageToCanvas(e2, t2);
            const c3 = e2.getImageData(e2.privateCanvas);
            c3.time >= i4 + 100 && (c3.extractionResult = l4, e2.privateImages.push(c3), i4 = c3.time);
          }
        }
        17 === e2.livenessMoveLastStabilizedStatus ? (e2.livenessMoveFailReason = 2, e2.livenessMoveActualFailedGlassesAttempts++, e2.livenessMoveActualFailedAttempts++, e2.graph.sendMessage("LivenessMoveGlasses//" + e2.livenessMoveActualFailedAttempts)) : e2.graph.sendMessage("AuthenticationFinished");
      }
      e2.tooManyFaces && (e2.livenessMoveFailReason = 4, e2.graph.sendMessage("TooManyFaces"), e2.tooManyFaces = false);
      break;
    case "UCWaitingEyeDetection":
      if (performance.now() - e2.clockEyeDetection > e2.detectionTimeout && e2.detectionTimeout > 0) return e2.livenessDiagnostic = -1, void e2.graph.sendMessage("Timeout");
      let s2 = performance.now() - e2.clockEyeDetection;
      if (s2 > 1e3 && !e2.clockEyeDetectionDetected && s2 < 1e3 + 1e3 * e2.liveness1Time) return;
      if (s2 > 1e3 + 1e3 * e2.liveness1Time && e2.clockEyeDetectionDetected) return void e2.graph.sendMessage("ResetLivenessBlink");
      e2.clockEyeDetectionDetected && performance.now() - e2.clockEyeDetectionDetected > 1e3 * e2.liveness3Time && e2.graph.sendMessage("Timer"), e2.clockEyeDetectionDetected || false === e2.workerWorking && (e2.wasmReady || e2.engineInstance) && (e2.saveImageToCanvas(e2, t2), e2.privateLastImage = e2.getImageData(e2.privateCanvas), e2.postMessage(e2, { cmd: "detect", data: e2.privateLastImage.pixels.data, width: e2.privateLastImage.width, height: e2.privateLastImage.height, format: V.Selphi.ImageFormat.RGBA_32bpp }), e2.evaluateScenarioTimeout(e2));
      break;
    case "UCLivenessDetectionStep1":
      performance.now() - e2.clockLiveness1 > 1e3 * e2.liveness1Time && e2.graph.sendMessage("Timer");
      break;
    case "UCLivenessDetectionStep2":
      false === e2.workerWorking && (e2.wasmReady || e2.engineInstance) && (e2.saveImageToCanvas(e2, t2), e2.privateLivenessImageTemp = e2.getImageData(e2.privateCanvas), e2.postMessage(e2, { cmd: "livenessTimerAdd", milliseconds: performance.now() - e2.clockLiveness2 }));
      break;
    case "UCLivenessDetectionStep3":
      null !== e2.clockLiveness3_finish && performance.now() - e2.clockLiveness3_finish > 1e3 * e2.liveness3Time && e2.graph.sendMessage("EyeDetectionNeeded");
      break;
    case "UCLivenessMoveStabilizing":
      if (e2.detectionTimeout > 0 && 1e3 * e2.secondsState >= e2.detectionTimeout) {
        e2.livenessDiagnostic = -1, e2.livenessMoveStabilizedStatusHistory.push(-1), e2.graph.sendMessage("Timeout");
        let t3 = new CustomEvent("FPhi.UserControl.Stabilizing.event", { detail: -1 });
        e2.divContainer && e2.divContainer.dispatchEvent(t3);
      } else (e2.wasmReady || e2.engineInstance) && false === e2.workerWorking && (e2.saveImageToCanvas(e2, t2), e2.privateLastImage = e2.getImageData(e2.privateCanvas), e2.workerWorking = true, e2.engineInstance.nextLivenessMoveStabilization(e2.privateLastImage.pixels).then((t3) => {
        if (d.printDebug("Received data from engine!"), d.printDebug(JSON.stringify(t3)), e2.livenessMoveLastStabilizedStatus = t3.faceStabilized, e2.faceTooFar = 3 === t3.faceStabilized, e2.faceAvailable = false, d.printDebug("Sending data to engine!"), e2.lastExtractionResult = t3, t3.face && null != e2.drawer) {
          let i4 = e2.fromCameraToScreenDetection(e2, t3.face);
          (e2.drawer.faceInsideCircle(i4) || e2.cm.getFaceTracking()) && (e2.faceAvailable = true, e2.faceDataRect = i4);
        }
        if (t3.leftEye) {
          let i4 = e2.fromCameraToScreenDetection(e2, { x: t3.leftEye.x, y: t3.leftEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i4.y, e2.leftEyeData = i4;
        }
        if (t3.rightEye) {
          let i4 = e2.fromCameraToScreenDetection(e2, { x: t3.rightEye.x, y: t3.rightEye.y, width: 1, height: 1 });
          e2.privateEyesYLevel = i4.y, e2.rightEyeData = i4;
        }
        if (e2.privateLastImage.extractionResult = t3, 1 !== t3.faceStabilized && 17 !== t3.faceStabilized || (e2.livenessMoveStabilizedStatusHistory.push(t3.faceStabilized), e2.graph.sendMessage("FaceStabilized")), 4 === t3.faceStabilized && (e2.livenessMoveGlassesFail++, e2.livenessMoveFailReason = 0, e2.livenessMoveStabilizedStatusHistory.push(t3.faceStabilized), t3.sunGlassesScore = 1, e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout")), null !== t3.faceStabilized) {
          let i4 = new CustomEvent("FPhi.UserControl.Stabilizing.event", { detail: t3.faceStabilized });
          e2.divContainer && e2.divContainer.dispatchEvent(i4);
        }
        e2.workerWorking = false;
      }).catch((t3) => {
        d.printError(t3), e2.workerWorking = false;
      }));
      break;
    case "UCWaitRecording":
      e2.cm.getVideoRecord() ? e2.recorderFinish && e2.graph.sendMessage("Finish") : e2.graph.sendMessage("Finish");
      break;
    case "UCLivenessMoveInfo":
      e2.secondsState > e2.livenessMoveInfoTime && (e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout"));
      break;
    case "UCFinish":
      this.resetInternalVars();
  }
  if (e2.faceTooFar && (e2.faceAvailable = false), e2.oldFaceAvailableDelayed = e2.faceAvailableDelayed, true === l2 && false === e2.faceAvailable ? e2.clockWarningIn = e2.actualTime : false === l2 && true === e2.faceAvailable ? e2.clockWarningOut = e2.actualTime : (e2.faceAvailable && e2.actualTime - e2.clockWarningOut > 1e3 * e2.warningOutTime || !e2.faceAvailable && e2.actualTime - e2.clockWarningIn > 1e3 * e2.warningInTime) && (e2.faceAvailableDelayed = e2.faceAvailable), e2.oldFaceAvailableDelayed !== e2.faceAvailableDelayed && e2.divContainer) {
    let t3 = new CustomEvent("FPhi.UserControl.TrackStatus.event", { detail: { code: V.Selphi.TrackStatus.FaceState, timeStamp: e2.secondsWidget, data: e2.faceAvailableDelayed } });
    e2.divContainer.dispatchEvent(t3);
  }
  if (e2.cm.getVideoRecord() && !e2.recorderWorking && e2.recorder.frameReady(false)) {
    e2.privateRecordCanvasContext.drawImage(t2, 0, 0, e2.privateRecordCanvas.width, e2.privateRecordCanvas.height);
    let i3 = e2.privateRecordCanvasContext.getImageData(0, 0, e2.privateRecordCanvas.width, e2.privateRecordCanvas.height);
    if (e2.recorderWorking = true, 0 !== this.cameraRotation) {
      let t3;
      1 === this.cameraRotation ? t3 = 270 : 2 === this.cameraRotation ? t3 = 180 : 3 === this.cameraRotation && (t3 = 90), i3 = e2.rotateImageData(i3, t3);
    }
    e2.recorder.addFrame(i3).then(() => {
      e2.recorderWorking = false;
    });
  }
}, evaluateScenarioTimeout: function(e2) {
  0 === e2.sceneTimeout || e2.sceneTimeout > 0 && performance.now() - e2.clockNewScenario > 1e3 * e2.sceneTimeout && (e2.livenessDiagnostic = -1, e2.graph.sendMessage("Timeout"));
}, rotateImageData: function(e2, t2) {
  const i2 = e2.width, l2 = e2.height, c2 = t2 * Math.PI / 180, a2 = Math.cos(c2), d2 = Math.sin(c2), s2 = new Uint8ClampedArray(e2.data.length), m2 = i2 / 2, h2 = l2 / 2;
  for (let t3 = 0; t3 < l2; t3++) for (let c3 = 0; c3 < i2; c3++) {
    const n2 = a2 * (c3 - m2) + d2 * (t3 - h2) + m2, Z2 = -d2 * (c3 - m2) + a2 * (t3 - h2) + h2, b2 = Math.round(n2), o2 = Math.round(Z2);
    if (b2 >= 0 && b2 < i2 && o2 >= 0 && o2 < l2) {
      const l3 = 4 * (t3 * i2 + c3), a3 = 4 * (o2 * i2 + b2);
      s2[a3] = e2.data[l3], s2[a3 + 1] = e2.data[l3 + 1], s2[a3 + 2] = e2.data[l3 + 2], s2[a3 + 3] = e2.data[l3 + 3];
    }
  }
  return new ImageData(s2, i2, l2);
}, getVideoSources: function(e2) {
  if (navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(t2) {
    t2.filter(function(e3) {
      return "video" === e3.kind;
    }).map(function(e3, t3) {
      return e3.id;
    })[0], e2.setVideoInput(e2);
  }) : MediaStreamTrack.getSources(function(t2) {
    t2.filter(function(e3) {
      return "video" === e3.kind;
    }).map(function(e3, t3) {
      return e3.id;
    })[0], e2.setVideoInput(e2);
  }), null === selectedSource) {
    FacePhiDisplayErrorImage(facePhiUserControl.config.width, folderPath + commonPath + "/Images/errorNoCamsEs.png", folderPath + commonPath + "/Images/errorNoCamsEn.png", "FacePhiWidgetWeb", e2.divContainer, 0, "", "", 0, Poppins, "SemiBold", "black", 0);
    let t2 = new CustomEvent("FPhi.UserControl.ExceptionCaptured.event", { detail: { message: "Camera not found.", exceptionType: 0 } });
    e2.divContainer.dispatchEvent(t2);
  }
}, isPathAbsolute: function(e2) {
  return /^(?:\/|.+:\/\/|http)/.test(e2);
}, getScriptPath: function() {
  return String(new Error().stack).replace(/^Error.*\n/, "").split("\n")[1].match(/http.*\.js/)[0].split("/").slice(0, -1).join("/") + "/";
}, distAlgSustitution: function(e2, t2, i2) {
  let l2, c2 = Number.MAX_VALUE;
  for (let a2 = 1; a2 < t2.length; a2++) {
    let d2 = t2.slice();
    d2[a2] = i2, d2.sort(function(e3, t3) {
      return e3.time - t3.time;
    });
    let s2 = e2.desviacionTipica(e2, d2);
    s2 < c2 && (c2 = s2, l2 = d2);
  }
  return l2;
}, betterSustitution: function(e2, t2, i2) {
  let l2 = Number.MAX_VALUE, c2 = 0;
  for (let e3 = 0; e3 < t2.length; e3++) {
    let i3 = t2[e3].extractionResult.facialScore;
    i3 < l2 && (l2 = i3, c2 = e3);
  }
  i2.extractionResult.facialScore > l2 && (t2[c2] = i2);
}, sortImagesByFacialScore: function(e2, t2) {
  t2.sort(function(e3, t3) {
    let i2 = void 0 !== e3.extractionResult ? e3.extractionResult.facialScore : 0;
    return (void 0 !== t3.extractionResult ? t3.extractionResult.facialScore : 0) - i2;
  });
}, desviacionTipica: function(e2, t2) {
  let i2 = e2.media(e2, t2), l2 = 0;
  for (let e3 = 1; e3 < t2.length; e3++) {
    let c2 = t2[e3].time - t2[e3 - 1].time;
    l2 += (c2 - i2) * (c2 - i2);
  }
  return l2 = Math.sqrt(l2 / (t2.length - 2)), l2;
}, media: function(e2, t2) {
  let i2 = 0;
  for (let e3 = 1; e3 < t2.length; e3++) i2 += t2[e3].time - t2[e3 - 1].time;
  return i2 / (t2.length - 1);
}, OnResourceManagerLoaded: function(e2) {
  this.rm = new V.ResourceManager(this.baseURL, this.language, this, this.OnResourceManagerStatus, this.dpiList, window.devicePixelRatio, this.canvasSizeFactor);
}, OnResourceManagerStatus: function(e2, t2) {
  if (t2 && e2) {
    e2.rmReady = true, e2.CheckDependencies(e2);
    let t3 = 0.6 * e2.canvas.height;
    e2.loadingMessage.style = "position: absolute; top:" + t3 + "px; width: 100%; text-align: center; font-size: 22.0px; color: #7C3295;", e2.loadingMessage.innerHTML = e2.rm.translate("loading_message");
  }
}, OnGraphLoaded: function(e2) {
  this.graph = new V.Graph(this.path + this.graphPath, this.OnGraphReady.bind(this), this.OnGraphNewState.bind(this));
}, OnGraphReady: function(e2) {
  this.graphReady = true, this.CheckDependencies(this);
}, OnDrawerLoaded: function(e2) {
  this.drawer = new V.Drawer(this.mode, this.livenessMode, this.stabilizationStage, this.canvasSizeFactor, this.fontSizeFactor), this.CheckDependencies(this);
}, CheckDependencies: function(e2) {
  if (true === e2.rmReady && e2.drawer && true !== e2.resourcesCached && (e2.drawer.rm = e2.rm, e2.drawer.cacheResources(), e2.resourcesCached = true), true === e2.rmReady && e2.drawer && true === e2.graphReady && true === e2.wasmReady && true === e2.cameraReady && e2.graph && "UCNothing" !== e2.graph.state) {
    let t2 = e2.canvas;
    t2 && (t2.style.display = "none"), e2.video.style.display = "inline-block", e2.drawer.setCanvasSize(t2.clientWidth, t2.clientHeight), e2.graph.setInitialState("UCNothing");
    let i2 = new CustomEvent("FPhi.UserControl.ModuleLoaded.event", { detail: { cameraWidth: e2.cameraWidth, cameraHeight: e2.cameraHeight } });
    e2.divContainer.dispatchEvent(i2), e2.cameraContainer.contains(e2.gifWait) && (e2.cameraContainer.removeChild(e2.gifWait), e2.cameraContainer.removeChild(e2.loadingMessage)), setTimeout(e2.draw.bind(e2), e2.samplePeriod);
  }
}, videoLoaded: function(e2) {
  this.cameraWidth = e2.target.videoWidth, this.cameraHeight = e2.target.videoHeight, 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = this.cameraWidth, this.privateCanvas.height = this.cameraHeight) : (this.privateCanvas.width = this.cameraHeight, this.privateCanvas.height = this.cameraWidth), this.cameraReady = true, d.printDebug("Timing-Camera-ready: " + performance.now()), this.video, this.canvas.getContext("2d", { alpha: true }), !this.recorder && this.cm.getVideoRecord() && (d.printDebug("Video recording enabled..."), this.videoRecordWidth = this.cameraWidth * this.cm.getVideoRecordScale(), this.videoRecordHeight = this.cameraHeight * this.cm.getVideoRecordScale(), this.recorder = y.generateInstance(this.cm.getVideoRecordType() === V.Selphi.RecorderType.Local ? "Local" : "Remote", this.videoRecordWidth, this.videoRecordHeight, this.cm.getVideoRecordRate(), this.cm.getVideoQuality(), this.cameraStream), this.recorderWorking = true, this.recorder.initializeEngine().then(() => {
    this.recorderWorking = false, d.printDebug("Video recording engine initialized...");
  }), this.privateRecordCanvas = document.createElement("canvas"), this.privateRecordCanvas.width = this.videoRecordWidth, this.privateRecordCanvas.height = this.videoRecordHeight, this.privateRecordCanvasContext = this.privateRecordCanvas.getContext("2d")), this.CheckDependencies(this);
}, videoFrame: function(e2) {
  this.canvasVideoPlayer.getContext("2d").drawImage(e2.target, 0, 0);
}, videoplayerEnded: function(e2) {
  "UCWizardCompleted" === this.state ? this.graph.sendMessage("VideoFinished") : e2.target.play();
} }, V.Selphi.CheckCapabilities = async function(e2 = { omit: [] }) {
  let t2 = {};
  if (e2.omit.indexOf("camera") < 0) try {
    t2.camera = (await navigator.mediaDevices.enumerateDevices()).filter((e3) => "videoinput" == e3.kind).length > 0;
  } catch (e3) {
    t2.camera = false;
  }
  else t2.camera = null;
  if (e2.omit.indexOf("wasm") < 0) try {
    if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
      const e3 = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
      t2.wasm = e3 instanceof WebAssembly.Module && new WebAssembly.Instance(e3) instanceof WebAssembly.Instance;
    } else t2.wasm = false;
  } catch (e3) {
    t2.wasm = false;
  }
  else t2.wasm = null;
  return e2.omit.indexOf("browser") < 0 ? t2.browser = "undefined" != typeof WebAssembly && void 0 !== WebAssembly.instantiate && "undefined" != typeof CanvasRenderingContext2D && "undefined" != typeof customElements && "undefined" != typeof HTMLElement && "undefined" != typeof Uint8ClampedArray : t2.browser = null, t2;
}, V.Selphi.Component = h, customElements.define("facephi-selphi", V.Selphi.Component);
var C = t.w;
export {
  C as FPhi
};
//# sourceMappingURL=@facephi_selphi-widget-web.js.map
