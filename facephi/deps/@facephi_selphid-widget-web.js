import {
  __publicField
} from "./chunk-PNDESK4O.js";

// node_modules/@facephi/selphid-widget-web/selphid-widget-web.min.js
var t = { d: (e2, i2) => {
  for (var a2 in i2) t.o(i2, a2) && !t.o(e2, a2) && Object.defineProperty(e2, a2, { enumerable: true, get: i2[a2] });
}, o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2) };
var i = {};
t.d(i, { w: () => Re });
var a = class {
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
        var a2 = i2.getAttribute("to");
        this.state = a2, this.graphNewStateEvent(this.state);
      }
    }
  }
};
var l = class {
  constructor(e2, t2, i2, a2, l2, d2, s2) {
    var n2 = "";
    this.status = 0, this.logDebug = false, this.eventStatus = a2, this.caller = i2, this.baseURL = e2, t2.length > 0 && (n2 = t2 + "."), this.widgetLoaded = 0, this.languageCustomLoaded = 0, this.languageDefaultLoaded = 0, this.urlWidget = e2 + "/widget.xml", this.urlLanguageCustom = e2 + "/strings/strings." + n2 + "xml", this.urlLanguageDefault = e2 + "/strings/strings.es.xml", this.resourceDict = {}, this.dpiList = l2, this.browserDpi = d2, this.scaleFactor = s2;
    for (var c2 = 163 * d2 * s2, r2 = this.dpiList.length - 1, o2 = 0; o2 < this.dpiList.length; o2++) if (this.dpiList[o2] > c2) {
      r2 = o2;
      break;
    }
    this.dpi = this.dpiList[r2], this.imageScale = 163 / this.dpi, this.xmlHttpWidget = new XMLHttpRequest(), this.xmlHttpWidget.rm = this, this.xmlHttpWidget.onreadystatechange = (e3) => {
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
        let t3, i3 = {}, a2 = e2.target.rm.xmlDoc.querySelectorAll("[font]");
        for (let e3 = 0; e3 < a2.length; e3++) t3 = a2[e3].getAttribute("font"), t3.length > 0 && (i3[t3] = t3);
        e2.target.rm.fontRequestVector = [];
        let l2, d2 = document.getElementById("FPhi_Widget_style");
        for (l2 in null != d2 && d2.remove(), d2 = document.createElement("style"), d2.id = "FPhi_Widget_style", i3) {
          let t4 = e2.target.rm.getResourceUrlBase(i3[l2]), a3 = i3[l2], s2 = new XMLHttpRequest();
          s2.open("GET", t4, false), s2.send(), 200 == s2.status && d2.appendChild(document.createTextNode("@font-face { font-family: '" + a3 + "'; src: url('" + t4 + "'); }"));
        }
        document.head.appendChild(d2), e2.target.rm.eventStatus(e2.target.rm.caller, true);
      } else e2.target.rm.eventStatus(e2.target.rm.caller, false);
    }
  }
  static httpGet(e2, t2) {
    var i2 = new XMLHttpRequest();
    return i2.onreadystatechange = t2, i2.open("GET", e2), i2.send(null), 200 != i2.status ? "" : i2.responseText;
  }
  getElement(e2, t2, i2) {
    if ("facephi-widget-conf" == e2) return this.xmlDoc.getElementsByTagName("facephi-widget-conf")[0];
    var a2 = "_portrait";
    i2 && (a2 = "_landscape");
    var l2 = this.xmlDoc.querySelector("[id=" + e2 + a2 + "]");
    if (null != l2 && null != l2 || (l2 = this.xmlDoc.querySelector("[id=" + e2 + "]")), this.logDebug && console.log(l2), null != l2) {
      var d2 = l2.querySelector("[id=" + t2 + "]");
      return this.logDebug && console.log(d2), null == d2 ? void console.log("ResourceManager::getElement Error. elementId=" + t2 + " undefined. Please verify resource's bundle.") : d2;
    }
    console.log("ResourceManager::getElement Error. viewId=" + e2 + " undefined. Please verify resource's bundle.");
  }
  getElements(e2, t2) {
    var i2 = "_portrait";
    t2 && (i2 = "_landscape");
    var a2 = this.xmlDoc.querySelector("[id=" + e2 + i2 + "]");
    null != a2 && null != a2 || (a2 = this.xmlDoc.querySelector("[id=" + e2 + "]"));
    var l2 = [];
    if (a2) {
      for (var d2 = 0; d2 < a2.childNodes.length; d2++) if (a2.childNodes[d2].nodeType == Node.ELEMENT_NODE) {
        var s2 = null;
        void 0 !== a2.childNodes[d2].attributes.mode && (s2 = a2.childNodes[d2].attributes.mode.value), l2.push({ type: a2.childNodes[d2].nodeName, id: a2.childNodes[d2].attributes.id.value, mode: s2 });
      }
    }
    return 0 == l2.length && console.log("FPhi.ResourceManager: No elements for view=" + e2), l2;
  }
  isAttributeAvailable(e2, t2, i2, a2) {
    var l2 = null;
    if ("facephi-widget-conf" == e2) l2 = this.xmlDoc.getElementsByTagName("facephi-widget-conf")[0];
    else {
      var d2 = "_portrait";
      i2 && (d2 = "_landscape");
      var s2 = this.xmlDoc.querySelector("[id=" + e2 + d2 + "]");
      if (null != s2 && null != s2 || (s2 = this.xmlDoc.querySelector("[id=" + e2 + "]")), null != s2) {
        var n2 = s2.querySelector("[id=" + t2 + "]");
        null != n2 && (l2 = n2);
      }
    }
    if (null == l2 || null == l2) return false;
    var c2 = l2.getAttribute(a2);
    return null != c2 && null != c2;
  }
  getSetupColor(e2, t2, i2, a2) {
    var l2 = this.getElement(e2, t2, i2);
    if (null == l2 || null == l2) return null;
    var d2, s2, n2, c2, r2 = l2.getAttribute(a2);
    return null == r2 || null == r2 ? null : (9 == r2.length && (d2 = parseInt(r2.substring(1, 3), 16), s2 = parseInt(r2.substring(3, 5), 16), n2 = parseInt(r2.substring(5, 7), 16), c2 = parseInt(r2.substring(7, 9), 16), r2 = "rgba(" + d2 + ", " + s2 + ", " + n2 + ", " + (c2 /= 255).toFixed(3) + ")"), r2);
  }
  getSetupColorWithAlpha(e2, t2, i2, a2, l2) {
    var d2 = this.getElement(e2, t2, i2).getAttribute(a2);
    return "rgba(" + parseInt(d2.substring(1, 3), 16) + ", " + parseInt(d2.substring(3, 5), 16) + ", " + parseInt(d2.substring(5, 7), 16) + ", " + l2.toFixed(3) + ")";
  }
  getSetupFloat(e2, t2, i2, a2) {
    var l2 = this.getElement(e2, t2, i2).getAttribute(a2);
    return parseFloat(l2);
  }
  getSetupAlign(e2, t2, i2, a2) {
    return this.getElement(e2, t2, i2).getAttribute(a2);
  }
  getSetupResourceId(e2, t2, i2, a2) {
    var l2 = this.getElement(e2, t2, i2).getAttribute(a2), d2 = l2.split(",");
    return d2 && d2.length > 1 ? d2[Math.floor(Math.random() * d2.length)].trim() : l2;
  }
  getSetupTextId(e2, t2, i2, a2) {
    return this.getElement(e2, t2, i2).getAttribute(a2);
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
var d = "required";
var s = "minLength";
var n = { AR: { allowUncertain: true, barcodeSide: { id: 2, driving_license: 1, resident_id: null, passport: null } }, BE: { allowUncertain: true, barcodeSide: { id: null, driving_license: null, resident_id: null, passport: null } }, BO: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: 1, passport: 0 } }, BR: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, CL: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, CO: { allowUncertain: true, barcodeSide: { id: 1, driving_license: 1, resident_id: 1, passport: null } }, CU: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, CR: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, DO: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, EC: { allowUncertain: false, barcodeSide: { id: 2, driving_license: null, resident_id: null, passport: 0 } }, EG: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, GT: { allowUncertain: false, barcodeSide: { id: null, driving_license: 1, resident_id: null, passport: 0 }, fieldChecks: [{ key: "firstName", rule: d, value: true }, { key: "lastName", rule: d, value: true }, { key: "gender", rule: d, value: true, documentTypes: ["ID", "PASSPORT"] }, { key: "nationality", rule: d, value: true, documentTypes: ["ID", "PASSPORT"] }, { key: "placeOfBirth", rule: d, value: true, documentTypes: ["ID"], documentSide: 1 }, { key: "placeOfBirth", rule: d, value: true, documentTypes: ["PASSPORT"] }, { key: "dateOfBirth", rule: s, value: 9, documentTypes: ["ID"], documentSide: 0 }, { key: "dateOfBirth", rule: s, value: 6, documentTypes: ["ID"], documentSide: 1 }, { key: "dateOfBirth", rule: s, value: 10, documentTypes: ["DL"], documentSide: 1 }, { key: "dateOfBirth", rule: s, value: 6, documentTypes: ["PASSPORT"] }, { key: "dateOfIssue", rule: s, value: 9, documentTypes: ["ID"] }, { key: "dateOfIssue", rule: s, value: 14, documentTypes: ["PASSPORT"] }, { key: "dateOfExpiry", rule: s, value: 6, documentTypes: ["ID"], documentSide: 1 }, { key: "dateOfExpiry", rule: s, value: 10, documentTypes: ["DL"] }, { key: "dateOfExpiry", rule: s, value: 6, documentTypes: ["PASSPORT"] }, { key: "documentNumber", rule: s, value: 13, documentTypes: ["ID", "DL"] }, { key: "documentNumber", rule: s, value: 9, documentTypes: ["PASSPORT"] }] }, SV: { allowUncertain: true, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, HN: { allowUncertain: false, barcodeSide: { id: 2, driving_license: null, resident_id: null, passport: null } }, NG: { allowUncertain: false, barcodeSide: { id: null, driving_license: 1, resident_id: null, passport: null } }, LT: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, MX: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, NI: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: 0 } }, PA: { allowUncertain: true, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, PY: { allowUncertain: true, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, PE: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, SG: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, SA: { allowUncertain: true, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, UY: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, US: { allowUncertain: true, barcodeSide: { id: 1, driving_license: 1, resident_id: null, passport: null } }, VN: { allowUncertain: false, barcodeSide: { id: 1, driving_license: null, resident_id: null, passport: null } }, ZA: { allowUncertain: true, barcodeSide: { id: null, driving_license: null, resident_id: null, passport: null } } };
var c = 0;
var r = 1;
var o = 2;
var h = 3;
var m = 4;
var R = 5;
var I = 6;
var g = 7;
var F = 8;
var Z = 9;
var U = 10;
var u = 11;
var b = 12;
var V = 13;
var W = 14;
var C = 15;
var p = 16;
var B = 17;
var Q = 18;
var G = 19;
var S = 20;
var y = null;
var N = { AFG: "AF", ALB: "AL", DZA: "DZ", ASM: "AS", AND: "AD", AGO: "AO", AIA: "AI", ATA: "AQ", ATG: "AG", ARG: "AR", ARM: "AM", ABW: "AW", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD", BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BMU: "BM", BTN: "BT", BOL: "BO", BIH: "BA", BWA: "BW", BVT: "BV", BRA: "BR", IOT: "IO", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI", KHM: "KH", CMR: "CM", CAN: "CA", CPV: "CV", CYM: "KY", CAF: "CF", TCD: "TD", CHL: "CL", CHN: "CN", CXR: "CX", CCK: "CC", COL: "CO", COM: "KM", COG: "CG", COD: "CD", COK: "CK", CRI: "CR", CIV: "CI", HRV: "HR", CUB: "CU", CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM", DOM: "DO", ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE", ETH: "ET", FLK: "FK", FRO: "FO", FJI: "FJ", FIN: "FI", FRA: "FR", GUF: "GF", PYF: "PF", ATF: "TF", GAB: "GA", GMB: "GM", GEO: "GE", DEU: "DE", GHA: "GH", GIB: "GI", GRC: "GR", GRL: "GL", GRD: "GD", GLP: "GP", GUM: "GU", GTM: "GT", GGY: "GG", GIN: "GN", GNB: "GW", GUY: "GY", HTI: "HT", HMD: "HM", VAT: "VA", HND: "HN", HKG: "HK", HUN: "HU", ISL: "IS", IND: "IN", IDN: "ID", IRN: "IR", IRQ: "IQ", IRL: "IE", IMN: "IM", ISR: "IL", ITA: "IT", JAM: "JM", JPN: "JP", JEY: "JE", JOR: "JO", KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR", KWT: "KW", KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY", LIE: "LI", LTU: "LT", LUX: "LU", MAC: "MO", MKD: "MK", MDG: "MG", MWI: "MW", MYS: "MY", MDV: "MV", MLI: "ML", MLT: "MT", MHL: "MH", MTQ: "MQ", MRT: "MR", MUS: "MU", MYT: "YT", MEX: "MX", FSM: "FM", MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MSR: "MS", MAR: "MA", MOZ: "MZ", MMR: "MM", NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", ANT: "AN", NCL: "NC", NZL: "NZ", NIC: "NI", NER: "NE", NGA: "NG", NIU: "NU", NFK: "NF", MNP: "MP", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PSE: "PS", PAN: "PA", PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", PCN: "PN", POL: "PL", PRT: "PT", PRI: "PR", QAT: "QA", REU: "RE", ROU: "RO", RUS: "RU", RWA: "RW", SHN: "SH", KNA: "KN", LCA: "LC", SPM: "PM", VCT: "VC", WSM: "WS", SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC", SLE: "SL", SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA", SGS: "GS", SSD: "SS", ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SJM: "SJ", SWZ: "SZ", SWE: "SE", CHE: "CH", SYR: "SY", TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TLS: "TL", TGO: "TG", TKL: "TK", TON: "TO", TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TCA: "TC", TUV: "TV", UGA: "UG", UKR: "UA", ARE: "AE", GBR: "GB", USA: "US", UMI: "UM", URY: "UY", UZB: "UZ", VUT: "VU", VEN: "VE", VNM: "VN", VGB: "VG", VIR: "VI", WLF: "WF", ESH: "EH", YEM: "YE", ZMB: "ZM", ZWE: "ZW" };
var X = (e2) => {
  try {
    return e2();
  } catch (e3) {
    return null;
  }
};
var A = class {
  constructor(e2) {
    this.__licenseKey = "", this.__engineLocation = "", this.__imageFormat = "", this.__imageQuality = "", this.__specificData = "", this.__scanMode = null, this.__documentType = null, this.__detectsCount = 0, this.__detectsNeeded = 10, this.__blurredThreshold = 0, this.__mapperToRealConfig(e2), this.__frontDocument = null, this.__backDocument = null, this.__fullsizeBack = null, this.__fullsizeFront = null, this.__faceImage = null, this.__mrzRawString = "", this.__worker = new Worker((null === y && (y = URL.createObjectURL(new Blob([window.atob("dmFyIGU9e2Q6KHQscik9Pntmb3IodmFyIG4gaW4gcillLm8ocixuKSYmIWUubyh0LG4pJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtlbnVtZXJhYmxlOiEwLGdldDpyW25dfSl9LG86KGUsdCk9Pk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpLHI6ZT0+eyJ1bmRlZmluZWQiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wudG9TdHJpbmdUYWcmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6Ik1vZHVsZSJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwiX19lc01vZHVsZSIse3ZhbHVlOiEwfSl9fSx0PXt9O2Uucih0KSxlLmQodCx7Tno6KCk9Pm4sZ0o6KCk9Pm99KTtjb25zdCByPSguLi5lKT0+e2UuZm9yRWFjaCgoZT0+e3RyeXtudWxsIT09ZSYmdm9pZCAwIT09ZS5kZWxldGUmJmUuZGVsZXRlKCl9Y2F0Y2goZSl7fX0pKX0sbj1hc3luYyBlPT5jb25zb2xlLmRlYnVnKGUpLG89YXN5bmMgZT0+Y29uc29sZS5lcnJvcihlKTt2YXIgYSxpPShhPSJ1bmRlZmluZWQiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQ/ZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM6dm9pZCAwLGZ1bmN0aW9uKGUpe3ZhciB0LHI7KGU9dm9pZCAwIT09KGU9ZXx8e30pP2U6e30pLnJlYWR5PW5ldyBQcm9taXNlKChmdW5jdGlvbihlLG4pe3Q9ZSxyPW59KSk7dmFyIG49T2JqZWN0LmFzc2lnbih7fSxlKSxvPVtdLGk9Ii4vdGhpcy5wcm9ncmFtIixzPSIiOyJ1bmRlZmluZWQiIT10eXBlb2YgZG9jdW1lbnQmJmRvY3VtZW50LmN1cnJlbnRTY3JpcHQmJihzPWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjKSxhJiYocz1hKSxzPTAhPT1zLmluZGV4T2YoImJsb2I6Iik/cy5zdWJzdHIoMCxzLnJlcGxhY2UoL1s/I10uKi8sIiIpLmxhc3RJbmRleE9mKCIvIikrMSk6IiI7dmFyIHU9ZS5wcmludHx8Y29uc29sZS5sb2cuYmluZChjb25zb2xlKSxjPWUucHJpbnRFcnJ8fGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO09iamVjdC5hc3NpZ24oZSxuKSxuPW51bGwsZS5hcmd1bWVudHMmJihvPWUuYXJndW1lbnRzKSxlLnRoaXNQcm9ncmFtJiYoaT1lLnRoaXNQcm9ncmFtKSxlLnF1aXQmJmUucXVpdDt2YXIgbCxmO2Uud2FzbUJpbmFyeSYmKGw9ZS53YXNtQmluYXJ5KSxlLm5vRXhpdFJ1bnRpbWUsIm9iamVjdCIhPXR5cGVvZiBXZWJBc3NlbWJseSYmUigibm8gbmF0aXZlIHdhc20gc3VwcG9ydCBkZXRlY3RlZCIpO3ZhciBkLHAsaCxtLGcseSx2LHcsXyxiPSExLFQ9InVuZGVmaW5lZCIhPXR5cGVvZiBUZXh0RGVjb2Rlcj9uZXcgVGV4dERlY29kZXIoInV0ZjgiKTp2b2lkIDA7ZnVuY3Rpb24gQyhlLHQscil7Zm9yKHZhciBuPXQrcixvPXQ7ZVtvXSYmIShvPj1uKTspKytvO2lmKG8tdD4xNiYmZS5idWZmZXImJlQpcmV0dXJuIFQuZGVjb2RlKGUuc3ViYXJyYXkodCxvKSk7Zm9yKHZhciBhPSIiO3Q8bzspe3ZhciBpPWVbdCsrXTtpZigxMjgmaSl7dmFyIHM9NjMmZVt0KytdO2lmKDE5MiE9KDIyNCZpKSl7dmFyIHU9NjMmZVt0KytdO2lmKChpPTIyND09KDI0MCZpKT8oMTUmaSk8PDEyfHM8PDZ8dTooNyZpKTw8MTh8czw8MTJ8dTw8Nnw2MyZlW3QrK10pPDY1NTM2KWErPVN0cmluZy5mcm9tQ2hhckNvZGUoaSk7ZWxzZXt2YXIgYz1pLTY1NTM2O2ErPVN0cmluZy5mcm9tQ2hhckNvZGUoNTUyOTZ8Yz4+MTAsNTYzMjB8MTAyMyZjKX19ZWxzZSBhKz1TdHJpbmcuZnJvbUNoYXJDb2RlKCgzMSZpKTw8NnxzKX1lbHNlIGErPVN0cmluZy5mcm9tQ2hhckNvZGUoaSl9cmV0dXJuIGF9ZnVuY3Rpb24gJChlLHQpe3JldHVybiBlP0MoaCxlLHQpOiIifWZ1bmN0aW9uIFAoZSx0LHIsbil7aWYoIShuPjApKXJldHVybiAwO2Zvcih2YXIgbz1yLGE9cituLTEsaT0wO2k8ZS5sZW5ndGg7KytpKXt2YXIgcz1lLmNoYXJDb2RlQXQoaSk7aWYocz49NTUyOTYmJnM8PTU3MzQzJiYocz02NTUzNisoKDEwMjMmcyk8PDEwKXwxMDIzJmUuY2hhckNvZGVBdCgrK2kpKSxzPD0xMjcpe2lmKHI+PWEpYnJlYWs7dFtyKytdPXN9ZWxzZSBpZihzPD0yMDQ3KXtpZihyKzE+PWEpYnJlYWs7dFtyKytdPTE5MnxzPj42LHRbcisrXT0xMjh8NjMmc31lbHNlIGlmKHM8PTY1NTM1KXtpZihyKzI+PWEpYnJlYWs7dFtyKytdPTIyNHxzPj4xMix0W3IrK109MTI4fHM+PjYmNjMsdFtyKytdPTEyOHw2MyZzfWVsc2V7aWYociszPj1hKWJyZWFrO3RbcisrXT0yNDB8cz4+MTgsdFtyKytdPTEyOHxzPj4xMiY2Myx0W3IrK109MTI4fHM+PjYmNjMsdFtyKytdPTEyOHw2MyZzfX1yZXR1cm4gdFtyXT0wLHItb31mdW5jdGlvbiBBKGUpe2Zvcih2YXIgdD0wLHI9MDtyPGUubGVuZ3RoOysrcil7dmFyIG49ZS5jaGFyQ29kZUF0KHIpO248PTEyNz90Kys6bjw9MjA0Nz90Kz0yOm4+PTU1Mjk2JiZuPD01NzM0Mz8odCs9NCwrK3IpOnQrPTN9cmV0dXJuIHR9ZnVuY3Rpb24gTyh0KXtkPXQsZS5IRUFQOD1wPW5ldyBJbnQ4QXJyYXkodCksZS5IRUFQMTY9bT1uZXcgSW50MTZBcnJheSh0KSxlLkhFQVAzMj15PW5ldyBJbnQzMkFycmF5KHQpLGUuSEVBUFU4PWg9bmV3IFVpbnQ4QXJyYXkodCksZS5IRUFQVTE2PWc9bmV3IFVpbnQxNkFycmF5KHQpLGUuSEVBUFUzMj12PW5ldyBVaW50MzJBcnJheSh0KSxlLkhFQVBGMzI9dz1uZXcgRmxvYXQzMkFycmF5KHQpLGUuSEVBUEY2ND1fPW5ldyBGbG9hdDY0QXJyYXkodCl9ZS5JTklUSUFMX01FTU9SWTt2YXIgRCxGLFMsaz1bXSxXPVtdLE09W10saj0wLHg9bnVsbCxFPW51bGw7ZnVuY3Rpb24gUih0KXtlLm9uQWJvcnQmJmUub25BYm9ydCh0KSxjKHQ9IkFib3J0ZWQoIit0KyIpIiksYj0hMCx0Kz0iLiBCdWlsZCB3aXRoIC1zQVNTRVJUSU9OUyBmb3IgbW9yZSBpbmZvLiI7dmFyIG49bmV3IFdlYkFzc2VtYmx5LlJ1bnRpbWVFcnJvcih0KTt0aHJvdyByKG4pLG59ZnVuY3Rpb24gSSh0KXtmb3IoO3QubGVuZ3RoPjA7KXQuc2hpZnQoKShlKX1mdW5jdGlvbiBVKGUpe3RoaXMuZXhjUHRyPWUsdGhpcy5wdHI9ZS0yNCx0aGlzLnNldF90eXBlPWZ1bmN0aW9uKGUpe3ZbdGhpcy5wdHIrND4+Ml09ZX0sdGhpcy5nZXRfdHlwZT1mdW5jdGlvbigpe3JldHVybiB2W3RoaXMucHRyKzQ+PjJdfSx0aGlzLnNldF9kZXN0cnVjdG9yPWZ1bmN0aW9uKGUpe3ZbdGhpcy5wdHIrOD4+Ml09ZX0sdGhpcy5nZXRfZGVzdHJ1Y3Rvcj1mdW5jdGlvbigpe3JldHVybiB2W3RoaXMucHRyKzg+PjJdfSx0aGlzLnNldF9yZWZjb3VudD1mdW5jdGlvbihlKXt5W3RoaXMucHRyPj4yXT1lfSx0aGlzLnNldF9jYXVnaHQ9ZnVuY3Rpb24oZSl7ZT1lPzE6MCxwW3RoaXMucHRyKzEyfDBdPWV9LHRoaXMuZ2V0X2NhdWdodD1mdW5jdGlvbigpe3JldHVybiAwIT1wW3RoaXMucHRyKzEyfDBdfSx0aGlzLnNldF9yZXRocm93bj1mdW5jdGlvbihlKXtlPWU/MTowLHBbdGhpcy5wdHIrMTN8MF09ZX0sdGhpcy5nZXRfcmV0aHJvd249ZnVuY3Rpb24oKXtyZXR1cm4gMCE9cFt0aGlzLnB0cisxM3wwXX0sdGhpcy5pbml0PWZ1bmN0aW9uKGUsdCl7dGhpcy5zZXRfYWRqdXN0ZWRfcHRyKDApLHRoaXMuc2V0X3R5cGUoZSksdGhpcy5zZXRfZGVzdHJ1Y3Rvcih0KSx0aGlzLnNldF9yZWZjb3VudCgwKSx0aGlzLnNldF9jYXVnaHQoITEpLHRoaXMuc2V0X3JldGhyb3duKCExKX0sdGhpcy5hZGRfcmVmPWZ1bmN0aW9uKCl7dmFyIGU9eVt0aGlzLnB0cj4+Ml07eVt0aGlzLnB0cj4+Ml09ZSsxfSx0aGlzLnJlbGVhc2VfcmVmPWZ1bmN0aW9uKCl7dmFyIGU9eVt0aGlzLnB0cj4+Ml07cmV0dXJuIHlbdGhpcy5wdHI+PjJdPWUtMSwxPT09ZX0sdGhpcy5zZXRfYWRqdXN0ZWRfcHRyPWZ1bmN0aW9uKGUpe3ZbdGhpcy5wdHIrMTY+PjJdPWV9LHRoaXMuZ2V0X2FkanVzdGVkX3B0cj1mdW5jdGlvbigpe3JldHVybiB2W3RoaXMucHRyKzE2Pj4yXX0sdGhpcy5nZXRfZXhjZXB0aW9uX3B0cj1mdW5jdGlvbigpe2lmKFR0KHRoaXMuZ2V0X3R5cGUoKSkpcmV0dXJuIHZbdGhpcy5leGNQdHI+PjJdO3ZhciBlPXRoaXMuZ2V0X2FkanVzdGVkX3B0cigpO3JldHVybiAwIT09ZT9lOnRoaXMuZXhjUHRyfX0oRj0iRlBCUmVjb2duaXRpb24ud2FzbSIpLnN0YXJ0c1dpdGgoImRhdGE6YXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtO2Jhc2U2NCwiKXx8KFM9RixGPWUubG9jYXRlRmlsZT9lLmxvY2F0ZUZpbGUoUyxzKTpzK1MpO3ZhciB6PXt2YXJhcmdzOnZvaWQgMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gei52YXJhcmdzKz00LHlbei52YXJhcmdzLTQ+PjJdfSxnZXRTdHI6ZnVuY3Rpb24oZSl7cmV0dXJuICQoZSl9fSxIPSJUbyB1c2UgZGxvcGVuLCB5b3UgbmVlZCBlbmFibGUgZHluYW1pYyBsaW5raW5nLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2Vtc2NyaXB0ZW4tY29yZS9lbXNjcmlwdGVuL3dpa2kvTGlua2luZyIsWT17fTtmdW5jdGlvbiBMKGUpe2Zvcig7ZS5sZW5ndGg7KXt2YXIgdD1lLnBvcCgpO2UucG9wKCkodCl9fWZ1bmN0aW9uIFYoZSl7cmV0dXJuIHRoaXMuZnJvbVdpcmVUeXBlKHlbZT4+Ml0pfXZhciBCPXt9LE49e30scT17fSxHPTQ4LEo9NTc7ZnVuY3Rpb24gWihlKXtpZih2b2lkIDA9PT1lKXJldHVybiJfdW5rbm93biI7dmFyIHQ9KGU9ZS5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csIiQiKSkuY2hhckNvZGVBdCgwKTtyZXR1cm4gdD49RyYmdDw9Sj8iXyIrZTplfWZ1bmN0aW9uIFgoZSx0KXtyZXR1cm4gZT1aKGUpLG5ldyBGdW5jdGlvbigiYm9keSIsInJldHVybiBmdW5jdGlvbiAiK2UrJygpIHtcbiAgICAidXNlIHN0cmljdCI7ICAgIHJldHVybiBib2R5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuJykodCl9ZnVuY3Rpb24gSyhlLHQpe3ZhciByPVgodCwoZnVuY3Rpb24oZSl7dGhpcy5uYW1lPXQsdGhpcy5tZXNzYWdlPWU7dmFyIHI9bmV3IEVycm9yKGUpLnN0YWNrO3ZvaWQgMCE9PXImJih0aGlzLnN0YWNrPXRoaXMudG9TdHJpbmcoKSsiXG4iK3IucmVwbGFjZSgvXkVycm9yKDpbXlxuXSopP1xuLywiIikpfSkpO3JldHVybiByLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUucHJvdG90eXBlKSxyLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj1yLHIucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PXRoaXMubWVzc2FnZT90aGlzLm5hbWU6dGhpcy5uYW1lKyI6ICIrdGhpcy5tZXNzYWdlfSxyfXZhciBRPXZvaWQgMDtmdW5jdGlvbiBlZShlKXt0aHJvdyBuZXcgUShlKX1mdW5jdGlvbiB0ZShlLHQscil7ZnVuY3Rpb24gbih0KXt2YXIgbj1yKHQpO24ubGVuZ3RoIT09ZS5sZW5ndGgmJmVlKCJNaXNtYXRjaGVkIHR5cGUgY29udmVydGVyIGNvdW50Iik7Zm9yKHZhciBvPTA7bzxlLmxlbmd0aDsrK28pc2UoZVtvXSxuW29dKX1lLmZvckVhY2goKGZ1bmN0aW9uKGUpe3FbZV09dH0pKTt2YXIgbz1uZXcgQXJyYXkodC5sZW5ndGgpLGE9W10saT0wO3QuZm9yRWFjaCgoKGUsdCk9PntOLmhhc093blByb3BlcnR5KGUpP29bdF09TltlXTooYS5wdXNoKGUpLEIuaGFzT3duUHJvcGVydHkoZSl8fChCW2VdPVtdKSxCW2VdLnB1c2goKCgpPT57b1t0XT1OW2VdLCsraT09PWEubGVuZ3RoJiZuKG8pfSkpKX0pKSwwPT09YS5sZW5ndGgmJm4obyl9ZnVuY3Rpb24gcmUoZSl7c3dpdGNoKGUpe2Nhc2UgMTpyZXR1cm4gMDtjYXNlIDI6cmV0dXJuIDE7Y2FzZSA0OnJldHVybiAyO2Nhc2UgODpyZXR1cm4gMztkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gdHlwZSBzaXplOiAiK2UpfX12YXIgbmU9dm9pZCAwO2Z1bmN0aW9uIG9lKGUpe2Zvcih2YXIgdD0iIixyPWU7aFtyXTspdCs9bmVbaFtyKytdXTtyZXR1cm4gdH12YXIgYWU9dm9pZCAwO2Z1bmN0aW9uIGllKGUpe3Rocm93IG5ldyBhZShlKX1mdW5jdGlvbiBzZShlLHQscj17fSl7aWYoISgiYXJnUGFja0FkdmFuY2UiaW4gdCkpdGhyb3cgbmV3IFR5cGVFcnJvcigicmVnaXN0ZXJUeXBlIHJlZ2lzdGVyZWRJbnN0YW5jZSByZXF1aXJlcyBhcmdQYWNrQWR2YW5jZSIpO3ZhciBuPXQubmFtZTtpZihlfHxpZSgndHlwZSAiJytuKyciIG11c3QgaGF2ZSBhIHBvc2l0aXZlIGludGVnZXIgdHlwZWlkIHBvaW50ZXInKSxOLmhhc093blByb3BlcnR5KGUpKXtpZihyLmlnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnMpcmV0dXJuO2llKCJDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnIituKyInIHR3aWNlIil9aWYoTltlXT10LGRlbGV0ZSBxW2VdLEIuaGFzT3duUHJvcGVydHkoZSkpe3ZhciBvPUJbZV07ZGVsZXRlIEJbZV0sby5mb3JFYWNoKChlPT5lKCkpKX19ZnVuY3Rpb24gdWUoZSl7aWUoZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcy5uYW1lKyIgaW5zdGFuY2UgYWxyZWFkeSBkZWxldGVkIil9dmFyIGNlPSExO2Z1bmN0aW9uIGxlKGUpe31mdW5jdGlvbiBmZShlKXtlLmNvdW50LnZhbHVlLT0xLDA9PT1lLmNvdW50LnZhbHVlJiZmdW5jdGlvbihlKXtlLnNtYXJ0UHRyP2Uuc21hcnRQdHJUeXBlLnJhd0Rlc3RydWN0b3IoZS5zbWFydFB0cik6ZS5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzcy5yYXdEZXN0cnVjdG9yKGUucHRyKX0oZSl9ZnVuY3Rpb24gZGUoZSx0LHIpe2lmKHQ9PT1yKXJldHVybiBlO2lmKHZvaWQgMD09PXIuYmFzZUNsYXNzKXJldHVybiBudWxsO3ZhciBuPWRlKGUsdCxyLmJhc2VDbGFzcyk7cmV0dXJuIG51bGw9PT1uP251bGw6ci5kb3duY2FzdChuKX12YXIgcGU9e307dmFyIGhlPVtdO2Z1bmN0aW9uIG1lKCl7Zm9yKDtoZS5sZW5ndGg7KXt2YXIgZT1oZS5wb3AoKTtlLiQkLmRlbGV0ZVNjaGVkdWxlZD0hMSxlLmRlbGV0ZSgpfX12YXIgZ2U9dm9pZCAwO3ZhciB5ZT17fTtmdW5jdGlvbiB2ZShlLHQpe3JldHVybiB0LnB0clR5cGUmJnQucHRyfHxlZSgibWFrZUNsYXNzSGFuZGxlIHJlcXVpcmVzIHB0ciBhbmQgcHRyVHlwZSIpLCEhdC5zbWFydFB0clR5cGUhPSEhdC5zbWFydFB0ciYmZWUoIkJvdGggc21hcnRQdHJUeXBlIGFuZCBzbWFydFB0ciBtdXN0IGJlIHNwZWNpZmllZCIpLHQuY291bnQ9e3ZhbHVlOjF9LHdlKE9iamVjdC5jcmVhdGUoZSx7JCQ6e3ZhbHVlOnR9fSkpfWZ1bmN0aW9uIHdlKGUpe3JldHVybiJ1bmRlZmluZWQiPT10eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnk/KHdlPWU9PmUsZSk6KGNlPW5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeSgoZT0+e2ZlKGUuJCQpfSkpLHdlPWU9Pnt2YXIgdD1lLiQkO2lmKHQuc21hcnRQdHIpe3ZhciByPXskJDp0fTtjZS5yZWdpc3RlcihlLHIsZSl9cmV0dXJuIGV9LGxlPWU9PmNlLnVucmVnaXN0ZXIoZSksd2UoZSkpfWZ1bmN0aW9uIF9lKCl7fWZ1bmN0aW9uIGJlKGUsdCxyKXtpZih2b2lkIDA9PT1lW3RdLm92ZXJsb2FkVGFibGUpe3ZhciBuPWVbdF07ZVt0XT1mdW5jdGlvbigpe3JldHVybiBlW3RdLm92ZXJsb2FkVGFibGUuaGFzT3duUHJvcGVydHkoYXJndW1lbnRzLmxlbmd0aCl8fGllKCJGdW5jdGlvbiAnIityKyInIGNhbGxlZCB3aXRoIGFuIGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIithcmd1bWVudHMubGVuZ3RoKyIpIC0gZXhwZWN0cyBvbmUgb2YgKCIrZVt0XS5vdmVybG9hZFRhYmxlKyIpISIpLGVbdF0ub3ZlcmxvYWRUYWJsZVthcmd1bWVudHMubGVuZ3RoXS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9LGVbdF0ub3ZlcmxvYWRUYWJsZT1bXSxlW3RdLm92ZXJsb2FkVGFibGVbbi5hcmdDb3VudF09bn19ZnVuY3Rpb24gVGUodCxyLG4pe2UuaGFzT3duUHJvcGVydHkodCk/KCh2b2lkIDA9PT1ufHx2b2lkIDAhPT1lW3RdLm92ZXJsb2FkVGFibGUmJnZvaWQgMCE9PWVbdF0ub3ZlcmxvYWRUYWJsZVtuXSkmJmllKCJDYW5ub3QgcmVnaXN0ZXIgcHVibGljIG5hbWUgJyIrdCsiJyB0d2ljZSIpLGJlKGUsdCx0KSxlLmhhc093blByb3BlcnR5KG4pJiZpZSgiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIG92ZXJsb2FkcyBvZiBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIituKyIpISIpLGVbdF0ub3ZlcmxvYWRUYWJsZVtuXT1yKTooZVt0XT1yLHZvaWQgMCE9PW4mJihlW3RdLm51bUFyZ3VtZW50cz1uKSl9ZnVuY3Rpb24gQ2UoZSx0LHIsbixvLGEsaSxzKXt0aGlzLm5hbWU9ZSx0aGlzLmNvbnN0cnVjdG9yPXQsdGhpcy5pbnN0YW5jZVByb3RvdHlwZT1yLHRoaXMucmF3RGVzdHJ1Y3Rvcj1uLHRoaXMuYmFzZUNsYXNzPW8sdGhpcy5nZXRBY3R1YWxUeXBlPWEsdGhpcy51cGNhc3Q9aSx0aGlzLmRvd25jYXN0PXMsdGhpcy5wdXJlVmlydHVhbEZ1bmN0aW9ucz1bXX1mdW5jdGlvbiAkZShlLHQscil7Zm9yKDt0IT09cjspdC51cGNhc3R8fGllKCJFeHBlY3RlZCBudWxsIG9yIGluc3RhbmNlIG9mICIrci5uYW1lKyIsIGdvdCBhbiBpbnN0YW5jZSBvZiAiK3QubmFtZSksZT10LnVwY2FzdChlKSx0PXQuYmFzZUNsYXNzO3JldHVybiBlfWZ1bmN0aW9uIFBlKGUsdCl7aWYobnVsbD09PXQpcmV0dXJuIHRoaXMuaXNSZWZlcmVuY2UmJmllKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKSwwO3QuJCR8fGllKCdDYW5ub3QgcGFzcyAiJytWZSh0KSsnIiBhcyBhICcrdGhpcy5uYW1lKSx0LiQkLnB0cnx8aWUoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKTt2YXIgcj10LiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3JldHVybiAkZSh0LiQkLnB0cixyLHRoaXMucmVnaXN0ZXJlZENsYXNzKX1mdW5jdGlvbiBBZShlLHQpe3ZhciByO2lmKG51bGw9PT10KXJldHVybiB0aGlzLmlzUmVmZXJlbmNlJiZpZSgibnVsbCBpcyBub3QgYSB2YWxpZCAiK3RoaXMubmFtZSksdGhpcy5pc1NtYXJ0UG9pbnRlcj8ocj10aGlzLnJhd0NvbnN0cnVjdG9yKCksbnVsbCE9PWUmJmUucHVzaCh0aGlzLnJhd0Rlc3RydWN0b3Iscikscik6MDt0LiQkfHxpZSgnQ2Fubm90IHBhc3MgIicrVmUodCkrJyIgYXMgYSAnK3RoaXMubmFtZSksdC4kJC5wdHJ8fGllKCJDYW5ub3QgcGFzcyBkZWxldGVkIG9iamVjdCBhcyBhIHBvaW50ZXIgb2YgdHlwZSAiK3RoaXMubmFtZSksIXRoaXMuaXNDb25zdCYmdC4kJC5wdHJUeXBlLmlzQ29uc3QmJmllKCJDYW5ub3QgY29udmVydCBhcmd1bWVudCBvZiB0eXBlICIrKHQuJCQuc21hcnRQdHJUeXBlP3QuJCQuc21hcnRQdHJUeXBlLm5hbWU6dC4kJC5wdHJUeXBlLm5hbWUpKyIgdG8gcGFyYW1ldGVyIHR5cGUgIit0aGlzLm5hbWUpO3ZhciBuPXQuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3M7aWYocj0kZSh0LiQkLnB0cixuLHRoaXMucmVnaXN0ZXJlZENsYXNzKSx0aGlzLmlzU21hcnRQb2ludGVyKXN3aXRjaCh2b2lkIDA9PT10LiQkLnNtYXJ0UHRyJiZpZSgiUGFzc2luZyByYXcgcG9pbnRlciB0byBzbWFydCBwb2ludGVyIGlzIGlsbGVnYWwiKSx0aGlzLnNoYXJpbmdQb2xpY3kpe2Nhc2UgMDp0LiQkLnNtYXJ0UHRyVHlwZT09PXRoaXM/cj10LiQkLnNtYXJ0UHRyOmllKCJDYW5ub3QgY29udmVydCBhcmd1bWVudCBvZiB0eXBlICIrKHQuJCQuc21hcnRQdHJUeXBlP3QuJCQuc21hcnRQdHJUeXBlLm5hbWU6dC4kJC5wdHJUeXBlLm5hbWUpKyIgdG8gcGFyYW1ldGVyIHR5cGUgIit0aGlzLm5hbWUpO2JyZWFrO2Nhc2UgMTpyPXQuJCQuc21hcnRQdHI7YnJlYWs7Y2FzZSAyOmlmKHQuJCQuc21hcnRQdHJUeXBlPT09dGhpcylyPXQuJCQuc21hcnRQdHI7ZWxzZXt2YXIgbz10LmNsb25lKCk7cj10aGlzLnJhd1NoYXJlKHIsTGUudG9IYW5kbGUoKGZ1bmN0aW9uKCl7by5kZWxldGUoKX0pKSksbnVsbCE9PWUmJmUucHVzaCh0aGlzLnJhd0Rlc3RydWN0b3Iscil9YnJlYWs7ZGVmYXVsdDppZSgiVW5zdXBwb3J0aW5nIHNoYXJpbmcgcG9saWN5Iil9cmV0dXJuIHJ9ZnVuY3Rpb24gT2UoZSx0KXtpZihudWxsPT09dClyZXR1cm4gdGhpcy5pc1JlZmVyZW5jZSYmaWUoIm51bGwgaXMgbm90IGEgdmFsaWQgIit0aGlzLm5hbWUpLDA7dC4kJHx8aWUoJ0Nhbm5vdCBwYXNzICInK1ZlKHQpKyciIGFzIGEgJyt0aGlzLm5hbWUpLHQuJCQucHRyfHxpZSgiQ2Fubm90IHBhc3MgZGVsZXRlZCBvYmplY3QgYXMgYSBwb2ludGVyIG9mIHR5cGUgIit0aGlzLm5hbWUpLHQuJCQucHRyVHlwZS5pc0NvbnN0JiZpZSgiQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAiK3QuJCQucHRyVHlwZS5uYW1lKyIgdG8gcGFyYW1ldGVyIHR5cGUgIit0aGlzLm5hbWUpO3ZhciByPXQuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3M7cmV0dXJuICRlKHQuJCQucHRyLHIsdGhpcy5yZWdpc3RlcmVkQ2xhc3MpfWZ1bmN0aW9uIERlKGUsdCxyLG4sbyxhLGkscyx1LGMsbCl7dGhpcy5uYW1lPWUsdGhpcy5yZWdpc3RlcmVkQ2xhc3M9dCx0aGlzLmlzUmVmZXJlbmNlPXIsdGhpcy5pc0NvbnN0PW4sdGhpcy5pc1NtYXJ0UG9pbnRlcj1vLHRoaXMucG9pbnRlZVR5cGU9YSx0aGlzLnNoYXJpbmdQb2xpY3k9aSx0aGlzLnJhd0dldFBvaW50ZWU9cyx0aGlzLnJhd0NvbnN0cnVjdG9yPXUsdGhpcy5yYXdTaGFyZT1jLHRoaXMucmF3RGVzdHJ1Y3Rvcj1sLG98fHZvaWQgMCE9PXQuYmFzZUNsYXNzP3RoaXMudG9XaXJlVHlwZT1BZTpuPyh0aGlzLnRvV2lyZVR5cGU9UGUsdGhpcy5kZXN0cnVjdG9yRnVuY3Rpb249bnVsbCk6KHRoaXMudG9XaXJlVHlwZT1PZSx0aGlzLmRlc3RydWN0b3JGdW5jdGlvbj1udWxsKX1mdW5jdGlvbiBGZSh0LHIsbil7ZS5oYXNPd25Qcm9wZXJ0eSh0KXx8ZWUoIlJlcGxhY2luZyBub25leGlzdGFudCBwdWJsaWMgc3ltYm9sIiksdm9pZCAwIT09ZVt0XS5vdmVybG9hZFRhYmxlJiZ2b2lkIDAhPT1uP2VbdF0ub3ZlcmxvYWRUYWJsZVtuXT1yOihlW3RdPXIsZVt0XS5hcmdDb3VudD1uKX12YXIgU2U9W107ZnVuY3Rpb24ga2UoZSl7dmFyIHQ9U2VbZV07cmV0dXJuIHR8fChlPj1TZS5sZW5ndGgmJihTZS5sZW5ndGg9ZSsxKSxTZVtlXT10PUQuZ2V0KGUpKSx0fWZ1bmN0aW9uIFdlKHQscil7dmFyIG4sbyxhLGk9KHQ9b2UodCkpLmluY2x1ZGVzKCJqIik/KG49dCxvPXIsYT1bXSxmdW5jdGlvbigpe3JldHVybiBhLmxlbmd0aD0wLE9iamVjdC5hc3NpZ24oYSxhcmd1bWVudHMpLGZ1bmN0aW9uKHQscixuKXtyZXR1cm4gdC5pbmNsdWRlcygiaiIpP2Z1bmN0aW9uKHQscixuKXt2YXIgbz1lWyJkeW5DYWxsXyIrdF07cmV0dXJuIG4mJm4ubGVuZ3RoP28uYXBwbHkobnVsbCxbcl0uY29uY2F0KG4pKTpvLmNhbGwobnVsbCxyKX0odCxyLG4pOmtlKHIpLmFwcGx5KG51bGwsbil9KG4sbyxhKX0pOmtlKHIpO3JldHVybiJmdW5jdGlvbiIhPXR5cGVvZiBpJiZpZSgidW5rbm93biBmdW5jdGlvbiBwb2ludGVyIHdpdGggc2lnbmF0dXJlICIrdCsiOiAiK3IpLGl9dmFyIE1lPXZvaWQgMDtmdW5jdGlvbiBqZShlKXt2YXIgdD1idChlKSxyPW9lKHQpO3JldHVybiBfdCh0KSxyfWZ1bmN0aW9uIHhlKGUsdCl7dmFyIHI9W10sbj17fTt0aHJvdyB0LmZvckVhY2goKGZ1bmN0aW9uIGUodCl7blt0XXx8Tlt0XXx8KHFbdF0/cVt0XS5mb3JFYWNoKGUpOihyLnB1c2godCksblt0XT0hMCkpfSkpLG5ldyBNZShlKyI6ICIrci5tYXAoamUpLmpvaW4oWyIsICJdKSl9ZnVuY3Rpb24gRWUoZSx0KXtmb3IodmFyIHI9W10sbj0wO248ZTtuKyspci5wdXNoKHZbdCs0Km4+PjJdKTtyZXR1cm4gcn1mdW5jdGlvbiBSZShlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSl0aHJvdyBuZXcgVHlwZUVycm9yKCJuZXdfIGNhbGxlZCB3aXRoIGNvbnN0cnVjdG9yIHR5cGUgIit0eXBlb2YgZSsiIHdoaWNoIGlzIG5vdCBhIGZ1bmN0aW9uIik7dmFyIHI9WChlLm5hbWV8fCJ1bmtub3duRnVuY3Rpb25OYW1lIiwoZnVuY3Rpb24oKXt9KSk7ci5wcm90b3R5cGU9ZS5wcm90b3R5cGU7dmFyIG49bmV3IHIsbz1lLmFwcGx5KG4sdCk7cmV0dXJuIG8gaW5zdGFuY2VvZiBPYmplY3Q/bzpufWZ1bmN0aW9uIEllKGUsdCxyLG4sbyl7dmFyIGE9dC5sZW5ndGg7YTwyJiZpZSgiYXJnVHlwZXMgYXJyYXkgc2l6ZSBtaXNtYXRjaCEgTXVzdCBhdCBsZWFzdCBnZXQgcmV0dXJuIHZhbHVlIGFuZCAndGhpcycgdHlwZXMhIik7Zm9yKHZhciBpPW51bGwhPT10WzFdJiZudWxsIT09cixzPSExLHU9MTt1PHQubGVuZ3RoOysrdSlpZihudWxsIT09dFt1XSYmdm9pZCAwPT09dFt1XS5kZXN0cnVjdG9yRnVuY3Rpb24pe3M9ITA7YnJlYWt9dmFyIGM9InZvaWQiIT09dFswXS5uYW1lLGw9IiIsZj0iIjtmb3IodT0wO3U8YS0yOysrdSlsKz0oMCE9PXU/IiwgIjoiIikrImFyZyIrdSxmKz0oMCE9PXU/IiwgIjoiIikrImFyZyIrdSsiV2lyZWQiO3ZhciBkPSJyZXR1cm4gZnVuY3Rpb24gIitaKGUpKyIoIitsKyIpIHtcbmlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAiKyhhLTIpKyIpIHtcbnRocm93QmluZGluZ0Vycm9yKCdmdW5jdGlvbiAiK2UrIiBjYWxsZWQgd2l0aCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLCBleHBlY3RlZCAiKyhhLTIpKyIgYXJncyEnKTtcbn1cbiI7cyYmKGQrPSJ2YXIgZGVzdHJ1Y3RvcnMgPSBbXTtcbiIpO3ZhciBwPXM/ImRlc3RydWN0b3JzIjoibnVsbCIsaD1bInRocm93QmluZGluZ0Vycm9yIiwiaW52b2tlciIsImZuIiwicnVuRGVzdHJ1Y3RvcnMiLCJyZXRUeXBlIiwiY2xhc3NQYXJhbSJdLG09W2llLG4sbyxMLHRbMF0sdFsxXV07Zm9yKGkmJihkKz0idmFyIHRoaXNXaXJlZCA9IGNsYXNzUGFyYW0udG9XaXJlVHlwZSgiK3ArIiwgdGhpcyk7XG4iKSx1PTA7dTxhLTI7Kyt1KWQrPSJ2YXIgYXJnIit1KyJXaXJlZCA9IGFyZ1R5cGUiK3UrIi50b1dpcmVUeXBlKCIrcCsiLCBhcmciK3UrIik7IC8vICIrdFt1KzJdLm5hbWUrIlxuIixoLnB1c2goImFyZ1R5cGUiK3UpLG0ucHVzaCh0W3UrMl0pO2lmKGkmJihmPSJ0aGlzV2lyZWQiKyhmLmxlbmd0aD4wPyIsICI6IiIpK2YpLGQrPShjPyJ2YXIgcnYgPSAiOiIiKSsiaW52b2tlcihmbiIrKGYubGVuZ3RoPjA/IiwgIjoiIikrZisiKTtcbiIscylkKz0icnVuRGVzdHJ1Y3RvcnMoZGVzdHJ1Y3RvcnMpO1xuIjtlbHNlIGZvcih1PWk/MToyO3U8dC5sZW5ndGg7Kyt1KXt2YXIgZz0xPT09dT8idGhpc1dpcmVkIjoiYXJnIisodS0yKSsiV2lyZWQiO251bGwhPT10W3VdLmRlc3RydWN0b3JGdW5jdGlvbiYmKGQrPWcrIl9kdG9yKCIrZysiKTsgLy8gIit0W3VdLm5hbWUrIlxuIixoLnB1c2goZysiX2R0b3IiKSxtLnB1c2godFt1XS5kZXN0cnVjdG9yRnVuY3Rpb24pKX1yZXR1cm4gYyYmKGQrPSJ2YXIgcmV0ID0gcmV0VHlwZS5mcm9tV2lyZVR5cGUocnYpO1xucmV0dXJuIHJldDtcbiIpLGQrPSJ9XG4iLGgucHVzaChkKSxSZShGdW5jdGlvbixoKS5hcHBseShudWxsLG0pfWZ1bmN0aW9uIFVlKGUsdCxyKXtyZXR1cm4gZSBpbnN0YW5jZW9mIE9iamVjdHx8aWUocisnIHdpdGggaW52YWxpZCAidGhpcyI6ICcrZSksZSBpbnN0YW5jZW9mIHQucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yfHxpZShyKycgaW5jb21wYXRpYmxlIHdpdGggInRoaXMiIG9mIHR5cGUgJytlLmNvbnN0cnVjdG9yLm5hbWUpLGUuJCQucHRyfHxpZSgiY2Fubm90IGNhbGwgZW1zY3JpcHRlbiBiaW5kaW5nIG1ldGhvZCAiK3IrIiBvbiBkZWxldGVkIG9iamVjdCIpLCRlKGUuJCQucHRyLGUuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3MsdC5yZWdpc3RlcmVkQ2xhc3MpfXZhciB6ZT1bXSxIZT1be30se3ZhbHVlOnZvaWQgMH0se3ZhbHVlOm51bGx9LHt2YWx1ZTohMH0se3ZhbHVlOiExfV07ZnVuY3Rpb24gWWUoZSl7ZT40JiYwPT0tLUhlW2VdLnJlZmNvdW50JiYoSGVbZV09dm9pZCAwLHplLnB1c2goZSkpfXZhciBMZT17dG9WYWx1ZTplPT4oZXx8aWUoIkNhbm5vdCB1c2UgZGVsZXRlZCB2YWwuIGhhbmRsZSA9ICIrZSksSGVbZV0udmFsdWUpLHRvSGFuZGxlOmU9Pntzd2l0Y2goZSl7Y2FzZSB2b2lkIDA6cmV0dXJuIDE7Y2FzZSBudWxsOnJldHVybiAyO2Nhc2UhMDpyZXR1cm4gMztjYXNlITE6cmV0dXJuIDQ7ZGVmYXVsdDp2YXIgdD16ZS5sZW5ndGg/emUucG9wKCk6SGUubGVuZ3RoO3JldHVybiBIZVt0XT17cmVmY291bnQ6MSx2YWx1ZTplfSx0fX19O2Z1bmN0aW9uIFZlKGUpe2lmKG51bGw9PT1lKXJldHVybiJudWxsIjt2YXIgdD10eXBlb2YgZTtyZXR1cm4ib2JqZWN0Ij09PXR8fCJhcnJheSI9PT10fHwiZnVuY3Rpb24iPT09dD9lLnRvU3RyaW5nKCk6IiIrZX1mdW5jdGlvbiBCZShlLHQpe3N3aXRjaCh0KXtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmZyb21XaXJlVHlwZSh3W2U+PjJdKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5mcm9tV2lyZVR5cGUoX1tlPj4zXSl9O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBmbG9hdCB0eXBlOiAiK2UpfX1mdW5jdGlvbiBOZShlLHQscil7c3dpdGNoKHQpe2Nhc2UgMDpyZXR1cm4gcj9mdW5jdGlvbihlKXtyZXR1cm4gcFtlXX06ZnVuY3Rpb24oZSl7cmV0dXJuIGhbZV19O2Nhc2UgMTpyZXR1cm4gcj9mdW5jdGlvbihlKXtyZXR1cm4gbVtlPj4xXX06ZnVuY3Rpb24oZSl7cmV0dXJuIGdbZT4+MV19O2Nhc2UgMjpyZXR1cm4gcj9mdW5jdGlvbihlKXtyZXR1cm4geVtlPj4yXX06ZnVuY3Rpb24oZSl7cmV0dXJuIHZbZT4+Ml19O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBpbnRlZ2VyIHR5cGU6ICIrZSl9fXZhciBxZT0idW5kZWZpbmVkIiE9dHlwZW9mIFRleHREZWNvZGVyP25ldyBUZXh0RGVjb2RlcigidXRmLTE2bGUiKTp2b2lkIDA7ZnVuY3Rpb24gR2UoZSx0KXtmb3IodmFyIHI9ZSxuPXI+PjEsbz1uK3QvMjshKG4+PW8pJiZnW25dOykrK247aWYoKHI9bjw8MSktZT4zMiYmcWUpcmV0dXJuIHFlLmRlY29kZShoLnN1YmFycmF5KGUscikpO2Zvcih2YXIgYT0iIixpPTA7IShpPj10LzIpOysraSl7dmFyIHM9bVtlKzIqaT4+MV07aWYoMD09cylicmVhazthKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHMpfXJldHVybiBhfWZ1bmN0aW9uIEplKGUsdCxyKXtpZih2b2lkIDA9PT1yJiYocj0yMTQ3NDgzNjQ3KSxyPDIpcmV0dXJuIDA7Zm9yKHZhciBuPXQsbz0oci09Mik8MiplLmxlbmd0aD9yLzI6ZS5sZW5ndGgsYT0wO2E8bzsrK2Epe3ZhciBpPWUuY2hhckNvZGVBdChhKTttW3Q+PjFdPWksdCs9Mn1yZXR1cm4gbVt0Pj4xXT0wLHQtbn1mdW5jdGlvbiBaZShlKXtyZXR1cm4gMiplLmxlbmd0aH1mdW5jdGlvbiBYZShlLHQpe2Zvcih2YXIgcj0wLG49IiI7IShyPj10LzQpOyl7dmFyIG89eVtlKzQqcj4+Ml07aWYoMD09bylicmVhaztpZigrK3Isbz49NjU1MzYpe3ZhciBhPW8tNjU1MzY7bis9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxhPj4xMCw1NjMyMHwxMDIzJmEpfWVsc2Ugbis9U3RyaW5nLmZyb21DaGFyQ29kZShvKX1yZXR1cm4gbn1mdW5jdGlvbiBLZShlLHQscil7aWYodm9pZCAwPT09ciYmKHI9MjE0NzQ4MzY0Nykscjw0KXJldHVybiAwO2Zvcih2YXIgbj10LG89bityLTQsYT0wO2E8ZS5sZW5ndGg7KythKXt2YXIgaT1lLmNoYXJDb2RlQXQoYSk7aWYoaT49NTUyOTYmJmk8PTU3MzQzJiYoaT02NTUzNisoKDEwMjMmaSk8PDEwKXwxMDIzJmUuY2hhckNvZGVBdCgrK2EpKSx5W3Q+PjJdPWksKHQrPTQpKzQ+bylicmVha31yZXR1cm4geVt0Pj4yXT0wLHQtbn1mdW5jdGlvbiBRZShlKXtmb3IodmFyIHQ9MCxyPTA7cjxlLmxlbmd0aDsrK3Ipe3ZhciBuPWUuY2hhckNvZGVBdChyKTtuPj01NTI5NiYmbjw9NTczNDMmJisrcix0Kz00fXJldHVybiB0fWZ1bmN0aW9uIGV0KGUsdCl7dmFyIHI9TltlXTtyZXR1cm4gdm9pZCAwPT09ciYmaWUodCsiIGhhcyB1bmtub3duIHR5cGUgIitqZShlKSkscn12YXIgdHQ9e307ZnVuY3Rpb24gcnQoZSl7dmFyIHQ9dHRbZV07cmV0dXJuIHZvaWQgMD09PXQ/b2UoZSk6dH12YXIgbnQsb3Q9W10sYXQ9W107ZnVuY3Rpb24gaXQoZSl7cmV0dXJuIHZbZT4+Ml0rNDI5NDk2NzI5Nip5W2UrND4+Ml19ZnVuY3Rpb24gc3QoZSl7dmFyIHQ9QShlKSsxLHI9d3QodCk7cmV0dXJuIHImJlAoZSxwLHIsdCkscn1mdW5jdGlvbiB1dChlKXt0cnl7cmV0dXJuIGYuZ3JvdyhlLWQuYnl0ZUxlbmd0aCs2NTUzNT4+PjE2KSxPKGYuYnVmZmVyKSwxfWNhdGNoKGUpe319bnQ9KCk9PnBlcmZvcm1hbmNlLm5vdygpO3ZhciBjdD17fTtmdW5jdGlvbiBsdCgpe2lmKCFsdC5zdHJpbmdzKXt2YXIgZT17VVNFUjoid2ViX3VzZXIiLExPR05BTUU6IndlYl91c2VyIixQQVRIOiIvIixQV0Q6Ii8iLEhPTUU6Ii9ob21lL3dlYl91c2VyIixMQU5HOigib2JqZWN0Ij09dHlwZW9mIG5hdmlnYXRvciYmbmF2aWdhdG9yLmxhbmd1YWdlcyYmbmF2aWdhdG9yLmxhbmd1YWdlc1swXXx8IkMiKS5yZXBsYWNlKCItIiwiXyIpKyIuVVRGLTgiLF86aXx8Ii4vdGhpcy5wcm9ncmFtIn07Zm9yKHZhciB0IGluIGN0KXZvaWQgMD09PWN0W3RdP2RlbGV0ZSBlW3RdOmVbdF09Y3RbdF07dmFyIHI9W107Zm9yKHZhciB0IGluIGUpci5wdXNoKHQrIj0iK2VbdF0pO2x0LnN0cmluZ3M9cn1yZXR1cm4gbHQuc3RyaW5nc312YXIgZnQ9W251bGwsW10sW11dO2Z1bmN0aW9uIGR0KGUsdCl7dmFyIHI9ZnRbZV07MD09PXR8fDEwPT09dD8oKDE9PT1lP3U6YykoQyhyLDApKSxyLmxlbmd0aD0wKTpyLnB1c2godCl9ZnVuY3Rpb24gcHQoZSl7cmV0dXJuIGUlND09MCYmKGUlMTAwIT0wfHxlJTQwMD09MCl9dmFyIGh0PVszMSwyOSwzMSwzMCwzMSwzMCwzMSwzMSwzMCwzMSwzMCwzMV0sbXQ9WzMxLDI4LDMxLDMwLDMxLDMwLDMxLDMxLDMwLDMxLDMwLDMxXTtRPWUuSW50ZXJuYWxFcnJvcj1LKEVycm9yLCJJbnRlcm5hbEVycm9yIiksZnVuY3Rpb24oKXtmb3IodmFyIGU9bmV3IEFycmF5KDI1NiksdD0wO3Q8MjU2OysrdCllW3RdPVN0cmluZy5mcm9tQ2hhckNvZGUodCk7bmU9ZX0oKSxhZT1lLkJpbmRpbmdFcnJvcj1LKEVycm9yLCJCaW5kaW5nRXJyb3IiKSxfZS5wcm90b3R5cGUuaXNBbGlhc09mPWZ1bmN0aW9uKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIF9lKSlyZXR1cm4hMTtpZighKGUgaW5zdGFuY2VvZiBfZSkpcmV0dXJuITE7Zm9yKHZhciB0PXRoaXMuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3Mscj10aGlzLiQkLnB0cixuPWUuJCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3Msbz1lLiQkLnB0cjt0LmJhc2VDbGFzczspcj10LnVwY2FzdChyKSx0PXQuYmFzZUNsYXNzO2Zvcig7bi5iYXNlQ2xhc3M7KW89bi51cGNhc3Qobyksbj1uLmJhc2VDbGFzcztyZXR1cm4gdD09PW4mJnI9PT1vfSxfZS5wcm90b3R5cGUuY2xvbmU9ZnVuY3Rpb24oKXtpZih0aGlzLiQkLnB0cnx8dWUodGhpcyksdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSlyZXR1cm4gdGhpcy4kJC5jb3VudC52YWx1ZSs9MSx0aGlzO3ZhciBlLHQ9d2UoT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykseyQkOnt2YWx1ZTooZT10aGlzLiQkLHtjb3VudDplLmNvdW50LGRlbGV0ZVNjaGVkdWxlZDplLmRlbGV0ZVNjaGVkdWxlZCxwcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZTplLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlLHB0cjplLnB0cixwdHJUeXBlOmUucHRyVHlwZSxzbWFydFB0cjplLnNtYXJ0UHRyLHNtYXJ0UHRyVHlwZTplLnNtYXJ0UHRyVHlwZX0pfX0pKTtyZXR1cm4gdC4kJC5jb3VudC52YWx1ZSs9MSx0LiQkLmRlbGV0ZVNjaGVkdWxlZD0hMSx0fSxfZS5wcm90b3R5cGUuZGVsZXRlPWZ1bmN0aW9uKCl7dGhpcy4kJC5wdHJ8fHVlKHRoaXMpLHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkJiYhdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSYmaWUoIk9iamVjdCBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgZGVsZXRpb24iKSxsZSh0aGlzKSxmZSh0aGlzLiQkKSx0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlfHwodGhpcy4kJC5zbWFydFB0cj12b2lkIDAsdGhpcy4kJC5wdHI9dm9pZCAwKX0sX2UucHJvdG90eXBlLmlzRGVsZXRlZD1mdW5jdGlvbigpe3JldHVybiF0aGlzLiQkLnB0cn0sX2UucHJvdG90eXBlLmRlbGV0ZUxhdGVyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJCQucHRyfHx1ZSh0aGlzKSx0aGlzLiQkLmRlbGV0ZVNjaGVkdWxlZCYmIXRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUmJmllKCJPYmplY3QgYWxyZWFkeSBzY2hlZHVsZWQgZm9yIGRlbGV0aW9uIiksaGUucHVzaCh0aGlzKSwxPT09aGUubGVuZ3RoJiZnZSYmZ2UobWUpLHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkPSEwLHRoaXN9LGUuZ2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudD1mdW5jdGlvbigpe3JldHVybiBPYmplY3Qua2V5cyh5ZSkubGVuZ3RofSxlLmdldExpdmVJbmhlcml0ZWRJbnN0YW5jZXM9ZnVuY3Rpb24oKXt2YXIgZT1bXTtmb3IodmFyIHQgaW4geWUpeWUuaGFzT3duUHJvcGVydHkodCkmJmUucHVzaCh5ZVt0XSk7cmV0dXJuIGV9LGUuZmx1c2hQZW5kaW5nRGVsZXRlcz1tZSxlLnNldERlbGF5RnVuY3Rpb249ZnVuY3Rpb24oZSl7Z2U9ZSxoZS5sZW5ndGgmJmdlJiZnZShtZSl9LERlLnByb3RvdHlwZS5nZXRQb2ludGVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJhd0dldFBvaW50ZWUmJihlPXRoaXMucmF3R2V0UG9pbnRlZShlKSksZX0sRGUucHJvdG90eXBlLmRlc3RydWN0b3I9ZnVuY3Rpb24oZSl7dGhpcy5yYXdEZXN0cnVjdG9yJiZ0aGlzLnJhd0Rlc3RydWN0b3IoZSl9LERlLnByb3RvdHlwZS5hcmdQYWNrQWR2YW5jZT04LERlLnByb3RvdHlwZS5yZWFkVmFsdWVGcm9tUG9pbnRlcj1WLERlLnByb3RvdHlwZS5kZWxldGVPYmplY3Q9ZnVuY3Rpb24oZSl7bnVsbCE9PWUmJmUuZGVsZXRlKCl9LERlLnByb3RvdHlwZS5mcm9tV2lyZVR5cGU9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5nZXRQb2ludGVlKGUpO2lmKCF0KXJldHVybiB0aGlzLmRlc3RydWN0b3IoZSksbnVsbDt2YXIgcj1mdW5jdGlvbihlLHQpe3JldHVybiB0PWZ1bmN0aW9uKGUsdCl7Zm9yKHZvaWQgMD09PXQmJmllKCJwdHIgc2hvdWxkIG5vdCBiZSB1bmRlZmluZWQiKTtlLmJhc2VDbGFzczspdD1lLnVwY2FzdCh0KSxlPWUuYmFzZUNsYXNzO3JldHVybiB0fShlLHQpLHllW3RdfSh0aGlzLnJlZ2lzdGVyZWRDbGFzcyx0KTtpZih2b2lkIDAhPT1yKXtpZigwPT09ci4kJC5jb3VudC52YWx1ZSlyZXR1cm4gci4kJC5wdHI9dCxyLiQkLnNtYXJ0UHRyPWUsci5jbG9uZSgpO3ZhciBuPXIuY2xvbmUoKTtyZXR1cm4gdGhpcy5kZXN0cnVjdG9yKGUpLG59ZnVuY3Rpb24gbygpe3JldHVybiB0aGlzLmlzU21hcnRQb2ludGVyP3ZlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMucG9pbnRlZVR5cGUscHRyOnQsc21hcnRQdHJUeXBlOnRoaXMsc21hcnRQdHI6ZX0pOnZlKHRoaXMucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRoaXMscHRyOmV9KX12YXIgYSxpPXRoaXMucmVnaXN0ZXJlZENsYXNzLmdldEFjdHVhbFR5cGUodCkscz1wZVtpXTtpZighcylyZXR1cm4gby5jYWxsKHRoaXMpO2E9dGhpcy5pc0NvbnN0P3MuY29uc3RQb2ludGVyVHlwZTpzLnBvaW50ZXJUeXBlO3ZhciB1PWRlKHQsdGhpcy5yZWdpc3RlcmVkQ2xhc3MsYS5yZWdpc3RlcmVkQ2xhc3MpO3JldHVybiBudWxsPT09dT9vLmNhbGwodGhpcyk6dGhpcy5pc1NtYXJ0UG9pbnRlcj92ZShhLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTphLHB0cjp1LHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOmV9KTp2ZShhLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTphLHB0cjp1fSl9LE1lPWUuVW5ib3VuZFR5cGVFcnJvcj1LKEVycm9yLCJVbmJvdW5kVHlwZUVycm9yIiksZS5jb3VudF9lbXZhbF9oYW5kbGVzPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPTAsdD01O3Q8SGUubGVuZ3RoOysrdCl2b2lkIDAhPT1IZVt0XSYmKytlO3JldHVybiBlfSxlLmdldF9maXJzdF9lbXZhbD1mdW5jdGlvbigpe2Zvcih2YXIgZT01O2U8SGUubGVuZ3RoOysrZSlpZih2b2lkIDAhPT1IZVtlXSlyZXR1cm4gSGVbZV07cmV0dXJuIG51bGx9O3ZhciBndCx5dD17YTpmdW5jdGlvbihlKXtyZXR1cm4gd3QoZSsyNCkrMjR9LGI6ZnVuY3Rpb24oZSx0LHIpe3Rocm93IG5ldyBVKGUpLmluaXQodCxyKSxlfSx1OmZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gei52YXJhcmdzPXIsMH0sSDpmdW5jdGlvbihlLHQscil7cmV0dXJuIHoudmFyYXJncz1yLDB9LEk6ZnVuY3Rpb24oZSx0LHIsbil7ei52YXJhcmdzPW59LFA6ZnVuY3Rpb24oZSl7fSxSOmZ1bmN0aW9uKGUsdCl7UihIKX0sUTpmdW5jdGlvbihlLHQpe1IoSCl9LG86ZnVuY3Rpb24oZSl7dmFyIHQ9WVtlXTtkZWxldGUgWVtlXTt2YXIgcj10LmVsZW1lbnRzLG49ci5sZW5ndGgsbz1yLm1hcCgoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZ2V0dGVyUmV0dXJuVHlwZX0pKS5jb25jYXQoci5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnNldHRlckFyZ3VtZW50VHlwZX0pKSksYT10LnJhd0NvbnN0cnVjdG9yLGk9dC5yYXdEZXN0cnVjdG9yO3RlKFtlXSxvLChmdW5jdGlvbihlKXtyZXR1cm4gci5mb3JFYWNoKCgodCxyKT0+e3ZhciBvPWVbcl0sYT10LmdldHRlcixpPXQuZ2V0dGVyQ29udGV4dCxzPWVbcituXSx1PXQuc2V0dGVyLGM9dC5zZXR0ZXJDb250ZXh0O3QucmVhZD1lPT5vLmZyb21XaXJlVHlwZShhKGksZSkpLHQud3JpdGU9KGUsdCk9Pnt2YXIgcj1bXTt1KGMsZSxzLnRvV2lyZVR5cGUocix0KSksTChyKX19KSksW3tuYW1lOnQubmFtZSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBBcnJheShuKSxvPTA7bzxuOysrbyl0W29dPXJbb10ucmVhZChlKTtyZXR1cm4gaShlKSx0fSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsbyl7aWYobiE9PW8ubGVuZ3RoKXRocm93IG5ldyBUeXBlRXJyb3IoIkluY29ycmVjdCBudW1iZXIgb2YgdHVwbGUgZWxlbWVudHMgZm9yICIrdC5uYW1lKyI6IGV4cGVjdGVkPSIrbisiLCBhY3R1YWw9IitvLmxlbmd0aCk7Zm9yKHZhciBzPWEoKSx1PTA7dTxuOysrdSlyW3VdLndyaXRlKHMsb1t1XSk7cmV0dXJuIG51bGwhPT1lJiZlLnB1c2goaSxzKSxzfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlYsZGVzdHJ1Y3RvckZ1bmN0aW9uOml9XX0pKX0sejpmdW5jdGlvbihlLHQscixuLG8pe30sVDpmdW5jdGlvbihlLHQscixuLG8pe3ZhciBhPXJlKHIpO3NlKGUse25hbWU6dD1vZSh0KSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuISFlfSx0b1dpcmVUeXBlOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ/bjpvfSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOmZ1bmN0aW9uKGUpe3ZhciBuO2lmKDE9PT1yKW49cDtlbHNlIGlmKDI9PT1yKW49bTtlbHNle2lmKDQhPT1yKXRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gYm9vbGVhbiB0eXBlIHNpemU6ICIrdCk7bj15fXJldHVybiB0aGlzLmZyb21XaXJlVHlwZShuW2U+PmFdKX0sZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX0sZjpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMsdSxjLGwsZixkKXtsPW9lKGwpLGE9V2UobyxhKSxzJiYocz1XZShpLHMpKSxjJiYoYz1XZSh1LGMpKSxkPVdlKGYsZCk7dmFyIHA9WihsKTtUZShwLChmdW5jdGlvbigpe3hlKCJDYW5ub3QgY29uc3RydWN0ICIrbCsiIGR1ZSB0byB1bmJvdW5kIHR5cGVzIixbbl0pfSkpLHRlKFtlLHQscl0sbj9bbl06W10sKGZ1bmN0aW9uKHQpe3ZhciByLG87dD10WzBdLG89bj8ocj10LnJlZ2lzdGVyZWRDbGFzcykuaW5zdGFuY2VQcm90b3R5cGU6X2UucHJvdG90eXBlO3ZhciBpPVgocCwoZnVuY3Rpb24oKXtpZihPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykhPT11KXRocm93IG5ldyBhZSgiVXNlICduZXcnIHRvIGNvbnN0cnVjdCAiK2wpO2lmKHZvaWQgMD09PWYuY29uc3RydWN0b3JfYm9keSl0aHJvdyBuZXcgYWUobCsiIGhhcyBubyBhY2Nlc3NpYmxlIGNvbnN0cnVjdG9yIik7dmFyIGU9Zi5jb25zdHJ1Y3Rvcl9ib2R5W2FyZ3VtZW50cy5sZW5ndGhdO2lmKHZvaWQgMD09PWUpdGhyb3cgbmV3IGFlKCJUcmllZCB0byBpbnZva2UgY3RvciBvZiAiK2wrIiB3aXRoIGludmFsaWQgbnVtYmVyIG9mIHBhcmFtZXRlcnMgKCIrYXJndW1lbnRzLmxlbmd0aCsiKSAtIGV4cGVjdGVkICgiK09iamVjdC5rZXlzKGYuY29uc3RydWN0b3JfYm9keSkudG9TdHJpbmcoKSsiKSBwYXJhbWV0ZXJzIGluc3RlYWQhIik7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkpLHU9T2JqZWN0LmNyZWF0ZShvLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6aX19KTtpLnByb3RvdHlwZT11O3ZhciBmPW5ldyBDZShsLGksdSxkLHIsYSxzLGMpLGg9bmV3IERlKGwsZiwhMCwhMSwhMSksbT1uZXcgRGUobCsiKiIsZiwhMSwhMSwhMSksZz1uZXcgRGUobCsiIGNvbnN0KiIsZiwhMSwhMCwhMSk7cmV0dXJuIHBlW2VdPXtwb2ludGVyVHlwZTptLGNvbnN0UG9pbnRlclR5cGU6Z30sRmUocCxpKSxbaCxtLGddfSkpfSxpOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXt0PjB8fFIodW5kZWZpbmVkKTt2YXIgaT1FZSh0LHIpO289V2UobixvKSx0ZShbXSxbZV0sKGZ1bmN0aW9uKGUpe3ZhciByPSJjb25zdHJ1Y3RvciAiKyhlPWVbMF0pLm5hbWU7aWYodm9pZCAwPT09ZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keSYmKGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHk9W10pLHZvaWQgMCE9PWUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbdC0xXSl0aHJvdyBuZXcgYWUoIkNhbm5vdCByZWdpc3RlciBtdWx0aXBsZSBjb25zdHJ1Y3RvcnMgd2l0aCBpZGVudGljYWwgbnVtYmVyIG9mIHBhcmFtZXRlcnMgKCIrKHQtMSkrIikgZm9yIGNsYXNzICciK2UubmFtZSsiJyEgT3ZlcmxvYWQgcmVzb2x1dGlvbiBpcyBjdXJyZW50bHkgb25seSBwZXJmb3JtZWQgdXNpbmcgdGhlIHBhcmFtZXRlciBjb3VudCwgbm90IGFjdHVhbCB0eXBlIGluZm8hIik7cmV0dXJuIGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbdC0xXT0oKT0+e3hlKCJDYW5ub3QgY29uc3RydWN0ICIrZS5uYW1lKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLGkpfSx0ZShbXSxpLChmdW5jdGlvbihuKXtyZXR1cm4gbi5zcGxpY2UoMSwwLG51bGwpLGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbdC0xXT1JZShyLG4sbnVsbCxvLGEpLFtdfSkpLFtdfSkpfSxlOmZ1bmN0aW9uKGUsdCxyLG4sbyxhLGkscyl7dmFyIHU9RWUocixuKTt0PW9lKHQpLGE9V2UobyxhKSx0ZShbXSxbZV0sKGZ1bmN0aW9uKGUpe3ZhciBuPShlPWVbMF0pLm5hbWUrIi4iK3Q7ZnVuY3Rpb24gbygpe3hlKCJDYW5ub3QgY2FsbCAiK24rIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIsdSl9dC5zdGFydHNXaXRoKCJAQCIpJiYodD1TeW1ib2xbdC5zdWJzdHJpbmcoMildKSxzJiZlLnJlZ2lzdGVyZWRDbGFzcy5wdXJlVmlydHVhbEZ1bmN0aW9ucy5wdXNoKHQpO3ZhciBjPWUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLGw9Y1t0XTtyZXR1cm4gdm9pZCAwPT09bHx8dm9pZCAwPT09bC5vdmVybG9hZFRhYmxlJiZsLmNsYXNzTmFtZSE9PWUubmFtZSYmbC5hcmdDb3VudD09PXItMj8oby5hcmdDb3VudD1yLTIsby5jbGFzc05hbWU9ZS5uYW1lLGNbdF09byk6KGJlKGMsdCxuKSxjW3RdLm92ZXJsb2FkVGFibGVbci0yXT1vKSx0ZShbXSx1LChmdW5jdGlvbihvKXt2YXIgcz1JZShuLG8sZSxhLGkpO3JldHVybiB2b2lkIDA9PT1jW3RdLm92ZXJsb2FkVGFibGU/KHMuYXJnQ291bnQ9ci0yLGNbdF09cyk6Y1t0XS5vdmVybG9hZFRhYmxlW3ItMl09cyxbXX0pKSxbXX0pKX0sZDpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMsdSxjKXt0PW9lKHQpLG89V2UobixvKSx0ZShbXSxbZV0sKGZ1bmN0aW9uKGUpe3ZhciBuPShlPWVbMF0pLm5hbWUrIi4iK3QsbD17Z2V0OmZ1bmN0aW9uKCl7eGUoIkNhbm5vdCBhY2Nlc3MgIituKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLFtyLGldKX0sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITB9O3JldHVybiBsLnNldD11PygpPT57eGUoIkNhbm5vdCBhY2Nlc3MgIituKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLFtyLGldKX06ZT0+e2llKG4rIiBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eSIpfSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZS5yZWdpc3RlcmVkQ2xhc3MuaW5zdGFuY2VQcm90b3R5cGUsdCxsKSx0ZShbXSx1P1tyLGldOltyXSwoZnVuY3Rpb24ocil7dmFyIGk9clswXSxsPXtnZXQ6ZnVuY3Rpb24oKXt2YXIgdD1VZSh0aGlzLGUsbisiIGdldHRlciIpO3JldHVybiBpLmZyb21XaXJlVHlwZShvKGEsdCkpfSxlbnVtZXJhYmxlOiEwfTtpZih1KXt1PVdlKHMsdSk7dmFyIGY9clsxXTtsLnNldD1mdW5jdGlvbih0KXt2YXIgcj1VZSh0aGlzLGUsbisiIHNldHRlciIpLG89W107dShjLHIsZi50b1dpcmVUeXBlKG8sdCkpLEwobyl9fXJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZS5yZWdpc3RlcmVkQ2xhc3MuaW5zdGFuY2VQcm90b3R5cGUsdCxsKSxbXX0pKSxbXX0pKX0sUzpmdW5jdGlvbihlLHQpe3NlKGUse25hbWU6dD1vZSh0KSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7dmFyIHQ9TGUudG9WYWx1ZShlKTtyZXR1cm4gWWUoZSksdH0sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe3JldHVybiBMZS50b0hhbmRsZSh0KX0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpWLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSl9LHg6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPXJlKHIpO3NlKGUse25hbWU6dD1vZSh0KSxmcm9tV2lyZVR5cGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdH0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpCZSh0LG4pLGRlc3RydWN0b3JGdW5jdGlvbjpudWxsfSl9LGw6ZnVuY3Rpb24oZSx0LHIsbixvLGEpe3ZhciBpPUVlKHQscik7ZT1vZShlKSxvPVdlKG4sbyksVGUoZSwoZnVuY3Rpb24oKXt4ZSgiQ2Fubm90IGNhbGwgIitlKyIgZHVlIHRvIHVuYm91bmQgdHlwZXMiLGkpfSksdC0xKSx0ZShbXSxpLChmdW5jdGlvbihyKXt2YXIgbj1bclswXSxudWxsXS5jb25jYXQoci5zbGljZSgxKSk7cmV0dXJuIEZlKGUsSWUoZSxuLG51bGwsbyxhKSx0LTEpLFtdfSkpfSxrOmZ1bmN0aW9uKGUsdCxyLG4sbyl7dD1vZSh0KSwtMT09PW8mJihvPTQyOTQ5NjcyOTUpO3ZhciBhPXJlKHIpLGk9ZT0+ZTtpZigwPT09bil7dmFyIHM9MzItOCpyO2k9ZT0+ZTw8cz4+PnN9dmFyIHU9dC5pbmNsdWRlcygidW5zaWduZWQiKTtzZShlLHtuYW1lOnQsZnJvbVdpcmVUeXBlOmksdG9XaXJlVHlwZTp1P2Z1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMubmFtZSx0Pj4+MH06ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5uYW1lLHR9LGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6TmUodCxhLDAhPT1uKSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfSxoOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1bSW50OEFycmF5LFVpbnQ4QXJyYXksSW50MTZBcnJheSxVaW50MTZBcnJheSxJbnQzMkFycmF5LFVpbnQzMkFycmF5LEZsb2F0MzJBcnJheSxGbG9hdDY0QXJyYXldW3RdO2Z1bmN0aW9uIG8oZSl7dmFyIHQ9dixyPXRbZT4+PTJdLG89dFtlKzFdO3JldHVybiBuZXcgbihkLG8scil9c2UoZSx7bmFtZTpyPW9lKHIpLGZyb21XaXJlVHlwZTpvLGFyZ1BhY2tBZHZhbmNlOjgscmVhZFZhbHVlRnJvbVBvaW50ZXI6b30se2lnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnM6ITB9KX0sdzpmdW5jdGlvbihlLHQpe3ZhciByPSJzdGQ6OnN0cmluZyI9PT0odD1vZSh0KSk7c2UoZSx7bmFtZTp0LGZyb21XaXJlVHlwZTpmdW5jdGlvbihlKXt2YXIgdCxuPXZbZT4+Ml0sbz1lKzQ7aWYocilmb3IodmFyIGE9byxpPTA7aTw9bjsrK2kpe3ZhciBzPW8raTtpZihpPT1ufHwwPT1oW3NdKXt2YXIgdT0kKGEscy1hKTt2b2lkIDA9PT10P3Q9dToodCs9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSx0Kz11KSxhPXMrMX19ZWxzZXt2YXIgYz1uZXcgQXJyYXkobik7Zm9yKGk9MDtpPG47KytpKWNbaV09U3RyaW5nLmZyb21DaGFyQ29kZShoW28raV0pO3Q9Yy5qb2luKCIiKX1yZXR1cm4gX3QoZSksdH0sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe3ZhciBuO3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciYmKHQ9bmV3IFVpbnQ4QXJyYXkodCkpO3ZhciBvPSJzdHJpbmciPT10eXBlb2YgdDtvfHx0IGluc3RhbmNlb2YgVWludDhBcnJheXx8dCBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx0IGluc3RhbmNlb2YgSW50OEFycmF5fHxpZSgiQ2Fubm90IHBhc3Mgbm9uLXN0cmluZyB0byBzdGQ6OnN0cmluZyIpLG49ciYmbz9BKHQpOnQubGVuZ3RoO3ZhciBhPXd0KDQrbisxKSxpPWErNDtpZih2W2E+PjJdPW4sciYmbylQKHQsaCxpLG4rMSk7ZWxzZSBpZihvKWZvcih2YXIgcz0wO3M8bjsrK3Mpe3ZhciB1PXQuY2hhckNvZGVBdChzKTt1PjI1NSYmKF90KGkpLGllKCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHMiKSksaFtpK3NdPXV9ZWxzZSBmb3Iocz0wO3M8bjsrK3MpaFtpK3NdPXRbc107cmV0dXJuIG51bGwhPT1lJiZlLnB1c2goX3QsYSksYX0sYXJnUGFja0FkdmFuY2U6OCxyZWFkVmFsdWVGcm9tUG9pbnRlcjpWLGRlc3RydWN0b3JGdW5jdGlvbjpmdW5jdGlvbihlKXtfdChlKX19KX0sczpmdW5jdGlvbihlLHQscil7dmFyIG4sbyxhLGkscztyPW9lKHIpLDI9PT10PyhuPUdlLG89SmUsaT1aZSxhPSgpPT5nLHM9MSk6ND09PXQmJihuPVhlLG89S2UsaT1RZSxhPSgpPT52LHM9Miksc2UoZSx7bmFtZTpyLGZyb21XaXJlVHlwZTpmdW5jdGlvbihlKXtmb3IodmFyIHIsbz12W2U+PjJdLGk9YSgpLHU9ZSs0LGM9MDtjPD1vOysrYyl7dmFyIGw9ZSs0K2MqdDtpZihjPT1vfHwwPT1pW2w+PnNdKXt2YXIgZj1uKHUsbC11KTt2b2lkIDA9PT1yP3I9Zjoocis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKSxyKz1mKSx1PWwrdH19cmV0dXJuIF90KGUpLHJ9LHRvV2lyZVR5cGU6ZnVuY3Rpb24oZSxuKXsic3RyaW5nIiE9dHlwZW9mIG4mJmllKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIEMrKyBzdHJpbmcgdHlwZSAiK3IpO3ZhciBhPWkobiksdT13dCg0K2ErdCk7cmV0dXJuIHZbdT4+Ml09YT4+cyxvKG4sdSs0LGErdCksbnVsbCE9PWUmJmUucHVzaChfdCx1KSx1fSxhcmdQYWNrQWR2YW5jZTo4LHJlYWRWYWx1ZUZyb21Qb2ludGVyOlYsZGVzdHJ1Y3RvckZ1bmN0aW9uOmZ1bmN0aW9uKGUpe190KGUpfX0pfSxwOmZ1bmN0aW9uKGUsdCxyLG4sbyxhKXtZW2VdPXtuYW1lOm9lKHQpLHJhd0NvbnN0cnVjdG9yOldlKHIsbikscmF3RGVzdHJ1Y3RvcjpXZShvLGEpLGVsZW1lbnRzOltdfX0sZzpmdW5jdGlvbihlLHQscixuLG8sYSxpLHMsdSl7WVtlXS5lbGVtZW50cy5wdXNoKHtnZXR0ZXJSZXR1cm5UeXBlOnQsZ2V0dGVyOldlKHIsbiksZ2V0dGVyQ29udGV4dDpvLHNldHRlckFyZ3VtZW50VHlwZTphLHNldHRlcjpXZShpLHMpLHNldHRlckNvbnRleHQ6dX0pfSxVOmZ1bmN0aW9uKGUsdCl7c2UoZSx7aXNWb2lkOiEwLG5hbWU6dD1vZSh0KSxhcmdQYWNrQWR2YW5jZTowLGZyb21XaXJlVHlwZTpmdW5jdGlvbigpe30sdG9XaXJlVHlwZTpmdW5jdGlvbihlLHQpe319KX0sSzpmdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpfSxKOmZ1bmN0aW9uKCl7cmV0dXJuITB9LFk6ZnVuY3Rpb24oZSx0LHIpe2U9TGUudG9WYWx1ZShlKSx0PWV0KHQsImVtdmFsOjphcyIpO3ZhciBuPVtdLG89TGUudG9IYW5kbGUobik7cmV0dXJuIHZbcj4+Ml09byx0LnRvV2lyZVR5cGUobixlKX0sVjpmdW5jdGlvbihlLHQscixuKXsoZT1vdFtlXSkodD1MZS50b1ZhbHVlKHQpLHI9cnQociksbnVsbCxuKX0sajpZZSxXOmZ1bmN0aW9uKGUsdCl7dmFyIHI9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9bmV3IEFycmF5KGUpLG49MDtuPGU7KytuKXJbbl09ZXQodlt0KzQqbj4+Ml0sInBhcmFtZXRlciAiK24pO3JldHVybiByfShlLHQpLG49clswXSxvPW4ubmFtZSsiXyQiK3Iuc2xpY2UoMSkubWFwKChmdW5jdGlvbihlKXtyZXR1cm4gZS5uYW1lfSkpLmpvaW4oIl8iKSsiJCIsYT1hdFtvXTtpZih2b2lkIDAhPT1hKXJldHVybiBhO2Zvcih2YXIgaT1bInJldFR5cGUiXSxzPVtuXSx1PSIiLGM9MDtjPGUtMTsrK2MpdSs9KDAhPT1jPyIsICI6IiIpKyJhcmciK2MsaS5wdXNoKCJhcmdUeXBlIitjKSxzLnB1c2goclsxK2NdKTt2YXIgbCxmLGQ9InJldHVybiBmdW5jdGlvbiAiK1ooIm1ldGhvZENhbGxlcl8iK28pKyIoaGFuZGxlLCBuYW1lLCBkZXN0cnVjdG9ycywgYXJncykge1xuIixwPTA7Zm9yKGM9MDtjPGUtMTsrK2MpZCs9IiAgICB2YXIgYXJnIitjKyIgPSBhcmdUeXBlIitjKyIucmVhZFZhbHVlRnJvbVBvaW50ZXIoYXJncyIrKHA/IisiK3A6IiIpKyIpO1xuIixwKz1yW2MrMV0uYXJnUGFja0FkdmFuY2U7Zm9yKGQrPSIgICAgdmFyIHJ2ID0gaGFuZGxlW25hbWVdKCIrdSsiKTtcbiIsYz0wO2M8ZS0xOysrYylyW2MrMV0uZGVsZXRlT2JqZWN0JiYoZCs9IiAgICBhcmdUeXBlIitjKyIuZGVsZXRlT2JqZWN0KGFyZyIrYysiKTtcbiIpO3JldHVybiBuLmlzVm9pZHx8KGQrPSIgICAgcmV0dXJuIHJldFR5cGUudG9XaXJlVHlwZShkZXN0cnVjdG9ycywgcnYpO1xuIiksZCs9In07XG4iLGkucHVzaChkKSxsPVJlKEZ1bmN0aW9uLGkpLmFwcGx5KG51bGwscyksZj1vdC5sZW5ndGgsb3QucHVzaChsKSxhPWYsYXRbb109YSxhfSxaOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU9TGUudG9WYWx1ZShlKSx0PUxlLnRvVmFsdWUodCksTGUudG9IYW5kbGUoZVt0XSl9LG06ZnVuY3Rpb24oZSl7ZT40JiYoSGVbZV0ucmVmY291bnQrPTEpfSxxOmZ1bmN0aW9uKGUpe2U9TGUudG9WYWx1ZShlKTtmb3IodmFyIHQ9bmV3IEFycmF5KGUubGVuZ3RoKSxyPTA7cjxlLmxlbmd0aDtyKyspdFtyXT1lW3JdO3JldHVybiBMZS50b0hhbmRsZSh0KX0sXzpmdW5jdGlvbihlKXtyZXR1cm4gTGUudG9IYW5kbGUocnQoZSkpfSxYOmZ1bmN0aW9uKGUpe0woTGUudG9WYWx1ZShlKSksWWUoZSl9LG46ZnVuY3Rpb24oZSx0KXt2YXIgcj0oZT1ldChlLCJfZW12YWxfdGFrZV92YWx1ZSIpKS5yZWFkVmFsdWVGcm9tUG9pbnRlcih0KTtyZXR1cm4gTGUudG9IYW5kbGUocil9LEw6ZnVuY3Rpb24oZSx0KXt2YXIgcj1uZXcgRGF0ZSgxZTMqaXQoZSkpO3lbdD4+Ml09ci5nZXRVVENTZWNvbmRzKCkseVt0KzQ+PjJdPXIuZ2V0VVRDTWludXRlcygpLHlbdCs4Pj4yXT1yLmdldFVUQ0hvdXJzKCkseVt0KzEyPj4yXT1yLmdldFVUQ0RhdGUoKSx5W3QrMTY+PjJdPXIuZ2V0VVRDTW9udGgoKSx5W3QrMjA+PjJdPXIuZ2V0VVRDRnVsbFllYXIoKS0xOTAwLHlbdCsyND4+Ml09ci5nZXRVVENEYXkoKTt2YXIgbj1EYXRlLlVUQyhyLmdldFVUQ0Z1bGxZZWFyKCksMCwxLDAsMCwwLDApLG89KHIuZ2V0VGltZSgpLW4pLzg2NGU1fDA7eVt0KzI4Pj4yXT1vfSxNOmZ1bmN0aW9uKGUsdCl7dmFyIHI9bmV3IERhdGUoMWUzKml0KGUpKTt5W3Q+PjJdPXIuZ2V0U2Vjb25kcygpLHlbdCs0Pj4yXT1yLmdldE1pbnV0ZXMoKSx5W3QrOD4+Ml09ci5nZXRIb3VycygpLHlbdCsxMj4+Ml09ci5nZXREYXRlKCkseVt0KzE2Pj4yXT1yLmdldE1vbnRoKCkseVt0KzIwPj4yXT1yLmdldEZ1bGxZZWFyKCktMTkwMCx5W3QrMjQ+PjJdPXIuZ2V0RGF5KCk7dmFyIG49bmV3IERhdGUoci5nZXRGdWxsWWVhcigpLDAsMSksbz0oci5nZXRUaW1lKCktbi5nZXRUaW1lKCkpLzg2NGU1fDA7eVt0KzI4Pj4yXT1vLHlbdCszNj4+Ml09LTYwKnIuZ2V0VGltZXpvbmVPZmZzZXQoKTt2YXIgYT1uZXcgRGF0ZShyLmdldEZ1bGxZZWFyKCksNiwxKS5nZXRUaW1lem9uZU9mZnNldCgpLGk9bi5nZXRUaW1lem9uZU9mZnNldCgpLHM9MHwoYSE9aSYmci5nZXRUaW1lem9uZU9mZnNldCgpPT1NYXRoLm1pbihpLGEpKTt5W3QrMzI+PjJdPXN9LE46ZnVuY3Rpb24gZSh0LHIsbil7ZS5jYWxsZWR8fChlLmNhbGxlZD0hMCxmdW5jdGlvbihlLHQscil7dmFyIG49KG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpLG89bmV3IERhdGUobiwwLDEpLGE9bmV3IERhdGUobiw2LDEpLGk9by5nZXRUaW1lem9uZU9mZnNldCgpLHM9YS5nZXRUaW1lem9uZU9mZnNldCgpLHU9TWF0aC5tYXgoaSxzKTtmdW5jdGlvbiBjKGUpe3ZhciB0PWUudG9UaW1lU3RyaW5nKCkubWF0Y2goL1woKFtBLVphLXogXSspXCkkLyk7cmV0dXJuIHQ/dFsxXToiR01UIn15W2U+PjJdPTYwKnUseVt0Pj4yXT1OdW1iZXIoaSE9cyk7dmFyIGw9YyhvKSxmPWMoYSksZD1zdChsKSxwPXN0KGYpO3M8aT8odltyPj4yXT1kLHZbcis0Pj4yXT1wKToodltyPj4yXT1wLHZbcis0Pj4yXT1kKX0odCxyLG4pKX0sYzpmdW5jdGlvbigpe1IoIiIpfSxDOmZ1bmN0aW9uKCl7cmV0dXJuIDIxNDc0ODM2NDh9LHI6bnQsTzpmdW5jdGlvbihlLHQscil7aC5jb3B5V2l0aGluKGUsdCx0K3IpfSxCOmZ1bmN0aW9uKGUpe3ZhciB0LHI9aC5sZW5ndGgsbj0yMTQ3NDgzNjQ4O2lmKChlPj4+PTApPm4pcmV0dXJuITE7Zm9yKHZhciBvPTE7bzw9NDtvKj0yKXt2YXIgYT1yKigxKy4yL28pO2lmKGE9TWF0aC5taW4oYSxlKzEwMDY2MzI5NiksdXQoTWF0aC5taW4obiwodD1NYXRoLm1heChlLGEpKSsoNjU1MzYtdCU2NTUzNiklNjU1MzYpKSlyZXR1cm4hMH1yZXR1cm4hMX0sRTpmdW5jdGlvbihlLHQpe3ZhciByPTA7cmV0dXJuIGx0KCkuZm9yRWFjaCgoZnVuY3Rpb24obixvKXt2YXIgYT10K3I7dltlKzQqbz4+Ml09YSxmdW5jdGlvbihlLHQscil7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDsrK24pcFswfHQrK109ZS5jaGFyQ29kZUF0KG4pO3BbMHx0XT0wfShuLGEpLHIrPW4ubGVuZ3RoKzF9KSksMH0sRjpmdW5jdGlvbihlLHQpe3ZhciByPWx0KCk7dltlPj4yXT1yLmxlbmd0aDt2YXIgbj0wO3JldHVybiByLmZvckVhY2goKGZ1bmN0aW9uKGUpe24rPWUubGVuZ3RoKzF9KSksdlt0Pj4yXT1uLDB9LHY6ZnVuY3Rpb24oZSl7cmV0dXJuIDUyfSxEOmZ1bmN0aW9uKGUsdCl7dmFyIHI9MT09ZXx8Mj09ZT8yOlIoKTtyZXR1cm4gcFswfHRdPXIsMH0sRzpmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gNTJ9LHk6ZnVuY3Rpb24oZSx0LHIsbixvKXtyZXR1cm4gNzB9LHQ6ZnVuY3Rpb24oZSx0LHIsbil7Zm9yKHZhciBvPTAsYT0wO2E8cjthKyspe3ZhciBpPXZbdD4+Ml0scz12W3QrND4+Ml07dCs9ODtmb3IodmFyIHU9MDt1PHM7dSsrKWR0KGUsaFtpK3VdKTtvKz1zfXJldHVybiB2W24+PjJdPW8sMH0sQTpmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7dmFyIG89eVtuKzQwPj4yXSxhPXt0bV9zZWM6eVtuPj4yXSx0bV9taW46eVtuKzQ+PjJdLHRtX2hvdXI6eVtuKzg+PjJdLHRtX21kYXk6eVtuKzEyPj4yXSx0bV9tb246eVtuKzE2Pj4yXSx0bV95ZWFyOnlbbisyMD4+Ml0sdG1fd2RheTp5W24rMjQ+PjJdLHRtX3lkYXk6eVtuKzI4Pj4yXSx0bV9pc2RzdDp5W24rMzI+PjJdLHRtX2dtdG9mZjp5W24rMzY+PjJdLHRtX3pvbmU6bz8kKG8pOiIifSxpPSQocikscz17IiVjIjoiJWEgJWIgJWQgJUg6JU06JVMgJVkiLCIlRCI6IiVtLyVkLyV5IiwiJUYiOiIlWS0lbS0lZCIsIiVoIjoiJWIiLCIlciI6IiVJOiVNOiVTICVwIiwiJVIiOiIlSDolTSIsIiVUIjoiJUg6JU06JVMiLCIleCI6IiVtLyVkLyV5IiwiJVgiOiIlSDolTTolUyIsIiVFYyI6IiVjIiwiJUVDIjoiJUMiLCIlRXgiOiIlbS8lZC8leSIsIiVFWCI6IiVIOiVNOiVTIiwiJUV5IjoiJXkiLCIlRVkiOiIlWSIsIiVPZCI6IiVkIiwiJU9lIjoiJWUiLCIlT0giOiIlSCIsIiVPSSI6IiVJIiwiJU9tIjoiJW0iLCIlT00iOiIlTSIsIiVPUyI6IiVTIiwiJU91IjoiJXUiLCIlT1UiOiIlVSIsIiVPViI6IiVWIiwiJU93IjoiJXciLCIlT1ciOiIlVyIsIiVPeSI6IiV5In07Zm9yKHZhciB1IGluIHMpaT1pLnJlcGxhY2UobmV3IFJlZ0V4cCh1LCJnIiksc1t1XSk7dmFyIGM9WyJTdW5kYXkiLCJNb25kYXkiLCJUdWVzZGF5IiwiV2VkbmVzZGF5IiwiVGh1cnNkYXkiLCJGcmlkYXkiLCJTYXR1cmRheSJdLGw9WyJKYW51YXJ5IiwiRmVicnVhcnkiLCJNYXJjaCIsIkFwcmlsIiwiTWF5IiwiSnVuZSIsIkp1bHkiLCJBdWd1c3QiLCJTZXB0ZW1iZXIiLCJPY3RvYmVyIiwiTm92ZW1iZXIiLCJEZWNlbWJlciJdO2Z1bmN0aW9uIGYoZSx0LHIpe2Zvcih2YXIgbj0ibnVtYmVyIj09dHlwZW9mIGU/ZS50b1N0cmluZygpOmV8fCIiO24ubGVuZ3RoPHQ7KW49clswXStuO3JldHVybiBufWZ1bmN0aW9uIGQoZSx0KXtyZXR1cm4gZihlLHQsIjAiKX1mdW5jdGlvbiBoKGUsdCl7ZnVuY3Rpb24gcihlKXtyZXR1cm4gZTwwPy0xOmU+MD8xOjB9dmFyIG47cmV0dXJuIDA9PT0obj1yKGUuZ2V0RnVsbFllYXIoKS10LmdldEZ1bGxZZWFyKCkpKSYmMD09PShuPXIoZS5nZXRNb250aCgpLXQuZ2V0TW9udGgoKSkpJiYobj1yKGUuZ2V0RGF0ZSgpLXQuZ2V0RGF0ZSgpKSksbn1mdW5jdGlvbiBtKGUpe3N3aXRjaChlLmdldERheSgpKXtjYXNlIDA6cmV0dXJuIG5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKS0xLDExLDI5KTtjYXNlIDE6cmV0dXJuIGU7Y2FzZSAyOnJldHVybiBuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCksMCwzKTtjYXNlIDM6cmV0dXJuIG5ldyBEYXRlKGUuZ2V0RnVsbFllYXIoKSwwLDIpO2Nhc2UgNDpyZXR1cm4gbmV3IERhdGUoZS5nZXRGdWxsWWVhcigpLDAsMSk7Y2FzZSA1OnJldHVybiBuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCktMSwxMSwzMSk7Y2FzZSA2OnJldHVybiBuZXcgRGF0ZShlLmdldEZ1bGxZZWFyKCktMSwxMSwzMCl9fWZ1bmN0aW9uIGcoZSl7dmFyIHQ9ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI9bmV3IERhdGUoZS5nZXRUaW1lKCkpO3Q+MDspe3ZhciBuPXB0KHIuZ2V0RnVsbFllYXIoKSksbz1yLmdldE1vbnRoKCksYT0obj9odDptdClbb107aWYoISh0PmEtci5nZXREYXRlKCkpKXJldHVybiByLnNldERhdGUoci5nZXREYXRlKCkrdCkscjt0LT1hLXIuZ2V0RGF0ZSgpKzEsci5zZXREYXRlKDEpLG88MTE/ci5zZXRNb250aChvKzEpOihyLnNldE1vbnRoKDApLHIuc2V0RnVsbFllYXIoci5nZXRGdWxsWWVhcigpKzEpKX1yZXR1cm4gcn0obmV3IERhdGUoZS50bV95ZWFyKzE5MDAsMCwxKSxlLnRtX3lkYXkpLHI9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLDAsNCksbj1uZXcgRGF0ZSh0LmdldEZ1bGxZZWFyKCkrMSwwLDQpLG89bShyKSxhPW0obik7cmV0dXJuIGgobyx0KTw9MD9oKGEsdCk8PTA/dC5nZXRGdWxsWWVhcigpKzE6dC5nZXRGdWxsWWVhcigpOnQuZ2V0RnVsbFllYXIoKS0xfXZhciB2PXsiJWEiOmZ1bmN0aW9uKGUpe3JldHVybiBjW2UudG1fd2RheV0uc3Vic3RyaW5nKDAsMyl9LCIlQSI6ZnVuY3Rpb24oZSl7cmV0dXJuIGNbZS50bV93ZGF5XX0sIiViIjpmdW5jdGlvbihlKXtyZXR1cm4gbFtlLnRtX21vbl0uc3Vic3RyaW5nKDAsMyl9LCIlQiI6ZnVuY3Rpb24oZSl7cmV0dXJuIGxbZS50bV9tb25dfSwiJUMiOmZ1bmN0aW9uKGUpe3JldHVybiBkKChlLnRtX3llYXIrMTkwMCkvMTAwfDAsMil9LCIlZCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZS50bV9tZGF5LDIpfSwiJWUiOmZ1bmN0aW9uKGUpe3JldHVybiBmKGUudG1fbWRheSwyLCIgIil9LCIlZyI6ZnVuY3Rpb24oZSl7cmV0dXJuIGcoZSkudG9TdHJpbmcoKS5zdWJzdHJpbmcoMil9LCIlRyI6ZnVuY3Rpb24oZSl7cmV0dXJuIGcoZSl9LCIlSCI6ZnVuY3Rpb24oZSl7cmV0dXJuIGQoZS50bV9ob3VyLDIpfSwiJUkiOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG1faG91cjtyZXR1cm4gMD09dD90PTEyOnQ+MTImJih0LT0xMiksZCh0LDIpfSwiJWoiOmZ1bmN0aW9uKGUpe3JldHVybiBkKGUudG1fbWRheStmdW5jdGlvbihlLHQpe2Zvcih2YXIgcj0wLG49MDtuPD10O3IrPWVbbisrXSk7cmV0dXJuIHJ9KHB0KGUudG1feWVhcisxOTAwKT9odDptdCxlLnRtX21vbi0xKSwzKX0sIiVtIjpmdW5jdGlvbihlKXtyZXR1cm4gZChlLnRtX21vbisxLDIpfSwiJU0iOmZ1bmN0aW9uKGUpe3JldHVybiBkKGUudG1fbWluLDIpfSwiJW4iOmZ1bmN0aW9uKCl7cmV0dXJuIlxuIn0sIiVwIjpmdW5jdGlvbihlKXtyZXR1cm4gZS50bV9ob3VyPj0wJiZlLnRtX2hvdXI8MTI/IkFNIjoiUE0ifSwiJVMiOmZ1bmN0aW9uKGUpe3JldHVybiBkKGUudG1fc2VjLDIpfSwiJXQiOmZ1bmN0aW9uKCl7cmV0dXJuIlx0In0sIiV1IjpmdW5jdGlvbihlKXtyZXR1cm4gZS50bV93ZGF5fHw3fSwiJVUiOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG1feWRheSs3LWUudG1fd2RheTtyZXR1cm4gZChNYXRoLmZsb29yKHQvNyksMil9LCIlViI6ZnVuY3Rpb24oZSl7dmFyIHQ9TWF0aC5mbG9vcigoZS50bV95ZGF5KzctKGUudG1fd2RheSs2KSU3KS83KTtpZigoZS50bV93ZGF5KzM3MS1lLnRtX3lkYXktMiklNzw9MiYmdCsrLHQpe2lmKDUzPT10KXt2YXIgcj0oZS50bV93ZGF5KzM3MS1lLnRtX3lkYXkpJTc7ND09cnx8Mz09ciYmcHQoZS50bV95ZWFyKXx8KHQ9MSl9fWVsc2V7dD01Mjt2YXIgbj0oZS50bV93ZGF5KzctZS50bV95ZGF5LTEpJTc7KDQ9PW58fDU9PW4mJnB0KGUudG1feWVhciU0MDAtMSkpJiZ0Kyt9cmV0dXJuIGQodCwyKX0sIiV3IjpmdW5jdGlvbihlKXtyZXR1cm4gZS50bV93ZGF5fSwiJVciOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG1feWRheSs3LShlLnRtX3dkYXkrNiklNztyZXR1cm4gZChNYXRoLmZsb29yKHQvNyksMil9LCIleSI6ZnVuY3Rpb24oZSl7cmV0dXJuKGUudG1feWVhcisxOTAwKS50b1N0cmluZygpLnN1YnN0cmluZygyKX0sIiVZIjpmdW5jdGlvbihlKXtyZXR1cm4gZS50bV95ZWFyKzE5MDB9LCIleiI6ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50bV9nbXRvZmYscj10Pj0wO3JldHVybiB0PSh0PU1hdGguYWJzKHQpLzYwKS82MCoxMDArdCU2MCwocj8iKyI6Ii0iKStTdHJpbmcoIjAwMDAiK3QpLnNsaWNlKC00KX0sIiVaIjpmdW5jdGlvbihlKXtyZXR1cm4gZS50bV96b25lfSwiJSUiOmZ1bmN0aW9uKCl7cmV0dXJuIiUifX07Zm9yKHZhciB1IGluIGk9aS5yZXBsYWNlKC8lJS9nLCJcMFwwIiksdilpLmluY2x1ZGVzKHUpJiYoaT1pLnJlcGxhY2UobmV3IFJlZ0V4cCh1LCJnIiksdlt1XShhKSkpO3ZhciB3LF8sYixUPShfPUEodz1pPWkucmVwbGFjZSgvXDBcMC9nLCIlIikpKzEsUCh3LGI9bmV3IEFycmF5KF8pLDAsYi5sZW5ndGgpLGIpO3JldHVybiBULmxlbmd0aD50PzA6KGZ1bmN0aW9uKGUsdCl7cC5zZXQoZSx0KX0oVCxlKSxULmxlbmd0aC0xKX0oZSx0LHIsbil9fSx2dD1mdW5jdGlvbigpe3ZhciB0PXthOnl0fTtmdW5jdGlvbiByKHQscil7dmFyIG4sbz10LmV4cG9ydHM7ZS5hc209byxPKChmPWUuYXNtLiQpLmJ1ZmZlciksRD1lLmFzbS5jYSxuPWUuYXNtLmFhLFcudW5zaGlmdChuKSxmdW5jdGlvbih0KXtpZihqLS0sZS5tb25pdG9yUnVuRGVwZW5kZW5jaWVzJiZlLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMoaiksMD09aiYmKG51bGwhPT14JiYoY2xlYXJJbnRlcnZhbCh4KSx4PW51bGwpLEUpKXt2YXIgcj1FO0U9bnVsbCxyKCl9fSgpfWlmKGorKyxlLm1vbml0b3JSdW5EZXBlbmRlbmNpZXMmJmUubW9uaXRvclJ1bkRlcGVuZGVuY2llcyhqKSxlLmluc3RhbnRpYXRlV2FzbSl0cnl7cmV0dXJuIGUuaW5zdGFudGlhdGVXYXNtKHQscil9Y2F0Y2goZSl7cmV0dXJuIGMoIk1vZHVsZS5pbnN0YW50aWF0ZVdhc20gY2FsbGJhY2sgZmFpbGVkIHdpdGggZXJyb3I6ICIrZSksITF9cmV0dXJuIHIoZnVuY3Rpb24oZSx0KXt2YXIgcixuLG87dHJ5e289ZnVuY3Rpb24oZSl7dHJ5e2lmKGU9PUYmJmwpcmV0dXJuIG5ldyBVaW50OEFycmF5KGwpO3Rocm93InN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkOiB5b3UgY2FuIHByZWxvYWQgaXQgdG8gTW9kdWxlWyd3YXNtQmluYXJ5J10gbWFudWFsbHksIG9yIGVtY2MucHkgd2lsbCBkbyB0aGF0IGZvciB5b3Ugd2hlbiBnZW5lcmF0aW5nIEhUTUwgKGJ1dCBub3QgSlMpIn1jYXRjaChlKXtSKGUpfX0oZSksbj1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG8pLHI9bmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG4sdCl9Y2F0Y2goZSl7dmFyIGE9ZS50b1N0cmluZygpO3Rocm93IGMoImZhaWxlZCB0byBjb21waWxlIHdhc20gbW9kdWxlOiAiK2EpLChhLmluY2x1ZGVzKCJpbXBvcnRlZCBNZW1vcnkiKXx8YS5pbmNsdWRlcygibWVtb3J5IGltcG9ydCIpKSYmYygiTWVtb3J5IHNpemUgaW5jb21wYXRpYmlsaXR5IGlzc3VlcyBtYXkgYmUgZHVlIHRvIGNoYW5naW5nIElOSVRJQUxfTUVNT1JZIGF0IHJ1bnRpbWUgdG8gc29tZXRoaW5nIHRvbyBsYXJnZS4gVXNlIEFMTE9XX01FTU9SWV9HUk9XVEggdG8gYWxsb3cgYW55IHNpemUgbWVtb3J5IChhbmQgYWxzbyBtYWtlIHN1cmUgbm90IHRvIHNldCBJTklUSUFMX01FTU9SWSBhdCBydW50aW1lIHRvIHNvbWV0aGluZyBzbWFsbGVyIHRoYW4gaXQgd2FzIGF0IGNvbXBpbGUgdGltZSkuIiksZX1yZXR1cm5bcixuXX0oRix0KVswXSksZS5hc219KCksd3Q9KGUuX19fd2FzbV9jYWxsX2N0b3JzPXZ0LmFhLGUuX21hbGxvYz12dC5iYSksX3Q9ZS5fZnJlZT12dC5kYSxidD1lLl9fX2dldFR5cGVOYW1lPXZ0LmVhLFR0PShlLl9fZW1iaW5kX2luaXRpYWxpemVfYmluZGluZ3M9dnQuZmEsZS5fX19jeGFfaXNfcG9pbnRlcl90eXBlPXZ0LmdhKTtmdW5jdGlvbiBDdChyKXtmdW5jdGlvbiBuKCl7Z3R8fChndD0hMCxlLmNhbGxlZFJ1bj0hMCxifHwoSShXKSx0KGUpLGUub25SdW50aW1lSW5pdGlhbGl6ZWQmJmUub25SdW50aW1lSW5pdGlhbGl6ZWQoKSxmdW5jdGlvbigpe2lmKGUucG9zdFJ1bilmb3IoImZ1bmN0aW9uIj09dHlwZW9mIGUucG9zdFJ1biYmKGUucG9zdFJ1bj1bZS5wb3N0UnVuXSk7ZS5wb3N0UnVuLmxlbmd0aDspdD1lLnBvc3RSdW4uc2hpZnQoKSxNLnVuc2hpZnQodCk7dmFyIHQ7SShNKX0oKSkpfXI9cnx8byxqPjB8fChmdW5jdGlvbigpe2lmKGUucHJlUnVuKWZvcigiZnVuY3Rpb24iPT10eXBlb2YgZS5wcmVSdW4mJihlLnByZVJ1bj1bZS5wcmVSdW5dKTtlLnByZVJ1bi5sZW5ndGg7KXQ9ZS5wcmVSdW4uc2hpZnQoKSxrLnVuc2hpZnQodCk7dmFyIHQ7SShrKX0oKSxqPjB8fChlLnNldFN0YXR1cz8oZS5zZXRTdGF0dXMoIlJ1bm5pbmcuLi4iKSxzZXRUaW1lb3V0KChmdW5jdGlvbigpe3NldFRpbWVvdXQoKGZ1bmN0aW9uKCl7ZS5zZXRTdGF0dXMoIiIpfSksMSksbigpfSksMSkpOm4oKSkpfWlmKGUuZHluQ2FsbF92aWlpamk9dnQuaGEsZS5keW5DYWxsX2lpaWlqaT12dC5pYSxlLmR5bkNhbGxfdmlpamk9dnQuamEsZS5keW5DYWxsX2lpaWppPXZ0LmthLGUuZHluQ2FsbF9qaWk9dnQubGEsZS5keW5DYWxsX2ppaWk9dnQubWEsZS5keW5DYWxsX2ppamk9dnQubmEsZS5keW5DYWxsX3ZpaWppaT12dC5vYSxlLmR5bkNhbGxfaWlpaWlqPXZ0LnBhLGUuZHluQ2FsbF9paWlpaWpqPXZ0LnFhLGUuZHluQ2FsbF9paWlpaWlqaj12dC5yYSxlLmR5bkNhbGxfampqPXZ0LnNhLEU9ZnVuY3Rpb24gZSgpe2d0fHxDdCgpLGd0fHwoRT1lKX0sZS5wcmVJbml0KWZvcigiZnVuY3Rpb24iPT10eXBlb2YgZS5wcmVJbml0JiYoZS5wcmVJbml0PVtlLnByZUluaXRdKTtlLnByZUluaXQubGVuZ3RoPjA7KWUucHJlSW5pdC5wb3AoKSgpO3JldHVybiBDdCgpLGV9KTtjb25zdCBzPWk7dmFyIHU9bnVsbCxjPW51bGwsbD1udWxsLGY9bnVsbCxkPSIiLHA9LTE7Y29uc3QgaD1hc3luYyhlLHQscik9PntlLmRpYWdub3N0aWM9ITAhPT1yP3Q6MH0sbT1hc3luYyBlPT57bGV0IHQ9YXdhaXQgZmV0Y2goZSk7dC5va3x8bigiSFRUUCBlcnJvciAiK3Quc3RhdHVzKyJsb2FkaW5nIHJlc291cmNlLiIpO2xldCByPWF3YWl0IHQuYXJyYXlCdWZmZXIoKSxvPW5ldyBVaW50OENsYW1wZWRBcnJheShyKTtyZXR1cm4gbihlKyItIGxvYWRlZCAtICIrby5sZW5ndGgpLG99O3NlbGYub25tZXNzYWdlPWU9Pntzd2l0Y2goZS5kYXRhLmNtZCl7Y2FzZSJwcmVJbml0IjooYXN5bmMgZT0+e24oIltXb3JrZXJdOiBSZWNlaXZlZCBtZXNzYWdlIGluIHByZUluaXQgZXZlbnQiKSxkPWUuYnVuZGxlUGF0aDt0cnl7bGV0IGU9bnVsbCx0PW51bGwscj1udWxsO2NvbnN0IG89eyJmYWNlcGhpX2ZhY2VfZGV0ZWN0b3JfMV8wX21vZGVsLmRhdCI6ZCsiL21vZGVscy9mYWNlcGhpX2ZhY2VfZGV0ZWN0b3JfMV8wX21vZGVsLmRhdCIsImZhY2VwaGlfZG9jdW1lbnRfZGV0ZWN0b3JfMV8yX21vZGVsLmRhdCI6ZCsiL21vZGVscy9mYWNlcGhpX2RvY3VtZW50X2RldGVjdG9yXzFfMl9tb2RlbC5kYXQiLCJmYWNlcGhpX21yel9kZXRlY3Rvcl8xXzBfbW9kZWwuZGF0IjpkKyIvbW9kZWxzL2ZhY2VwaGlfbXJ6X2RldGVjdG9yXzFfMF9tb2RlbC5kYXQiLCJmYWNlcGhpX29jcl9tcnpfMV8wX21vZGVsLmRhdCI6ZCsiL21vZGVscy9mYWNlcGhpX29jcl9tcnpfMV8wX21vZGVsLmRhdCIscGlwZWxpbmVfd2lkZ2V0V2ViOmQrIi9jb25maWcvZmFjZXBoaV9leHRyYWN0aW9uX3BpcGVsaW5lX3dpZGdldHdlYi5qc29uIn07Yz17fSxuKCJzdGFydCBsb2FkaW5nIHJlc291cmNlcy4uLiIpO2Zvcihjb25zdFtlLHRdb2YgT2JqZWN0LmVudHJpZXMobykpbihgJHtlfSA9ICR7dH1gKSxjW2VdPWF3YWl0IG0odCk7bigicmVzb3VyY2VzIGxvYWRlZCIpLHI9YXdhaXQgZmV0Y2goZCsiL0ZQQlJlY29nbml0aW9uLndhc20iKSxlPWF3YWl0IHIuYXJyYXlCdWZmZXIoKSx0PW5ldyBXZWJBc3NlbWJseS5NZW1vcnkoe2luaXRpYWw6MSxtYXhpbXVtOjQwOTZ9KSx1PWF3YWl0IHMoe3dhc21CaW5hcnk6ZSx3YXNtTWVtb3J5OnQsb25SdW50aW1lSW5pdGlhbGl6ZWQ6KCk9PnNlbGYucG9zdE1lc3NhZ2Uoe2NtZDoicmVhZHkifSl9KSxuKCJbV29ya2VyXTogUHJlbG9hZGluZyB3YXNtIGluc3RhbmNlIGZyb20gcGF0aDogIitkKyIvRlBCUmVjb2duaXRpb24ud2FzbSIpfWNhdGNoKGUpe2UgaW5zdGFuY2VvZiBSYW5nZUVycm9yP0xvZ2dlci5wcmludEVycm9yKCJJdCBsb29rcyBsaWtlIHlvdSBoYXZlIHRyaWVkIHRvIGluc3RhbnRpYXRlIG1vcmUgbWVtb3J5IHRoYW4gdGhlIGRldmljZSBpcyBhbGxvd2luZywgdGhpcyBtYXkgbWVhbiB0aGF0IG5vdCBlbm91Z2ggbWVtb3J5IGhhcyBiZWVuIGFsbG9jYXRlZCB0byB0aGUgYnJvd3NlciB0YWIgb3IgdGhhdCB0aGUgd2ViIGFwcGxpY2F0aW9uIGlzIGNvbnN1bWluZyBtb3JlIHJlc291cmNlcyB0aGFuIGV4cGVjdGVkLiIpOmUgaW5zdGFuY2VvZiBXZWJBc3NlbWJseS5MaW5rRXJyb3I/dC5wcmludEVycm9yKCJJdCBoYXMgYmVlbiBkZXRlY3RlZCB0aGF0IHRoZSByZXNvdXJjZSBidW5kbGUgZGVsaXZlcmVkIHdpdGggdGhpcyB2ZXJzaW9uIGlzIG5vdCBiZWluZyB1c2VkLiBQbGVhc2UgY2hlY2sgdGhlIHlhcm4ubG9jayBvciBwYWNrYWdlLWxvY2suanNvbiBmaWxlIG9mIHRoZSBwcm9qZWN0IGluIGNhc2UgeW91IGFyZSB1c2luZyB0aGUgV2ViIFNESywgb3RoZXJ3aXNlIG1hbnVhbGx5IHVwZGF0ZSB0aGUgcmVzb3VyY2UgZGlyZWN0b3J5IGFuZCB0cnkgYWdhaW4uIik6dC5wcmludEVycm9yKCJbV29ya2VyXTogIitlKX19KShlLmRhdGEpO2JyZWFrO2Nhc2UiaW5pdCI6KGFzeW5jKCk9Pnt0cnl7Y29uc3QgZT1uZXcgVGV4dERlY29kZXIoInV0Zi04IikuZGVjb2RlKGMucGlwZWxpbmVfd2lkZ2V0V2ViLmJ1ZmZlcik7bGV0IHQ9bnVsbDtjb25zdCByPUpTT04ucGFyc2UoZSksbj1KU09OLnN0cmluZ2lmeShyKTtsZXQgbz1uZXcgdS5QaXBlbGluZUNvbmZpZ3VyYXRpb24obik7KChlLHQscik9Pntjb25zdCBuPShlPT57bGV0IHQ9e307Zm9yKGxldCByPTA7cjxlLnBpcGVsaW5lLmxlbmd0aDtyKyspaWYoMCE9PWUucGlwZWxpbmVbcl0ucmVzb3VyY2VzLmxlbmd0aClmb3IobGV0IG49MDtuPGUucGlwZWxpbmVbcl0ucmVzb3VyY2VzLmxlbmd0aDtuKyspIk1PREVMIj09ZS5waXBlbGluZVtyXS5yZXNvdXJjZXNbbl0udHlwZSYmKHRbZS5waXBlbGluZVtyXS5pZF09ZS5waXBlbGluZVtyXS5yZXNvdXJjZXNbbl0uc291cmNlKTtyZXR1cm4gdH0pKHQpO2Zvcihjb25zdFt0LG9db2YgT2JqZWN0LmVudHJpZXMobikpZS5sb2FkTW9kZWwodCxjW29dLHIpfSkobyxyLHQpLGw9bmV3IHUuUGlwZWxpbmUobyksbnVsbCE9PXQmJnQuZGVsZXRlKCksc2VsZi5wb3N0TWVzc2FnZSh7Y21kOiJpbml0In0pfWNhdGNoKGUpe28oIltXb3JrZXJdOiAiK2UpfX0pKGUuZGF0YSk7YnJlYWs7Y2FzZSJkZXRlY3QiOihhc3luYyBlPT57bGV0IHQ9e2NtZDoiZGV0ZWN0IixyZXN1bHQ6e319O3ZhciBuO3QubXBzPU1hdGgucm91bmQoMS8obj1wLChEYXRlLm5vdygpLW4pLzFlMykqMTAwKS8xMDAscD1EYXRlLm5vdygpO2xldCBhPWUuaW1hZ2UsaT1lLmFjY2Vzc2liaWxpdHkscz1udWxsLGM9bnVsbCxkPW51bGw7dHJ5e3M9bmV3IHUuSW1hZ2UoYSxlLndpZHRoLGUuaGVpZ2h0LDAsMSksbnVsbD09PWYmJihmPW5ldyB1LlBpcGVsaW5lU3RhdGUpLGYuaW5zZXJ0SW1hZ2Uocywib3JpZ2luYWxfaW1hZ2UiLGMpO2xldCBuPShmPWwuZXhlY3V0ZShmLGMpKS5leHRyYWN0VG9Mb2NhdGlvbkNvbmZpZGVuY2UoImRvY3VtZW50X2xvY2F0aW9uX2NvbmZpZGVuY2UiLGMpO2lmKG4uZmlyc3QmJm4uc2Vjb25kLmNvbmZpZGVuY2U+LjY1OSl7aWYobj1mLmV4dHJhY3RUb0RpYWdub3N0aWMoImRpcWFfZGlhZ25vc3RpYyIsYyksbi5maXJzdCYmMSE9PW4uc2Vjb25kLnZhbHVlJiYodC5yZXN1bHQuZGlxYVJlc3VsdD17ZGlhZ25vc3RpYzpuLnNlY29uZH0sbj1mLmV4dHJhY3RUb0Zsb2F0KCJkaXFhX2JsdXIiLGMpLG4uZmlyc3QmJih0LnJlc3VsdC5kaXFhUmVzdWx0LmJsdXI9bi5zZWNvbmQpLG49Zi5leHRyYWN0VG9GbG9hdCgiZGlxYV9leHBvc3VyZSIsYyksbi5maXJzdCYmKHQucmVzdWx0LmRpcWFSZXN1bHQuZXhwb3N1cmU9bi5zZWNvbmQpLG49Zi5leHRyYWN0VG9GbG9hdCgiZGlxYV9leHBvc3VyZV9tZWRpYW4iLGMpLG4uZmlyc3QmJih0LnJlc3VsdC5kaXFhUmVzdWx0LmV4cG9zdXJlTWVkaWFuPW4uc2Vjb25kKSksbj1mLmV4dHJhY3RUb0RpYWdub3N0aWMoImRvY3VtZW50X3NoYXBlX2RpYWdub3N0aWMiLGMpLG4uZmlyc3QmJih0LnJlc3VsdC5zaGFwZUZpbHRlckRpYWdub3N0aWM9e2RpYWdub3N0aWM6bi5zZWNvbmQudmFsdWV9LDEhPT1uLnNlY29uZC52YWx1ZSYmMCE9PW4uc2Vjb25kLnZhbHVlJiYodC5yZXN1bHQuZGlhZ25vc3RpYz1uLnNlY29uZC52YWx1ZSkpLG49Zi5leHRyYWN0VG9EaWFnbm9zdGljKCJkb2N1bWVudF9jYXB0dXJlcl9kaWFnbm9zdGljIixjKSxuLmZpcnN0KXtkPW4uc2Vjb25kO2xldCByPSExO2lmKDA9PT1kLnZhbHVlKXtpZihuPWYuZXh0cmFjdFRvTG9jYXRpb25Db25maWRlbmNlKCJjYXB0dXJlX2Jlc3RfaW1hZ2VfbG9jYXRpb25fY29uZmlkZW5jZSIsYyksdC5yZXN1bHQuZG9jdW1lbnRMb2NhdGlvbj17dG9wUmlnaHQ6e3g6bi5zZWNvbmQubG9jYXRpb25bMF0seTpuLnNlY29uZC5sb2NhdGlvblsxXX0sdG9wTGVmdDp7eDpuLnNlY29uZC5sb2NhdGlvblsyXSx5Om4uc2Vjb25kLmxvY2F0aW9uWzNdfSxib3R0b21SaWdodDp7eDpuLnNlY29uZC5sb2NhdGlvbls0XSx5Om4uc2Vjb25kLmxvY2F0aW9uWzVdfSxib3R0b21MZWZ0Ont4Om4uc2Vjb25kLmxvY2F0aW9uWzZdLHk6bi5zZWNvbmQubG9jYXRpb25bN119fSxuPWYuZXh0cmFjdFRvSW1hZ2UoImJlc3RfaW1hZ2VfYWxpZ25lZCIsYyksbi5maXJzdCYmKHQucmVzdWx0LmRvY3VtZW50SW1hZ2U9e2J1ZmZlcjpuZXcgVWludDhDbGFtcGVkQXJyYXkobi5zZWNvbmQuZGF0YSksd2lkdGg6bi5zZWNvbmQud2lkdGgsaGVpZ2h0Om4uc2Vjb25kLmhlaWdodH0pLHQucmVzdWx0LmltYWdlc0Z1bGxzaXplPXtidWZmZXI6ZS5pbWFnZSx3aWR0aDplLndpZHRoLGhlaWdodDplLmhlaWdodH0sbj1mLmV4dHJhY3RUb0xvY2F0aW9uQ29uZmlkZW5jZSgiZmFjZV9sb2NhdGlvbl9jb25maWRlbmNlIixjKSxuLmZpcnN0Pyh0LnJlc3VsdC5mYWNlRGV0ZWN0PW4uZmlyc3QsdC5yZXN1bHQuZmFjZUxvY2F0aW9uPXt0b3BMZWZ0Ont4Om4uc2Vjb25kLmxvY2F0aW9uWzBdLHk6bi5zZWNvbmQubG9jYXRpb25bMV19LHRvcFJpZ2h0Ont4Om4uc2Vjb25kLmxvY2F0aW9uWzJdLHk6bi5zZWNvbmQubG9jYXRpb25bM119LGJvdHRvbUxlZnQ6e3g6bi5zZWNvbmQubG9jYXRpb25bNF0seTpuLnNlY29uZC5sb2NhdGlvbls1XX0sYm90dG9tUmlnaHQ6e3g6bi5zZWNvbmQubG9jYXRpb25bNl0seTpuLnNlY29uZC5sb2NhdGlvbls3XX19LG49Zi5leHRyYWN0VG9JbWFnZSgiZmFjZV9pbWFnZV9jcm9wcGVkIixjKSxuLmZpcnN0JiYodC5yZXN1bHQuZmFjZUltYWdlPXtidWZmZXI6bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG4uc2Vjb25kLmRhdGEpLHdpZHRoOm4uc2Vjb25kLndpZHRoLGhlaWdodDpuLnNlY29uZC5oZWlnaHR9KSxyPSEwKTp0LnJlc3VsdC5mYWNlRGV0ZWN0PSExLG49Zi5leHRyYWN0VG9Mb2NhdGlvbkNvbmZpZGVuY2UoIm1yel9sb2NhdGlvbl9jb25maWRlbmNlX3RyYW5zZm9ybWVkIixjKSxuLmZpcnN0KXt0LnJlc3VsdC5tcnpEZXRlY3Q9bi5maXJzdCx0LnJlc3VsdC5tcnpMb2NhdGlvbj17dG9wTGVmdDp7eDpuLnNlY29uZC5sb2NhdGlvblswXSx5Om4uc2Vjb25kLmxvY2F0aW9uWzFdfSx0b3BSaWdodDp7eDpuLnNlY29uZC5sb2NhdGlvblsyXSx5Om4uc2Vjb25kLmxvY2F0aW9uWzNdfSxib3R0b21MZWZ0Ont4Om4uc2Vjb25kLmxvY2F0aW9uWzRdLHk6bi5zZWNvbmQubG9jYXRpb25bNV19LGJvdHRvbVJpZ2h0Ont4Om4uc2Vjb25kLmxvY2F0aW9uWzZdLHk6bi5zZWNvbmQubG9jYXRpb25bN119fTtsZXQgZT1mLmV4dHJhY3RUb1N0cmluZygib2NyX3Jlc3VsdCIsYyk7IiIhPT1lJiYodC5yZXN1bHQub2NyUmVzdWx0PWUpfWVsc2UgdC5yZXN1bHQubXJ6RGV0ZWN0PSExO3ImJnQucmVzdWx0LmZhY2VEZXRlY3Q/dC5yZXN1bHQuZGlhZ25vc3RpYz0wOnQucmVzdWx0LmRpYWdub3N0aWM9cj8xMDowfWVsc2UgMTQhPT1kLnZhbHVlJiYxNSE9PWQudmFsdWUmJjE2IT09ZC52YWx1ZSYmKHQucmVzdWx0LmRpYWdub3N0aWM9ZC52YWx1ZSl9fWVsc2UgZi5kZWxldGUoKSxmPW51bGwsaCh0LDcsaSk7cihzLG4sZCl9Y2F0Y2goZSl7dC5yZXN1bHQ9e30saCh0LHtkaWFnbm9zdGljOnt2YWx1ZToxfX0saSksbygiW1dvcmtlcl06ICIrZSkscihzKX1zZWxmLnBvc3RNZXNzYWdlKHQpfSkoZS5kYXRhKTticmVhaztjYXNlInZlcnNpb24iOihhc3luYygpPT57bGV0IGU9e2NtZDoidmVyc2lvbiJ9O2UudmVyc2lvbj11LmdldFZlcnNpb24oKSxzZWxmLnBvc3RNZXNzYWdlKGUpfSkoZS5kYXRhKTticmVhaztjYXNlImRlc3Ryb3kiOihhc3luYygpPT57cih1KSxjbG9zZSgpfSkoZS5kYXRhKTticmVhaztjYXNlInJlc2V0QnVmZmVycyI6KGFzeW5jKCk9PntzZWxmLnBvc3RNZXNzYWdlKHtjbWQ6InJlc2V0QnVmZmVycyJ9KX0pKGUuZGF0YSk7YnJlYWs7ZGVmYXVsdDpuKCJ1bmtub3duTWVzc2FnZSIpfX07")], { type: "text/javascript" }))), y));
  }
  async initializeEngine() {
    try {
      this.__worker.postMessage({ cmd: "preInit", licenseKey: this.__licenseKey, bundlePath: this.__engineLocation + "/FPhi.Engine.Facephi", imageFormat: this.__imageFormat, imageQuality: this.__imageQuality, blurredThreshold: this.__blurredThreshold }), await new Promise((e2) => {
        this.__worker.onmessage = (t2) => {
          "ready" === t2.data.cmd && e2();
        };
      }), this.__worker.postMessage({ cmd: "init" }), await new Promise((e2) => {
        this.__worker.onmessage = (t2) => {
          "init" === t2.data.cmd && e2();
        };
      });
    } catch (e2) {
      throw new Error("Fail to initialize the engine!");
    }
  }
  detectImage(e2) {
    const { width: t2, height: i2 } = e2, a2 = e2.getContext("2d").getImageData(0, 0, t2, i2);
    return this.__worker.postMessage({ cmd: "detect", image: a2.data, width: t2, height: i2, accessibility: this.__accessibility, timestamp: Date.now() }), new Promise((e3) => {
      this.__worker.onmessage = (t3) => {
        "detect" === t3.data.cmd && e3(this.__generateResultObject(t3.data));
      };
    });
  }
  async cleanImageBuffer() {
    return this.__frontDocument = null, this.__faceImage = null, this.__backDocument = null, this.__worker.postMessage({ cmd: "resetBuffers" }), new Promise((e2) => {
      this.__worker.onmessage = (t2) => {
        "resetBuffers" === t2.data.cmd && e2();
      };
    });
  }
  async finalizeEngine() {
    this.__worker.postMessage({ cmd: "destroy" });
  }
  get __attributes() {
    return { licenseKey: { type: "string", property: "__licenseKey" }, bundlePath: { type: "string", property: "__engineLocation" }, imageFormat: { type: "string", property: "__imageFormat" }, imageQuality: { type: "number", property: "__imageQuality" }, accessibility: { type: "boolean", property: "__accessibility" }, blurredThreshold: { type: "number", property: "__blurredThreshold" }, specificData: { type: "string", property: "__specificData" }, scanMode: { type: "number", property: "__scanMode" }, documentType: { type: "number", property: "__documentType" } };
  }
  get __scanResultType() {
    return { [c]: 0, [r]: 1, [o]: 2, [h]: 3, [m]: 4, [R]: 5, [I]: 6, [g]: 7, [F]: 8, [Z]: 9, [U]: 10, [u]: 11, [b]: 12, [V]: 13, [W]: 14, [C]: 15, [p]: 16, [B]: 17, [Q]: 18, [G]: 19, [S]: 20 };
  }
  __mapperToRealConfig(e2) {
    for (const [t2, i2] of Object.entries(e2)) void 0 !== this.__attributes[t2] && (this[this.__attributes[t2].property] = i2);
  }
  __transformDate(e2) {
    try {
      let t2, i2, a2;
      const l2 = Number((/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2));
      return t2 = parseInt(e2.slice(0, 2)) > l2 ? "19" + e2.slice(0, 2) : "20" + e2.slice(0, 2), i2 = e2.slice(2, 4), a2 = e2.slice(4, 7), a2 + "/" + i2 + "/" + t2;
    } catch (e3) {
      return null;
    }
  }
  __generateResultObject(e2) {
    let t2 = {};
    const i2 = {};
    if (t2.diagnostic = this.__scanResultType[e2.result.diagnostic], t2.detectionStatus = { status: this.__scanResultType[e2.result.diagnostic], quad: 0, glare: 0, internalStatus: e2.result.diagnostic }, t2.simpleModeOutput = 0, void 0 !== e2.result.diqaResult && e2.result.diqaResult.blur < this.__blurredThreshold) return this.__generateErrorResultObject(13);
    if (0 === e2.result.diagnostic) {
      if (false !== e2.result.faceDetect) {
        const t3 = e2.result.documentImage.buffer, a2 = e2.result.documentImage.width, l2 = e2.result.documentImage.height;
        this.__frontDocument = new ImageData(new Uint8ClampedArray(t3), a2, l2, i2);
        const d2 = e2.result.faceImage.buffer, s2 = e2.result.faceImage.width, n2 = e2.result.faceImage.height;
        this.__faceImage = new ImageData(new Uint8ClampedArray(d2), s2, n2, i2);
        const c2 = e2.result.imagesFullsize.buffer, r2 = e2.result.imagesFullsize.width, o2 = e2.result.imagesFullsize.height;
        this.__fullsizeFront = new ImageData(new Uint8ClampedArray(c2), r2, o2, i2);
      } else {
        const t3 = e2.result.documentImage.buffer, a2 = e2.result.documentImage.width, l2 = e2.result.documentImage.height;
        this.__backDocument = new ImageData(new Uint8ClampedArray(t3), a2, l2, i2);
        const d2 = e2.result.imagesFullsize.buffer, s2 = e2.result.imagesFullsize.width, n2 = e2.result.imagesFullsize.height;
        this.__fullsizeBack = new ImageData(new Uint8ClampedArray(d2), s2, n2, i2);
      }
      if (t2.images = { frontDocument: this.__convertToImageOutput(this.__frontDocument), faceImage: this.__convertToImageOutput(this.__faceImage), backDocument: this.__convertToImageOutput(this.__backDocument), signatureImage: null }, t2.imagesRaw = { frontDocument: this.__frontDocument, faceImage: this.__faceImage, backDocument: this.__backDocument, signatureImage: null }, t2.imagesFullsize = { frontDocument: this.__convertToImageOutput(this.__fullsizeFront), backDocument: this.__convertToImageOutput(this.__fullsizeBack) }, t2.extractionRaw = {}, this.__mrzRawString = e2.result.ocrResult, false !== e2.result.mrzDetect && void 0 !== this.__mrzRawString && 93 === this.__mrzRawString.length) {
        let e3 = ((e4) => {
          if (null != e4 && "" !== e4) {
            let t3 = {}, i3 = null, a2 = null;
            const l2 = e4.split("\n");
            if (l2.length >= 3) {
              const e5 = new RegExp("([A|C|I][A-Z0-9<]{1})([A-Z]{3})([A-Z0-9<]{9})([0-9<]{1})([A-Z0-9<]{15})"), d2 = new RegExp("([0-9]{6})([0-9]{1})(.{1})([0-9]{6})([0-9]{1})([A-Z]{3})([A-Z0-9<]{11})([0-9]{1})"), s2 = new RegExp("([A-Z0-9<]{30})");
              if (t3.extractionValidated = e5.test(l2[0]) && d2.test(l2[1]) && s2.test(l2[2]), t3.extractionValidated) return i3 = e5.exec(l2[0]), t3.documentType = i3[1], t3.countryEmitterCode = i3[2], t3.documentNumber = i3[3].replaceAll("<", ""), t3.opt1 = i3[5], t3.documentId = i3[5].replaceAll("<", ""), i3 = d2.exec(l2[1]), t3.birthDate = i3[1], t3.gender = i3[3], t3.documentExpiry = i3[4], t3.nationality = i3[6], t3.opt2 = i3[7], i3 = s2.exec(l2[2]), a2 = i3[1].replaceAll(/[<]{3,}/g, "").split("<<").map((e6) => e6.replaceAll("<", " ")), t3.firstName = a2[1], t3.lastName = a2[0], t3;
            }
          }
          return null;
        })(this.__mrzRawString);
        if (null === e3) return this.__generateErrorResultObject(13);
        if ("" !== this.__specificData && 2 === this.__scanMode && N[e3.documentIssuer] !== this.__specificData) return this.__generateErrorResultObject(1);
        t2.extractionRaw.mrz = { rawData: this.__mrzRawString, opt1: e3.opt1, opt2: e3.opt2, firstName: e3.firstName, lastName: e3.lastName, documentId: e3.documentId, documentNumber: e3.documentNumber, documentIssuer: e3.countryEmitterCode, dateOfExpiry: e3.documentExpiry, dateOfBirth: e3.birthDate, gender: e3.gender, nationality: e3.nationality };
      }
    } else t2.diagnostic = e2.result.diagnostic;
    return t2.extractionData = { firstName: X(() => t2.extractionRaw.mrz.firstName) || X(() => t2.extractionRaw.ocr.firstName) || null, lastName: X(() => t2.extractionRaw.mrz.lastName) || X(() => t2.extractionRaw.ocr.lastName) || null, gender: X(() => t2.extractionRaw.mrz.gender) || X(() => t2.extractionRaw.ocr.gender) || null, nationality: X(() => t2.extractionRaw.mrz.nationality) || X(() => t2.extractionRaw.ocr.nationality) || null, dateOfBirth: this.__transformDate(X(() => t2.extractionRaw.mrz.dateOfBirth)) || X(() => t2.extractionRaw.ocr.dateOfBirth) || null, documentId: X(() => t2.extractionRaw.mrz.documentId) || X(() => t2.extractionRaw.ocr.documentId) || null, documentNumber: X(() => t2.extractionRaw.mrz.documentNumber) || X(() => t2.extractionRaw.ocr.documentNumber) || null }, t2;
  }
  __generateErrorResultObject(e2) {
    return { diagnostic: e2 || 1, simpleModeOutput: 0, detectionStatus: { status: e2, glare: 0, quad: 0, internalStatus: e2 } };
  }
  __convertToImageOutput(e2) {
    if (null !== e2) {
      let t2 = document.createElement("canvas"), i2 = t2.getContext("2d");
      return t2.width = e2.width, t2.height = e2.height, i2.putImageData(e2, 0, 0), t2.toDataURL(this.__imageFormat, this.__imageQuality);
    }
    return null;
  }
  __roundUpLenght(e2, t2) {
    return Math.ceil(e2 / t2) * t2;
  }
};
var J = { 620: function(e2, t2) {
  !function(e3) {
    let t3 = 0;
    class i2 {
      constructor(e4) {
        this.action = e4, this.messageID = function() {
          const e5 = t3;
          return t3 += 1, e5;
        }();
      }
    }
    class a2 extends i2 {
      constructor(e4, t4) {
        super(a2.action), this.wasmModuleName = e4.wasmModuleName, this.licenseKey = e4.licenseKey, this.userId = t4, this.registerLoadCallback = null !== e4.loadProgressCallback, this.allowHelloMessage = e4.allowHelloMessage, this.engineLocation = e4.engineLocation, this.wasmType = e4.wasmType, this.initialMemory = e4.initialMemory, this.blinkIDVariant = e4.blinkIdVariant, this.numberOfWorkers = e4.numberOfWorkers;
      }
    }
    var l2, d2, s2, n2, c2;
    a2.action = "init", function(e4) {
      e4[e4.Any = 0] = "Any", e4[e4.Recognizer = 1] = "Recognizer", e4[e4.RecognizerSettings = 2] = "RecognizerSettings", e4[e4.Callback = 3] = "Callback";
    }(l2 || (l2 = {}));
    class r2 extends i2 {
      constructor(e4, t4) {
        super(r2.action), this.className = e4, this.params = t4;
      }
    }
    r2.action = "createNewNativeObject";
    class o2 extends i2 {
      constructor(e4, t4, i3) {
        super(o2.action), this.recognizerHandles = e4, this.allowMultipleResults = t4, this.registeredMetadataCallbacks = i3;
      }
    }
    o2.action = "createRecognizerRunner";
    class h2 extends i2 {
      constructor(e4, t4) {
        super(h2.action), this.recognizerHandles = e4, this.allowMultipleResults = t4;
      }
    }
    h2.action = "reconfigureRecognizerRunner";
    class m2 extends i2 {
      constructor() {
        super(m2.action);
      }
    }
    m2.action = "deleteRecognizerRunner";
    class R2 extends i2 {
      constructor(e4, t4, i3) {
        super(R2.action), this.objectHandle = e4, this.methodName = t4, this.params = i3;
      }
    }
    R2.action = "invokeObject";
    class I2 extends i2 {
      constructor(e4) {
        super(I2.action), this.frame = e4;
      }
      getTransferrables() {
        return [this.frame.imageData.data.buffer];
      }
    }
    I2.action = "processImage";
    class g2 extends i2 {
      constructor(e4) {
        super(g2.action), this.hardReset = e4;
      }
    }
    g2.action = "resetRecognizers";
    class F2 {
      constructor() {
        this.onDebugText = false, this.onDetectionFailed = false, this.onQuadDetection = false, this.onPointsDetection = false, this.onFirstSideResult = false, this.onGlare = false;
      }
    }
    class Z2 extends i2 {
      constructor(e4) {
        super(Z2.action), this.registeredMetadataCallbacks = e4;
      }
    }
    Z2.action = "registerMetadataCallbacks";
    class U2 extends i2 {
      constructor(e4) {
        super(U2.action), this.detectionOnlyMode = e4;
      }
    }
    U2.action = "setDetectionOnly";
    class u2 extends i2 {
      constructor(e4) {
        super(u2.action), this.callbackNonEmpty = e4;
      }
    }
    u2.action = "setClearTimeoutCallback";
    class b2 extends i2 {
      constructor(e4) {
        super(b2.action), this.cameraPreviewMirrored = e4;
      }
    }
    b2.action = "setCameraPreviewMirrored";
    class V2 extends i2 {
      constructor(e4) {
        super(V2.action), this.userId = e4;
      }
    }
    function W2(e4, t4) {
      return (i3) => {
        const a3 = i3;
        a3.success ? e4() : t4(a3.error);
      };
    }
    function C2(e4, t4) {
      return (i3) => {
        const a3 = i3;
        a3.success ? e4(i3) : t4(a3.error);
      };
    }
    V2.action = "getProductIntegrationInfo", function(e4) {
      e4[e4.onDebugText = 0] = "onDebugText", e4[e4.onDetectionFailed = 1] = "onDetectionFailed", e4[e4.onQuadDetection = 2] = "onQuadDetection", e4[e4.onPointsDetection = 3] = "onPointsDetection", e4[e4.onFirstSideResult = 4] = "onFirstSideResult", e4[e4.clearTimeoutCallback = 5] = "clearTimeoutCallback", e4[e4.onGlare = 6] = "onGlare", e4[e4.recognizerCallback = 7] = "recognizerCallback";
    }(d2 || (d2 = {})), (s2 = e3.WasmType || (e3.WasmType = {})).Basic = "BASIC", s2.Advanced = "ADVANCED", s2.AdvancedWithThreads = "ADVANCED_WITH_THREADS";
    class p2 {
      constructor(e4, t4, i3) {
        this.wasmSDKWorker = e4, this.objectHandle = i3, this.recognizerName = t4, this.callbacks = /* @__PURE__ */ new Map();
      }
      getRemoteObjectHandle() {
        return this.objectHandle;
      }
      currentSettings() {
        return new Promise((e4, t4) => {
          if (this.objectHandle < 0) return void t4("Invalid object handle: " + this.objectHandle.toString());
          const i3 = new R2(this.objectHandle, "currentSettings", []), a3 = C2((t5) => {
            e4(t5.result);
          }, t4);
          this.wasmSDKWorker.postMessage(i3, a3);
        });
      }
      toSignedJSON() {
        return new Promise((e4, t4) => {
          if (this.objectHandle < 0) return void t4("Invalid object handle: " + this.objectHandle.toString());
          const i3 = new R2(this.objectHandle, "toSignedJSON", []), a3 = C2((t5) => {
            e4(t5.result);
          }, t4);
          this.wasmSDKWorker.postMessage(i3, a3);
        });
      }
      clearAllCallbacks() {
        this.callbacks.clear(), this.wasmSDKWorker.unregisterRecognizerCallbacks(this.objectHandle);
      }
      removeFunctions(e4) {
        this.clearAllCallbacks();
        const t4 = Object.keys(e4);
        let i3 = false;
        for (const a3 of t4) {
          const t5 = e4[a3];
          if ("function" == typeof t5) {
            this.callbacks.set(a3, t5);
            const d3 = { parameter: { recognizerHandle: this.objectHandle, callbackName: a3 }, type: l2.Callback };
            e4[a3] = d3, i3 = true;
          }
        }
        return i3 && this.wasmSDKWorker.registerRecognizerCallbacks(this.objectHandle, this), e4;
      }
      updateSettings(e4) {
        return new Promise((t4, i3) => {
          if (this.objectHandle < 0) return void i3("Invalid object handle: " + this.objectHandle.toString());
          const a3 = new R2(this.objectHandle, "updateSettings", [{ parameter: this.removeFunctions(e4), type: l2.RecognizerSettings }]), d3 = W2(t4, i3);
          this.wasmSDKWorker.postMessage(a3, d3);
        });
      }
      invokeCallback(e4, t4) {
        const i3 = this.callbacks.get(e4);
        void 0 !== i3 ? i3(...t4) : console.warn("Cannot find callback", e4);
      }
      getResult() {
        return new Promise((e4, t4) => {
          if (this.objectHandle < 0) return void t4("Invalid object handle: " + this.objectHandle.toString());
          const i3 = new R2(this.objectHandle, "getResult", []), a3 = C2((t5) => {
            e4(t5.result);
          }, t4);
          this.wasmSDKWorker.postMessage(i3, a3);
        });
      }
      delete() {
        return new Promise((e4, t4) => {
          if (this.objectHandle < 0) return void t4("Invalid object handle: " + this.objectHandle.toString());
          this.clearAllCallbacks();
          const i3 = new R2(this.objectHandle, "delete", []), a3 = W2(() => {
            this.objectHandle = -1, e4();
          }, t4);
          this.wasmSDKWorker.postMessage(i3, a3);
        });
      }
    }
    function B2(e4) {
      const t4 = new F2();
      return t4.onDebugText = !!e4.onDebugText, t4.onDetectionFailed = !!e4.onDetectionFailed, t4.onPointsDetection = !!e4.onPointsDetection, t4.onQuadDetection = !!e4.onQuadDetection, t4.onFirstSideResult = !!e4.onFirstSideResult, t4.onGlare = !!e4.onGlare, t4;
    }
    class Q2 {
      constructor(e4) {
        this.deleted = false, this.wasmSDKWorker = e4;
      }
      processImage(e4) {
        return new Promise((t4, i3) => {
          if (this.deleted) return void i3("Recognizer runner is deleted. It cannot be used anymore!");
          const a3 = new I2(e4), l3 = C2((e5) => {
            const i4 = e5.recognitionState;
            t4(i4);
          }, i3);
          this.wasmSDKWorker.postTransferrableMessage(a3, l3);
        });
      }
      reconfigureRecognizers(e4, t4) {
        return new Promise((i3, a3) => {
          if (this.deleted) return void a3("Recognizer runner is deleted. It cannot be used anymore!");
          const l3 = G2(e4), d3 = new h2(l3, t4), s3 = W2(i3, a3);
          this.wasmSDKWorker.postMessage(d3, s3);
        });
      }
      setMetadataCallbacks(e4) {
        return new Promise((t4, i3) => {
          const a3 = new Z2(B2(e4)), l3 = W2(t4, i3);
          this.wasmSDKWorker.postMessageAndRegisterCallbacks(a3, e4, l3);
        });
      }
      resetRecognizers(e4) {
        return new Promise((t4, i3) => {
          const a3 = new g2(e4), l3 = W2(t4, i3);
          this.wasmSDKWorker.postMessage(a3, l3);
        });
      }
      setDetectionOnlyMode(e4) {
        return new Promise((t4, i3) => {
          const a3 = new U2(e4), l3 = W2(t4, i3);
          this.wasmSDKWorker.postMessage(a3, l3);
        });
      }
      setClearTimeoutCallback(e4) {
        return new Promise((t4, i3) => {
          const a3 = new u2(null !== e4), l3 = W2(t4, i3);
          this.wasmSDKWorker.registerClearTimeoutCallback(e4), this.wasmSDKWorker.postMessage(a3, l3);
        });
      }
      setCameraPreviewMirrored(e4) {
        return new Promise((t4, i3) => {
          const a3 = new b2(e4), l3 = W2(t4, i3);
          this.wasmSDKWorker.postMessage(a3, l3);
        });
      }
      delete() {
        return this.deleted ? Promise.reject("Recognizer runner is already deleted.") : new Promise((e4, t4) => {
          const i3 = new m2(), a3 = W2(() => {
            this.deleted = true, e4();
          }, t4);
          this.wasmSDKWorker.postMessage(i3, a3);
        });
      }
    }
    function G2(e4) {
      const t4 = [];
      for (const i3 of e4) t4.push(i3.getRemoteObjectHandle());
      return t4;
    }
    class S2 {
      constructor(e4) {
        this.wasmSDKWorker = e4;
      }
      createRecognizerRunner(e4, t4 = false, i3 = {}) {
        return new Promise((a3, l3) => {
          const d3 = G2(e4), s3 = new o2(d3, t4, B2(i3)), n3 = W2(() => {
            a3(new Q2(this.wasmSDKWorker));
          }, l3);
          this.wasmSDKWorker.postMessageAndRegisterCallbacks(s3, i3, n3);
        });
      }
      newRecognizer(e4, ...t4) {
        return new Promise((i3, a3) => {
          const d3 = new r2(e4, function(e5) {
            const t5 = [];
            for (let i4 of e5) {
              let e6 = l2.Any;
              i4 instanceof p2 && (e6 = l2.Recognizer, i4 = i4.getRemoteObjectHandle()), t5.push({ parameter: i4, type: e6 });
            }
            return t5;
          }(t4)), s3 = C2((t5) => {
            const a4 = new p2(this.wasmSDKWorker, e4, t5.objectHandle);
            i3(a4);
          }, a3);
          this.wasmSDKWorker.postMessage(d3, s3);
        });
      }
    }
    class y2 {
      constructor(t4, i3, a3, l3) {
        this.eventHandlers = {}, this.metadataCallbacks = {}, this.clearTimeoutCallback = null, this.loadedWasmType = e3.WasmType.Basic, this.mbWasmWorker = t4, this.mbWasmWorker.onmessage = (e4) => {
          this.handleWorkerEvent(e4);
        }, this.mbWasmWorker.onerror = () => {
          l3("Problem during initialization of worker file!");
        }, this.mbWasmModule = new S2(this), this.loadCallback = i3, this.recognizersWithCallbacks = /* @__PURE__ */ new Map(), this.userId = a3, this.showOverlay = false;
      }
      postMessage(e4, t4) {
        this.eventHandlers[e4.messageID] = t4, this.mbWasmWorker.postMessage(e4);
      }
      postTransferrableMessage(e4, t4) {
        this.eventHandlers[e4.messageID] = t4, this.mbWasmWorker.postMessage(e4, e4.getTransferrables());
      }
      postMessageAndRegisterCallbacks(e4, t4, i3) {
        this.eventHandlers[e4.messageID] = i3, this.metadataCallbacks = t4, this.mbWasmWorker.postMessage(e4);
      }
      registerClearTimeoutCallback(e4) {
        this.clearTimeoutCallback = e4;
      }
      registerRecognizerCallbacks(e4, t4) {
        this.recognizersWithCallbacks.set(e4, t4);
      }
      unregisterRecognizerCallbacks(e4) {
        this.recognizersWithCallbacks.delete(e4);
      }
      delete() {
        this.mbWasmWorker.terminate();
      }
      getProductIntegrationInfo() {
        return new Promise((e4, t4) => {
          const i3 = new V2(this.userId), a3 = C2((t5) => {
            e4(t5.result);
          }, t4);
          this.postMessage(i3, a3);
        });
      }
      handleWorkerEvent(e4) {
        if ("isCallbackMessage" in e4.data) {
          const t4 = e4.data;
          switch (t4.callbackType) {
            case d2.onDebugText:
              "function" == typeof this.metadataCallbacks.onDebugText && this.metadataCallbacks.onDebugText(t4.callbackParameters[0]);
              break;
            case d2.onDetectionFailed:
              "function" == typeof this.metadataCallbacks.onDetectionFailed && this.metadataCallbacks.onDetectionFailed();
              break;
            case d2.onPointsDetection:
              "function" == typeof this.metadataCallbacks.onPointsDetection && this.metadataCallbacks.onPointsDetection(t4.callbackParameters[0]);
              break;
            case d2.onQuadDetection:
              "function" == typeof this.metadataCallbacks.onQuadDetection && this.metadataCallbacks.onQuadDetection(t4.callbackParameters[0]);
              break;
            case d2.onFirstSideResult:
              "function" == typeof this.metadataCallbacks.onFirstSideResult && this.metadataCallbacks.onFirstSideResult();
              break;
            case d2.clearTimeoutCallback:
              this.clearTimeoutCallback && "function" == typeof this.clearTimeoutCallback.onClearTimeout && this.clearTimeoutCallback.onClearTimeout();
              break;
            case d2.onGlare:
              "function" == typeof this.metadataCallbacks.onGlare && this.metadataCallbacks.onGlare(t4.callbackParameters[0]);
              break;
            case d2.recognizerCallback: {
              const e5 = t4.callbackParameters.shift(), i3 = this.recognizersWithCallbacks.get(e5.recognizerHandle);
              void 0 !== i3 ? i3.invokeCallback(e5.callbackName, t4.callbackParameters) : console.warn("Cannot find recognizer to deliver callback message. Maybe it's destroyed?", e5);
              break;
            }
            default:
              throw new Error(`Unknown callback type: ${d2[t4.callbackType]}`);
          }
        } else if ("isLoadProgressMessage" in e4.data) {
          const t4 = e4.data;
          "function" == typeof this.loadCallback && this.loadCallback(t4.progress);
        } else {
          const t4 = e4.data, i3 = this.eventHandlers[t4.messageID];
          delete this.eventHandlers[t4.messageID], i3(t4);
        }
      }
      static async createWasmWorker(e4, t4, i3) {
        return new Promise((l3, d3) => {
          const s3 = new y2(e4, t4.loadProgressCallback, i3, d3), n3 = new a2(t4, i3), c3 = C2((e5) => {
            const t5 = e5;
            s3.showOverlay = t5.showOverlay, s3.loadedWasmType = t5.wasmType, l3(s3);
          }, (e5) => {
            s3 && "function" == typeof s3.delete && s3.delete(), d3(e5);
          });
          s3.postMessage(n3, c3);
        });
      }
    }
    class N2 extends Error {
      constructor(e4, t4) {
        if (super(), !e4.code || !e4.message) throw new Error("Instance of SDKError is required to have code and message.");
        this.message = e4.message, this.code = e4.code, this.details = t4;
      }
    }
    (c2 = e3.ErrorCodes || (e3.ErrorCodes = {})).WORKER_WASM_LOAD_FAILURE = "WORKER_WASM_LOAD_FAILURE", c2.WORKER_WASM_INIT_MISSING = "WORKER_WASM_INIT_MISSING", c2.WORKER_FUNCTION_INVOKE_FAILURE = "WORKER_FUNCTION_INVOKE_FAILURE", c2.WORKER_RECOGNIZER_CREATION_FAILURE = "WORKER_RECOGNIZER_CREATION_FAILURE", c2.WORKER_RUNNER_EXISTS = "WORKER_RUNNER_EXISTS", c2.WORKER_RUNNER_CREATION_FAILURE = "WORKER_RUNNER_CREATION_FAILURE", c2.WORKER_RUNNER_MISSING = "WORKER_RUNNER_MISSING", c2.WORKER_RUNNER_RECONFIGURE_FAILURE = "WORKER_RUNNER_RECONFIGURE_FAILURE", c2.WORKER_RUNNER_DELETED = "WORKER_RUNNER_DELETED", c2.WORKER_RUNNER_DELETE_FAILURE = "WORKER_RUNNER_DELETE_FAILURE", c2.WORKER_OBJECT_INVOKE_FAILURE = "WORKER_OBJECT_INVOKE_FAILURE", c2.WORKER_IMAGE_PROCESS_FAILURE = "WORKER_IMAGE_PROCESS_FAILURE", c2.WORKER_HANDLE_UNDEFINED = "WORKER_HANDLE_UNDEFINED", c2.WORKER_MESSAGE_ACTION_UNKNOWN = "WORKER_MESSAGE_ACTION_UNKNOWN", c2.WORKER_LICENSE_UNLOCK_ERROR = "WORKER_LICENSE_UNLOCK_ERROR", c2.WORKER_INTEGRATION_INFO_FAILURE = "WORKER_INTEGRATION_INFO_FAILURE", c2.LOCAL_SDK_RUNNER_MISSING = "LOCAL_SDK_RUNNER_MISSING", c2.LOCAL_SDK_RUNNER_EMPTY = "LOCAL_SDK_RUNNER_EMPTY", c2.LICENSE_UNLOCK_ERROR = "LICENSE_UNLOCK_ERROR", c2.FRAME_CAPTURE_SVG_UNSUPPORTED = "FRAME_CAPTURE_SVG_UNSUPPORTED", c2.FRAME_CAPTURE_CANVAS_MISSING = "FRAME_CAPTURE_CANVAS_MISSING", c2.SDK_WASM_SETTINGS_MISSING = "SDK_WASM_SETTINGS_MISSING", c2.SDK_LICENSE_KEY_MISSING = "SDK_LICENSE_KEY_MISSING", c2.SDK_WASM_MODULE_NAME_MISSING = "SDK_WASM_MODULE_NAME_MISSING", c2.SDK_ENGINE_LOCATION_INVALID = "SDK_ENGINE_LOCATION_INVALID", c2.SDK_WORKER_LOCATION_INVALID = "SDK_WORKER_LOCATION_INVALID", c2.SDK_MISSING = "SDK_MISSING", c2.SDK_RECOGNIZERS_MISSING = "SDK_RECOGNIZERS_MISSING", c2.VIDEO_RECOGNIZER_ELEMENT_MISSING = "VIDEO_RECOGNIZER_ELEMENT_MISSING", c2.VIDEO_RECOGNIZER_CAMERA_MISSING = "VIDEO_RECOGNIZER_CAMERA_MISSING", c2.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED", c2.VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE", c2.VIDEO_RECOGNIZER_CAMERA_IN_USE = "VIDEO_RECOGNIZER_CAMERA_IN_USE", c2.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED", c2.VIDEO_RECOGNIZER_FEED_RELEASED = "VIDEO_RECOGNIZER_FEED_RELEASED", c2.VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "VIDEO_RECOGNIZER_FEED_NOT_PAUSED", c2.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED", c2.VIDEO_RECOGNIZER_FEED_PAUSED = "VIDEO_RECOGNIZER_FEED_PAUSED", c2.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE", c2.VIDEO_RECOGNIZER_FEED_MISSING = "VIDEO_RECOGNIZER_FEED_MISSING", (n2 = e3.ErrorMessages || (e3.ErrorMessages = {})).WORKER_HANDLE_UNDEFINED = "Cannot find object with handle: undefined", n2.WORKER_WASM_LOAD_FAILURE = "Failed to load WASM in web worker!", n2.WORKER_WASM_INIT_MISSING = "WASM module is not initialized!", n2.WORKER_FUNCTION_INVOKE_FAILURE = "Failed to invoke function!", n2.WORKER_RECOGNIZER_CREATION_FAILURE = "Failed to create new recognizer!", n2.WORKER_RUNNER_EXISTS = "Recognizer runner is already created! Multiple instances are not allowed!", n2.WORKER_RUNNER_CREATION_FAILURE = "Failed to create new recognizer runner!", n2.WORKER_RUNNER_MISSING = "Recognizer runner is not created! There is nothing to reconfigure!", n2.WORKER_RUNNER_RECONFIGURE_FAILURE = "Failed to reconfigure recognizer runner!", n2.WORKER_RUNNER_DELETED = "Recognizer runner is already deleted!", n2.WORKER_RUNNER_DELETE_FAILURE = "Failed to delete recognizer runner!", n2.WORKER_OBJECT_INVOKE_FAILURE = "Failed to invoke object!", n2.WORKER_IMAGE_PROCESS_FAILURE = "Recognizer runner is not initialized! Cannot process image!", n2.WORKER_INTEGRATION_INFO_FAILURE = "Failed to get product integration info!", n2.LOCAL_SDK_RUNNER_MISSING = "Property nativeRecognizerRunner is not available!", n2.LOCAL_SDK_RUNNER_EMPTY = "Native RecognizerRunner cannot be empty!", n2.LICENSE_TOKEN_STATE_INCORRECT = "Internal error (Incorrect token state)", n2.LICENSE_PAYLOAD_VERIFICATION_FAILED = "Failed to verify server permission's digital signature!", n2.LICENSE_PAYLOAD_CORRUPTED = "Server permission payload is corrupted!", n2.LICENSE_PERMISSION_EXPIRED = "Internal error (server permission expired)", n2.LICENSE_REMOTE_LOCKED = "Provided license key has been remotely locked. Please contact support for more information!", n2.FRAME_CAPTURE_SVG_UNSUPPORTED = "Recognition of SVG elements not supported!", n2.FRAME_CAPTURE_CANVAS_MISSING = "Could not get canvas 2d context!", n2.SDK_WASM_SETTINGS_MISSING = "Missing WASM load settings!", n2.SDK_LICENSE_KEY_MISSING = "Missing license key!", n2.SDK_WASM_MODULE_NAME_MISSING = "Missing WASM module name!", n2.SDK_ENGINE_LOCATION_INVALID = "Setting property 'engineLocation' must be a string!", n2.SDK_WORKER_LOCATION_INVALID = "Setting property 'workerLocation' must be a string!", n2.SDK_MISSING = "SDK is not provided!", n2.SDK_RECOGNIZERS_MISSING = "To create RecognizerRunner at least 1 recognizer is required.", n2.VIDEO_RECOGNIZER_ELEMENT_MISSING = "Video element, i.e. camera feed is not provided!", n2.VIDEO_RECOGNIZER_CAMERA_MISSING = "Camera not found!", n2.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED = "Camera not allowed!", n2.VIDEO_RECOGNIZER_CAMERA_UNAVAILABLE = "Camera not available!", n2.VIDEO_RECOGNIZER_CAMERA_IN_USE = "Camera in use!", n2.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED = "Media devices not supported by browser.", n2.VIDEO_RECOGNIZER_FEED_RELEASED = "The associated video feed has been released!", n2.VIDEO_RECOGNIZER_FEED_NOT_PAUSED = "The associated video feed is not paused. Use resumeRecognition instead!", n2.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED = "The play() request was interrupted or prevented by browser security rules!", n2.VIDEO_RECOGNIZER_FEED_PAUSED = "Cannot resume recognition while video feed is paused! Use recognize or startRecognition", n2.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE = "Could not reset recognizers!", n2.VIDEO_RECOGNIZER_FEED_MISSING = "Missing video feed!";
    const X2 = { feedMissing: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_FEED_MISSING, code: e3.ErrorCodes.VIDEO_RECOGNIZER_FEED_MISSING }, recognizersResetFailure: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE, code: e3.ErrorCodes.VIDEO_RECOGNIZER_RECOGNIZERS_RESET_FAILURE }, feedPaused: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_FEED_PAUSED, code: e3.ErrorCodes.VIDEO_RECOGNIZER_FEED_PAUSED }, playRequestInterrupted: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED, code: e3.ErrorCodes.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED }, videoFeedNotPaused: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_FEED_NOT_PAUSED, code: e3.ErrorCodes.VIDEO_RECOGNIZER_FEED_NOT_PAUSED }, videoFeedReleased: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_FEED_RELEASED, code: e3.ErrorCodes.VIDEO_RECOGNIZER_FEED_RELEASED }, mediaDevicesUnsupported: { code: e3.ErrorCodes.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED, message: e3.ErrorMessages.VIDEO_RECOGNIZER_MEDIA_DEVICES_UNSUPPORTED }, cameraMissing: { code: e3.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_MISSING, message: e3.ErrorMessages.VIDEO_RECOGNIZER_CAMERA_MISSING }, cameraNotAllowed: { code: e3.ErrorCodes.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED, message: e3.ErrorMessages.VIDEO_RECOGNIZER_CAMERA_NOT_ALLOWED }, elementMissing: { message: e3.ErrorMessages.VIDEO_RECOGNIZER_ELEMENT_MISSING, code: e3.ErrorCodes.VIDEO_RECOGNIZER_ELEMENT_MISSING } }, A2 = { wasmSettingsMissing: { message: e3.ErrorMessages.SDK_WASM_SETTINGS_MISSING, code: e3.ErrorCodes.SDK_WASM_SETTINGS_MISSING }, licenseKeyMissing: { message: e3.ErrorMessages.SDK_LICENSE_KEY_MISSING, code: e3.ErrorCodes.SDK_LICENSE_KEY_MISSING }, wasmModuleNameMissing: { message: e3.ErrorMessages.SDK_WASM_MODULE_NAME_MISSING, code: e3.ErrorCodes.SDK_WASM_MODULE_NAME_MISSING }, engineLocationInvalid: { message: e3.ErrorMessages.SDK_ENGINE_LOCATION_INVALID, code: e3.ErrorCodes.SDK_ENGINE_LOCATION_INVALID }, workerLocationInvalid: { message: e3.ErrorMessages.SDK_WORKER_LOCATION_INVALID, code: e3.ErrorCodes.SDK_WORKER_LOCATION_INVALID }, missing: { message: e3.ErrorMessages.SDK_MISSING, code: e3.ErrorCodes.SDK_MISSING }, recognizersMissing: { message: e3.ErrorMessages.SDK_RECOGNIZERS_MISSING, code: e3.ErrorCodes.SDK_RECOGNIZERS_MISSING } }, J2 = { svgUnsupported: { message: e3.ErrorMessages.FRAME_CAPTURE_SVG_UNSUPPORTED, code: e3.ErrorCodes.FRAME_CAPTURE_SVG_UNSUPPORTED }, canvasMissing: { message: e3.ErrorMessages.FRAME_CAPTURE_CANVAS_MISSING, code: e3.ErrorCodes.FRAME_CAPTURE_CANVAS_MISSING } }, E2 = { licenseTokenStateIncorrect: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR, message: e3.ErrorMessages.LICENSE_TOKEN_STATE_INCORRECT }, licensePayloadVerificationFailed: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR, message: e3.ErrorMessages.LICENSE_PAYLOAD_VERIFICATION_FAILED }, licensePayloadCorrupted: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR, message: e3.ErrorMessages.LICENSE_PAYLOAD_CORRUPTED }, licensePermissionExpired: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR, message: e3.ErrorMessages.LICENSE_PERMISSION_EXPIRED }, licenseRemoteLocked: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR, message: e3.ErrorMessages.LICENSE_REMOTE_LOCKED }, licenseNetworkError: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR }, licenseInvalid: { code: e3.ErrorCodes.LICENSE_UNLOCK_ERROR } }, k2 = { runnerMissing: { message: e3.ErrorMessages.LOCAL_SDK_RUNNER_MISSING, code: e3.ErrorCodes.LOCAL_SDK_RUNNER_MISSING }, runnerEmpty: { message: e3.ErrorMessages.LOCAL_SDK_RUNNER_EMPTY, code: e3.ErrorCodes.LOCAL_SDK_RUNNER_EMPTY } }, Y2 = { imageProcessFailure: { message: e3.ErrorMessages.WORKER_IMAGE_PROCESS_FAILURE, code: e3.ErrorCodes.WORKER_IMAGE_PROCESS_FAILURE }, objectInvokeFailure: { message: e3.ErrorMessages.WORKER_OBJECT_INVOKE_FAILURE, code: e3.ErrorCodes.WORKER_OBJECT_INVOKE_FAILURE }, runnerDeleteFailure: { message: e3.ErrorMessages.WORKER_RUNNER_DELETE_FAILURE, code: e3.ErrorCodes.WORKER_RUNNER_DELETE_FAILURE }, runnerDeleted: { message: e3.ErrorMessages.WORKER_RUNNER_DELETED, code: e3.ErrorCodes.WORKER_RUNNER_DELETED }, runnerReconfigureFailure: { message: e3.ErrorMessages.WORKER_RUNNER_RECONFIGURE_FAILURE, code: e3.ErrorCodes.WORKER_RUNNER_RECONFIGURE_FAILURE }, runnerMissing: { message: e3.ErrorMessages.WORKER_RUNNER_MISSING, code: e3.ErrorCodes.WORKER_RUNNER_MISSING }, runnerCreationFailure: { message: e3.ErrorMessages.WORKER_RUNNER_CREATION_FAILURE, code: e3.ErrorCodes.WORKER_RUNNER_CREATION_FAILURE }, runnerExists: { message: e3.ErrorMessages.WORKER_RUNNER_EXISTS, code: e3.ErrorCodes.WORKER_RUNNER_EXISTS }, recognizerCreationFailure: { message: e3.ErrorMessages.WORKER_RECOGNIZER_CREATION_FAILURE, code: e3.ErrorCodes.WORKER_RECOGNIZER_CREATION_FAILURE }, functionInvokeFailure: { message: e3.ErrorMessages.WORKER_FUNCTION_INVOKE_FAILURE, code: e3.ErrorCodes.WORKER_FUNCTION_INVOKE_FAILURE }, wasmInitMissing: { message: e3.ErrorMessages.WORKER_WASM_INIT_MISSING, code: e3.ErrorCodes.WORKER_WASM_INIT_MISSING }, wasmLoadFailure: { message: e3.ErrorMessages.WORKER_WASM_LOAD_FAILURE, code: e3.ErrorCodes.WORKER_WASM_LOAD_FAILURE }, handleUndefined: { message: e3.ErrorMessages.WORKER_HANDLE_UNDEFINED, code: e3.ErrorCodes.WORKER_HANDLE_UNDEFINED }, integrationInfoFailure: { message: e3.ErrorMessages.WORKER_INTEGRATION_INFO_FAILURE, code: e3.ErrorCodes.WORKER_INTEGRATION_INFO_FAILURE } };
    var T2;
    (T2 = e3.PreferredCameraType || (e3.PreferredCameraType = {}))[T2.BackFacingCamera = 0] = "BackFacingCamera", T2[T2.FrontFacingCamera = 1] = "FrontFacingCamera";
    const v2 = ["rear", "back", "rück", "arrière", "trasera", "trás", "traseira", "posteriore", "后面", "後面", "背面", "后置", "後置", "背置", "задней", "الخلفية", "후", "arka", "achterzijde", "หลัง", "baksidan", "bagside", "sau", "bak", "tylny", "takakamera", "belakang", "אחורית", "πίσω", "spate", "hátsó", "zadní", "darrere", "zadná", "задня", "stražnja", "belakang", "बैक"], w2 = () => !!navigator.userAgent.match(/Android/i);
    function H2(e4) {
      const t4 = e4.toLowerCase();
      return v2.some((e5) => t4.includes(e5));
    }
    class D2 {
      constructor(e4, t4, i3) {
        this.deviceId = e4.deviceId, this.facing = t4, this.groupId = e4.groupId, this.label = i3 || e4.label;
      }
    }
    async function K2() {
      const t4 = [], i3 = [];
      let a3 = await navigator.mediaDevices.enumerateDevices();
      if (a3.filter((e4) => "videoinput" === e4.kind).every((e4) => "" === e4.label)) {
        const e4 = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
        a3 = await navigator.mediaDevices.enumerateDevices(), e4.getTracks().forEach((e5) => e5.stop());
      }
      const l3 = a3.filter((e4) => "videoinput" === e4.kind);
      let d3 = 0, s3 = 0;
      for (const a4 of l3) if (H2(a4.label)) {
        let t5;
        d3++, w2() && (t5 = `Back camera ${d3}`), i3.push(new D2(a4, e3.PreferredCameraType.BackFacingCamera, t5));
      } else {
        let i4;
        s3++, w2() && (i4 = `Front camera ${s3}`), t4.push(new D2(a4, e3.PreferredCameraType.FrontFacingCamera, i4));
      }
      return { frontCameras: t4, backCameras: i3 };
    }
    async function x2(t4, i3) {
      const { frontCameras: a3, backCameras: l3 } = await K2();
      if (!a3.length && !l3.length) return null;
      let d3 = l3.length > 0 ? l3 : a3;
      i3 === e3.PreferredCameraType.BackFacingCamera && l3.length > 0 && (d3 = l3), i3 === e3.PreferredCameraType.FrontFacingCamera && a3.length > 0 && (d3 = a3), d3 = d3.sort((e4, t5) => e4.label.localeCompare(t5.label));
      let s3 = d3.length - 1;
      const n3 = d3.findIndex((e4) => "Back Triple Camera" === e4.label), c3 = d3.findIndex((e4) => "Back Dual Wide Camera" === e4.label);
      c3 >= 0 && (s3 = c3), n3 >= 0 && (s3 = n3);
      const r3 = d3.map((e4) => {
        const t5 = RegExp(/\b([0-9]+)MP?\b/, "i").exec(e4.label);
        return null !== t5 ? parseInt(t5[1], 10) : NaN;
      });
      if (r3.some((e4) => isNaN(e4)) || (s3 = r3.lastIndexOf(Math.max(...r3))), t4) {
        let e4;
        return e4 = a3.filter((e5) => e5.deviceId === t4)[0], e4 || (e4 = l3.filter((e5) => e5.deviceId === t4)[0]), e4 || null;
      }
      return d3[s3];
    }
    async function L2(t4, i3, a3 = e3.PreferredCameraType.BackFacingCamera) {
      const l3 = { audio: false, video: { width: { min: 640, ideal: 1920, max: 1920 }, height: { min: 480, ideal: 1080, max: 1080 } } };
      if ("" === t4.deviceId) {
        const t5 = a3 === e3.PreferredCameraType.BackFacingCamera;
        l3.video.facingMode = { ideal: t5 ? "environment" : "user" };
      } else l3.video.deviceId = { exact: t4.deviceId };
      const d3 = await navigator.mediaDevices.getUserMedia(l3);
      i3.controls = false, i3.srcObject = d3;
      let s3 = false;
      return t4.facing === e3.PreferredCameraType.FrontFacingCamera && (s3 = true), s3;
    }
    let M2, f2;
    var _2, z2, O2, P2, j2, q2, $2;
    (z2 = e3.ImageOrientation || (e3.ImageOrientation = {}))[z2.RotatedLeft90 = 0] = "RotatedLeft90", z2[z2.NoRotation = 1] = "NoRotation", z2[z2.RotatedRight90 = 2] = "RotatedRight90", z2[z2.Rotated180 = 3] = "Rotated180", (_2 = e3.RecognizerResultState || (e3.RecognizerResultState = {}))[_2.Empty = 0] = "Empty", _2[_2.Uncertain = 1] = "Uncertain", _2[_2.Valid = 2] = "Valid", _2[_2.StageValid = 3] = "StageValid", (j2 = e3.DocumentSide || (e3.DocumentSide = {}))[j2.Front = 0] = "Front", j2[j2.Back = 1] = "Back";
    class ee2 {
      constructor(e4, t4, i3) {
        const a3 = { data: e4.data, width: e4.width, height: e4.height, colorSpace: e4.colorSpace };
        this.imageData = a3, this.orientation = t4, this.videoFrame = i3;
      }
    }
    function te2(t4, i3 = false) {
      let a3, l3, d3 = false;
      if (t4 instanceof HTMLVideoElement) a3 = t4.videoWidth, l3 = t4.videoHeight, d3 = true;
      else if (t4 instanceof HTMLImageElement) a3 = t4.naturalWidth, l3 = t4.naturalHeight;
      else {
        if (t4 instanceof SVGImageElement) throw new N2(J2.svgUnsupported);
        a3 = t4.width, l3 = t4.height;
      }
      if (M2 = M2 || document.createElement("canvas"), M2.width !== a3 && M2.height !== l3 && (M2.width = a3, M2.height = l3), f2 = f2 || M2.getContext("2d", { willReadFrequently: true, alpha: false }), !f2) throw new N2(J2.canvasMissing);
      f2.drawImage(t4, 0, 0, M2.width, M2.height);
      const s3 = i3 ? 0.66 : 1, n3 = M2.width * s3, c3 = M2.height * s3, r3 = (M2.width - n3) / 2, o3 = (M2.height - c3) / 2, h3 = f2.getImageData(r3, o3, n3, c3);
      return new ee2(h3, e3.ImageOrientation.NoRotation, d3);
    }
    function ie2(e4) {
      return { licenseId: e4.licenseId, licensee: e4.licensee, applicationIds: e4.applicationIds, packageName: e4.packageName, platform: "Browser", sdkName: e4.sdkName, sdkVersion: e4.sdkVersion };
    }
    async function ae2(t4, i3) {
      try {
        const a3 = await fetch("https://baltazar.microblink.com/api/v2/status/check", { method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-cache", body: JSON.stringify(ie2(t4)) });
        if (a3.ok) {
          const e4 = (await a3.text()).toString();
          return i3.submitServerPermission(e4);
        }
        return { status: e3.ServerPermissionSubmitResultStatus.NetworkError, lease: 0, networkErrorDescription: `Server responded with status ${a3.status}` };
      } catch (t5) {
        return { status: e3.ServerPermissionSubmitResultStatus.NetworkError, lease: 0, networkErrorDescription: `Unexpected error: ${JSON.stringify(t5)}` };
      }
    }
    (P2 = e3.LicenseTokenState || (e3.LicenseTokenState = {}))[P2.Invalid = 0] = "Invalid", P2[P2.RequiresServerPermission = 1] = "RequiresServerPermission", P2[P2.Valid = 2] = "Valid", (O2 = e3.LicenseErrorType || (e3.LicenseErrorType = {})).LicenseTokenStateInvalid = "LICENSE_TOKEN_STATE_INVALID", O2.NetworkError = "NETWORK_ERROR", O2.RemoteLock = "REMOTE_LOCK", O2.PermissionExpired = "PERMISSION_EXPIRED", O2.PayloadCorrupted = "PAYLOAD_CORRUPTED", O2.PayloadSignatureVerificationFailed = "PAYLOAD_SIGNATURE_VERIFICATION_FAILED", O2.IncorrectTokenState = "INCORRECT_TOKEN_STATE", ($2 = e3.ServerPermissionSubmitResultStatus || (e3.ServerPermissionSubmitResultStatus = {}))[$2.Ok = 0] = "Ok", $2[$2.NetworkError = 1] = "NetworkError", $2[$2.RemoteLock = 2] = "RemoteLock", $2[$2.PermissionExpired = 3] = "PermissionExpired", $2[$2.PayloadCorrupted = 4] = "PayloadCorrupted", $2[$2.PayloadSignatureVerificationFailed = 5] = "PayloadSignatureVerificationFailed", $2[$2.IncorrectTokenState = 6] = "IncorrectTokenState", (q2 = e3.DetectionStatus || (e3.DetectionStatus = {}))[q2.Failed = 0] = "Failed", q2[q2.Success = 1] = "Success", q2[q2.CameraTooFar = 2] = "CameraTooFar", q2[q2.CameraTooClose = 3] = "CameraTooClose", q2[q2.CameraAngleTooSteep = 4] = "CameraAngleTooSteep", q2[q2.DocumentTooCloseToCameraEdge = 5] = "DocumentTooCloseToCameraEdge", q2[q2.DocumentPartiallyVisible = 6] = "DocumentPartiallyVisible", q2[q2.FallbackSuccess = 7] = "FallbackSuccess";
    class le2 extends Error {
      constructor() {
        super("Throttled function aborted"), this.name = "AbortError";
      }
    }
    const de2 = function({ limit: e4, interval: t4, strict: i3 }) {
      if (!Number.isFinite(e4)) throw new TypeError("Expected `limit` to be a finite number");
      if (!Number.isFinite(t4)) throw new TypeError("Expected `interval` to be a finite number");
      const a3 = /* @__PURE__ */ new Map();
      let l3 = 0, d3 = 0;
      const s3 = [], n3 = i3 ? function() {
        const i4 = Date.now();
        if (s3.length < e4) return s3.push(i4), 0;
        const a4 = s3.shift() + t4;
        return i4 >= a4 ? (s3.push(i4), 0) : (s3.push(a4), a4 - i4);
      } : function() {
        const i4 = Date.now();
        return i4 - l3 > t4 ? (d3 = 1, l3 = i4, 0) : (d3 < e4 ? d3++ : (l3 += t4, d3 = 1), l3 - i4);
      };
      return (e5) => {
        const t5 = function(...i4) {
          if (!t5.isEnabled) return (async () => e5.apply(this, i4))();
          let l4;
          return new Promise((t6, d4) => {
            l4 = setTimeout(() => {
              t6(e5.apply(this, i4)), a3.delete(l4);
            }, n3()), a3.set(l4, d4);
          });
        };
        return t5.abort = () => {
          for (const e6 of a3.keys()) clearTimeout(e6), a3.get(e6)(new le2());
          a3.clear(), s3.splice(0, s3.length);
        }, t5.isEnabled = true, Object.defineProperty(t5, "queueSize", { get: () => a3.size }), t5;
      };
    }({ limit: 1, interval: Math.round(1 / 15 * 1e3), strict: true });
    var se2;
    (se2 = e3.VideoRecognitionMode || (e3.VideoRecognitionMode = {}))[se2.Recognition = 0] = "Recognition", se2[se2.RecognitionTest = 1] = "RecognitionTest", se2[se2.DetectionTest = 2] = "DetectionTest";
    class ne2 {
      constructor(t4, i3, a3 = false, l3 = null) {
        this.deviceId = null, this.recognitionCancelRequested = false, this.recognitionPauseRequested = false, this.recognitionTimeoutMs = 2e4, this.timeoutStartedAt = 0, this.currentTimeoutCount = 0, this.videoRecognitionMode = e3.VideoRecognitionMode.Recognition, this.onScanningDone = null, this.cameraFlipped = false, this.isProblematicFocus = false, this.handleFlippingVideo = async () => {
          let e4 = 1, t5 = 1;
          this.isProblematicFocus ? (t5 = 1.5, e4 = 1.5) : (t5 = 1, e4 = 1), this.cameraFlipped && (e4 = -e4), this.videoElement.style.transform = `scale(${e4}, ${t5})`, await this.recognizerRunner.setCameraPreviewMirrored(e4 < 0);
        }, this.flipCamera = async () => {
          this.cameraFlipped = !this.cameraFlipped, await this.handleFlippingVideo();
        }, this.isCameraFlipped = () => this.cameraFlipped, this.setVideoRecognitionMode = async (t5) => {
          this.videoRecognitionMode = t5;
          const i4 = this.videoRecognitionMode === e3.VideoRecognitionMode.DetectionTest;
          await this.recognizerRunner.setDetectionOnlyMode(i4);
        }, this.startRecognition = async (t5, i4 = 2e4) => {
          try {
            await this.videoElement.play();
          } catch (t6) {
            throw new Error(e3.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
          }
          this.recognitionPauseRequested = false, this.recognitionCancelRequested = false, this.clearTimeout(), this.recognitionTimeoutMs = i4, this.onScanningDone = t5, await this.throttledQueueFrame();
        }, this.resumeRecognition = async (t5) => {
          if (t5) try {
            await this.resetRecognizers(true);
          } catch (e4) {
            throw new N2(X2.recognizersResetFailure);
          }
          try {
            await this.videoElement.play();
          } catch (t6) {
            throw new Error(e3.ErrorMessages.VIDEO_RECOGNIZER_PLAY_REQUEST_INTERRUPTED);
          }
          try {
            this.recognitionPauseRequested = false, await this.throttledQueueFrame();
          } catch (e4) {
            this.recognitionPauseRequested = true, console.error(e4);
          }
        }, this.recognize = (e4 = 2e4) => new Promise((t5) => {
          this.startRecognition((e5) => {
            this.pauseVideoFeed(), t5(e5);
          }, e4);
        }), this.pauseVideoFeed = () => {
          this.videoElement.readyState > this.videoElement.HAVE_CURRENT_DATA && !this.videoElement.paused && (this.videoElement.pause(), this.pauseRecognition());
        }, this.pauseRecognition = () => {
          this.recognitionPauseRequested = true;
        }, this.cancelRecognition = () => {
          this.recognitionCancelRequested = true;
        }, this.resetRecognizers = async (e4) => {
          await this.recognizerRunner.resetRecognizers(e4);
        }, this.getRecognizerRunner = () => this.recognizerRunner, this.getVideoElement = () => this.videoElement, this.changeCameraDevice = async (t5) => {
          this.pauseRecognition(), this.releaseVideoFeed(), await L2(t5, this.videoElement, e3.PreferredCameraType.BackFacingCamera), await this.resumeRecognition(true);
        }, this.queueFrame = () => new Promise((e4) => {
          this.frameCallback(() => {
            this.recognitionLoop().then(() => e4());
          });
        }), this.throttledQueueFrame = de2(this.queueFrame), this.recognitionLoop = async () => {
          if (this.recognitionPauseRequested) return;
          if (this.recognitionCancelRequested) return this.clearTimeout(), await this.resetRecognizers(true), this.onScanningDone = null, void (this.recognitionCancelRequested = false);
          const t5 = te2(this.videoElement, this.isProblematicFocus);
          await new Promise((e4) => setTimeout(e4, 0));
          const i4 = await this.recognizerRunner.processImage(t5);
          if (this.videoRecognitionMode === e3.VideoRecognitionMode.DetectionTest || this.videoRecognitionMode === e3.VideoRecognitionMode.RecognitionTest) return await this.recognizerRunner.resetRecognizers(true), this.clearTimeout(), void this.throttledQueueFrame();
          switch (i4) {
            case e3.RecognizerResultState.Valid:
              return this.clearTimeout(), void ("function" == typeof this.onScanningDone && this.onScanningDone(i4));
            case e3.RecognizerResultState.Uncertain: {
              const e4 = performance.now();
              return 0 === this.timeoutStartedAt && (this.timeoutStartedAt = e4), this.currentTimeoutCount = e4 - this.timeoutStartedAt, this.currentTimeoutCount < this.recognitionTimeoutMs ? void this.throttledQueueFrame() : (this.clearTimeout(), void ("function" == typeof this.onScanningDone && this.onScanningDone(i4)));
            }
            case e3.RecognizerResultState.StageValid:
            case e3.RecognizerResultState.Empty:
              return this.clearTimeout(), void this.throttledQueueFrame();
          }
        }, this.clearTimeout = () => {
          this.currentTimeoutCount = 0, this.timeoutStartedAt = 0;
        }, this.releaseVideoFeed = () => {
          this.videoElement && null !== this.videoElement.srcObject && this.videoElement.srcObject instanceof MediaStream && (this.videoElement.srcObject.getTracks().forEach((e4) => e4.stop()), this.videoElement.srcObject = null);
        }, this.videoElement = t4, this.recognizerRunner = i3, this.cameraFlipped = a3, this.deviceId = l3, "requestVideoFrameCallback" in HTMLVideoElement.prototype ? this.frameCallback = this.videoElement.requestVideoFrameCallback.bind(this.videoElement) : this.frameCallback = window.requestAnimationFrame.bind(window), this.handleFlippingVideo(), this.videoElement.setAttribute("playsinline", ""), this.videoElement.setAttribute("mute", "");
      }
      static async createVideoRecognizerFromCameraStream(t4, i3, a3 = null, l3 = e3.PreferredCameraType.BackFacingCamera) {
        if (!(t4 && t4 instanceof HTMLVideoElement)) throw new N2(X2.elementMissing);
        if (!navigator.mediaDevices.getUserMedia) throw new N2(X2.mediaDevicesUnsupported);
        const d3 = await x2(a3, l3);
        if (!d3) throw new N2(X2.cameraMissing);
        const s3 = await L2(d3, t4, l3);
        return new ne2(t4, i3, s3, d3.deviceId);
      }
      static createVideoRecognizerFromVideoPath(e4, t4, i3) {
        const a3 = new ne2(t4, i3);
        return t4.src = e4, t4.currentTime = 0, t4.onended = () => {
          a3.cancelRecognition();
        }, a3;
      }
    }
    const ce2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), re2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1])), oe2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])), he2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])), me2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])), Re2 = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]));
    function Ie2() {
      return /iOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    async function ge2() {
      if (!await (async (e4) => {
        try {
          return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e4);
        } catch (e5) {
          return false;
        }
      })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]))) return false;
      if (!("importScripts" in self)) throw Error("Not implemented");
      return !Ie2() && "Worker" in self;
    }
    function Fe() {
      return ("10000000-1000-4000-8000" + -1e11).replace(/[018]/g, (e4) => (e4 ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e4 / 4).toString(16));
    }
    var Ze, Ue, ue, be, Ve, We, Ce, pe, Be, Qe, Ge, Se, ye;
    (Ze = e3.BarcodeFormat || (e3.BarcodeFormat = {}))[Ze.NONE = 0] = "NONE", Ze[Ze.QR_CODE = 1] = "QR_CODE", Ze[Ze.DATA_MATRIX = 2] = "DATA_MATRIX", Ze[Ze.UPC_E = 3] = "UPC_E", Ze[Ze.UPC_A = 4] = "UPC_A", Ze[Ze.EAN_8 = 5] = "EAN_8", Ze[Ze.EAN_13 = 6] = "EAN_13", Ze[Ze.CODE_128 = 7] = "CODE_128", Ze[Ze.CODE_39 = 8] = "CODE_39", Ze[Ze.ITF = 9] = "ITF", Ze[Ze.AZTEC_BARCODE = 10] = "AZTEC_BARCODE", Ze[Ze.PDF417_BARCODE = 11] = "PDF417_BARCODE", (Se = e3.AnonymizationMode || (e3.AnonymizationMode = {}))[Se.None = 0] = "None", Se[Se.ImageOnly = 1] = "ImageOnly", Se[Se.ResultFieldsOnly = 2] = "ResultFieldsOnly", Se[Se.FullResult = 3] = "FullResult";
    class Ne {
      constructor() {
        this.enableMrzId = true, this.enableMrzPassport = true, this.enableMrzVisa = true, this.enablePhotoId = true, this.enableBarcodeId = true, this.enableFullDocumentRecognition = true;
      }
    }
    class Xe {
      constructor(e4 = 0, t4 = 0, i3 = 0, a3 = 0) {
        this.upFactor = 0, this.downFactor = 0, this.leftFactor = 0, this.rightFactor = 0, this.checkExtensionFactor(e4), this.checkExtensionFactor(t4), this.checkExtensionFactor(i3), this.checkExtensionFactor(a3), this.upFactor = e4, this.downFactor = t4, this.leftFactor = i3, this.rightFactor = a3;
      }
      checkExtensionFactor(e4) {
        if (e4 > 1 || e4 < -1) throw new Error("Extension factor must be in range [-1.0, 1.0]");
      }
    }
    function Ae(e4) {
      if (e4 < 100 || e4 > 400) throw new Error("DPI must be from interval [100, 400]");
    }
    (Qe = e3.BarcodeElementKey || (e3.BarcodeElementKey = {}))[Qe.DocumentType = 0] = "DocumentType", Qe[Qe.StandardVersionNumber = 1] = "StandardVersionNumber", Qe[Qe.CustomerFamilyName = 2] = "CustomerFamilyName", Qe[Qe.CustomerFirstName = 3] = "CustomerFirstName", Qe[Qe.CustomerFullName = 4] = "CustomerFullName", Qe[Qe.DateOfBirth = 5] = "DateOfBirth", Qe[Qe.Sex = 6] = "Sex", Qe[Qe.EyeColor = 7] = "EyeColor", Qe[Qe.AddressStreet = 8] = "AddressStreet", Qe[Qe.AddressCity = 9] = "AddressCity", Qe[Qe.AddressJurisdictionCode = 10] = "AddressJurisdictionCode", Qe[Qe.AddressPostalCode = 11] = "AddressPostalCode", Qe[Qe.FullAddress = 12] = "FullAddress", Qe[Qe.Height = 13] = "Height", Qe[Qe.HeightIn = 14] = "HeightIn", Qe[Qe.HeightCm = 15] = "HeightCm", Qe[Qe.CustomerMiddleName = 16] = "CustomerMiddleName", Qe[Qe.HairColor = 17] = "HairColor", Qe[Qe.NameSuffix = 18] = "NameSuffix", Qe[Qe.AKAFullName = 19] = "AKAFullName", Qe[Qe.AKAFamilyName = 20] = "AKAFamilyName", Qe[Qe.AKAGivenName = 21] = "AKAGivenName", Qe[Qe.AKASuffixName = 22] = "AKASuffixName", Qe[Qe.WeightRange = 23] = "WeightRange", Qe[Qe.WeightPounds = 24] = "WeightPounds", Qe[Qe.WeightKilograms = 25] = "WeightKilograms", Qe[Qe.CustomerIdNumber = 26] = "CustomerIdNumber", Qe[Qe.FamilyNameTruncation = 27] = "FamilyNameTruncation", Qe[Qe.FirstNameTruncation = 28] = "FirstNameTruncation", Qe[Qe.MiddleNameTruncation = 29] = "MiddleNameTruncation", Qe[Qe.PlaceOfBirth = 30] = "PlaceOfBirth", Qe[Qe.AddressStreet2 = 31] = "AddressStreet2", Qe[Qe.RaceEthnicity = 32] = "RaceEthnicity", Qe[Qe.NamePrefix = 33] = "NamePrefix", Qe[Qe.CountryIdentification = 34] = "CountryIdentification", Qe[Qe.ResidenceStreetAddress = 35] = "ResidenceStreetAddress", Qe[Qe.ResidenceStreetAddress2 = 36] = "ResidenceStreetAddress2", Qe[Qe.ResidenceCity = 37] = "ResidenceCity", Qe[Qe.ResidenceJurisdictionCode = 38] = "ResidenceJurisdictionCode", Qe[Qe.ResidencePostalCode = 39] = "ResidencePostalCode", Qe[Qe.ResidenceFullAddress = 40] = "ResidenceFullAddress", Qe[Qe.Under18 = 41] = "Under18", Qe[Qe.Under19 = 42] = "Under19", Qe[Qe.Under21 = 43] = "Under21", Qe[Qe.SocialSecurityNumber = 44] = "SocialSecurityNumber", Qe[Qe.AKASocialSecurityNumber = 45] = "AKASocialSecurityNumber", Qe[Qe.AKAMiddleName = 46] = "AKAMiddleName", Qe[Qe.AKAPrefixName = 47] = "AKAPrefixName", Qe[Qe.OrganDonor = 48] = "OrganDonor", Qe[Qe.Veteran = 49] = "Veteran", Qe[Qe.AKADateOfBirth = 50] = "AKADateOfBirth", Qe[Qe.IssuerIdentificationNumber = 51] = "IssuerIdentificationNumber", Qe[Qe.DocumentExpirationDate = 52] = "DocumentExpirationDate", Qe[Qe.JurisdictionVersionNumber = 53] = "JurisdictionVersionNumber", Qe[Qe.JurisdictionVehicleClass = 54] = "JurisdictionVehicleClass", Qe[Qe.JurisdictionRestrictionCodes = 55] = "JurisdictionRestrictionCodes", Qe[Qe.JurisdictionEndorsementCodes = 56] = "JurisdictionEndorsementCodes", Qe[Qe.DocumentIssueDate = 57] = "DocumentIssueDate", Qe[Qe.FederalCommercialVehicleCodes = 58] = "FederalCommercialVehicleCodes", Qe[Qe.IssuingJurisdiction = 59] = "IssuingJurisdiction", Qe[Qe.StandardVehicleClassification = 60] = "StandardVehicleClassification", Qe[Qe.IssuingJurisdictionName = 61] = "IssuingJurisdictionName", Qe[Qe.StandardEndorsementCode = 62] = "StandardEndorsementCode", Qe[Qe.StandardRestrictionCode = 63] = "StandardRestrictionCode", Qe[Qe.JurisdictionVehicleClassificationDescription = 64] = "JurisdictionVehicleClassificationDescription", Qe[Qe.JurisdictionEndorsmentCodeDescription = 65] = "JurisdictionEndorsmentCodeDescription", Qe[Qe.JurisdictionRestrictionCodeDescription = 66] = "JurisdictionRestrictionCodeDescription", Qe[Qe.InventoryControlNumber = 67] = "InventoryControlNumber", Qe[Qe.CardRevisionDate = 68] = "CardRevisionDate", Qe[Qe.DocumentDiscriminator = 69] = "DocumentDiscriminator", Qe[Qe.LimitedDurationDocument = 70] = "LimitedDurationDocument", Qe[Qe.AuditInformation = 71] = "AuditInformation", Qe[Qe.ComplianceType = 72] = "ComplianceType", Qe[Qe.IssueTimestamp = 73] = "IssueTimestamp", Qe[Qe.PermitExpirationDate = 74] = "PermitExpirationDate", Qe[Qe.PermitIdentifier = 75] = "PermitIdentifier", Qe[Qe.PermitIssueDate = 76] = "PermitIssueDate", Qe[Qe.NumberOfDuplicates = 77] = "NumberOfDuplicates", Qe[Qe.HAZMATExpirationDate = 78] = "HAZMATExpirationDate", Qe[Qe.MedicalIndicator = 79] = "MedicalIndicator", Qe[Qe.NonResident = 80] = "NonResident", Qe[Qe.UniqueCustomerId = 81] = "UniqueCustomerId", Qe[Qe.DataDiscriminator = 82] = "DataDiscriminator", Qe[Qe.DocumentExpirationMonth = 83] = "DocumentExpirationMonth", Qe[Qe.DocumentNonexpiring = 84] = "DocumentNonexpiring", Qe[Qe.SecurityVersion = 85] = "SecurityVersion", Qe[Qe.Count = 86] = "Count", (Be = e3.Country || (e3.Country = {}))[Be.NONE = 0] = "NONE", Be[Be.ALBANIA = 1] = "ALBANIA", Be[Be.ALGERIA = 2] = "ALGERIA", Be[Be.ARGENTINA = 3] = "ARGENTINA", Be[Be.AUSTRALIA = 4] = "AUSTRALIA", Be[Be.AUSTRIA = 5] = "AUSTRIA", Be[Be.AZERBAIJAN = 6] = "AZERBAIJAN", Be[Be.BAHRAIN = 7] = "BAHRAIN", Be[Be.BANGLADESH = 8] = "BANGLADESH", Be[Be.BELGIUM = 9] = "BELGIUM", Be[Be.BOSNIA_AND_HERZEGOVINA = 10] = "BOSNIA_AND_HERZEGOVINA", Be[Be.BRUNEI = 11] = "BRUNEI", Be[Be.BULGARIA = 12] = "BULGARIA", Be[Be.CAMBODIA = 13] = "CAMBODIA", Be[Be.CANADA = 14] = "CANADA", Be[Be.CHILE = 15] = "CHILE", Be[Be.COLOMBIA = 16] = "COLOMBIA", Be[Be.COSTA_RICA = 17] = "COSTA_RICA", Be[Be.CROATIA = 18] = "CROATIA", Be[Be.CYPRUS = 19] = "CYPRUS", Be[Be.CZECHIA = 20] = "CZECHIA", Be[Be.DENMARK = 21] = "DENMARK", Be[Be.DOMINICAN_REPUBLIC = 22] = "DOMINICAN_REPUBLIC", Be[Be.EGYPT = 23] = "EGYPT", Be[Be.ESTONIA = 24] = "ESTONIA", Be[Be.FINLAND = 25] = "FINLAND", Be[Be.FRANCE = 26] = "FRANCE", Be[Be.GEORGIA = 27] = "GEORGIA", Be[Be.GERMANY = 28] = "GERMANY", Be[Be.GHANA = 29] = "GHANA", Be[Be.GREECE = 30] = "GREECE", Be[Be.GUATEMALA = 31] = "GUATEMALA", Be[Be.HONG_KONG = 32] = "HONG_KONG", Be[Be.HUNGARY = 33] = "HUNGARY", Be[Be.INDIA = 34] = "INDIA", Be[Be.INDONESIA = 35] = "INDONESIA", Be[Be.IRELAND = 36] = "IRELAND", Be[Be.ISRAEL = 37] = "ISRAEL", Be[Be.ITALY = 38] = "ITALY", Be[Be.JORDAN = 39] = "JORDAN", Be[Be.KAZAKHSTAN = 40] = "KAZAKHSTAN", Be[Be.KENYA = 41] = "KENYA", Be[Be.KOSOVO = 42] = "KOSOVO", Be[Be.KUWAIT = 43] = "KUWAIT", Be[Be.LATVIA = 44] = "LATVIA", Be[Be.LITHUANIA = 45] = "LITHUANIA", Be[Be.MALAYSIA = 46] = "MALAYSIA", Be[Be.MALDIVES = 47] = "MALDIVES", Be[Be.MALTA = 48] = "MALTA", Be[Be.MAURITIUS = 49] = "MAURITIUS", Be[Be.MEXICO = 50] = "MEXICO", Be[Be.MOROCCO = 51] = "MOROCCO", Be[Be.NETHERLANDS = 52] = "NETHERLANDS", Be[Be.NEW_ZEALAND = 53] = "NEW_ZEALAND", Be[Be.NIGERIA = 54] = "NIGERIA", Be[Be.PAKISTAN = 55] = "PAKISTAN", Be[Be.PANAMA = 56] = "PANAMA", Be[Be.PARAGUAY = 57] = "PARAGUAY", Be[Be.PHILIPPINES = 58] = "PHILIPPINES", Be[Be.POLAND = 59] = "POLAND", Be[Be.PORTUGAL = 60] = "PORTUGAL", Be[Be.PUERTO_RICO = 61] = "PUERTO_RICO", Be[Be.QATAR = 62] = "QATAR", Be[Be.ROMANIA = 63] = "ROMANIA", Be[Be.RUSSIA = 64] = "RUSSIA", Be[Be.SAUDI_ARABIA = 65] = "SAUDI_ARABIA", Be[Be.SERBIA = 66] = "SERBIA", Be[Be.SINGAPORE = 67] = "SINGAPORE", Be[Be.SLOVAKIA = 68] = "SLOVAKIA", Be[Be.SLOVENIA = 69] = "SLOVENIA", Be[Be.SOUTH_AFRICA = 70] = "SOUTH_AFRICA", Be[Be.SPAIN = 71] = "SPAIN", Be[Be.SWEDEN = 72] = "SWEDEN", Be[Be.SWITZERLAND = 73] = "SWITZERLAND", Be[Be.TAIWAN = 74] = "TAIWAN", Be[Be.THAILAND = 75] = "THAILAND", Be[Be.TUNISIA = 76] = "TUNISIA", Be[Be.TURKEY = 77] = "TURKEY", Be[Be.UAE = 78] = "UAE", Be[Be.UGANDA = 79] = "UGANDA", Be[Be.UK = 80] = "UK", Be[Be.UKRAINE = 81] = "UKRAINE", Be[Be.USA = 82] = "USA", Be[Be.VIETNAM = 83] = "VIETNAM", Be[Be.BRAZIL = 84] = "BRAZIL", Be[Be.NORWAY = 85] = "NORWAY", Be[Be.OMAN = 86] = "OMAN", Be[Be.ECUADOR = 87] = "ECUADOR", Be[Be.EL_SALVADOR = 88] = "EL_SALVADOR", Be[Be.SRI_LANKA = 89] = "SRI_LANKA", Be[Be.PERU = 90] = "PERU", Be[Be.URUGUAY = 91] = "URUGUAY", Be[Be.BAHAMAS = 92] = "BAHAMAS", Be[Be.BERMUDA = 93] = "BERMUDA", Be[Be.BOLIVIA = 94] = "BOLIVIA", Be[Be.CHINA = 95] = "CHINA", Be[Be.EUROPEAN_UNION = 96] = "EUROPEAN_UNION", Be[Be.HAITI = 97] = "HAITI", Be[Be.HONDURAS = 98] = "HONDURAS", Be[Be.ICELAND = 99] = "ICELAND", Be[Be.JAPAN = 100] = "JAPAN", Be[Be.LUXEMBOURG = 101] = "LUXEMBOURG", Be[Be.MONTENEGRO = 102] = "MONTENEGRO", Be[Be.NICARAGUA = 103] = "NICARAGUA", Be[Be.SOUTH_KOREA = 104] = "SOUTH_KOREA", Be[Be.VENEZUELA = 105] = "VENEZUELA", Be[Be.AFGHANISTAN = 106] = "AFGHANISTAN", Be[Be.ALAND_ISLANDS = 107] = "ALAND_ISLANDS", Be[Be.AMERICAN_SAMOA = 108] = "AMERICAN_SAMOA", Be[Be.ANDORRA = 109] = "ANDORRA", Be[Be.ANGOLA = 110] = "ANGOLA", Be[Be.ANGUILLA = 111] = "ANGUILLA", Be[Be.ANTARCTICA = 112] = "ANTARCTICA", Be[Be.ANTIGUA_AND_BARBUDA = 113] = "ANTIGUA_AND_BARBUDA", Be[Be.ARMENIA = 114] = "ARMENIA", Be[Be.ARUBA = 115] = "ARUBA", Be[Be.BAILIWICK_OF_GUERNSEY = 116] = "BAILIWICK_OF_GUERNSEY", Be[Be.BAILIWICK_OF_JERSEY = 117] = "BAILIWICK_OF_JERSEY", Be[Be.BARBADOS = 118] = "BARBADOS", Be[Be.BELARUS = 119] = "BELARUS", Be[Be.BELIZE = 120] = "BELIZE", Be[Be.BENIN = 121] = "BENIN", Be[Be.BHUTAN = 122] = "BHUTAN", Be[Be.BONAIRE_SAINT_EUSTATIUS_AND_SABA = 123] = "BONAIRE_SAINT_EUSTATIUS_AND_SABA", Be[Be.BOTSWANA = 124] = "BOTSWANA", Be[Be.BOUVET_ISLAND = 125] = "BOUVET_ISLAND", Be[Be.BRITISH_INDIAN_OCEAN_TERRITORY = 126] = "BRITISH_INDIAN_OCEAN_TERRITORY", Be[Be.BURKINA_FASO = 127] = "BURKINA_FASO", Be[Be.BURUNDI = 128] = "BURUNDI", Be[Be.CAMEROON = 129] = "CAMEROON", Be[Be.CAPE_VERDE = 130] = "CAPE_VERDE", Be[Be.CARIBBEAN_NETHERLANDS = 131] = "CARIBBEAN_NETHERLANDS", Be[Be.CAYMAN_ISLANDS = 132] = "CAYMAN_ISLANDS", Be[Be.CENTRAL_AFRICAN_REPUBLIC = 133] = "CENTRAL_AFRICAN_REPUBLIC", Be[Be.CHAD = 134] = "CHAD", Be[Be.CHRISTMAS_ISLAND = 135] = "CHRISTMAS_ISLAND", Be[Be.COCOS_ISLANDS = 136] = "COCOS_ISLANDS", Be[Be.COMOROS = 137] = "COMOROS", Be[Be.CONGO = 138] = "CONGO", Be[Be.COOK_ISLANDS = 139] = "COOK_ISLANDS", Be[Be.CUBA = 140] = "CUBA", Be[Be.CURACAO = 141] = "CURACAO", Be[Be.DEMOCRATIC_REPUBLIC_OF_THE_CONGO = 142] = "DEMOCRATIC_REPUBLIC_OF_THE_CONGO", Be[Be.DJIBOUTI = 143] = "DJIBOUTI", Be[Be.DOMINICA = 144] = "DOMINICA", Be[Be.EAST_TIMOR = 145] = "EAST_TIMOR", Be[Be.EQUATORIAL_GUINEA = 146] = "EQUATORIAL_GUINEA", Be[Be.ERITREA = 147] = "ERITREA", Be[Be.ETHIOPIA = 148] = "ETHIOPIA", Be[Be.FALKLAND_ISLANDS = 149] = "FALKLAND_ISLANDS", Be[Be.FAROE_ISLANDS = 150] = "FAROE_ISLANDS", Be[Be.FEDERATED_STATES_OF_MICRONESIA = 151] = "FEDERATED_STATES_OF_MICRONESIA", Be[Be.FIJI = 152] = "FIJI", Be[Be.FRENCH_GUIANA = 153] = "FRENCH_GUIANA", Be[Be.FRENCH_POLYNESIA = 154] = "FRENCH_POLYNESIA", Be[Be.FRENCH_SOUTHERN_TERRITORIES = 155] = "FRENCH_SOUTHERN_TERRITORIES", Be[Be.GABON = 156] = "GABON", Be[Be.GAMBIA = 157] = "GAMBIA", Be[Be.GIBRALTAR = 158] = "GIBRALTAR", Be[Be.GREENLAND = 159] = "GREENLAND", Be[Be.GRENADA = 160] = "GRENADA", Be[Be.GUADELOUPE = 161] = "GUADELOUPE", Be[Be.GUAM = 162] = "GUAM", Be[Be.GUINEA = 163] = "GUINEA", Be[Be.GUINEA_BISSAU = 164] = "GUINEA_BISSAU", Be[Be.GUYANA = 165] = "GUYANA", Be[Be.HEARD_ISLAND_AND_MCDONALD_ISLANDS = 166] = "HEARD_ISLAND_AND_MCDONALD_ISLANDS", Be[Be.IRAN = 167] = "IRAN", Be[Be.IRAQ = 168] = "IRAQ", Be[Be.ISLE_OF_MAN = 169] = "ISLE_OF_MAN", Be[Be.IVORY_COAST = 170] = "IVORY_COAST", Be[Be.JAMAICA = 171] = "JAMAICA", Be[Be.KIRIBATI = 172] = "KIRIBATI", Be[Be.KYRGYZSTAN = 173] = "KYRGYZSTAN", Be[Be.LAOS = 174] = "LAOS", Be[Be.LEBANON = 175] = "LEBANON", Be[Be.LESOTHO = 176] = "LESOTHO", Be[Be.LIBERIA = 177] = "LIBERIA", Be[Be.LIBYA = 178] = "LIBYA", Be[Be.LIECHTENSTEIN = 179] = "LIECHTENSTEIN", Be[Be.MACAU = 180] = "MACAU", Be[Be.MADAGASCAR = 181] = "MADAGASCAR", Be[Be.MALAWI = 182] = "MALAWI", Be[Be.MALI = 183] = "MALI", Be[Be.MARSHALL_ISLANDS = 184] = "MARSHALL_ISLANDS", Be[Be.MARTINIQUE = 185] = "MARTINIQUE", Be[Be.MAURITANIA = 186] = "MAURITANIA", Be[Be.MAYOTTE = 187] = "MAYOTTE", Be[Be.MOLDOVA = 188] = "MOLDOVA", Be[Be.MONACO = 189] = "MONACO", Be[Be.MONGOLIA = 190] = "MONGOLIA", Be[Be.MONTSERRAT = 191] = "MONTSERRAT", Be[Be.MOZAMBIQUE = 192] = "MOZAMBIQUE", Be[Be.MYANMAR = 193] = "MYANMAR", Be[Be.NAMIBIA = 194] = "NAMIBIA", Be[Be.NAURU = 195] = "NAURU", Be[Be.NEPAL = 196] = "NEPAL", Be[Be.NEW_CALEDONIA = 197] = "NEW_CALEDONIA", Be[Be.NIGER = 198] = "NIGER", Be[Be.NIUE = 199] = "NIUE", Be[Be.NORFOLK_ISLAND = 200] = "NORFOLK_ISLAND", Be[Be.NORTHERN_CYPRUS = 201] = "NORTHERN_CYPRUS", Be[Be.NORTHERN_MARIANA_ISLANDS = 202] = "NORTHERN_MARIANA_ISLANDS", Be[Be.NORTH_KOREA = 203] = "NORTH_KOREA", Be[Be.NORTH_MACEDONIA = 204] = "NORTH_MACEDONIA", Be[Be.PALAU = 205] = "PALAU", Be[Be.PALESTINE = 206] = "PALESTINE", Be[Be.PAPUA_NEW_GUINEA = 207] = "PAPUA_NEW_GUINEA", Be[Be.PITCAIRN = 208] = "PITCAIRN", Be[Be.REUNION = 209] = "REUNION", Be[Be.RWANDA = 210] = "RWANDA", Be[Be.SAINT_BARTHELEMY = 211] = "SAINT_BARTHELEMY", Be[Be.SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA = 212] = "SAINT_HELENA_ASCENSION_AND_TRISTIAN_DA_CUNHA", Be[Be.SAINT_KITTS_AND_NEVIS = 213] = "SAINT_KITTS_AND_NEVIS", Be[Be.SAINT_LUCIA = 214] = "SAINT_LUCIA", Be[Be.SAINT_MARTIN = 215] = "SAINT_MARTIN", Be[Be.SAINT_PIERRE_AND_MIQUELON = 216] = "SAINT_PIERRE_AND_MIQUELON", Be[Be.SAINT_VINCENT_AND_THE_GRENADINES = 217] = "SAINT_VINCENT_AND_THE_GRENADINES", Be[Be.SAMOA = 218] = "SAMOA", Be[Be.SAN_MARINO = 219] = "SAN_MARINO", Be[Be.SAO_TOME_AND_PRINCIPE = 220] = "SAO_TOME_AND_PRINCIPE", Be[Be.SENEGAL = 221] = "SENEGAL", Be[Be.SEYCHELLES = 222] = "SEYCHELLES", Be[Be.SIERRA_LEONE = 223] = "SIERRA_LEONE", Be[Be.SINT_MAARTEN = 224] = "SINT_MAARTEN", Be[Be.SOLOMON_ISLANDS = 225] = "SOLOMON_ISLANDS", Be[Be.SOMALIA = 226] = "SOMALIA", Be[Be.SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS = 227] = "SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS", Be[Be.SOUTH_SUDAN = 228] = "SOUTH_SUDAN", Be[Be.SUDAN = 229] = "SUDAN", Be[Be.SURINAME = 230] = "SURINAME", Be[Be.SVALBARD_AND_JAN_MAYEN = 231] = "SVALBARD_AND_JAN_MAYEN", Be[Be.ESWATINI = 232] = "ESWATINI", Be[Be.SYRIA = 233] = "SYRIA", Be[Be.TAJIKISTAN = 234] = "TAJIKISTAN", Be[Be.TANZANIA = 235] = "TANZANIA", Be[Be.TOGO = 236] = "TOGO", Be[Be.TOKELAU = 237] = "TOKELAU", Be[Be.TONGA = 238] = "TONGA", Be[Be.TRINIDAD_AND_TOBAGO = 239] = "TRINIDAD_AND_TOBAGO", Be[Be.TURKMENISTAN = 240] = "TURKMENISTAN", Be[Be.TURKS_AND_CAICOS_ISLANDS = 241] = "TURKS_AND_CAICOS_ISLANDS", Be[Be.TUVALU = 242] = "TUVALU", Be[Be.UNITED_STATES_MINOR_OUTLYING_ISLANDS = 243] = "UNITED_STATES_MINOR_OUTLYING_ISLANDS", Be[Be.UZBEKISTAN = 244] = "UZBEKISTAN", Be[Be.VANUATU = 245] = "VANUATU", Be[Be.VATICAN_CITY = 246] = "VATICAN_CITY", Be[Be.VIRGIN_ISLANDS_BRITISH = 247] = "VIRGIN_ISLANDS_BRITISH", Be[Be.VIRGIN_ISLANDS_US = 248] = "VIRGIN_ISLANDS_US", Be[Be.WALLIS_AND_FUTUNA = 249] = "WALLIS_AND_FUTUNA", Be[Be.WESTERN_SAHARA = 250] = "WESTERN_SAHARA", Be[Be.YEMEN = 251] = "YEMEN", Be[Be.YUGOSLAVIA = 252] = "YUGOSLAVIA", Be[Be.ZAMBIA = 253] = "ZAMBIA", Be[Be.ZIMBABWE = 254] = "ZIMBABWE", Be[Be.SCHENGEN_AREA = 255] = "SCHENGEN_AREA", Be[Be.COUNT = 256] = "COUNT", (pe = e3.Region || (e3.Region = {}))[pe.NONE = 0] = "NONE", pe[pe.ALABAMA = 1] = "ALABAMA", pe[pe.ALASKA = 2] = "ALASKA", pe[pe.ALBERTA = 3] = "ALBERTA", pe[pe.ARIZONA = 4] = "ARIZONA", pe[pe.ARKANSAS = 5] = "ARKANSAS", pe[pe.AUSTRALIAN_CAPITAL_TERRITORY = 6] = "AUSTRALIAN_CAPITAL_TERRITORY", pe[pe.BRITISH_COLUMBIA = 7] = "BRITISH_COLUMBIA", pe[pe.CALIFORNIA = 8] = "CALIFORNIA", pe[pe.COLORADO = 9] = "COLORADO", pe[pe.CONNECTICUT = 10] = "CONNECTICUT", pe[pe.DELAWARE = 11] = "DELAWARE", pe[pe.DISTRICT_OF_COLUMBIA = 12] = "DISTRICT_OF_COLUMBIA", pe[pe.FLORIDA = 13] = "FLORIDA", pe[pe.GEORGIA = 14] = "GEORGIA", pe[pe.HAWAII = 15] = "HAWAII", pe[pe.IDAHO = 16] = "IDAHO", pe[pe.ILLINOIS = 17] = "ILLINOIS", pe[pe.INDIANA = 18] = "INDIANA", pe[pe.IOWA = 19] = "IOWA", pe[pe.KANSAS = 20] = "KANSAS", pe[pe.KENTUCKY = 21] = "KENTUCKY", pe[pe.LOUISIANA = 22] = "LOUISIANA", pe[pe.MAINE = 23] = "MAINE", pe[pe.MANITOBA = 24] = "MANITOBA", pe[pe.MARYLAND = 25] = "MARYLAND", pe[pe.MASSACHUSETTS = 26] = "MASSACHUSETTS", pe[pe.MICHIGAN = 27] = "MICHIGAN", pe[pe.MINNESOTA = 28] = "MINNESOTA", pe[pe.MISSISSIPPI = 29] = "MISSISSIPPI", pe[pe.MISSOURI = 30] = "MISSOURI", pe[pe.MONTANA = 31] = "MONTANA", pe[pe.NEBRASKA = 32] = "NEBRASKA", pe[pe.NEVADA = 33] = "NEVADA", pe[pe.NEW_BRUNSWICK = 34] = "NEW_BRUNSWICK", pe[pe.NEW_HAMPSHIRE = 35] = "NEW_HAMPSHIRE", pe[pe.NEW_JERSEY = 36] = "NEW_JERSEY", pe[pe.NEW_MEXICO = 37] = "NEW_MEXICO", pe[pe.NEW_SOUTH_WALES = 38] = "NEW_SOUTH_WALES", pe[pe.NEW_YORK = 39] = "NEW_YORK", pe[pe.NORTHERN_TERRITORY = 40] = "NORTHERN_TERRITORY", pe[pe.NORTH_CAROLINA = 41] = "NORTH_CAROLINA", pe[pe.NORTH_DAKOTA = 42] = "NORTH_DAKOTA", pe[pe.NOVA_SCOTIA = 43] = "NOVA_SCOTIA", pe[pe.OHIO = 44] = "OHIO", pe[pe.OKLAHOMA = 45] = "OKLAHOMA", pe[pe.ONTARIO = 46] = "ONTARIO", pe[pe.OREGON = 47] = "OREGON", pe[pe.PENNSYLVANIA = 48] = "PENNSYLVANIA", pe[pe.QUEBEC = 49] = "QUEBEC", pe[pe.QUEENSLAND = 50] = "QUEENSLAND", pe[pe.RHODE_ISLAND = 51] = "RHODE_ISLAND", pe[pe.SASKATCHEWAN = 52] = "SASKATCHEWAN", pe[pe.SOUTH_AUSTRALIA = 53] = "SOUTH_AUSTRALIA", pe[pe.SOUTH_CAROLINA = 54] = "SOUTH_CAROLINA", pe[pe.SOUTH_DAKOTA = 55] = "SOUTH_DAKOTA", pe[pe.TASMANIA = 56] = "TASMANIA", pe[pe.TENNESSEE = 57] = "TENNESSEE", pe[pe.TEXAS = 58] = "TEXAS", pe[pe.UTAH = 59] = "UTAH", pe[pe.VERMONT = 60] = "VERMONT", pe[pe.VICTORIA = 61] = "VICTORIA", pe[pe.VIRGINIA = 62] = "VIRGINIA", pe[pe.WASHINGTON = 63] = "WASHINGTON", pe[pe.WESTERN_AUSTRALIA = 64] = "WESTERN_AUSTRALIA", pe[pe.WEST_VIRGINIA = 65] = "WEST_VIRGINIA", pe[pe.WISCONSIN = 66] = "WISCONSIN", pe[pe.WYOMING = 67] = "WYOMING", pe[pe.YUKON = 68] = "YUKON", pe[pe.CIUDAD_DE_MEXICO = 69] = "CIUDAD_DE_MEXICO", pe[pe.JALISCO = 70] = "JALISCO", pe[pe.NEWFOUNDLAND_AND_LABRADOR = 71] = "NEWFOUNDLAND_AND_LABRADOR", pe[pe.NUEVO_LEON = 72] = "NUEVO_LEON", pe[pe.BAJA_CALIFORNIA = 73] = "BAJA_CALIFORNIA", pe[pe.CHIHUAHUA = 74] = "CHIHUAHUA", pe[pe.GUANAJUATO = 75] = "GUANAJUATO", pe[pe.GUERRERO = 76] = "GUERRERO", pe[pe.MEXICO = 77] = "MEXICO", pe[pe.MICHOACAN = 78] = "MICHOACAN", pe[pe.NEW_YORK_CITY = 79] = "NEW_YORK_CITY", pe[pe.TAMAULIPAS = 80] = "TAMAULIPAS", pe[pe.VERACRUZ = 81] = "VERACRUZ", pe[pe.CHIAPAS = 82] = "CHIAPAS", pe[pe.COAHUILA = 83] = "COAHUILA", pe[pe.DURANGO = 84] = "DURANGO", pe[pe.GUERRERO_COCULA = 85] = "GUERRERO_COCULA", pe[pe.GUERRERO_JUCHITAN = 86] = "GUERRERO_JUCHITAN", pe[pe.GUERRERO_TEPECOACUILCO = 87] = "GUERRERO_TEPECOACUILCO", pe[pe.GUERRERO_TLACOAPA = 88] = "GUERRERO_TLACOAPA", pe[pe.GUJARAT = 89] = "GUJARAT", pe[pe.HIDALGO = 90] = "HIDALGO", pe[pe.KARNATAKA = 91] = "KARNATAKA", pe[pe.KERALA = 92] = "KERALA", pe[pe.KHYBER_PAKHTUNKHWA = 93] = "KHYBER_PAKHTUNKHWA", pe[pe.MADHYA_PRADESH = 94] = "MADHYA_PRADESH", pe[pe.MAHARASHTRA = 95] = "MAHARASHTRA", pe[pe.MORELOS = 96] = "MORELOS", pe[pe.NAYARIT = 97] = "NAYARIT", pe[pe.OAXACA = 98] = "OAXACA", pe[pe.PUEBLA = 99] = "PUEBLA", pe[pe.PUNJAB = 100] = "PUNJAB", pe[pe.QUERETARO = 101] = "QUERETARO", pe[pe.SAN_LUIS_POTOSI = 102] = "SAN_LUIS_POTOSI", pe[pe.SINALOA = 103] = "SINALOA", pe[pe.SONORA = 104] = "SONORA", pe[pe.TABASCO = 105] = "TABASCO", pe[pe.TAMIL_NADU = 106] = "TAMIL_NADU", pe[pe.YUCATAN = 107] = "YUCATAN", pe[pe.ZACATECAS = 108] = "ZACATECAS", pe[pe.AGUASCALIENTES = 109] = "AGUASCALIENTES", pe[pe.BAJA_CALIFORNIA_SUR = 110] = "BAJA_CALIFORNIA_SUR", pe[pe.CAMPECHE = 111] = "CAMPECHE", pe[pe.COLIMA = 112] = "COLIMA", pe[pe.QUINTANA_ROO_BENITO_JUAREZ = 113] = "QUINTANA_ROO_BENITO_JUAREZ", pe[pe.UINTANA_ROO = 114] = "UINTANA_ROO", pe[pe.QUINTANA_ROO_SOLIDARIDAD = 115] = "QUINTANA_ROO_SOLIDARIDAD", pe[pe.TLAXCALA = 116] = "TLAXCALA", pe[pe.QUINTANA_ROO_COZUMEL = 117] = "QUINTANA_ROO_COZUMEL", pe[pe.SAO_PAOLO = 118] = "SAO_PAOLO", pe[pe.RIO_DE_JANEIRO = 119] = "RIO_DE_JANEIRO", pe[pe.RIO_GRANDE_DO_SUL = 120] = "RIO_GRANDE_DO_SUL", pe[pe.NORTHWEST_TERRITORIES = 121] = "NORTHWEST_TERRITORIES", pe[pe.NUNAVUT = 122] = "NUNAVUT", pe[pe.PRINCE_EDWARD_ISLAND = 123] = "PRINCE_EDWARD_ISLAND", pe[pe.DISTRITO_FEDERAL = 124] = "DISTRITO_FEDERAL", pe[pe.MARANHAO = 125] = "MARANHAO", pe[pe.MATO_GROSSO = 126] = "MATO_GROSSO", pe[pe.MINAS_GERAIS = 127] = "MINAS_GERAIS", pe[pe.PARA = 128] = "PARA", pe[pe.PARANA = 129] = "PARANA", pe[pe.PERNAMBUCO = 130] = "PERNAMBUCO", pe[pe.SANTA_CATARINA = 131] = "SANTA_CATARINA", pe[pe.ANDHRA_PRADESH = 132] = "ANDHRA_PRADESH", pe[pe.CEARA = 133] = "CEARA", pe[pe.GOIAS = 134] = "GOIAS", pe[pe.GUERRERO_ACAPULCO_DE_JUAREZ = 135] = "GUERRERO_ACAPULCO_DE_JUAREZ", pe[pe.HARYANA = 136] = "HARYANA", pe[pe.SERGIPE = 137] = "SERGIPE", pe[pe.COUNT = 138] = "COUNT", (ye = e3.DocumentType || (e3.DocumentType = {}))[ye.NONE = 0] = "NONE", ye[ye.CONSULAR_ID = 1] = "CONSULAR_ID", ye[ye.DL = 2] = "DL", ye[ye.DL_PUBLIC_SERVICES_CARD = 3] = "DL_PUBLIC_SERVICES_CARD", ye[ye.EMPLOYMENT_PASS = 4] = "EMPLOYMENT_PASS", ye[ye.FIN_CARD = 5] = "FIN_CARD", ye[ye.ID = 6] = "ID", ye[ye.MULTIPURPOSE_ID = 7] = "MULTIPURPOSE_ID", ye[ye.MYKAD = 8] = "MYKAD", ye[ye.MYKID = 9] = "MYKID", ye[ye.MYPR = 10] = "MYPR", ye[ye.MYTENTERA = 11] = "MYTENTERA", ye[ye.PAN_CARD = 12] = "PAN_CARD", ye[ye.PROFESSIONAL_ID = 13] = "PROFESSIONAL_ID", ye[ye.PUBLIC_SERVICES_CARD = 14] = "PUBLIC_SERVICES_CARD", ye[ye.RESIDENCE_PERMIT = 15] = "RESIDENCE_PERMIT", ye[ye.RESIDENT_ID = 16] = "RESIDENT_ID", ye[ye.TEMPORARY_RESIDENCE_PERMIT = 17] = "TEMPORARY_RESIDENCE_PERMIT", ye[ye.VOTER_ID = 18] = "VOTER_ID", ye[ye.WORK_PERMIT = 19] = "WORK_PERMIT", ye[ye.IKAD = 20] = "IKAD", ye[ye.MILITARY_ID = 21] = "MILITARY_ID", ye[ye.MYKAS = 22] = "MYKAS", ye[ye.SOCIAL_SECURITY_CARD = 23] = "SOCIAL_SECURITY_CARD", ye[ye.HEALTH_INSURANCE_CARD = 24] = "HEALTH_INSURANCE_CARD", ye[ye.PASSPORT = 25] = "PASSPORT", ye[ye.S_PASS = 26] = "S_PASS", ye[ye.ADDRESS_CARD = 27] = "ADDRESS_CARD", ye[ye.ALIEN_ID = 28] = "ALIEN_ID", ye[ye.ALIEN_PASSPORT = 29] = "ALIEN_PASSPORT", ye[ye.GREEN_CARD = 30] = "GREEN_CARD", ye[ye.MINORS_ID = 31] = "MINORS_ID", ye[ye.POSTAL_ID = 32] = "POSTAL_ID", ye[ye.PROFESSIONAL_DL = 33] = "PROFESSIONAL_DL", ye[ye.TAX_ID = 34] = "TAX_ID", ye[ye.WEAPON_PERMIT = 35] = "WEAPON_PERMIT", ye[ye.VISA = 36] = "VISA", ye[ye.BORDER_CROSSING_CARD = 37] = "BORDER_CROSSING_CARD", ye[ye.DRIVER_CARD = 38] = "DRIVER_CARD", ye[ye.GLOBAL_ENTRY_CARD = 39] = "GLOBAL_ENTRY_CARD", ye[ye.MYPOLIS = 40] = "MYPOLIS", ye[ye.NEXUS_CARD = 41] = "NEXUS_CARD", ye[ye.PASSPORT_CARD = 42] = "PASSPORT_CARD", ye[ye.PROOF_OF_AGE_CARD = 43] = "PROOF_OF_AGE_CARD", ye[ye.REFUGEE_ID = 44] = "REFUGEE_ID", ye[ye.TRIBAL_ID = 45] = "TRIBAL_ID", ye[ye.VETERAN_ID = 46] = "VETERAN_ID", ye[ye.CITIZENSHIP_CERTIFICATE = 47] = "CITIZENSHIP_CERTIFICATE", ye[ye.MY_NUMBER_CARD = 48] = "MY_NUMBER_CARD", ye[ye.CONSULAR_PASSPORT = 49] = "CONSULAR_PASSPORT", ye[ye.MINORS_PASSPORT = 50] = "MINORS_PASSPORT", ye[ye.MINORS_PUBLIC_SERVICES_CARD = 51] = "MINORS_PUBLIC_SERVICES_CARD", ye[ye.DRIVING_PRIVILEGE_CARD = 52] = "DRIVING_PRIVILEGE_CARD", ye[ye.ASYLUM_REQUEST = 53] = "ASYLUM_REQUEST", ye[ye.DRIVER_QUALIFICATION_CARD = 54] = "DRIVER_QUALIFICATION_CARD", ye[ye.PROVISIONAL_DL = 55] = "PROVISIONAL_DL", ye[ye.REFUGEE_PASSPORT = 56] = "REFUGEE_PASSPORT", ye[ye.SPECIAL_ID = 57] = "SPECIAL_ID", ye[ye.UNIFORMED_SERVICES_ID = 58] = "UNIFORMED_SERVICES_ID", ye[ye.IMMIGRANT_VISA = 59] = "IMMIGRANT_VISA", ye[ye.CONSULAR_VOTER_ID = 60] = "CONSULAR_VOTER_ID", ye[ye.TWIC_CARD = 61] = "TWIC_CARD", ye[ye.EXIT_ENTRY_PERMIT = 62] = "EXIT_ENTRY_PERMIT", ye[ye.MAINLAND_TRAVEL_PERMIT_TAIWAN = 63] = "MAINLAND_TRAVEL_PERMIT_TAIWAN", ye[ye.NBI_CLEARANCE = 64] = "NBI_CLEARANCE", ye[ye.PROOF_OF_REGISTRATION = 65] = "PROOF_OF_REGISTRATION", ye[ye.TEMPORARY_PROTECTION_PERMIT = 66] = "TEMPORARY_PROTECTION_PERMIT", ye[ye.COUNT = 67] = "COUNT", (Ce = e3.DocumentImageColorStatus || (e3.DocumentImageColorStatus = {}))[Ce.NotAvailable = 0] = "NotAvailable", Ce[Ce.BlackAndWhite = 1] = "BlackAndWhite", Ce[Ce.Color = 2] = "Color", (We = e3.ImageAnalysisDetectionStatus || (e3.ImageAnalysisDetectionStatus = {}))[We.NotAvailable = 0] = "NotAvailable", We[We.NotDetected = 1] = "NotDetected", We[We.Detected = 2] = "Detected", (Ve = e3.CardOrientation || (e3.CardOrientation = {}))[Ve.Horizontal = 0] = "Horizontal", Ve[Ve.Vertical = 1] = "Vertical", Ve[Ve.NotAvailable = 2] = "NotAvailable", (be = e3.CardRotation || (e3.CardRotation = {}))[be.None = 0] = "None", be[be.Clockwise90 = 1] = "Clockwise90", be[be.CounterClockwise90 = 2] = "CounterClockwise90", be[be.UpsideDown = 3] = "UpsideDown", (ue = e3.ProcessingStatus || (e3.ProcessingStatus = {}))[ue.Success = 0] = "Success", ue[ue.DetectionFailed = 1] = "DetectionFailed", ue[ue.ImagePreprocessingFailed = 2] = "ImagePreprocessingFailed", ue[ue.StabilityTestFailed = 3] = "StabilityTestFailed", ue[ue.ScanningWrongSide = 4] = "ScanningWrongSide", ue[ue.FieldIdentificationFailed = 5] = "FieldIdentificationFailed", ue[ue.MandatoryFieldMissing = 6] = "MandatoryFieldMissing", ue[ue.InvalidCharactersFound = 7] = "InvalidCharactersFound", ue[ue.ImageReturnFailed = 8] = "ImageReturnFailed", ue[ue.BarcodeRecognitionFailed = 9] = "BarcodeRecognitionFailed", ue[ue.MrzParsingFailed = 10] = "MrzParsingFailed", ue[ue.ClassFiltered = 11] = "ClassFiltered", ue[ue.UnsupportedClass = 12] = "UnsupportedClass", ue[ue.UnsupportedByLicense = 13] = "UnsupportedByLicense", ue[ue.AwaitingOtherSide = 14] = "AwaitingOtherSide", ue[ue.NotScanned = 15] = "NotScanned", ue[ue.Count = 16] = "Count", (Ue = e3.RecognitionMode || (e3.RecognitionMode = {}))[Ue.None = 0] = "None", Ue[Ue.MrzId = 1] = "MrzId", Ue[Ue.MrzVisa = 2] = "MrzVisa", Ue[Ue.MrzPassport = 3] = "MrzPassport", Ue[Ue.PhotoId = 4] = "PhotoId", Ue[Ue.FullRecognition = 5] = "FullRecognition", Ue[Ue.BarcodeId = 6] = "BarcodeId", Ue[Ue.Count = 7] = "Count";
    class Je {
      constructor() {
        this.allowBlurFilter = true, this.allowUnparsedMrzResults = false, this.allowUnverifiedMrzResults = true, this.recognitionModeFilter = new Ne(), this.saveCameraFrames = false, this.scanCroppedDocumentImage = false, this.validateResultCharacters = true, this.anonymizationMode = e3.AnonymizationMode.FullResult, this.additionalAnonymization = null, this.barcodeScanningStartedCallback = null, this.classifierCallback = null, this.allowedDocumentClasses = null, this.paddingEdge = 0, this.returnFullDocumentImage = false, this.returnEncodedFullDocumentImage = false, this._fullDocumentImageDpi = 250, this.fullDocumentImageExtensionFactors = new Xe(), this.returnFaceImage = false, this.returnEncodedFaceImage = false, this._faceImageDpi = 250, this.returnSignatureImage = false, this.returnEncodedSignatureImage = false, this._signatureImageDpi = 250;
      }
      get fullDocumentImageDpi() {
        return this._fullDocumentImageDpi;
      }
      set fullDocumentImageDpi(e4) {
        Ae(e4), this._fullDocumentImageDpi = e4;
      }
      get faceImageDpi() {
        return this._faceImageDpi;
      }
      set faceImageDpi(e4) {
        Ae(e4), this._faceImageDpi = e4;
      }
      get signatureImageDpi() {
        return this._signatureImageDpi;
      }
      set signatureImageDpi(e4) {
        Ae(e4), this._signatureImageDpi = e4;
      }
    }
    (Ge = e3.IdBarcodeDocumentType || (e3.IdBarcodeDocumentType = {}))[Ge.None = 0] = "None", Ge[Ge.AAMVACompliant = 1] = "AAMVACompliant", Ge[Ge.ArgentinaID = 2] = "ArgentinaID", Ge[Ge.ArgentinaAlienID = 3] = "ArgentinaAlienID", Ge[Ge.ArgentinaDL = 4] = "ArgentinaDL", Ge[Ge.ColombiaID = 5] = "ColombiaID", Ge[Ge.ColombiaDL = 6] = "ColombiaDL", Ge[Ge.NigeriaVoterID = 7] = "NigeriaVoterID", Ge[Ge.NigeriaDL = 8] = "NigeriaDL", Ge[Ge.PanamaID = 9] = "PanamaID", Ge[Ge.SouthAfricaID = 10] = "SouthAfricaID", e3.BlinkIdMultiSideRecognizerSettings = class extends Je {
      constructor() {
        super(...arguments), this.allowUncertainFrontSideScan = false, this.maxAllowedMismatchesPerField = 0, this.skipUnsupportedBack = false;
      }
    }, e3.BlinkIdSingleSideRecognizerSettings = Je, e3.CapturedFrame = ee2, e3.ExtensionFactors = Xe, e3.IdBarcodeRecognizerSettings = class {
    }, e3.RecognitionModeFilter = Ne, e3.SDKError = N2, e3.SelectedCamera = D2, e3.VideoRecognizer = ne2, e3.WasmSDKLoadSettings = class {
      constructor(e4) {
        if (this.allowHelloMessage = true, this.engineLocation = "", this.workerLocation = "", this.wasmType = null, this.numberOfWorkers = null, this.loadProgressCallback = null, this.wasmModuleName = "BlinkIDWasmSDK", !e4) throw new N2(A2.licenseKeyMissing);
        this.licenseKey = e4;
      }
    }, e3.bindCameraToVideoFeed = L2, e3.captureFrame = te2, e3.createBlinkIdMultiSideRecognizer = async function(e4) {
      return e4.mbWasmModule.newRecognizer("BlinkIdMultiSideRecognizer");
    }, e3.createBlinkIdSingleSideRecognizer = async function(e4) {
      return e4.mbWasmModule.newRecognizer("BlinkIdSingleSideRecognizer");
    }, e3.createIdBarcodeRecognizer = async function(e4) {
      return e4.mbWasmModule.newRecognizer("IdBarcodeRecognizer");
    }, e3.createRecognizerRunner = async function(e4, t4, i3 = false, a3 = {}) {
      if ("object" != typeof e4) throw new N2(A2.missing);
      if ("object" != typeof t4 || t4.length < 1) throw new N2(A2.recognizersMissing);
      return e4.mbWasmModule.createRecognizerRunner(t4, i3, a3);
    }, e3.detectWasmFeatures = async function() {
      const t4 = [re2(), oe2(), ce2(), he2(), me2()];
      if (!(await Promise.all(t4)).every(Boolean)) throw new Error("Browser doesn't meet minimum requirements!");
      return await Re2() ? await ge2() ? e3.WasmType.AdvancedWithThreads : e3.WasmType.Advanced : e3.WasmType.Basic;
    }, e3.detectWasmType = async function() {
      const t4 = await Re2(), i3 = await ge2();
      return t4 ? i3 ? e3.WasmType.AdvancedWithThreads : e3.WasmType.Advanced : e3.WasmType.Basic;
    }, e3.frameCaptureErrors = J2, e3.getCameraDevices = K2, e3.isAndroidDevice = w2, e3.isBrowserSupported = function() {
      try {
        if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
          const e4 = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
          if (e4 instanceof WebAssembly.Module) return new WebAssembly.Instance(e4) instanceof WebAssembly.Instance;
        }
      } catch (e4) {
        return false;
      }
      return false;
    }, e3.isIOSUserAgent = Ie2, e3.isInAppBrowser = function() {
      const e4 = navigator.userAgent || navigator.vendor;
      return !!/(instagram|fbav|linkedinapp|twitter|micromessenger|whatsapp|tiktok)[/\s]?([\w.]*)/i.exec(e4);
    }, e3.licenseErrors = E2, e3.loadWasmModule = async function(e4) {
      return new Promise((t4, i3) => {
        if (!e4 || "object" != typeof e4) return void i3(new N2(A2.wasmSettingsMissing));
        if ("string" != typeof e4.licenseKey) return void i3(new N2(A2.licenseKeyMissing));
        if (!e4.wasmModuleName) return void i3(new N2(A2.wasmModuleNameMissing));
        if ("string" != typeof e4.engineLocation) return void i3(new N2(A2.engineLocationInvalid));
        if ("string" != typeof e4.workerLocation) return void i3(new N2(A2.workerLocationInvalid));
        const a3 = function() {
          try {
            let e5 = localStorage.getItem("mb-user-id");
            return null === e5 && (e5 = Fe(), localStorage.setItem("mb-user-id", e5)), e5;
          } catch (e5) {
            return Fe();
          }
        }();
        try {
          const l3 = `/resources/${e4.wasmModuleName}.worker.min.js`, d3 = window.location.origin + l3, s3 = e4.workerLocation || d3;
          e4.allowHelloMessage && console.log("Worker location is:", s3);
          const n3 = new Worker(s3);
          y2.createWasmWorker(n3, e4, a3).then((e5) => {
            t4(e5);
          }, i3);
        } catch (e5) {
          i3(e5);
        }
      });
    }, e3.localSdkErrors = k2, e3.obtainNewServerPermission = ae2, e3.sdkErrors = A2, e3.selectCamera = x2, e3.unlockWasmSDK = async function(t4, i3, a3, l3) {
      const d3 = l3.initializeWithLicenseKey(t4, a3, i3);
      switch (d3.unlockResult) {
        case e3.LicenseTokenState.Invalid:
          return { error: new N2({ ...E2.licenseInvalid, message: d3.licenseError }, { type: e3.LicenseErrorType.LicenseTokenStateInvalid }) };
        case e3.LicenseTokenState.Valid:
          return { error: null, showOverlay: (s3 = d3.isTrial, n3 = d3.allowRemoveDemoOverlay, c3 = d3.allowRemoveProductionOverlay, !(s3 && n3 || !s3 && c3)) };
        case e3.LicenseTokenState.RequiresServerPermission: {
          const t5 = await ae2(d3, l3);
          switch (t5.status) {
            case e3.ServerPermissionSubmitResultStatus.Ok:
              return { error: null, lease: t5.lease };
            case e3.ServerPermissionSubmitResultStatus.NetworkError: {
              let i4 = "";
              return t5.networkErrorDescription && (i4 = " " + t5.networkErrorDescription), { error: new N2({ ...E2.licenseNetworkError, message: "There has been a network error while obtaining the server permission!" + i4 }, { type: e3.LicenseErrorType.NetworkError }) };
            }
            case e3.ServerPermissionSubmitResultStatus.RemoteLock:
              return { error: new N2(E2.licenseRemoteLocked, { type: e3.LicenseErrorType.RemoteLock }), lease: t5.lease };
            case e3.ServerPermissionSubmitResultStatus.PermissionExpired:
              return { error: new N2(E2.licensePermissionExpired, { type: e3.LicenseErrorType.PermissionExpired }), lease: t5.lease };
            case e3.ServerPermissionSubmitResultStatus.PayloadCorrupted:
              return { error: new N2(E2.licensePayloadCorrupted, { type: e3.LicenseErrorType.PayloadCorrupted }), lease: t5.lease };
            case e3.ServerPermissionSubmitResultStatus.PayloadSignatureVerificationFailed:
              return { error: new N2(E2.licensePayloadVerificationFailed, { type: e3.LicenseErrorType.PayloadSignatureVerificationFailed }), lease: t5.lease };
            case e3.ServerPermissionSubmitResultStatus.IncorrectTokenState:
              return { error: new N2(E2.licenseTokenStateIncorrect, { type: e3.LicenseErrorType.IncorrectTokenState }), lease: t5.lease };
          }
        }
      }
      var s3, n3, c3;
    }, e3.validateDpi = Ae, e3.videoRecognizerErrors = X2, e3.wasmFolder = function(t4) {
      let i3 = "";
      return i3 = t4.wasmType === e3.WasmType.AdvancedWithThreads ? "advanced-threads" : t4.wasmType === e3.WasmType.Advanced ? "advanced" : "basic", `${t4.blinkIDVariant}/${i3}`;
    }, e3.workerErrors = Y2, Object.defineProperty(e3, "__esModule", { value: true });
  }(t2);
} };
var E = {};
function k(e2) {
  var t2 = E[e2];
  if (void 0 !== t2) return t2.exports;
  var i2 = E[e2] = { exports: {} };
  return J[e2].call(i2.exports, i2, i2.exports, k), i2.exports;
}
k.d = (e2, t2) => {
  for (var i2 in t2) k.o(t2, i2) && !k.o(e2, i2) && Object.defineProperty(e2, i2, { enumerable: true, get: t2[i2] });
}, k.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2);
var Y = {};
k.d(Y, { r: () => K });
var T = "";
var v = 2;
var w = class {
  static printDebug(...e2) {
    0 >= v && console.debug(`<D> [${T}] ${e2}`);
  }
  static printInfo(...e2) {
    1 >= v && console.debug(`<I> [${T}] ${e2}`);
  }
  static printWarning(...e2) {
    2 >= v && console.warn(`<W> [${T}] ${e2}`);
  }
  static printError(...e2) {
    3 >= v && console.error(`<E> [${T}] ${e2}`);
  }
  static setLoggerLevel(e2) {
    v = e2;
  }
  static setLoggerTag(e2) {
    T = e2;
  }
};
var H = { 0: "UNKNOWN", 1: "NONE", 2: "ID", 3: "PASSPORT", 4: "VISA", 5: "GREEN_CARD", 6: "DRIVING_LICENSE", 7: "RESIDENT_ID", 8: "SOCIAL_SECURITY_CARD", 9: "HEALTH_INSURANCE_CARD", 10: "TEMPORARY_RESIDENCE" };
var D = k(620);
var K = class {
  constructor(e2) {
    w.setLoggerTag("selphid-extractor-engine"), this.__licenseKey = "", this.__engineLocation = "", this.__specificData = "", this.__scanMode = "", this.__documentType = 0, this.__showExtendedLog = false, this.__maxAllowedMismatches = 0, this.__progressiveMismatches = 0, this.__allowUncertain = true, this.__allowUnknownDocuments = false, this.__barcode = false, this.__barcodeSide = 2, this.__captureTimer = 5, this.__anonymizationMode = 0, this.enablePhotoId = false, this.__mapperToRealConfig(e2), w.setLoggerLevel(this.__showExtendedLog ? 0 : 2), this.__glare = false, this.__detectionStatus = 0, this.__quad = { topLeft: { x: 0, y: 0 }, topRight: { x: 0, y: 0 }, bottomLeft: { x: 0, y: 0 }, bottomRight: { x: 0, y: 0 } }, this.recognizerList = [], this.enableTimer = true, this.isBarcodeEnabled = this.__barcode, this.initialTime = 0, this.isFirstBackDocumentExtraction = true, this.keepQuadFromFrontDocument = null, this.documentDetected = false, this.keepBarCodeInfoFromFrontDocument = null, this.documentClassified = false, this.classifiedDocumentInstances = [], this.detectedDocumentInstances = [];
  }
  async initializeEngine() {
    try {
      let e2 = "/FPhi.Engine.Microblink";
      const t2 = new D.WasmSDKLoadSettings(this.__licenseKey);
      t2.engineLocation = this.__engineLocation + e2, t2.workerLocation = URL.createObjectURL(new Blob([await (await fetch(this.__engineLocation + e2 + "/BlinkIDWasmSDK.worker.min.js")).arrayBuffer()], { type: "text/javascript" })), t2.allowHelloMessage = false, this.__sdkInstance = await D.loadWasmModule(t2), this.__sdkMultiSideRecognizer = await D.createBlinkIdMultiSideRecognizer(this.__sdkInstance), this.recognizerList = [this.__sdkMultiSideRecognizer], true === this.__barcode && (this.__sdkBarcodeRecognizer = await D.createIdBarcodeRecognizer(this.__sdkInstance), this.recognizerList.push(this.__sdkBarcodeRecognizer)), this.__sdkMultiSideSettings = await this.__sdkMultiSideRecognizer.currentSettings(), this.__sdkMultiSideSettings = await this.__updateRecognizerSettingsValues(this.__sdkMultiSideSettings), await this.__sdkMultiSideRecognizer.updateSettings(this.__sdkMultiSideSettings), this.__callbacks = { onQuadDetection: (e3) => {
        this.documentDetected = e3.detectionStatus !== D.DetectionStatus.Failed, this.__detectionStatus = e3.detectionStatus, this.__quad = { topLeft: e3.topLeft, topRight: e3.topRight, bottomLeft: e3.bottomLeft, bottomRight: e3.bottomRight };
      }, onGlare: (e3) => {
        this.__glare = e3;
      } }, this.__sdkRunnerRecognizer = await D.createRecognizerRunner(this.__sdkInstance, this.recognizerList, false, this.__callbacks), this.__calculateCaptureTImer();
    } catch (e2) {
      throw e2.message.includes("recognizer") ? new Error(`License capability error: ${e2.message}`) : new Error("Fail to initialize the engine!");
    }
  }
  __calculateCaptureTImer() {
    this.__captureTimer < 5 ? this.__captureTimer = 5 : this.__captureTimer > 10 && (this.__captureTimer = 10);
  }
  async __updateRecognizerSettingsValues(t2) {
    try {
      return t2.returnFullDocumentImage = true, t2.returnFaceImage = true, t2.returnSignatureImage = true, t2.anonymizationMode = this.__anonymizationMode, t2.classifierCallback = (e2) => {
        this.classifiedDocumentInstances = this.classifiedDocumentInstances || [], this.classifiedDocumentInstances.push("classified"), this.documentClassified = true, w.printDebug(`The document ${e2 ? "is" : "isn't"} supported`);
      }, t2.allowUncertainFrontSideScan = this.__allowUncertain, t2.maxAllowedMismatchesPerField = this.__maxAllowedMismatches, t2.recognitionModeFilter = { enableMrzId: true, enableMrzPassport: true, enableMrzVisa: true, enablePhotoId: this.enablePhotoId, enableBarcodeId: false, enableFullDocumentRecognition: true }, t2;
    } catch (t3) {
      throw console.error(e), new Error(`Fail to update recognizer settings values! Message: ${JSON.stringify(e)}`);
    }
  }
  async detectImage(e2, t2) {
    1 === t2 && this.isFirstBackDocumentExtraction && (this.isBarcodeEnabled = this.__barcode, this.enableTimer = true, this.isFirstBackDocumentExtraction = false), this.enableTimer && (this.initialTime = performance.now(), this.enableTimer = false), await this.__isResetNeeded(t2);
    const i2 = D.captureFrame(e2);
    await this.__sdkRunnerRecognizer.processImage(i2);
    const a2 = { multiside: await this.__sdkMultiSideRecognizer.getResult(), barcode: true === this.__barcode ? await this.__sdkBarcodeRecognizer.getResult() : null };
    w.printDebug(`
            Engine Information:
            ${JSON.stringify({ state: { standard: D.RecognizerResultState[a2.multiside.state], barcode: true !== this.__barcode || 2 !== this.__barcodeSide && t2 !== this.__barcodeSide ? `Barcode reader not enabled for the ${0 === t2 ? "front" : "back"} document side` : this.isBarcodeEnabled ? a2.barcode.state ? D.RecognizerResultState[a2.barcode.state] : "Empty" : "Barcode reader enabled but not Active" }, processingStatus: { standard: D.ProcessingStatus[a2.multiside.processingStatus] }, documentType: a2.multiside.classInfo.documentType, documentSide: t2 ? "Back" : "Front" })}
        `);
    let l2 = await this.__generateResultObject(e2, a2, t2);
    this.documentDetected = false, this.documentClassified = false;
    let d2 = 0;
    switch (this.__detectionStatus) {
      case D.DetectionStatus.CameraTooFar:
        d2 = 3;
        break;
      case D.DetectionStatus.CameraTooClose:
        d2 = 4;
        break;
      case D.DetectionStatus.DocumentTooCloseToCameraEdge:
        d2 = 5;
        break;
      case D.DetectionStatus.CameraAngleTooSteep:
        d2 = 2;
        break;
      case D.DetectionStatus.DocumentPartiallyVisible:
        d2 = 5;
    }
    return l2.detectionStatus = { status: d2, quad: this.__quad, glare: this.__glare, internalStatus: { standard: a2.multiside.processingStatus } }, l2.imagesFullsize && true === this.__allowUnknownDocuments && l2.imagesFullsize.frontDocument && null === this.keepQuadFromFrontDocument && (this.keepQuadFromFrontDocument = this.__quad), l2.imagesFullsize && true === this.__allowUnknownDocuments && l2.imagesFullsize.backDocument && null !== this.keepQuadFromFrontDocument && (l2.detectionStatus.quadFromFrontDocument = this.keepQuadFromFrontDocument), l2.barCodeExtractionDataFrontDocument && (this.keepBarCodeInfoFromFrontDocument = l2.barCodeExtractionDataFrontDocument), 1 === t2 && this.keepBarCodeInfoFromFrontDocument && (l2.barCodeExtractionDataFrontDocument = this.keepBarCodeInfoFromFrontDocument), 0 === t2 ? 0 === a2.multiside.state && [1, 2, 3, 8].includes(a2.multiside.frontProcessingStatus) && 0 === a2.multiside.classInfo.documentType ? l2.isDocumentDetected = false : l2.isDocumentDetected = true : 1 === t2 && ([1, 2, 3, 8].includes(a2.multiside.backProcessingStatus) ? l2.isDocumentDetected = false : l2.isDocumentDetected = true), w.printDebug(`Detection Generated Status: ${JSON.stringify([l2.diagnostic, l2.extractionData, l2.detectionStatus])}`), w.printDebug("Returning result into Main Thread"), l2;
  }
  async cleanImageBuffer(e2, t2) {
    1 === e2 && t2 ? await this.__resetOnlyBackSide() : await this.__resetFullProcess();
  }
  async finalizeEngine() {
    this.__deleteWasmVar(this.__sdkMultiSideRecognizer, true === this.__barcode ? this.__sdkBarcodeRecognizer : null, this.__sdkRunnerRecognizer, this.__sdkMultiSideSettings, this.__sdkInstance);
  }
  __resetInternalState() {
    this.__backCamera = null, this.__frontCamera = null, this.keepQuadFromFrontDocument = null, this.keepFrontDocument = null, this.keepFaceImage = null, this.keepBarCodeInfoFromFrontDocument = null, this.enableTimer = true, true === this.__barcode && (this.isBarcodeEnabled = true, this.isFirstBackDocumentExtraction = true);
  }
  async __resetFullProcess() {
    await this.__sdkRunnerRecognizer.resetRecognizers(true), await this.__sdkRunnerRecognizer.delete(), this.__sdkMultiSideSettings = await this.__sdkMultiSideRecognizer.currentSettings(), this.__maxAllowedMismatches += this.__progressiveMismatches, this.__sdkMultiSideSettings.maxAllowedMismatchesPerField = this.__maxAllowedMismatches, this.__sdkMultiSideSettings.classifierCallback = (e2) => {
      this.classifiedDocumentInstances = this.classifiedDocumentInstances || [], this.classifiedDocumentInstances.push("classified"), this.documentClassified = true, w.printDebug(`The document ${e2 ? "is" : "isn't"} supported`);
    }, await this.__sdkMultiSideRecognizer.updateSettings(this.__sdkMultiSideSettings), this.__sdkRunnerRecognizer = await D.createRecognizerRunner(this.__sdkInstance, this.recognizerList, false, this.__callbacks), this.__resetInternalState();
  }
  async __resetOnlyBackSide() {
    this.__backCamera = null, this.enableTimer = true, true === this.__barcode && (this.isBarcodeEnabled = true, this.isFirstBackDocumentExtraction = true), await this.__sdkRunnerRecognizer.resetRecognizers(false), this.resetValidation();
  }
  async __isResetNeeded(e2) {
    performance.now() - this.initialTime > 1e3 * this.__captureTimer && (await this.__rerunRecognizers(e2), this.__allowUnknownDocuments && this.resetValidation());
  }
  resetValidation() {
    delete this.detectedDocumentInstances, delete this.classifiedDocumentInstances, this.documentDetected = false, this.documentClassified = false;
  }
  async __rerunRecognizers(e2) {
    await this.__sdkRunnerRecognizer.resetRecognizers(!e2), w.printDebug("Rerunning Recognizers"), this.isBarcodeEnabled = false, this.enableTimer = true;
  }
  get __attributes() {
    return { licenseKey: { type: "string", property: "__licenseKey" }, bundlePath: { type: "string", property: "__engineLocation" }, imageFormat: { type: "string", property: "__imageFormat" }, imageQuality: { type: "number", property: "__imageQuality" }, specificData: { type: "string", property: "__specificData" }, scanMode: { type: "number", property: "__scanMode" }, documentType: { type: "number", property: "__documentType" }, showExtendedLog: { type: "boolean", property: "__showExtendedLog" }, maxAllowedMismatches: { type: "number", property: "__maxAllowedMismatches" }, allowUncertain: { type: "boolean", property: "__allowUncertain" }, progressiveMismatches: { type: "number", property: "__progressiveMismatches" }, allowUnknownDocuments: { type: "boolean", property: "__allowUnknownDocuments" }, barcode: { type: "boolean", property: "__barcode" }, barcodeSide: { type: "number", property: "__barcodeSide" }, captureTimer: { type: "number", property: "__captureTimer" }, anonymizationMode: { type: "number", property: "__anonymizationMode" } };
  }
  get __scanResultType() {
    return { [D.RecognizerResultState.Valid]: 0, [D.RecognizerResultState.StageValid]: 21, [D.RecognizerResultState.Uncertain]: 22, [D.RecognizerResultState.Empty]: this.__allowUnknownDocuments ? 0 : 1 };
  }
  __mapperToRealConfig(e2) {
    for (const [t2, i2] of Object.entries(e2)) if (void 0 !== this.__attributes[t2]) {
      const e3 = this.__attributes[t2].property;
      "__allowUnknownDocuments" === e3 ? (i2 && (this.enablePhotoId = true), this.__allowUnknownDocuments = false) : this[e3] = i2;
    }
  }
  async __isBarcodeActive(e2) {
    return true !== this.__barcode || true !== this.isBarcodeEnabled || 2 !== this.__barcodeSide && e2 !== this.__barcodeSide ? (this.recognizersHaveBeenReset = false, false) : performance.now() - this.initialTime < 0.75 * this.__captureTimer * 1e3 || (await this.__rerunRecognizers(e2), this.recognizersHaveBeenReset = true, this.isBarcodeEnabled = false, false);
  }
  async __validateBarcodeDiagnostic(e2, t2) {
    let i2 = false, a2 = false;
    const l2 = e2.multiside.classInfo.documentType, d2 = e2.multiside.processingStatus, s2 = e2.barcode.state, n2 = e2.multiside.state, c2 = [D.RecognizerResultState.Valid, D.RecognizerResultState.StageValid];
    return this.__allowUncertain && c2.push(D.RecognizerResultState.Uncertain), i2 = c2.includes(n2), !i2 && this.__allowUnknownDocuments && (i2 = this.documentDetected), 0 !== t2 || this.enablePhotoId || (i2 = i2 && 0 !== l2, 2 === this.__scanMode || 0 === this.__scanMode ? n2 !== D.RecognizerResultState.Empty && l2 && (a2 = this.__passesDocumentValidation(e2), a2 ? n2 === D.RecognizerResultState.Uncertain && 0 == this.__allowUncertain && a2 && (w.printDebug("Resetting recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2)) : (i2 = false, w.printDebug("Resetting recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2))) : n2 === D.RecognizerResultState.Uncertain && 0 !== l2 && 0 == this.__allowUncertain && (w.printDebug("Resetting Recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2)), c2.includes(n2) && 0 === l2 && d2 === D.ProcessingStatus.AwaitingOtherSide && (w.printDebug("Resetting Recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2))), i2 && s2 === D.RecognizerResultState.Valid;
  }
  async __validateResultDiagnostic(e2, t2) {
    const i2 = e2.multiside.state, a2 = e2.multiside.classInfo.documentType, l2 = e2.multiside.processingStatus, d2 = [D.ProcessingStatus.ImagePreprocessingFailed, D.ProcessingStatus.ImageReturnFailed], s2 = [D.RecognizerResultState.StageValid, D.RecognizerResultState.Valid];
    let n2 = true, c2 = false;
    return this.__allowUncertain && (d2.push(D.ProcessingStatus.MrzParsingFailed), s2.push(D.RecognizerResultState.Uncertain)), 0 !== t2 || this.enablePhotoId || (n2 = 0 !== a2, 2 === this.__scanMode || 0 === this.__scanMode ? i2 !== D.RecognizerResultState.Empty && a2 && (c2 = this.__passesDocumentValidation(e2), c2 ? i2 === D.RecognizerResultState.Uncertain && 0 == this.__allowUncertain && c2 && (w.printDebug("Resetting recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2)) : (n2 = false, w.printDebug("Resetting recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2))) : i2 === D.RecognizerResultState.Uncertain && 0 !== a2 && 0 == this.__allowUncertain && (w.printDebug("Resetting Recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2)), s2.includes(i2) && 0 === a2 && l2 === D.ProcessingStatus.AwaitingOtherSide && (w.printDebug("Resetting Recognizers"), await this.__sdkRunnerRecognizer.resetRecognizers(!t2))), n2 && s2.includes(i2) && !d2.includes(l2);
  }
  async __validateExtraction(e2, t2) {
    let i2 = false;
    return i2 = await this.__isBarcodeActive(t2) ? await this.__validateBarcodeDiagnostic(e2, t2) : await this.__validateResultDiagnostic(e2, t2), i2 || this.__allowUnknownDocuments && !this.isBarcodeEnabled && (this.detectedDocumentInstances = this.detectedDocumentInstances || [], this.documentDetected && [D.ProcessingStatus.UnsupportedClass, D.ProcessingStatus.MandatoryFieldMissing].includes(e2.multiside.processingStatus) && this.detectedDocumentInstances.push(e2.multiside.processingStatus), i2 = this.detectedDocumentInstances.length > 2), i2 && !this.recognizersHaveBeenReset;
  }
  async __generateResultObject(e2, t2, i2) {
    var _a, _b;
    let a2 = {};
    const l2 = await this.__validateExtraction(t2, i2);
    return w.printDebug(`The extraction ${l2 ? "is" : "isn't"} validated correctly.`), l2 ? (this.__backCamera = void 0, delete this.detectedDocumentInstances, delete this.classifiedDocumentInstances, a2.diagnostic = this.__scanResultType[t2.multiside.state], a2.simpleModeOutput = 0, a2.images = { backDocument: this.__convertToImageOutput(t2.multiside.fullDocumentBackImage.rawImage), frontDocument: this.__convertToImageOutput(t2.multiside.fullDocumentFrontImage.rawImage), faceImage: this.__convertToImageOutput(t2.multiside.faceImage.rawImage), signatureImage: this.__convertToImageOutput(t2.multiside.signatureImage.rawImage) }, a2.imagesRaw = { backDocument: t2.multiside.fullDocumentBackImage.rawImage, frontDocument: t2.multiside.fullDocumentFrontImage.rawImage, faceImage: t2.multiside.faceImage.rawImage, signatureImage: t2.multiside.signatureImage.rawImage }, (this.__allowUncertain || this.__allowUnknownDocuments) && 0 === i2 && (this.keepFrontDocument = a2.images.frontDocument, this.keepFaceImage = a2.images.faceImage), this.__allowUncertain && ((_a = a2.images) == null ? void 0 : _a.backDocument) && this.keepFrontDocument !== a2.images.frontDocument && this.__assignFrontDocumentImages(a2), (this.documentDetected || this.isBarcodeEnabled && D.RecognizerResultState.Valid === t2.barcode.state) && this.__allowUnknownDocuments && (0 === i2 && void 0 === this.__frontCamera ? this.__frontCamera = e2.toDataURL(this.__imageFormat, this.__imageQuality) : 1 === i2 && void 0 === this.__backCamera && (this.__backCamera = e2.toDataURL(this.__imageFormat, this.__imageQuality), ((_b = a2.images) == null ? void 0 : _b.frontDocument) && !this.keepFrontDocument && (a2.images.backDocument = a2.images.frontDocument, a2.imagesRaw.backDocument = a2.imagesRaw.frontDocument, this.keepFaceImage = a2.images.faceImage), this.__assignFrontDocumentImages(a2))), null != t2.multiside.fullDocumentBackImage.rawImage ? null == this.__backCamera && (this.__backCamera = e2.toDataURL(this.__imageFormat, this.__imageQuality)) : null == this.__frontCamera && (this.__frontCamera = e2.toDataURL(this.__imageFormat, this.__imageQuality)), a2.imagesFullsize = { backDocument: this.__backCamera, frontDocument: this.__frontCamera }, a2.extractionRaw = {}, a2.extractionRaw.mrz = { rawData: this.__getSafeValue(() => t2.multiside.mrz.rawMRZString), opt1: this.__getSafeValue(() => t2.multiside.mrz.opt1), opt2: this.__getSafeValue(() => t2.multiside.mrz.opt2), firstName: this.__getSafeValue(() => t2.multiside.mrz.secondaryID), lastName: this.__getSafeValue(() => t2.multiside.mrz.primaryID), documentId: this.__getSafeValue(() => t2.multiside.mrz.sanitizedOpt1), documentNumber: this.__getSafeValue(() => t2.multiside.mrz.documentNumber), documentIssuer: this.__getSafeValue(() => t2.multiside.mrz.issuer), dateOfExpiry: this.__getSafeValue(() => t2.multiside.mrz.dateOfExpiry.originalString), dateOfBirth: this.__getSafeValue(() => t2.multiside.mrz.dateOfBirth.originalString), gender: this.__getSafeValue(() => t2.multiside.mrz.gender), nationality: this.__getSafeValue(() => t2.multiside.mrz.nationality) }, a2.extractionRaw.ocr = { firstName: this.__getSafeValue(() => t2.multiside.frontViz.firstName.latin), lastName: this.__getSafeValue(() => t2.multiside.frontViz.lastName.latin), documentId: this.__getSafeValue(() => t2.multiside.frontViz.personalIdNumber.latin), documentNumber: this.__getSafeValue(() => t2.multiside.frontViz.documentNumber.latin), dateOfBirth: this.__getSafeValue(() => t2.multiside.frontViz.dateOfBirth.originalString.latin), dateOfExpiry: this.__getSafeValue(() => t2.multiside.frontViz.dateOfExpiry.originalString.latin), dateOfIssue: this.__getSafeValue(() => t2.multiside.frontViz.dateOfIssue.originalString.latin), gender: this.__getSafeValue(() => t2.multiside.frontViz.sex.latin), nationality: this.__getSafeValue(() => t2.multiside.frontViz.nationality.latin) }, a2.extractionData = { firstName: this.__getSafeValue(() => t2.multiside.firstName.latin), lastName: this.__getSafeValue(() => t2.multiside.lastName.latin.replaceAll("\n", " ")), gender: this.__getSafeValue(() => t2.multiside.sex.latin), nationality: this.__getSafeValue(() => t2.multiside.nationality.latin), dateOfBirth: this.__getSafeValue(() => t2.multiside.dateOfBirth.originalString.latin.replaceAll(" ", "/")), placeOfBirth: this.__getSafeValue(() => t2.multiside.placeOfBirth.latin.replaceAll("\n", ", ")), dateOfIssue: this.__getSafeValue(() => t2.multiside.dateOfIssue.originalString.latin.replaceAll(" ", "/")), dateOfExpiry: this.__getSafeValue(() => t2.multiside.dateOfExpiry.originalString.latin.replaceAll(" ", "/")), documentId: this.__getSafeValue(() => t2.multiside.personalIdNumber.latin), documentNumber: this.__getSafeValue(() => t2.multiside.documentNumber.latin), address: this.__getSafeValue(() => t2.multiside.address.latin.replaceAll("\n", ", ")), documentCountryIssuer: this.__getSafeValue(() => t2.multiside.classInfo.isoAlpha3CountryCode), documentCountryIssuerIso2: this.__getSafeValue(() => t2.multiside.classInfo.isoAlpha2CountryCode), documentType: this.__getSafeValue(() => this.__getDocumentType(t2.multiside.classInfo.documentType)), documentTypeString: D.DocumentType[t2.multiside.classInfo.documentType], isSingleSideDocument: this.__getSafeValue(() => t2.multiside.state === D.RecognizerResultState.Valid && t2.multiside.processingStatus === D.ProcessingStatus.Success), debug1: this.__getSafeValue(() => t2.multiside.classInfo.documentType) }, true === this.__barcode && t2.barcode && t2.barcode.state > 0 && (a2["barCodeExtractionData" + (0 === i2 ? "FrontDocument" : "BackDocument")] = { firstName: this.__getSafeValue(() => t2.barcode.firstName), lastName: this.__getSafeValue(() => t2.barcode.lastName), gender: this.__getSafeValue(() => t2.barcode.sex), nationality: this.__getSafeValue(() => t2.barcode.nationality), dateOfBirth: this.__getSafeValue(() => t2.barcode.dateOfBirth.originalString), placeOfBirth: this.__getSafeValue(() => t2.barcode.placeOfBirth), documentNumber: this.__getSafeValue(() => t2.barcode.documentNumber), documentAdditionalNumber: this.__getSafeValue(() => t2.barcode.documentAdditionalNumber), dateOfExpiry: this.__getSafeValue(() => t2.barcode.dateOfExpiry.originalString), dateOfIssue: this.__getSafeValue(() => t2.barcode.dateOfIssue.originalString), address: this.__getSafeValue(() => t2.barcode.address), city: this.__getSafeValue(() => t2.barcode.city), postalCode: this.__getSafeValue(() => t2.barcode.postalCode), documentType: this.__getSafeValue(() => D.IdBarcodeDocumentType[t2.barcode.documentType]) })) : (a2 = {}, a2.diagnostic = 1), a2;
  }
  __passesDocumentValidation(e2) {
    let t2 = false;
    return this.__isDesiredDocumentType(e2.multiside.classInfo.documentType) ? 0 === this.__scanMode || 2 === this.__scanMode && this.__isDesiredCountry(e2.multiside.classInfo.isoAlpha2CountryCode) ? t2 = true : w.printWarning(`Detected document from different nationality, was expecting ${this.__specificData} but captured ${e2.multiside.classInfo.isoAlpha2CountryCode} instead`) : w.printWarning(`Detected document with different type, was expecting ${H[this.__documentType]} but captured ${D.DocumentType[e2.multiside.classInfo.documentType]} instead`), t2;
  }
  __isDesiredCountry(e2) {
    return this.__specificData.includes(e2);
  }
  __isDesiredDocumentType(e2) {
    return 0 === this.__documentType || this.__getDocumentType(e2) === this.__documentType;
  }
  __assignFrontDocumentImages(e2) {
    e2.images && (e2.images.frontDocument = this.keepFrontDocument, e2.images.faceImage = this.keepFaceImage, delete this.keepFrontDocument, delete this.keepFaceImage);
  }
  __getDocumentType(e2) {
    switch (e2) {
      case D.DocumentType.ID:
      case D.DocumentType.VOTER_ID:
      case D.DocumentType.MyKid:
      case D.DocumentType.FIN_ID:
        return 2;
      case D.DocumentType.DL:
      case D.DocumentType.DL_PUBLIC_SERVICES_CARD:
      case D.DocumentType.PROFESSIONAL_DL:
      case D.DocumentType.DRIVER_CARD:
        return 6;
      case D.DocumentType.PASSPORT:
      case D.DocumentType.PASSPORT_CARD:
      case D.DocumentType.ALIEN_PASSPORT:
      case D.DocumentType.CONSULAR_PASSPORT:
      case D.DocumentType.MINORS_PASSPORT:
        return 3;
      case D.DocumentType.ALIEN_ID:
      case D.DocumentType.BORDER_CROSSING_CARD:
      case D.DocumentType.RESIDENCE_PERMIT:
      case D.DocumentType.TEMPORARY_RESIDENCE_PERMIT:
      case D.DocumentType.REFUGEE_ID:
      case D.DocumentType.GREEN_CARD:
      case D.DocumentType.WORK_PERMIT:
      case D.DocumentType.RESIDENT_ID:
      case D.DocumentType.CITIZENSHIP_CERTIFICATE:
        return 7;
      default:
        return 0;
    }
  }
  __deleteWasmVar(...e2) {
    e2.forEach((e3) => {
      null != e3 && void 0 !== e3.delete && e3.delete();
    });
  }
  __convertToImageOutput(e2) {
    if (null !== e2) {
      let t2 = document.createElement("canvas"), i2 = t2.getContext("2d");
      return t2.width = e2.width, t2.height = e2.height, i2.putImageData(e2, 0, 0), t2.toDataURL(this.__imageFormat, this.__imageQuality);
    }
    return null;
  }
  __getSafeValue(e2) {
    try {
      return e2();
    } catch (e3) {
      return null;
    }
  }
};
var x = Y.r;
var _L = class _L {
  static getAvailableEngines() {
    return Object.keys(_L.__engines);
  }
  static generateInstance(e2, t2) {
    return new _L.__engines[e2](t2);
  }
};
__publicField(_L, "__engines", { Microblink: x, Facephi: A });
var L = _L;
var M = { 0: "UNKNOWN", 1: "NONE", 2: "ID", 3: "PASSPORT", 4: "VISA", 5: "GREEN_CARD", 6: "DRIVING_LICENSE", 7: "RESIDENT_ID", 8: "SOCIAL_SECURITY_CARD", 9: "HEALTH_INSURANCE_CARD", 10: "TEMPORARY_RESIDENCE" };
var f = { 0: "OK", 1: "NOT_EVALUATED", 2: "BAD_ANGLE", 3: "TOO_FAR", 4: "TOO_CLOSE", 5: "OUT_OF_BOUNDS", 6: "BAD_ASPECT_RATIO", 7: "DOCUMENT_NOT_FOUND", 8: "FACE_NOT_FOUND", 9: "MRZ_NOT_FOUND", 10: "ATTRIBUTES_NOT_FOUND", 11: "UNDEREXPOSED", 12: "OVEREXPOSED", 13: "BLURRED", 14: "INSUFFICIENT_SAMPLES", 15: "INSUFFICIENT_TIME", 16: "TOO_DELAYED", 17: "TOO_MOVEMENT", 18: "FREEZED_DOCUMENT", 19: "TOO_MUCH_ROLL", 20: "TOO_SMALL", 21: "STAGE_OK", 22: "UNCERTAIN" };
var _ = { ExceptionType: { CameraError: 0, ExtractorError: 1, ControlNotInitializedError: 2, ImageCropResizeError: 3, UnexpectedCaptureError: 4, InitializingEngineError: 5, LicenseError: 6 }, Mode: { Front: 0, Back: 1, Full: 2 }, DocumentMode: { SingleSide: 0, DoubleSide: 1, Auto: 2 }, TrackStatus: { ChangeState: 0, Tap: 1, DocumentBorder: 2, AccessibilityData: 3, Diagnostic: 4 }, ModeStr: ["Front", "Back", "Full"], CaptureSensibilityStr: ["Low", "Normal", "High", "Auto"], SimpleModeStates: { InfoFront: 0, PreviewFront: 1, InfoBack: 2, PreviewBack: 3 }, DocumentType: { IDCard: 2, Passport: 3, DriversLicense: 6, RedidentID: 7, Custom: 0 }, DocumentTypeReverse: { 2: "IDCard", 3: "Passport", 6: "DriversLicense", 7: "RedidentID", 0: "Custom" }, RecorderType: { Local: 0, Remote: 1 }, VideoQuality: { Low: 0, Medium: 1, High: 2 }, ScanMode: { Generic: 0, Specific: 1, Search: 2 }, BarcodeSide: { Front: 0, Back: 1, Both: 2 }, AnonymizationMode: { None: 0, ImageOnly: 1, ResultFieldsOnly: 2, FullResult: 3 }, SimpleModeStatesStr: ["InfoFront", "PreviewFront", "InfoBack", "PreviewBack"], Version: "4.26.0" };
if (!z) var z = {};
z.SelphID = _;
var O = class _O extends HTMLElement {
  constructor() {
    super();
    let e2 = "closed";
    "undefined" != typeof window && void 0 !== window.openShadow && true === window.openShadow && (e2 = "open"), this.__widgetContainer = this.attachShadow({ mode: e2 }), this.__widgetStyles = document.createElement("style"), this.__widgetStyles.innerText = "\n            :host { display: block; position: relative; margin: 0; padding: 0; width: 100%; height: 100%; background-color: #181a1b; }\n            #accessibilityContainer { position: absolute; z-index: 999; width: 100%; height: 100% }\n            #cameraContainer { width: 100%; height: 100%; top: 0; left: 0 }\n        ", this.__widgetContainer.append(this.__widgetStyles), this.__config = new z.SelphID.ConfigurationManager(), this.__config.setContainer(this.__widgetContainer), this.__externalCamera = null, this.__elementMounted = false, this.__accessibilityHasEnabled = false, this.__forceLandScapeHasEnabled = false, this.__waitingMounts = [];
  }
  static get attributes() {
    return { bundlepath: { type: "string", property: "bundlePath", private: false }, resourcespath: { type: "string", property: "resourcesPath", private: false }, graphpath: { type: "string", property: "graphPath", private: false }, accessibility: { type: "boolean", property: "accessibility", private: false }, accessibleelements: { type: "array", property: "accessibleElements", private: false }, language: { type: "string", property: "language", private: false }, dpilist: { type: "array", property: "dpiList", private: false }, canvashd: { type: "boolean", property: "canvasHD", private: false }, initialtip: { type: "boolean", property: "initialTip", private: false }, forcelandscape: { type: "boolean", property: "forceLandscape", private: false }, startsimplemode: { type: "boolean", property: "startSimpleMode", private: false }, asksimplemode: { type: "boolean", property: "askSimpleMode", private: false }, licensekey: { type: "string", property: "license", private: false }, cameraid: { type: "string", property: "cameraId", private: false }, camerawidth: { type: "number", property: "cameraWidth", private: false }, cameraheight: { type: "number", property: "cameraHeight", private: false }, cameramirror: { type: "boolean", property: "cameraMirror", private: false }, cameraselection: { type: "boolean", property: "cameraSelection", private: false }, cropfactor: { type: "number", property: "cropFactor", private: false }, documentmode: { type: "number", property: "documentMode", private: false }, previewcapture: { type: "boolean", property: "previewCapture", private: false }, cameraoverflow: { type: "boolean", property: "cameraOverflow", private: false }, blurredthreshold: { type: "number", property: "blurredThreshold", private: false }, documenttype: { type: "number", property: "documentType", private: false }, scanmode: { type: "number", property: "scanMode", private: false }, checkfieldsdata: { type: "boolean", property: "checkFieldsData", private: true }, specificdata: { type: "array", property: "specificData", private: false }, epheremalkey: { type: "string", property: "epheremalKey", private: true }, externalcamera: { type: "boolean", property: "externalCamera", private: true }, keepenginealive: { type: "boolean", property: "keepEngineAlive", private: true }, capturetimeout: { type: "number", property: "captureTimeout", private: false }, captureretries: { type: "number", property: "captureRetries", private: false }, maxallowedmismatches: { type: "number", property: "maxAllowedMismatches", private: false }, allowuncertain: { type: "boolean", property: "allowUncertain", private: false }, allowunknowndocuments: { type: "boolean", property: "allowUnknownDocuments", private: false }, progressivemismatches: { type: "number", property: "progressiveMismatches", private: false }, barcode: { type: "boolean", property: "barcode", private: false }, barcodeside: { type: "number", property: "barcodeSide", private: false }, retryonlycurrentside: { type: "boolean", property: "retryOnlyCurrentSide", private: false }, anonymizationmode: { type: "number", property: "anonymizationMode", private: false }, imageformat: { type: "string", property: "imageFormat", private: false }, imagequality: { type: "number", property: "imageQuality", private: false }, videorecord: { type: "boolean", property: "videoRecord", private: false }, videorecordrate: { type: "number", property: "videoRecordRate", private: false }, videorecordscale: { type: "number", property: "videoRecordScale", private: false }, videoquality: { type: "number", property: "videoQuality", private: false }, videorecordtype: { type: "number", property: "videoRecordType", private: false }, showlog: { type: "boolean", property: "showLog", private: false }, debugmode: { type: "boolean", property: "debugMode", private: false }, onextractionfinished: { type: "event", property: "FPhi.SelphID.Finish.event", private: false }, onusercancelled: { type: "event", property: "FPhi.SelphID.UserCancel.event", private: false }, onextractiontimeout: { type: "event", property: "FPhi.SelphID.ExtractionTimeout.event", private: false }, onexceptioncaptured: { type: "event", property: "FPhi.SelphID.ExceptionCaptured.event", private: false }, onmoduleloaded: { type: "event", property: "FPhi.SelphID.ModuleLoaded.event", private: false }, ontrackstatus: { type: "event", property: "FPhi.SelphID.TrackStatus.event", private: false }, onaccessibilitystatus: { type: "event", property: "FPhi.SelphID.AccessibilityStatus.event", private: false } };
  }
  connectedCallback() {
    queueMicrotask(() => this.__createUserControl(this.__config).__startUserControl().then(() => {
      this.__elementMounted = true, this.__waitingMounts.forEach((e2) => e2());
    }));
  }
  disconnectedCallback() {
    queueMicrotask(() => this.__stopUserControl().then(() => this.__elementMounted = false));
  }
  reconnectedCallback() {
    queueMicrotask(() => this.__restartUserControl(this.__config));
  }
  attributeChangedCallback(e2, t2, i2) {
    this.__setNativeConfiguration(e2, i2) && this.reconnectedCallback();
  }
  addWidgetEventListener(e2, t2) {
    this.addEventListener(e2, t2, true);
  }
  addEventListener(e2, t2, i2) {
    const a2 = e2.toLowerCase().replace("-", ""), l2 = _O.attributes[a2];
    "event" === l2.type && this.__widgetContainer.addEventListener(l2.property, t2, i2);
  }
  static get observedAttributes() {
    return Object.getOwnPropertyNames(this.attributes);
  }
  static async checkCapabilities() {
    return z.SelphID.CheckCapabilities();
  }
  static async generateBrowserCache(e2, t2) {
    return z.SelphID.generateBrowserCache(e2, t2);
  }
  routeClick(e2, t2) {
    this.__fphiWidget.routeClick(e2, t2);
  }
  mountExternalCamera(e2) {
    "true" === this.getAttribute("externalcamera") ? (this.__externalCamera = e2, this.__elementMounted ? this.reconnectedCallback() : this.__waitingMounts.push(() => this.reconnectedCallback())) : console.warn("FPhi.Widget.Component: An external camera has been tried to be inserted, but we weren't expecting it, so it will be ignored....");
  }
  __createUserControl(e2) {
    this.__fphiWidgetConfig = e2, this.__fphiWidget = new z.SelphID.Widget(e2);
    const t2 = this.getAttribute("debugmode");
    return null != t2 && (this.__fphiWidget.debug = _O.__tryParsePrimitive(t2)), this;
  }
  async __startUserControl() {
    return this.__fphiWidget && (this.__fphiWidgetConfig.startSimpleMode ? await this.__fphiWidget.StartManual() : null !== this.__externalCamera ? await this.__fphiWidget.Start(this.__externalCamera) : await this.__fphiWidget.Start()), this;
  }
  async __stopUserControl() {
    return this.__fphiWidget && (this.__fphiWidget.Stop(), this.__fphiWidget = null), this;
  }
  async __restartUserControl(e2) {
    try {
      if (this.__fphiWidget) {
        const t2 = new z.SelphID.Widget(e2), i2 = this.__fphiWidget;
        this.__cleanWidgetContainer(), this.__fphiWidget = t2, await this.__startUserControl(), i2.Stop();
      }
    } catch (e3) {
    }
  }
  __cleanWidgetContainer() {
    this.__widgetContainer.innerHTML = "", this.__widgetContainer.append(this.__widgetStyles), this.__accessibilityHasEnabled && this.__generateAccessibilityEnv();
  }
  __setNativeConfiguration(e2, t2) {
    let i2 = false;
    if (void 0 !== _O.attributes[e2] && null !== _O.attributes[e2]) {
      const a2 = _O.attributes[e2].property, l2 = _O.attributes[e2].type, d2 = t2, s2 = Reflect.get(this.__config, a2);
      if (null != t2 && d2 !== s2) {
        let e3 = null;
        switch (l2) {
          case "event":
            e3 = _O.__tryParseFunction(t2);
            break;
          case "array":
            e3 = t2.replaceAll("[", "").replaceAll("]", "").replaceAll('"', "").replaceAll("'", "").split(",");
            break;
          case "base64":
            e3 = JSON.stringify(window.atob(t2)).replaceAll('\\"', '"').replaceAll('"{', "{").replaceAll('}"', "}");
            break;
          default:
            e3 = _O.__tryParsePrimitive(t2);
        }
        if ("debugMode" === a2) void 0 !== this.__fphiWidget && null !== this.__fphiWidget && "function" != typeof e3 && (this.__fphiWidget.debug = e3, i2 = i2 || false);
        else {
          if ("forceLandscape" !== a2 || true !== e3 || this.__forceLandScapeHasEnabled || (this.__forceLandScapeHasEnabled = true, this.__accessibilityHasEnabled && this.__removeAccessibilityEnv()), "accessibility" !== a2 || true !== e3 || this.__accessibilityHasEnabled || this.__forceLandScapeHasEnabled || this.__generateAccessibilityEnv(), "function" == typeof e3 && "event" === l2) this.__widgetContainer.addEventListener(a2, e3, true);
          else {
            const t3 = _O.__getSetterAttr(a2, this.__config);
            (this.__config ? t3.bind(this.__config) : t3)(e3);
          }
          i2 = this.__elementMounted;
        }
      }
    }
    return i2;
  }
  __generateAccessibilityEnv() {
    this.accessibilityRoot = document.createElement("div"), this.accessibilityRoot.id = "accessibilityContainer", this.__widgetContainer.append(this.accessibilityRoot), this.__accessibilityHasEnabled = true;
  }
  __removeAccessibilityEnv() {
    this.__widgetContainer.removeChild(this.__widgetContainer.lastElementChild);
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
var P = class {
  constructor(e2) {
    this.width = 0, this.height = 0, this.landscape = false;
  }
  cacheResources() {
  }
  setCanvasSize(e2, t2) {
    this.width = e2, this.height = t2, this.landscape = this.width >= this.height;
  }
  getCameraRect(e2, t2, i2, a2) {
    this.setCanvasSize(e2.canvas.clientWidth, e2.canvas.clientHeight);
    var l2 = this.scaleRect({ width: t2, height: i2 }, { x: 0, y: 0, width: this.width, height: this.height });
    return l2.visible = true, l2;
  }
  getResourceIdForState(e2) {
    throw new Error("FPhi.Widget.drawer.abstract.js: Can't instantiate abstract class");
  }
  onMouseMove(e2, t2, i2, a2, l2) {
    e2.style.cursor = "button" == l2 || "buttonImage" == l2 ? "pointer" : "default";
  }
  draw(e2, t2, i2, a2, l2, d2, s2, n2, c2) {
    throw new Error("Can't instantiate abstract class");
  }
  getLayout(e2, t2, i2, a2, l2, d2, s2) {
    throw new Error("Can't instantiate abstract class");
  }
  cacheAnimation(e2, t2) {
    if (this.rm.isAttributeAvailable(e2, t2, this.landscape, "id")) for (var i2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "name"), a2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "ext"), l2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "start")), d2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "end")), s2 = l2; s2 <= d2; s2++) {
      var n2 = i2 + ("0" + s2).slice(-2) + "." + a2;
      this.rm.getImage(n2);
    }
  }
  scaleRect(e2, t2, i2) {
    var a2 = t2.x + t2.width / 2, l2 = t2.y + t2.height / 2, d2 = t2.width / e2.width, s2 = t2.height / e2.height, n2 = e2.width * d2, c2 = e2.height * d2;
    return null == i2 ? c2 < t2.height && (n2 = e2.width * s2, c2 = e2.height * s2) : c2 >= t2.height && (n2 = e2.width * s2, c2 = e2.height * s2), { x: a2 - n2 / 2, y: l2 - c2 / 2, width: n2, height: c2 };
  }
  drawButtonImage(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2;
    e2.drawImage(r2, t2.x + t2.width / 2 - h2 / 2, t2.y + t2.height / 2 - m2 / 2, h2, m2);
  }
  fillRoundRect(e2, t2, i2, a2, l2, d2) {
    a2 < 2 * d2 && (d2 = a2 / 2), l2 < 2 * d2 && (d2 = l2 / 2), e2.beginPath(), e2.moveTo(t2 + d2, i2), e2.arcTo(t2 + a2, i2, t2 + a2, i2 + l2, d2), e2.arcTo(t2 + a2, i2 + l2, t2, i2 + l2, d2), e2.arcTo(t2, i2 + l2, t2, i2, d2), e2.arcTo(t2, i2, t2 + a2, i2, d2), e2.closePath(), e2.fill();
  }
  drawButton(e2, t2, i2, a2) {
    if (this.rm.isAttributeAvailable(i2, a2, this.landscape, "radius")) {
      let l3 = this.rm.getSetupFloat(i2, a2, this.landscape, "radius");
      e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "decorator"), this.fillRoundRect(e2, t2.x, t2.y + 4, t2.width, t2.height - 4, l3), e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "background"), this.fillRoundRect(e2, t2.x, t2.y, t2.width, t2.height - 4, l3);
    } else e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "decorator"), e2.fillRect(t2.x, t2.y + 4, t2.width, t2.height - 4), e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "background"), e2.fillRect(t2.x, t2.y, t2.width, t2.height - 4);
    var l2 = this.rm.getSetupAlign(i2, a2, this.landscape, "align"), d2 = this.rm.getSetupNodeType(i2, a2), s2 = 10 * this.canvasSizeFactor;
    if ("TEXT_ID" == d2) {
      var n2 = this.rm.getSetupTextId(i2, a2, this.landscape, "content"), c2 = this.rm.translate(n2), r2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size");
      r2 = Math.round(r2 * this.fontSizeFactor);
      var o2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font");
      e2.font = r2 + "px '" + o2 + "'", e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "foreground");
      var h2 = e2.measureText(c2);
      "LEFT" == l2 ? e2.fillText(c2, t2.x + s2, t2.y + t2.height / 2) : "RIGHT" == l2 ? e2.fillText(c2, t2.x + t2.width - h2.width - s2, t2.y + t2.height / 2) : e2.fillText(c2, t2.x + t2.width / 2 - h2.width / 2, t2.y + t2.height / 2);
    } else {
      n2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "content");
      var m2 = this.rm.getImage(n2), R2 = this.canvasSizeFactor * this.rm.getImageScale();
      "LEFT" == l2 ? e2.drawImage(m2, t2.x + s2, t2.y + t2.height / 2 - m2.height * R2 / 2, m2.width * R2, m2.height * R2) : "RIGHT" == l2 ? e2.drawImage(m2, t2.x + t2.width - m2.width * R2 - s2, t2.y + t2.height / 2 - m2.height * R2 / 2, m2.width * R2, m2.height * R2) : e2.drawImage(m2, t2.x + t2.width / 2 - m2.width * R2 / 2, t2.y + t2.height / 2 - m2.height * R2 / 2, m2.width * R2, m2.height * R2);
    }
  }
  drawImage(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = false;
    if (this.rm.isAttributeAvailable(i2, a2, this.landscape, "scale") && "CONTAINER" == this.rm.getSetupResourceId(i2, a2, this.landscape, "scale") && (o2 = true), o2) e2.drawImage(r2, t2.x, t2.y, t2.width, t2.height);
    else {
      var h2 = this.canvasSizeFactor * this.rm.getImageScale(), m2 = r2.width * h2, R2 = r2.height * h2;
      e2.drawImage(r2, t2.x + t2.width / 2 - m2 / 2, t2.y + t2.height / 2 - R2 / 2, m2, R2);
    }
  }
  drawImageWithClippingCircle(e2, t2, i2, a2, l2, d2) {
    e2.save(), e2.beginPath(), e2.arc(a2, l2, d2, 0, 2 * Math.PI, false), e2.clip(), e2.drawImage(i2, t2.x, t2.y, t2.width, t2.height), e2.restore();
  }
  drawStringMultiline(e2, t2, i2, a2, l2, d2, s2, n2, c2, r2, o2 = []) {
    if (!(d2 <= 0)) {
      e2.imageSmoothingEnabled = false, d2 = Math.round(d2 * this.fontSizeFactor), e2.font = r2 + " " + d2 + "px '" + l2 + "'", e2.fillStyle = a2, e2.textBaseline = "middle";
      var h2 = t2.split("\n");
      if (o2.length > 0) {
        let r3 = true;
        for (var m2 = 0; m2 < h2.length; m2++) {
          var R2 = e2.measureText(h2[m2]);
          let t3 = m2;
          t3 >= o2.length && (t3 = o2.length - 1), R2.width > i2.width * o2[t3] && (r3 = false);
        }
        if (0 == r3) return void this.drawStringMultiline(e2, t2, i2, a2, l2, d2 - 1, s2, n2, c2, o2);
      }
      var I2 = i2.y;
      if ("CENTER" == c2) {
        var g2 = h2.length * s2;
        I2 = i2.y + i2.height / 2 - g2 / 2 + d2 / 2;
      } else "BOTTOM" == c2 && (g2 = h2.length * s2, I2 = i2.y + i2.height - g2);
      for (m2 = 0; m2 < h2.length; m2++) {
        R2 = e2.measureText(h2[m2]);
        var F2 = i2.width / 2 - R2.width / 2;
        "LEFT" == n2 ? F2 = 0 : "RIGHT" == n2 && (F2 = i2.width - R2.width), e2.fillText(h2[m2], i2.x + F2, I2 + m2 * s2);
      }
    }
  }
};
if (!j) var j = {};
j.SelphID = _;
var q = class extends P {
  constructor(e2) {
    super(e2), this.mode = e2.mode, this.preview = e2.preview, this.canvasSizeFactor = 1, this.fontSizeFactor = 1, this.enableButtonCamera = e2.enableButtonCamera, this.documentAspectRatio = e2.documentAspectRatio, this.documentRect = { x: 0, y: 0, width: 100 * this.documentAspectRatio, height: 100 }, this.searchingTextMode = 1, this.searchingTextModeTime = 0, this.cameraCount = 0;
  }
  setCanvasSize(e2, t2) {
    this.width = e2, this.height = t2, this.landscape = e2 >= t2, this.statusHeight = 50, "function" == typeof this.rm.isAttributeAvailable && this.rm.isAttributeAvailable("facephi-widget-conf", "facephi-widget-conf", this.landscape, "status_height") && (this.statusHeight = this.rm.getSetupFloat("facephi-widget-conf", "facephi-widget-conf", this.landscape, "status_height")), this.documentPadding = 30, this.buttonWidth = 216, this.buttonHeight = 55;
  }
  fromScreenToCamera(e2, t2, i2, a2, l2, d2, s2) {
    var n2 = this.getCameraRect(e2, t2, i2, a2, l2), c2 = s2.x - n2.x, r2 = s2.y - n2.y, o2 = s2.width, h2 = s2.height, m2 = { x: c2 / n2.width * t2, y: r2 / n2.height * i2, width: o2 / n2.width * t2, height: h2 / n2.height * i2 };
    return 1 == d2 && (m2.x = t2 - m2.x - m2.width), m2;
  }
  getCameraRect(e2, t2, i2, a2, l2, d2) {
    var s2 = this.scaleRect({ width: t2, height: i2 }, { x: 0, y: 0, width: a2, height: l2 });
    return s2.visible = true, "UCTutorial1" != d2 && "UCTutorial2" != d2 && "UCTutorial3" != d2 && "UCPreview" != d2 && "Error" != d2 || (s2.visible = false), s2;
  }
  getDocRectScreenSpace(e2, t2, i2) {
    var a2 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: e2 - 2 * this.documentPadding, height: t2 - this.statusHeight - 2 * this.documentPadding }, l2 = this.scaleRect(this.documentRect, a2, "inner");
    return this.cameraCount > 1 && l2.x + l2.width > e2 - 60 && l2.y + l2.height > t2 - 60 && (a2 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: e2 - 60 - this.documentPadding, height: t2 - this.statusHeight - 2 * this.documentPadding }, l2 = this.scaleRect(this.documentRect, a2, "inner")), i2 && (l2.x += i2, l2.y += i2, l2.width -= 2 * i2, l2.height -= 2 * i2), l2;
  }
  getDocRect(e2, t2, i2, a2, l2, d2, s2) {
    var n2 = this.getDocRectScreenSpace(a2, l2, s2);
    return this.fromScreenToCamera(e2, t2, i2, a2, l2, d2, n2);
  }
  getResourceIdForState(e2) {
    return "UCWaitingFaceStart" == e2 ? "StartExtractor" : "UCCapture" == e2 || "UCCaptureCameraSwitch" == e2 || "UCCaptureTip" == e2 ? "UCCapture" : "UCCaptureStatus" == e2 ? "UCCaptureStatus" : "UCPreview" == e2 ? "UCPreview" : "UCTimeoutPreview" == e2 ? "UCTimeoutPreview" : "UCFlip" == e2 ? "UCFlip" : "UCTutorial1" == e2 ? "UCTutorial1" : "UCTutorial2" == e2 ? "UCTutorial2" : "UCTutorial3" == e2 ? "UCTutorial3" : "UCWaitRecording" == e2 ? "WaitRecording" : "UCError" == e2 ? "Error" : "InfoFront" == e2 || "PreviewFront" == e2 || "InfoBack" == e2 || "PreviewBack" == e2 ? e2 : null;
  }
  onMouseMove(e2, t2, i2, a2, l2) {
    e2.style.cursor = "button" == l2 || "buttonImage" == l2 ? "pointer" : "default";
  }
  draw(e2, t2, i2, a2, l2, d2, s2, n2, c2) {
    if (e2.imageSmoothingEnabled = true, "background" == l2) this.drawBackground(e2, t2, i2, a2);
    else if ("clearRect" == l2) this.clearRect(e2, t2, i2, a2);
    else if ("imageProc" == l2) this.drawImageProc(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("button" == l2) this.drawButton(e2, t2, i2, a2);
    else if ("buttonGradient" == l2) this.drawButtonGradient(e2, t2, i2, a2);
    else if ("buttonImage" == l2) this.drawButtonImage(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("image" == l2) this.drawImage(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("text" == l2) this.drawText(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("documentBorder" == l2) this.drawDocumentBorder(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("documentFlipper" == l2) this.drawDocumentFlipper(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("video" == l2) null != c2.player && e2.drawImage(c2.player, t2.x, t2.y, t2.width, t2.height);
    else if ("animation" == l2) {
      var r2 = 0;
      "UCLivenessMoveDetecting" == c2.state && (r2 = c2.livenessMoveDirection), this.drawAnimation(e2, t2, i2, a2, d2, s2, n2, c2, r2);
    } else if ("initialTip" == l2) this.drawInitialTip(e2, t2, i2, a2, d2, s2, n2, c2);
    else if ("progressRecord" == a2) {
      e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "background_color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height), e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "progress_color");
      let l3 = 0.2 * t2.width, d3 = s2 % 2 / 1.6, n3 = t2.width * d3 - l3, c3 = n3 + l3;
      n3 < 0 && (n3 = 0), n3 > t2.width && (n3 = t2.width), c3 > t2.width && (c3 = t2.width), e2.fillRect(t2.x + n3, t2.y, c3 - n3, t2.height);
    } else "rectangle" == l2 && (e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height));
  }
  getLayout(e2, t2, i2, a2, l2, d2, s2, n2) {
    if ("document" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
    if ("documentFlipper" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
    if ("logo" == i2) {
      var c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2;
      return { x: this.width / 2 - h2 / 2, y: this.height - m2 - 16, width: h2, height: m2 };
    }
    if ("background" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
    if ("preview" == i2 || "previewFail" == i2) {
      let e3, t3 = 0;
      if ("UCPreview" == n2.state || "PreviewFront" == n2.state || "PreviewBack" == n2.state) {
        this.landscape && (t3 = 64);
        let i3 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding - t3 };
        e3 = this.scaleRect(this.documentRect, i3, "inner");
      } else e3 = this.getDocRectScreenSpace(this.width, this.height, 0);
      if (("UCPreview" == n2.state || "PreviewFront" == n2.state || "PreviewBack" == n2.state) && 0 == this.landscape) {
        let t4 = this.height - 50 - 100 - 39 - 12;
        e3.y = 50 + t4 / 2 - e3.height / 2;
      }
      return e3;
    }
    if ("button_ok" == i2) {
      if (this.landscape) {
        var R2 = 300;
        return this.width / 2 < 364 && (R2 = this.width / 2 - 16 - 16), { x: this.width - R2 - 16, y: this.height - 14 - 50, width: R2, height: 50 };
      }
      {
        let e3 = 50, t3 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding }, i3 = this.scaleRect(this.documentRect, t3, "inner"), a3 = this.height - e3 - 2 * e3 - 39 - 12;
        return i3.y = e3 + a3 / 2 - i3.height / 2, i3.y, i3.height, { x: this.documentPadding, y: this.height - 14 - 50, width: this.width - 2 * this.documentPadding, height: e3 };
      }
    }
    if ("button_repeat" == i2) {
      if (this.landscape) return R2 = 300, this.width / 2 < 364 && (R2 = this.width / 2 - 16 - 16), { x: 16, y: this.height - 14 - 50, width: R2, height: 50 };
      {
        let e3 = 50, t3 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding }, i3 = this.scaleRect(this.documentRect, t3, "inner"), a3 = this.height - e3 - 2 * e3 - 39 - 12;
        return i3.y = e3 + a3 / 2 - i3.height / 2, i3.y, i3.height, { x: this.documentPadding, y: this.height - 28 - 100, width: this.width - 2 * this.documentPadding, height: e3 };
      }
    }
    if ("button_start" == i2) {
      if ("InfoFront" == n2.state || "InfoBack" == n2.state) return { x: this.width / 2 - 134, y: this.height - 66 - 40, width: 268, height: 48 };
      if (this.landscape) return { x: this.width / 2 - 75, y: this.height / 2 - 25, width: 150, height: 50 };
      {
        let e3 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding }, t3 = this.scaleRect(this.documentRect, e3, "inner"), i3 = this.height - 50 - 100 - 39 - 12;
        t3.y = 50 + i3 / 2 - t3.height / 2;
        let a3 = t3.y + t3.height + 20;
        return { x: this.documentPadding, y: a3, width: this.width - 2 * this.documentPadding, height: 50 };
      }
    }
    if ("text" == i2) {
      if (this.landscape) {
        if ("UCCaptureStatus" == n2.state) {
          var I2 = 0, g2 = { x: 1.2 * this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding - I2 };
          return { x: (F2 = this.scaleRect(this.documentRect, g2, "inner")).x + 0.4 * F2.width, y: F2.y, width: 0.6 * F2.width, height: F2.height };
        }
        return "UCWaitRecording" == n2.state ? { x: 0, y: 0.6 * this.height, width: this.width, height: 50 } : "InfoFront" == n2.state || "InfoBack" == n2.state ? { x: 0, y: 374 * this.height / 640, width: this.width, height: 50 } : "UCTimeoutPreview" == n2.state || "PreviewFront" == n2.state || "PreviewBack" == n2.state ? { x: 0, y: 0, width: this.width, height: 70 } : { x: 0, y: 0, width: this.width, height: 50 };
      }
      return "UCCapture" == n2.state || "UCCaptureCameraSwitch" == n2.state || "UCCaptureTip" == n2.state ? { x: 0, y: (F2 = this.getDocRectScreenSpace(this.width, this.height, 0)).y - 35, width: this.width, height: F2.y } : "UCCaptureStatus" == n2.state ? (I2 = 0, g2 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding - I2 }, { x: 1.25 * (F2 = this.scaleRect(this.documentRect, g2, "inner")).x + 0.4 * F2.width, y: F2.y, width: 0.6 * F2.width, height: F2.height }) : "UCWaitRecording" == n2.state ? { x: 0, y: 0.6 * this.height, width: this.width, height: 50 } : "InfoFront" == n2.state || "InfoBack" == n2.state ? { x: 0, y: 374 * this.height / 640, width: this.width, height: 50 } : "UCTimeoutPreview" == n2.state ? { x: 0, y: 0, width: this.width, height: 70 } : { x: 0, y: 0, width: this.width, height: 50 };
    }
    if ("diagnostic" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
    if ("text_detail" == i2) {
      if ("UCTimeoutPreview" == n2.state) return this.landscape ? { x: this.width / 2, y: 330 * this.height / 640, width: this.width / 2, height: 50 } : { x: 0, y: 374 * this.height / 640, width: this.width, height: 50 };
      if (0 == this.landscape) return { x: 0, y: (F2 = this.getDocRectScreenSpace(this.width, this.height, 0)).y + F2.height + 15 + 7, width: this.width, height: this.height };
    } else {
      if ("text_detail2" == i2) return this.landscape ? { x: this.width / 2, y: 280 * this.height / 640, width: this.width / 2, height: 50 } : { x: 0, y: 320 * this.height / 640, width: this.width, height: 50 };
      if ("previewImgOk" == i2 || "previewImgFail" == i2) {
        I2 = 0, "UCPreview" == n2.state && this.landscape && (I2 = 64), g2 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding - I2 };
        var F2 = this.scaleRect(this.documentRect, g2, "inner");
        if ("UCPreview" == n2.state && 0 == this.landscape) {
          var Z2 = this.height - 50 - 100 - 39 - 12;
          F2.y = 50 + Z2 / 2 - F2.height / 2;
        }
        return c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2, { x: F2.x + F2.width / 2.5 - h2, y: F2.y + F2.height / 2 - m2 / 2, width: h2, height: m2 };
      }
      if ("tip" == i2) return this.landscape ? { x: 0, y: 30, width: this.width, height: 200 } : { x: 0, y: 50, width: this.width, height: 200 };
      if ("tip_detail" == i2) return this.landscape ? { x: this.width / 2, y: 0, width: this.width / 2, height: this.height } : { x: 0, y: this.height / 2 - 60, width: this.width, height: this.height - this.documentPadding - 15 - 2 * this.buttonHeight - (this.height / 2 - 60 - 95) };
      if ("background" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
      if ("button_skip" == i2) {
        if (this.landscape) {
          var U2 = this.buttonWidth;
          return this.width < 800 && ((u2 = (this.width - 600) / 200) < 0 && (u2 = 0), U2 -= U2 / 2 * (u2 = 1 - u2)), { x: this.documentPadding, y: this.height - this.documentPadding - this.buttonHeight, width: U2, height: this.buttonHeight };
        }
        {
          let e3 = this.width - 2 * this.documentPadding;
          return e3 > 262 && (e3 = 262), { x: this.width / 2 - e3 / 2, y: this.height - this.documentPadding - this.buttonHeight, width: e3, height: this.buttonHeight };
        }
      }
      if ("button_next" == i2) {
        if (this.landscape) return U2 = this.buttonWidth, this.width < 800 && ((u2 = (this.width - 600) / 200) < 0 && (u2 = 0), U2 -= U2 / 2 * (u2 = 1 - u2)), { x: this.width - this.documentPadding - U2, y: this.height - this.documentPadding - this.buttonHeight, width: U2, height: this.buttonHeight };
        {
          let e3 = this.width - 2 * this.documentPadding;
          return e3 > 262 && (e3 = 262), { x: this.width / 2 - e3 / 2, y: this.height - this.documentPadding - 15 - 2 * this.buttonHeight, width: e3, height: this.buttonHeight };
        }
      }
      if ("button_finish" == i2) {
        var u2;
        if (this.landscape) return U2 = this.buttonWidth, this.width < 800 && ((u2 = (this.width - 600) / 200) < 0 && (u2 = 0), U2 -= U2 / 2 * (u2 = 1 - u2)), { x: this.width - this.documentPadding - U2, y: this.height - this.documentPadding - this.buttonHeight, width: U2, height: this.buttonHeight };
        {
          let e3 = this.width - 2 * this.documentPadding;
          return e3 > 262 && (e3 = 262), { x: this.width / 2 - e3 / 2, y: this.height - this.documentPadding - 15 - 2 * this.buttonHeight, width: e3, height: this.buttonHeight };
        }
      }
      if ("button_back" == i2) {
        let e3 = this.width - 2 * this.documentPadding;
        return e3 > 262 && (e3 = 262), { x: 5, y: 0, width: e3, height: this.buttonHeight };
      }
      if ("video" == i2) return this.landscape ? (g2 = { x: this.documentPadding, y: 60, width: this.width / 2 - 2 * this.documentPadding, height: this.height - this.buttonHeight - 2 * this.documentPadding - 50 }, this.scaleRect(this.documentRect, g2, "inner")) : (g2 = { x: this.documentPadding, y: 95, width: this.width - 2 * this.documentPadding, height: this.height / 2 - 60 }, this.scaleRect(this.documentRect, g2, "inner"));
      if ("initial_tip" == i2) {
        if ("UCCaptureTip" == n2.state) return { x: 0, y: 0, width: this.width, height: this.height };
      } else if ("button_initial_tip" == i2) {
        if ("UCCaptureTip" == n2.state) return { x: this.width / 2 - 113, y: this.height / 2 - 79 + 92, width: 226, height: 45 };
      } else {
        if ("progressRecord" == i2) return { x: 0.146 * this.width, y: 0.52 * this.height, width: 0.7 * this.width, height: 18 };
        if ("imageFront" == i2 || "imageBack" == i2) return "UCTimeoutPreview" == n2.state ? this.landscape ? (R2 = this.height - 70 - 70, { x: 0, y: 75, width: this.width / 2, height: R2 }) : (R2 = 220 * this.height / 640, { x: this.width / 2 - R2 / 2, y: 75, width: R2, height: R2 }) : (R2 = 177 * this.height / 640, { x: this.width / 2 - R2 / 2, y: 103 * this.height / 640, width: R2, height: R2 });
        if ("titleBox" == i2) return { x: 0, y: 0, width: this.width, height: 70 };
        if ("tip_video" == i2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("video_success" == i2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("extraction_video" == i2) return { x: this.width / 2 - 0.1 * this.width, y: 0.73 * this.height, width: 0.2 * this.width, height: 0.2 * this.width };
        if ("button_finish" == i2) return { x: 0.55 * this.width, y: this.height - this.buttonHeight, width: 0.4 * this.width, height: this.buttonHeight };
        if ("button_exit" == i2) return c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2, "UCTimeoutPreview" == n2.state ? { x: this.width - h2 - 30, y: 0, width: h2 + 30, height: 70 } : { x: this.width - h2 - 30, y: 0, width: h2 + 30, height: 50 };
        if ("button_info" == i2) return c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2, { x: 0, y: 0, width: h2 + 30, height: 50 };
        if ("button_camera" == i2) return this.cameraCount < 2 ? null : this.enableButtonCamera ? (c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2, { x: this.width - h2 - 16, y: this.height - m2 - 12, width: h2 + 16, height: m2 + 12 }) : null;
        if ("button_rotate" == i2) return c2 = this.rm.getSetupResourceId(t2, i2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2, F2 = this.getDocRectScreenSpace(this.width, this.height, 0), "UCPreview" != n2.state && "PreviewFront" != n2.state && "PreviewBack" != n2.state || (g2 = { x: this.documentPadding, y: this.statusHeight + this.documentPadding, width: this.width - 2 * this.documentPadding, height: this.height - this.statusHeight - 2 * this.documentPadding - I2 }, F2 = this.scaleRect(this.documentRect, g2, "inner"), 0 == this.landscape && (Z2 = this.height - 50 - 100 - 39 - 12, F2.y = 50 + Z2 / 2 - F2.height / 2)), { x: F2.x, y: 30, width: h2 + 16, height: m2 + 12 };
        if ("warning" == i2) return { x: 0, y: 0.91 * this.height, width: this.width, height: 0.1 * this.height };
        if ("warningTooFar" == i2) return { x: 0, y: 0.89 * this.height, width: this.width, height: 0.1 * this.height };
        if ("camera" == a2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("results" == a2) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("liveness_move_text" == i2) return "UCLivenessMoveStabilizing" == n2.state || "UCLivenessMoveStabilized" == n2.state || "UCLivenessMoveDetecting" == n2.state ? { x: 0, y: 0.89 * this.height, width: this.width, height: 0.1 * this.height } : null;
        if ("liveness_move_tip_text" == i2) return 800 == this.width ? null : { x: this.circleX - this.circleRadius, y: this.circleY - 0.39 * this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("liveness_move_tip_text_challenge" == i2) return 800 != this.width ? null : { x: this.circleX - this.circleRadius, y: this.circleY - 0.39 * this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        if ("livenessInfo_text" == i2) return { x: 0, y: 0.89 * this.height, width: this.width, height: 0.1 * this.height };
        if ("liveness_move_left" == i2 || "liveness_move_right" == i2 || "liveness_move_top" == i2 || "liveness_move_bottom" == i2) {
          if (-1 == n2.livenessMoveDirection) return null;
          if ("UCLivenessMoveDetecting" == n2.state && d2 >= 0.25 && d2 < 1.75) {
            if (0 == n2.livenessMoveDirection && "liveness_move_top" != i2) return null;
            if (2 == n2.livenessMoveDirection && "liveness_move_bottom" != i2) return null;
            if (1 == n2.livenessMoveDirection && "liveness_move_right" != i2) return null;
            if (3 == n2.livenessMoveDirection && "liveness_move_left" != i2) return null;
            var b2 = false;
            return this.rm.isAttributeAvailable(t2, i2, "fullscreen") && "true" == this.rm.getSetupResourceId(t2, i2, this.landscape, "fullscreen") && (b2 = true), b2 ? { x: 0, y: 0, width: this.width, height: this.height } : { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
          }
          return null;
        }
        if ("face_searcher" == i2) return { x: 0, y: 0, width: this.width, height: this.height };
        if ("livenessMoveGlasses" == i2) {
          if (2 == n2.livenessMoveFailReason) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        } else if ("livenessMoveSunGlasses" == i2) {
          if (0 == n2.livenessMoveFailReason) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        } else if ("livenessMoveInfo" == i2) {
          if (1 == n2.livenessMoveFailReason) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        } else {
          if ("animation" == a2) return i2 != n2.state ? null : (b2 = false, this.rm.isAttributeAvailable(t2, i2, "fullscreen") && "true" == this.rm.getSetupResourceId(t2, i2, this.landscape, "fullscreen") && (b2 = true), b2 ? { x: 0, y: 0, width: this.width, height: this.height } : { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius });
          if (("liveness_ok" == i2 || "liveness_nok" == i2) && "UCLivenessMoveStabilizing" == n2.state) return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: 2 * this.circleRadius, height: 2 * this.circleRadius };
        }
      }
    }
    return null;
  }
  drawBackground(e2, t2, i2, a2) {
    e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "color"), e2.fillRect(t2.x, t2.y, t2.width, t2.height);
  }
  clearRect(e2, t2, i2, a2) {
    e2.clearRect(t2.x, t2.y, t2.width, t2.height);
  }
  drawPoint(e2, t2, i2, a2, l2) {
    e2.fillStyle = l2, e2.beginPath(), e2.arc(t2, i2, a2, 0, 2 * Math.PI), e2.fill();
  }
  drawLine(e2, t2, i2, a2, l2, d2) {
    e2.lineWidth = 1, e2.strokeStyle = d2, e2.beginPath(), e2.moveTo(t2, i2), e2.lineTo(a2, l2), e2.stroke();
  }
  drawButtonImage(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = this.canvasSizeFactor * this.rm.getImageScale(), h2 = r2.width * o2, m2 = r2.height * o2;
    e2.drawImage(r2, t2.x + t2.width / 2 - h2 / 2, t2.y + t2.height / 2 - m2 / 2, h2, m2);
  }
  drawButton(e2, t2, i2, a2) {
    let l2 = 0;
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "radius") && (l2 = this.rm.getSetupFloat(i2, a2, this.landscape, "radius"));
    var d2 = this.rm.getSetupColor(i2, a2, this.landscape, "background");
    this.fillRoundedRect(e2, t2, l2, 1, 1, d2);
    var s2 = this.rm.getSetupColor(i2, a2, this.landscape, "decorator");
    this.drawRoundedRectProgressive(e2, t2, l2, 1, 1, s2, 1);
    var n2 = this.rm.getSetupAlign(i2, a2, this.landscape, "align"), c2 = this.rm.getSetupNodeType(i2, a2, this.landscape), r2 = 10 * this.canvasSizeFactor;
    if ("TEXT_ID" == c2) {
      var o2 = this.rm.getSetupTextId(i2, a2, this.landscape, "content"), h2 = this.rm.translate(o2), m2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size");
      m2 = Math.round(m2 * this.fontSizeFactor);
      var R2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font");
      e2.font = m2 + "px '" + R2 + "'", e2.textBaseline = "alphabetic", e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "foreground");
      var I2 = e2.measureText(h2);
      "LEFT" == n2 ? e2.fillText(h2, t2.x + r2, t2.y + t2.height / 2 + m2 / 2) : "RIGHT" == n2 ? e2.fillText(h2, t2.x + t2.width - I2.width - r2, t2.y + t2.height / 2 + m2 / 2) : e2.fillText(h2, t2.x + t2.width / 2 - I2.width / 2, t2.y + t2.height / 2 + m2 / 2);
    } else {
      o2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "content");
      var g2 = this.rm.getImage(o2), F2 = this.canvasSizeFactor * this.rm.getImageScale();
      "LEFT" == n2 ? e2.drawImage(g2, t2.x + r2, t2.y + t2.height / 2 - g2.height * F2 / 2, g2.width * F2, g2.height * F2) : "RIGHT" == n2 ? e2.drawImage(g2, t2.x + t2.width - g2.width * F2 - r2, t2.y + t2.height / 2 - g2.height * F2 / 2, g2.width * F2, g2.height * F2) : e2.drawImage(g2, t2.x + t2.width / 2 - g2.width * F2 / 2, t2.y + t2.height / 2 - g2.height * F2 / 2, g2.width * F2, g2.height * F2);
    }
  }
  drawButtonGradient(e2, t2, i2, a2) {
    let l2 = 0;
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "radius") && (l2 = this.rm.getSetupFloat(i2, a2, this.landscape, "radius"));
    var d2 = this.rm.getSetupColor(i2, a2, this.landscape, "colorFrom"), s2 = this.rm.getSetupColor(i2, a2, this.landscape, "colorTo");
    this.fillRoundedRectGradient(e2, t2, l2, 1, 1, d2, s2);
    var n2 = this.rm.getSetupColor(i2, a2, this.landscape, "decorator");
    this.drawRoundedRectProgressive(e2, t2, l2, 1, 1, n2, 1);
    var c2 = this.rm.getSetupAlign(i2, a2, this.landscape, "align"), r2 = this.rm.getSetupNodeType(i2, a2, this.landscape), o2 = 10 * this.canvasSizeFactor;
    if ("TEXT_ID" == r2) {
      var h2 = this.rm.getSetupTextId(i2, a2, this.landscape, "content"), m2 = this.rm.translate(h2), R2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size");
      R2 = Math.round(R2 * this.fontSizeFactor);
      var I2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font");
      e2.font = R2 + "px '" + I2 + "'", e2.textBaseline = "alphabetic", e2.fillStyle = this.rm.getSetupColor(i2, a2, this.landscape, "foreground");
      var g2 = e2.measureText(m2);
      "LEFT" == c2 ? e2.fillText(m2, t2.x + o2, t2.y + t2.height / 2 + R2 / 2) : "RIGHT" == c2 ? e2.fillText(m2, t2.x + t2.width - g2.width - o2, t2.y + t2.height / 2 + R2 / 2) : e2.fillText(m2, t2.x + t2.width / 2 - g2.width / 2, t2.y + t2.height / 2 + R2 / 2);
    } else {
      h2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "content");
      var F2 = this.rm.getImage(h2), Z2 = this.canvasSizeFactor * this.rm.getImageScale();
      "LEFT" == c2 ? e2.drawImage(F2, t2.x + o2, t2.y + t2.height / 2 - F2.height * Z2 / 2, F2.width * Z2, F2.height * Z2) : "RIGHT" == c2 ? e2.drawImage(F2, t2.x + t2.width - F2.width * Z2 - o2, t2.y + t2.height / 2 - F2.height * Z2 / 2, F2.width * Z2, F2.height * Z2) : e2.drawImage(F2, t2.x + t2.width / 2 - F2.width * Z2 / 2, t2.y + t2.height / 2 - F2.height * Z2 / 2, F2.width * Z2, F2.height * Z2);
    }
  }
  drawImageProc(e2, t2, i2, a2, l2, d2, s2, n2) {
    if (null != n2.previewImage) {
      let l3 = "#ffffff";
      this.rm.isAttributeAvailable(i2, a2, this.landscape, "backgroundColor") && (l3 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColor")), e2.fillStyle = l3, e2.fillRect(t2.x, t2.y, t2.width, t2.height);
      var c2 = n2.previewImage, r2 = this.canvasSizeFactor * this.rm.getImageScale(), o2 = { x: 0, y: 0, width: c2.width * r2, height: c2.height * r2 }, h2 = this.scaleRect(o2, t2, "inner");
      e2.drawImage(c2, h2.x, h2.y, h2.width, h2.height);
    }
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "overlay") && this.fillRoundedRect(e2, t2, 6, 1, 1, this.rm.getSetupColor(i2, a2, this.landscape, "overlay"));
  }
  drawImage(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "value"), r2 = this.rm.getImage(c2), o2 = false;
    if (this.rm.isAttributeAvailable(i2, a2, this.landscape, "scale") && "CONTAINER" == this.rm.getSetupResourceId(i2, a2, this.landscape, "scale") && (o2 = true), o2) e2.drawImage(r2, t2.x, t2.y, t2.width, t2.height);
    else {
      var h2 = this.canvasSizeFactor * this.rm.getImageScale(), m2 = r2.width * h2, R2 = r2.height * h2;
      e2.drawImage(r2, t2.x + t2.width / 2 - m2 / 2, t2.y + t2.height / 2 - R2 / 2, m2, R2);
    }
  }
  drawImageWithClippingCircle(e2, t2, i2, a2, l2, d2) {
    e2.save(), e2.beginPath(), e2.arc(a2, l2, d2, 0, 2 * Math.PI, false), e2.clip(), e2.drawImage(i2, t2.x, t2.y, t2.width, t2.height), e2.restore();
  }
  cacheAnimation(e2, t2) {
    for (var i2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "name"), a2 = this.rm.getSetupResourceId(e2, t2, this.landscape, "ext"), l2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "start")), d2 = parseInt(this.rm.getSetupResourceId(e2, t2, this.landscape, "end")), s2 = l2; s2 <= d2; s2++) {
      var n2 = i2 + ("0" + s2).slice(-2) + "." + a2;
      this.rm.getImage(n2);
    }
  }
  drawAnimation(e2, t2, i2, a2, l2, d2, s2, n2, c2) {
    var r2 = 0.1;
    this.rm.isAttributeAvailable(i2, a2, "rate") && (r2 = 1 / parseFloat(this.rm.getSetupResourceId(i2, a2, this.landscape, "rate")));
    var o2 = "FINISH";
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "animMode") && (o2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "animMode"));
    var h2, m2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "name"), R2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "ext"), I2 = parseInt(this.rm.getSetupResourceId(i2, a2, this.landscape, "start")), g2 = parseInt(this.rm.getSetupResourceId(i2, a2, this.landscape, "end")), F2 = r2 * (g2 - I2 + 1);
    if ("FINISH" == o2) (h2 = Math.floor(d2 / r2 + I2)) > g2 && (h2 = g2);
    else {
      var Z2 = d2 % F2 / F2;
      h2 = Math.floor((g2 - I2) * Z2 + I2);
    }
    h2 < I2 && (h2 = I2), h2 > g2 && (h2 = g2);
    var U2 = m2 + ("0" + h2).slice(-2) + "." + R2, u2 = this.rm.getImage(U2);
    e2.drawImage(u2, t2.x, t2.y, t2.width, t2.height);
  }
  drawInitialTip(e2, t2, i2, a2, l2, d2, s2, n2) {
    e2.fillStyle = "rgba(0,0,0,0.7)", e2.fillRect(t2.x, t2.y, t2.width, t2.height);
    let c2 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColor"), r2 = { x: this.width / 2 - 160, y: this.height / 2 - 79, width: 320, height: 158 };
    this.fillRoundedRect(e2, r2, 6, 1, 1, c2);
    var o2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "image"), h2 = this.rm.getImage(o2), m2 = this.canvasSizeFactor * this.rm.getImageScale(), R2 = h2.width * m2, I2 = h2.height * m2;
    e2.drawImage(h2, r2.x + 16, r2.y + 31, R2, I2);
    var g2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size"), F2 = g2 + 1;
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "line_height") && (F2 = this.rm.getSetupFloat(i2, a2, this.landscape, "line_height"));
    var Z2 = this.rm.getSetupColor(i2, a2, this.landscape, "color"), U2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font"), u2 = { x: r2.x + 50, y: r2.y, width: r2.width - 35, height: 92 }, b2 = this.rm.translate("capture_tip_text");
    this.drawStringMultiline(e2, b2, u2, Z2, U2, g2, F2, "LEFT", "CENTER", "");
  }
  drawDocumentBorder(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupColor(i2, a2, this.landscape, "documentBorderColor"), r2 = this.rm.getSetupColor(i2, a2, this.landscape, "documentBorderDetectedColor"), o2 = 0;
    "UCPreview" != n2.state && "PreviewFront" != n2.state && "PreviewBack" != n2.state || this.landscape && (o2 = 64);
    let h2 = this.rm.getSetupColor(i2, a2, this.landscape, "statusColor");
    0 == n2.cameraOverflow && (h2 = this.rm.getSetupColor(i2, a2, this.landscape, "statusColorVariant")), e2.fillStyle = h2, e2.fillRect(t2.x, t2.y, t2.width, this.statusHeight);
    var m2 = this.getDocRectScreenSpace(t2.width, t2.height, 0);
    if ("UCPreview" == n2.state || "PreviewFront" == n2.state || "PreviewBack" == n2.state) {
      var R2 = { x: t2.x + this.documentPadding, y: t2.y + this.statusHeight + this.documentPadding, width: t2.width - 2 * this.documentPadding, height: t2.height - this.statusHeight - 2 * this.documentPadding - o2 };
      if (m2 = this.scaleRect(this.documentRect, R2, "inner"), 0 == this.landscape) {
        var I2 = this.height - 50 - 100 - 39 - 12;
        m2.y = 50 + I2 / 2 - m2.height / 2;
      }
    }
    e2.save(), e2.beginPath(), e2.rect(t2.x, t2.y + this.statusHeight, t2.width, t2.height - this.statusHeight), e2.rect(m2.x, m2.y, m2.width, m2.height), e2.closePath(), e2.clip("evenodd");
    let g2 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColor");
    0 == n2.cameraOverflow && (g2 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColorVariant")), e2.fillStyle = g2, e2.fillRect(t2.x, t2.y + this.statusHeight, t2.width, t2.height - this.statusHeight), e2.restore();
    var F2 = this.rm.getSetupFloat(i2, a2, this.landscape, "documentBorder");
    if (this.drawRoundedRectProgressive(e2, m2, 6, F2, 2 * F2, c2, 1), "UCCapture" == n2.state) {
      var Z2 = 0;
      1 == n2.contour[0] && Z2++, 1 == n2.contour[1] && Z2++, 1 == n2.contour[2] && Z2++, 1 == n2.contour[3] && Z2++, Z2 >= 2 ? l2 - this.searchingTextModeTime > 0.5 && (this.searchingTextMode = 2, this.searchingTextModeTime = l2) : l2 - this.searchingTextModeTime > 0.5 && (this.searchingTextMode = 1, this.searchingTextModeTime = l2);
      var U2, u2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size"), b2 = this.rm.getSetupColor(i2, a2, this.landscape, "font_color"), V2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font");
      U2 = 1 == this.searchingTextMode ? this.rm.translate("searching1_text") : this.rm.translate("searching2_text"), this.drawStringMultiline(e2, U2, m2, b2, V2, u2, "CENTER", "CENTER", "");
    }
    e2.lineWidth = this.rm.getSetupFloat(i2, a2, this.landscape, "documentBorder");
    var W2 = 0.15 * m2.width, C2 = 0.15 * m2.height;
    1 == n2.contour[0] && (e2.beginPath(), e2.strokeStyle = 1 == n2.contour[0] ? r2 : c2, e2.moveTo(m2.x + W2, m2.y + 6), e2.lineTo(m2.x + m2.width - W2, m2.y + 6), e2.stroke()), 1 == n2.contour[1] && (e2.beginPath(), e2.strokeStyle = 1 == n2.contour[1] ? r2 : c2, e2.moveTo(m2.x + m2.width - 6, m2.y + C2), e2.lineTo(m2.x + m2.width - 6, m2.y + m2.height - C2), e2.stroke()), 1 == n2.contour[2] && (e2.beginPath(), e2.strokeStyle = 1 == n2.contour[2] ? r2 : c2, e2.moveTo(m2.x + m2.width - W2, m2.y + m2.height - 6), e2.lineTo(m2.x + W2, m2.y + m2.height - 6), e2.stroke()), 1 == n2.contour[3] && (e2.beginPath(), e2.strokeStyle = 1 == n2.contour[3] ? r2 : c2, e2.moveTo(m2.x + 6, m2.y + m2.height - C2), e2.lineTo(m2.x + 6, m2.y + C2), e2.stroke());
  }
  drawDocumentFlipper(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupColor(i2, a2, this.landscape, "documentBorderColor");
    this.rm.getSetupColor(i2, a2, this.landscape, "documentBorderDetectedColor");
    let r2 = this.rm.getSetupColor(i2, a2, this.landscape, "statusColor");
    0 == n2.cameraOverflow && (r2 = this.rm.getSetupColor(i2, a2, this.landscape, "statusColorVariant")), e2.fillStyle = r2, e2.fillRect(t2.x, t2.y, t2.width, this.statusHeight);
    var o2, h2 = this.getDocRectScreenSpace(this.width, this.height, 0), m2 = h2.x + h2.width / 2, R2 = 0.5;
    d2 < R2 ? (o2 = 1 - (1 - (o2 = 1 - d2 / R2)) * (1 - o2) * (1 - o2), h2.width = h2.width * o2, h2.x = m2 - h2.width / 2) : (o2 = 1 - (1 - (o2 = (d2 - R2) / R2)) * (1 - o2) * (1 - o2), h2.width = h2.width * o2, h2.x = m2 - h2.width / 2), e2.save(), e2.beginPath(), e2.rect(t2.x, t2.y + this.statusHeight, t2.width, t2.height - this.statusHeight), e2.rect(h2.x, h2.y, h2.width, h2.height), e2.closePath(), e2.clip("evenodd");
    let I2 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColor");
    if (0 == n2.cameraOverflow && (I2 = this.rm.getSetupColor(i2, a2, this.landscape, "backgroundColorVariant")), e2.fillStyle = I2, e2.fillRect(t2.x, t2.y + this.statusHeight, t2.width, t2.height - this.statusHeight), e2.restore(), e2.lineWidth = this.rm.getSetupFloat(i2, a2, this.landscape, "documentBorder"), e2.strokeStyle = c2, e2.strokeRect(h2.x, h2.y, h2.width, h2.height), d2 < R2) {
      var g2 = n2.previewImage;
      e2.drawImage(g2, h2.x, h2.y, h2.width, h2.height);
    }
  }
  drawText(e2, t2, i2, a2, l2, d2, s2, n2) {
    var c2 = this.rm.getSetupFloat(i2, a2, this.landscape, "font_size"), r2 = c2 + 1;
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "line_height") && (r2 = this.rm.getSetupFloat(i2, a2, this.landscape, "line_height"));
    var o2 = this.rm.getSetupColor(i2, a2, this.landscape, "color"), h2 = this.rm.getSetupResourceId(i2, a2, this.landscape, "font"), m2 = "CENTER";
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "align") && (m2 = this.rm.getSetupAlign(i2, a2, this.landscape, "align"));
    var R2 = "TOP";
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "valign") && (R2 = this.rm.getSetupAlign(i2, a2, this.landscape, "valign"));
    var I2 = "";
    this.rm.isAttributeAvailable(i2, a2, this.landscape, "fontWeight") && (I2 = this.rm.getSetupTextId(i2, a2, this.landscape, "fontWeight")), l2 < 0.1 && (o2 = "#00000000");
    let g2 = [];
    if (this.rm.isAttributeAvailable(i2, a2, "multiline")) {
      let e3 = this.rm.getSetupTextId(i2, a2, "multiline").split(",");
      for (let t3 = 0; t3 < e3.length; t3++) g2.push(parseFloat(e3[t3]));
    }
    var F2 = "";
    if ("text" == a2) "UCCapture" == i2 ? F2 = n2.status == j.SelphID.Mode.Front ? this.rm.translate("capture_front_text") : this.rm.translate("capture_back_text") : "UCCaptureStatus" == i2 ? F2 = n2.status == j.SelphID.Mode.Front ? "Warning" == s2 ? this.rm.translate("capture_status_front_fail") : this.rm.translate("capture_status_front_ok") : "Warning" == s2 ? this.rm.translate("capture_status_back_fail") : this.rm.translate("capture_status_back_ok") : "UCPreview" == i2 ? F2 = n2.status == j.SelphID.Mode.Front ? this.rm.translate("preview_front_text") : this.rm.translate("preview_back_text") : "UCFlip" == i2 ? F2 = this.rm.translate("flip_document") : "WaitRecording" == i2 ? F2 = this.rm.translate("waitRecording") : "InfoFront" == i2 ? F2 = this.rm.translate("infoFront") : "InfoBack" == i2 ? F2 = this.rm.translate("infoBack") : "PreviewFront" == i2 || "PreviewBack" == i2 ? F2 = this.rm.translate("infoQuality") : "UCTimeoutPreview" == i2 && (F2 = this.rm.translate("infoTimeoutTitle"));
    else if ("text_detail" == a2) F2 = "UCTimeoutPreview" == i2 ? this.rm.translate("infoTimeout") : this.rm.translate("capture_detail_text");
    else if ("text_detail2" == a2) F2 = this.rm.translate("infoTimeout2");
    else if ("tip" == a2) {
      if ("UCTutorial1" == i2 ? F2 = this.rm.translate("tutorial1_tip") : "UCTutorial2" == i2 ? F2 = this.rm.translate("tutorial2_tip") : "UCTutorial3" == i2 && (F2 = this.rm.translate("tutorial3_tip")), this.landscape && this.width < 800) {
        var Z2 = (this.width - 600) / 200;
        Z2 < 0 && (Z2 = 0), c2 -= c2 / 2 * (Z2 = 1 - Z2);
      }
    } else if ("tip_detail" == a2) "UCTutorial1" == i2 ? F2 = this.rm.translate("tutorial1_tip_detail") : "UCTutorial2" == i2 ? F2 = this.rm.translate("tutorial2_tip_detail") : "UCTutorial3" == i2 && (F2 = this.rm.translate("tutorial3_tip_detail"));
    else if ("diagnostic" == a2) switch (n2.diagnostic) {
      case 2:
        F2 = this.rm.translate("documentDiagnostic_2");
        break;
      case 3:
        F2 = this.rm.translate("documentDiagnostic_3");
        break;
      case 4:
        F2 = this.rm.translate("documentDiagnostic_4");
        break;
      case 5:
        F2 = this.rm.translate("documentDiagnostic_5");
        break;
      case 6:
        F2 = this.rm.translate("documentDiagnostic_6");
        break;
      case 11:
        F2 = this.rm.translate("documentDiagnostic_11");
        break;
      case 12:
        F2 = this.rm.translate("documentDiagnostic_12");
        break;
      case 13:
        F2 = this.rm.translate("documentDiagnostic_13");
        break;
      case 17:
        F2 = this.rm.translate("documentDiagnostic_17");
        break;
      case 18:
        F2 = this.rm.translate("documentDiagnostic_18");
        break;
      case 20:
        F2 = this.rm.translate("documentDiagnostic_20");
    }
    this.drawStringMultiline(e2, F2, t2, o2, h2, c2, r2, m2, R2, I2, g2);
  }
  scaleRect(e2, t2, i2) {
    var a2 = t2.x + t2.width / 2, l2 = t2.y + t2.height / 2, d2 = t2.width / e2.width, s2 = t2.height / e2.height, n2 = e2.width * d2, c2 = e2.height * d2;
    return null == i2 ? c2 < t2.height && (n2 = e2.width * s2, c2 = e2.height * s2) : c2 >= t2.height && (n2 = e2.width * s2, c2 = e2.height * s2), { x: a2 - n2 / 2, y: l2 - c2 / 2, width: n2, height: c2 };
  }
  getRoundedRectPerimeter(e2, t2, i2) {
    return 2 * Math.PI * i2 + 2 * (e2 - 2 * i2) + 2 * (t2 - 2 * i2);
  }
  rotatePoint(e2, t2) {
    return { x: e2 * Math.cos(t2), y: e2 * Math.sin(t2) };
  }
  drawRoundedRectProgressive(e2, t2, i2, a2, l2, d2, s2) {
    var n2, c2 = this.getRoundedRectPerimeter(t2.width, t2.height, i2) * s2, r2 = 0;
    if (e2.lineWidth = a2, e2.strokeStyle = d2, e2.fillStyle = d2, e2.beginPath(), e2.moveTo(t2.x, t2.y + t2.height / 2), (c2 -= r2 = (t2.height - 2 * i2) / 2) < 0) {
      var o2 = (c2 + r2) / r2, h2 = t2.x, m2 = t2.y + t2.height / 2 - r2 * o2;
      return e2.lineTo(h2, m2), void e2.stroke();
    }
    return e2.lineTo(t2.x, t2.y + i2), (c2 -= r2 = Math.PI / 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + i2, m2 = t2.y + i2, e2.arc(h2, m2, i2, Math.PI, Math.PI + Math.PI / 2 * o2), e2.stroke(), h2 += (n2 = this.rotatePoint(i2, Math.PI + Math.PI / 2 * o2)).x, void (m2 += n2.y)) : (e2.arc(t2.x + i2, t2.y + i2, i2, Math.PI, Math.PI + Math.PI / 2), (c2 -= r2 = t2.width - 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + i2 + r2 * o2, m2 = t2.y, e2.lineTo(h2, m2), void e2.stroke()) : (e2.lineTo(t2.x + t2.width - i2, t2.y), (c2 -= r2 = Math.PI / 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + t2.width - i2, m2 = t2.y + i2, e2.arc(h2, m2, i2, Math.PI + Math.PI / 2, Math.PI + Math.PI / 2 + Math.PI / 2 * o2), e2.stroke(), h2 += (n2 = this.rotatePoint(i2, Math.PI + Math.PI / 2 + Math.PI / 2 * o2)).x, void (m2 += n2.y)) : (e2.arc(t2.x + t2.width - i2, t2.y + i2, i2, Math.PI + Math.PI / 2, 0), (c2 -= r2 = t2.height - 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + t2.width, m2 = t2.y + i2 + r2 * o2, e2.lineTo(h2, m2), void e2.stroke()) : (e2.lineTo(t2.x + t2.width, t2.y + t2.height - i2), (c2 -= r2 = Math.PI / 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + t2.width - i2, m2 = t2.y + t2.height - i2, e2.arc(h2, m2, i2, 0, Math.PI / 2 * o2), e2.stroke(), h2 += (n2 = this.rotatePoint(i2, Math.PI / 2 * o2)).x, void (m2 += n2.y)) : (e2.arc(t2.x + t2.width - i2, t2.y + t2.height - i2, i2, 0, Math.PI / 2), (c2 -= r2 = t2.width - 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + t2.width - i2 - r2 * o2, m2 = t2.y + t2.height, e2.lineTo(h2, m2), void e2.stroke()) : (e2.lineTo(t2.x + i2, t2.y + t2.height), (c2 -= r2 = Math.PI / 2 * i2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x + i2, m2 = t2.y + t2.height - i2, e2.arc(h2, m2, i2, Math.PI / 2, Math.PI / 2 + Math.PI / 2 * o2), e2.stroke(), h2 += (n2 = this.rotatePoint(i2, Math.PI / 2 + Math.PI / 2 * o2)).x, void (m2 += n2.y)) : (e2.arc(t2.x + i2, t2.y + t2.height - i2, i2, Math.PI / 2, Math.PI), (c2 -= r2 = (t2.height - 2 * i2) / 2) < 0 ? (o2 = (c2 + r2) / r2, h2 = t2.x, m2 = t2.y + t2.height - i2 - r2 * o2, e2.lineTo(h2, m2), void e2.stroke()) : (h2 = t2.x, m2 = t2.y + t2.height / 2, e2.lineTo(h2, m2), void e2.stroke()))))))));
  }
  fillRoundedRect(e2, t2, i2, a2, l2, d2) {
    e2.lineWidth = a2, e2.strokeStyle = d2, e2.fillStyle = d2, e2.beginPath(), e2.moveTo(t2.x, t2.y + t2.height / 2), e2.lineTo(t2.x, t2.y + i2), e2.arc(t2.x + i2, t2.y + i2, i2, Math.PI, Math.PI + Math.PI / 2), e2.lineTo(t2.x + t2.width - i2, t2.y), e2.arc(t2.x + t2.width - i2, t2.y + i2, i2, Math.PI + Math.PI / 2, 0), e2.lineTo(t2.x + t2.width, t2.y + t2.height - i2), e2.arc(t2.x + t2.width - i2, t2.y + t2.height - i2, i2, 0, Math.PI / 2), e2.lineTo(t2.x + i2, t2.y + t2.height), e2.arc(t2.x + i2, t2.y + t2.height - i2, i2, Math.PI / 2, Math.PI);
    var s2 = t2.x, n2 = t2.y + t2.height / 2;
    e2.lineTo(s2, n2), e2.fill();
  }
  fillRoundedRectGradient(e2, t2, i2, a2, l2, d2, s2) {
    let n2 = e2.createLinearGradient(t2.x, t2.y, t2.x + t2.width, t2.y + t2.height);
    n2.addColorStop(0, d2), n2.addColorStop(1, s2), e2.lineWidth = a2, e2.strokeStyle = n2, e2.fillStyle = n2, e2.beginPath(), e2.moveTo(t2.x, t2.y + t2.height / 2), e2.lineTo(t2.x, t2.y + i2), e2.arc(t2.x + i2, t2.y + i2, i2, Math.PI, Math.PI + Math.PI / 2), e2.lineTo(t2.x + t2.width - i2, t2.y), e2.arc(t2.x + t2.width - i2, t2.y + i2, i2, Math.PI + Math.PI / 2, 0), e2.lineTo(t2.x + t2.width, t2.y + t2.height - i2), e2.arc(t2.x + t2.width - i2, t2.y + t2.height - i2, i2, 0, Math.PI / 2), e2.lineTo(t2.x + i2, t2.y + t2.height), e2.arc(t2.x + i2, t2.y + t2.height - i2, i2, Math.PI / 2, Math.PI);
    var c2 = t2.x, r2 = t2.y + t2.height / 2;
    e2.lineTo(c2, r2), e2.fill();
  }
};
if (!$) var $ = {};
$.SelphID = _;
var ee = "";
var te = 2;
var ie = class {
  static printDebug(...e2) {
    0 >= te && console.debug(`<D> [${ee}] ${e2}`);
  }
  static printInfo(...e2) {
    1 >= te && console.debug(`<I> [${ee}] ${e2}`);
  }
  static printWarning(...e2) {
    2 >= te && console.warn(`<W> [${ee}] ${e2}`);
  }
  static printError(...e2) {
    3 >= te && console.error(`<E> [${ee}] ${e2}`);
  }
  static setLoggerLevel(e2) {
    te = e2;
  }
  static setLoggerTag(e2) {
    ee = e2;
  }
};
var ae = null;
var le = class _le {
  static async __checkWorker() {
    if (!_le.worker) {
      let e2 = new Worker((null === ae && (ae = URL.createObjectURL(new Blob([window.atob("dmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTsKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvZ2VuL1J1bnRpbWUud2FzbQpjb25zdCBSdW50aW1lX25hbWVzcGFjZU9iamVjdCA9ICJkYXRhOmFwcGxpY2F0aW9uL3dhc207YmFzZTY0LEFHRnpiUUVBQUFBQk93dGdBWDhCZjJBQ2YzOEJmMkFDZjM4QVlBRi9BR0FEZjM5L0FHQUFBR0FBQVg5Z0JIOS9mMzhBWUFKOGZ3RjhZQUYvQVh4Z0EzOS9md0YvQWhzQ0EyVnVkZ1ZoWW05eWRBQUhBMlZ1ZGdadFpXMXZjbmtDQUFFRFpXUUNBZ0FBQUFVQ0FnTUVBd01BQWdJQ0JBVUdBUUVDQWdFRUFnQUJBQUFFQkFBQUFBRUJBZ0lEQVFJQ0FRQUJBZ0VBQVFBQUJBQUlDUUFBQWdBREJRTURBd1VBQVFBQUFBb0VBUUFBQXdBQUFnQUFBQUVBQVFVQUFRWUFBQUFFQXdBQkFBRUJCbGtSZndGQkFBdC9BVUVBQzM4QlFRQUxmd0ZCQUF0L0FVRUFDMzhCUVFBTGZ3RkJBQXQvQVVFQUMzOEJRUUFMZndGQkFBdC9BVUVBQzM4QlFRQUxmd0ZCQUF0K0FVSUFDMzhCUVFBTGZ3QkJnQ2tMZndGQnJLb0JDd2R4Q1FWZlgyNWxkd0FZQlY5ZmNHbHVBRHdIWDE5MWJuQnBiZ0E5Q1Y5ZlkyOXNiR1ZqZEFBK0MxOWZjblIwYVY5aVlYTmxBdzhHYldWdGIzSjVBZ0FTWjJWMFNXNTBaWEp1WVd4TWFXTmxibk5sQUdJTVpXNWpjbmx3ZEZSdmEyVnVBR01NWkdWamNubHdkRlJ2YTJWdUFHUUlBVmNNQVUwS3hudGtDUUFnQUNBQk5nSUVDd2tBSUFBZ0FUWUNDQXNRQUNBQUlBQVFBU0FBSUFBUUFpQUFDd29BSUFBb0FnUkJmSEVMQ2dBZ0FDZ0NCRUVEY1F1ZkFRRUNmMEdBQ3hBTVFkQUlFQXhCc0JvUURFSFFFQkFNUWJBaEVBeEJ3QWtRREVHUUtCQU1RZEFvRUF4QjRBMFFERUdnQ0JBTUl3c2lBQVJBSUFBUURBc2pEQ0lBQkVBZ0FCQU1DeU1PSWdBRVFDQUFFQXdMUWVBY0VBeEI4QnNRREVIZ0hoQU1Jd1FpQVJBRUlRQURRQ0FBSUFGSEJFQWdBQkFGUVFOSEJFQkJBRUdBQ2tHZkFVRVFFQUFBQ3lBQVFSUnFFRUVnQUJBRUlRQU1BUXNMQ3hFQUlBQWdBQ2dDQkVGOGNTQUJjaEFCQ3hFQUlBQWdBU0FBS0FJRVFRTnhjaEFCQzFNQkFYOGdBQkFFSWdGRkJFQkJBQ0FBUWF5cUFVa2dBQ2dDQ0J0RkJFQkJBRUdBQ2tIL0FFRVNFQUFBQ3c4TElBQW9BZ2dpQUVVRVFFRUFRWUFLUVlNQlFSQVFBQUFMSUFFZ0FCQUNJQUFnQVJBSUN5WUJBWDhnQVNnQ0NDRURJQUFnQVNBQ2NoQUJJQUFnQXhBQ0lBTWdBQkFJSUFFZ0FCQUNDM2dCQW44Z0FDTUZSZ1JBSUFBb0FnZ2lBVVVFUUVFQVFZQUtRWk1CUVI0UUFBQUxJQUVrQlFzZ0FCQUpJd1loQVNBQUtBSU1JZ0pCQVUwRWYwRUJCU0FDUVlBcEtBSUFTd1JBUVlBTFFjQUxRUlpCSEJBQUFBc2dBa0VEZEVHRUtXb29BZ0JCSUhFTElRSWdBQ0FCSXdkRlFRSWdBaHNRQ2dzakFDQUFSUVJBRHdzZ0FFRVVheUlBRUFVakIwWUVRQ0FBRUFzakEwRUJhaVFEQ3dzTkFDQUFLQUlBUVh4eFFRUnFDd2tBSUFBZ0FUWUNBQXVSQWdFRWZ5QUJLQUlBSWdKQkFYRkZCRUJCQUVHUURFR01Ba0VPRUFBQUN5QUNRWHh4SWdKQkRFa0VRRUVBUVpBTVFZNENRUTRRQUFBTElBSkJnQUpKQkg4Z0FrRUVkZ1ZCSHlBQ1Fmei8vLzhESUFKQi9QLy8vd05KR3lJQ1oyc2lCRUVIYXlFRElBSWdCRUVFYTNaQkVITUxJZ0pCRUVrZ0EwRVhTWEZGQkVCQkFFR1FERUdjQWtFT0VBQUFDeUFCS0FJSUlRVWdBU2dDQkNJRUJFQWdCQ0FGRUFJTElBVUVRQ0FGSUFRUUFRc2dBU0FBSUFOQkJIUWdBbXBCQW5ScUtBSmdSZ1JBSUFBZ0EwRUVkQ0FDYWtFQ2RHb2dCVFlDWUNBRlJRUkFJQUFnQTBFQ2RHb2lBU2dDQkVGK0lBSjNjU0VDSUFFZ0FqWUNCQ0FDUlFSQUlBQWdBQ2dDQUVGK0lBTjNjUkFPQ3dzTEM3d0RBUVYvSUFGRkJFQkJBRUdRREVISkFVRU9FQUFBQ3lBQktBSUFJZ05CQVhGRkJFQkJBRUdRREVITEFVRU9FQUFBQ3lBQlFRUnFJQUVvQWdCQmZIRnFJZ1FvQWdBaUFrRUJjUVJBSUFBZ0JCQVBJQUVnQTBFRWFpQUNRWHh4YWlJREVBNGdBVUVFYWlBQktBSUFRWHh4YWlJRUtBSUFJUUlMSUFOQkFuRUVRQ0FCUVFScktBSUFJZ0VvQWdBaUJrRUJjVVVFUUVFQVFaQU1RZDBCUVJBUUFBQUxJQUFnQVJBUElBRWdCa0VFYWlBRFFYeHhhaUlERUE0TElBUWdBa0VDY2hBT0lBTkJmSEVpQWtFTVNRUkFRUUJCa0F4QjZRRkJEaEFBQUFzZ0JDQUJRUVJxSUFKcVJ3UkFRUUJCa0F4QjZnRkJEaEFBQUFzZ0JFRUVheUFCTmdJQUlBSkJnQUpKQkg4Z0FrRUVkZ1ZCSHlBQ1Fmei8vLzhESUFKQi9QLy8vd05KR3lJQ1oyc2lBMEVIYXlFRklBSWdBMEVFYTNaQkVITUxJZ0pCRUVrZ0JVRVhTWEZGQkVCQkFFR1FERUg3QVVFT0VBQUFDeUFBSUFWQkJIUWdBbXBCQW5ScUtBSmdJUU1nQVVFQUVBRWdBU0FERUFJZ0F3UkFJQU1nQVJBQkN5QUFJQVZCQkhRZ0FtcEJBblJxSUFFMkFtQWdBQ0FBS0FJQVFRRWdCWFJ5RUE0Z0FDQUZRUUowYWlJQUlBQW9BZ1JCQVNBQ2RISTJBZ1FMeVFFQkFuOGdBU0FDU3dSQVFRQkJrQXhCK1FKQkRoQUFBQXNnQVVFVGFrRndjVUVFYXlFQklBQW9BcUFNSWdRRVFDQUVRUVJxSUFGTEJFQkJBRUdRREVHQUEwRVFFQUFBQ3lBQlFSQnJJQVJHQkVBZ0JDZ0NBQ0VESUFGQkVHc2hBUXNGSUFCQnBBeHFJQUZMQkVCQkFFR1FERUdOQTBFRkVBQUFDd3NnQWtGd2NTQUJheUlDUVJSSkJFQVBDeUFCSUFOQkFuRWdBa0VJYXlJQ1FRRnljaEFPSUFGQkFCQUJJQUZCQUJBQ0lBRkJCR29nQW1vaUFrRUNFQTRnQUNBQ05nS2dEQ0FBSUFFUUVBdVZBUUVDZno4QUlnRkJBRXdFZjBFQklBRnJRQUJCQUVnRlFRQUxCRUFBQzBHd3FnRkJBQkFPUWRDMkFVRUFOZ0lBQTBBZ0FFRVhTUVJBSUFCQkFuUkJzS29CYWtFQU5nSUVRUUFoQVFOQUlBRkJFRWtFUUNBQVFRUjBJQUZxUVFKMFFiQ3FBV3BCQURZQ1lDQUJRUUZxSVFFTUFRc0xJQUJCQVdvaEFBd0JDd3RCc0tvQlFkUzJBVDhBUVJCMEVCRkJzS29CSkFrTG9BTUJBMzhDUUFKQUFrQUNRQ01DRGdNQUFRSURDMEVCSkFKQkFDUURFQVlqQmlRRkl3TVBDeU1IUlNFQkl3VVFCQ0VBQTBBZ0FDTUdSd1JBSUFBa0JTQUFFQVVnQVVjRVFDQUFJQUVRQjBFQUpBTWdBRUVVYWhCQkl3TVBDeUFBRUFRaEFBd0JDd3RCQUNRREVBWWpCUkFFSXdaR0JFQWpFQ0VBQTBBZ0FFR3NxZ0ZKQkVBZ0FDZ0NBQkFNSUFCQkJHb2hBQXdCQ3dzakJSQUVJUUFEUUNBQUl3WkhCRUFnQUJBRklBRkhCRUFnQUNBQkVBY2dBRUVVYWhCQkN5QUFFQVFoQUF3QkN3c2pDQ0VBSXdZa0NDQUFKQVlnQVNRSElBQVFCQ1FGUVFJa0Fnc2pBdzhMSXdVaUFDTUdSd1JBSUFBUUJDUUZJQUFRQlNNSFJVY0VRRUVBUVlBS1FlUUJRUlFRQUFBTElBQkJyS29CU1FSQUlBQkJBQkFCSUFCQkFCQUNCU01BSUFBUURXc2tBQ0FBUVFScUlnRkJyS29CVHdSQUl3bEZCRUFRRWdzakNTRUNJQUZCQkdzaEFDQUJRUTl4UVFFZ0FSc0VmMEVCQlNBQUtBSUFRUUZ4Q3dSQVFRQkJrQXhCcndSQkF4QUFBQXNnQUNBQUtBSUFRUUZ5RUE0Z0FpQUFFQkFMQzBFS0R3c2pCaU1HRUFFakJpTUdFQUpCQUNRQ0MwRUFDOVFCQVFKL0lBRkJnQUpKQkg4Z0FVRUVkZ1ZCSHlBQlFRRkJHeUFCWjJ0MGFrRUJheUFCSUFGQi92Ly8vd0ZKR3lJQloyc2lBMEVIYXlFQ0lBRWdBMEVFYTNaQkVITUxJZ0ZCRUVrZ0FrRVhTWEZGQkVCQkFFR1FERUhLQWtFT0VBQUFDeUFBSUFKQkFuUnFLQUlFUVg4Z0FYUnhJZ0VFZnlBQUlBRm9JQUpCQkhScVFRSjBhaWdDWUFVZ0FDZ0NBRUYvSUFKQkFXcDBjU0lCQkg4Z0FDQUJhQ0lCUVFKMGFpZ0NCQ0lDUlFSQVFRQkJrQXhCMXdKQkVoQUFBQXNnQUNBQ2FDQUJRUVIwYWtFQ2RHb29BbUFGUVFBTEN3dmFBZ0VEZnlBQlFmei8vLzhEU3dSQVFjQUpRWkFNUWNvRFFSMFFBQUFMSUFCQkRDQUJRUk5xUVhCeFFRUnJJQUZCREUwYklnTVFGQ0lCUlFSQVB3QWlBVUVFSUFBb0FxQU1JQUZCRUhSQkJHdEhkQ0FEUVFGQkd5QURaMnQwUVFGcmFpQURJQU5CL3YvLy93RkpHMnBCLy84RGFrR0FnSHh4UVJCMklnSWdBU0FDU2h0QUFFRUFTQVJBSUFKQUFFRUFTQVJBQUFzTElBQWdBVUVRZEQ4QVFSQjBFQkVnQUNBREVCUWlBVVVFUUVFQVFaQU1RZkFEUVJBUUFBQUxDeUFESUFFb0FnQkJmSEZMQkVCQkFFR1FERUh5QTBFT0VBQUFDeUFBSUFFUUR5QUJLQUlBSVFRZ0EwRUVha0VQY1FSQVFRQkJrQXhCNVFKQkRoQUFBQXNnQkVGOGNTQURheUlDUVJCUEJFQWdBU0FESUFSQkFuRnlFQTRnQVVFRWFpQURhaUlESUFKQkJHdEJBWElRRGlBQUlBTVFFQVVnQVNBRVFYNXhFQTRnQVVFRWFpQUJLQUlBUVh4eGFpSUFJQUFvQWdCQmZYRVFEZ3NnQVFzSkFDQUFJQUUyQWd3TENRQWdBQ0FCTmdJUUM2Z0JBUUYvSUFCQjdQLy8vd05QQkVCQndBbEJnQXBCaEFKQkh4QUFBQXNqQUNNQlR3UkFBa0JCZ0JBaEFnTkFJQUlRRTJzaEFpTUNSUVJBSXdDdFFzZ0Jma0xrQUlDblFZQUlhaVFCREFJTElBSkJBRW9OQUFzakFDTUFJd0ZyUVlBSVNVRUtkR29rQVFzTEl3bEZCRUFRRWdzakNTQUFRUkJxRUJVaUFpQUJFQllnQWlBQUVCY2dBaU1JSXdjUUNpTUFJQUlRRFdva0FDQUNRUlJxSWdGQkFDQUEvQXNBSUFFTFd3RUJmeUFCUlFSQUR3c2dBRVVFUUVFQVFZQUtRYVlDUVE0UUFBQUxJQUZCRkdzaUFSQUZJd2RHQkVBZ0FFRVVheUlBRUFVaUF5TUhSVVlFUUNBQUlBRWdBaHNRQ3dVakFrRUJSaUFEUVFOR2NRUkFJQUVRQ3dzTEN3c1JBQ0FBSUFFMkFnQWdBQ0FCUVFBUUdRc05BQ0FBUVJScktBSVFRUUYyQzBJQkFYOGdBVUVBSUFBUUd5SUNJQUZCQUU0YmFpSUJJQUpQQkVCQmdBdEI4QXhCT1VFZkVBQUFDMEVDUVFFUUdDSUNJQUFnQVVFQmRHb3ZBUUE3QVFBZ0FndHNBQ0FBUVlBdFNRUkFJQUJCZ0FGeVFhQUJSaUFBUVFsclFRUk5jZzhMSUFCQmdFQnFRUXBOQkVCQkFROExJQUJCZ0MxR0lBQkJxTUFBUm5JZ0FFR3B3QUJHSUFCQnI4QUFSbkp5SUFCQjM4QUFSaUFBUVlEZ0FFWnlJQUJCLy8wRFJuSnlCRUJCQVE4TFFRQUxtd0lCQlg4Z0FCQWJJZ0pGQkVCQkFBOExJQUF2QVFBaEFRTkFJQUVRSFFSQUlBQkJBbW9pQUM4QkFDRUJJQUpCQVdzaEFnd0JDd3RCQVNFRklBRkJLMFlnQVVFdFJuSUVmeUFDUVFGcklnSkZCRUJCQUE4TFFYOUJBU0FCUVMxR0d5RUZJQUJCQW1vaUFDOEJBQVVnQVF0Qk1FWWdBa0VDU25FRWZ5QUFMd0VDUVNCeVFmZ0FSZ1ZCQUFzRVFDQUNRUUpySVFJZ0FFRUVhaUVBQ3lBQ1FRRnJJUU1EUUFKQUlBSWlBVUVCYXlFQ0lBRUVRQ0FBTHdFQUlnRkJNR3RCQ2trRWZ5QUJRVEJyQlNBQlFUZHJJQUZCMXdCcklBRWdBVUhoQUd0QkdVMGJJQUZCd1FCclFSbE5Hd3NpQVVFUVR3UkFJQUlnQTBZRVFFRUFEd3NNQWdzZ0JFRUVkQ0FCYWlFRUlBQkJBbW9oQUF3Q0N3c0xJQVFnQld3TEtBQWdBU0FBS0FJSVR3UkFRWUFMUWFBTlFiRUJRUzBRQUFBTElBQW9BZ1FnQVdvZ0Fqb0FBQXV5QWdFQ2Z5QUFJQUZCQVhScUlRTWdBaUVCQTBBZ0FDQURTUVJBSUFBdkFRQWlBa0dBQVVrRWZ5QUJJQUk2QUFBZ0FVRUJhZ1VnQWtHQUVFa0VmeUFCSUFKQkJuWkJ3QUZ5SUFKQlAzRkJnQUZ5UVFoMGNqc0JBQ0FCUVFKcUJTQUNRWUM0QTBrZ0FFRUNhaUFEU1hFZ0FrR0E4QU54UVlDd0EwWnhCRUFnQUM4QkFpSUVRWUQ0QTNGQmdMZ0RSZ1JBSUFFZ0FrSC9CM0ZCQ25SQmdJQUVhaUFFUWY4SGNYSWlBa0UvY1VHQUFYSkJHSFFnQWtFR2RrRS9jVUdBQVhKQkVIUnlJQUpCREhaQlAzRkJnQUZ5UVFoMGNpQUNRUkoyUWZBQmNuSTJBZ0FnQVVFRWFpRUJJQUJCQkdvaEFBd0ZDd3NnQVNBQ1FReDJRZUFCY2lBQ1FRWjJRVDl4UVlBQmNrRUlkSEk3QVFBZ0FTQUNRVDl4UVlBQmNqb0FBaUFCUVFOcUN3c2hBU0FBUVFKcUlRQU1BUXNMQzgwQkFRUi9Ba0FDUUNNS1FRRnJEZ01CQVFFQUN3QUxJeEJCQkdza0VCQkNJeEJCQURZQ0FDQUFJZ0ZCRkdzb0FoQWdBV29oQXdOQUlBRWdBMGtFUUNBQkx3RUFJZ1JCZ0FGSkJIOGdBa0VCYWdVZ0JFR0FFRWtFZnlBQ1FRSnFCU0FFUVlENEEzRkJnTEFEUmlBQlFRSnFJQU5KY1FSQUlBRXZBUUpCZ1BnRGNVR0F1QU5HQkVBZ0FrRUVhaUVDSUFGQkJHb2hBUXdGQ3dzZ0FrRURhZ3NMSVFJZ0FVRUNhaUVCREFFTEN5TVFJQUpCQUJBWUlnRTJBZ0FnQUNBQUVCc2dBUkFnSXhCQkJHb2tFQ0FCQ3dvQUlBQkJGR3NvQWhBTHBBRUJBMzhDUUFKQUFrQWpDa0VCYXc0REFRRUNBQXNBQzBGL0lRRUxJeEJCQkdza0VCQkNJeEJCQURZQ0FDQUFJZ0lRSWlFRElBRWlBRUVBU0FSQUlBQkJmMFlFZnlBREJVSFFDRUdnRFVIekRrRUhFQUFBQ3lFQUJTQUFJQU5LQkVCQjBBaEJvQTFCK0E1QkJ4QUFBQXNMSXhCQkRFRURFQmdpQVRZQ0FDQUJJQUkyQWdBZ0FTQUNRUUFRR1NBQklBQTJBZ2dnQVNBQ05nSUVJeEJCQkdva0VDQUJDeVlBSUFFZ0FDZ0NDRThFUUVHQUMwR2dEVUdtQVVFdEVBQUFDeUFBS0FJRUlBRnFMUUFBQzBVQkFuOGdBU0FBUVJScklnTW9BZ0JCZkhGQkVHdE5CRUFnQXlBQkVCY2dBQThMSUFFZ0F5Z0NEQkFZSWdJZ0FDQUJJQU1vQWhBaUFDQUFJQUZMRy93S0FBQWdBZ3NSQUNBQUlBRTJBZ1FnQUNBQlFRQVFHUXNSQUNBQUlBRTJBZ2dnQUNBQlFRQVFHUXNzQVFGL0EwQWdBQkJGSWdGQkNrWWdBVUVKUm5JZ0FVRU5SbklnQVVFZ1JuSUVRQ0FBRUVZYURBRUxDd3NhQUNBQUVCc2dBVTBFUUVGL0R3c2dBQ0FCUVFGMGFpOEJBQXNKQUNBQUlBRTJBaFFMc3dFQkJYOGdBQ2dDRENJQ1FRRnFJZ01nQUNnQ0NDSUZRUUoyU3dSQUlBTkIvLy8vL3dCTEJFQkIwQWhCb0E1QkUwRXdFQUFBQ3lBQUtBSUFJZ1FnQlVFQmRDSUZRZnovLy84RElBVkIvUC8vL3dOSkd5SUZJQU5CQ0NBRFFRaExHMEVDZENJR0lBVWdCa3NiSWdVUUpTSUdJQVJIQkVBZ0FDQUdOZ0lBSUFBZ0JqWUNCQ0FBSUFaQkFCQVpDeUFBSUFVMkFnZ0xJQUFvQWdRZ0FrRUNkR29nQVRZQ0FDQUFJQUZCQVJBWklBQWdBeEFXQ3pZQUlBQkJGR3NvQWd3aUFFR0FLU2dDQUUwRVFBTkFJQUFnQVVZRVFFRUJEd3NnQUVFRGRFR0VLV29vQWdRaUFBMEFDd3RCQUF2NkFnRUhmeUFBQkg4Z0FDSUJFQnRCQVhRaUEwRVFUd1IvUWFpSWphRUNJUUpCOTVTdnIzZ2hCRUhQaktLT0JpRUZJQUVnQTJwQkVHc2hCd05BSUFFZ0IwMEVRQ0FDSUFFb0FnQkI5NVN2cjNoc2FrRU5kMEd4ODkzeGVXd2hBaUFFSUFFb0FnUkI5NVN2cjNoc2FrRU5kMEd4ODkzeGVXd2hCQ0FHSUFFb0FnaEI5NVN2cjNoc2FrRU5kMEd4ODkzeGVXd2hCaUFGSUFFb0FneEI5NVN2cjNoc2FrRU5kMEd4ODkzeGVXd2hCU0FCUVJCcUlRRU1BUXNMSUFNZ0FrRUJkeUFFUVFkM2FpQUdRUXgzYWlBRlFSSjNhbW9GSUFOQnNjL1pzZ0ZxQ3lFQ0lBQWdBMnBCQkdzaEJBTkFJQUVnQkUwRVFDQUNJQUVvQWdCQnZkektsWHhzYWtFUmQwR3YxdE8rQW13aEFpQUJRUVJxSVFFTUFRc0xJQUFnQTJvaEFBTkFJQUFnQVVzRVFDQUNJQUV0QUFCQnNjL1pzZ0ZzYWtFTGQwR3g4OTN4ZVd3aEFpQUJRUUZxSVFFTUFRc0xJQUlnQWtFUGRuTkI5NVN2cjNoc0lnQkJEWFlnQUhOQnZkektsWHhzSWdCQkVIWWdBSE1GUVFBTEMzTUJCSDhnQUNBQlJnUkFRUUVQQ3lBQlFRQWdBQnRGQkVCQkFBOExJQUFRR3lFQ0lBRVFHeUFDUndSQVFRQVBDd0pBQTBBZ0FpSURRUUZySVFJZ0F3UkFJQUF2QVFBaUJTQUJMd0VBSWdOcklRUWdBeUFGUncwQ0lBQkJBbW9oQUNBQlFRSnFJUUVNQVFzTFFRQWhCQXNnQkVVTDRRRUJCMzhqRUVFTWF5UVFFRUlqRUVJQU53TUFJeEJCQURZQ0NDTVFJQUZCQVdvaUFrRUNkQkJkSWdZMkFnQWpFQ0FDUVFOMFFRTnRJZ1ZCREd3UVhTSUROZ0lFSUFBb0FnZ2lCeUFBS0FJUVFReHNhaUVFSUFNaEFnTkFJQVFnQjBjRVFDQUhLQUlJUVFGeFJRUkFJeEFnQnlnQ0FDSUlOZ0lJSUFJZ0NCQU9JQUlnQnlnQ0JCQUJJQUlnQmlBSUVDMGdBWEZCQW5ScUlnZ29BZ0FRQWlBSUlBSTJBZ0FnQWtFTWFpRUNDeUFIUVF4cUlRY01BUXNMSUFBZ0JoQWFJQUFnQVJBQklBQWdBeEFuSUFBZ0JSQVdJQUFnQUNnQ0ZCQVhJeEJCREdva0VBdGtBUUYvQWtBQ1FBSkFJd3BCQVdzT0FnRUNBQXNBQ3lBQUtBSUVJUUlMSXhCQkJHc2tFQkJDSXhCQkFEWUNBQ01RSUFBb0FnZ2lBRFlDQUNBQUtBSUFJQUFvQWdRZ0FDZ0NBR3RxSUFGcUlBSkJBV3NnQVdzUVdTRUFJeEJCQkdva0VDQUFDd2tBSUFCQkFCQXVSUXR0QVFOL0l4QkJCR3NrRUJCQ0l4QkJBRFlDQUFKQUlBQWlBaEFiUVFGMElnTWdBUkFiUVFGMElnUnFJZ0JGQkVBakVFRUVhaVFRUWRBTUlRQU1BUXNqRUNBQVFRRVFHQ0lBTmdJQUlBQWdBaUFEL0FvQUFDQUFJQU5xSUFFZ0JQd0tBQUFqRUVFRWFpUVFDeUFBQzA4QkFYOGdBQkJHSWdGQk1Hc2lBRUVKU2dSQUlBRkJOMnNpQUVFS1NDQUFRUTlLY2dSQUlBRkIxd0JySVFBTEN5QUFRUkJJSUFCQkFFNXhSUVJBUVlBWVFaQVBRY0FDUVFrUUFBQUxJQUFMWFFFRGZ3SkFBa0FDUUNNS1FRRnJEZ0lCQWdBTEFBdEJmeUVDQ3lNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUVFQ0lBSkJBRW9pQTNSQkFSQVlJZ0UyQWdBZ0FTQUFPd0VBSUFNRVFDQUJJQUk3QVFJTEl4QkJCR29rRUNBQkMyUUJBbjhqRUVFRWF5UVFFRUlqRUVFQU5nSUFJeEFoQkNNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUVFQlFROFFHQ0lETmdJQUlBTWdBam9BQUNNUUlBTVFYQ0lDTmdJQUl4QkJCR29rRUNBRUlBSTJBZ0FnQUNBQklBSVFTU01RUVFScUpCQUxOUUVDZjBFRklRRkJBU0VDQTBBZ0FBUkFJQUVnQW13Z0FpQUFRUUZ4R3lFQ0lBQkJBWFloQUNBQklBRnNJUUVNQVFzTElBSUxwQUVBSUFGQi93ZEtCSHdnQUVRQUFBQUFBQURnZjZJaEFDQUJRZjhIYXlJQlFmOEhTZ1I4SUFGQi93ZHJJZ0ZCL3djZ0FVSC9CMGdiSVFFZ0FFUUFBQUFBQUFEZ2Y2SUZJQUFMQlNBQlFZSjRTQVI4SUFCRUFBQUFBQUFBWUFPaUlRQWdBVUhKQjJvaUFVR0NlRWdFZkNBQlFja0hhaUlCUVlKNElBRkJnbmhLR3lFQklBQkVBQUFBQUFBQVlBT2lCU0FBQ3dVZ0FBc0xJQUdzUXY4SGZFSTBocitpQzdRS0F3ZC9CWDRDZkFKQUlBQVFHeUlGUlEwQUlBQXZBUUFoQmtRQUFBQUFBQUR3UHlFT0EwQWdCUVIvSUFZUUhRVkJBQXNFUUNBQVFRSnFJZ0F2QVFBaEJpQUZRUUZySVFVTUFRc0xJQVZGRFFBZ0JrRXRSZ1IvSUFWQkFXc2lCVVVOQVVRQUFBQUFBQUR3dnlFT0lBQkJBbW9pQUM4QkFBVWdCa0VyUmdSL0lBVkJBV3NpQlVVTkFpQUFRUUpxSWdBdkFRQUZJQVlMQ3lJR1Fja0FSaUFGUVFoT2NRUkFJQUFwQXdCQ3lZQzRnK0NNd0RSUkJIOGdBQ2tEQ0VMdWdLU0R3STdBUEZFRlFRQUxCRUFnRGtRQUFBQUFBQUR3ZjZJUEN3d0JDeUFHUVM1SElBWkJNR3RCQ2s5eERRQWdBQ0VFQTBBZ0JrRXdSZ1JBSUFCQkFtb2lBQzhCQUNFR0lBVkJBV3NoQlF3QkN3c2dCVUVBVEFSQVJBQUFBQUFBQUFBQUR3c2dCa0V1UmdSQUlBQWdCRVloQkNBQVFRSnFJUUJCQUNBRUlBVkJBV3NpQlJzTkFVRUJJUWNEUUNBQUx3RUFJZ1pCTUVZRVFDQUZRUUZySVFVZ0FrRUJheUVDSUFCQkFtb2hBQXdCQ3dzZ0JVRUFUQVJBUkFBQUFBQUFBQUFBRHdzZ0JrRXdhMEVLVDBFQVFRQWdCQ0FDR3hzTkFRc2dCa0V3YXlFRUEwQWdCMFVnQmtFdVJuRWdCRUVLU1hJRVFBSkFJQVJCQ2trRVFDQUVyU0FJUWdwK2ZDQUlJQVJGUmEyRUlBRkJFMGdiSVFnZ0FVRUJhaUVCQlNBQklRSkJBU0VIQ3lBRlFRRnJJZ1ZGRFFBZ0FFRUNhaUlBTHdFQUlnWkJNR3NoQkF3Q0N3c0xJQUlnQVNBSEcwRVRJQUVnQVVFVFNodHJJUVlDUUNBSVVBSi9RUUVoQVVFQUlBQXZBUUJCSUhKQjVRQkhEUUFhUVFBZ0JVRUJheUlFUlEwQUdpQUFRUUpxSWdBdkFRQWlBa0V0UmdSL1FRQWdCRUVCYXlJRVJRMEJHa0YvSVFFZ0FFRUNhaUlBTHdFQUJTQUNRU3RHQkg5QkFDQUVRUUZySWdSRkRRSWFJQUJCQW1vaUFDOEJBQVVnQWdzTElRSURRQ0FDUVRCR0JFQkJBQ0FFUVFGcklnUkZEUUlhSUFCQkFtb2lBQzhCQUNFQ0RBRUxDeUFDUVRCcklRVURRQ0FGUVFwSlFRQWdCQnNFUUNBQlFZQVpiQ0FEUVlBWlRnMENHaUFEUVFwc0lBVnFJUU1nQkVFQmF5RUVJQUJCQW1vaUFDOEJBRUV3YXlFRkRBRUxDeUFCSUFOc0N5QUdhaUlBUWFwOVNISU5BRVFBQUFBQUFBRHdmeUVOSUFCQnRBSktEUUFnQ0xvaERTQUFSUTBBSUFCQkpVd2dBRUVXU25FRVFDQU5JQUJCQTNSQjRCdHFLd01Bb2lFTlFSWWhBQXNnQ0VMLy8vLy8vLy8vRDFnRWZ5QUFRUjkxSWdFZ0FDQUJhbk5CRmt3RlFRQUxCSHdnQUVFQVNnUkFJQTBnQUVFRGRFR1FIV29yQXdDaUlRME1BZ3NnRFVFQUlBQnJRUU4wUVpBZGFpc0RBS01GSUFCQkFFZ0VmQ0FJSUFoNUlnbUdJUWdnQUNJQnJDQUpmU0VKQTBBZ0FVRnlUQVJBSUFoQzZZT3gzaGFDSUFoQzZZT3gzaGFBSWdoNUlncENFbjJHdWtTYks2R0dtNFFHUDZLZS9BY2dDQ0FLaG53aENDQUpJQXA5SVFrZ0FVRU9haUVCREFFTEN5QUlRUUFnQVdzUU5xd2lDb0FpREhraEN5QUlJQXFDdXIwZ0MwSTBobnkvSUFxNm8vd0hJQXdnQzRaOHVpQUpJQXQ5cHhBM0JTQUlJQWg2SWdtSUlRZ2dDU0FBSWdPc2ZDUU5BMEFnQTBFTlRnUkFRaUFnQ0VJZ2lFS1Y1NG5HQkg0Z0NFTC8vLy8vRDROQ2xlZUp4Z1IrSWdoQ0lJaDhJZ2xDSUlpblp5SUFyWDBpQ2lNTmZDUU5JQWdnQUsyR1FoK0lRZ0dESUFrZ0FLMkdJQWhDLy8vLy93K0RJQXFJaEh3aENDQURRUTFySVFNTUFRc0xJQU1RTmlJQXJTQUlRdi8vLy84UGczNGhDVUlnSUFDdElBaENJSWgrSUFsQ0lJaDhJZ2hDSUlpblp5SUFyWDBpQ2lNTmZDUU5JQWtnQUsyR1FoK0lRZ0dESUFnZ0FLMkdJQWxDLy8vLy93K0RJQXFJaEh5Nkl3Mm5FRGNMQ3lFTkN5QU5JQTZtRHd0RUFBQUFBQUFBK0g4THJBTUJCWDhnQUJBb0lBQVFUaUlCUlFSQUlBQVFUeUVCQ3lBQlJRUkFBbjhqRUVFTWF5UVFFRUlqRUVJQU53TUFJeEJCQURZQ0NDQUFFRVVoQVNNUVFlQVROZ0lBUWVBVFFRQVFLU0FCUndSQUl4QkJER29rRUVFQURBRUxJeEFnQUNnQ0FDSUROZ0lBSUFBUVd5Z0NBQ0VCSXhBZ0FUWUNCQ0FBRUV3aEJDTVFJQVEyQWdnakVFRUVheVFRRUVJakVFRUFOZ0lBSXhBaEJTTVFRUVJySkJBUVFpTVFRUUEyQWdBakVFRUVRUTRRR0NJQ05nSUFJQUlnQkJBYUl4QWdBaEJjSWdJMkFnQWpFRUVFYWlRUUlBVWdBallDQUNBRElBRWdBaEJKSXhCQkJHb2tFQ01RUVF4cUpCQkJBUXNoQVFzZ0FVVUVRQ0FBRUZFaEFRc2dBVVVFUUNBQUVGSWhBUXNnQVVVRVFBSi9JeEJCQ0dza0VCQkNJeEJDQURjREFDQUFFRVVoQVNNUVFlQWVOZ0lBUWVBZVFRQVFLU0FCUmdSQUl4QkI0QjQyQWdRZ0FFSGdIaEJRSXhBZ0FDZ0NBQ0lCTmdJQUlBQVFXeWdDQUNFQ0l4QWdBallDQkNNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUNNT0lnTTJBZ0FnQVNBQ0lBTVFTU01RUVFScUpCQWpFRUVJYWlRUVFRRU1BUXNqRUVFSWFpUVFRUUFMSVFFTElBQVFLQ0FCQ3hBQUlBQUVmeUFBS0FJQUJVSFFEQXNMR1FBZ0FFRUNkRUdBSm1vZ0FUWUNBRUdBSmlBQlFRRVFHUXMwQVFGL0lBQUVRQ0FBUVJScklnRVFCVUVEUmdSQVFaQW9RWUFLUWRFQ1FRY1FBQUFMSUFFUUNTQUJJd1JCQXhBS0N5QUFDejhBSUFCRkJFQVBDeUFBUVJScklnQVFCVUVEUndSQVFkQW9RWUFLUWQ4Q1FRVVFBQUFMSXdKQkFVWUVRQ0FBRUFzRklBQVFDU0FBSXdnakJ4QUtDd3M1QUNNQ1FRQktCRUFEUUNNQ0JFQVFFeG9NQVFzTEN4QVRHZ05BSXdJRVFCQVRHZ3dCQ3dzakFLMUN5QUYrUXVRQWdLZEJnQWhxSkFFTEVBQWdBQ2dDQUNJQUJFQWdBQkFNQ3dzL0FRTi9JQUFvQWdRaUFTQUFLQUlNUVFKMGFpRUNBMEFnQVNBQ1NRUkFJQUVvQWdBaUF3UkFJQU1RREFzZ0FVRUVhaUVCREFFTEN5QUFLQUlBRUF3THdRSUJBbjhDUUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUFKQUFrQUNRQUpBQWtBQ1FBSkFBa0FDUUNBQVFRaHJLQUlBRGhVQUFRSURFZ1FGRWdZSENBa1NDaElMREEwT0R4QVJDdzhMRHdzZ0FCQS9Ed3NnQUJBL0R3c1BDeUFBS0FJQUVBd2dBQ2dDRUVFTWJDQUFLQUlJSWdFaUFHb2hBZ05BSUFBZ0Fra0VRQ0FBS0FJSVFRRnhSUVJBSUFBb0FnQVFEQ0FBS0FJRUVBd0xJQUJCREdvaEFBd0JDd3NnQVJBTUR3c1BDeUFBRUVBUEN5QUFLQUlBSWdFRVFDQUJFQXdMSUFBb0FnUWlBQVJBSUFBUURBc1BDeUFBS0FJQUlnRUVRQ0FCRUF3TElBQW9BZ2dpQUFSQUlBQVFEQXNQQ3lBQUVFQVBDdzhMRHdzUEN3OExEd3NnQUNBQVFSUnJLQUlRYWlFQkEwQWdBQ0FCU1FSQUlBQW9BZ0FpQWdSQUlBSVFEQXNnQUVFRWFpRUFEQUVMQ3c4TEFBc2dBQ2dDQUNJQUJFQWdBQkFNQ3dzYUFDTVFRYXdxU0FSQVFjQ3FBVUh3cWdGQkFVRUJFQUFBQ3d1cEFnRUVmeU1RUVFockpCQVFRaU1RUWdBM0F3QWpFQ0FBUWRBTUlBQWJJZ0UyQWdBakVDQUJFQnRCQW0yM25Qd0NFRmdpQVRZQ0JBTkFJQUlnQVNnQ0NFZ0VRQUpBSUFBZ0FrRUJkQ0lERUJ3aEJDTVFJQVEyQWdBZ0JCQWVJUVFnQUNBRFFRRnFFQndoQXlNUUlBTTJBZ0FnQXhBZUlnTkJmMFlnQkVGL1JuSU5BQ0FCSUFJZ0JFRUVkQ0FEY2hBZklBSkJBV29oQWd3Q0N3c0xJQUVvQWdnZ0FrY0VRQ01RUVFSckpCQVFRaU1RUVFBMkFnQkJBQ0FCS0FJSUlnQWdBRUVBU2hzaEF5TVFJQUpCQUVnRWZ5QUFJQUpxSWdCQkFDQUFRUUJLR3dVZ0FpQUFJQUFnQWtvYkN5QURheUlBUVFBZ0FFRUFTaHNpQUJCWUlnSTJBZ0FnQWlnQ0JDQUJLQUlFSUFOcUlBRDhDZ0FBSXhCQkJHb2tFQ0FDSVFFTEl4QkJDR29rRUNBQkM1OEJBUVIvSXhCQkRHc2tFQkJDSXhCQ0FEY0RBQ01RUVFBMkFnZ2pFQ0FBS0FJSUVGZ2lBellDQUNNUUlRVkJBU1FLSUFFUUlTRUVJeEFnQkRZQ0JFRUJKQW9nQlNBRUVDTWlCRFlDQ0FOQUlBSWdBQ2dDQ0VnRVFDQURJQUlnQUNBQ0VDUWdCQ0FDSUFFUUcyOFFKSE5CL3dGeEVCOGdBa0VCYWlFQ0RBRUxDeU1RSUFNb0FnQWlBRFlDQkNBQUlBQVFJaEJaSVFBakVFRU1haVFRSUFBTGFBRUNmeU1RUVFSckpCQVFRaU1RUVFBMkFnQWdBQkJiS0FJRUlRSWdBQkJiS0FJSUlRRWpFQ0FCTmdJQUlBSWdBU2dDQ0U0RVFDTVFRUVJxSkJCQmZ3OExJQUFRV3lnQ0NDRUJJeEFnQVRZQ0FDQUJJQUFRV3lnQ0JCQWtJUUFqRUVFRWFpUVFJQUFMZVFFQ2Z5TVFRUVJySkJBUVFpTVFRUUEyQWdBZ0FCQmJLQUlFSVFJZ0FCQmJLQUlJSVFFakVDQUJOZ0lBSUFFb0FnZ2dBa3dFUUVId0QwR1FEMEdkQVVFSkVBQUFDeUFBRUZzb0FnZ2hBU01RSUFFMkFnQWdBQkJiSUFBUVd5Z0NCQ0lBUVFGcUVBRWdBU0FBRUNRaEFDTVFRUVJxSkJBZ0FBdVlBUUVCZnlNUVFRaHJKQkFRUWlNUVFnQTNBd0FqRUNBQUtBSUFJZ0UyQWdBakVDQUFLQUlBSWdBMkFnUWdBQ2dDREVFQmF5RUFJeEJCQkdza0VCQkNJeEJCQURZQ0FDQUFJQUVvQWd4UEJFQkJnQXRCb0E1QjhnQkJLaEFBQUFzakVDQUJLQUlFSUFCQkFuUnFLQUlBSWdBMkFnQWdBRVVFUUVIUUVFR2dEa0gyQUVFb0VBQUFDeU1RUVFScUpCQWpFRUVJYWlRUUlBQUxjd0VCZnlNUVFRUnJKQkFRUWlNUVFRQTJBZ0FnQUNnQ0FDQUNJQUFvQWdSeFFRSjBhaWdDQUNFQUEwQWdBQVJBSUFBb0FnZ2lBa0VCY1FSL1FRQUZJeEFnQUNnQ0FDSUROZ0lBSUFNZ0FSQXVDd1JBSXhCQkJHb2tFQ0FBRHdzZ0FrRitjU0VBREFFTEN5TVFRUVJxSkJCQkFBdTFBZ0VCZnlNUVFRaHJKQkFRUWlNUVFnQTNBd0FnQVJBYkJIOUJBQVVqRUNBQUtBSUFJZ00yQWdBZ0F5Z0NERVVMQkVBakVDQUFLQUlBSWdBMkFnQWdBQ0FDRUNzakVFRUlhaVFRRHdzakVDQUFFRWNpQXpZQ0JDQURCSDhnQTBFRUVDd0ZRUUFMQkVBakVDQUFFRWNpQURZQ0JDQUFRUVFRTEVVRVFFSFFFVUdRRWtIT0FFRU9FQUFBQ3lNUUlBQTJBZ0FqRUVFRWF5UVFFRUlqRUVFQU5nSUFJeEFnQUNnQ0FDSUFOZ0lBSUFBZ0FTQUNFRjRqRUVFRWFpUVFCU01RSUFBUVJ5SUJOZ0lFSUFFRWZ5QUJRUXdRTEFWQkFBc0VRQ01RSUFBUVJ5SUFOZ0lFSUFCQkRCQXNSUVJBUWRBUlFaQVNRZEFBUVJNUUFBQUxJeEFnQURZQ0FDTVFRUVJySkJBUVFpTVFRUUEyQWdBakVDQUFLQUlBSWdBMkFnQWdBQ0FDRUNzakVFRUVhaVFRQ3dzakVFRUlhaVFRQy9vQkFRUi9JeEJCREdza0VCQkNJeEJDQURjREFDTVFRUUEyQWdnQ1FDQUJRUUZySWdKQkFFZ0VRRUhRRENFQURBRUxJQUpGQkVBakVDQUFLQUlBSWdBMkFnQWdBRUhRRENBQUVERWJJUUFNQVF0QjBBd2hBU01RUWRBTU5nSUVRZEFNRUJzaEJRTkFJQUlnQTBvRVFDTVFJQUFnQTBFQ2RHb29BZ0FpQkRZQ0FDQUVFREVFUUNNUUlBUTJBZ2dqRUNBQklBUVFNaUlCTmdJRUN5QUZCRUFqRUNBQlFkQU1FRElpQVRZQ0JBc2dBMEVCYWlFRERBRUxDeU1RSUFBZ0FrRUNkR29vQWdBaUFEWUNBQ0FBRURFRVFDTVFJQUEyQWdnakVDQUJJQUFRTWlJQk5nSUVDeU1RUVF4cUpCQWdBUThMSXhCQkRHb2tFQ0FBQzdnREFRSi9JeEJCQ0dza0VCQkNJeEJDQURjREFDQUFFRVloQWtIZ0V5RUJJeEJCNEJNMkFnQUNRRUhnRTBFQUVDa2dBa1lOQUVHZ0ZTRUJJeEJCb0JVMkFnQkJvQlZCQUJBcElBSkdEUUJCd0JVaEFTTVFRY0FWTmdJQVFjQVZRUUFRS1NBQ1JnMEFJeEJCNEJVMkFnQkI0QlZCQUJBcElBSkdCRUJCZ0JZaEFRd0JDeU1RUWFBV05nSUFRYUFXUVFBUUtTQUNSZ1JBUWNBV0lRRU1BUXNqRUVIZ0ZqWUNBRUhnRmtFQUVDa2dBa1lFUUVHQUZ5RUJEQUVMSXhCQm9CYzJBZ0JCb0JkQkFCQXBJQUpHQkVCQndCY2hBUXdCQ3lNUVFlQVhOZ0lBUWVBWFFRQVFLU0FDUmdSQUlBQVFNMEVNZENBQUVETkJDSFJxSUFBUU0wRUVkR29nQUJBemFpRUFJeEJCQkdza0VCQkNJeEJCQURZQ0FDTVFRUUlnQUVILy93TkxJZ0owUVFFUUdDSUJOZ0lBSUFJRVFDQUFRZi8vd3dCTEJFQkJBRUh3REVFblFRY1FBQUFMSUFFZ0FFR0FnQVJySWdCQkNuWkJnTEFEY2lBQVFmOEhjVUdBdUFOeVFSQjBjallDQUFVZ0FTQUFPd0VBQ3lNUVFRUnFKQkFNQVFzakVFSEFHRFlDQUVFQkpBb2dBaEEwSVFBakVDQUFOZ0lFUWNBWUlBQVFNa0dRRDBHekFrRUpFQUFBQ3lNUVFRaHFKQkFnQVF1bUF3RURmeU1RUVJCckpCQVFRaU1RUWdBM0F3QWpFRUlBTndNSUlBQVFSaUVCSXhCQjRCTTJBZ0JCNEJOQkFCQXBJQUZIQkVCQmdCUkJrQTlCOWdGQkNSQUFBQXNnQUJCYktBSUVJUUVqRUFKL0l4QkJDR3NrRUJCQ0l4QkNBRGNEQUNNUVFSQkJEUkFZSWdJMkFnQWdBa0VBRUJvZ0FrRUFFQUVnQWtFQUVBSWdBa0VBRUJZakVFRWdRUUFRR0NJRE5nSUVJQUlnQXhBYUlBSWdBeEFCSUFKQklCQUNJQUpCQUJBV0l4QkJDR29rRUNBQ0N6WUNCQU5BQWtBZ0FCQkdJZ05CSUVnRVFFSFFGRUdRRDBIL0FVRU5FQUFBQ3lNUVFlQVROZ0lBUWVBVFFRQVFLU0FEUmdSL0l4QWhBeUFBRUZzaEFDTVFJQUEyQWdCQkFTUUtJQU1nQUNBQkVEQWlBRFlDQ0NBQ0tBSU1SUTBCSUFJZ0FCQXJJeEJCMEF3MkFnd2dBaWdDQkNBQ0tBSU1FRW9GSXhCQm9CVTJBZ0JCb0JWQkFCQXBJQU5HQkVBZ0FCQmJLQUlFSUFGQkFXcEtCRUFnQUJCYklRTWpFQ0FETmdJTVFRRWtDaUFESUFFUU1DRUJJeEFnQVRZQ0RDQUNJQUVRS3dzZ0FCQkxJUUVqRUNBQk5nSU1JQUlnQVJBcklBQVFXeWdDQkNFQkN3d0NDeUVBQ3dzakVFRVFhaVFRSUFBTFFnRUJmeU1RUVFSckpCQVFRaU1RUVFBMkFnQWpFQ0FBS0FJQUlnRTJBZ0FnQVNnQ0RFRUJTZ1JBSXhBZ0FDZ0NBQ0lBTmdJQUlBQVFYd3NqRUVFRWFpUVFDNWdFQVFWL0l4QkJDR3NrRUJCQ0l4QkNBRGNEQUNBQUVFVWhBU01RUWJBUU5nSUFRYkFRUVFBUUtTQUJSd1JBSXhCQkNHb2tFRUVBRHdzakVDQUFFRnNvQWdBaUF6WUNCQ0FBRUZ0QjBBd1FHaU1RSUFBb0FnQWlCRFlDQUNNUVFRaHJKQkFRUWlNUVFnQTNBd0FqRUNFQkl4QkJCR3NrRUJCQ0l4QkJBRFlDQUNNUVFRUkJCQkFZSWdJMkFnQWdBa0VBRUJvakVDQUNFRndpQlRZQ0FDTVFRUVJySkJBUVFpTVFRUUEyQWdBakVFRVlRUVlRR0NJQ05nSUFJQUpCRUJCZEVCb2dBa0VERUFFZ0FrRXdFRjBRSnlBQ1FRUVFGaUFDUVFBUUZ5QUNRUUFRS2lNUVFRUnFKQkFnQlNBQ0VCb2pFRUVFYWlRUUlBRWdCVFlDQUNBRUlBTWdCUkJKSXhBZ0JDZ0NBQ0lCTmdJRUlBRWdCUkFySXhCQkNHb2tFQ0FBRUVZYUlBQVFLRUVCSVFFRFFDQUFFRVVoQWlNUVFmQVNOZ0lBUWZBU1FRQVFLU0FDUndSQUlBRUVRRUVBSVFFRklBQVFSaUVDSXhCQmtCTTJBZ0JCa0JOQkFCQXBJQUpIQkVCQnNCTkJrQTlCdndGQkZSQUFBQXNMSXhCQkJHc2tFQkJDSXhCQkFEWUNBQ0FBRUNnZ0FCQmJJQUFRVEJBYUlBQVFLQ0FBRUVZaEFpTVFRWkFaTmdJQVFaQVpRUUFRS1NBQ1J3UkFRYkFaUVpBUFFkQUJRUWtRQUFBTEl4QkJCR29rRUNBQUVEa2FEQUVMQ3lBQUVFWWhBU01RUWZBU05nSUFRZkFTUVFBUUtTQUJSd1JBUWVBWlFaQVBRY1lCUVEwUUFBQUxJeEFnQUNnQ0FDSUFOZ0lBSUFBUVRTTVFRUWhxSkJCQkFRdU9Bd0VFZnlNUVFRaHJKQkFRUWlNUVFnQTNBd0FnQUJCRklRRWpFRUhnR2pZQ0FFSGdHa0VBRUNrZ0FVY0VRQ01RUVFocUpCQkJBQThMSXhBZ0FCQmJLQUlBSWdFMkFnUWdBQkJiUWRBTUVCb2pFQ0FBS0FJQUlnSTJBZ0FqRUVFSWF5UVFFRUlqRUVJQU53TUFJeEFoQXlNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUVFRVFRd1FHQ0lFTmdJQUlBUkJBQkFhSXhBZ0JCQmNJZ1EyQWdBZ0JCQmFFQm9qRUVFRWFpUVFJQU1nQkRZQ0FDTVFJQUlvQWdBaUF6WUNCQ0FES0FJTUJFQWdBaUFCSUFRUVNRc2pFQ0FDS0FJQUlnRTJBZ1FnQVNBRUVDc2pFRUVJYWlRUUlBQVFSaG9nQUJBb1FRRWhBUU5BSUFBUVJTRUNJeEJCZ0JzMkFnQkJnQnRCQUJBcElBSkhCRUFnQVFSQVFRQWhBUVVnQUJCR0lRSWpFRUdRRXpZQ0FFR1FFMEVBRUNrZ0FrY0VRRUd3RTBHUUQwSGhBVUVWRUFBQUN3c2dBQkE1R2d3QkN3c2dBQkJHSVFFakVFR0FHellDQUVHQUcwRUFFQ2tnQVVjRVFFR2dHMEdRRDBIbkFVRU5FQUFBQ3lNUUlBQW9BZ0FpQURZQ0FDQUFFRTBqRUVFSWFpUVFRUUVMZUFFQmZ5TVFRUXhySkJBUVFpTVFRZ0EzQXdBakVFRUFOZ0lJQTBBZ0FSQWJJQUpLQkVBZ0FTQUNFQ2tnQUJCR1J3UkFJeEJCa0J3MkFnaEJrQndnQVJBeUlRQWpFQ0FBTmdJQUl4QkJ3QncyQWdRZ0FFSEFIQkF5UVpBUFFZMERRUTBRQUFBTElBSkJBV29oQWd3QkN3c2pFRUVNYWlRUUM4b0JBUUYvSXhCQkNHc2tFQkJDSXhCQ0FEY0RBQ0FBRUVVaEFTTVFRZkFiTmdJQUFrQkI4QnRCQUJBcElBRkdCRUFqRUVId0d6WUNCQ0FBUWZBYkVGQWpFQ0FBS0FJQUlnRTJBZ0FnQUJCYktBSUFJUUFqRUNBQU5nSUVJQUVnQUVFQUVEVU1BUXNnQUJCRklRRWpFRUhnSERZQ0FFSGdIRUVBRUNrZ0FVWUVRQ01RUWVBY05nSUVJQUJCNEJ3UVVDTVFJQUFvQWdBaUFUWUNBQ0FBRUZzb0FnQWhBQ01RSUFBMkFnUWdBU0FBUVFFUU5Rd0JDeU1RUVFocUpCQkJBQThMSXhCQkNHb2tFRUVCQzZjRkFnWi9BbndqRUVFTWF5UVFFRUlqRUVJQU53TUFJeEJCQURZQ0NFSFFEQ0VCSXhCQjBBdzJBZ0FnQUJCRlFTMUdCSHdqRUNFQklBQVFSaUVFUVFFa0NpQUVFRFFoQkNNUUlBUTJBZ1FnQVVIUURDQUVFRElpQVRZQ0FFUUFBQUFBQUFEd3Z3VkVBQUFBQUFBQThEOExJUWdEUUNBQUVFVkJNRTRFZnlBQUVFVkJPVXdGUVFBTEJIOUJBUVVnQUJCRlFTNUdDd1IvUVFFRklBQVFSVUV0UmdzRWYwRUJCU0FBRUVWQkswWUxCSDlCQVFVZ0FCQkZRY1VBUmdzRWYwRUJCU0FBRUVWQjVRQkdDd1JBSUFBUVJpRUVJeEFoQmtFQkpBb2dCQkEwSVFVakVDQUZOZ0lFSUFZZ0FTQUZFRElpQVRZQ0FDQUVRZVVBUmlBRVFjVUFSbklnQkVFdVJuSWdCRUVyUm5JZ0JFRXRSbklFUUVFQklRTUZJQWNnQjBRQUFBQUFBQUFrUUtJZ0JFRXdhN2VnSUFNYklRY2dBa0VCYWlFQ0N3d0JDd3NnQWtFQVNnUkFJQU1FZjBFQkJTTVFRWUFkTmdJRUlBRkJnQjBRTGdzRVFDTVFJQUFvQWdBaUFqWUNDQ0FBRUZzb0FnQWhBeU1RSUFNMkFnUWdBUkE0SVFjakVFRUVheVFRRUVJakVFRUFOZ0lBSXhBQ2Z5TVFRUVJySkJBUVFpTVFRUUEyQWdBakVFRUlRUkFRR0NJQU5nSUFJeEFoQVNNUVFRUnJKQkFRUWlNUVFRQTJBZ0FnQUVVRVFDTVFRUWhCRVJBWUlnQTJBZ0FMSUFBZ0J6a0RBQ01RSUFBUVhDSUFOZ0lBSXhCQkJHb2tFQ0FCSUFBMkFnQWpFRUVFYWlRUUlBQUxOZ0lBSUFJZ0F5QUFFRWtGSXhBZ0FDZ0NBQ0lCTmdJSUlBQVFXeWdDQUNFQUl4QWdBRFlDQkNNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUNFQ0l4QkJCR3NrRUJCQ0l4QkJBRFlDQUNNUVFRaEJFaEFZSWdNMkFnQWdBeUFISUFpaS9BWTNBd0FqRUNBREVGd2lBellDQUNNUVFRUnFKQkFnQWlBRE5nSUFJQUVnQUNBREVFa0xJeEJCQkdva0VDTVFRUXhxSkJCQkFROExJeEJCREdva0VFRUFDOUFDQVFKL0l4QkJER3NrRUJCQ0l4QkNBRGNEQUNNUVFRQTJBZ2dqRUNFQkl4QkJCR3NrRUJCQ0l4QkJBRFlDQUVFQ0pBb2pFQ0FBRUNFaUFEWUNBQUovSUFBUUlrVUVRRUVBRUZnTUFRdEJBU1FLSUFBUUl3c2hBQ01RUVFScUpCQWdBU0FBTmdJQUl4QWpEQ0lCTmdJRUl4QkJCR3NrRUJCQ0l4QkJBRFlDQUNNUVFRUnJKQkFRUWlNUVFRQTJBZ0FqRUVFTVFRc1FHQ0lDTmdJQUlBSWdBQkFuSUFKQjBBd1FHaUFDUVFBUUFTTVFRUVJxSkJBakVDQUNOZ0lBSUFFZ0FoQW1JQUVRT1VVRVFFR0FIMEdRRDBHUkFVRUpFQUFBQ3lNUVFRUnFKQkFqRUNNTUtBSUFJZ0EyQWdRakVDQUFFRWNpQURZQ0NDTVFJd3dvQWdBaUFUWUNCQ01RUVFSckpCQVFRaU1RUVFBMkFnQURRQ01RSUFFb0FnQWlBallDQUNBQ0tBSU1RUUJLQkVBakVDQUJLQUlBSWdJMkFnQWdBaEJmREFFTEN5TVFRUVJxSkJBakVFRU1haVFRSUFBTGNnRUJmeU1RUVFSckpCQVFRaU1RUVFBMkFnQWpFQ0FBS0FJQUlnSTJBZ0FnQWlBQklBRVFMUkJJUlFSQUl4QkJCR29rRUVFQUR3c2pFQ0FBS0FJQUlnQTJBZ0FnQUNBQklBRVFMUkJJSWdCRkJFQkJzQ0ZCOENGQjZRQkJFUkFBQUFzZ0FDZ0NCQ0VBSXhCQkJHb2tFQ0FBQy9VRUFRUi9JeEJCUUdva0VCQkNJeEJCQUVIQUFQd0xBQ01RSVFFZ0FCQkRJUUFqRUNBQU5nSUFJeEJCb0FnMkFnUWdBU0FBUWFBSUVFUWlBRFlDQ0NNUUlRRWpFQ0FBRUZNaUFEWUNEQ0FBUVFRUUxFVUVRRUhRRVVIQUgwRVRRUzBRQUFBTElBRWdBRFlDRENNUVFZQWhOZ0lFSXhBZ0FCQmdJZ0EyQWhBZ0FBUkFJeEJCb0NJMkFnUWpFQ0FBUWFBaUVHRWlBRFlDRkNBQUJFQWpFQ0VCSXhBZ0FDZ0NBQ0lBTmdJWUlBQVFReUVBSXhBZ0FEWUNBQ01RUWFBSU5nSUVJQUVnQUVHZ0NCQkVJZ0EyQWh3akVDRUJJeEFnQUJCVElnQTJBaUFnQUVFRUVDeEZCRUJCMEJGQndCOUJJMEUzRUFBQUN5QUJJQUEyQWlBakVFSFFJallDQkNNUUlBQkIwQ0lRWVNJQU5nSWtJQUFFUUNNUUlRRWpFQ0FBS0FJQUlnQTJBaWdqRUNBQUVGTWlBRFlDS0NBQVFRUVFMRVVFUUVIUUVVSEFIMEVuUVQ0UUFBQUxJQUVnQURZQ0tDTVFRWUFoTmdJRUl4QWdBQkJnSWdBMkFpd2dBQVJBSXhBaEFTTVFRY0FtTmdJWUlBQkJ3Q1lRWVNFQ0l4QWdBallDQUNBQklBSVFPaUlCTmdJd0l4QWhBaU1RUWZBbU5nSVlJQUJCOENZUVlTRURJeEFnQXpZQ0FDQUNJQU1RT2lJQ05nSTBJeEFoQXlNUVFhQW5OZ0lZSUFCQm9DY1FZU0VFSXhBZ0JEWUNBQ0FESUFRUU9pSUROZ0k0SXhBaEJDTVFRZUFuTmdJWUlBQkI0Q2NRWVNFQUl4QWdBRFlDQUNBRUlBQVFPaUlBTmdJOEl4QkJnQ1kyQWdCQkFTQUJFRHNqRUVHQUpqWUNBRUVESUFJUU95TVFRWUFtTmdJQVFRVWdBeEE3SXhCQmdDWTJBZ0JCQnlBQUVEc2pFRUdBSmpZQ0FDTVFRZEFNTmdJRVFZQW1RZndsS0FJQVFRSjJFRW9oQUNNUVFVQnJKQkFnQUE4TEN3c0xRYUFnUWNBZlFUbEJCUkFBQUF1dEFRRURmeU1RUVJCckpCQVFRaU1RUWdBM0F3QWpFRUlBTndNSUl4QWhBMEVCSkFvZ0FCQWhJUUFqRUNBQU5nSUFRUUVrQ2lBRElBQVFJeUlBTmdJRUl4QWhBMEVCSkFvZ0FSQWhJUVFqRUNBRU5nSUFRUUVrQ2lBRElBUVFJeUlETmdJSUl4QWdBQ2dDQ0JCWUlnUTJBZ3dEUUNBQ0lBQW9BZ2hJQkVBZ0JDQUNJQUFnQWhBa0lBTWdBaUFCRUJ0dkVDUnpRZjhCY1JBZklBSkJBV29oQWd3QkN3c2pFRUVRYWlRUUlBUUxtQUlCQW44akVFRUVheVFRRUVJakVFRUFOZ0lBUHdCQkVIUkJyS29CYTBFQmRpUUJRYkFLRUFNa0JFSFFDaEFESkFaQjRBc1FBeVFJSXhCQkJHc2tFQkJDSXhCQkFEWUNBQ01RUVFSQkJ4QVlJZ0EyQWdBakVDRUJJeEJCQkdza0VCQkNJeEJCQURZQ0FDQUFSUVJBSXhCQkFFRUlFQmdpQURZQ0FBc2pFRUVFYWlRUUlBRWdBRFlDQUNBQUVGb1FHaU1RUVFScUpCQWdBQ1FMSXhBakN5SUFOZ0lBSXhCQkJHc2tFQkJDSXhCQkFEWUNBQ01RUVFoQkNoQVlJZ0UyQWdBZ0FVRUFFQm9nQVVFQUVDWWdBU0FBRUJvakVFRUVhaVFRSUFFa0RDTVFRUVJySkJBUVFpTVFRUUEyQWdBakVFRUFRUk1RR0NJQU5nSUFJeEFnQUJCY0lnQTJBZ0FqRUVFRWFpUVFJQUFrRGlNUVFRUnFKQkFMcVFFQkEzOGpFRUVFYXlRUUVFSWpFRUVBTmdJQUl4QkJERUVERUJnaUFUWUNBQ01RSVFNakVFRUlheVFRRUVJakVFSUFOd01BSUFGRkJFQWpFRUVNUVFJUUdDSUJOZ0lBQ3lBQlFRQVFHaUFCUVFBUUFTQUJRUUFRQWlBQVFmei8vLzhEU3dSQVFkQUlRWUFKUVJOQk9SQUFBQXNqRUNBQVFRQVFHQ0lDTmdJRUlBRWdBaEFhSUFFZ0FoQUJJQUVnQUJBQ0l4QkJDR29rRUNBRElBRTJBZ0FqRUVFRWFpUVFJQUVMNWdJQkJYOGpFRUVFYXlRUUVFSWpFRUVBTmdJQUlBQWdBV29pQkNBQVNRUkFRUUJCOEF4QmdnWkJCeEFBQUFzakVDQUJRUUYwUVFFUUdDSUNOZ0lBSUFJaEFRTkFJQUFnQkVrRVFBSkFJQUF0QUFBaEJTQUFRUUZxSVFBZ0JVR0FBWEVFUUNBQUlBUkdEUUVnQUMwQUFFRS9jU0VHSUFCQkFXb2hBQ0FGUWVBQmNVSEFBVVlFUUNBQklBVkJIM0ZCQm5RZ0JuSTdBUUFGSUFBZ0JFWU5BaUFBTFFBQVFUOXhJUU1nQUVFQmFpRUFJQVZCOEFGeFFlQUJSZ1JBSUFWQkQzRkJESFFnQmtFR2RISWdBM0loQXdVZ0FDQUVSZzBESUFBdEFBQkJQM0VnQlVFSGNVRVNkQ0FHUVF4MGNpQURRUVowY25JaEF5QUFRUUZxSVFBTElBTkJnSUFFU1FSQUlBRWdBenNCQUFVZ0FTQURRWUNBQkdzaUEwRUtka0dBc0FOeUlBTkIvd2R4UVlDNEEzSkJFSFJ5TmdJQUlBRkJBbW9oQVFzTEJTQUJJQVU3QVFBTElBRkJBbW9oQVF3Q0N3c0xJQUlnQVNBQ2F4QWxJUUFqRUVFRWFpUVFJQUFMWndFQ2Z5TVFRUWhySkJBUVFpTVFRZ0EzQXdBakVFRVFRUWtRR0NJQU5nSUFJQUJCQUJBYUlBQkJBQkFCSUFCQkFCQUNJQUJCQUJBV0l4QkJJRUVBRUJnaUFUWUNCQ0FBSUFFUUdpQUFJQUVRQVNBQVFTQVFBaUFBUVFBUUZpTVFRUWhxSkJBZ0FBczdBQ01RUVFSckpCQVFRaU1RUVFBMkFnQWpFQ0FBS0FJRUlnQTJBZ0FnQUVVRVFFSFFEa0dRRDBHQUFVRWVFQUFBQ3lNUVFRUnFKQkFnQUFzdUFDTVFRUVJySkJBUVFpTVFRUUEyQWdBZ0FFVUVRQ01RUVFCQkJSQVlJZ0EyQWdBTEl4QkJCR29rRUNBQUMwRUFJeEJCQkdza0VCQkNJeEJCQURZQ0FDQUFRZnovLy84RFN3UkFRZEFJUVlBSlFUUkJLeEFBQUFzakVDQUFRUUFRR0NJQU5nSUFJeEJCQkdva0VDQUFDOTBCQVFOL0l4QkJCR3NrRUJCQ0l4QkJBRFlDQUNBQUlBRWdBUkF0SWdNUVNDSUVCRUFnQkNBQ0VBRWdBQ0FDUVFFUUdRVWdBQ2dDRUNBQUtBSU1SZ1JBSUFBZ0FDZ0NGQ0FBS0FJTVFRTnNRUVJ0U0FSL0lBQW9BZ1FGSUFBb0FnUkJBWFJCQVhJTEVDOExJeEFnQUNnQ0NDSUVOZ0lBSUFBZ0FDZ0NFQ0lGUVFGcUVCY2dCQ0FGUVF4c2FpSUVJQUVRRGlBQUlBRkJBUkFaSUFRZ0FoQUJJQUFnQWtFQkVCa2dBQ0FBS0FJVVFRRnFFQ29nQkNBQUtBSUFJQU1nQUNnQ0JIRkJBblJxSWdBb0FnQVFBaUFBSUFRMkFnQUxJeEJCQkdva0VBdFVBUUYvSXhCQkJHc2tFQkJDSXhCQkFEWUNBQ0FBS0FJTUlnRkJBRXdFUUVHd0drR2dEa0cvQWtFU0VBQUFDeU1RSUFBb0FnUWdBVUVCYXlJQlFRSjBhaWdDQURZQ0FDQUFJQUVRRmlNUVFRUnFKQkFMWkFBakVFRUVheVFRRUVJakVFRUFOZ0lBSXhBZ0FFR0FJUkJVSWdBMkFnQWdBQVIvSUFBRWZ5QUFRUVFRTEFWQkFBc0ZRUUFMQkVBZ0FFRUVFQ3hGQkVCQjBCRkJrQkpCbVFOQkdSQUFBQXNqRUVFRWFpUVFJQUFQQ3lNUVFRUnFKQkJCQUF0akFDTVFRUVJySkJBUVFpTVFRUUEyQWdBakVDQUFJQUVRVkNJQU5nSUFJQUFFZnlBQUJIOGdBRUVPRUN3RlFRQUxCVUVBQ3dSQUlBQkJEaEFzUlFSQVFkQVJRWkFTUWVrQ1FSa1FBQUFMSXhCQkJHb2tFQ0FBRHdzakVFRUVhaVFRUVFBTElRQWpFRUVFYXlRUUVFSWpFQ0FBTmdJQUlBQVFWU0VBSXhCQkJHb2tFQ0FBQ3lvQUl4QkJDR3NrRUJCQ0l4QWdBRFlDQUNNUUlBRTJBZ1FnQUNBQkVGWWhBQ01RUVFocUpCQWdBQXNxQUNNUVFRaHJKQkFRUWlNUUlBQTJBZ0FqRUNBQk5nSUVJQUFnQVJCRUlRQWpFRUVJYWlRUUlBQUxDOElsVFFCQmpBZ0xNQ3dBQUFBQUFBQUFBQUFBQUFFQUFBQU9BQUFBUmdCaEFHTUFaUUJRQUdnQWFRQUFBQUFBQUFBQUFBQUFBQUFBQUFCQnZBZ0xNQ3dBQUFBQUFBQUFBQUFBQUFFQUFBQWNBQUFBU1FCdUFIWUFZUUJzQUdrQVpBQWdBR3dBWlFCdUFHY0FkQUJvQUFCQjdBZ0xRRHdBQUFBQUFBQUFBQUFBQUFFQUFBQW1BQUFBZmdCc0FHa0FZZ0F2QUdFQWNnQnlBR0VBZVFCaUFIVUFaZ0JtQUdVQWNnQXVBSFFBY3dBQUFBQUFBQUFBUWF3SkMwQThBQUFBQUFBQUFBQUFBQUFCQUFBQUtBQUFBRUVBYkFCc0FHOEFZd0JoQUhRQWFRQnZBRzRBSUFCMEFHOEFid0FnQUd3QVlRQnlBR2NBWlFBQUFBQUFBRUhzQ1F0QVBBQUFBQUFBQUFBQUFBQUFBUUFBQUNBQUFBQitBR3dBYVFCaUFDOEFjZ0IwQUM4QWFRQjBBR01BYlFCekFDNEFkQUJ6QUFBQUFBQUFBQUFBQUFBQUFBQkJzQW9MRkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFFSFFDZ3NVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQVFld0tDMEE4QUFBQUFBQUFBQUFBQUFBQkFBQUFKQUFBQUVrQWJnQmtBR1VBZUFBZ0FHOEFkUUIwQUNBQWJ3Qm1BQ0FBY2dCaEFHNEFad0JsQUFBQUFBQUFBQUFBQUVHc0N3c3dMQUFBQUFBQUFBQUFBQUFBQVFBQUFCUUFBQUIrQUd3QWFRQmlBQzhBY2dCMEFDNEFkQUJ6QUFBQUFBQUFBQUFBQUVIZ0N3c1VBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUWZ3TEMwQThBQUFBQUFBQUFBQUFBQUFCQUFBQUhnQUFBSDRBYkFCcEFHSUFMd0J5QUhRQUx3QjBBR3dBY3dCbUFDNEFkQUJ6QUFBQUFBQUFBQUFBQUFBQUFBQUFBRUc4REFzZ0hBQUFBQUFBQUFBQUFBQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBUWR3TUN6QXNBQUFBQUFBQUFBQUFBQUFCQUFBQUhBQUFBSDRBYkFCcEFHSUFMd0J6QUhRQWNnQnBBRzRBWndBdUFIUUFjd0FBUVl3TkMwQThBQUFBQUFBQUFBQUFBQUFCQUFBQUpBQUFBSDRBYkFCcEFHSUFMd0IwQUhrQWNBQmxBR1FBWVFCeUFISUFZUUI1QUM0QWRBQnpBQUFBQUFBQUFBQUFBRUhNRFF0QVBBQUFBQUFBQUFBQUFBQUFBUUFBQUNRQUFBQlZBRzRBY0FCaEFHa0FjZ0JsQUdRQUlBQnpBSFVBY2dCeUFHOEFad0JoQUhRQVpRQUFBQUFBQUFBQUFBQkJqQTRMTUN3QUFBQUFBQUFBQUFBQUFBRUFBQUFhQUFBQWZnQnNBR2tBWWdBdkFHRUFjZ0J5QUdFQWVRQXVBSFFBY3dBQUFBQkJ2QTRMUUR3QUFBQUFBQUFBQUFBQUFBRUFBQUFlQUFBQWRRQnVBR1VBZUFCd0FHVUFZd0IwQUdVQVpBQWdBRzRBZFFCc0FHd0FBQUFBQUFBQUFBQUFBQUFBQUFBQVFmd09DMkJjQUFBQUFBQUFBQUFBQUFBQkFBQUFSZ0FBQUhNQWNnQmpBQzhBWVFCekFITUFaUUJ0QUdJQWJBQjVBQzhBZGdCbEFHNEFaQUJ2QUhJQUx3QnFBSE1BYndCdUFDOEFaQUJsQUdNQWJ3QmtBR1VBY2dBdUFIUUFjd0FBQUFBQUFBQUFRZHdQQzBBOEFBQUFBQUFBQUFBQUFBQUJBQUFBS0FBQUFGVUFiZ0JsQUhnQWNBQmxBR01BZEFCbEFHUUFJQUJwQUc0QWNBQjFBSFFBSUFCbEFHNEFaQUFBQUFBQUFFR2NFQXNnSEFBQUFBQUFBQUFBQUFBQUFRQUFBQUlBQUFCN0FBQUFBQUFBQUFBQUFBQUFRYndRQzRBQmZBQUFBQUFBQUFBQUFBQUFBUUFBQUY0QUFBQkZBR3dBWlFCdEFHVUFiZ0IwQUNBQWRBQjVBSEFBWlFBZ0FHMEFkUUJ6QUhRQUlBQmlBR1VBSUFCdUFIVUFiQUJzQUdFQVlnQnNBR1VBSUFCcEFHWUFJQUJoQUhJQWNnQmhBSGtBSUFCcEFITUFJQUJvQUc4QWJBQmxBSGtBQUFBQUFBQUFBQUFBQUFBQUFBQUFRYndSQzBBOEFBQUFBQUFBQUFBQUFBQUJBQUFBSWdBQUFIVUFiZ0JsQUhnQWNBQmxBR01BZEFCbEFHUUFJQUIxQUhBQVl3QmhBSE1BZEFBQUFBQUFBQUFBQUFBQUFFSDhFUXRnWEFBQUFBQUFBQUFBQUFBQUFRQUFBRUFBQUFCekFISUFZd0F2QUdFQWN3QnpBR1VBYlFCaUFHd0FlUUF2QUhZQVpRQnVBR1FBYndCeUFDOEFhZ0J6QUc4QWJnQXZBRW9BVXdCUEFFNEFMZ0IwQUhNQUFBQUFBQUFBQUFBQUFBQUFBRUhjRWdzZ0hBQUFBQUFBQUFBQUFBQUFBUUFBQUFJQUFBQjlBQUFBQUFBQUFBQUFBQUFBUWZ3U0N5QWNBQUFBQUFBQUFBQUFBQUFCQUFBQUFnQUFBQ3dBQUFBQUFBQUFBQUFBQUFCQm5CTUxNQ3dBQUFBQUFBQUFBQUFBQUFFQUFBQVlBQUFBUlFCNEFIQUFaUUJqQUhRQVpRQmtBQ0FBSndBc0FDY0FBQUFBQUFCQnpCTUxJQndBQUFBQUFBQUFBQUFBQUFFQUFBQUNBQUFBSWdBQUFBQUFBQUFBQUFBQUFFSHNFd3RRVEFBQUFBQUFBQUFBQUFBQUFRQUFBRG9BQUFCRkFIZ0FjQUJsQUdNQWRBQmxBR1FBSUFCa0FHOEFkUUJpQUd3QVpRQXRBSEVBZFFCdkFIUUFaUUJrQUNBQWN3QjBBSElBYVFCdUFHY0FBQUFBUWJ3VUMxQk1BQUFBQUFBQUFBQUFBQUFCQUFBQU9BQUFBRlVBYmdCbEFIZ0FjQUJsQUdNQWRBQmxBR1FBSUFCakFHOEFiZ0IwQUhJQWJ3QnNBQ0FBWXdCb0FHRUFjZ0JoQUdNQWRBQmxBSElBQUFBQUFBQkJqQlVMSUJ3QUFBQUFBQUFBQUFBQUFBRUFBQUFDQUFBQVhBQUFBQUFBQUFBQUFBQUFBRUdzRlFzZ0hBQUFBQUFBQUFBQUFBQUFBUUFBQUFJQUFBQXZBQUFBQUFBQUFBQUFBQUFBUWN3VkN5QWNBQUFBQUFBQUFBQUFBQUFCQUFBQUFnQUFBR0lBQUFBQUFBQUFBQUFBQUFCQjdCVUxJQndBQUFBQUFBQUFBQUFBQUFFQUFBQUNBQUFBQ0FBQUFBQUFBQUFBQUFBQUFFR01GZ3NnSEFBQUFBQUFBQUFBQUFBQUFRQUFBQUlBQUFCdUFBQUFBQUFBQUFBQUFBQUFRYXdXQ3lBY0FBQUFBQUFBQUFBQUFBQUJBQUFBQWdBQUFBb0FBQUFBQUFBQUFBQUFBQUJCekJZTElCd0FBQUFBQUFBQUFBQUFBQUVBQUFBQ0FBQUFjZ0FBQUFBQUFBQUFBQUFBQUVIc0Znc2dIQUFBQUFBQUFBQUFBQUFBQVFBQUFBSUFBQUFOQUFBQUFBQUFBQUFBQUFBQVFZd1hDeUFjQUFBQUFBQUFBQUFBQUFBQkFBQUFBZ0FBQUhRQUFBQUFBQUFBQUFBQUFBQkJyQmNMSUJ3QUFBQUFBQUFBQUFBQUFBRUFBQUFDQUFBQUNRQUFBQUFBQUFBQUFBQUFBRUhNRndzZ0hBQUFBQUFBQUFBQUFBQUFBUUFBQUFJQUFBQjFBQUFBQUFBQUFBQUFBQUFBUWV3WEMwQThBQUFBQUFBQUFBQUFBQUFCQUFBQUpnQUFBRlVBYmdCbEFIZ0FjQUJsQUdNQWRBQmxBR1FBSUFCY0FIVUFJQUJrQUdrQVp3QnBBSFFBQUFBQUFBQUFBRUdzR0F0UVRBQUFBQUFBQUFBQUFBQUFBUUFBQUR3QUFBQlZBRzRBWlFCNEFIQUFaUUJqQUhRQVpRQmtBQ0FBWlFCekFHTUFZUUJ3QUdVQVpBQWdBR01BYUFCaEFISUFZUUJqQUhRQVpRQnlBRG9BSUFBQVFmd1lDeUFjQUFBQUFBQUFBQUFBQUFBQkFBQUFBZ0FBQURvQUFBQUFBQUFBQUFBQUFBQkJuQmtMTUN3QUFBQUFBQUFBQUFBQUFBRUFBQUFZQUFBQVJRQjRBSEFBWlFCakFIUUFaUUJrQUNBQUp3QTZBQ2NBQUFBQUFBQkJ6QmtMVUV3QUFBQUFBQUFBQUFBQUFBRUFBQUF3QUFBQVZRQnVBR1VBZUFCd0FHVUFZd0IwQUdVQVpBQWdBR1VBYmdCa0FDQUFid0JtQUNBQWJ3QmlBR29BWlFCakFIUUFBQUFBQUFBQUFBQUFBQUFBQUVHY0dnc3dMQUFBQUFBQUFBQUFBQUFBQVFBQUFCd0FBQUJCQUhJQWNnQmhBSGtBSUFCcEFITUFJQUJsQUcwQWNBQjBBSGtBQUVITUdnc2dIQUFBQUFBQUFBQUFBQUFBQVFBQUFBSUFBQUJiQUFBQUFBQUFBQUFBQUFBQVFld2FDeUFjQUFBQUFBQUFBQUFBQUFBQkFBQUFBZ0FBQUYwQUFBQUFBQUFBQUFBQUFBQkJqQnNMVUV3QUFBQUFBQUFBQUFBQUFBRUFBQUF1QUFBQVZRQnVBR1VBZUFCd0FHVUFZd0IwQUdVQVpBQWdBR1VBYmdCa0FDQUFid0JtQUNBQVlRQnlBSElBWVFCNUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVIY0d3c2dIQUFBQUFBQUFBQUFBQUFBQVFBQUFBb0FBQUJtQUdFQWJBQnpBR1VBQUFBQVFmd2JDekFzQUFBQUFBQUFBQUFBQUFBQkFBQUFGQUFBQUVVQWVBQndBR1VBWXdCMEFHVUFaQUFnQUNjQUFBQUFBQUFBQUFBQVFhd2NDeUFjQUFBQUFBQUFBQUFBQUFBQkFBQUFBZ0FBQUNjQUFBQUFBQUFBQUFBQUFBQkJ6QndMSUJ3QUFBQUFBQUFBQUFBQUFBRUFBQUFJQUFBQWRBQnlBSFVBWlFBQUFBQUFBRUhzSEFzZ0hBQUFBQUFBQUFBQUFBQUFBUUFBQUFRQUFBQXRBREFBQUFBQUFBQUFBQUFBUVpBZEM3Z0JBQUFBQUFBQThEOEFBQUFBQUFBa1FBQUFBQUFBQUZsQUFBQUFBQUJBajBBQUFBQUFBSWpEUUFBQUFBQUFhdmhBQUFBQUFJQ0VMa0VBQUFBQTBCSmpRUUFBQUFDRTE1ZEJBQUFBQUdYTnpVRUFBQUFnWDZBQ1FnQUFBT2gyU0RkQ0FBQUFvcFFhYlVJQUFFRGxuRENpUWdBQWtCN0V2TlpDQUFBMEp2VnJERU1BZ09BM2VjTkJRd0NnMklWWE5IWkRBTWhPWjIzQnEwTUFQWkZnNUZqaFEwQ010WGdkcnhWRVVPL2kxdVFhUzBTUzFVMEd6L0NBUkFCQnpCNExJQndBQUFBQUFBQUFBQUFBQUFFQUFBQUlBQUFBYmdCMUFHd0FiQUFBQUFBQUFFSHNIZ3RBUEFBQUFBQUFBQUFBQUFBQUFRQUFBQ0lBQUFCREFHRUFiZ0J1QUc4QWRBQWdBSEFBWVFCeUFITUFaUUFnQUVvQVV3QlBBRTRBQUFBQUFBQUFBQUFBQUFCQnJCOExZRndBQUFBQUFBQUFBQUFBQUFFQUFBQkdBQUFBY3dCeUFHTUFMd0JoQUhNQWN3QmxBRzBBWWdCc0FIa0FMd0JzQUdrQVl3QmxBRzRBY3dCcEFHNEFad0F2QUV3QWFRQmpBR1VBYmdCekFHa0FiZ0JuQUM0QWRBQnpBQUFBQUFBQUFBQkJqQ0FMWUZ3QUFBQUFBQUFBQUFBQUFBRUFBQUJBQUFBQVZBQm9BR1VBSUFCc0FHa0FZd0JsQUc0QWN3QmxBQ0FBYXdCbEFIa0FJQUJwQUhNQWJnQW5BSFFBSUFCakFHOEFiZ0J6QUdrQWN3QjBBR1VBYmdCMEFBQUFBQUFBQUFBQUFBQUFBQUJCN0NBTE1Dd0FBQUFBQUFBQUFBQUFBQUVBQUFBT0FBQUFiQUJwQUdNQVpRQnVBSE1BWlFBQUFBQUFBQUFBQUFBQUFBQUFBQUJCbkNFTFFEd0FBQUFBQUFBQUFBQUFBQUVBQUFBa0FBQUFTd0JsQUhrQUlBQmtBRzhBWlFCekFDQUFiZ0J2QUhRQUlBQmxBSGdBYVFCekFIUUFBQUFBQUFBQUFBQUFRZHdoQ3pBc0FBQUFBQUFBQUFBQUFBQUJBQUFBRmdBQUFINEFiQUJwQUdJQUx3QnRBR0VBY0FBdUFIUUFjd0FBQUFBQUFBQUFRWXdpQ3pBc0FBQUFBQUFBQUFBQUFBQUJBQUFBRWdBQUFHVUFlQUIwQUhJQVlRQkVBR0VBZEFCaEFBQUFBQUFBQUFBQUFBQUFRYndpQzBBOEFBQUFBQUFBQUFBQUFBQUJBQUFBS0FBQUFHd0FhUUJqQUdVQWJnQnpBR1VBVkFCdkFHc0FaUUJ1QUVRQWJ3QmpBSFVBYlFCbEFHNEFkQUFBQUFBQUFFSDhJZ3RBUEFBQUFBQUFBQUFBQUFBQUFRQUFBQ1lBQUFBS0FIc0FDZ0FnQUNBQUlBQWdBQ0lBWkFCaEFIUUFaUUJGQUc0QVpBQWlBRG9BSUFBaUFBQUFBQUFBQUFCQnZDTUxVRXdBQUFBQUFBQUFBQUFBQUFFQUFBQXVBQUFBSWdBc0FBb0FJQUFnQUNBQUlBQWlBSEFBWVFCakFHc0FZUUJuQUdVQVRnQmhBRzBBWlFBaUFEb0FJQUFpQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUdNSkF0UVRBQUFBQUFBQUFBQUFBQUFBUUFBQURZQUFBQWlBQ3dBQ2dBZ0FDQUFJQUFnQUNJQWJBQnBBR01BWlFCdUFITUFaUUJFQUc4QVl3QjFBRzBBWlFCdUFIUUFJZ0E2QUNBQUlnQUFBQUFBQUFBQVFkd2tDMEE4QUFBQUFBQUFBQUFBQUFBQkFBQUFMQUFBQUNJQUxBQUtBQ0FBSUFBZ0FDQUFJZ0JsQUc0QVp3QnBBRzRBWlFCVUFIa0FjQUJsQUNJQU9nQWdBQ0lBQUVHY0pRdFFUQUFBQUFBQUFBQUFBQUFBQVFBQUFEQUFBQUFpQUFvQWZRQUtBQ0FBSUFBZ0FDQUFJQUFnQUNBQUlBQWdBQ0FBSUFBZ0FDQUFJQUFnQUNBQUlBQWdBQ0FBSUFBQUFBQUFBQUFBQUFBQUFBQUFRZXdsQzBBOEFBQUFBd0FBQUFBQUFBQVVBQUFBSkFBQUFKQVJBQUFBQUFBQTBCRUFBQUFBQUFBZ0VnQUFBQUFBQUhBU0FBQUFBQUFBc0JJQUFBQUFBQUFBQUFBQUFFR3NKZ3N3TEFBQUFBQUFBQUFBQUFBQUFRQUFBQTRBQUFCa0FHRUFkQUJsQUVVQWJnQmtBQUFBQUFBQUFBQUFBQUFBQUFBQUFFSGNKZ3N3TEFBQUFBQUFBQUFBQUFBQUFRQUFBQllBQUFCd0FHRUFZd0JyQUdFQVp3QmxBRTRBWVFCdEFHVUFBQUFBQUFBQUFFR01Kd3RBUEFBQUFBQUFBQUFBQUFBQUFRQUFBQjRBQUFCc0FHa0FZd0JsQUc0QWN3QmxBRVFBYndCakFIVUFiUUJsQUc0QWRBQUFBQUFBQUFBQUFBQUFBQUFBQUFCQnpDY0xNQ3dBQUFBQUFBQUFBQUFBQUFFQUFBQVVBQUFBWlFCdUFHY0FhUUJ1QUdVQVZBQjVBSEFBWlFBQUFBQUFBQUFBQUFCQi9DY0xRRHdBQUFBQUFBQUFBQUFBQUFFQUFBQXFBQUFBVHdCaUFHb0FaUUJqQUhRQUlBQmhBR3dBY2dCbEFHRUFaQUI1QUNBQWNBQnBBRzRBYmdCbEFHUUFBQUFBUWJ3b0MwQThBQUFBQUFBQUFBQUFBQUFCQUFBQUtBQUFBRThBWWdCcUFHVUFZd0IwQUNBQWFRQnpBQ0FBYmdCdkFIUUFJQUJ3QUdrQWJnQnVBR1VBWkFBQUFBQUFBRUdBS1F1c0FSVUFBQUFnQUFBQUFBQUFBQ0FBQUFBQUFBQUFBQUFBQUFBQUFBQkJBQUFBQWdBQUFBQUFBQUFGQUFBQUlBQUFBQUFBQUFBUVFZSUFBQUFBQUFBQUFBQUlBQUFBSUFBQUFBQUFBQUFDUVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQlFBQUFBSkJBQUFBQUFBQUFBQUFBQVVBQUFBZ0FBQUFCUUFBQUNBQUFBQVJBQUFBSUFBQUFBVUFBQUFnQUFBQUJRQUFBQ0FBQUFBRkFBQUFCRUVBQUFBQUFBQT0iOwo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvd29ya2VyL1J1bnRpbWUuanMKYXN5bmMgZnVuY3Rpb24gaW5zdGFudGlhdGUobW9kdWxlLCBpbXBvcnRzID0ge30pIHsKICAgIGNvbnN0IGFkYXB0ZWRJbXBvcnRzID0gewogICAgICAgIGVudjogT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKGdsb2JhbFRoaXMpLCBpbXBvcnRzLmVudiB8fCB7fSwgewogICAgICAgICAgICBhYm9ydChtZXNzYWdlLCBmaWxlTmFtZSwgbGluZU51bWJlciwgY29sdW1uTnVtYmVyKSB7CiAgICAgICAgICAgICAgICAvLyB+bGliL2J1aWx0aW5zL2Fib3J0KH5saWIvc3RyaW5nL1N0cmluZyB8IG51bGw/LCB+bGliL3N0cmluZy9TdHJpbmcgfCBudWxsPywgdTMyPywgdTMyPykgPT4gdm9pZAogICAgICAgICAgICAgICAgbWVzc2FnZSA9IF9fbGlmdFN0cmluZyhtZXNzYWdlID4+PiAwKTsKICAgICAgICAgICAgICAgIGZpbGVOYW1lID0gX19saWZ0U3RyaW5nKGZpbGVOYW1lID4+PiAwKTsKICAgICAgICAgICAgICAgIGxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyID4+PiAwOwogICAgICAgICAgICAgICAgY29sdW1uTnVtYmVyID0gY29sdW1uTnVtYmVyID4+PiAwOwogICAgICAgICAgICAgICAgKCgpID0+IHsKICAgICAgICAgICAgICAgICAgICAvLyBAZXh0ZXJuYWwuanMKICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgJHttZXNzYWdlfSBpbiAke2ZpbGVOYW1lfToke2xpbmVOdW1iZXJ9OiR7Y29sdW1uTnVtYmVyfWApOwogICAgICAgICAgICAgICAgfSkoKTsKICAgICAgICAgICAgfSwKICAgICAgICAgICAgImNvbnNvbGUubG9nIih0ZXh0KSB7CiAgICAgICAgICAgICAgICAvLyB+bGliL2JpbmRpbmdzL2RvbS9jb25zb2xlLmxvZyh+bGliL3N0cmluZy9TdHJpbmcpID0+IHZvaWQKICAgICAgICAgICAgICAgIHRleHQgPSBfX2xpZnRTdHJpbmcodGV4dCA+Pj4gMCk7CiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZXh0KTsKICAgICAgICAgICAgfSwKICAgICAgICB9KSwKICAgIH07CiAgICBjb25zdCB7IGV4cG9ydHMgfSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgYWRhcHRlZEltcG9ydHMpOwogICAgY29uc3QgbWVtb3J5ID0gZXhwb3J0cy5tZW1vcnkgfHwgaW1wb3J0cy5lbnYubWVtb3J5OwogICAgY29uc3QgYWRhcHRlZEV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YoewogICAgICAgIGdldEludGVybmFsTGljZW5zZShoZXh4KSB7CiAgICAgICAgICAgIC8vIHNyYy9hc3NlbWJseS9saWNlbnNpbmcvTGljZW5zaW5nL2dldEludGVybmFsTGljZW5zZSh+bGliL3N0cmluZy9TdHJpbmcpID0+IH5saWIvc3RyaW5nL1N0cmluZwogICAgICAgICAgICBoZXh4ID0gX19sb3dlclN0cmluZyhoZXh4KSB8fCBfX25vdG51bGwoKTsKICAgICAgICAgICAgcmV0dXJuIF9fbGlmdFN0cmluZyhleHBvcnRzLmdldEludGVybmFsTGljZW5zZShoZXh4KSA+Pj4gMCk7CiAgICAgICAgfSwKICAgICAgICBlbmNyeXB0VG9rZW4odGV4dCwga2V5KSB7CiAgICAgICAgICAgIC8vIHNyYy9hc3NlbWJseS9lbmNyeXB0aW9uL0VuY3J5cHRpb24vZW5jcnlwdFRva2VuKH5saWIvc3RyaW5nL1N0cmluZywgfmxpYi9zdHJpbmcvU3RyaW5nKSA9PiB+bGliL3R5cGVkYXJyYXkvVWludDhBcnJheQogICAgICAgICAgICB0ZXh0ID0gX19yZXRhaW4oX19sb3dlclN0cmluZyh0ZXh0KSB8fCBfX25vdG51bGwoKSk7CiAgICAgICAgICAgIGtleSA9IF9fbG93ZXJTdHJpbmcoa2V5KSB8fCBfX25vdG51bGwoKTsKICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHJldHVybiBfX2xpZnRUeXBlZEFycmF5KFVpbnQ4QXJyYXksIGV4cG9ydHMuZW5jcnlwdFRva2VuKHRleHQsIGtleSkgPj4+IDApOwogICAgICAgICAgICB9IGZpbmFsbHkgewogICAgICAgICAgICAgICAgX19yZWxlYXNlKHRleHQpOwogICAgICAgICAgICB9CiAgICAgICAgfSwKICAgICAgICBkZWNyeXB0VG9rZW4oYXJyQnVmLCBrZXkpIHsKICAgICAgICAgICAgLy8gc3JjL2Fzc2VtYmx5L2VuY3J5cHRpb24vRW5jcnlwdGlvbi9kZWNyeXB0VG9rZW4ofmxpYi90eXBlZGFycmF5L1VpbnQ4QXJyYXksIH5saWIvc3RyaW5nL1N0cmluZykgPT4gfmxpYi9zdHJpbmcvU3RyaW5nCiAgICAgICAgICAgIGFyckJ1ZiA9IF9fcmV0YWluKF9fbG93ZXJUeXBlZEFycmF5KFVpbnQ4QXJyYXksIDMsIDAsIGFyckJ1ZikgfHwgX19ub3RudWxsKCkpOwogICAgICAgICAgICBrZXkgPSBfX2xvd2VyU3RyaW5nKGtleSkgfHwgX19ub3RudWxsKCk7CiAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICByZXR1cm4gX19saWZ0U3RyaW5nKGV4cG9ydHMuZGVjcnlwdFRva2VuKGFyckJ1Ziwga2V5KSA+Pj4gMCk7CiAgICAgICAgICAgIH0gZmluYWxseSB7CiAgICAgICAgICAgICAgICBfX3JlbGVhc2UoYXJyQnVmKTsKICAgICAgICAgICAgfQogICAgICAgIH0sCiAgICB9LCBleHBvcnRzKTsKICAgIGZ1bmN0aW9uIF9fbGlmdFN0cmluZyhwb2ludGVyKSB7CiAgICAgICAgaWYgKCFwb2ludGVyKSByZXR1cm4gbnVsbDsKICAgICAgICBjb25zdAogICAgICAgICAgICBlbmQgPSBwb2ludGVyICsgbmV3IFVpbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpW3BvaW50ZXIgLSA0ID4+PiAyXSA+Pj4gMSwKICAgICAgICAgICAgbWVtb3J5VTE2ID0gbmV3IFVpbnQxNkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgIGxldAogICAgICAgICAgICBzdGFydCA9IHBvaW50ZXIgPj4+IDEsCiAgICAgICAgICAgIHN0cmluZyA9ICIiOwogICAgICAgIHdoaWxlIChlbmQgLSBzdGFydCA+IDEwMjQpIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLm1lbW9yeVUxNi5zdWJhcnJheShzdGFydCwgc3RhcnQgKz0gMTAyNCkpOwogICAgICAgIHJldHVybiBzdHJpbmcgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLm1lbW9yeVUxNi5zdWJhcnJheShzdGFydCwgZW5kKSk7CiAgICB9CiAgICBmdW5jdGlvbiBfX2xvd2VyU3RyaW5nKHZhbHVlKSB7CiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiAwOwogICAgICAgIGNvbnN0CiAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aCwKICAgICAgICAgICAgcG9pbnRlciA9IGV4cG9ydHMuX19uZXcobGVuZ3RoIDw8IDEsIDEpID4+PiAwLAogICAgICAgICAgICBtZW1vcnlVMTYgPSBuZXcgVWludDE2QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkgbWVtb3J5VTE2Wyhwb2ludGVyID4+PiAxKSArIGldID0gdmFsdWUuY2hhckNvZGVBdChpKTsKICAgICAgICByZXR1cm4gcG9pbnRlcjsKICAgIH0KICAgIGZ1bmN0aW9uIF9fbGlmdFR5cGVkQXJyYXkoY29uc3RydWN0b3IsIHBvaW50ZXIpIHsKICAgICAgICBpZiAoIXBvaW50ZXIpIHJldHVybiBudWxsOwogICAgICAgIGNvbnN0IG1lbW9yeVUzMiA9IG5ldyBVaW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICByZXR1cm4gbmV3IGNvbnN0cnVjdG9yKAogICAgICAgICAgICBtZW1vcnkuYnVmZmVyLAogICAgICAgICAgICBtZW1vcnlVMzJbcG9pbnRlciArIDQgPj4+IDJdLAogICAgICAgICAgICBtZW1vcnlVMzJbcG9pbnRlciArIDggPj4+IDJdIC8gY29uc3RydWN0b3IuQllURVNfUEVSX0VMRU1FTlQKICAgICAgICApLnNsaWNlKCk7CiAgICB9CiAgICBmdW5jdGlvbiBfX2xvd2VyVHlwZWRBcnJheShjb25zdHJ1Y3RvciwgaWQsIGFsaWduLCB2YWx1ZXMpIHsKICAgICAgICBpZiAodmFsdWVzID09IG51bGwpIHJldHVybiAwOwogICAgICAgIGNvbnN0CiAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsCiAgICAgICAgICAgIGJ1ZmZlciA9IGV4cG9ydHMuX19waW4oZXhwb3J0cy5fX25ldyhsZW5ndGggPDwgYWxpZ24sIDApKSA+Pj4gMCwKICAgICAgICAgICAgaGVhZGVyID0gZXhwb3J0cy5fX25ldygxMiwgaWQpID4+PiAwLAogICAgICAgICAgICBtZW1vcnlVMzIgPSBuZXcgVWludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgbWVtb3J5VTMyW2hlYWRlciArIDAgPj4+IDJdID0gYnVmZmVyOwogICAgICAgIG1lbW9yeVUzMltoZWFkZXIgKyA0ID4+PiAyXSA9IGJ1ZmZlcjsKICAgICAgICBtZW1vcnlVMzJbaGVhZGVyICsgOCA+Pj4gMl0gPSBsZW5ndGggPDwgYWxpZ247CiAgICAgICAgbmV3IGNvbnN0cnVjdG9yKG1lbW9yeS5idWZmZXIsIGJ1ZmZlciwgbGVuZ3RoKS5zZXQodmFsdWVzKTsKICAgICAgICBleHBvcnRzLl9fdW5waW4oYnVmZmVyKTsKICAgICAgICByZXR1cm4gaGVhZGVyOwogICAgfQogICAgY29uc3QgcmVmY291bnRzID0gbmV3IE1hcCgpOwogICAgZnVuY3Rpb24gX19yZXRhaW4ocG9pbnRlcikgewogICAgICAgIGlmIChwb2ludGVyKSB7CiAgICAgICAgICAgIGNvbnN0IHJlZmNvdW50ID0gcmVmY291bnRzLmdldChwb2ludGVyKTsKICAgICAgICAgICAgaWYgKHJlZmNvdW50KSByZWZjb3VudHMuc2V0KHBvaW50ZXIsIHJlZmNvdW50ICsgMSk7CiAgICAgICAgICAgIGVsc2UgcmVmY291bnRzLnNldChleHBvcnRzLl9fcGluKHBvaW50ZXIpLCAxKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHBvaW50ZXI7CiAgICB9CiAgICBmdW5jdGlvbiBfX3JlbGVhc2UocG9pbnRlcikgewogICAgICAgIGlmIChwb2ludGVyKSB7CiAgICAgICAgICAgIGNvbnN0IHJlZmNvdW50ID0gcmVmY291bnRzLmdldChwb2ludGVyKTsKICAgICAgICAgICAgaWYgKHJlZmNvdW50ID09PSAxKSBleHBvcnRzLl9fdW5waW4ocG9pbnRlciksIHJlZmNvdW50cy5kZWxldGUocG9pbnRlcik7CiAgICAgICAgICAgIGVsc2UgaWYgKHJlZmNvdW50KSByZWZjb3VudHMuc2V0KHBvaW50ZXIsIHJlZmNvdW50IC0gMSk7CiAgICAgICAgICAgIGVsc2UgdGhyb3cgRXJyb3IoYGludmFsaWQgcmVmY291bnQgJyR7cmVmY291bnR9JyBmb3IgcmVmZXJlbmNlICcke3BvaW50ZXJ9J2ApOwogICAgICAgIH0KICAgIH0KICAgIGZ1bmN0aW9uIF9fbm90bnVsbCgpIHsKICAgICAgICB0aHJvdyBUeXBlRXJyb3IoInZhbHVlIG11c3Qgbm90IGJlIG51bGwiKTsKICAgIH0KICAgIHJldHVybiBhZGFwdGVkRXhwb3J0czsKfQo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvd29ya2VyL1V0aWxzLmpzCi8qKgogKiBBdXhpbGlhciBtZXRob2QgdG8gZGVsZXRlIGEgV2ViQXNzZW1ibHkgU2lkZSBWYXJpYWJsZXMKICoKICogQHBhcmFtIHthcnJheX0gYXJyYXkgVGhlIGFycmF5IHdpdGggbiBlbGVtZW50cwogKi8KY29uc3QgZGVsZXRlV2FzbVZhciA9ICguLi5hcnJheSkgPT4gewogICAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7CiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gInVuZGVmaW5lZCIpIHsKICAgICAgICAgICAgb2JqLmRlbGV0ZSgpOwogICAgICAgIH0KICAgIH0pOwp9OwoKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvRXZlbnRzLmpzCgoKCgpsZXQgaW5zdGFuY2UgPSBudWxsOwoKY29uc3QgcHJlaW5pdGlhbGl6ZVdvcmtlciA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICBpbnN0YW5jZSA9IGF3YWl0IGluc3RhbnRpYXRlKGF3YWl0IFdlYkFzc2VtYmx5LmNvbXBpbGVTdHJlYW1pbmcoZmV0Y2goUnVudGltZV9uYW1lc3BhY2VPYmplY3QpKSwgewogICAgICAgIGVudjogeyBtZW1vcnk6IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoeyBpbml0aWFsOiA2NCwgbWF4aW11bTogMTI4IH0pIH0KICAgIH0pOwoKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNtZDoicHJlSW5pdCIKICAgIH0pOwp9OwoKY29uc3QgZ2V0SW50ZXJuYWxMaWNlbnNlID0gYXN5bmMgKG1lc3NhZ2UpID0+IHsKICAgIHRyeSB7CiAgICAgICAgLy8gbGV0IHRva2VuaXplciA9IG5ldyBpbnN0YW5jZS5TZWxwaElERG9jdW1lbnRSYXdEYXRhKCk7CiAgICAgICAgLy8gdG9rZW5pemVyLnNldExpY2Vuc2VIZXgobWVzc2FnZS50b2tlbi50b1VwcGVyQ2FzZSgpKTsKICAgIAogICAgICAgIC8vIGxldCBsaWNlbnNlU3RhdHVzID0gdG9rZW5pemVyLmdldExpY2Vuc2VTdGF0dXMoKTsKICAgICAgICAvLyBsZXQgbGljZW5zZURvY3VtZW50ID0gdG9rZW5pemVyLmdldExpY2Vuc2VEb2N1bWVudCgpOwogICAgICAgIC8vIGxldCBsaWNlbnNlRW5naW5lVHlwZSA9IHRva2VuaXplci5nZXRMaWNlbnNlRW5naW5lVHlwZSgpOwoKICAgICAgICBsZXQgdG9rZW5SZXN1bHQgPSBpbnN0YW5jZS5nZXRJbnRlcm5hbExpY2Vuc2UobWVzc2FnZS50b2tlbi50b1VwcGVyQ2FzZSgpKTsKCiAgICAgICAgbGV0IHRva2VuSnNvbiA9IEpTT04ucGFyc2UodG9rZW5SZXN1bHQpOwoKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgY21kOiJnZXRJbnRlcm5hbExpY2Vuc2UiLCB0b2tlbjogdG9rZW5Kc29uWyJsaWNlbnNlRG9jdW1lbnQiXSwgZW5naW5lVHlwZTogdG9rZW5Kc29uWyJlbmdpbmVUeXBlIl0sIHVybEJhc2U6IHRva2VuSnNvblsicGFja2FnZU5hbWUiXSwgZXhwaXJlRGF0ZTogdG9rZW5Kc29uWyJkYXRlRW5kIl0gCiAgICAgICAgfSk7CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgY21kOiJnZXRJbnRlcm5hbExpY2Vuc2UiLCBleGNlcHRpb246ICJBbiBlcnJvciBvY2N1cnJlZCBkdXJpbmcgbGljZW5zZSBwcm9jZXNzaW5nLCBwbGVhc2UgY29udGFjdCB0aGUgc3VwcG9ydCB0ZWFtISIKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGVuY3J5cHRUb2tlbiA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IGVuY3J5cHRLZXkgPSBtZXNzYWdlLmtleTsKICAgICAgICBjb25zdCByYXdQYXlsb2FkID0gbWVzc2FnZS5wYXlsb2FkOwoKICAgICAgICBsZXQgcmVzdWx0ID0gaW5zdGFuY2UuZW5jcnlwdFRva2VuKHJhd1BheWxvYWQsIGVuY3J5cHRLZXkpOwoKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImVuY3J5cHRUb2tlbiIsIHBheWxvYWQ6IHJlc3VsdCAKICAgICAgICB9KTsKICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJlbmNyeXB0VG9rZW4iLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBlbmNyeXB0aW5nIHRoZSBvdXRwdXQgcGF5bG9hZCEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZGVjcnlwdFRva2VuID0gYXN5bmMgKG1lc3NhZ2UpID0+IHsKICAgIHRyeSB7CiAgICAgICAgY29uc3QgZW5jcnlwdEtleSA9IG1lc3NhZ2Uua2V5OwogICAgICAgIGNvbnN0IHJhd1BheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGxldCByZXN1bHQgPSBpbnN0YW5jZS5kZWNyeXB0VG9rZW4ocmF3UGF5bG9hZCwgZW5jcnlwdEtleSk7CgogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZGVjcnlwdFRva2VuIiwgcGF5bG9hZDogcmVzdWx0IAogICAgICAgIH0pOwogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImRlY3J5cHRUb2tlbiIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGRlY3J5cHRpbmcgdGhlIG91dHB1dCBwYXlsb2FkISIgCiAgICAgICAgfSk7CiAgICB9Cn07CgoKLyoqCiAqIERlc3Ryb3kgY3JlYXRlZCBvYmplY3RzIGluIFdlYkFzc2VtYmx5IHNpZGUKICovCmNvbnN0IGRlc3Ryb3kgPSBhc3luYyAoKSA9PiB7CiAgICAvLyBEZXN0cm95IFdlYkFzc2VtYmx5IEdsb2JhbHMKICAgIGRlbGV0ZVdhc21WYXIoCiAgICAgICAgaW5zdGFuY2UKICAgICk7CgogICAgLy8gQ2xvc2UgV29ya2VyIFRocmVhZAogICAgY2xvc2UoKTsKfTsKCgo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvd29ya2VyL01haW4uanMKCgpzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7CiAgICBzd2l0Y2gobWVzc2FnZS5kYXRhLmNtZCkgewogICAgY2FzZSAicHJlSW5pdCI6CiAgICAgICAgcHJlaW5pdGlhbGl6ZVdvcmtlcihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0SW50ZXJuYWxMaWNlbnNlIjoKICAgICAgICBnZXRJbnRlcm5hbExpY2Vuc2UobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImVuY3J5cHRUb2tlbiI6CiAgICAgICAgZW5jcnlwdFRva2VuKG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJkZWNyeXB0VG9rZW4iOgogICAgICAgIGRlY3J5cHRUb2tlbihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZGVzdHJveSI6CiAgICAgICAgZGVzdHJveShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgfQp9Owo=")], { type: "text/javascript" }))), ae));
      return e2.postMessage({ cmd: "preInit" }), new Promise((t2) => {
        e2.onmessage = (i2) => {
          "preInit" === i2.data.cmd && (_le.worker = e2, t2());
        };
      });
    }
  }
  static async getInternalLicense(e2) {
    return await _le.__checkWorker(), _le.worker.postMessage({ cmd: "getInternalLicense", token: e2 }), new Promise((e3, t2) => {
      _le.worker.onmessage = (i2) => {
        "getInternalLicense" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3({ token: i2.data.token, engineType: i2.data.engineType, urlBase: i2.data.urlBase, expireDate: i2.data.expireDate }));
      };
    });
  }
  static async encryptToken(e2, t2) {
    return await _le.__checkWorker(), _le.worker.postMessage({ cmd: "encryptToken", payload: e2, key: t2 }), new Promise((e3, t3) => {
      _le.worker.onmessage = (i2) => {
        "encryptToken" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3({ payload: i2.data.payload }));
      };
    });
  }
  static async decryptToken(e2, t2) {
    return await _le.__checkWorker(), _le.worker.postMessage({ cmd: "decryptToken", payload: e2, key: t2 }), new Promise((e3, t3) => {
      _le.worker.onmessage = (i2) => {
        "decryptToken" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3({ payload: i2.data.payload }));
      };
    });
  }
  static destroyWorker() {
    _le.worker && (_le.worker.postMessage({ cmd: "destroy" }), _le.worker = null);
  }
};
var de = class {
  constructor(e2, t2, i2) {
    this.__width = e2, this.__height = t2, this.__rate = i2 > 30 ? 30 : i2, this.__rateInv = 1e3 / this.__rate, this.__lastFrame = performance.now();
  }
  frameReady(e2 = true) {
    let t2 = performance.now();
    return t2 - this.__lastFrame >= this.__rateInv && (e2 && (this.__lastFrame = t2), true);
  }
};
var se = "video";
var ne = ["webm", "mp4", "ogg", "x-matroska"];
var ce = ["should-not-be-supported", "vp8", "vp8.0", "vp9", "vp9.0", "avc1", "av1", "h265", "h.265", "h264", "h.264", "opus", "pcm", "aac", "mpeg", "mp4a"];
var re = { Remote: class extends de {
  constructor(e2, t2, i2, a2, l2) {
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
        let i2 = (this.__lastFrameRecordedTime - this.__startTime) / 1e3, a2 = parseInt(this.__lastFrameSended / i2);
        this.__socket.send(JSON.stringify({ type: "MAKE_VIDEO", FR: a2 })), this.__lastFrameSended = 0;
      } else e2();
    });
  }
  deinitializeEngine() {
    this.__socket.close();
  }
}, Local: class extends de {
  constructor(e2, t2, i2, a2, l2) {
    super(e2, t2, i2), this.engineInitialized = false, this.recording = false, this.videoQuality = a2, this.videoStream = l2, this.mediaRecorder = null, this.chunks = [], this.resetChunks = true, this.generateBlob = false, this.options = { supportedMimeTypes: [], blobType: [] };
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
          const t3 = MediaRecorder.isTypeSupported, i2 = [], a2 = [], l2 = ne;
          for (const d2 of l2) {
            const l3 = `${e5}/${d2}`;
            for (const e6 of ce) {
              const a3 = `${l3};codecs=${e6}`, d3 = `${l3};codecs=${e6.toUpperCase()}`;
              t3(a3) && i2.push(a3), t3(d3) && i2.push(d3);
            }
            t3(l3) && (i2.push(l3), a2.push(l3));
          }
          return { supportedMimeTypes: i2, blobType: a2 };
        }(se), console.log(`Using ${this.options.supportedMimeTypes[0]}`), this.mediaRecorder = new MediaRecorder(this.videoStream, { mimeType: (_a = this.options.supportedMimeTypes) == null ? void 0 : _a[0], videoBitsPerSecond: e4[this.videoQuality] })) : (console.log("Using default codecs for browser"), this.mediaRecorder = new MediaRecorder(this.videoStream, { videoBitsPerSecond: e4[this.videoQuality] })), this.mediaRecorder.start(), this.mediaRecorder.ondataavailable = (e5) => {
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
    this.generateBlob = true, this.resetChunks = false, this.mediaRecorder.stop();
    const e2 = new Promise((e3) => {
      this.mediaRecorder.onstop = () => {
        var _a;
        if (this.generateBlob) {
          const t2 = {};
          for (let e4 = 0; e4 < this.chunks.length; e4++) {
            const i2 = new Blob([this.chunks[e4]], { type: (_a = this.options.blobType) == null ? void 0 : _a[0] }), a2 = window.URL.createObjectURL(i2);
            t2[`videoURL-${e4 + 1}`] = a2;
          }
          this.chunks = [], e3(t2);
        }
      };
    });
    return e2;
  }
  deinitializeEngine() {
    this.engineInitialized ? (console.log("Video recorder engine stopped"), this.mediaRecorder = null, this.engineInitialized = false, this.recording = false) : console.log("Video recorder engine is not initialized");
  }
} };
var oe = class {
  static getAvailableEngines() {
    return Object.keys(re);
  }
  static generateInstance(e2, ...t2) {
    return new re[e2](...t2);
  }
};
var he = null;
var me = class _me {
  static async __checkWorker(e2) {
    if (!_me.worker) {
      let t2 = _me, i2 = new Worker((null === he && (he = URL.createObjectURL(new Blob([window.atob("dmFyIF9fd2VicGFja19leHBvcnRzX18gPSB7fTsKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvUnVudGltZS5qcwoKdmFyIE1vZHVsZSA9IChmdW5jdGlvbigpIHsKICB2YXIgX3NjcmlwdERpciA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdCA/IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjIDogdW5kZWZpbmVkOwogIAogIHJldHVybiAoCmZ1bmN0aW9uKE1vZHVsZSkgewogIE1vZHVsZSA9IE1vZHVsZSB8fCB7fTsKCnZhciBNb2R1bGU9dHlwZW9mIE1vZHVsZSE9PSJ1bmRlZmluZWQiP01vZHVsZTp7fTt2YXIgcmVhZHlQcm9taXNlUmVzb2x2ZSxyZWFkeVByb21pc2VSZWplY3Q7TW9kdWxlWyJyZWFkeSJdPW5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtyZWFkeVByb21pc2VSZXNvbHZlPXJlc29sdmU7cmVhZHlQcm9taXNlUmVqZWN0PXJlamVjdH0pO3ZhciBtb2R1bGVPdmVycmlkZXM9e307dmFyIGtleTtmb3Ioa2V5IGluIE1vZHVsZSl7aWYoTW9kdWxlLmhhc093blByb3BlcnR5KGtleSkpe21vZHVsZU92ZXJyaWRlc1trZXldPU1vZHVsZVtrZXldfX12YXIgYXJndW1lbnRzXz1bXTt2YXIgdGhpc1Byb2dyYW09Ii4vdGhpcy5wcm9ncmFtIjt2YXIgcXVpdF89ZnVuY3Rpb24oc3RhdHVzLHRvVGhyb3cpe3Rocm93IHRvVGhyb3d9O3ZhciBFTlZJUk9OTUVOVF9JU19XRUI9dHJ1ZTt2YXIgRU5WSVJPTk1FTlRfSVNfV09SS0VSPWZhbHNlO3ZhciBzY3JpcHREaXJlY3Rvcnk9IiI7ZnVuY3Rpb24gbG9jYXRlRmlsZShwYXRoKXtpZihNb2R1bGVbImxvY2F0ZUZpbGUiXSl7cmV0dXJuIE1vZHVsZVsibG9jYXRlRmlsZSJdKHBhdGgsc2NyaXB0RGlyZWN0b3J5KX1yZXR1cm4gc2NyaXB0RGlyZWN0b3J5K3BhdGh9dmFyIHJlYWRfLHJlYWRBc3luYyxyZWFkQmluYXJ5LHNldFdpbmRvd1RpdGxlO2lmKEVOVklST05NRU5UX0lTX1dFQnx8RU5WSVJPTk1FTlRfSVNfV09SS0VSKXtpZihFTlZJUk9OTUVOVF9JU19XT1JLRVIpe3NjcmlwdERpcmVjdG9yeT1zZWxmLmxvY2F0aW9uLmhyZWZ9ZWxzZSBpZih0eXBlb2YgZG9jdW1lbnQhPT0idW5kZWZpbmVkIiYmZG9jdW1lbnQuY3VycmVudFNjcmlwdCl7c2NyaXB0RGlyZWN0b3J5PWRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjfWlmKF9zY3JpcHREaXIpe3NjcmlwdERpcmVjdG9yeT1fc2NyaXB0RGlyfWlmKHNjcmlwdERpcmVjdG9yeS5pbmRleE9mKCJibG9iOiIpIT09MCl7c2NyaXB0RGlyZWN0b3J5PXNjcmlwdERpcmVjdG9yeS5zdWJzdHIoMCxzY3JpcHREaXJlY3RvcnkubGFzdEluZGV4T2YoIi8iKSsxKX1lbHNle3NjcmlwdERpcmVjdG9yeT0iIn17cmVhZF89ZnVuY3Rpb24odXJsKXt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5zZW5kKG51bGwpO3JldHVybiB4aHIucmVzcG9uc2VUZXh0fTtpZihFTlZJUk9OTUVOVF9JU19XT1JLRVIpe3JlYWRCaW5hcnk9ZnVuY3Rpb24odXJsKXt2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdDt4aHIub3BlbigiR0VUIix1cmwsZmFsc2UpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIuc2VuZChudWxsKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlKX19cmVhZEFzeW5jPWZ1bmN0aW9uKHVybCxvbmxvYWQsb25lcnJvcil7dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3Q7eGhyLm9wZW4oIkdFVCIsdXJsLHRydWUpO3hoci5yZXNwb25zZVR5cGU9ImFycmF5YnVmZmVyIjt4aHIub25sb2FkPWZ1bmN0aW9uKCl7aWYoeGhyLnN0YXR1cz09MjAwfHx4aHIuc3RhdHVzPT0wJiZ4aHIucmVzcG9uc2Upe29ubG9hZCh4aHIucmVzcG9uc2UpO3JldHVybn1vbmVycm9yKCl9O3hoci5vbmVycm9yPW9uZXJyb3I7eGhyLnNlbmQobnVsbCl9fXNldFdpbmRvd1RpdGxlPWZ1bmN0aW9uKHRpdGxlKXtkb2N1bWVudC50aXRsZT10aXRsZX19ZWxzZXt9dmFyIG91dD1Nb2R1bGVbInByaW50Il18fGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7dmFyIGVycj1Nb2R1bGVbInByaW50RXJyIl18fGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO2ZvcihrZXkgaW4gbW9kdWxlT3ZlcnJpZGVzKXtpZihtb2R1bGVPdmVycmlkZXMuaGFzT3duUHJvcGVydHkoa2V5KSl7TW9kdWxlW2tleV09bW9kdWxlT3ZlcnJpZGVzW2tleV19fW1vZHVsZU92ZXJyaWRlcz1udWxsO2lmKE1vZHVsZVsiYXJndW1lbnRzIl0pYXJndW1lbnRzXz1Nb2R1bGVbImFyZ3VtZW50cyJdO2lmKE1vZHVsZVsidGhpc1Byb2dyYW0iXSl0aGlzUHJvZ3JhbT1Nb2R1bGVbInRoaXNQcm9ncmFtIl07aWYoTW9kdWxlWyJxdWl0Il0pcXVpdF89TW9kdWxlWyJxdWl0Il07dmFyIHRlbXBSZXQwPTA7dmFyIHNldFRlbXBSZXQwPWZ1bmN0aW9uKHZhbHVlKXt0ZW1wUmV0MD12YWx1ZX07dmFyIHdhc21CaW5hcnk7aWYoTW9kdWxlWyJ3YXNtQmluYXJ5Il0pd2FzbUJpbmFyeT1Nb2R1bGVbIndhc21CaW5hcnkiXTt2YXIgbm9FeGl0UnVudGltZT1Nb2R1bGVbIm5vRXhpdFJ1bnRpbWUiXXx8dHJ1ZTtpZih0eXBlb2YgV2ViQXNzZW1ibHkhPT0ib2JqZWN0Iil7YWJvcnQoIm5vIG5hdGl2ZSB3YXNtIHN1cHBvcnQgZGV0ZWN0ZWQiKX12YXIgd2FzbU1lbW9yeTt2YXIgQUJPUlQ9ZmFsc2U7dmFyIEVYSVRTVEFUVVM7ZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbix0ZXh0KXtpZighY29uZGl0aW9uKXthYm9ydCgiQXNzZXJ0aW9uIGZhaWxlZDogIit0ZXh0KX19dmFyIFVURjhEZWNvZGVyPXR5cGVvZiBUZXh0RGVjb2RlciE9PSJ1bmRlZmluZWQiP25ldyBUZXh0RGVjb2RlcigidXRmOCIpOnVuZGVmaW5lZDtmdW5jdGlvbiBVVEY4QXJyYXlUb1N0cmluZyhoZWFwLGlkeCxtYXhCeXRlc1RvUmVhZCl7dmFyIGVuZElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQ7dmFyIGVuZFB0cj1pZHg7d2hpbGUoaGVhcFtlbmRQdHJdJiYhKGVuZFB0cj49ZW5kSWR4KSkrK2VuZFB0cjtpZihlbmRQdHItaWR4PjE2JiZoZWFwLnN1YmFycmF5JiZVVEY4RGVjb2Rlcil7cmV0dXJuIFVURjhEZWNvZGVyLmRlY29kZShoZWFwLnN1YmFycmF5KGlkeCxlbmRQdHIpKX1lbHNle3ZhciBzdHI9IiI7d2hpbGUoaWR4PGVuZFB0cil7dmFyIHUwPWhlYXBbaWR4KytdO2lmKCEodTAmMTI4KSl7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHUwKTtjb250aW51ZX12YXIgdTE9aGVhcFtpZHgrK10mNjM7aWYoKHUwJjIyNCk9PTE5Mil7c3RyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKCh1MCYzMSk8PDZ8dTEpO2NvbnRpbnVlfXZhciB1Mj1oZWFwW2lkeCsrXSY2MztpZigodTAmMjQwKT09MjI0KXt1MD0odTAmMTUpPDwxMnx1MTw8Nnx1Mn1lbHNle3UwPSh1MCY3KTw8MTh8dTE8PDEyfHUyPDw2fGhlYXBbaWR4KytdJjYzfWlmKHUwPDY1NTM2KXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodTApfWVsc2V7dmFyIGNoPXUwLTY1NTM2O3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxjaD4+MTAsNTYzMjB8Y2gmMTAyMyl9fX1yZXR1cm4gc3RyfWZ1bmN0aW9uIFVURjhUb1N0cmluZyhwdHIsbWF4Qnl0ZXNUb1JlYWQpe3JldHVybiBwdHI/VVRGOEFycmF5VG9TdHJpbmcoSEVBUFU4LHB0cixtYXhCeXRlc1RvUmVhZCk6IiJ9ZnVuY3Rpb24gc3RyaW5nVG9VVEY4QXJyYXkoc3RyLGhlYXAsb3V0SWR4LG1heEJ5dGVzVG9Xcml0ZSl7aWYoIShtYXhCeXRlc1RvV3JpdGU+MCkpcmV0dXJuIDA7dmFyIHN0YXJ0SWR4PW91dElkeDt2YXIgZW5kSWR4PW91dElkeCttYXhCeXRlc1RvV3JpdGUtMTtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgdT1zdHIuY2hhckNvZGVBdChpKTtpZih1Pj01NTI5NiYmdTw9NTczNDMpe3ZhciB1MT1zdHIuY2hhckNvZGVBdCgrK2kpO3U9NjU1MzYrKCh1JjEwMjMpPDwxMCl8dTEmMTAyM31pZih1PD0xMjcpe2lmKG91dElkeD49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPXV9ZWxzZSBpZih1PD0yMDQ3KXtpZihvdXRJZHgrMT49ZW5kSWR4KWJyZWFrO2hlYXBbb3V0SWR4KytdPTE5Mnx1Pj42O2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfWVsc2UgaWYodTw9NjU1MzUpe2lmKG91dElkeCsyPj1lbmRJZHgpYnJlYWs7aGVhcFtvdXRJZHgrK109MjI0fHU+PjEyO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfWVsc2V7aWYob3V0SWR4KzM+PWVuZElkeClicmVhaztoZWFwW291dElkeCsrXT0yNDB8dT4+MTg7aGVhcFtvdXRJZHgrK109MTI4fHU+PjEyJjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1Pj42JjYzO2hlYXBbb3V0SWR4KytdPTEyOHx1JjYzfX1oZWFwW291dElkeF09MDtyZXR1cm4gb3V0SWR4LXN0YXJ0SWR4fWZ1bmN0aW9uIHN0cmluZ1RvVVRGOChzdHIsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSl7cmV0dXJuIHN0cmluZ1RvVVRGOEFycmF5KHN0cixIRUFQVTgsb3V0UHRyLG1heEJ5dGVzVG9Xcml0ZSl9ZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEY4KHN0cil7dmFyIGxlbj0wO2Zvcih2YXIgaT0wO2k8c3RyLmxlbmd0aDsrK2kpe3ZhciB1PXN0ci5jaGFyQ29kZUF0KGkpO2lmKHU+PTU1Mjk2JiZ1PD01NzM0Myl1PTY1NTM2KygodSYxMDIzKTw8MTApfHN0ci5jaGFyQ29kZUF0KCsraSkmMTAyMztpZih1PD0xMjcpKytsZW47ZWxzZSBpZih1PD0yMDQ3KWxlbis9MjtlbHNlIGlmKHU8PTY1NTM1KWxlbis9MztlbHNlIGxlbis9NH1yZXR1cm4gbGVufXZhciBVVEYxNkRlY29kZXI9dHlwZW9mIFRleHREZWNvZGVyIT09InVuZGVmaW5lZCI/bmV3IFRleHREZWNvZGVyKCJ1dGYtMTZsZSIpOnVuZGVmaW5lZDtmdW5jdGlvbiBVVEYxNlRvU3RyaW5nKHB0cixtYXhCeXRlc1RvUmVhZCl7dmFyIGVuZFB0cj1wdHI7dmFyIGlkeD1lbmRQdHI+PjE7dmFyIG1heElkeD1pZHgrbWF4Qnl0ZXNUb1JlYWQvMjt3aGlsZSghKGlkeD49bWF4SWR4KSYmSEVBUFUxNltpZHhdKSsraWR4O2VuZFB0cj1pZHg8PDE7aWYoZW5kUHRyLXB0cj4zMiYmVVRGMTZEZWNvZGVyKXtyZXR1cm4gVVRGMTZEZWNvZGVyLmRlY29kZShIRUFQVTguc3ViYXJyYXkocHRyLGVuZFB0cikpfWVsc2V7dmFyIHN0cj0iIjtmb3IodmFyIGk9MDshKGk+PW1heEJ5dGVzVG9SZWFkLzIpOysraSl7dmFyIGNvZGVVbml0PUhFQVAxNltwdHIraSoyPj4xXTtpZihjb2RlVW5pdD09MClicmVhaztzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVVuaXQpfXJldHVybiBzdHJ9fWZ1bmN0aW9uIHN0cmluZ1RvVVRGMTYoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe2lmKG1heEJ5dGVzVG9Xcml0ZT09PXVuZGVmaW5lZCl7bWF4Qnl0ZXNUb1dyaXRlPTIxNDc0ODM2NDd9aWYobWF4Qnl0ZXNUb1dyaXRlPDIpcmV0dXJuIDA7bWF4Qnl0ZXNUb1dyaXRlLT0yO3ZhciBzdGFydFB0cj1vdXRQdHI7dmFyIG51bUNoYXJzVG9Xcml0ZT1tYXhCeXRlc1RvV3JpdGU8c3RyLmxlbmd0aCoyP21heEJ5dGVzVG9Xcml0ZS8yOnN0ci5sZW5ndGg7Zm9yKHZhciBpPTA7aTxudW1DaGFyc1RvV3JpdGU7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7SEVBUDE2W291dFB0cj4+MV09Y29kZVVuaXQ7b3V0UHRyKz0yfUhFQVAxNltvdXRQdHI+PjFdPTA7cmV0dXJuIG91dFB0ci1zdGFydFB0cn1mdW5jdGlvbiBsZW5ndGhCeXRlc1VURjE2KHN0cil7cmV0dXJuIHN0ci5sZW5ndGgqMn1mdW5jdGlvbiBVVEYzMlRvU3RyaW5nKHB0cixtYXhCeXRlc1RvUmVhZCl7dmFyIGk9MDt2YXIgc3RyPSIiO3doaWxlKCEoaT49bWF4Qnl0ZXNUb1JlYWQvNCkpe3ZhciB1dGYzMj1IRUFQMzJbcHRyK2kqND4+Ml07aWYodXRmMzI9PTApYnJlYWs7KytpO2lmKHV0ZjMyPj02NTUzNil7dmFyIGNoPXV0ZjMyLTY1NTM2O3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NnxjaD4+MTAsNTYzMjB8Y2gmMTAyMyl9ZWxzZXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUodXRmMzIpfX1yZXR1cm4gc3RyfWZ1bmN0aW9uIHN0cmluZ1RvVVRGMzIoc3RyLG91dFB0cixtYXhCeXRlc1RvV3JpdGUpe2lmKG1heEJ5dGVzVG9Xcml0ZT09PXVuZGVmaW5lZCl7bWF4Qnl0ZXNUb1dyaXRlPTIxNDc0ODM2NDd9aWYobWF4Qnl0ZXNUb1dyaXRlPDQpcmV0dXJuIDA7dmFyIHN0YXJ0UHRyPW91dFB0cjt2YXIgZW5kUHRyPXN0YXJ0UHRyK21heEJ5dGVzVG9Xcml0ZS00O2Zvcih2YXIgaT0wO2k8c3RyLmxlbmd0aDsrK2kpe3ZhciBjb2RlVW5pdD1zdHIuY2hhckNvZGVBdChpKTtpZihjb2RlVW5pdD49NTUyOTYmJmNvZGVVbml0PD01NzM0Myl7dmFyIHRyYWlsU3Vycm9nYXRlPXN0ci5jaGFyQ29kZUF0KCsraSk7Y29kZVVuaXQ9NjU1MzYrKChjb2RlVW5pdCYxMDIzKTw8MTApfHRyYWlsU3Vycm9nYXRlJjEwMjN9SEVBUDMyW291dFB0cj4+Ml09Y29kZVVuaXQ7b3V0UHRyKz00O2lmKG91dFB0cis0PmVuZFB0cilicmVha31IRUFQMzJbb3V0UHRyPj4yXT0wO3JldHVybiBvdXRQdHItc3RhcnRQdHJ9ZnVuY3Rpb24gbGVuZ3RoQnl0ZXNVVEYzMihzdHIpe3ZhciBsZW49MDtmb3IodmFyIGk9MDtpPHN0ci5sZW5ndGg7KytpKXt2YXIgY29kZVVuaXQ9c3RyLmNoYXJDb2RlQXQoaSk7aWYoY29kZVVuaXQ+PTU1Mjk2JiZjb2RlVW5pdDw9NTczNDMpKytpO2xlbis9NH1yZXR1cm4gbGVufXZhciBidWZmZXIsSEVBUDgsSEVBUFU4LEhFQVAxNixIRUFQVTE2LEhFQVAzMixIRUFQVTMyLEhFQVBGMzIsSEVBUEY2NDtmdW5jdGlvbiB1cGRhdGVHbG9iYWxCdWZmZXJBbmRWaWV3cyhidWYpe2J1ZmZlcj1idWY7TW9kdWxlWyJIRUFQOCJdPUhFQVA4PW5ldyBJbnQ4QXJyYXkoYnVmKTtNb2R1bGVbIkhFQVAxNiJdPUhFQVAxNj1uZXcgSW50MTZBcnJheShidWYpO01vZHVsZVsiSEVBUDMyIl09SEVBUDMyPW5ldyBJbnQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQVTgiXT1IRUFQVTg9bmV3IFVpbnQ4QXJyYXkoYnVmKTtNb2R1bGVbIkhFQVBVMTYiXT1IRUFQVTE2PW5ldyBVaW50MTZBcnJheShidWYpO01vZHVsZVsiSEVBUFUzMiJdPUhFQVBVMzI9bmV3IFVpbnQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQRjMyIl09SEVBUEYzMj1uZXcgRmxvYXQzMkFycmF5KGJ1Zik7TW9kdWxlWyJIRUFQRjY0Il09SEVBUEY2ND1uZXcgRmxvYXQ2NEFycmF5KGJ1Zil9dmFyIElOSVRJQUxfTUVNT1JZPU1vZHVsZVsiSU5JVElBTF9NRU1PUlkiXXx8ODM4ODYwODt2YXIgd2FzbVRhYmxlO3ZhciBfX0FUUFJFUlVOX189W107dmFyIF9fQVRJTklUX189W107dmFyIF9fQVRNQUlOX189W107dmFyIF9fQVRQT1NUUlVOX189W107dmFyIHJ1bnRpbWVJbml0aWFsaXplZD1mYWxzZTtfX0FUSU5JVF9fLnB1c2goe2Z1bmM6ZnVuY3Rpb24oKXtfX193YXNtX2NhbGxfY3RvcnMoKX19KTtmdW5jdGlvbiBwcmVSdW4oKXtpZihNb2R1bGVbInByZVJ1biJdKXtpZih0eXBlb2YgTW9kdWxlWyJwcmVSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInByZVJ1biJdPVtNb2R1bGVbInByZVJ1biJdXTt3aGlsZShNb2R1bGVbInByZVJ1biJdLmxlbmd0aCl7YWRkT25QcmVSdW4oTW9kdWxlWyJwcmVSdW4iXS5zaGlmdCgpKX19Y2FsbFJ1bnRpbWVDYWxsYmFja3MoX19BVFBSRVJVTl9fKX1mdW5jdGlvbiBpbml0UnVudGltZSgpe3J1bnRpbWVJbml0aWFsaXplZD10cnVlO2NhbGxSdW50aW1lQ2FsbGJhY2tzKF9fQVRJTklUX18pfWZ1bmN0aW9uIHByZU1haW4oKXtjYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUTUFJTl9fKX1mdW5jdGlvbiBwb3N0UnVuKCl7aWYoTW9kdWxlWyJwb3N0UnVuIl0pe2lmKHR5cGVvZiBNb2R1bGVbInBvc3RSdW4iXT09ImZ1bmN0aW9uIilNb2R1bGVbInBvc3RSdW4iXT1bTW9kdWxlWyJwb3N0UnVuIl1dO3doaWxlKE1vZHVsZVsicG9zdFJ1biJdLmxlbmd0aCl7YWRkT25Qb3N0UnVuKE1vZHVsZVsicG9zdFJ1biJdLnNoaWZ0KCkpfX1jYWxsUnVudGltZUNhbGxiYWNrcyhfX0FUUE9TVFJVTl9fKX1mdW5jdGlvbiBhZGRPblByZVJ1bihjYil7X19BVFBSRVJVTl9fLnVuc2hpZnQoY2IpfWZ1bmN0aW9uIGFkZE9uUG9zdFJ1bihjYil7X19BVFBPU1RSVU5fXy51bnNoaWZ0KGNiKX12YXIgcnVuRGVwZW5kZW5jaWVzPTA7dmFyIHJ1bkRlcGVuZGVuY3lXYXRjaGVyPW51bGw7dmFyIGRlcGVuZGVuY2llc0Z1bGZpbGxlZD1udWxsO2Z1bmN0aW9uIGFkZFJ1bkRlcGVuZGVuY3koaWQpe3J1bkRlcGVuZGVuY2llcysrO2lmKE1vZHVsZVsibW9uaXRvclJ1bkRlcGVuZGVuY2llcyJdKXtNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXShydW5EZXBlbmRlbmNpZXMpfX1mdW5jdGlvbiByZW1vdmVSdW5EZXBlbmRlbmN5KGlkKXtydW5EZXBlbmRlbmNpZXMtLTtpZihNb2R1bGVbIm1vbml0b3JSdW5EZXBlbmRlbmNpZXMiXSl7TW9kdWxlWyJtb25pdG9yUnVuRGVwZW5kZW5jaWVzIl0ocnVuRGVwZW5kZW5jaWVzKX1pZihydW5EZXBlbmRlbmNpZXM9PTApe2lmKHJ1bkRlcGVuZGVuY3lXYXRjaGVyIT09bnVsbCl7Y2xlYXJJbnRlcnZhbChydW5EZXBlbmRlbmN5V2F0Y2hlcik7cnVuRGVwZW5kZW5jeVdhdGNoZXI9bnVsbH1pZihkZXBlbmRlbmNpZXNGdWxmaWxsZWQpe3ZhciBjYWxsYmFjaz1kZXBlbmRlbmNpZXNGdWxmaWxsZWQ7ZGVwZW5kZW5jaWVzRnVsZmlsbGVkPW51bGw7Y2FsbGJhY2soKX19fU1vZHVsZVsicHJlbG9hZGVkSW1hZ2VzIl09e307TW9kdWxlWyJwcmVsb2FkZWRBdWRpb3MiXT17fTtmdW5jdGlvbiBhYm9ydCh3aGF0KXtpZihNb2R1bGVbIm9uQWJvcnQiXSl7TW9kdWxlWyJvbkFib3J0Il0od2hhdCl9d2hhdCs9IiI7ZXJyKHdoYXQpO0FCT1JUPXRydWU7RVhJVFNUQVRVUz0xO3doYXQ9ImFib3J0KCIrd2hhdCsiKS4gQnVpbGQgd2l0aCAtcyBBU1NFUlRJT05TPTEgZm9yIG1vcmUgaW5mby4iO3ZhciBlPW5ldyBXZWJBc3NlbWJseS5SdW50aW1lRXJyb3Iod2hhdCk7cmVhZHlQcm9taXNlUmVqZWN0KGUpO3Rocm93IGV9ZnVuY3Rpb24gaGFzUHJlZml4KHN0cixwcmVmaXgpe3JldHVybiBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGg/c3RyLnN0YXJ0c1dpdGgocHJlZml4KTpzdHIuaW5kZXhPZihwcmVmaXgpPT09MH12YXIgZGF0YVVSSVByZWZpeD0iZGF0YTphcHBsaWNhdGlvbi9vY3RldC1zdHJlYW07YmFzZTY0LCI7ZnVuY3Rpb24gaXNEYXRhVVJJKGZpbGVuYW1lKXtyZXR1cm4gaGFzUHJlZml4KGZpbGVuYW1lLGRhdGFVUklQcmVmaXgpfXZhciB3YXNtQmluYXJ5RmlsZT0iRkJUb2tlbml6ZXIud2FzbSI7aWYoIWlzRGF0YVVSSSh3YXNtQmluYXJ5RmlsZSkpe3dhc21CaW5hcnlGaWxlPWxvY2F0ZUZpbGUod2FzbUJpbmFyeUZpbGUpfWZ1bmN0aW9uIGdldEJpbmFyeShmaWxlKXt0cnl7aWYoZmlsZT09d2FzbUJpbmFyeUZpbGUmJndhc21CaW5hcnkpe3JldHVybiBuZXcgVWludDhBcnJheSh3YXNtQmluYXJ5KX1pZihyZWFkQmluYXJ5KXtyZXR1cm4gcmVhZEJpbmFyeShmaWxlKX1lbHNle3Rocm93InN5bmMgZmV0Y2hpbmcgb2YgdGhlIHdhc20gZmFpbGVkOiB5b3UgY2FuIHByZWxvYWQgaXQgdG8gTW9kdWxlWyd3YXNtQmluYXJ5J10gbWFudWFsbHksIG9yIGVtY2MucHkgd2lsbCBkbyB0aGF0IGZvciB5b3Ugd2hlbiBnZW5lcmF0aW5nIEhUTUwgKGJ1dCBub3QgSlMpIn19Y2F0Y2goZXJyKXthYm9ydChlcnIpfX1mdW5jdGlvbiBpbnN0YW50aWF0ZVN5bmMoZmlsZSxpbmZvKXt2YXIgaW5zdGFuY2U7dmFyIG1vZHVsZTt2YXIgYmluYXJ5O3RyeXtiaW5hcnk9Z2V0QmluYXJ5KGZpbGUpO21vZHVsZT1uZXcgV2ViQXNzZW1ibHkuTW9kdWxlKGJpbmFyeSk7aW5zdGFuY2U9bmV3IFdlYkFzc2VtYmx5Lkluc3RhbmNlKG1vZHVsZSxpbmZvKX1jYXRjaChlKXt2YXIgc3RyPWUudG9TdHJpbmcoKTtlcnIoImZhaWxlZCB0byBjb21waWxlIHdhc20gbW9kdWxlOiAiK3N0cik7aWYoc3RyLmluZGV4T2YoImltcG9ydGVkIE1lbW9yeSIpPj0wfHxzdHIuaW5kZXhPZigibWVtb3J5IGltcG9ydCIpPj0wKXtlcnIoIk1lbW9yeSBzaXplIGluY29tcGF0aWJpbGl0eSBpc3N1ZXMgbWF5IGJlIGR1ZSB0byBjaGFuZ2luZyBJTklUSUFMX01FTU9SWSBhdCBydW50aW1lIHRvIHNvbWV0aGluZyB0b28gbGFyZ2UuIFVzZSBBTExPV19NRU1PUllfR1JPV1RIIHRvIGFsbG93IGFueSBzaXplIG1lbW9yeSAoYW5kIGFsc28gbWFrZSBzdXJlIG5vdCB0byBzZXQgSU5JVElBTF9NRU1PUlkgYXQgcnVudGltZSB0byBzb21ldGhpbmcgc21hbGxlciB0aGFuIGl0IHdhcyBhdCBjb21waWxlIHRpbWUpLiIpfXRocm93IGV9cmV0dXJuW2luc3RhbmNlLG1vZHVsZV19ZnVuY3Rpb24gY3JlYXRlV2FzbSgpe3ZhciBpbmZvPXsiYSI6YXNtTGlicmFyeUFyZ307ZnVuY3Rpb24gcmVjZWl2ZUluc3RhbmNlKGluc3RhbmNlLG1vZHVsZSl7dmFyIGV4cG9ydHM9aW5zdGFuY2UuZXhwb3J0cztNb2R1bGVbImFzbSJdPWV4cG9ydHM7d2FzbU1lbW9yeT1Nb2R1bGVbImFzbSJdWyJCIl07dXBkYXRlR2xvYmFsQnVmZmVyQW5kVmlld3Mod2FzbU1lbW9yeS5idWZmZXIpO3dhc21UYWJsZT1Nb2R1bGVbImFzbSJdWyJFIl07cmVtb3ZlUnVuRGVwZW5kZW5jeSgid2FzbS1pbnN0YW50aWF0ZSIpfWFkZFJ1bkRlcGVuZGVuY3koIndhc20taW5zdGFudGlhdGUiKTtpZihNb2R1bGVbImluc3RhbnRpYXRlV2FzbSJdKXt0cnl7dmFyIGV4cG9ydHM9TW9kdWxlWyJpbnN0YW50aWF0ZVdhc20iXShpbmZvLHJlY2VpdmVJbnN0YW5jZSk7cmV0dXJuIGV4cG9ydHN9Y2F0Y2goZSl7ZXJyKCJNb2R1bGUuaW5zdGFudGlhdGVXYXNtIGNhbGxiYWNrIGZhaWxlZCB3aXRoIGVycm9yOiAiK2UpO3JldHVybiBmYWxzZX19dmFyIHJlc3VsdD1pbnN0YW50aWF0ZVN5bmMod2FzbUJpbmFyeUZpbGUsaW5mbyk7cmVjZWl2ZUluc3RhbmNlKHJlc3VsdFswXSxyZXN1bHRbMV0pO3JldHVybiBNb2R1bGVbImFzbSJdfWZ1bmN0aW9uIGNhbGxSdW50aW1lQ2FsbGJhY2tzKGNhbGxiYWNrcyl7d2hpbGUoY2FsbGJhY2tzLmxlbmd0aD4wKXt2YXIgY2FsbGJhY2s9Y2FsbGJhY2tzLnNoaWZ0KCk7aWYodHlwZW9mIGNhbGxiYWNrPT0iZnVuY3Rpb24iKXtjYWxsYmFjayhNb2R1bGUpO2NvbnRpbnVlfXZhciBmdW5jPWNhbGxiYWNrLmZ1bmM7aWYodHlwZW9mIGZ1bmM9PT0ibnVtYmVyIil7aWYoY2FsbGJhY2suYXJnPT09dW5kZWZpbmVkKXt3YXNtVGFibGUuZ2V0KGZ1bmMpKCl9ZWxzZXt3YXNtVGFibGUuZ2V0KGZ1bmMpKGNhbGxiYWNrLmFyZyl9fWVsc2V7ZnVuYyhjYWxsYmFjay5hcmc9PT11bmRlZmluZWQ/bnVsbDpjYWxsYmFjay5hcmcpfX19dmFyIEV4Y2VwdGlvbkluZm9BdHRycz17REVTVFJVQ1RPUl9PRkZTRVQ6MCxSRUZDT1VOVF9PRkZTRVQ6NCxUWVBFX09GRlNFVDo4LENBVUdIVF9PRkZTRVQ6MTIsUkVUSFJPV05fT0ZGU0VUOjEzLFNJWkU6MTZ9O2Z1bmN0aW9uIF9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24oc2l6ZSl7cmV0dXJuIF9tYWxsb2Moc2l6ZStFeGNlcHRpb25JbmZvQXR0cnMuU0laRSkrRXhjZXB0aW9uSW5mb0F0dHJzLlNJWkV9ZnVuY3Rpb24gRXhjZXB0aW9uSW5mbyhleGNQdHIpe3RoaXMuZXhjUHRyPWV4Y1B0cjt0aGlzLnB0cj1leGNQdHItRXhjZXB0aW9uSW5mb0F0dHJzLlNJWkU7dGhpcy5zZXRfdHlwZT1mdW5jdGlvbih0eXBlKXtIRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlRZUEVfT0ZGU0VUPj4yXT10eXBlfTt0aGlzLmdldF90eXBlPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVAzMlt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuVFlQRV9PRkZTRVQ+PjJdfTt0aGlzLnNldF9kZXN0cnVjdG9yPWZ1bmN0aW9uKGRlc3RydWN0b3Ipe0hFQVAzMlt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuREVTVFJVQ1RPUl9PRkZTRVQ+PjJdPWRlc3RydWN0b3J9O3RoaXMuZ2V0X2Rlc3RydWN0b3I9ZnVuY3Rpb24oKXtyZXR1cm4gSEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5ERVNUUlVDVE9SX09GRlNFVD4+Ml19O3RoaXMuc2V0X3JlZmNvdW50PWZ1bmN0aW9uKHJlZmNvdW50KXtIRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml09cmVmY291bnR9O3RoaXMuc2V0X2NhdWdodD1mdW5jdGlvbihjYXVnaHQpe2NhdWdodD1jYXVnaHQ/MTowO0hFQVA4W3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5DQVVHSFRfT0ZGU0VUPj4wXT1jYXVnaHR9O3RoaXMuZ2V0X2NhdWdodD1mdW5jdGlvbigpe3JldHVybiBIRUFQOFt0aGlzLnB0citFeGNlcHRpb25JbmZvQXR0cnMuQ0FVR0hUX09GRlNFVD4+MF0hPTB9O3RoaXMuc2V0X3JldGhyb3duPWZ1bmN0aW9uKHJldGhyb3duKXtyZXRocm93bj1yZXRocm93bj8xOjA7SEVBUDhbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFVEhST1dOX09GRlNFVD4+MF09cmV0aHJvd259O3RoaXMuZ2V0X3JldGhyb3duPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVA4W3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRVRIUk9XTl9PRkZTRVQ+PjBdIT0wfTt0aGlzLmluaXQ9ZnVuY3Rpb24odHlwZSxkZXN0cnVjdG9yKXt0aGlzLnNldF90eXBlKHR5cGUpO3RoaXMuc2V0X2Rlc3RydWN0b3IoZGVzdHJ1Y3Rvcik7dGhpcy5zZXRfcmVmY291bnQoMCk7dGhpcy5zZXRfY2F1Z2h0KGZhbHNlKTt0aGlzLnNldF9yZXRocm93bihmYWxzZSl9O3RoaXMuYWRkX3JlZj1mdW5jdGlvbigpe3ZhciB2YWx1ZT1IRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml07SEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRUZDT1VOVF9PRkZTRVQ+PjJdPXZhbHVlKzF9O3RoaXMucmVsZWFzZV9yZWY9ZnVuY3Rpb24oKXt2YXIgcHJldj1IRUFQMzJbdGhpcy5wdHIrRXhjZXB0aW9uSW5mb0F0dHJzLlJFRkNPVU5UX09GRlNFVD4+Ml07SEVBUDMyW3RoaXMucHRyK0V4Y2VwdGlvbkluZm9BdHRycy5SRUZDT1VOVF9PRkZTRVQ+PjJdPXByZXYtMTtyZXR1cm4gcHJldj09PTF9fXZhciBleGNlcHRpb25MYXN0PTA7dmFyIHVuY2F1Z2h0RXhjZXB0aW9uQ291bnQ9MDtmdW5jdGlvbiBfX19jeGFfdGhyb3cocHRyLHR5cGUsZGVzdHJ1Y3Rvcil7dmFyIGluZm89bmV3IEV4Y2VwdGlvbkluZm8ocHRyKTtpbmZvLmluaXQodHlwZSxkZXN0cnVjdG9yKTtleGNlcHRpb25MYXN0PXB0cjt1bmNhdWdodEV4Y2VwdGlvbkNvdW50Kys7dGhyb3cgcHRyfWZ1bmN0aW9uIGdldFNoaWZ0RnJvbVNpemUoc2l6ZSl7c3dpdGNoKHNpemUpe2Nhc2UgMTpyZXR1cm4gMDtjYXNlIDI6cmV0dXJuIDE7Y2FzZSA0OnJldHVybiAyO2Nhc2UgODpyZXR1cm4gMztkZWZhdWx0OnRocm93IG5ldyBUeXBlRXJyb3IoIlVua25vd24gdHlwZSBzaXplOiAiK3NpemUpfX1mdW5jdGlvbiBlbWJpbmRfaW5pdF9jaGFyQ29kZXMoKXt2YXIgY29kZXM9bmV3IEFycmF5KDI1Nik7Zm9yKHZhciBpPTA7aTwyNTY7KytpKXtjb2Rlc1tpXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGkpfWVtYmluZF9jaGFyQ29kZXM9Y29kZXN9dmFyIGVtYmluZF9jaGFyQ29kZXM9dW5kZWZpbmVkO2Z1bmN0aW9uIHJlYWRMYXRpbjFTdHJpbmcocHRyKXt2YXIgcmV0PSIiO3ZhciBjPXB0cjt3aGlsZShIRUFQVThbY10pe3JldCs9ZW1iaW5kX2NoYXJDb2Rlc1tIRUFQVThbYysrXV19cmV0dXJuIHJldH12YXIgYXdhaXRpbmdEZXBlbmRlbmNpZXM9e307dmFyIHJlZ2lzdGVyZWRUeXBlcz17fTt2YXIgdHlwZURlcGVuZGVuY2llcz17fTt2YXIgY2hhcl8wPTQ4O3ZhciBjaGFyXzk9NTc7ZnVuY3Rpb24gbWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpe2lmKHVuZGVmaW5lZD09PW5hbWUpe3JldHVybiJfdW5rbm93biJ9bmFtZT1uYW1lLnJlcGxhY2UoL1teYS16QS1aMC05X10vZywiJCIpO3ZhciBmPW5hbWUuY2hhckNvZGVBdCgwKTtpZihmPj1jaGFyXzAmJmY8PWNoYXJfOSl7cmV0dXJuIl8iK25hbWV9ZWxzZXtyZXR1cm4gbmFtZX19ZnVuY3Rpb24gY3JlYXRlTmFtZWRGdW5jdGlvbihuYW1lLGJvZHkpe25hbWU9bWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpO3JldHVybiBuZXcgRnVuY3Rpb24oImJvZHkiLCJyZXR1cm4gZnVuY3Rpb24gIituYW1lKyIoKSB7XG4iKycgICAgInVzZSBzdHJpY3QiOycrIiAgICByZXR1cm4gYm9keS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuIisifTtcbiIpKGJvZHkpfWZ1bmN0aW9uIGV4dGVuZEVycm9yKGJhc2VFcnJvclR5cGUsZXJyb3JOYW1lKXt2YXIgZXJyb3JDbGFzcz1jcmVhdGVOYW1lZEZ1bmN0aW9uKGVycm9yTmFtZSxmdW5jdGlvbihtZXNzYWdlKXt0aGlzLm5hbWU9ZXJyb3JOYW1lO3RoaXMubWVzc2FnZT1tZXNzYWdlO3ZhciBzdGFjaz1uZXcgRXJyb3IobWVzc2FnZSkuc3RhY2s7aWYoc3RhY2shPT11bmRlZmluZWQpe3RoaXMuc3RhY2s9dGhpcy50b1N0cmluZygpKyJcbiIrc3RhY2sucmVwbGFjZSgvXkVycm9yKDpbXlxuXSopP1xuLywiIil9fSk7ZXJyb3JDbGFzcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiYXNlRXJyb3JUeXBlLnByb3RvdHlwZSk7ZXJyb3JDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3I9ZXJyb3JDbGFzcztlcnJvckNsYXNzLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe2lmKHRoaXMubWVzc2FnZT09PXVuZGVmaW5lZCl7cmV0dXJuIHRoaXMubmFtZX1lbHNle3JldHVybiB0aGlzLm5hbWUrIjogIit0aGlzLm1lc3NhZ2V9fTtyZXR1cm4gZXJyb3JDbGFzc312YXIgQmluZGluZ0Vycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiB0aHJvd0JpbmRpbmdFcnJvcihtZXNzYWdlKXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKG1lc3NhZ2UpfXZhciBJbnRlcm5hbEVycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiB0aHJvd0ludGVybmFsRXJyb3IobWVzc2FnZSl7dGhyb3cgbmV3IEludGVybmFsRXJyb3IobWVzc2FnZSl9ZnVuY3Rpb24gd2hlbkRlcGVuZGVudFR5cGVzQXJlUmVzb2x2ZWQobXlUeXBlcyxkZXBlbmRlbnRUeXBlcyxnZXRUeXBlQ29udmVydGVycyl7bXlUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUpe3R5cGVEZXBlbmRlbmNpZXNbdHlwZV09ZGVwZW5kZW50VHlwZXN9KTtmdW5jdGlvbiBvbkNvbXBsZXRlKHR5cGVDb252ZXJ0ZXJzKXt2YXIgbXlUeXBlQ29udmVydGVycz1nZXRUeXBlQ29udmVydGVycyh0eXBlQ29udmVydGVycyk7aWYobXlUeXBlQ29udmVydGVycy5sZW5ndGghPT1teVR5cGVzLmxlbmd0aCl7dGhyb3dJbnRlcm5hbEVycm9yKCJNaXNtYXRjaGVkIHR5cGUgY29udmVydGVyIGNvdW50Iil9Zm9yKHZhciBpPTA7aTxteVR5cGVzLmxlbmd0aDsrK2kpe3JlZ2lzdGVyVHlwZShteVR5cGVzW2ldLG15VHlwZUNvbnZlcnRlcnNbaV0pfX12YXIgdHlwZUNvbnZlcnRlcnM9bmV3IEFycmF5KGRlcGVuZGVudFR5cGVzLmxlbmd0aCk7dmFyIHVucmVnaXN0ZXJlZFR5cGVzPVtdO3ZhciByZWdpc3RlcmVkPTA7ZGVwZW5kZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihkdCxpKXtpZihyZWdpc3RlcmVkVHlwZXMuaGFzT3duUHJvcGVydHkoZHQpKXt0eXBlQ29udmVydGVyc1tpXT1yZWdpc3RlcmVkVHlwZXNbZHRdfWVsc2V7dW5yZWdpc3RlcmVkVHlwZXMucHVzaChkdCk7aWYoIWF3YWl0aW5nRGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KGR0KSl7YXdhaXRpbmdEZXBlbmRlbmNpZXNbZHRdPVtdfWF3YWl0aW5nRGVwZW5kZW5jaWVzW2R0XS5wdXNoKGZ1bmN0aW9uKCl7dHlwZUNvbnZlcnRlcnNbaV09cmVnaXN0ZXJlZFR5cGVzW2R0XTsrK3JlZ2lzdGVyZWQ7aWYocmVnaXN0ZXJlZD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fSl9fSk7aWYoMD09PXVucmVnaXN0ZXJlZFR5cGVzLmxlbmd0aCl7b25Db21wbGV0ZSh0eXBlQ29udmVydGVycyl9fWZ1bmN0aW9uIHJlZ2lzdGVyVHlwZShyYXdUeXBlLHJlZ2lzdGVyZWRJbnN0YW5jZSxvcHRpb25zKXtvcHRpb25zPW9wdGlvbnN8fHt9O2lmKCEoImFyZ1BhY2tBZHZhbmNlImluIHJlZ2lzdGVyZWRJbnN0YW5jZSkpe3Rocm93IG5ldyBUeXBlRXJyb3IoInJlZ2lzdGVyVHlwZSByZWdpc3RlcmVkSW5zdGFuY2UgcmVxdWlyZXMgYXJnUGFja0FkdmFuY2UiKX12YXIgbmFtZT1yZWdpc3RlcmVkSW5zdGFuY2UubmFtZTtpZighcmF3VHlwZSl7dGhyb3dCaW5kaW5nRXJyb3IoJ3R5cGUgIicrbmFtZSsnIiBtdXN0IGhhdmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIHR5cGVpZCBwb2ludGVyJyl9aWYocmVnaXN0ZXJlZFR5cGVzLmhhc093blByb3BlcnR5KHJhd1R5cGUpKXtpZihvcHRpb25zLmlnbm9yZUR1cGxpY2F0ZVJlZ2lzdHJhdGlvbnMpe3JldHVybn1lbHNle3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcmVnaXN0ZXIgdHlwZSAnIituYW1lKyInIHR3aWNlIil9fXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXT1yZWdpc3RlcmVkSW5zdGFuY2U7ZGVsZXRlIHR5cGVEZXBlbmRlbmNpZXNbcmF3VHlwZV07aWYoYXdhaXRpbmdEZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkocmF3VHlwZSkpe3ZhciBjYWxsYmFja3M9YXdhaXRpbmdEZXBlbmRlbmNpZXNbcmF3VHlwZV07ZGVsZXRlIGF3YWl0aW5nRGVwZW5kZW5jaWVzW3Jhd1R5cGVdO2NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNiKXtjYigpfSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2Jvb2wocmF3VHlwZSxuYW1lLHNpemUsdHJ1ZVZhbHVlLGZhbHNlVmFsdWUpe3ZhciBzaGlmdD1nZXRTaGlmdEZyb21TaXplKHNpemUpO25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtyZWdpc3RlclR5cGUocmF3VHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZ1bmN0aW9uKHd0KXtyZXR1cm4hIXd0fSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIG8/dHJ1ZVZhbHVlOmZhbHNlVmFsdWV9LCJhcmdQYWNrQWR2YW5jZSI6OCwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwO2lmKHNpemU9PT0xKXtoZWFwPUhFQVA4fWVsc2UgaWYoc2l6ZT09PTIpe2hlYXA9SEVBUDE2fWVsc2UgaWYoc2l6ZT09PTQpe2hlYXA9SEVBUDMyfWVsc2V7dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBib29sZWFuIHR5cGUgc2l6ZTogIituYW1lKX1yZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oaGVhcFtwb2ludGVyPj5zaGlmdF0pfSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIENsYXNzSGFuZGxlX2lzQWxpYXNPZihvdGhlcil7aWYoISh0aGlzIGluc3RhbmNlb2YgQ2xhc3NIYW5kbGUpKXtyZXR1cm4gZmFsc2V9aWYoIShvdGhlciBpbnN0YW5jZW9mIENsYXNzSGFuZGxlKSl7cmV0dXJuIGZhbHNlfXZhciBsZWZ0Q2xhc3M9dGhpcy4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgbGVmdD10aGlzLiQkLnB0cjt2YXIgcmlnaHRDbGFzcz1vdGhlci4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcmlnaHQ9b3RoZXIuJCQucHRyO3doaWxlKGxlZnRDbGFzcy5iYXNlQ2xhc3Mpe2xlZnQ9bGVmdENsYXNzLnVwY2FzdChsZWZ0KTtsZWZ0Q2xhc3M9bGVmdENsYXNzLmJhc2VDbGFzc313aGlsZShyaWdodENsYXNzLmJhc2VDbGFzcyl7cmlnaHQ9cmlnaHRDbGFzcy51cGNhc3QocmlnaHQpO3JpZ2h0Q2xhc3M9cmlnaHRDbGFzcy5iYXNlQ2xhc3N9cmV0dXJuIGxlZnRDbGFzcz09PXJpZ2h0Q2xhc3MmJmxlZnQ9PT1yaWdodH1mdW5jdGlvbiBzaGFsbG93Q29weUludGVybmFsUG9pbnRlcihvKXtyZXR1cm57Y291bnQ6by5jb3VudCxkZWxldGVTY2hlZHVsZWQ6by5kZWxldGVTY2hlZHVsZWQscHJlc2VydmVQb2ludGVyT25EZWxldGU6by5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSxwdHI6by5wdHIscHRyVHlwZTpvLnB0clR5cGUsc21hcnRQdHI6by5zbWFydFB0cixzbWFydFB0clR5cGU6by5zbWFydFB0clR5cGV9fWZ1bmN0aW9uIHRocm93SW5zdGFuY2VBbHJlYWR5RGVsZXRlZChvYmope2Z1bmN0aW9uIGdldEluc3RhbmNlVHlwZU5hbWUoaGFuZGxlKXtyZXR1cm4gaGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzLm5hbWV9dGhyb3dCaW5kaW5nRXJyb3IoZ2V0SW5zdGFuY2VUeXBlTmFtZShvYmopKyIgaW5zdGFuY2UgYWxyZWFkeSBkZWxldGVkIil9dmFyIGZpbmFsaXphdGlvbkdyb3VwPWZhbHNlO2Z1bmN0aW9uIGRldGFjaEZpbmFsaXplcihoYW5kbGUpe31mdW5jdGlvbiBydW5EZXN0cnVjdG9yKCQkKXtpZigkJC5zbWFydFB0cil7JCQuc21hcnRQdHJUeXBlLnJhd0Rlc3RydWN0b3IoJCQuc21hcnRQdHIpfWVsc2V7JCQucHRyVHlwZS5yZWdpc3RlcmVkQ2xhc3MucmF3RGVzdHJ1Y3RvcigkJC5wdHIpfX1mdW5jdGlvbiByZWxlYXNlQ2xhc3NIYW5kbGUoJCQpeyQkLmNvdW50LnZhbHVlLT0xO3ZhciB0b0RlbGV0ZT0wPT09JCQuY291bnQudmFsdWU7aWYodG9EZWxldGUpe3J1bkRlc3RydWN0b3IoJCQpfX1mdW5jdGlvbiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKXtpZigidW5kZWZpbmVkIj09PXR5cGVvZiBGaW5hbGl6YXRpb25Hcm91cCl7YXR0YWNoRmluYWxpemVyPWZ1bmN0aW9uKGhhbmRsZSl7cmV0dXJuIGhhbmRsZX07cmV0dXJuIGhhbmRsZX1maW5hbGl6YXRpb25Hcm91cD1uZXcgRmluYWxpemF0aW9uR3JvdXAoZnVuY3Rpb24oaXRlcil7Zm9yKHZhciByZXN1bHQ9aXRlci5uZXh0KCk7IXJlc3VsdC5kb25lO3Jlc3VsdD1pdGVyLm5leHQoKSl7dmFyICQkPXJlc3VsdC52YWx1ZTtpZighJCQucHRyKXtjb25zb2xlLndhcm4oIm9iamVjdCBhbHJlYWR5IGRlbGV0ZWQ6ICIrJCQucHRyKX1lbHNle3JlbGVhc2VDbGFzc0hhbmRsZSgkJCl9fX0pO2F0dGFjaEZpbmFsaXplcj1mdW5jdGlvbihoYW5kbGUpe2ZpbmFsaXphdGlvbkdyb3VwLnJlZ2lzdGVyKGhhbmRsZSxoYW5kbGUuJCQsaGFuZGxlLiQkKTtyZXR1cm4gaGFuZGxlfTtkZXRhY2hGaW5hbGl6ZXI9ZnVuY3Rpb24oaGFuZGxlKXtmaW5hbGl6YXRpb25Hcm91cC51bnJlZ2lzdGVyKGhhbmRsZS4kJCl9O3JldHVybiBhdHRhY2hGaW5hbGl6ZXIoaGFuZGxlKX1mdW5jdGlvbiBDbGFzc0hhbmRsZV9jbG9uZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQucHJlc2VydmVQb2ludGVyT25EZWxldGUpe3RoaXMuJCQuY291bnQudmFsdWUrPTE7cmV0dXJuIHRoaXN9ZWxzZXt2YXIgY2xvbmU9YXR0YWNoRmluYWxpemVyKE9iamVjdC5jcmVhdGUoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLHskJDp7dmFsdWU6c2hhbGxvd0NvcHlJbnRlcm5hbFBvaW50ZXIodGhpcy4kJCl9fSkpO2Nsb25lLiQkLmNvdW50LnZhbHVlKz0xO2Nsb25lLiQkLmRlbGV0ZVNjaGVkdWxlZD1mYWxzZTtyZXR1cm4gY2xvbmV9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZSgpe2lmKCF0aGlzLiQkLnB0cil7dGhyb3dJbnN0YW5jZUFscmVhZHlEZWxldGVkKHRoaXMpfWlmKHRoaXMuJCQuZGVsZXRlU2NoZWR1bGVkJiYhdGhpcy4kJC5wcmVzZXJ2ZVBvaW50ZXJPbkRlbGV0ZSl7dGhyb3dCaW5kaW5nRXJyb3IoIk9iamVjdCBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgZGVsZXRpb24iKX1kZXRhY2hGaW5hbGl6ZXIodGhpcyk7cmVsZWFzZUNsYXNzSGFuZGxlKHRoaXMuJCQpO2lmKCF0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlKXt0aGlzLiQkLnNtYXJ0UHRyPXVuZGVmaW5lZDt0aGlzLiQkLnB0cj11bmRlZmluZWR9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2lzRGVsZXRlZCgpe3JldHVybiF0aGlzLiQkLnB0cn12YXIgZGVsYXlGdW5jdGlvbj11bmRlZmluZWQ7dmFyIGRlbGV0aW9uUXVldWU9W107ZnVuY3Rpb24gZmx1c2hQZW5kaW5nRGVsZXRlcygpe3doaWxlKGRlbGV0aW9uUXVldWUubGVuZ3RoKXt2YXIgb2JqPWRlbGV0aW9uUXVldWUucG9wKCk7b2JqLiQkLmRlbGV0ZVNjaGVkdWxlZD1mYWxzZTtvYmpbImRlbGV0ZSJdKCl9fWZ1bmN0aW9uIENsYXNzSGFuZGxlX2RlbGV0ZUxhdGVyKCl7aWYoIXRoaXMuJCQucHRyKXt0aHJvd0luc3RhbmNlQWxyZWFkeURlbGV0ZWQodGhpcyl9aWYodGhpcy4kJC5kZWxldGVTY2hlZHVsZWQmJiF0aGlzLiQkLnByZXNlcnZlUG9pbnRlck9uRGVsZXRlKXt0aHJvd0JpbmRpbmdFcnJvcigiT2JqZWN0IGFscmVhZHkgc2NoZWR1bGVkIGZvciBkZWxldGlvbiIpfWRlbGV0aW9uUXVldWUucHVzaCh0aGlzKTtpZihkZWxldGlvblF1ZXVlLmxlbmd0aD09PTEmJmRlbGF5RnVuY3Rpb24pe2RlbGF5RnVuY3Rpb24oZmx1c2hQZW5kaW5nRGVsZXRlcyl9dGhpcy4kJC5kZWxldGVTY2hlZHVsZWQ9dHJ1ZTtyZXR1cm4gdGhpc31mdW5jdGlvbiBpbml0X0NsYXNzSGFuZGxlKCl7Q2xhc3NIYW5kbGUucHJvdG90eXBlWyJpc0FsaWFzT2YiXT1DbGFzc0hhbmRsZV9pc0FsaWFzT2Y7Q2xhc3NIYW5kbGUucHJvdG90eXBlWyJjbG9uZSJdPUNsYXNzSGFuZGxlX2Nsb25lO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiZGVsZXRlIl09Q2xhc3NIYW5kbGVfZGVsZXRlO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiaXNEZWxldGVkIl09Q2xhc3NIYW5kbGVfaXNEZWxldGVkO0NsYXNzSGFuZGxlLnByb3RvdHlwZVsiZGVsZXRlTGF0ZXIiXT1DbGFzc0hhbmRsZV9kZWxldGVMYXRlcn1mdW5jdGlvbiBDbGFzc0hhbmRsZSgpe312YXIgcmVnaXN0ZXJlZFBvaW50ZXJzPXt9O2Z1bmN0aW9uIGVuc3VyZU92ZXJsb2FkVGFibGUocHJvdG8sbWV0aG9kTmFtZSxodW1hbk5hbWUpe2lmKHVuZGVmaW5lZD09PXByb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGUpe3ZhciBwcmV2RnVuYz1wcm90b1ttZXRob2ROYW1lXTtwcm90b1ttZXRob2ROYW1lXT1mdW5jdGlvbigpe2lmKCFwcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlLmhhc093blByb3BlcnR5KGFyZ3VtZW50cy5sZW5ndGgpKXt0aHJvd0JpbmRpbmdFcnJvcigiRnVuY3Rpb24gJyIraHVtYW5OYW1lKyInIGNhbGxlZCB3aXRoIGFuIGludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIithcmd1bWVudHMubGVuZ3RoKyIpIC0gZXhwZWN0cyBvbmUgb2YgKCIrcHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZSsiKSEiKX1yZXR1cm4gcHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmd1bWVudHMubGVuZ3RoXS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGU9W107cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVtwcmV2RnVuYy5hcmdDb3VudF09cHJldkZ1bmN9fWZ1bmN0aW9uIGV4cG9zZVB1YmxpY1N5bWJvbChuYW1lLHZhbHVlLG51bUFyZ3VtZW50cyl7aWYoTW9kdWxlLmhhc093blByb3BlcnR5KG5hbWUpKXtpZih1bmRlZmluZWQ9PT1udW1Bcmd1bWVudHN8fHVuZGVmaW5lZCE9PU1vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlJiZ1bmRlZmluZWQhPT1Nb2R1bGVbbmFtZV0ub3ZlcmxvYWRUYWJsZVtudW1Bcmd1bWVudHNdKXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIHB1YmxpYyBuYW1lICciK25hbWUrIicgdHdpY2UiKX1lbnN1cmVPdmVybG9hZFRhYmxlKE1vZHVsZSxuYW1lLG5hbWUpO2lmKE1vZHVsZS5oYXNPd25Qcm9wZXJ0eShudW1Bcmd1bWVudHMpKXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIG92ZXJsb2FkcyBvZiBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgbnVtYmVyIG9mIGFyZ3VtZW50cyAoIitudW1Bcmd1bWVudHMrIikhIil9TW9kdWxlW25hbWVdLm92ZXJsb2FkVGFibGVbbnVtQXJndW1lbnRzXT12YWx1ZX1lbHNle01vZHVsZVtuYW1lXT12YWx1ZTtpZih1bmRlZmluZWQhPT1udW1Bcmd1bWVudHMpe01vZHVsZVtuYW1lXS5udW1Bcmd1bWVudHM9bnVtQXJndW1lbnRzfX19ZnVuY3Rpb24gUmVnaXN0ZXJlZENsYXNzKG5hbWUsY29uc3RydWN0b3IsaW5zdGFuY2VQcm90b3R5cGUscmF3RGVzdHJ1Y3RvcixiYXNlQ2xhc3MsZ2V0QWN0dWFsVHlwZSx1cGNhc3QsZG93bmNhc3Qpe3RoaXMubmFtZT1uYW1lO3RoaXMuY29uc3RydWN0b3I9Y29uc3RydWN0b3I7dGhpcy5pbnN0YW5jZVByb3RvdHlwZT1pbnN0YW5jZVByb3RvdHlwZTt0aGlzLnJhd0Rlc3RydWN0b3I9cmF3RGVzdHJ1Y3Rvcjt0aGlzLmJhc2VDbGFzcz1iYXNlQ2xhc3M7dGhpcy5nZXRBY3R1YWxUeXBlPWdldEFjdHVhbFR5cGU7dGhpcy51cGNhc3Q9dXBjYXN0O3RoaXMuZG93bmNhc3Q9ZG93bmNhc3Q7dGhpcy5wdXJlVmlydHVhbEZ1bmN0aW9ucz1bXX1mdW5jdGlvbiB1cGNhc3RQb2ludGVyKHB0cixwdHJDbGFzcyxkZXNpcmVkQ2xhc3Mpe3doaWxlKHB0ckNsYXNzIT09ZGVzaXJlZENsYXNzKXtpZighcHRyQ2xhc3MudXBjYXN0KXt0aHJvd0JpbmRpbmdFcnJvcigiRXhwZWN0ZWQgbnVsbCBvciBpbnN0YW5jZSBvZiAiK2Rlc2lyZWRDbGFzcy5uYW1lKyIsIGdvdCBhbiBpbnN0YW5jZSBvZiAiK3B0ckNsYXNzLm5hbWUpfXB0cj1wdHJDbGFzcy51cGNhc3QocHRyKTtwdHJDbGFzcz1wdHJDbGFzcy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBjb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZShkZXN0cnVjdG9ycyxoYW5kbGUpe2lmKGhhbmRsZT09PW51bGwpe2lmKHRoaXMuaXNSZWZlcmVuY2Upe3Rocm93QmluZGluZ0Vycm9yKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKX1yZXR1cm4gMH1pZighaGFuZGxlLiQkKXt0aHJvd0JpbmRpbmdFcnJvcignQ2Fubm90IHBhc3MgIicrX2VtYmluZF9yZXByKGhhbmRsZSkrJyIgYXMgYSAnK3RoaXMubmFtZSl9aWYoIWhhbmRsZS4kJC5wdHIpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBkZWxldGVkIG9iamVjdCBhcyBhIHBvaW50ZXIgb2YgdHlwZSAiK3RoaXMubmFtZSl9dmFyIGhhbmRsZUNsYXNzPWhhbmRsZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcHRyPXVwY2FzdFBvaW50ZXIoaGFuZGxlLiQkLnB0cixoYW5kbGVDbGFzcyx0aGlzLnJlZ2lzdGVyZWRDbGFzcyk7cmV0dXJuIHB0cn1mdW5jdGlvbiBnZW5lcmljUG9pbnRlclRvV2lyZVR5cGUoZGVzdHJ1Y3RvcnMsaGFuZGxlKXt2YXIgcHRyO2lmKGhhbmRsZT09PW51bGwpe2lmKHRoaXMuaXNSZWZlcmVuY2Upe3Rocm93QmluZGluZ0Vycm9yKCJudWxsIGlzIG5vdCBhIHZhbGlkICIrdGhpcy5uYW1lKX1pZih0aGlzLmlzU21hcnRQb2ludGVyKXtwdHI9dGhpcy5yYXdDb25zdHJ1Y3RvcigpO2lmKGRlc3RydWN0b3JzIT09bnVsbCl7ZGVzdHJ1Y3RvcnMucHVzaCh0aGlzLnJhd0Rlc3RydWN0b3IscHRyKX1yZXR1cm4gcHRyfWVsc2V7cmV0dXJuIDB9fWlmKCFoYW5kbGUuJCQpe3Rocm93QmluZGluZ0Vycm9yKCdDYW5ub3QgcGFzcyAiJytfZW1iaW5kX3JlcHIoaGFuZGxlKSsnIiBhcyBhICcrdGhpcy5uYW1lKX1pZighaGFuZGxlLiQkLnB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKX1pZighdGhpcy5pc0NvbnN0JiZoYW5kbGUuJCQucHRyVHlwZS5pc0NvbnN0KXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAiKyhoYW5kbGUuJCQuc21hcnRQdHJUeXBlP2hhbmRsZS4kJC5zbWFydFB0clR5cGUubmFtZTpoYW5kbGUuJCQucHRyVHlwZS5uYW1lKSsiIHRvIHBhcmFtZXRlciB0eXBlICIrdGhpcy5uYW1lKX12YXIgaGFuZGxlQ2xhc3M9aGFuZGxlLiQkLnB0clR5cGUucmVnaXN0ZXJlZENsYXNzO3B0cj11cGNhc3RQb2ludGVyKGhhbmRsZS4kJC5wdHIsaGFuZGxlQ2xhc3MsdGhpcy5yZWdpc3RlcmVkQ2xhc3MpO2lmKHRoaXMuaXNTbWFydFBvaW50ZXIpe2lmKHVuZGVmaW5lZD09PWhhbmRsZS4kJC5zbWFydFB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIlBhc3NpbmcgcmF3IHBvaW50ZXIgdG8gc21hcnQgcG9pbnRlciBpcyBpbGxlZ2FsIil9c3dpdGNoKHRoaXMuc2hhcmluZ1BvbGljeSl7Y2FzZSAwOmlmKGhhbmRsZS4kJC5zbWFydFB0clR5cGU9PT10aGlzKXtwdHI9aGFuZGxlLiQkLnNtYXJ0UHRyfWVsc2V7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBjb252ZXJ0IGFyZ3VtZW50IG9mIHR5cGUgIisoaGFuZGxlLiQkLnNtYXJ0UHRyVHlwZT9oYW5kbGUuJCQuc21hcnRQdHJUeXBlLm5hbWU6aGFuZGxlLiQkLnB0clR5cGUubmFtZSkrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSl9YnJlYWs7Y2FzZSAxOnB0cj1oYW5kbGUuJCQuc21hcnRQdHI7YnJlYWs7Y2FzZSAyOmlmKGhhbmRsZS4kJC5zbWFydFB0clR5cGU9PT10aGlzKXtwdHI9aGFuZGxlLiQkLnNtYXJ0UHRyfWVsc2V7dmFyIGNsb25lZEhhbmRsZT1oYW5kbGVbImNsb25lIl0oKTtwdHI9dGhpcy5yYXdTaGFyZShwdHIsX19lbXZhbF9yZWdpc3RlcihmdW5jdGlvbigpe2Nsb25lZEhhbmRsZVsiZGVsZXRlIl0oKX0pKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2godGhpcy5yYXdEZXN0cnVjdG9yLHB0cil9fWJyZWFrO2RlZmF1bHQ6dGhyb3dCaW5kaW5nRXJyb3IoIlVuc3VwcG9ydGluZyBzaGFyaW5nIHBvbGljeSIpfX1yZXR1cm4gcHRyfWZ1bmN0aW9uIG5vbkNvbnN0Tm9TbWFydFB0clJhd1BvaW50ZXJUb1dpcmVUeXBlKGRlc3RydWN0b3JzLGhhbmRsZSl7aWYoaGFuZGxlPT09bnVsbCl7aWYodGhpcy5pc1JlZmVyZW5jZSl7dGhyb3dCaW5kaW5nRXJyb3IoIm51bGwgaXMgbm90IGEgdmFsaWQgIit0aGlzLm5hbWUpfXJldHVybiAwfWlmKCFoYW5kbGUuJCQpe3Rocm93QmluZGluZ0Vycm9yKCdDYW5ub3QgcGFzcyAiJytfZW1iaW5kX3JlcHIoaGFuZGxlKSsnIiBhcyBhICcrdGhpcy5uYW1lKX1pZighaGFuZGxlLiQkLnB0cil7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIGRlbGV0ZWQgb2JqZWN0IGFzIGEgcG9pbnRlciBvZiB0eXBlICIrdGhpcy5uYW1lKX1pZihoYW5kbGUuJCQucHRyVHlwZS5pc0NvbnN0KXt0aHJvd0JpbmRpbmdFcnJvcigiQ2Fubm90IGNvbnZlcnQgYXJndW1lbnQgb2YgdHlwZSAiK2hhbmRsZS4kJC5wdHJUeXBlLm5hbWUrIiB0byBwYXJhbWV0ZXIgdHlwZSAiK3RoaXMubmFtZSl9dmFyIGhhbmRsZUNsYXNzPWhhbmRsZS4kJC5wdHJUeXBlLnJlZ2lzdGVyZWRDbGFzczt2YXIgcHRyPXVwY2FzdFBvaW50ZXIoaGFuZGxlLiQkLnB0cixoYW5kbGVDbGFzcyx0aGlzLnJlZ2lzdGVyZWRDbGFzcyk7cmV0dXJuIHB0cn1mdW5jdGlvbiBzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oSEVBUFUzMltwb2ludGVyPj4yXSl9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZ2V0UG9pbnRlZShwdHIpe2lmKHRoaXMucmF3R2V0UG9pbnRlZSl7cHRyPXRoaXMucmF3R2V0UG9pbnRlZShwdHIpfXJldHVybiBwdHJ9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvcihwdHIpe2lmKHRoaXMucmF3RGVzdHJ1Y3Rvcil7dGhpcy5yYXdEZXN0cnVjdG9yKHB0cil9fWZ1bmN0aW9uIFJlZ2lzdGVyZWRQb2ludGVyX2RlbGV0ZU9iamVjdChoYW5kbGUpe2lmKGhhbmRsZSE9PW51bGwpe2hhbmRsZVsiZGVsZXRlIl0oKX19ZnVuY3Rpb24gZG93bmNhc3RQb2ludGVyKHB0cixwdHJDbGFzcyxkZXNpcmVkQ2xhc3Mpe2lmKHB0ckNsYXNzPT09ZGVzaXJlZENsYXNzKXtyZXR1cm4gcHRyfWlmKHVuZGVmaW5lZD09PWRlc2lyZWRDbGFzcy5iYXNlQ2xhc3Mpe3JldHVybiBudWxsfXZhciBydj1kb3duY2FzdFBvaW50ZXIocHRyLHB0ckNsYXNzLGRlc2lyZWRDbGFzcy5iYXNlQ2xhc3MpO2lmKHJ2PT09bnVsbCl7cmV0dXJuIG51bGx9cmV0dXJuIGRlc2lyZWRDbGFzcy5kb3duY2FzdChydil9ZnVuY3Rpb24gZ2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudCgpe3JldHVybiBPYmplY3Qua2V5cyhyZWdpc3RlcmVkSW5zdGFuY2VzKS5sZW5ndGh9ZnVuY3Rpb24gZ2V0TGl2ZUluaGVyaXRlZEluc3RhbmNlcygpe3ZhciBydj1bXTtmb3IodmFyIGsgaW4gcmVnaXN0ZXJlZEluc3RhbmNlcyl7aWYocmVnaXN0ZXJlZEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShrKSl7cnYucHVzaChyZWdpc3RlcmVkSW5zdGFuY2VzW2tdKX19cmV0dXJuIHJ2fWZ1bmN0aW9uIHNldERlbGF5RnVuY3Rpb24oZm4pe2RlbGF5RnVuY3Rpb249Zm47aWYoZGVsZXRpb25RdWV1ZS5sZW5ndGgmJmRlbGF5RnVuY3Rpb24pe2RlbGF5RnVuY3Rpb24oZmx1c2hQZW5kaW5nRGVsZXRlcyl9fWZ1bmN0aW9uIGluaXRfZW1iaW5kKCl7TW9kdWxlWyJnZXRJbmhlcml0ZWRJbnN0YW5jZUNvdW50Il09Z2V0SW5oZXJpdGVkSW5zdGFuY2VDb3VudDtNb2R1bGVbImdldExpdmVJbmhlcml0ZWRJbnN0YW5jZXMiXT1nZXRMaXZlSW5oZXJpdGVkSW5zdGFuY2VzO01vZHVsZVsiZmx1c2hQZW5kaW5nRGVsZXRlcyJdPWZsdXNoUGVuZGluZ0RlbGV0ZXM7TW9kdWxlWyJzZXREZWxheUZ1bmN0aW9uIl09c2V0RGVsYXlGdW5jdGlvbn12YXIgcmVnaXN0ZXJlZEluc3RhbmNlcz17fTtmdW5jdGlvbiBnZXRCYXNlc3RQb2ludGVyKGNsYXNzXyxwdHIpe2lmKHB0cj09PXVuZGVmaW5lZCl7dGhyb3dCaW5kaW5nRXJyb3IoInB0ciBzaG91bGQgbm90IGJlIHVuZGVmaW5lZCIpfXdoaWxlKGNsYXNzXy5iYXNlQ2xhc3Mpe3B0cj1jbGFzc18udXBjYXN0KHB0cik7Y2xhc3NfPWNsYXNzXy5iYXNlQ2xhc3N9cmV0dXJuIHB0cn1mdW5jdGlvbiBnZXRJbmhlcml0ZWRJbnN0YW5jZShjbGFzc18scHRyKXtwdHI9Z2V0QmFzZXN0UG9pbnRlcihjbGFzc18scHRyKTtyZXR1cm4gcmVnaXN0ZXJlZEluc3RhbmNlc1twdHJdfWZ1bmN0aW9uIG1ha2VDbGFzc0hhbmRsZShwcm90b3R5cGUscmVjb3JkKXtpZighcmVjb3JkLnB0clR5cGV8fCFyZWNvcmQucHRyKXt0aHJvd0ludGVybmFsRXJyb3IoIm1ha2VDbGFzc0hhbmRsZSByZXF1aXJlcyBwdHIgYW5kIHB0clR5cGUiKX12YXIgaGFzU21hcnRQdHJUeXBlPSEhcmVjb3JkLnNtYXJ0UHRyVHlwZTt2YXIgaGFzU21hcnRQdHI9ISFyZWNvcmQuc21hcnRQdHI7aWYoaGFzU21hcnRQdHJUeXBlIT09aGFzU21hcnRQdHIpe3Rocm93SW50ZXJuYWxFcnJvcigiQm90aCBzbWFydFB0clR5cGUgYW5kIHNtYXJ0UHRyIG11c3QgYmUgc3BlY2lmaWVkIil9cmVjb3JkLmNvdW50PXt2YWx1ZToxfTtyZXR1cm4gYXR0YWNoRmluYWxpemVyKE9iamVjdC5jcmVhdGUocHJvdG90eXBlLHskJDp7dmFsdWU6cmVjb3JkfX0pKX1mdW5jdGlvbiBSZWdpc3RlcmVkUG9pbnRlcl9mcm9tV2lyZVR5cGUocHRyKXt2YXIgcmF3UG9pbnRlcj10aGlzLmdldFBvaW50ZWUocHRyKTtpZighcmF3UG9pbnRlcil7dGhpcy5kZXN0cnVjdG9yKHB0cik7cmV0dXJuIG51bGx9dmFyIHJlZ2lzdGVyZWRJbnN0YW5jZT1nZXRJbmhlcml0ZWRJbnN0YW5jZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcyxyYXdQb2ludGVyKTtpZih1bmRlZmluZWQhPT1yZWdpc3RlcmVkSW5zdGFuY2Upe2lmKDA9PT1yZWdpc3RlcmVkSW5zdGFuY2UuJCQuY291bnQudmFsdWUpe3JlZ2lzdGVyZWRJbnN0YW5jZS4kJC5wdHI9cmF3UG9pbnRlcjtyZWdpc3RlcmVkSW5zdGFuY2UuJCQuc21hcnRQdHI9cHRyO3JldHVybiByZWdpc3RlcmVkSW5zdGFuY2VbImNsb25lIl0oKX1lbHNle3ZhciBydj1yZWdpc3RlcmVkSW5zdGFuY2VbImNsb25lIl0oKTt0aGlzLmRlc3RydWN0b3IocHRyKTtyZXR1cm4gcnZ9fWZ1bmN0aW9uIG1ha2VEZWZhdWx0SGFuZGxlKCl7aWYodGhpcy5pc1NtYXJ0UG9pbnRlcil7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0aGlzLnBvaW50ZWVUeXBlLHB0cjpyYXdQb2ludGVyLHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOnB0cn0pfWVsc2V7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0aGlzLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0aGlzLHB0cjpwdHJ9KX19dmFyIGFjdHVhbFR5cGU9dGhpcy5yZWdpc3RlcmVkQ2xhc3MuZ2V0QWN0dWFsVHlwZShyYXdQb2ludGVyKTt2YXIgcmVnaXN0ZXJlZFBvaW50ZXJSZWNvcmQ9cmVnaXN0ZXJlZFBvaW50ZXJzW2FjdHVhbFR5cGVdO2lmKCFyZWdpc3RlcmVkUG9pbnRlclJlY29yZCl7cmV0dXJuIG1ha2VEZWZhdWx0SGFuZGxlLmNhbGwodGhpcyl9dmFyIHRvVHlwZTtpZih0aGlzLmlzQ29uc3Qpe3RvVHlwZT1yZWdpc3RlcmVkUG9pbnRlclJlY29yZC5jb25zdFBvaW50ZXJUeXBlfWVsc2V7dG9UeXBlPXJlZ2lzdGVyZWRQb2ludGVyUmVjb3JkLnBvaW50ZXJUeXBlfXZhciBkcD1kb3duY2FzdFBvaW50ZXIocmF3UG9pbnRlcix0aGlzLnJlZ2lzdGVyZWRDbGFzcyx0b1R5cGUucmVnaXN0ZXJlZENsYXNzKTtpZihkcD09PW51bGwpe3JldHVybiBtYWtlRGVmYXVsdEhhbmRsZS5jYWxsKHRoaXMpfWlmKHRoaXMuaXNTbWFydFBvaW50ZXIpe3JldHVybiBtYWtlQ2xhc3NIYW5kbGUodG9UeXBlLnJlZ2lzdGVyZWRDbGFzcy5pbnN0YW5jZVByb3RvdHlwZSx7cHRyVHlwZTp0b1R5cGUscHRyOmRwLHNtYXJ0UHRyVHlwZTp0aGlzLHNtYXJ0UHRyOnB0cn0pfWVsc2V7cmV0dXJuIG1ha2VDbGFzc0hhbmRsZSh0b1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlLHtwdHJUeXBlOnRvVHlwZSxwdHI6ZHB9KX19ZnVuY3Rpb24gaW5pdF9SZWdpc3RlcmVkUG9pbnRlcigpe1JlZ2lzdGVyZWRQb2ludGVyLnByb3RvdHlwZS5nZXRQb2ludGVlPVJlZ2lzdGVyZWRQb2ludGVyX2dldFBvaW50ZWU7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlLmRlc3RydWN0b3I9UmVnaXN0ZXJlZFBvaW50ZXJfZGVzdHJ1Y3RvcjtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGVbImFyZ1BhY2tBZHZhbmNlIl09ODtSZWdpc3RlcmVkUG9pbnRlci5wcm90b3R5cGVbInJlYWRWYWx1ZUZyb21Qb2ludGVyIl09c2ltcGxlUmVhZFZhbHVlRnJvbVBvaW50ZXI7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlWyJkZWxldGVPYmplY3QiXT1SZWdpc3RlcmVkUG9pbnRlcl9kZWxldGVPYmplY3Q7UmVnaXN0ZXJlZFBvaW50ZXIucHJvdG90eXBlWyJmcm9tV2lyZVR5cGUiXT1SZWdpc3RlcmVkUG9pbnRlcl9mcm9tV2lyZVR5cGV9ZnVuY3Rpb24gUmVnaXN0ZXJlZFBvaW50ZXIobmFtZSxyZWdpc3RlcmVkQ2xhc3MsaXNSZWZlcmVuY2UsaXNDb25zdCxpc1NtYXJ0UG9pbnRlcixwb2ludGVlVHlwZSxzaGFyaW5nUG9saWN5LHJhd0dldFBvaW50ZWUscmF3Q29uc3RydWN0b3IscmF3U2hhcmUscmF3RGVzdHJ1Y3Rvcil7dGhpcy5uYW1lPW5hbWU7dGhpcy5yZWdpc3RlcmVkQ2xhc3M9cmVnaXN0ZXJlZENsYXNzO3RoaXMuaXNSZWZlcmVuY2U9aXNSZWZlcmVuY2U7dGhpcy5pc0NvbnN0PWlzQ29uc3Q7dGhpcy5pc1NtYXJ0UG9pbnRlcj1pc1NtYXJ0UG9pbnRlcjt0aGlzLnBvaW50ZWVUeXBlPXBvaW50ZWVUeXBlO3RoaXMuc2hhcmluZ1BvbGljeT1zaGFyaW5nUG9saWN5O3RoaXMucmF3R2V0UG9pbnRlZT1yYXdHZXRQb2ludGVlO3RoaXMucmF3Q29uc3RydWN0b3I9cmF3Q29uc3RydWN0b3I7dGhpcy5yYXdTaGFyZT1yYXdTaGFyZTt0aGlzLnJhd0Rlc3RydWN0b3I9cmF3RGVzdHJ1Y3RvcjtpZighaXNTbWFydFBvaW50ZXImJnJlZ2lzdGVyZWRDbGFzcy5iYXNlQ2xhc3M9PT11bmRlZmluZWQpe2lmKGlzQ29uc3Qpe3RoaXNbInRvV2lyZVR5cGUiXT1jb25zdE5vU21hcnRQdHJSYXdQb2ludGVyVG9XaXJlVHlwZTt0aGlzLmRlc3RydWN0b3JGdW5jdGlvbj1udWxsfWVsc2V7dGhpc1sidG9XaXJlVHlwZSJdPW5vbkNvbnN0Tm9TbWFydFB0clJhd1BvaW50ZXJUb1dpcmVUeXBlO3RoaXMuZGVzdHJ1Y3RvckZ1bmN0aW9uPW51bGx9fWVsc2V7dGhpc1sidG9XaXJlVHlwZSJdPWdlbmVyaWNQb2ludGVyVG9XaXJlVHlwZX19ZnVuY3Rpb24gcmVwbGFjZVB1YmxpY1N5bWJvbChuYW1lLHZhbHVlLG51bUFyZ3VtZW50cyl7aWYoIU1vZHVsZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSl7dGhyb3dJbnRlcm5hbEVycm9yKCJSZXBsYWNpbmcgbm9uZXhpc3RhbnQgcHVibGljIHN5bWJvbCIpfWlmKHVuZGVmaW5lZCE9PU1vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlJiZ1bmRlZmluZWQhPT1udW1Bcmd1bWVudHMpe01vZHVsZVtuYW1lXS5vdmVybG9hZFRhYmxlW251bUFyZ3VtZW50c109dmFsdWV9ZWxzZXtNb2R1bGVbbmFtZV09dmFsdWU7TW9kdWxlW25hbWVdLmFyZ0NvdW50PW51bUFyZ3VtZW50c319ZnVuY3Rpb24gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3Mpe3ZhciBmPU1vZHVsZVsiZHluQ2FsbF8iK3NpZ107cmV0dXJuIGFyZ3MmJmFyZ3MubGVuZ3RoP2YuYXBwbHkobnVsbCxbcHRyXS5jb25jYXQoYXJncykpOmYuY2FsbChudWxsLHB0cil9ZnVuY3Rpb24gZHluQ2FsbChzaWcscHRyLGFyZ3Mpe2lmKHNpZy5pbmRleE9mKCJqIikhPS0xKXtyZXR1cm4gZHluQ2FsbExlZ2FjeShzaWcscHRyLGFyZ3MpfXJldHVybiB3YXNtVGFibGUuZ2V0KHB0cikuYXBwbHkobnVsbCxhcmdzKX1mdW5jdGlvbiBnZXREeW5DYWxsZXIoc2lnLHB0cil7dmFyIGFyZ0NhY2hlPVtdO3JldHVybiBmdW5jdGlvbigpe2FyZ0NhY2hlLmxlbmd0aD1hcmd1bWVudHMubGVuZ3RoO2Zvcih2YXIgaT0wO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe2FyZ0NhY2hlW2ldPWFyZ3VtZW50c1tpXX1yZXR1cm4gZHluQ2FsbChzaWcscHRyLGFyZ0NhY2hlKX19ZnVuY3Rpb24gZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oc2lnbmF0dXJlLHJhd0Z1bmN0aW9uKXtzaWduYXR1cmU9cmVhZExhdGluMVN0cmluZyhzaWduYXR1cmUpO2Z1bmN0aW9uIG1ha2VEeW5DYWxsZXIoKXtpZihzaWduYXR1cmUuaW5kZXhPZigiaiIpIT0tMSl7cmV0dXJuIGdldER5bkNhbGxlcihzaWduYXR1cmUscmF3RnVuY3Rpb24pfXJldHVybiB3YXNtVGFibGUuZ2V0KHJhd0Z1bmN0aW9uKX12YXIgZnA9bWFrZUR5bkNhbGxlcigpO2lmKHR5cGVvZiBmcCE9PSJmdW5jdGlvbiIpe3Rocm93QmluZGluZ0Vycm9yKCJ1bmtub3duIGZ1bmN0aW9uIHBvaW50ZXIgd2l0aCBzaWduYXR1cmUgIitzaWduYXR1cmUrIjogIityYXdGdW5jdGlvbil9cmV0dXJuIGZwfXZhciBVbmJvdW5kVHlwZUVycm9yPXVuZGVmaW5lZDtmdW5jdGlvbiBnZXRUeXBlTmFtZSh0eXBlKXt2YXIgcHRyPV9fX2dldFR5cGVOYW1lKHR5cGUpO3ZhciBydj1yZWFkTGF0aW4xU3RyaW5nKHB0cik7X2ZyZWUocHRyKTtyZXR1cm4gcnZ9ZnVuY3Rpb24gdGhyb3dVbmJvdW5kVHlwZUVycm9yKG1lc3NhZ2UsdHlwZXMpe3ZhciB1bmJvdW5kVHlwZXM9W107dmFyIHNlZW49e307ZnVuY3Rpb24gdmlzaXQodHlwZSl7aWYoc2Vlblt0eXBlXSl7cmV0dXJufWlmKHJlZ2lzdGVyZWRUeXBlc1t0eXBlXSl7cmV0dXJufWlmKHR5cGVEZXBlbmRlbmNpZXNbdHlwZV0pe3R5cGVEZXBlbmRlbmNpZXNbdHlwZV0uZm9yRWFjaCh2aXNpdCk7cmV0dXJufXVuYm91bmRUeXBlcy5wdXNoKHR5cGUpO3NlZW5bdHlwZV09dHJ1ZX10eXBlcy5mb3JFYWNoKHZpc2l0KTt0aHJvdyBuZXcgVW5ib3VuZFR5cGVFcnJvcihtZXNzYWdlKyI6ICIrdW5ib3VuZFR5cGVzLm1hcChnZXRUeXBlTmFtZSkuam9pbihbIiwgIl0pKX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzcyhyYXdUeXBlLHJhd1BvaW50ZXJUeXBlLHJhd0NvbnN0UG9pbnRlclR5cGUsYmFzZUNsYXNzUmF3VHlwZSxnZXRBY3R1YWxUeXBlU2lnbmF0dXJlLGdldEFjdHVhbFR5cGUsdXBjYXN0U2lnbmF0dXJlLHVwY2FzdCxkb3duY2FzdFNpZ25hdHVyZSxkb3duY2FzdCxuYW1lLGRlc3RydWN0b3JTaWduYXR1cmUscmF3RGVzdHJ1Y3Rvcil7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO2dldEFjdHVhbFR5cGU9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZ2V0QWN0dWFsVHlwZVNpZ25hdHVyZSxnZXRBY3R1YWxUeXBlKTtpZih1cGNhc3Qpe3VwY2FzdD1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbih1cGNhc3RTaWduYXR1cmUsdXBjYXN0KX1pZihkb3duY2FzdCl7ZG93bmNhc3Q9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZG93bmNhc3RTaWduYXR1cmUsZG93bmNhc3QpfXJhd0Rlc3RydWN0b3I9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oZGVzdHJ1Y3RvclNpZ25hdHVyZSxyYXdEZXN0cnVjdG9yKTt2YXIgbGVnYWxGdW5jdGlvbk5hbWU9bWFrZUxlZ2FsRnVuY3Rpb25OYW1lKG5hbWUpO2V4cG9zZVB1YmxpY1N5bWJvbChsZWdhbEZ1bmN0aW9uTmFtZSxmdW5jdGlvbigpe3Rocm93VW5ib3VuZFR5cGVFcnJvcigiQ2Fubm90IGNvbnN0cnVjdCAiK25hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIsW2Jhc2VDbGFzc1Jhd1R5cGVdKX0pO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtyYXdUeXBlLHJhd1BvaW50ZXJUeXBlLHJhd0NvbnN0UG9pbnRlclR5cGVdLGJhc2VDbGFzc1Jhd1R5cGU/W2Jhc2VDbGFzc1Jhd1R5cGVdOltdLGZ1bmN0aW9uKGJhc2Upe2Jhc2U9YmFzZVswXTt2YXIgYmFzZUNsYXNzO3ZhciBiYXNlUHJvdG90eXBlO2lmKGJhc2VDbGFzc1Jhd1R5cGUpe2Jhc2VDbGFzcz1iYXNlLnJlZ2lzdGVyZWRDbGFzcztiYXNlUHJvdG90eXBlPWJhc2VDbGFzcy5pbnN0YW5jZVByb3RvdHlwZX1lbHNle2Jhc2VQcm90b3R5cGU9Q2xhc3NIYW5kbGUucHJvdG90eXBlfXZhciBjb25zdHJ1Y3Rvcj1jcmVhdGVOYW1lZEZ1bmN0aW9uKGxlZ2FsRnVuY3Rpb25OYW1lLGZ1bmN0aW9uKCl7aWYoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpIT09aW5zdGFuY2VQcm90b3R5cGUpe3Rocm93IG5ldyBCaW5kaW5nRXJyb3IoIlVzZSAnbmV3JyB0byBjb25zdHJ1Y3QgIituYW1lKX1pZih1bmRlZmluZWQ9PT1yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcihuYW1lKyIgaGFzIG5vIGFjY2Vzc2libGUgY29uc3RydWN0b3IiKX12YXIgYm9keT1yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keVthcmd1bWVudHMubGVuZ3RoXTtpZih1bmRlZmluZWQ9PT1ib2R5KXt0aHJvdyBuZXcgQmluZGluZ0Vycm9yKCJUcmllZCB0byBpbnZva2UgY3RvciBvZiAiK25hbWUrIiB3aXRoIGludmFsaWQgbnVtYmVyIG9mIHBhcmFtZXRlcnMgKCIrYXJndW1lbnRzLmxlbmd0aCsiKSAtIGV4cGVjdGVkICgiK09iamVjdC5rZXlzKHJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5KS50b1N0cmluZygpKyIpIHBhcmFtZXRlcnMgaW5zdGVhZCEiKX1yZXR1cm4gYm9keS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KTt2YXIgaW5zdGFuY2VQcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShiYXNlUHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6Y29uc3RydWN0b3J9fSk7Y29uc3RydWN0b3IucHJvdG90eXBlPWluc3RhbmNlUHJvdG90eXBlO3ZhciByZWdpc3RlcmVkQ2xhc3M9bmV3IFJlZ2lzdGVyZWRDbGFzcyhuYW1lLGNvbnN0cnVjdG9yLGluc3RhbmNlUHJvdG90eXBlLHJhd0Rlc3RydWN0b3IsYmFzZUNsYXNzLGdldEFjdHVhbFR5cGUsdXBjYXN0LGRvd25jYXN0KTt2YXIgcmVmZXJlbmNlQ29udmVydGVyPW5ldyBSZWdpc3RlcmVkUG9pbnRlcihuYW1lLHJlZ2lzdGVyZWRDbGFzcyx0cnVlLGZhbHNlLGZhbHNlKTt2YXIgcG9pbnRlckNvbnZlcnRlcj1uZXcgUmVnaXN0ZXJlZFBvaW50ZXIobmFtZSsiKiIscmVnaXN0ZXJlZENsYXNzLGZhbHNlLGZhbHNlLGZhbHNlKTt2YXIgY29uc3RQb2ludGVyQ29udmVydGVyPW5ldyBSZWdpc3RlcmVkUG9pbnRlcihuYW1lKyIgY29uc3QqIixyZWdpc3RlcmVkQ2xhc3MsZmFsc2UsdHJ1ZSxmYWxzZSk7cmVnaXN0ZXJlZFBvaW50ZXJzW3Jhd1R5cGVdPXtwb2ludGVyVHlwZTpwb2ludGVyQ29udmVydGVyLGNvbnN0UG9pbnRlclR5cGU6Y29uc3RQb2ludGVyQ29udmVydGVyfTtyZXBsYWNlUHVibGljU3ltYm9sKGxlZ2FsRnVuY3Rpb25OYW1lLGNvbnN0cnVjdG9yKTtyZXR1cm5bcmVmZXJlbmNlQ29udmVydGVyLHBvaW50ZXJDb252ZXJ0ZXIsY29uc3RQb2ludGVyQ29udmVydGVyXX0pfWZ1bmN0aW9uIGhlYXAzMlZlY3RvclRvQXJyYXkoY291bnQsZmlyc3RFbGVtZW50KXt2YXIgYXJyYXk9W107Zm9yKHZhciBpPTA7aTxjb3VudDtpKyspe2FycmF5LnB1c2goSEVBUDMyWyhmaXJzdEVsZW1lbnQ+PjIpK2ldKX1yZXR1cm4gYXJyYXl9ZnVuY3Rpb24gcnVuRGVzdHJ1Y3RvcnMoZGVzdHJ1Y3RvcnMpe3doaWxlKGRlc3RydWN0b3JzLmxlbmd0aCl7dmFyIHB0cj1kZXN0cnVjdG9ycy5wb3AoKTt2YXIgZGVsPWRlc3RydWN0b3JzLnBvcCgpO2RlbChwdHIpfX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jb25zdHJ1Y3RvcihyYXdDbGFzc1R5cGUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUsaW52b2tlcixyYXdDb25zdHJ1Y3Rvcil7YXNzZXJ0KGFyZ0NvdW50PjApO3ZhciByYXdBcmdUeXBlcz1oZWFwMzJWZWN0b3JUb0FycmF5KGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcik7aW52b2tlcj1lbWJpbmRfX3JlcXVpcmVGdW5jdGlvbihpbnZva2VyU2lnbmF0dXJlLGludm9rZXIpO3ZhciBhcmdzPVtyYXdDb25zdHJ1Y3Rvcl07dmFyIGRlc3RydWN0b3JzPVtdO3doZW5EZXBlbmRlbnRUeXBlc0FyZVJlc29sdmVkKFtdLFtyYXdDbGFzc1R5cGVdLGZ1bmN0aW9uKGNsYXNzVHlwZSl7Y2xhc3NUeXBlPWNsYXNzVHlwZVswXTt2YXIgaHVtYW5OYW1lPSJjb25zdHJ1Y3RvciAiK2NsYXNzVHlwZS5uYW1lO2lmKHVuZGVmaW5lZD09PWNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keSl7Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5PVtdfWlmKHVuZGVmaW5lZCE9PWNsYXNzVHlwZS5yZWdpc3RlcmVkQ2xhc3MuY29uc3RydWN0b3JfYm9keVthcmdDb3VudC0xXSl7dGhyb3cgbmV3IEJpbmRpbmdFcnJvcigiQ2Fubm90IHJlZ2lzdGVyIG11bHRpcGxlIGNvbnN0cnVjdG9ycyB3aXRoIGlkZW50aWNhbCBudW1iZXIgb2YgcGFyYW1ldGVycyAoIisoYXJnQ291bnQtMSkrIikgZm9yIGNsYXNzICciK2NsYXNzVHlwZS5uYW1lKyInISBPdmVybG9hZCByZXNvbHV0aW9uIGlzIGN1cnJlbnRseSBvbmx5IHBlcmZvcm1lZCB1c2luZyB0aGUgcGFyYW1ldGVyIGNvdW50LCBub3QgYWN0dWFsIHR5cGUgaW5mbyEiKX1jbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmNvbnN0cnVjdG9yX2JvZHlbYXJnQ291bnQtMV09ZnVuY3Rpb24gdW5ib3VuZFR5cGVIYW5kbGVyKCl7dGhyb3dVbmJvdW5kVHlwZUVycm9yKCJDYW5ub3QgY29uc3RydWN0ICIrY2xhc3NUeXBlLm5hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIscmF3QXJnVHlwZXMpfTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxyYXdBcmdUeXBlcyxmdW5jdGlvbihhcmdUeXBlcyl7Y2xhc3NUeXBlLnJlZ2lzdGVyZWRDbGFzcy5jb25zdHJ1Y3Rvcl9ib2R5W2FyZ0NvdW50LTFdPWZ1bmN0aW9uIGNvbnN0cnVjdG9yX2JvZHkoKXtpZihhcmd1bWVudHMubGVuZ3RoIT09YXJnQ291bnQtMSl7dGhyb3dCaW5kaW5nRXJyb3IoaHVtYW5OYW1lKyIgY2FsbGVkIHdpdGggIithcmd1bWVudHMubGVuZ3RoKyIgYXJndW1lbnRzLCBleHBlY3RlZCAiKyhhcmdDb3VudC0xKSl9ZGVzdHJ1Y3RvcnMubGVuZ3RoPTA7YXJncy5sZW5ndGg9YXJnQ291bnQ7Zm9yKHZhciBpPTE7aTxhcmdDb3VudDsrK2kpe2FyZ3NbaV09YXJnVHlwZXNbaV1bInRvV2lyZVR5cGUiXShkZXN0cnVjdG9ycyxhcmd1bWVudHNbaS0xXSl9dmFyIHB0cj1pbnZva2VyLmFwcGx5KG51bGwsYXJncyk7cnVuRGVzdHJ1Y3RvcnMoZGVzdHJ1Y3RvcnMpO3JldHVybiBhcmdUeXBlc1swXVsiZnJvbVdpcmVUeXBlIl0ocHRyKX07cmV0dXJuW119KTtyZXR1cm5bXX0pfWZ1bmN0aW9uIG5ld18oY29uc3RydWN0b3IsYXJndW1lbnRMaXN0KXtpZighKGNvbnN0cnVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pKXt0aHJvdyBuZXcgVHlwZUVycm9yKCJuZXdfIGNhbGxlZCB3aXRoIGNvbnN0cnVjdG9yIHR5cGUgIit0eXBlb2YgY29uc3RydWN0b3IrIiB3aGljaCBpcyBub3QgYSBmdW5jdGlvbiIpfXZhciBkdW1teT1jcmVhdGVOYW1lZEZ1bmN0aW9uKGNvbnN0cnVjdG9yLm5hbWV8fCJ1bmtub3duRnVuY3Rpb25OYW1lIixmdW5jdGlvbigpe30pO2R1bW15LnByb3RvdHlwZT1jb25zdHJ1Y3Rvci5wcm90b3R5cGU7dmFyIG9iaj1uZXcgZHVtbXk7dmFyIHI9Y29uc3RydWN0b3IuYXBwbHkob2JqLGFyZ3VtZW50TGlzdCk7cmV0dXJuIHIgaW5zdGFuY2VvZiBPYmplY3Q/cjpvYmp9ZnVuY3Rpb24gY3JhZnRJbnZva2VyRnVuY3Rpb24oaHVtYW5OYW1lLGFyZ1R5cGVzLGNsYXNzVHlwZSxjcHBJbnZva2VyRnVuYyxjcHBUYXJnZXRGdW5jKXt2YXIgYXJnQ291bnQ9YXJnVHlwZXMubGVuZ3RoO2lmKGFyZ0NvdW50PDIpe3Rocm93QmluZGluZ0Vycm9yKCJhcmdUeXBlcyBhcnJheSBzaXplIG1pc21hdGNoISBNdXN0IGF0IGxlYXN0IGdldCByZXR1cm4gdmFsdWUgYW5kICd0aGlzJyB0eXBlcyEiKX12YXIgaXNDbGFzc01ldGhvZEZ1bmM9YXJnVHlwZXNbMV0hPT1udWxsJiZjbGFzc1R5cGUhPT1udWxsO3ZhciBuZWVkc0Rlc3RydWN0b3JTdGFjaz1mYWxzZTtmb3IodmFyIGk9MTtpPGFyZ1R5cGVzLmxlbmd0aDsrK2kpe2lmKGFyZ1R5cGVzW2ldIT09bnVsbCYmYXJnVHlwZXNbaV0uZGVzdHJ1Y3RvckZ1bmN0aW9uPT09dW5kZWZpbmVkKXtuZWVkc0Rlc3RydWN0b3JTdGFjaz10cnVlO2JyZWFrfX12YXIgcmV0dXJucz1hcmdUeXBlc1swXS5uYW1lIT09InZvaWQiO3ZhciBhcmdzTGlzdD0iIjt2YXIgYXJnc0xpc3RXaXJlZD0iIjtmb3IodmFyIGk9MDtpPGFyZ0NvdW50LTI7KytpKXthcmdzTGlzdCs9KGkhPT0wPyIsICI6IiIpKyJhcmciK2k7YXJnc0xpc3RXaXJlZCs9KGkhPT0wPyIsICI6IiIpKyJhcmciK2krIldpcmVkIn12YXIgaW52b2tlckZuQm9keT0icmV0dXJuIGZ1bmN0aW9uICIrbWFrZUxlZ2FsRnVuY3Rpb25OYW1lKGh1bWFuTmFtZSkrIigiK2FyZ3NMaXN0KyIpIHtcbiIrImlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAiKyhhcmdDb3VudC0yKSsiKSB7XG4iKyJ0aHJvd0JpbmRpbmdFcnJvcignZnVuY3Rpb24gIitodW1hbk5hbWUrIiBjYWxsZWQgd2l0aCAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgYXJndW1lbnRzLCBleHBlY3RlZCAiKyhhcmdDb3VudC0yKSsiIGFyZ3MhJyk7XG4iKyJ9XG4iO2lmKG5lZWRzRGVzdHJ1Y3RvclN0YWNrKXtpbnZva2VyRm5Cb2R5Kz0idmFyIGRlc3RydWN0b3JzID0gW107XG4ifXZhciBkdG9yU3RhY2s9bmVlZHNEZXN0cnVjdG9yU3RhY2s/ImRlc3RydWN0b3JzIjoibnVsbCI7dmFyIGFyZ3MxPVsidGhyb3dCaW5kaW5nRXJyb3IiLCJpbnZva2VyIiwiZm4iLCJydW5EZXN0cnVjdG9ycyIsInJldFR5cGUiLCJjbGFzc1BhcmFtIl07dmFyIGFyZ3MyPVt0aHJvd0JpbmRpbmdFcnJvcixjcHBJbnZva2VyRnVuYyxjcHBUYXJnZXRGdW5jLHJ1bkRlc3RydWN0b3JzLGFyZ1R5cGVzWzBdLGFyZ1R5cGVzWzFdXTtpZihpc0NsYXNzTWV0aG9kRnVuYyl7aW52b2tlckZuQm9keSs9InZhciB0aGlzV2lyZWQgPSBjbGFzc1BhcmFtLnRvV2lyZVR5cGUoIitkdG9yU3RhY2srIiwgdGhpcyk7XG4ifWZvcih2YXIgaT0wO2k8YXJnQ291bnQtMjsrK2kpe2ludm9rZXJGbkJvZHkrPSJ2YXIgYXJnIitpKyJXaXJlZCA9IGFyZ1R5cGUiK2krIi50b1dpcmVUeXBlKCIrZHRvclN0YWNrKyIsIGFyZyIraSsiKTsgLy8gIithcmdUeXBlc1tpKzJdLm5hbWUrIlxuIjthcmdzMS5wdXNoKCJhcmdUeXBlIitpKTthcmdzMi5wdXNoKGFyZ1R5cGVzW2krMl0pfWlmKGlzQ2xhc3NNZXRob2RGdW5jKXthcmdzTGlzdFdpcmVkPSJ0aGlzV2lyZWQiKyhhcmdzTGlzdFdpcmVkLmxlbmd0aD4wPyIsICI6IiIpK2FyZ3NMaXN0V2lyZWR9aW52b2tlckZuQm9keSs9KHJldHVybnM/InZhciBydiA9ICI6IiIpKyJpbnZva2VyKGZuIisoYXJnc0xpc3RXaXJlZC5sZW5ndGg+MD8iLCAiOiIiKSthcmdzTGlzdFdpcmVkKyIpO1xuIjtpZihuZWVkc0Rlc3RydWN0b3JTdGFjayl7aW52b2tlckZuQm9keSs9InJ1bkRlc3RydWN0b3JzKGRlc3RydWN0b3JzKTtcbiJ9ZWxzZXtmb3IodmFyIGk9aXNDbGFzc01ldGhvZEZ1bmM/MToyO2k8YXJnVHlwZXMubGVuZ3RoOysraSl7dmFyIHBhcmFtTmFtZT1pPT09MT8idGhpc1dpcmVkIjoiYXJnIisoaS0yKSsiV2lyZWQiO2lmKGFyZ1R5cGVzW2ldLmRlc3RydWN0b3JGdW5jdGlvbiE9PW51bGwpe2ludm9rZXJGbkJvZHkrPXBhcmFtTmFtZSsiX2R0b3IoIitwYXJhbU5hbWUrIik7IC8vICIrYXJnVHlwZXNbaV0ubmFtZSsiXG4iO2FyZ3MxLnB1c2gocGFyYW1OYW1lKyJfZHRvciIpO2FyZ3MyLnB1c2goYXJnVHlwZXNbaV0uZGVzdHJ1Y3RvckZ1bmN0aW9uKX19fWlmKHJldHVybnMpe2ludm9rZXJGbkJvZHkrPSJ2YXIgcmV0ID0gcmV0VHlwZS5mcm9tV2lyZVR5cGUocnYpO1xuIisicmV0dXJuIHJldDtcbiJ9ZWxzZXt9aW52b2tlckZuQm9keSs9In1cbiI7YXJnczEucHVzaChpbnZva2VyRm5Cb2R5KTt2YXIgaW52b2tlckZ1bmN0aW9uPW5ld18oRnVuY3Rpb24sYXJnczEpLmFwcGx5KG51bGwsYXJnczIpO3JldHVybiBpbnZva2VyRnVuY3Rpb259ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24ocmF3Q2xhc3NUeXBlLG1ldGhvZE5hbWUsYXJnQ291bnQscmF3QXJnVHlwZXNBZGRyLGludm9rZXJTaWduYXR1cmUscmF3SW52b2tlcixjb250ZXh0LGlzUHVyZVZpcnR1YWwpe3ZhciByYXdBcmdUeXBlcz1oZWFwMzJWZWN0b3JUb0FycmF5KGFyZ0NvdW50LHJhd0FyZ1R5cGVzQWRkcik7bWV0aG9kTmFtZT1yZWFkTGF0aW4xU3RyaW5nKG1ldGhvZE5hbWUpO3Jhd0ludm9rZXI9ZW1iaW5kX19yZXF1aXJlRnVuY3Rpb24oaW52b2tlclNpZ25hdHVyZSxyYXdJbnZva2VyKTt3aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxbcmF3Q2xhc3NUeXBlXSxmdW5jdGlvbihjbGFzc1R5cGUpe2NsYXNzVHlwZT1jbGFzc1R5cGVbMF07dmFyIGh1bWFuTmFtZT1jbGFzc1R5cGUubmFtZSsiLiIrbWV0aG9kTmFtZTtpZihpc1B1cmVWaXJ0dWFsKXtjbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLnB1cmVWaXJ0dWFsRnVuY3Rpb25zLnB1c2gobWV0aG9kTmFtZSl9ZnVuY3Rpb24gdW5ib3VuZFR5cGVzSGFuZGxlcigpe3Rocm93VW5ib3VuZFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgIitodW1hbk5hbWUrIiBkdWUgdG8gdW5ib3VuZCB0eXBlcyIscmF3QXJnVHlwZXMpfXZhciBwcm90bz1jbGFzc1R5cGUucmVnaXN0ZXJlZENsYXNzLmluc3RhbmNlUHJvdG90eXBlO3ZhciBtZXRob2Q9cHJvdG9bbWV0aG9kTmFtZV07aWYodW5kZWZpbmVkPT09bWV0aG9kfHx1bmRlZmluZWQ9PT1tZXRob2Qub3ZlcmxvYWRUYWJsZSYmbWV0aG9kLmNsYXNzTmFtZSE9PWNsYXNzVHlwZS5uYW1lJiZtZXRob2QuYXJnQ291bnQ9PT1hcmdDb3VudC0yKXt1bmJvdW5kVHlwZXNIYW5kbGVyLmFyZ0NvdW50PWFyZ0NvdW50LTI7dW5ib3VuZFR5cGVzSGFuZGxlci5jbGFzc05hbWU9Y2xhc3NUeXBlLm5hbWU7cHJvdG9bbWV0aG9kTmFtZV09dW5ib3VuZFR5cGVzSGFuZGxlcn1lbHNle2Vuc3VyZU92ZXJsb2FkVGFibGUocHJvdG8sbWV0aG9kTmFtZSxodW1hbk5hbWUpO3Byb3RvW21ldGhvZE5hbWVdLm92ZXJsb2FkVGFibGVbYXJnQ291bnQtMl09dW5ib3VuZFR5cGVzSGFuZGxlcn13aGVuRGVwZW5kZW50VHlwZXNBcmVSZXNvbHZlZChbXSxyYXdBcmdUeXBlcyxmdW5jdGlvbihhcmdUeXBlcyl7dmFyIG1lbWJlckZ1bmN0aW9uPWNyYWZ0SW52b2tlckZ1bmN0aW9uKGh1bWFuTmFtZSxhcmdUeXBlcyxjbGFzc1R5cGUscmF3SW52b2tlcixjb250ZXh0KTtpZih1bmRlZmluZWQ9PT1wcm90b1ttZXRob2ROYW1lXS5vdmVybG9hZFRhYmxlKXttZW1iZXJGdW5jdGlvbi5hcmdDb3VudD1hcmdDb3VudC0yO3Byb3RvW21ldGhvZE5hbWVdPW1lbWJlckZ1bmN0aW9ufWVsc2V7cHJvdG9bbWV0aG9kTmFtZV0ub3ZlcmxvYWRUYWJsZVthcmdDb3VudC0yXT1tZW1iZXJGdW5jdGlvbn1yZXR1cm5bXX0pO3JldHVybltdfSl9dmFyIGVtdmFsX2ZyZWVfbGlzdD1bXTt2YXIgZW12YWxfaGFuZGxlX2FycmF5PVt7fSx7dmFsdWU6dW5kZWZpbmVkfSx7dmFsdWU6bnVsbH0se3ZhbHVlOnRydWV9LHt2YWx1ZTpmYWxzZX1dO2Z1bmN0aW9uIF9fZW12YWxfZGVjcmVmKGhhbmRsZSl7aWYoaGFuZGxlPjQmJjA9PT0tLWVtdmFsX2hhbmRsZV9hcnJheVtoYW5kbGVdLnJlZmNvdW50KXtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXT11bmRlZmluZWQ7ZW12YWxfZnJlZV9saXN0LnB1c2goaGFuZGxlKX19ZnVuY3Rpb24gY291bnRfZW12YWxfaGFuZGxlcygpe3ZhciBjb3VudD0wO2Zvcih2YXIgaT01O2k8ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDsrK2kpe2lmKGVtdmFsX2hhbmRsZV9hcnJheVtpXSE9PXVuZGVmaW5lZCl7Kytjb3VudH19cmV0dXJuIGNvdW50fWZ1bmN0aW9uIGdldF9maXJzdF9lbXZhbCgpe2Zvcih2YXIgaT01O2k8ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDsrK2kpe2lmKGVtdmFsX2hhbmRsZV9hcnJheVtpXSE9PXVuZGVmaW5lZCl7cmV0dXJuIGVtdmFsX2hhbmRsZV9hcnJheVtpXX19cmV0dXJuIG51bGx9ZnVuY3Rpb24gaW5pdF9lbXZhbCgpe01vZHVsZVsiY291bnRfZW12YWxfaGFuZGxlcyJdPWNvdW50X2VtdmFsX2hhbmRsZXM7TW9kdWxlWyJnZXRfZmlyc3RfZW12YWwiXT1nZXRfZmlyc3RfZW12YWx9ZnVuY3Rpb24gX19lbXZhbF9yZWdpc3Rlcih2YWx1ZSl7c3dpdGNoKHZhbHVlKXtjYXNlIHVuZGVmaW5lZDp7cmV0dXJuIDF9Y2FzZSBudWxsOntyZXR1cm4gMn1jYXNlIHRydWU6e3JldHVybiAzfWNhc2UgZmFsc2U6e3JldHVybiA0fWRlZmF1bHQ6e3ZhciBoYW5kbGU9ZW12YWxfZnJlZV9saXN0Lmxlbmd0aD9lbXZhbF9mcmVlX2xpc3QucG9wKCk6ZW12YWxfaGFuZGxlX2FycmF5Lmxlbmd0aDtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXT17cmVmY291bnQ6MSx2YWx1ZTp2YWx1ZX07cmV0dXJuIGhhbmRsZX19fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2VtdmFsKHJhd1R5cGUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24oaGFuZGxlKXt2YXIgcnY9ZW12YWxfaGFuZGxlX2FycmF5W2hhbmRsZV0udmFsdWU7X19lbXZhbF9kZWNyZWYoaGFuZGxlKTtyZXR1cm4gcnZ9LCJ0b1dpcmVUeXBlIjpmdW5jdGlvbihkZXN0cnVjdG9ycyx2YWx1ZSl7cmV0dXJuIF9fZW12YWxfcmVnaXN0ZXIodmFsdWUpfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIGVudW1SZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LHNpZ25lZCl7c3dpdGNoKHNoaWZ0KXtjYXNlIDA6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwPXNpZ25lZD9IRUFQODpIRUFQVTg7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKGhlYXBbcG9pbnRlcl0pfTtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3ZhciBoZWFwPXNpZ25lZD9IRUFQMTY6SEVBUFUxNjtyZXR1cm4gdGhpc1siZnJvbVdpcmVUeXBlIl0oaGVhcFtwb2ludGVyPj4xXSl9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7dmFyIGhlYXA9c2lnbmVkP0hFQVAzMjpIRUFQVTMyO3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShoZWFwW3BvaW50ZXI+PjJdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKCJVbmtub3duIGludGVnZXIgdHlwZTogIituYW1lKX19ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfZW51bShyYXdUeXBlLG5hbWUsc2l6ZSxpc1NpZ25lZCl7dmFyIHNoaWZ0PWdldFNoaWZ0RnJvbVNpemUoc2l6ZSk7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO2Z1bmN0aW9uIGN0b3IoKXt9Y3Rvci52YWx1ZXM9e307cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSxjb25zdHJ1Y3RvcjpjdG9yLCJmcm9tV2lyZVR5cGUiOmZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmNvbnN0cnVjdG9yLnZhbHVlc1tjXX0sInRvV2lyZVR5cGUiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLGMpe3JldHVybiBjLnZhbHVlfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjplbnVtUmVhZFZhbHVlRnJvbVBvaW50ZXIobmFtZSxzaGlmdCxpc1NpZ25lZCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KTtleHBvc2VQdWJsaWNTeW1ib2wobmFtZSxjdG9yKX1mdW5jdGlvbiByZXF1aXJlUmVnaXN0ZXJlZFR5cGUocmF3VHlwZSxodW1hbk5hbWUpe3ZhciBpbXBsPXJlZ2lzdGVyZWRUeXBlc1tyYXdUeXBlXTtpZih1bmRlZmluZWQ9PT1pbXBsKXt0aHJvd0JpbmRpbmdFcnJvcihodW1hbk5hbWUrIiBoYXMgdW5rbm93biB0eXBlICIrZ2V0VHlwZU5hbWUocmF3VHlwZSkpfXJldHVybiBpbXBsfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2VudW1fdmFsdWUocmF3RW51bVR5cGUsbmFtZSxlbnVtVmFsdWUpe3ZhciBlbnVtVHlwZT1yZXF1aXJlUmVnaXN0ZXJlZFR5cGUocmF3RW51bVR5cGUsImVudW0iKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7dmFyIEVudW09ZW51bVR5cGUuY29uc3RydWN0b3I7dmFyIFZhbHVlPU9iamVjdC5jcmVhdGUoZW51bVR5cGUuY29uc3RydWN0b3IucHJvdG90eXBlLHt2YWx1ZTp7dmFsdWU6ZW51bVZhbHVlfSxjb25zdHJ1Y3Rvcjp7dmFsdWU6Y3JlYXRlTmFtZWRGdW5jdGlvbihlbnVtVHlwZS5uYW1lKyJfIituYW1lLGZ1bmN0aW9uKCl7fSl9fSk7RW51bS52YWx1ZXNbZW51bVZhbHVlXT1WYWx1ZTtFbnVtW25hbWVdPVZhbHVlfWZ1bmN0aW9uIF9lbWJpbmRfcmVwcih2KXtpZih2PT09bnVsbCl7cmV0dXJuIm51bGwifXZhciB0PXR5cGVvZiB2O2lmKHQ9PT0ib2JqZWN0Inx8dD09PSJhcnJheSJ8fHQ9PT0iZnVuY3Rpb24iKXtyZXR1cm4gdi50b1N0cmluZygpfWVsc2V7cmV0dXJuIiIrdn19ZnVuY3Rpb24gZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0KXtzd2l0Y2goc2hpZnQpe2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24ocG9pbnRlcil7cmV0dXJuIHRoaXNbImZyb21XaXJlVHlwZSJdKEhFQVBGMzJbcG9pbnRlcj4+Ml0pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKHBvaW50ZXIpe3JldHVybiB0aGlzWyJmcm9tV2lyZVR5cGUiXShIRUFQRjY0W3BvaW50ZXI+PjNdKX07ZGVmYXVsdDp0aHJvdyBuZXcgVHlwZUVycm9yKCJVbmtub3duIGZsb2F0IHR5cGU6ICIrbmFtZSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0KHJhd1R5cGUsbmFtZSxzaXplKXt2YXIgc2hpZnQ9Z2V0U2hpZnRGcm9tU2l6ZShzaXplKTtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpmdW5jdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHR5cGVvZiB2YWx1ZSE9PSJudW1iZXIiJiZ0eXBlb2YgdmFsdWUhPT0iYm9vbGVhbiIpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0ICInK19lbWJpbmRfcmVwcih2YWx1ZSkrJyIgdG8gJyt0aGlzLm5hbWUpfXJldHVybiB2YWx1ZX0sImFyZ1BhY2tBZHZhbmNlIjo4LCJyZWFkVmFsdWVGcm9tUG9pbnRlciI6ZmxvYXRSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0KSxkZXN0cnVjdG9yRnVuY3Rpb246bnVsbH0pfWZ1bmN0aW9uIGludGVnZXJSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LHNpZ25lZCl7c3dpdGNoKHNoaWZ0KXtjYXNlIDA6cmV0dXJuIHNpZ25lZD9mdW5jdGlvbiByZWFkUzhGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDhbcG9pbnRlcl19OmZ1bmN0aW9uIHJlYWRVOEZyb21Qb2ludGVyKHBvaW50ZXIpe3JldHVybiBIRUFQVThbcG9pbnRlcl19O2Nhc2UgMTpyZXR1cm4gc2lnbmVkP2Z1bmN0aW9uIHJlYWRTMTZGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDE2W3BvaW50ZXI+PjFdfTpmdW5jdGlvbiByZWFkVTE2RnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIEhFQVBVMTZbcG9pbnRlcj4+MV19O2Nhc2UgMjpyZXR1cm4gc2lnbmVkP2Z1bmN0aW9uIHJlYWRTMzJGcm9tUG9pbnRlcihwb2ludGVyKXtyZXR1cm4gSEVBUDMyW3BvaW50ZXI+PjJdfTpmdW5jdGlvbiByZWFkVTMyRnJvbVBvaW50ZXIocG9pbnRlcil7cmV0dXJuIEhFQVBVMzJbcG9pbnRlcj4+Ml19O2RlZmF1bHQ6dGhyb3cgbmV3IFR5cGVFcnJvcigiVW5rbm93biBpbnRlZ2VyIHR5cGU6ICIrbmFtZSl9fWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIocHJpbWl0aXZlVHlwZSxuYW1lLHNpemUsbWluUmFuZ2UsbWF4UmFuZ2Upe25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTtpZihtYXhSYW5nZT09PS0xKXttYXhSYW5nZT00Mjk0OTY3Mjk1fXZhciBzaGlmdD1nZXRTaGlmdEZyb21TaXplKHNpemUpO3ZhciBmcm9tV2lyZVR5cGU9ZnVuY3Rpb24odmFsdWUpe3JldHVybiB2YWx1ZX07aWYobWluUmFuZ2U9PT0wKXt2YXIgYml0c2hpZnQ9MzItOCpzaXplO2Zyb21XaXJlVHlwZT1mdW5jdGlvbih2YWx1ZSl7cmV0dXJuIHZhbHVlPDxiaXRzaGlmdD4+PmJpdHNoaWZ0fX12YXIgaXNVbnNpZ25lZFR5cGU9bmFtZS5pbmRleE9mKCJ1bnNpZ25lZCIpIT0tMTtyZWdpc3RlclR5cGUocHJpbWl0aXZlVHlwZSx7bmFtZTpuYW1lLCJmcm9tV2lyZVR5cGUiOmZyb21XaXJlVHlwZSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHR5cGVvZiB2YWx1ZSE9PSJudW1iZXIiJiZ0eXBlb2YgdmFsdWUhPT0iYm9vbGVhbiIpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0ICInK19lbWJpbmRfcmVwcih2YWx1ZSkrJyIgdG8gJyt0aGlzLm5hbWUpfWlmKHZhbHVlPG1pblJhbmdlfHx2YWx1ZT5tYXhSYW5nZSl7dGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2luZyBhIG51bWJlciAiJytfZW1iaW5kX3JlcHIodmFsdWUpKyciIGZyb20gSlMgc2lkZSB0byBDL0MrKyBzaWRlIHRvIGFuIGFyZ3VtZW50IG9mIHR5cGUgIicrbmFtZSsnIiwgd2hpY2ggaXMgb3V0c2lkZSB0aGUgdmFsaWQgcmFuZ2UgWycrbWluUmFuZ2UrIiwgIittYXhSYW5nZSsiXSEiKX1yZXR1cm4gaXNVbnNpZ25lZFR5cGU/dmFsdWU+Pj4wOnZhbHVlfDB9LCJhcmdQYWNrQWR2YW5jZSI6OCwicmVhZFZhbHVlRnJvbVBvaW50ZXIiOmludGVnZXJSZWFkVmFsdWVGcm9tUG9pbnRlcihuYW1lLHNoaWZ0LG1pblJhbmdlIT09MCksZGVzdHJ1Y3RvckZ1bmN0aW9uOm51bGx9KX1mdW5jdGlvbiBfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldyhyYXdUeXBlLGRhdGFUeXBlSW5kZXgsbmFtZSl7dmFyIHR5cGVNYXBwaW5nPVtJbnQ4QXJyYXksVWludDhBcnJheSxJbnQxNkFycmF5LFVpbnQxNkFycmF5LEludDMyQXJyYXksVWludDMyQXJyYXksRmxvYXQzMkFycmF5LEZsb2F0NjRBcnJheV07dmFyIFRBPXR5cGVNYXBwaW5nW2RhdGFUeXBlSW5kZXhdO2Z1bmN0aW9uIGRlY29kZU1lbW9yeVZpZXcoaGFuZGxlKXtoYW5kbGU9aGFuZGxlPj4yO3ZhciBoZWFwPUhFQVBVMzI7dmFyIHNpemU9aGVhcFtoYW5kbGVdO3ZhciBkYXRhPWhlYXBbaGFuZGxlKzFdO3JldHVybiBuZXcgVEEoYnVmZmVyLGRhdGEsc2l6ZSl9bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZGVjb2RlTWVtb3J5VmlldywiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpkZWNvZGVNZW1vcnlWaWV3fSx7aWdub3JlRHVwbGljYXRlUmVnaXN0cmF0aW9uczp0cnVlfSl9ZnVuY3Rpb24gX19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZyhyYXdUeXBlLG5hbWUpe25hbWU9cmVhZExhdGluMVN0cmluZyhuYW1lKTt2YXIgc3RkU3RyaW5nSXNVVEY4PW5hbWU9PT0ic3RkOjpzdHJpbmciO3JlZ2lzdGVyVHlwZShyYXdUeXBlLHtuYW1lOm5hbWUsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24odmFsdWUpe3ZhciBsZW5ndGg9SEVBUFUzMlt2YWx1ZT4+Ml07dmFyIHN0cjtpZihzdGRTdHJpbmdJc1VURjgpe3ZhciBkZWNvZGVTdGFydFB0cj12YWx1ZSs0O2Zvcih2YXIgaT0wO2k8PWxlbmd0aDsrK2kpe3ZhciBjdXJyZW50Qnl0ZVB0cj12YWx1ZSs0K2k7aWYoaT09bGVuZ3RofHxIRUFQVThbY3VycmVudEJ5dGVQdHJdPT0wKXt2YXIgbWF4UmVhZD1jdXJyZW50Qnl0ZVB0ci1kZWNvZGVTdGFydFB0cjt2YXIgc3RyaW5nU2VnbWVudD1VVEY4VG9TdHJpbmcoZGVjb2RlU3RhcnRQdHIsbWF4UmVhZCk7aWYoc3RyPT09dW5kZWZpbmVkKXtzdHI9c3RyaW5nU2VnbWVudH1lbHNle3N0cis9U3RyaW5nLmZyb21DaGFyQ29kZSgwKTtzdHIrPXN0cmluZ1NlZ21lbnR9ZGVjb2RlU3RhcnRQdHI9Y3VycmVudEJ5dGVQdHIrMX19fWVsc2V7dmFyIGE9bmV3IEFycmF5KGxlbmd0aCk7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXthW2ldPVN0cmluZy5mcm9tQ2hhckNvZGUoSEVBUFU4W3ZhbHVlKzQraV0pfXN0cj1hLmpvaW4oIiIpfV9mcmVlKHZhbHVlKTtyZXR1cm4gc3RyfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsdmFsdWUpe2lmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpe3ZhbHVlPW5ldyBVaW50OEFycmF5KHZhbHVlKX12YXIgZ2V0TGVuZ3RoO3ZhciB2YWx1ZUlzT2ZUeXBlU3RyaW5nPXR5cGVvZiB2YWx1ZT09PSJzdHJpbmciO2lmKCEodmFsdWVJc09mVHlwZVN0cmluZ3x8dmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIFVpbnQ4Q2xhbXBlZEFycmF5fHx2YWx1ZSBpbnN0YW5jZW9mIEludDhBcnJheSkpe3Rocm93QmluZGluZ0Vycm9yKCJDYW5ub3QgcGFzcyBub24tc3RyaW5nIHRvIHN0ZDo6c3RyaW5nIil9aWYoc3RkU3RyaW5nSXNVVEY4JiZ2YWx1ZUlzT2ZUeXBlU3RyaW5nKXtnZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gbGVuZ3RoQnl0ZXNVVEY4KHZhbHVlKX19ZWxzZXtnZXRMZW5ndGg9ZnVuY3Rpb24oKXtyZXR1cm4gdmFsdWUubGVuZ3RofX12YXIgbGVuZ3RoPWdldExlbmd0aCgpO3ZhciBwdHI9X21hbGxvYyg0K2xlbmd0aCsxKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoO2lmKHN0ZFN0cmluZ0lzVVRGOCYmdmFsdWVJc09mVHlwZVN0cmluZyl7c3RyaW5nVG9VVEY4KHZhbHVlLHB0cis0LGxlbmd0aCsxKX1lbHNle2lmKHZhbHVlSXNPZlR5cGVTdHJpbmcpe2Zvcih2YXIgaT0wO2k8bGVuZ3RoOysraSl7dmFyIGNoYXJDb2RlPXZhbHVlLmNoYXJDb2RlQXQoaSk7aWYoY2hhckNvZGU+MjU1KXtfZnJlZShwdHIpO3Rocm93QmluZGluZ0Vycm9yKCJTdHJpbmcgaGFzIFVURi0xNiBjb2RlIHVuaXRzIHRoYXQgZG8gbm90IGZpdCBpbiA4IGJpdHMiKX1IRUFQVThbcHRyKzQraV09Y2hhckNvZGV9fWVsc2V7Zm9yKHZhciBpPTA7aTxsZW5ndGg7KytpKXtIRUFQVThbcHRyKzQraV09dmFsdWVbaV19fX1pZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKX1yZXR1cm4gcHRyfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246ZnVuY3Rpb24ocHRyKXtfZnJlZShwdHIpfX0pfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nKHJhd1R5cGUsY2hhclNpemUsbmFtZSl7bmFtZT1yZWFkTGF0aW4xU3RyaW5nKG5hbWUpO3ZhciBkZWNvZGVTdHJpbmcsZW5jb2RlU3RyaW5nLGdldEhlYXAsbGVuZ3RoQnl0ZXNVVEYsc2hpZnQ7aWYoY2hhclNpemU9PT0yKXtkZWNvZGVTdHJpbmc9VVRGMTZUb1N0cmluZztlbmNvZGVTdHJpbmc9c3RyaW5nVG9VVEYxNjtsZW5ndGhCeXRlc1VURj1sZW5ndGhCeXRlc1VURjE2O2dldEhlYXA9ZnVuY3Rpb24oKXtyZXR1cm4gSEVBUFUxNn07c2hpZnQ9MX1lbHNlIGlmKGNoYXJTaXplPT09NCl7ZGVjb2RlU3RyaW5nPVVURjMyVG9TdHJpbmc7ZW5jb2RlU3RyaW5nPXN0cmluZ1RvVVRGMzI7bGVuZ3RoQnl0ZXNVVEY9bGVuZ3RoQnl0ZXNVVEYzMjtnZXRIZWFwPWZ1bmN0aW9uKCl7cmV0dXJuIEhFQVBVMzJ9O3NoaWZ0PTJ9cmVnaXN0ZXJUeXBlKHJhd1R5cGUse25hbWU6bmFtZSwiZnJvbVdpcmVUeXBlIjpmdW5jdGlvbih2YWx1ZSl7dmFyIGxlbmd0aD1IRUFQVTMyW3ZhbHVlPj4yXTt2YXIgSEVBUD1nZXRIZWFwKCk7dmFyIHN0cjt2YXIgZGVjb2RlU3RhcnRQdHI9dmFsdWUrNDtmb3IodmFyIGk9MDtpPD1sZW5ndGg7KytpKXt2YXIgY3VycmVudEJ5dGVQdHI9dmFsdWUrNCtpKmNoYXJTaXplO2lmKGk9PWxlbmd0aHx8SEVBUFtjdXJyZW50Qnl0ZVB0cj4+c2hpZnRdPT0wKXt2YXIgbWF4UmVhZEJ5dGVzPWN1cnJlbnRCeXRlUHRyLWRlY29kZVN0YXJ0UHRyO3ZhciBzdHJpbmdTZWdtZW50PWRlY29kZVN0cmluZyhkZWNvZGVTdGFydFB0cixtYXhSZWFkQnl0ZXMpO2lmKHN0cj09PXVuZGVmaW5lZCl7c3RyPXN0cmluZ1NlZ21lbnR9ZWxzZXtzdHIrPVN0cmluZy5mcm9tQ2hhckNvZGUoMCk7c3RyKz1zdHJpbmdTZWdtZW50fWRlY29kZVN0YXJ0UHRyPWN1cnJlbnRCeXRlUHRyK2NoYXJTaXplfX1fZnJlZSh2YWx1ZSk7cmV0dXJuIHN0cn0sInRvV2lyZVR5cGUiOmZ1bmN0aW9uKGRlc3RydWN0b3JzLHZhbHVlKXtpZighKHR5cGVvZiB2YWx1ZT09PSJzdHJpbmciKSl7dGhyb3dCaW5kaW5nRXJyb3IoIkNhbm5vdCBwYXNzIG5vbi1zdHJpbmcgdG8gQysrIHN0cmluZyB0eXBlICIrbmFtZSl9dmFyIGxlbmd0aD1sZW5ndGhCeXRlc1VURih2YWx1ZSk7dmFyIHB0cj1fbWFsbG9jKDQrbGVuZ3RoK2NoYXJTaXplKTtIRUFQVTMyW3B0cj4+Ml09bGVuZ3RoPj5zaGlmdDtlbmNvZGVTdHJpbmcodmFsdWUscHRyKzQsbGVuZ3RoK2NoYXJTaXplKTtpZihkZXN0cnVjdG9ycyE9PW51bGwpe2Rlc3RydWN0b3JzLnB1c2goX2ZyZWUscHRyKX1yZXR1cm4gcHRyfSwiYXJnUGFja0FkdmFuY2UiOjgsInJlYWRWYWx1ZUZyb21Qb2ludGVyIjpzaW1wbGVSZWFkVmFsdWVGcm9tUG9pbnRlcixkZXN0cnVjdG9yRnVuY3Rpb246ZnVuY3Rpb24ocHRyKXtfZnJlZShwdHIpfX0pfWZ1bmN0aW9uIF9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQocmF3VHlwZSxuYW1lKXtuYW1lPXJlYWRMYXRpbjFTdHJpbmcobmFtZSk7cmVnaXN0ZXJUeXBlKHJhd1R5cGUse2lzVm9pZDp0cnVlLG5hbWU6bmFtZSwiYXJnUGFja0FkdmFuY2UiOjAsImZyb21XaXJlVHlwZSI6ZnVuY3Rpb24oKXtyZXR1cm4gdW5kZWZpbmVkfSwidG9XaXJlVHlwZSI6ZnVuY3Rpb24oZGVzdHJ1Y3RvcnMsbyl7cmV0dXJuIHVuZGVmaW5lZH19KX1mdW5jdGlvbiBfX2VtdmFsX2luY3JlZihoYW5kbGUpe2lmKGhhbmRsZT40KXtlbXZhbF9oYW5kbGVfYXJyYXlbaGFuZGxlXS5yZWZjb3VudCs9MX19ZnVuY3Rpb24gX19lbXZhbF90YWtlX3ZhbHVlKHR5cGUsYXJndil7dHlwZT1yZXF1aXJlUmVnaXN0ZXJlZFR5cGUodHlwZSwiX2VtdmFsX3Rha2VfdmFsdWUiKTt2YXIgdj10eXBlWyJyZWFkVmFsdWVGcm9tUG9pbnRlciJdKGFyZ3YpO3JldHVybiBfX2VtdmFsX3JlZ2lzdGVyKHYpfWZ1bmN0aW9uIF9hYm9ydCgpe2Fib3J0KCl9dmFyIF9lbXNjcmlwdGVuX2dldF9ub3c7X2Vtc2NyaXB0ZW5fZ2V0X25vdz1mdW5jdGlvbigpe3JldHVybiBwZXJmb3JtYW5jZS5ub3coKX07dmFyIF9lbXNjcmlwdGVuX2dldF9ub3dfaXNfbW9ub3RvbmljPXRydWU7ZnVuY3Rpb24gc2V0RXJyTm8odmFsdWUpe0hFQVAzMltfX19lcnJub19sb2NhdGlvbigpPj4yXT12YWx1ZTtyZXR1cm4gdmFsdWV9ZnVuY3Rpb24gX2Nsb2NrX2dldHRpbWUoY2xrX2lkLHRwKXt2YXIgbm93O2lmKGNsa19pZD09PTApe25vdz1EYXRlLm5vdygpfWVsc2UgaWYoKGNsa19pZD09PTF8fGNsa19pZD09PTQpJiZfZW1zY3JpcHRlbl9nZXRfbm93X2lzX21vbm90b25pYyl7bm93PV9lbXNjcmlwdGVuX2dldF9ub3coKX1lbHNle3NldEVyck5vKDI4KTtyZXR1cm4tMX1IRUFQMzJbdHA+PjJdPW5vdy8xZTN8MDtIRUFQMzJbdHArND4+Ml09bm93JTFlMyoxZTMqMWUzfDA7cmV0dXJuIDB9ZnVuY3Rpb24gX2Vtc2NyaXB0ZW5fbWVtY3B5X2JpZyhkZXN0LHNyYyxudW0pe0hFQVBVOC5jb3B5V2l0aGluKGRlc3Qsc3JjLHNyYytudW0pfWZ1bmN0aW9uIGFib3J0T25DYW5ub3RHcm93TWVtb3J5KHJlcXVlc3RlZFNpemUpe2Fib3J0KCJPT00iKX1mdW5jdGlvbiBfZW1zY3JpcHRlbl9yZXNpemVfaGVhcChyZXF1ZXN0ZWRTaXplKXthYm9ydE9uQ2Fubm90R3Jvd01lbW9yeShyZXF1ZXN0ZWRTaXplKX12YXIgU1lTQ0FMTFM9e21hcHBpbmdzOnt9LGJ1ZmZlcnM6W251bGwsW10sW11dLHByaW50Q2hhcjpmdW5jdGlvbihzdHJlYW0sY3Vycil7dmFyIGJ1ZmZlcj1TWVNDQUxMUy5idWZmZXJzW3N0cmVhbV07aWYoY3Vycj09PTB8fGN1cnI9PT0xMCl7KHN0cmVhbT09PTE/b3V0OmVycikoVVRGOEFycmF5VG9TdHJpbmcoYnVmZmVyLDApKTtidWZmZXIubGVuZ3RoPTB9ZWxzZXtidWZmZXIucHVzaChjdXJyKX19LHZhcmFyZ3M6dW5kZWZpbmVkLGdldDpmdW5jdGlvbigpe1NZU0NBTExTLnZhcmFyZ3MrPTQ7dmFyIHJldD1IRUFQMzJbU1lTQ0FMTFMudmFyYXJncy00Pj4yXTtyZXR1cm4gcmV0fSxnZXRTdHI6ZnVuY3Rpb24ocHRyKXt2YXIgcmV0PVVURjhUb1N0cmluZyhwdHIpO3JldHVybiByZXR9LGdldDY0OmZ1bmN0aW9uKGxvdyxoaWdoKXtyZXR1cm4gbG93fX07ZnVuY3Rpb24gX2ZkX2Nsb3NlKGZkKXtyZXR1cm4gMH1mdW5jdGlvbiBfZmRfc2VlayhmZCxvZmZzZXRfbG93LG9mZnNldF9oaWdoLHdoZW5jZSxuZXdPZmZzZXQpe31mdW5jdGlvbiBfZmRfd3JpdGUoZmQsaW92LGlvdmNudCxwbnVtKXt2YXIgbnVtPTA7Zm9yKHZhciBpPTA7aTxpb3ZjbnQ7aSsrKXt2YXIgcHRyPUhFQVAzMltpb3YraSo4Pj4yXTt2YXIgbGVuPUhFQVAzMltpb3YrKGkqOCs0KT4+Ml07Zm9yKHZhciBqPTA7ajxsZW47aisrKXtTWVNDQUxMUy5wcmludENoYXIoZmQsSEVBUFU4W3B0citqXSl9bnVtKz1sZW59SEVBUDMyW3BudW0+PjJdPW51bTtyZXR1cm4gMH1mdW5jdGlvbiBfc2V0VGVtcFJldDAoJGkpe3NldFRlbXBSZXQwKCRpfDApfWZ1bmN0aW9uIF90aW1lKHB0cil7dmFyIHJldD1EYXRlLm5vdygpLzFlM3wwO2lmKHB0cil7SEVBUDMyW3B0cj4+Ml09cmV0fXJldHVybiByZXR9ZW1iaW5kX2luaXRfY2hhckNvZGVzKCk7QmluZGluZ0Vycm9yPU1vZHVsZVsiQmluZGluZ0Vycm9yIl09ZXh0ZW5kRXJyb3IoRXJyb3IsIkJpbmRpbmdFcnJvciIpO0ludGVybmFsRXJyb3I9TW9kdWxlWyJJbnRlcm5hbEVycm9yIl09ZXh0ZW5kRXJyb3IoRXJyb3IsIkludGVybmFsRXJyb3IiKTtpbml0X0NsYXNzSGFuZGxlKCk7aW5pdF9SZWdpc3RlcmVkUG9pbnRlcigpO2luaXRfZW1iaW5kKCk7VW5ib3VuZFR5cGVFcnJvcj1Nb2R1bGVbIlVuYm91bmRUeXBlRXJyb3IiXT1leHRlbmRFcnJvcihFcnJvciwiVW5ib3VuZFR5cGVFcnJvciIpO2luaXRfZW12YWwoKTt2YXIgYXNtTGlicmFyeUFyZz17ImMiOl9fX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24sImIiOl9fX2N4YV90aHJvdywieSI6X19lbWJpbmRfcmVnaXN0ZXJfYm9vbCwiZyI6X19lbWJpbmRfcmVnaXN0ZXJfY2xhc3MsImYiOl9fZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NvbnN0cnVjdG9yLCJhIjpfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbiwieCI6X19lbWJpbmRfcmVnaXN0ZXJfZW12YWwsIkEiOl9fZW1iaW5kX3JlZ2lzdGVyX2VudW0sImsiOl9fZW1iaW5kX3JlZ2lzdGVyX2VudW1fdmFsdWUsIm8iOl9fZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0LCJlIjpfX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyLCJkIjpfX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldywicCI6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZywiaiI6X19lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcsInoiOl9fZW1iaW5kX3JlZ2lzdGVyX3ZvaWQsImwiOl9fZW12YWxfZGVjcmVmLCJtIjpfX2VtdmFsX2luY3JlZiwiaCI6X19lbXZhbF90YWtlX3ZhbHVlLCJpIjpfYWJvcnQsInYiOl9jbG9ja19nZXR0aW1lLCJ0IjpfZW1zY3JpcHRlbl9tZW1jcHlfYmlnLCJ1IjpfZW1zY3JpcHRlbl9yZXNpemVfaGVhcCwidyI6X2ZkX2Nsb3NlLCJyIjpfZmRfc2VlaywibiI6X2ZkX3dyaXRlLCJzIjpfc2V0VGVtcFJldDAsInEiOl90aW1lfTt2YXIgYXNtPWNyZWF0ZVdhc20oKTt2YXIgX19fd2FzbV9jYWxsX2N0b3JzPU1vZHVsZVsiX19fd2FzbV9jYWxsX2N0b3JzIl09YXNtWyJDIl07dmFyIF9tYWxsb2M9TW9kdWxlWyJfbWFsbG9jIl09YXNtWyJEIl07dmFyIF9fX2dldFR5cGVOYW1lPU1vZHVsZVsiX19fZ2V0VHlwZU5hbWUiXT1hc21bIkYiXTt2YXIgX19fZW1iaW5kX3JlZ2lzdGVyX25hdGl2ZV9hbmRfYnVpbHRpbl90eXBlcz1Nb2R1bGVbIl9fX2VtYmluZF9yZWdpc3Rlcl9uYXRpdmVfYW5kX2J1aWx0aW5fdHlwZXMiXT1hc21bIkciXTt2YXIgX19fZXJybm9fbG9jYXRpb249TW9kdWxlWyJfX19lcnJub19sb2NhdGlvbiJdPWFzbVsiSCJdO3ZhciBfZnJlZT1Nb2R1bGVbIl9mcmVlIl09YXNtWyJJIl07dmFyIGR5bkNhbGxfamlqaT1Nb2R1bGVbImR5bkNhbGxfamlqaSJdPWFzbVsiSiJdO3ZhciBjYWxsZWRSdW47ZGVwZW5kZW5jaWVzRnVsZmlsbGVkPWZ1bmN0aW9uIHJ1bkNhbGxlcigpe2lmKCFjYWxsZWRSdW4pcnVuKCk7aWYoIWNhbGxlZFJ1bilkZXBlbmRlbmNpZXNGdWxmaWxsZWQ9cnVuQ2FsbGVyfTtmdW5jdGlvbiBydW4oYXJncyl7YXJncz1hcmdzfHxhcmd1bWVudHNfO2lmKHJ1bkRlcGVuZGVuY2llcz4wKXtyZXR1cm59cHJlUnVuKCk7aWYocnVuRGVwZW5kZW5jaWVzPjApe3JldHVybn1mdW5jdGlvbiBkb1J1bigpe2lmKGNhbGxlZFJ1bilyZXR1cm47Y2FsbGVkUnVuPXRydWU7TW9kdWxlWyJjYWxsZWRSdW4iXT10cnVlO2lmKEFCT1JUKXJldHVybjtpbml0UnVudGltZSgpO3ByZU1haW4oKTtyZWFkeVByb21pc2VSZXNvbHZlKE1vZHVsZSk7aWYoTW9kdWxlWyJvblJ1bnRpbWVJbml0aWFsaXplZCJdKU1vZHVsZVsib25SdW50aW1lSW5pdGlhbGl6ZWQiXSgpO3Bvc3RSdW4oKX1pZihNb2R1bGVbInNldFN0YXR1cyJdKXtNb2R1bGVbInNldFN0YXR1cyJdKCJSdW5uaW5nLi4uIik7c2V0VGltZW91dChmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtNb2R1bGVbInNldFN0YXR1cyJdKCIiKX0sMSk7ZG9SdW4oKX0sMSl9ZWxzZXtkb1J1bigpfX1Nb2R1bGVbInJ1biJdPXJ1bjtpZihNb2R1bGVbInByZUluaXQiXSl7aWYodHlwZW9mIE1vZHVsZVsicHJlSW5pdCJdPT0iZnVuY3Rpb24iKU1vZHVsZVsicHJlSW5pdCJdPVtNb2R1bGVbInByZUluaXQiXV07d2hpbGUoTW9kdWxlWyJwcmVJbml0Il0ubGVuZ3RoPjApe01vZHVsZVsicHJlSW5pdCJdLnBvcCgpKCl9fXJ1bigpOwoKCiAgcmV0dXJuIE1vZHVsZQp9Cik7Cn0pKCk7Ci8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gY29uc3QgUnVudGltZSA9IChNb2R1bGUpOwo7Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvd29ya2VyL1V0aWxzLmpzCi8qKgogKiBBdXhpbGlhciBtZXRob2QgdG8gZGVsZXRlIGEgV2ViQXNzZW1ibHkgU2lkZSBWYXJpYWJsZXMKICoKICogQHBhcmFtIHthcnJheX0gYXJyYXkgVGhlIGFycmF5IHdpdGggbiBlbGVtZW50cwogKi8KY29uc3QgZGVsZXRlV2FzbVZhciA9ICguLi5hcnJheSkgPT4gewogICAgYXJyYXkuZm9yRWFjaCgob2JqKSA9PiB7CiAgICAgICAgaWYgKG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqLmRlbGV0ZSAhPT0gInVuZGVmaW5lZCIpIHsKICAgICAgICAgICAgb2JqLmRlbGV0ZSgpOwogICAgICAgIH0KICAgIH0pOwp9OwoKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuLi9sb2dnZXJfbW9kdWxlL3NyYy9NYWluLmpzCmNvbnN0IExvZ2dlckxldmVsID0gewogICAgREVCVUc6IDAsCiAgICBJTkZPOiAxLAogICAgV0FSTklORzogMiwKICAgIEVSUk9SOiAzCn07CgpsZXQgX19sb2dnZXJUYWcgPSAiIjsKbGV0IF9fY3VycmVudExvZ2dpbmdMZXZlbCA9IExvZ2dlckxldmVsLldBUk5JTkc7CgoKY2xhc3MgTG9nZ2VyIHsKCiAgICBzdGF0aWMgcHJpbnREZWJ1ZyguLi52YWx1ZXMpIHsKICAgICAgICBpZiAoTG9nZ2VyTGV2ZWwuREVCVUcgPj0gX19jdXJyZW50TG9nZ2luZ0xldmVsKSB7CiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYDxEPiBbJHtfX2xvZ2dlclRhZ31dICR7dmFsdWVzfWApOwogICAgICAgIH0KICAgIH0KCiAgICBzdGF0aWMgcHJpbnRJbmZvKC4uLnZhbHVlcykgewogICAgICAgIGlmIChMb2dnZXJMZXZlbC5JTkZPID49IF9fY3VycmVudExvZ2dpbmdMZXZlbCkgewogICAgICAgICAgICBjb25zb2xlLmRlYnVnKGA8ST4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHByaW50V2FybmluZyguLi52YWx1ZXMpIHsKICAgICAgICBpZiAoTG9nZ2VyTGV2ZWwuV0FSTklORyA+PSBfX2N1cnJlbnRMb2dnaW5nTGV2ZWwpIHsKICAgICAgICAgICAgY29uc29sZS53YXJuKGA8Vz4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHByaW50RXJyb3IoLi4udmFsdWVzKSB7CiAgICAgICAgaWYgKExvZ2dlckxldmVsLkVSUk9SID49IF9fY3VycmVudExvZ2dpbmdMZXZlbCkgewogICAgICAgICAgICBjb25zb2xlLmVycm9yKGA8RT4gWyR7X19sb2dnZXJUYWd9XSAke3ZhbHVlc31gKTsKICAgICAgICB9CiAgICB9CgogICAgc3RhdGljIHNldExvZ2dlckxldmVsKGxvZ2dlckx2bCkgewogICAgICAgIF9fY3VycmVudExvZ2dpbmdMZXZlbCA9IGxvZ2dlckx2bDsKICAgIH0KCiAgICBzdGF0aWMgc2V0TG9nZ2VyVGFnKGxvZ2dlclRhZykgewogICAgICAgIF9fbG9nZ2VyVGFnID0gbG9nZ2VyVGFnOwogICAgfQp9CgoKOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL3dvcmtlci9FdmVudHMuanMKCgoKCmxldCBpbnN0YW5jZSA9IG51bGw7CmxldCBidW5kbGVQYXRoID0gIiI7CmxldCB0b2tlbml6ZXIgPSBudWxsOwoKY29uc3QgcHJlaW5pdGlhbGl6ZVdvcmtlciA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICBMb2dnZXIucHJpbnREZWJ1ZygiUmVjZWl2ZWQgbWVzc2FnZSBpbiAiICsgInByZUluaXQiICsgIiBldmVudCIpOwoKICAgIC8vIFByb2Nlc3MgaW5wdXQgdmFyaWFibGVzCiAgICBidW5kbGVQYXRoID0gbWVzc2FnZS5idW5kbGVQYXRoOwoKICAgIHRyeSB7CiAgICAgICAgLyoKICAgICAgICAgKiBBc3luYyBmZXRjaCBiZWZvcmUgZ2V0IHRoZSBpbnN0YW5jZQogICAgICAgICAqIAogICAgICAgICAqIEltcG9ydGFudDogRHVlIHRvIHRoZSBuZWVkIG9mIHBhY2thZ2luZyB0aGUgV29ya2VyIGluc2lkZSB0aGUgc2VscGhpLXdpZGdldC13ZWIubWluLmpzIHVzaW5nCiAgICAgICAgICogICAgICAgICAgICBXZWJQYWNrLCBpcyBuZWVkZWQgdG8gYnVpbGQgdGhlIGV4dHJhY3RvciB1c2luZyB0aGlzIHBhcmFtZXRlcnM6CiAgICAgICAgICoKICAgICAgICAgKiAtcyBFWFBPUlRfRVM2PTEgLXMgVVNFX0VTNl9JTVBPUlRfTUVUQT0wIC1zIFdBU01fQVNZTkNfQ09NUElMQVRJT049MCAtcyBFTlZJUk9OTUVOVD0id2ViIgogICAgICAgICAqLwogICAgICAgIGxldCB3YXNtTW9kdWxlID0gYXdhaXQgKGF3YWl0IGZldGNoKGJ1bmRsZVBhdGggKyAiL0ZCVG9rZW5pemVyLndhc20iKSkuYXJyYXlCdWZmZXIoKTsKCiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgbW9kdWxlIGluIGdsb2JhbHMgbW9kdWxlCiAgICAgICAgaW5zdGFuY2UgPSBhd2FpdCBSdW50aW1lKHsKICAgICAgICAgICAgd2FzbUJpbmFyeSA6IHdhc21Nb2R1bGUsCiAgICAgICAgICAgIG9uUnVudGltZUluaXRpYWxpemVkIDogKCkgPT4gc2VsZi5wb3N0TWVzc2FnZSh7IGNtZDogInByZUluaXQiIH0pCiAgICAgICAgfSk7CgogICAgICAgIC8vIFJlcG9ydCB0aGUgc3VjY2Vzc2Z1bCBsb2FkIG9mIG1vZHVsZSB0byBkZWJ1ZyBtZXNzYWdlCiAgICAgICAgTG9nZ2VyLnByaW50RGVidWcoIlByZWxvYWRpbmcgd2FzbSBtb2R1bGUgZnJvbSBwYXRoOiAiICsgYnVuZGxlUGF0aCArICIvRkJUb2tlbml6ZXIud2FzbSIpOwogICAgfSBjYXRjaCAoZSkgewogICAgICAgIC8vIENyaXRpY2FsIGVycm9yIGhhcyBvY2N1cnJlZCBpbiB0aGUgV29ya2VyIFNpZGUsIHNlbmRpbmcgdG8gbWFpbiB0aHJlYWQKICAgICAgICBMb2dnZXIucHJpbnRFcnJvcigiW1dvcmtlcl06ICIgKyBlKTsKICAgIH0KfTsKCgpjb25zdCBpbml0aWFsaXplQXNzZW1ibHkgPSAoXykgPT4gewogICAgdG9rZW5pemVyID0gbmV3IGluc3RhbmNlLlRva2VuaXplcigpOwoKICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBjbWQ6ICJpbml0aWFsaXplQXNzZW1ibHkiIH0pOwp9OwoKCmNvbnN0IGNsZWFyID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgdG9rZW5pemVyLmNsZWFyKCk7CiAgICAgICAgfQoKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImNsZWFyIgogICAgICAgIH0pOwogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImNsZWFyIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgY2xlYXJpbmcgdGhlIHRva2VuaXplciEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZ2V0RG9jdW1lbnREYXRhID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IGtleXMgPSB0b2tlbml6ZXIuZ2V0RG9jdW1lbnREYXRhKCkua2V5cygpOwogICAgICAgICAgICBsZXQgb2JqUmVzdWx0PXt9OwogICAgICAgICAgICBmb3IobGV0IGlkeCA9IDA7IGlkeCA8IGtleXMuc2l6ZSgpOyBpZHgrKyl7CiAgICAgICAgICAgICAgICBsZXQga2V5ID0ga2V5cy5nZXQoaWR4KTsKICAgICAgICAgICAgICAgIG9ialJlc3VsdFtrZXldID0gdG9rZW5pemVyLmdldERvY3VtZW50RGF0YSgpLmdldChrZXkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIC8vTm8gZGViZXLDrWEgZGUgaGFiZXIgbmluZ8O6biBwcm9ibGVtYSBkZSBtZW1vcmlhIHlhIHF1ZSBrZXlzIHkgc3VzIHZhbG9yZXMgbm8gc29uIG9iamV0b3Mgd2FzbQogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJnZXREb2N1bWVudERhdGEiLCBwYXlsb2FkOiBvYmpSZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfSBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImdldERvY3VtZW50RGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGRvY3VtZW50IGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZERvY3VtZW50RGF0YSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IG1hcERvY3VtZW50RGF0YSA9IG1lc3NhZ2UucGF5bG9hZDsKICAgICAgICBsZXQgZG9jdW1lbnREYXRhID0gbmV3IGluc3RhbmNlLk1hcFN0clN0cigpOwogICAgICAgIGZvciAoY29uc3Qga2V5IGluIG1hcERvY3VtZW50RGF0YSl7CiAgICAgICAgICAgIGRvY3VtZW50RGF0YS5zZXQoa2V5LG1hcERvY3VtZW50RGF0YVtrZXldKTsKICAgICAgICB9CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIHRva2VuaXplci5hZGREb2N1bWVudERhdGEoZG9jdW1lbnREYXRhKTsKICAgICAgICAgICAgLy8gZG9jdW1lbnREYXRhLmRlbGV0ZSgpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJhZGREb2N1bWVudERhdGEiCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZERvY3VtZW50RGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGFkZGluZyB0aGUgZG9jdW1lbnQgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgcmVtb3ZlRG9jdW1lbnREYXRhV2l0aEtleVN0YXJ0ZWRCeUtleSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IHN0YXJ0aW5nS2V5ID0gbWVzc2FnZS5rZXk7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIucmVtb3ZlRG9jdW1lbnREYXRhV2l0aEtleVN0YXJ0ZWRCeUtleShzdGFydGluZ0tleSk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJyZW1vdmVEb2N1bWVudERhdGFXaXRoS2V5U3RhcnRlZEJ5S2V5IiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogInJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCByZW1vdmluZyB0aGUga2V5IGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEV4dHJhRGF0YSA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCBrZXlzID0gdG9rZW5pemVyLmdldEV4dHJhRGF0YSgpLmtleXMoKTsKICAgICAgICAgICAgbGV0IG9ialJlc3VsdD17fTsKICAgICAgICAgICAgZm9yKGxldCBpZHggPSAwOyBpZHggPCBrZXlzLnNpemUoKTsgaWR4KyspewogICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXMuZ2V0KGlkeCk7CiAgICAgICAgICAgICAgICBvYmpSZXN1bHRba2V5XSA9IHRva2VuaXplci5nZXRFeHRyYURhdGEoKS5nZXQoa2V5KTsKICAgICAgICAgICAgfQogICAgICAgICAgICAvL05vIGRlYmVyw61hIGRlIGhhYmVyIG5pbmfDum4gcHJvYmxlbWEgZGUgbWVtb3JpYSB5YSBxdWUga2V5cyB5IHN1cyB2YWxvcmVzIG5vIHNvbiBvYmpldG9zIHdhc20KICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RXh0cmFEYXRhIiwgcGF5bG9hZDogb2JqUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImdldEV4dHJhRGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGV4dHJhIGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZEV4dHJhRGF0YSA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IHBheWxvYWQgPSBtZXNzYWdlLnBheWxvYWQ7CiAgICAgICAgbGV0IGV4dHJhRGF0YSA9IG5ldyBpbnN0YW5jZS5NYXBTdHJTdHIoKTsKICAgICAgICBleHRyYURhdGEuc2V0KCJFeHRyYURhdGEiLHBheWxvYWQpOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgbWFwUmVzdWx0ID0gdG9rZW5pemVyLmFkZEV4dHJhRGF0YShleHRyYURhdGEpOwogICAgICAgICAgICAvL2V4dHJhRGF0YS5kZWxldGUoKTsKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiYWRkRXh0cmFEYXRhIiwgcGF5bG9hZDogbWFwUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZEV4dHJhRGF0YSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGFkZGluZyB0aGUgZXh0cmEgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZ2V0RG9jdW1lbnRNb2RlbCA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCB2ZWN0b3JSZXN1bHQgPSB0b2tlbml6ZXIuZ2V0RG9jdW1lbnRNb2RlbCgpOwoKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RG9jdW1lbnRNb2RlbCIsIHBheWxvYWQ6IHZlY3RvclJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXREb2N1bWVudE1vZGVsIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgZG9jdW1lbnQgbW9kZWwhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGFkZERvY3VtZW50TW9kZWwgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCB2ZWN0b3JTdHJpbmcgPSBtZXNzYWdlLmtleTsKCiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IG1hcFJlc3VsdCA9IHRva2VuaXplci5hZGREb2N1bWVudE1vZGVsKHZlY3RvclN0cmluZyk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJhZGREb2N1bWVudE1vZGVsIiwgcGF5bG9hZDogbWFwUmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImFkZERvY3VtZW50TW9kZWwiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBhZGRpbmcgdGhlIGV4dHJhIGRhdGEhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEltYWdlRGF0YSA9IGFzeW5jIChfKSA9PiB7CiAgICB0cnkgewogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZ2V0SW1hZ2VEYXRhKCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEltYWdlRGF0YSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXRJbWFnZURhdGEiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBnZXR0aW5nIHRoZSBpbWFnZSBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBhZGRJbWFnZURhdGEgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBtYXBLZXkgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIHRva2VuaXplci5hZGRJbWFnZURhdGEobWFwS2V5KTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImFkZEltYWdlRGF0YSIKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiYWRkSW1hZ2VEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgYWRkaW5nIHRoZSBpbWFnZSBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRJbnRlcm5hbERhdGEgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgbWFwUmVzdWx0ID0gdG9rZW5pemVyLmdldEludGVybmFsRGF0YSgpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJnZXRJbnRlcm5hbERhdGEiLCBwYXlsb2FkOiBtYXBSZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0SW50ZXJuYWxEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgaW50ZXJuYWwgZGF0YSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgYWRkSW50ZXJuYWxEYXRhID0gYXN5bmMgKG1lc3NhZ2UpID0+IHsKICAgIHRyeSB7CiAgICAgICAgY29uc3QgbWFwRGF0YSA9IG1lc3NhZ2UucGF5bG9hZDsKCiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgdG9rZW5pemVyLmFkZEludGVybmFsRGF0YShtYXBEYXRhKTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImFkZEludGVybmFsRGF0YSIKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiYWRkSW50ZXJuYWxEYXRhIiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgYWRkaW5nIHRoZSBpbnRlcm5hbCBkYXRhISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRFbmNyeXB0b3JUeXBlID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRva2VuaXplci5nZXRFbmNyeXB0b3JUeXBlKCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEVuY3J5cHRvclR5cGUiLCBwYXlsb2FkOiByZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdG9yVHlwZSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGVuY3J5dG9yIHR5cGUhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IHNldEVuY3J5cHRvclR5cGUgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCB0eXBlID0gbWVzc2FnZS50eXBlOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICB0b2tlbml6ZXIuc2V0RW5jcnlwdG9yVHlwZSh0eXBlKTsKCiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogInNldEVuY3J5cHRvclR5cGUiCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogInNldEVuY3J5cHRvclR5cGUiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBzZXR0aW5nIHRoZSBlbmNyeXB0b3IgdHlwZSEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZW5jcnlwdERpY3Rpb25hcnkgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmVuY3J5cHREaWN0aW9uYXJ5KCk7CgogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJlbmNyeXB0RGljdGlvbmFyeSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJlbmNyeXB0RGljdGlvbmFyeSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGVuY3J5cHRpbmcgdGhlIGRpY3Rpb25hcnkhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGdldEVuY3J5cHRlZERpY3Rpb25hcnlCaW5hcnkgPSBhc3luYyAoXykgPT4gewogICAgdHJ5IHsKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmdldEVuY3J5cHRlZERpY3Rpb25hcnlCaW5hcnkoKTsKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdGVkRGljdGlvbmFyeUJpbmFyeSIsIHBheWxvYWQ6IHJlc3VsdAogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5IiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZ2V0dGluZyB0aGUgZW5jcnl0dGVkIGRpY3Rpb25hcnkgYmluYXJ5ISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0ID0gYXN5bmMgKF8pID0+IHsKICAgIHRyeSB7CiAgICAgICAgaWYodG9rZW5pemVyICE9PSBudWxsKXsKICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRva2VuaXplci5nZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0KCk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImdldEVuY3J5cHRlZERpY3Rpb25hcnlCYXNlNjQiLCBwYXlsb2FkOiByZXN1bHQKICAgICAgICAgICAgfSk7CiAgICAgICAgfQogICAgICAgIGVsc2V7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiVG9rZW5pemVyIGlzIG5vdCBpbml0aWFsaXplZCEiKTsKICAgICAgICB9CiAgICB9IGNhdGNoKGUpIHsKICAgICAgICBjb25zb2xlLmVycm9yKGUpOwogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgY21kOiAiZ2V0RW5jcnlwdGVkRGljdGlvbmFyeUJhc2U2NCIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGdldHRpbmcgdGhlIGVuY3J5cHRlZCBkaWN0aW9uYXJ5IGluIGJhc2U2NCEiIAogICAgICAgIH0pOwogICAgfQp9OwoKY29uc3QgZGVjcnlwdERpY3Rpb25hcnlCaW5hcnkgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBkYXRhID0gbWVzc2FnZS5wYXlsb2FkOwoKICAgICAgICBpZih0b2tlbml6ZXIgIT09IG51bGwpewogICAgICAgICAgICBsZXQgcmVzdWx0ID0gdG9rZW5pemVyLmRlY3J5cHREaWN0aW9uYXJ5QmluYXJ5KGRhdGEpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSIsIHBheWxvYWQ6IHJlc3VsdC52YWx1ZQogICAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgICAgZWxzZXsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJUb2tlbml6ZXIgaXMgbm90IGluaXRpYWxpemVkISIpOwogICAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7CiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IAogICAgICAgICAgICBjbWQ6ICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSIsIGV4Y2VwdGlvbjogIkEgZXhjZXB0aW9uIGhhcyBvY3VycmVkIGRlY3J5cHRpbmcgdGhlIGRpY3Rpb25hcnkgaW4gYmluYXJ5ISIgCiAgICAgICAgfSk7CiAgICB9Cn07Cgpjb25zdCBkZWNyeXB0RGljdGlvbmFyeUJhc2U2NCA9IGFzeW5jIChtZXNzYWdlKSA9PiB7CiAgICB0cnkgewogICAgICAgIGNvbnN0IGRhdGEgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZGVjcnlwdERpY3Rpb25hcnlCYXNlNjQoZGF0YSk7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyAKICAgICAgICAgICAgICAgIGNtZDogImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IiwgcGF5bG9hZDogcmVzdWx0LnZhbHVlCiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IiwgZXhjZXB0aW9uOiAiQSBleGNlcHRpb24gaGFzIG9jdXJyZWQgZGVjcnlwdGluZyB0aGUgZGljdGlvbmFyeSBpbiBiYXNlNjQhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGVuY3J5cHRCdWZmZXIgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBidWZmZXIgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZW5jcnlwdEJ1ZmZlcihidWZmZXIpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJlbmNyeXB0QnVmZmVyIiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImVuY3J5cHRCdWZmZXIiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBlbmNyeXB0aW5nIHRoZSBidWZmZXIhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCmNvbnN0IGRlY3J5cHRCdWZmZXIgPSBhc3luYyAobWVzc2FnZSkgPT4gewogICAgdHJ5IHsKICAgICAgICBjb25zdCBidWZmZXIgPSBtZXNzYWdlLnBheWxvYWQ7CgogICAgICAgIGlmKHRva2VuaXplciAhPT0gbnVsbCl7CiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0b2tlbml6ZXIuZGVjcnlwdEJ1ZmZlcihidWZmZXIpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgICAgICBjbWQ6ICJkZWNyeXB0QnVmZmVyIiwgcGF5bG9hZDogcmVzdWx0CiAgICAgICAgICAgIH0pOwogICAgICAgIH0KICAgICAgICBlbHNlewogICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIlRva2VuaXplciBpcyBub3QgaW5pdGlhbGl6ZWQhIik7CiAgICAgICAgfQogICAgfSBjYXRjaChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcihlKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgCiAgICAgICAgICAgIGNtZDogImRlY3J5cHRCdWZmZXIiLCBleGNlcHRpb246ICJBIGV4Y2VwdGlvbiBoYXMgb2N1cnJlZCBkZWNyeXB0aW5nIHRoZSBidWZmZXIhIiAKICAgICAgICB9KTsKICAgIH0KfTsKCi8qKgogKiBEZXN0cm95IGNyZWF0ZWQgb2JqZWN0cyBpbiBXZWJBc3NlbWJseSBzaWRlCiAqLwpjb25zdCBkZXN0cm95ID0gYXN5bmMgKF8pID0+IHsKICAgIC8vIERlc3Ryb3kgV2ViQXNzZW1ibHkgR2xvYmFscwogICAgZGVsZXRlV2FzbVZhcigKICAgICAgICBpbnN0YW5jZQogICAgKTsKCiAgICAvLyBDbG9zZSBXb3JrZXIgVGhyZWFkCiAgICBjbG9zZSgpOwp9OwoKCjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy93b3JrZXIvTWFpbi5qcwovKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovCgoKc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkgewogICAgc3dpdGNoKG1lc3NhZ2UuZGF0YS5jbWQpIHsKICAgIGNhc2UgInByZUluaXQiOgogICAgICAgIHByZWluaXRpYWxpemVXb3JrZXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImluaXRpYWxpemVBc3NlbWJseSI6CiAgICAgICAgaW5pdGlhbGl6ZUFzc2VtYmx5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJjbGVhciI6CiAgICAgICAgY2xlYXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImdldERvY3VtZW50RGF0YSI6CiAgICAgICAgZ2V0RG9jdW1lbnREYXRhKG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7ICAgIAogICAgY2FzZSAiYWRkRG9jdW1lbnREYXRhIjoKICAgICAgICBhZGREb2N1bWVudERhdGEobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgInJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkiOgogICAgICAgIHJlbW92ZURvY3VtZW50RGF0YVdpdGhLZXlTdGFydGVkQnlLZXkobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImdldEV4dHJhRGF0YSI6CiAgICAgICAgY2xlYXIobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsgICAgCiAgICBjYXNlICJhZGRFeHRyYURhdGEiOgogICAgICAgIGFkZEV4dHJhRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0RG9jdW1lbnRNb2RlbCI6CiAgICAgICAgZ2V0RG9jdW1lbnRNb2RlbChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiYWRkRG9jdW1lbnRNb2RlbCI6CiAgICAgICAgYWRkRG9jdW1lbnRNb2RlbChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOyAgICAKICAgIGNhc2UgImdldEltYWdlRGF0YSI6CiAgICAgICAgZ2V0SW1hZ2VEYXRhKG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJhZGRJbWFnZURhdGEiOgogICAgICAgIGFkZEltYWdlRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0SW50ZXJuYWxEYXRhIjoKICAgICAgICBnZXRJbnRlcm5hbERhdGEobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsgICAgCiAgICBjYXNlICJhZGRJbnRlcm5hbERhdGEiOgogICAgICAgIGFkZEludGVybmFsRGF0YShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZ2V0RW5jcnlwdG9yVHlwZSI6CiAgICAgICAgZ2V0RW5jcnlwdG9yVHlwZShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAic2V0RW5jcnlwdG9yVHlwZSI6CiAgICAgICAgc2V0RW5jcnlwdG9yVHlwZShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZW5jcnlwdERpY3Rpb25hcnkiOgogICAgICAgIGVuY3J5cHREaWN0aW9uYXJ5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5IjoKICAgICAgICBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmluYXJ5KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0IjoKICAgICAgICBnZXRFbmNyeXB0ZWREaWN0aW9uYXJ5QmFzZTY0KG1lc3NhZ2UuZGF0YSk7CiAgICAgICAgYnJlYWs7CiAgICBjYXNlICJkZWNyeXB0RGljdGlvbmFyeUJpbmFyeSI6CiAgICAgICAgZGVjcnlwdERpY3Rpb25hcnlCaW5hcnkobWVzc2FnZS5kYXRhKTsKICAgICAgICBicmVhazsKICAgIGNhc2UgImRlY3J5cHREaWN0aW9uYXJ5QmFzZTY0IjoKICAgICAgICBkZWNyeXB0RGljdGlvbmFyeUJhc2U2NChtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZW5jcnlwdEJ1ZmZlciI6CiAgICAgICAgZW5jcnlwdEJ1ZmZlcihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZGVjcnlwdEJ1ZmZlciI6CiAgICAgICAgZGVjcnlwdEJ1ZmZlcihtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgY2FzZSAiZGVzdHJveSI6CiAgICAgICAgZGVzdHJveShtZXNzYWdlLmRhdGEpOwogICAgICAgIGJyZWFrOwogICAgfQp9Owo=")], { type: "text/javascript" }))), he));
      return i2.postMessage({ cmd: "preInit", bundlePath: e2 }), new Promise((e3) => {
        i2.onmessage = (a2) => {
          "preInit" === a2.data.cmd ? i2.postMessage({ cmd: "initializeAssembly" }) : "initializeAssembly" === a2.data.cmd && (t2.worker = i2, e3());
        };
      });
    }
  }
  static async clear(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "clear" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "clear" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getDocumentData(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getDocumentData" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getDocumentData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addDocumentData(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "addDocumentData", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "addDocumentData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async removeDocumentDataWithKeyStartedByKey(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "removeDocumentDataWithKeyStartedByKey", key: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "removeDocumentDataWithKeyStartedByKey" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getExtraData(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getExtraData" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getExtraData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addExtraData(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "addExtraData", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "addExtraData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getDocumentModel(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getDocumentModel" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getDocumentModel" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addDocumentModel(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "addDocumentModel", key: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "addDocumentModel" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getImageData(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getImageData" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getImageData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addImageData(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "addImageData", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "addImageData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getInternalData(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getInternalData" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getInternalData" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async addInternalData(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "addInternalData", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "addInternalData" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async getEncryptorType(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getEncryptorType" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getEncryptorType" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async setEncryptorType(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "setEncryptorType", type: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "setEncryptorType" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3());
      };
    });
  }
  static async encryptDictionary(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "encryptDictionary" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "encryptDictionary" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getEncryptedDictionaryBinary(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getEncryptedDictionaryBinary" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getEncryptedDictionaryBinary" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async getEncryptedDictionaryBase64(e2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "getEncryptedDictionaryBase64" }), new Promise((e3, t2) => {
      _me.worker.onmessage = (i2) => {
        "getEncryptedDictionaryBase64" === i2.data.cmd && (i2.data.exception ? t2(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptDictionaryBinary(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "decryptDictionaryBinary", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "decryptDictionaryBinary" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptDictionaryBase64(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "decryptDictionaryBase64", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "decryptDictionaryBase64" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async encryptBuffer(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "encryptBuffer", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "encryptBuffer" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static async decryptBuffer(e2, t2) {
    return await _me.__checkWorker(e2), _me.worker.postMessage({ cmd: "decryptBuffer", payload: t2 }), new Promise((e3, t3) => {
      _me.worker.onmessage = (i2) => {
        "decryptBuffer" === i2.data.cmd && (i2.data.exception ? t3(new Error(i2.data.exception)) : e3(i2.data.payload));
      };
    });
  }
  static destroyWorker() {
    _me.worker && (_me.worker.postMessage({ cmd: "destroy" }), _me.worker = null);
  }
};
var Re = {};
function Ie(e2) {
  null !== e2.cameraStream && (true === e2.stopCameraStream && e2.cameraStream.getVideoTracks()[0].stop(), e2.video.pause()), e2.recorder && (e2.recorder.deinitializeEngine(), e2.recorder = null), null !== e2.rm && void 0 !== e2.rm && (e2.rm.caller = null, e2.rm = null), null !== e2.graph && void 0 !== e2.graph && (e2.graph = null), null !== e2.drawer && void 0 !== e2.drawer && (e2.drawer = null), null !== e2.rmScript && void 0 !== e2.rmScript && (e2.rmScript.onreadystatechange = null, e2.rmScript.onload = null, e2.rmScript = null), null !== e2.graphScript && void 0 !== e2.graphScript && (e2.graphScript.onreadystatechange = null, e2.graphScript.onload = null, e2.graphScript = null), null !== e2.drawerScript && void 0 !== e2.drawerScript && (e2.drawerScript.onload = null, e2.drawerScript = null), null !== e2.divContainer && (e2.onCanvasResizeContext && (window.removeEventListener("resize", e2.onCanvasResizeContext, false), e2.onCanvasResizeContext = void 0), void 0 !== e2.onExtractionFinish && null !== e2.onExtractionFinish && e2.divContainer.removeEventListener("FPhi.SelphID.Finish.event", e2.onExtractionFinish, true), void 0 !== e2.onUserCancel && null !== e2.onUserCancel && e2.divContainer.removeEventListener("FPhi.SelphID.UserCancel.event", e2.onUserCancel, true), void 0 !== e2.onExtractionTimeout && null !== e2.onExtractionTimeout && e2.divContainer.removeEventListener("FPhi.SelphID.ExtractionTimeout.event", e2.onExtractionTimeout, true), void 0 !== e2.onExceptionCaptured && null !== e2.onExceptionCaptured && e2.divContainer.removeEventListener("FPhi.SelphID.ExceptionCaptured.event", e2.onExceptionCaptured, true), void 0 !== e2.onModuleLoaded && null !== e2.onModuleLoaded && e2.divContainer.removeEventListener("FPhi.SelphID.ModuleLoaded.event", e2.onModuleLoaded, true), void 0 !== e2.onTrackStatus && null !== e2.onTrackStatus && e2.divContainer.removeEventListener("FPhi.SelphID.TrackStatus.event", e2.onTrackStatus, true), null !== e2.cameraContainer && e2.cameraContainer.isConnected && e2.divContainer.removeChild(e2.cameraContainer), void 0 !== e2.onAccessibilityStatus && null !== e2.onAccessibilityStatus && e2.divContainer.removeEventListener("FPhi.SelphID.AccessibilityStatus.event", e2.onAccessibilityStatus, true), e2.divContainer = null, e2.cameraContainer = null);
}
Re.SelphID = _, Re.SelphID.RecorderType = { Local: 0, Remote: 1 }, Re.SelphID.RecorderStatus = { Ok: 0, Unknown: 1, SocketError: 2 }, Re.SelphID.ConfigurationManager = class {
  constructor() {
    this.container = null, this.language = "es", this.dpiList = [163, 326, 489], this.cameraWidth = 1280, this.cameraHeight = 720, this.cameraId = null, this.showLog = false, this.bundlePath = "", this.resourcesPath = this.bundlePath + "/FPhi.Widget.Resources", this.accessibility = false, this.accessibleElements = ["button", "buttonImage"], this.onExtractionFinish = null, this.onUserCancel = null, this.onExceptionCaptured = null, this.onExtractionTimeout = null, this.onModuleLoaded = null, this.onTrackStatus = null, this.onAccessibilityStatus = null, this.mode = _.Mode.Full, this.documentMode = _.DocumentMode.DoubleSide, this.license = "", this.askSimpleMode = true, this.previewCapture = true, this.blurredThreshold = 0.1, this.cameraOverflow = false, this.forceLandscape = false, this.canvasHD = false, this.cropFactor = 1, this.initialTip = false, this.captureTimeout = 10, this.captureRetries = 3, this.graphPath = this.bundlePath + "/graph.xml", this.imageFormat = "image/png", this.imageQuality = 0.95, this.externalCamera = false, this.epheremalKey = "", this.videoRecord = false, this.videoRecordRate = 3, this.videoRecordScale = 0.5, this.videoQuality = _.VideoQuality.Medium, this.videoRecordType = _.RecorderType.Remote, this.startSimpleMode = false, this.cameraMirror = true, this.documentType = _.DocumentType.Custom, this.scanMode = _.ScanMode.Generic, this.checkFieldsData = false, this.specificData = null, this.keepEngineAlive = false, this.allowUnknownDocuments = false, this.maxAllowedMismatches = 0, this.progressiveMismatches = 0, this.allowUncertain = null, this.retryOnlyCurrentSide = false, this.barcode = null, this.barcodeSide = _.BarcodeSide.Both, this.cameraSelection = true, this.anonymizationMode = _.AnonymizationMode.None;
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
  setResourcesPath(e2) {
    this.resourcesPath = e2;
  }
  getResourcesPath() {
    return this.resourcesPath;
  }
  setBundlePath(e2) {
    this.bundlePath = e2, this.graphPath = this.bundlePath + "/graph.xml", this.resourcesPath = this.bundlePath + "/FPhi.Widget.Resources";
  }
  getBundlePath() {
    return this.bundlePath;
  }
  setGraphPath(e2) {
    this.graphPath = e2;
  }
  getGraphPath() {
    return this.graphPath;
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
  setMode(e2) {
    this.mode = e2;
  }
  getMode() {
    return this.mode;
  }
  setAskSimpleMode(e2) {
    this.askSimpleMode = e2;
  }
  getAskSimpleMode() {
    return this.askSimpleMode;
  }
  setPreviewCapture(e2) {
    this.previewCapture = e2;
  }
  getPreviewCapture() {
    return this.previewCapture;
  }
  setDocumentAspectRatio(e2) {
    this.documentAspectRatio = e2;
  }
  getDocumentAspectRatio() {
    return this.documentAspectRatio;
  }
  setCropFactor(e2) {
    this.cropFactor = e2, this.cropFactor < 1 && (this.cropFactor = 1);
  }
  getCropFactor() {
    return this.cropFactor;
  }
  setForceLandscape(e2) {
    this.forceLandscape = e2;
  }
  getForceLandscape() {
    return this.forceLandscape;
  }
  setCanvasHD(e2) {
    this.canvasHD = e2;
  }
  getCanvasHD() {
    return this.canvasHD;
  }
  setCaptureTimeout(e2) {
    this.captureTimeout = e2;
  }
  getCaptureTimeout() {
    return this.captureTimeout;
  }
  setCaptureRetries(e2) {
    this.captureRetries = e2;
  }
  getCaptureRetries() {
    return this.captureRetries;
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
  setInitialTip(e2) {
    this.initialTip = e2;
  }
  getInitialTip() {
    return this.initialTip;
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
  setStartSimpleMode(e2) {
    this.startSimpleMode = e2;
  }
  getStartSimpleMode() {
    return this.startSimpleMode;
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
  setDocumentType(e2) {
    this.documentType = e2;
  }
  getDocumentType() {
    return this.documentType;
  }
  setScanMode(e2) {
    this.scanMode = e2;
  }
  getScanMode() {
    return this.scanMode;
  }
  setAnonymizationMode(e2) {
    this.anonymizationMode = e2;
  }
  getAnonymizationMode() {
    return this.anonymizationMode;
  }
  setCheckFieldsData(e2) {
    this.checkFieldsData = e2;
  }
  getCheckFieldsData() {
    return this.checkFieldsData;
  }
  setSpecificData(e2) {
    this.specificData = e2;
  }
  getSpecificData() {
    return this.specificData;
  }
  setCameraOverflow(e2) {
    this.cameraOverflow = e2;
  }
  getCameraOverflow() {
    return this.cameraOverflow;
  }
  setDocumentMode(e2) {
    this.documentMode = e2;
  }
  getDocumentMode() {
    return this.documentMode;
  }
  setLicense(e2) {
    this.license = e2;
  }
  getLicense() {
    return this.license;
  }
  getBlurredThreshold() {
    return this.blurredThreshold;
  }
  setBlurredThreshold(e2) {
    this.blurredThreshold = e2;
  }
  setExternalCamera(e2) {
    this.externalCamera = e2;
  }
  getExternalCamera() {
    return this.externalCamera;
  }
  setCameraMirror(e2) {
    this.cameraMirror = e2;
  }
  getCameraMirror() {
    return this.cameraMirror;
  }
  setKeepEngineAlive(e2) {
    this.keepEngineAlive = e2;
  }
  getKeepEngineAlive() {
    return this.keepEngineAlive;
  }
  setEpheremalKey(e2) {
    this.epheremalKey = e2;
  }
  getEpheremalKey() {
    return this.epheremalKey;
  }
  setAllowUnknownDocuments(e2) {
    this.allowUnknownDocuments = e2;
  }
  getAllowUnknownDocuments() {
    return this.allowUnknownDocuments;
  }
  setMaxAllowedMismatches(e2) {
    this.maxAllowedMismatches = e2;
  }
  getMaxAllowedMismatches() {
    return this.maxAllowedMismatches;
  }
  setProgressiveMismatches(e2) {
    this.progressiveMismatches = e2;
  }
  getProgressiveMismatches() {
    return this.progressiveMismatches;
  }
  setAllowUncertain(e2) {
    this.allowUncertain = e2;
  }
  getAllowUncertain() {
    return this.allowUncertain;
  }
  setRetryOnlyCurrentSide(e2) {
    this.retryOnlyCurrentSide = e2;
  }
  getRetryOnlyCurrentSide() {
    return this.retryOnlyCurrentSide;
  }
  setBarcode(e2) {
    this.barcode = e2;
  }
  getBarcode() {
    return this.barcode;
  }
  setBarcodeSide(e2) {
    this.barcodeSide = e2;
  }
  getBarcodeSide() {
    return this.barcodeSide;
  }
  setCameraSelection(e2) {
    this.cameraSelection = e2;
  }
  getCameraSelection() {
    return this.cameraSelection;
  }
}, Re.SelphID.SimpleMode = class {
  constructor(e2) {
    this.cm = e2, this.path = this.isPathAbsolute(this.cm.getBundlePath()) ? this.cm.getBundlePath() : this.getScriptPath() + this.cm.getBundlePath(), this.baseURL = this.isPathAbsolute(this.cm.getResourcesPath()) ? this.cm.getResourcesPath() : this.getScriptPath() + this.cm.getResourcesPath(), this.devicePixelRatio = window.devicePixelRatio, false === e2.getCanvasHD() && (this.devicePixelRatio = 1), this.secondsWidget = 0, this.secondsState = 0;
  }
  OnResourceManagerStatus(e2, t2) {
    t2 && (e2.rmReady || (e2.rmReady = true, e2.CheckDependencies(e2)));
  }
  CheckDependencies(e2) {
    if (1 == e2.rmReady && void 0 !== e2.drawer) {
      var t2 = new CustomEvent("FPhi.SelphID.ModuleLoaded.event");
      e2.cm.getContainer().dispatchEvent(t2);
      var i2 = this.canvas;
      switch (null != i2 && (i2.style.display = "inline-block"), e2.drawer.rm = e2.rm, e2.canvas, e2.drawer.setCanvasSize(e2.cameraContainer.offsetWidth, e2.cameraContainer.offsetHeight), e2.cm.getMode()) {
        case $.SelphID.Mode.Full:
        case $.SelphID.Mode.Front:
          e2.newState($.SelphID.SimpleModeStates.InfoFront);
          break;
        default:
          e2.newState($.SelphID.SimpleModeStates.InfoBack);
      }
    }
  }
  start() {
    this.onTrackStatus = this.cm.getOnTrackStatus(), this.divContainer = this.cm.getContainer(), this.onCanvasResizeContext = this.onCanvasResize.bind(this), window.addEventListener("resize", this.onCanvasResizeContext, false), this.cameraContainer = document.createElement("div"), this.cameraContainer.id = "cameraContainer", this.cameraContainer.style.overflow = "hidden", this.cameraContainer.style.position = "relative", this.cameraContainer.style.width = this.cm.getContainer().offsetWidth + "px", this.cameraContainer.style.height = this.cm.getContainer().offsetHeight + "px", this.cm.getContainer().appendChild(this.cameraContainer);
    var e2 = document.createElement("canvas");
    e2.id = "display", e2.style = "position:absolute; top:0px; left:0px; zIndex:1;", this.cameraContainer.appendChild(e2), e2.width = this.cameraContainer.offsetWidth * this.devicePixelRatio, e2.height = this.cameraContainer.offsetHeight * this.devicePixelRatio, e2.style.width = this.cameraContainer.offsetWidth + "px", e2.style.height = this.cameraContainer.offsetHeight + "px", e2.onclick = this.canvasOnClick.bind(this), e2.addEventListener("mousemove", this.canvasOnMove.bind(this), false), this.canvas = e2;
    let t2 = document.createElement("input");
    t2.type = "file", t2.accept = "image/*", t2.capture = "environment", t2.style = "visibility:hidden", t2.addEventListener("change", this.fileCaptureEvent.bind(this)), this.cm.getContainer().appendChild(t2), this.inputFromDevice = t2, this.cm.getContainer().addEventListener("FPhi.SelphID.Finish.event", this.cm.getOnExtractionFinish(), true), this.cm.getContainer().addEventListener("FPhi.SelphID.UserCancel.event", this.cm.getOnUserCancel(), true), this.cm.getContainer().addEventListener("FPhi.SelphID.ModuleLoaded.event", this.cm.getOnModuleLoaded(), true), this.cm.getContainer().addEventListener("FPhi.SelphID.TrackStatus.event", this.onTrackStatus, true), this.rm = new l(this.baseURL, this.cm.getLanguage(), this, this.OnResourceManagerStatus, this.cm.getDpiList(), window.devicePixelRatio, 1), this.widgetTime = performance.now(), this.drawer = new q({ mode: this.cm.getMode(), preview: this.cm.getPreviewCapture(), documentAspectRatio: 85.6 / 53.98 }), this.CheckDependencies(this);
  }
  stop() {
    this.cm.getContainer().removeChild(this.cameraContainer), this.cameraContainer = null, this.onCanvasResizeContext && (window.removeEventListener("resize", this.onCanvasResizeContext, false), this.onCanvasResizeContext = void 0), null != this.rm && (this.rm.caller = null, this.rm = null), null != this.drawer && (this.drawer = null), this.cm.getContainer().removeEventListener("FPhi.SelphID.Finish.event", this.onExtractionFinish, true), this.cm.getContainer().removeEventListener("FPhi.SelphID.UserCancel.event", this.onUserCancel, true), this.cm.getContainer().removeEventListener("FPhi.SelphID.ModuleLoaded.event", this.onModuleLoaded, true), this.cm.getContainer().removeEventListener("FPhi.SelphID.TrackStatus.event", this.onTrackStatus, true);
  }
  newState(e2) {
    if (this.inputFromDevice.value = "", this.stateTime = performance.now(), this.secondsWidget = (this.actualTime - this.widgetTime) / 1e3, this.secondsState = (this.actualTime - this.stateTime) / 1e3, this.state = e2, this.resourceParent = this.drawer.getResourceIdForState($.SelphID.SimpleModeStatesStr[this.state]), this.elements = null, null != this.resourceParent && (this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape)), null != this.onTrackStatus && this.divContainer) {
      var t2 = new CustomEvent("FPhi.SelphID.TrackStatus.event", { detail: { code: $.SelphID.TrackStatus.ChangeState, timeStamp: this.secondsWidget, data: $.SelphID.SimpleModeStatesStr[this.state] } });
      this.divContainer.dispatchEvent(t2);
    }
    this.draw(this);
  }
  async finish() {
    var e2 = null, t2 = null;
    this.frontImage && (e2 = await this.convertImage(this.frontImage, this.cm.getImageFormat(), this.cm.getImageQuality())), this.backImage && (t2 = await this.convertImage(this.backImage, this.cm.getImageFormat(), this.cm.getImageQuality()));
    var i2 = { images: { backDocument: t2.src || null, frontDocument: e2.src || null }, simpleModeOutput: 1 }, a2 = new CustomEvent("FPhi.SelphID.Finish.event", { detail: i2 });
    this.cm.getContainer().dispatchEvent(a2), this.stop();
  }
  rotateImage(e2, t2, i2) {
    return new Promise((a2, l2) => {
      let d2 = document.createElement("canvas");
      d2.width = e2.height, d2.height = e2.width;
      let s2 = d2.getContext("2d");
      s2.save(), s2.translate(d2.width / 2, d2.height / 2), s2.rotate(-Math.PI / 2), s2.drawImage(e2, -e2.width / 2, -e2.height / 2), s2.restore();
      let n2 = document.createElement("img");
      n2.onload = () => {
        a2(n2);
      }, n2.src = d2.toDataURL(t2, i2);
    });
  }
  convertImage(e2, t2, i2) {
    return new Promise((a2, l2) => {
      let d2 = document.createElement("canvas");
      d2.width = e2.width, d2.height = e2.height, d2.getContext("2d").drawImage(e2, 0, 0);
      let s2 = document.createElement("img");
      s2.onload = () => {
        a2(s2);
      }, s2.src = d2.toDataURL(t2, i2);
    });
  }
  fileCaptureEvent(e2) {
    let t2 = new FileReader();
    t2.onload = (e3) => {
      switch (this.state) {
        case $.SelphID.SimpleModeStates.InfoFront:
          this.previewImage = document.createElement("img"), this.previewImage.src = e3.target.result, this.frontImage = this.previewImage, this.newState($.SelphID.SimpleModeStates.PreviewFront);
          break;
        case $.SelphID.SimpleModeStates.InfoBack:
          this.previewImage = document.createElement("img"), this.previewImage.src = e3.target.result, this.backImage = this.previewImage, this.newState($.SelphID.SimpleModeStates.PreviewBack);
      }
    }, t2.readAsDataURL(e2.target.files[0]);
  }
  getLayoutFromXML(e2, t2, i2, a2, l2) {
    let d2 = "LEFT", s2 = "TOP", n2 = i2, c2 = false;
    if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "width")) {
      null == n2 && (n2 = {});
      var r2 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "width");
      n2.width = r2 <= 1 ? r2 * a2 : r2, c2 = true;
    }
    if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "height")) {
      null == n2 && (n2 = {});
      var o2 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "height");
      n2.height = o2 <= 1 ? o2 * l2 : o2, c2 = true;
    }
    if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "xAnchor") && (d2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "xAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "yAnchor") && (s2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "yAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "x")) {
      null == n2 && (n2 = {});
      var h2 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "x");
      n2.x = h2 <= 1 && h2 >= -1 ? h2 * a2 : h2, "CENTER" == d2 ? n2.x = a2 / 2 - n2.width / 2 + n2.x : "RIGHT" == d2 && (n2.x = a2 - n2.width + n2.x), c2 = true;
    }
    if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "y")) {
      null == n2 && (n2 = {});
      var m2 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "y");
      n2.y = m2 <= 1 && m2 >= -1 ? m2 * l2 : m2, "CENTER" == s2 ? n2.y = l2 / 2 - n2.height / 2 + n2.y : "BOTTOM" == s2 && (n2.y = l2 - n2.height + n2.y), c2 = true;
    }
    return n2;
  }
  draw(e2) {
    if (null != e2.drawer) {
      e2.actualTime = performance.now(), e2.secondsWidget = (e2.actualTime - e2.widgetTime) / 1e3, e2.secondsState = (e2.actualTime - e2.stateTime) / 1e3;
      var t2 = e2.canvas.getContext("2d", { alpha: true }), i2 = t2.canvas.width, a2 = t2.canvas.height;
      if (t2.clearRect(0, 0, i2, a2), this.canvasWidth = i2, this.canvasHeight = a2, t2.save(), t2.scale(e2.devicePixelRatio, e2.devicePixelRatio), null != e2.elements) {
        var l2 = { contour: [false, false, false, false] };
        l2.previewImage = e2.previewImage, l2.forceLandscape = e2.cm.getForceLandscape(), l2.state = $.SelphID.SimpleModeStatesStr[e2.state];
        for (var d2 = 0; d2 < e2.elements.length; d2++) if ("button" != e2.elements[d2].type && "buttonImage" != e2.elements[d2].type || 0 != e2.interactible) {
          var s2 = e2.drawer.getLayout(t2, e2.resourceParent, e2.elements[d2].id, e2.elements[d2].type, e2.secondsWidget, e2.secondsState, "", l2);
          if (null != s2 && (s2 = e2.getLayoutFromXML(e2.resourceParent, e2.elements[d2].id, s2, i2, a2)), null != s2) {
            e2.elements[d2].layout = s2;
            var n2 = e2.elements[d2].mode, c2 = false;
            if (null != n2) {
              for (var r2 = n2.split("|"), o2 = 0; o2 < r2.length; o2++) if ("Normal" == r2[o2]) {
                c2 = true;
                break;
              }
            } else c2 = true;
            1 == c2 && e2.drawer.draw(t2, s2, e2.resourceParent, e2.elements[d2].id, e2.elements[d2].type, e2.secondsWidget, e2.secondsState, e2.cm.getMode(), l2);
          }
        }
      }
      t2.restore(), setTimeout(e2.draw, 0, e2);
    }
  }
  onCanvasResize() {
    var e2 = this.canvas;
    e2.getContext("2d", { alpha: true }), this.cameraContainer.style.width = this.cm.getContainer().offsetWidth + "px", this.cameraContainer.style.height = this.cm.getContainer().offsetHeight + "px", e2.width = this.cameraContainer.offsetWidth * this.devicePixelRatio, e2.height = this.cameraContainer.offsetHeight * this.devicePixelRatio, e2.style.width = this.cameraContainer.offsetWidth + "px", e2.style.height = this.cameraContainer.offsetHeight + "px", this.drawer.setCanvasSize(this.cameraContainer.offsetWidth, this.cameraContainer.offsetHeight), this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape);
  }
  canvasOnMove(e2) {
    if (null != this.elements) {
      for (var t2 = this.elements.length - 1; t2 >= 0; t2--) if (null != this.elements[t2].layout && e2.offsetX >= this.elements[t2].layout.x && e2.offsetX < this.elements[t2].layout.x + this.elements[t2].layout.width && e2.offsetY >= this.elements[t2].layout.y && e2.offsetY < this.elements[t2].layout.y + this.elements[t2].layout.height) {
        this.drawer.onMouseMove(e2.target, this.elements[t2].layout, this.resourceParent, this.elements[t2].id, this.elements[t2].type);
        break;
      }
    }
  }
  async canvasOnClick(e2) {
    if (null == this.elements) return;
    let t2 = null;
    for (var i2 = this.elements.length - 1; i2 >= 0; i2--) {
      let l2 = e2.offsetX, d2 = e2.offsetY;
      if (null != this.elements[i2].layout && l2 >= this.elements[i2].layout.x && l2 < this.elements[i2].layout.x + this.elements[i2].layout.width && d2 >= this.elements[i2].layout.y && d2 < this.elements[i2].layout.y + this.elements[i2].layout.height) {
        if (t2 = this.elements[i2].id, "button_start" == t2) this.inputFromDevice.click();
        else if ("button_repeat" == t2) this.state == $.SelphID.SimpleModeStates.PreviewFront ? this.newState($.SelphID.SimpleModeStates.InfoFront) : this.newState($.SelphID.SimpleModeStates.InfoBack);
        else if ("button_ok" == t2) this.state == $.SelphID.SimpleModeStates.PreviewFront && this.cm.getMode() == $.SelphID.Mode.Full ? this.newState($.SelphID.SimpleModeStates.InfoBack) : this.finish();
        else if ("button_rotate" == t2) this.state == $.SelphID.SimpleModeStates.PreviewFront ? (this.frontImage = await this.rotateImage(this.frontImage, this.cm.getImageFormat(), this.cm.getImageQuality()), this.previewImage = this.frontImage) : (this.backImage = await this.rotateImage(this.backImage, this.cm.getImageFormat(), this.cm.getImageQuality()), this.previewImage = this.backImage);
        else if ("button_exit" == t2) {
          var a2 = new CustomEvent("FPhi.SelphID.UserCancel.event");
          this.cm.getContainer().dispatchEvent(a2), this.stop();
        }
        break;
      }
    }
  }
  isPathAbsolute(e2) {
    return /^(?:\/|.+:\/\/|http)/.test(e2);
  }
  getScriptPath() {
    return String(new Error().stack).replace(/^Error.*\n/, "").split("\n")[1].match(/http.*\.js/)[0].split("/").slice(0, -1).join("/") + "/";
  }
}, Re.SelphID.TokenizerUtils = me, Re.SelphID.Widget = function(e2) {
  ie.setLoggerLevel(e2.getShowLog() ? 0 : 2), ie.setLoggerTag("selphid-widget-web"), this.version = Re.SelphID.Version, ie.printInfo("SelphID version: " + this.version + " - enable showLog property to display detailed info."), this.cm = e2, this.divContainer = this.cm.getContainer(), this.captureTimeout = this.cm.getCaptureTimeout(), this.captureRetries = this.cm.getCaptureRetries(), this.onExtractionFinish = this.cm.getOnExtractionFinish(), this.onUserCancel = this.cm.getOnUserCancel(), this.onExceptionCaptured = this.cm.getOnExceptionCaptured(), this.onExtractionTimeout = this.cm.getOnExtractionTimeout(), this.onModuleLoaded = this.cm.getOnModuleLoaded(), this.onTrackStatus = this.cm.getOnTrackStatus(), this.onAccessibilityStatus = this.cm.getOnAccessibilityStatus(), this.cameraId = this.cm.getCameraId(), this.cameraReady = false, this.contour = [false, false, false, false], this.cameraMirror = this.cm.getCameraMirror(), this.cameraMustFlip = this.cm.getCameraMirror(), this.cameraSelection = this.cm.getCameraSelection(), this.mode = this.cm.getMode(), this.status = Re.SelphID.Mode.Full, this.specificData = this.cm.getSpecificData(), this.rules = null, this.scanMode = this.cm.getScanMode(), this.documentType = this.cm.getDocumentType(), this.recorderWorking = false, this.recorderFinish = false, this.recorder = null, this.epheremalKey = this.cm.getEpheremalKey(), this.sndRound = false, this.blurredThreshold = this.cm.getBlurredThreshold(), this.preview = this.cm.getPreviewCapture(), this.graphPath = Re.SelphID.isPathAbsolute(this.cm.getGraphPath()) ? this.cm.getGraphPath() : Re.SelphID.getScriptPath() + this.cm.getGraphPath(), this.cropFactor = this.cm.getCropFactor(), this.devicePixelRatio = window.devicePixelRatio, false === this.cm.getCanvasHD() && (this.devicePixelRatio = 1), this.bundlePath = Re.SelphID.isPathAbsolute(this.cm.getBundlePath()) ? this.cm.getBundlePath() : Re.SelphID.getScriptPath() + this.cm.getBundlePath(), this.showLog && ie.printDebug("Serving from URL: " + this.bundlePath), this.resourceParent = null, this.language = this.cm.getLanguage(), this.expectedExternalCamera = this.cm.getExternalCamera(), this.fontSizeFactor = this.canvasHeight / 500, this.fpsTime = performance.now(), this.baseURL = Re.SelphID.isPathAbsolute(this.cm.getResourcesPath()) ? this.cm.getResourcesPath() : Re.SelphID.getScriptPath() + this.cm.getResourcesPath(), this.showLog && ie.printDebug("Serving resources from URL: " + this.baseURL), this.dpiList = this.cm.getDpiList(), this.imageFormat = this.cm.getImageFormat(), this.imageQuality = this.cm.getImageQuality(), this.cm.getAccessibility() && this.cm.getForceLandscape() && (ie.printDebug("Accessibility is not compatible with forceLandscape. Setting accessibility to false"), this.cm.accessibility = false), this.rmReady = false, this.graphReady = false, this.rm = new l(this.baseURL, this.language, this, this.OnResourceManagerStatus, this.dpiList, window.devicePixelRatio, this.canvasSizeFactor), this.graph = new a(this.graphPath, this.OnGraphReady.bind(this), this.OnGraphNewState.bind(this)), this.drawer = new q({ mode: this.mode, preview: this.preview, documentAspectRatio: 85.6 / 53.98, enableButtonCamera: !this.expectedExternalCamera }), this.divContainer.addEventListener("FPhi.SelphID.Finish.event", this.onExtractionFinish, true), this.divContainer.addEventListener("FPhi.SelphID.UserCancel.event", this.onUserCancel, true), this.divContainer.addEventListener("FPhi.SelphID.ExtractionTimeout.event", this.onExtractionTimeout, true), this.divContainer.addEventListener("FPhi.SelphID.ExceptionCaptured.event", this.onExceptionCaptured, true), this.divContainer.addEventListener("FPhi.SelphID.ModuleLoaded.event", this.onModuleLoaded, true), this.divContainer.addEventListener("FPhi.SelphID.TrackStatus.event", this.onTrackStatus, true), this.divContainer.addEventListener("FPhi.SelphID.AccessibilityStatus.event", this.onAccessibilityStatus, true);
}, Re.SelphID.Widget.prototype = { constructor: Re.SelphID.Widget, language: "es", privateCanvas: null, extractor: null, extractorLiveness: null, extractorVersion: "", lastDetectResult: null, lastExtractionResult: null, lastExtractionResultWizard: null, actualTime: 0, actualTimePrev: 0, idContainer: null, divContainer: null, extractorContainer: null, videoSelectId: null, cameraContainer: null, cameraWidth: null, cameraHeight: null, cameraRotation: 0, cameraId: null, expectedExternalCamera: null, canvasWidth: void 0, canvasHeight: void 0, cameraStream: null, cameraSelection: true, selectedSource: null, samplePeriod: 0, blurredThreshold: 0, specificData: null, scanMode: null, documentType: null, debug: false, interactible: true, stopCameraStream: true, recorderWorking: false, epheremalKey: "", globalTimeout: 30, sceneTimeout: 30, fps: 0, fpse: 0, fpsframes: 0, fpseframes: 0, fpsTime: null, fontSizeFactor: 1, canvasSizeFactor: 1, cameraList: [], isBrowserFirefox: null, graphPath: "/graph.xml", isDocumentAlreadyDetected: false, Start: async function(e2) {
  ie.setLoggerLevel(this.cm.getShowLog() ? 0 : 2), ie.printDebug("Init process - Widget Web Internals starting");
  try {
    if (ie.printDebug("Init process - Reading license"), "" === this.cm.getLicense()) throw new Error("The Widget license can not be empty, proceeding to stop the execution of the product...");
    let e3 = await le.getInternalLicense(this.cm.getLicense());
    if (ie.printDebug("Init process - Readed license!"), e3.expireDate && /* @__PURE__ */ new Date() > new Date(e3.expireDate)) throw new Error("The Widget license is expired, proceeding to stop the execution of the product...");
    if (e3.urlBase && -1 === window.location.href.toLowerCase().indexOf(e3.urlBase.toLowerCase().replace("*", ""))) throw new Error("The Widget license is not valid for this domain, proceeding to stop the execution of the product...");
    if (-1 === L.getAvailableEngines().findIndex((t3) => e3.engineType === t3)) throw new Error("The Widget license is not supported by this version, please contact support team!");
    this.configureSearchMode(), globalThis.__selphid__engine ? (this.engine = globalThis.__selphid__engine, this.engineLoaded = true, this.CheckDependencies(this), this.cm.setAllowUnknownDocuments(false)) : (this.engine = L.generateInstance(e3.engineType, { licenseKey: e3.token, bundlePath: this.bundlePath, imageFormat: this.imageFormat, imageQuality: this.imageQuality, accessibility: this.accessibility, blurredThreshold: 100 * this.blurredThreshold, specificData: this.specificData, scanMode: this.cm.getScanMode(), documentType: this.documentType, externalCamera: this.expectedExternalCamera, showExtendedLog: this.cm.getShowLog(), maxAllowedMismatches: this.cm.getMaxAllowedMismatches(), progressiveMismatches: this.cm.getProgressiveMismatches(), allowUncertain: this.cm.getAllowUncertain() || this.cm.getAllowUnknownDocuments(), allowUnknownDocuments: this.cm.getAllowUnknownDocuments() && 0 === this.cm.getScanMode(), barcode: this.cm.getBarcode(), barcodeSide: this.cm.getBarcodeSide(), captureTimer: this.cm.getCaptureTimeout(), anonymizationMode: this.cm.getAnonymizationMode() }), this.engine.initializeEngine().then(() => {
      this.engineLoaded = true, this.CheckDependencies(this), this.cm.setAllowUnknownDocuments(false);
    }).catch((e4) => {
      this.divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { exceptionType: 5, message: e4.message } }));
    }));
  } catch (e3) {
    return ie.printError(e3.message), this.divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { exceptionType: 6, message: e3.message } })), void this.Stop();
  }
  if (this.cameraContainer = document.createElement("div"), this.cameraContainer.id = "cameraContainer", this.cameraContainer.style.overflow = "hidden", this.cameraContainer.style.position = "relative", this.cameraContainer.style.width = this.divContainer.offsetWidth + "px", this.cameraContainer.style.height = this.divContainer.offsetHeight + "px", this.divContainer.appendChild(this.cameraContainer), ie.printDebug("Init process - Camera Container linked"), this.checkCanvasDimensions(), this.loadingMessage = document.createElement("div"), this.cameraContainer.appendChild(this.loadingMessage), this.gifWait = document.createElement("img"), this.cameraContainer.appendChild(this.gifWait), this.gifWait.style.display = "none", this.gifWaitOnLoadContext = this.onWaitingLoaded.bind(this), this.gifWait.addEventListener("load", this.gifWaitOnLoadContext), this.gifWait.src = this.baseURL + "/resources/163dpi/loading.gif", ie.printDebug("Init process - Showing the loading animation"), this.cropFactor < 1) {
    let e3 = new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { message: "Invalid value of CropFactor. Must be equal or greather than 1.", exceptionType: 3 } });
    this.divContainer.dispatchEvent(e3), this.cropFactor = 1;
  }
  this.sceneTimeout <= 0 && (this.sceneTimeout = 0), window.location !== window.parent.location && ie.printDebug("widget running inside iframe.");
  let t2 = document.createElement("canvas");
  if (t2.id = "display", t2.style = "position:absolute; top:0px; left:0px; zIndex: 1;", this.cameraContainer.appendChild(t2), t2.width = this.cameraContainer.offsetWidth * this.devicePixelRatio, t2.height = this.cameraContainer.offsetHeight * this.devicePixelRatio, t2.style.width = this.cameraContainer.offsetWidth + "px", t2.style.height = this.cameraContainer.offsetHeight + "px", this.canvas = t2, this.canvasRotated = document.createElement("canvas"), this.canvasRotated.width = t2.height * this.devicePixelRatio, this.canvasRotated.height = t2.width * this.devicePixelRatio, this.onCanvasResizeContext = this.onCanvasResize.bind(this), window.addEventListener("resize", this.onCanvasResizeContext, false), ie.printDebug("Init process - Canvas linked"), this.initCamera(this.cameraContainer, this.cameraWidth, this.cameraHeight), null != e2) {
    ie.printDebug("Detected external camera stream, using this..."), this.stopCameraStream = false, this.cameraStream = e2, this.video.srcObject = e2;
    const t3 = e2.getVideoTracks()[0], i2 = t3.getSettings();
    this.cameraName = t3.label, ie.printDebug(`Camera Width: ${i2.width}; Camera Height: ${i2.height}; Camera Framerate: ${i2.frameRate}`), this.video.onloadedmetadata = this.videoLoaded.bind(this), this.video.play(), this.setCameraPosition(this.canvas, this.video);
  } else if (this.stopCameraStream = true, this.expectedExternalCamera) ie.printDebug("Entering into loading state until waits the external camera...");
  else {
    if (ie.printDebug("No detected external camera stream, running own stream..."), ie.printDebug("Init process - Checked parameters are correctly"), document.featurePolicy && false === document.featurePolicy.allowsFeature("camera") && (ie.printDebug("Feature Policy issue: Camera feature is restricted in the actual environment. Check your server HTTP Headers."), ie.printDebug("https://developers.google.com/web/updates/2018/06/feature-policy#js")), this.cameraCount = 1, this.cameraSelection) {
      this.isBrowserFirefox = navigator.userAgent.toLowerCase().includes("firefox"), this.isWebView = navigator.userAgent.includes("wv"), this.isBrowserFirefox || (await this.grantVideoPermission(), ie.printDebug("Init process - Checked camera permissions")), this.cameras = [];
      try {
        const e3 = await navigator.mediaDevices.enumerateDevices();
        this.cameras = e3.filter((e4) => "videoinput" === e4.kind);
      } catch (e3) {
        ie.printDebug("There was an error getting device media resources", e3);
      }
      if (this.isBrowserFirefox || this.isWebView) this.sortedDeviceCameras = this.cameras, this.cameraCount = this.cameras.length, ie.printDebug(this.cameraCount + " cameras found."), this.cameraId && -1 === this.cameras.findIndex((e3) => e3.deviceId === this.cameraId) && ie.printDebug("Camera ID provided by implementator is not present on the device, or there might be some misspelling mistake");
      else {
        ie.printDebug("Camera enumeration: ", this.cameras.length);
        let e3 = [], t3 = [], i2 = [], a2 = [];
        this.cameraCount = 0;
        for (let { deviceId: l2 } of this.cameras) try {
          let d2 = await navigator.mediaDevices.getUserMedia({ video: { deviceId: l2 } });
          if (d2.getVideoTracks().length > 0 && ("function" == typeof d2.getVideoTracks()[0].getCapabilities || "object" == typeof d2.getVideoTracks()[0].getSettings())) {
            const l3 = d2.getVideoTracks()[0], s2 = l3.getCapabilities ? l3.getCapabilities() : l3.getSettings();
            s2.focusMode ? (ie.printDebug(`Reading camera with id: ${s2.deviceId}; name: ${l3.label}; focusDiscance: ${JSON.stringify(s2.focusDistance)}; facingMode: ${JSON.stringify(s2.facingMode)}; focusMode: ${JSON.stringify(s2.focusMode)};`), "user" === s2.facingMode[0] ? (e3.push(s2), ie.printDebug(`Pushing front camera with id: ${s2.deviceId}; name: ${l3.label}`)) : s2.focusMode.some((e4) => "continuous" === e4) ? (t3.push(s2), ie.printDebug(`Pushing environment camera with id: ${s2.deviceId}; name: ${l3.label}`)) : (i2.push(s2), ie.printDebug(`Ignoring camera with id: ${s2.deviceId}; name: ${l3.label}`))) : (a2.push(s2), ie.printDebug(`Pushing camera with id: ${s2.deviceId}; name: ${l3.label}`)), l3.stop();
          }
          this.cameraCount++;
        } catch (e4) {
          ie.printError(`CameraSelection: Error opening camera with id "${l2 || null}".`), ie.printError(`${e4}`);
          let t4 = new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { message: `Error in CameraSelection function: Error with camera with id "${l2 || null}". ${e4}`, exceptionType: 0 } });
          return this.divContainer && this.divContainer.dispatchEvent(t4), void this.Stop();
        }
        if (e3.sort((e4, t4) => e4.focusMode.some((e5) => "continuous" === e5) && t4.focusMode.every((e5) => "continuous" !== e5) ? -1 : e4.focusMode.every((e5) => "continuous" !== e5) && t4.focusMode.some((e5) => "continuous" === e5) ? 1 : 0), t3.sort((e4, t4) => e4.width.max > t4.width.max && t4.width.max < 1080 ? -1 : e4.width.max < t4.width.max && e4.width.max < 1080 ? 1 : e4.iso.max > t4.iso.max ? -1 : e4.iso.max < t4.iso.max ? 1 : e4.torch && !t4.torch ? -1 : !e4.torch && t4.torch ? 1 : void 0), a2.length > 0 && a2[0].facingMode && a2.sort((e4, t4) => "user" === e4.facingMode[0] && "environment" === t4.facingMode[0] || "user" === e4.facingMode && "environment" === t4.facingMode ? 1 : "environment" === e4.facingMode[0] && "user" === t4.facingMode[0] || "environment" === e4.facingMode && "user" === t4.facingMode ? -1 : 0), this.sortedDeviceCameras = a2.concat(t3, e3, i2), this.sortedDeviceCameras.length > 0) {
          if (this.cameraId) {
            const e4 = this.sortedDeviceCameras.findIndex((e5) => e5.deviceId === this.cameraId);
            if (-1 !== e4) {
              const t4 = this.sortedDeviceCameras.splice(e4, 1);
              this.sortedDeviceCameras.unshift(t4[0]), ie.printInfo(`Modified sorted camera list. Camera with ID: ${t4[0].deviceId} is going to be used initially`);
            } else ie.printDebug("Camera ID provided by implementator is not present on the device, or there might be some misspelling mistake");
          }
          ie.printDebug("Accepted Environment cameras: " + t3.length), this.forceCameraId = this.sortedDeviceCameras[0].deviceId, ie.printDebug(this.cameraCount + " cameras found.");
        }
      }
    }
    ie.printDebug("Init process - Checked available cameras"), this.selectedSource = null, this.setVideoInput(this), this.setCameraPosition(this.canvas, this.video);
  }
  this.widgetTime = performance.now(), this.stateTime = this.widgetTime, ie.printDebug("Init process - Started Widget");
}, configureSearchMode: function() {
  const e2 = this.cm.getSpecificData();
  if (this.cm.getScanMode() !== Re.SelphID.ScanMode.Generic && e2) {
    if (null === this.cm.getAllowUncertain()) {
      let t2 = false;
      for (const i2 of e2) {
        const e3 = n[i2];
        e3 && e3.allowUncertain && (t2 = true);
      }
      this.cm.setAllowUncertain(t2);
    }
    if (null === this.cm.getBarcode()) if (this.cm.getScanMode() === Re.SelphID.ScanMode.Search && e2 && 1 === e2.length && this.cm.getDocumentType()) {
      const t2 = n[e2[0]];
      if (t2) {
        const e3 = Object.entries(t2.barcodeSide).find(([e4, t3]) => e4 === M[`${this.cm.getDocumentType()}`].toLowerCase() && null !== t3);
        if (e3) {
          const [t3, i2] = e3;
          this.cm.setBarcode(true), this.cm.setBarcodeSide(i2);
        } else this.cm.setBarcode(false);
      } else this.cm.setBarcode(false);
    } else this.cm.setBarcode(false);
  } else null === this.cm.getAllowUncertain() && this.cm.setAllowUncertain(false), null === this.cm.getBarcode() && this.cm.setBarcode(false), this.cm.getScanMode() === Re.SelphID.ScanMode.Search && this.cm.setScanMode(Re.SelphID.ScanMode.Generic);
}, StartManual: function() {
  this.selphIDSimpleMode = new Re.SelphID.SimpleMode(this.cm), this.selphIDSimpleMode.start();
}, Stop: function() {
  !this.engine || false !== this.cm.getKeepEngineAlive() && true !== this.sndRound ? !this.engine || true !== this.cm.getKeepEngineAlive() && false !== this.sndRound || Ie(this) : (this.sndRound && (globalThis.__selphid__engine = void 0), this.engine.finalizeEngine().then(() => {
    Ie(this), this.results && (this.results = null, this.workerCanvasContext = null);
  })), le.destroyWorker();
}, onWaitingLoaded: function() {
  if (this.cameraContainer) {
    let e2 = this.cameraContainer.offsetHeight / 2 - this.gifWait.height / 2, t2 = this.cameraContainer.offsetWidth / 2 - this.gifWait.width / 2;
    this.gifWait.style = "position:absolute; top:" + e2 + "px; left:" + t2 + "px;";
    let i2 = 0.6 * this.cameraContainer.offsetHeight;
    this.loadingMessage.style = "position: absolute; top:" + i2 + "px; width: 100%; text-align: center; font-size: 22.0px; color: #FFFFFF;", this.loadingMessage.innerHTML = this.rm.translate("loading_message");
  }
}, onCanvasResize: function() {
  if (!this.drawer || !this.rm) return;
  let e2 = this.canvas, t2 = e2.getContext("2d", { alpha: true }), i2 = this.video;
  this.cameraWidth = i2.videoWidth, this.cameraHeight = i2.videoHeight, 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = this.cameraWidth, this.privateCanvas.height = this.cameraHeight) : (this.privateCanvas.width = this.cameraHeight, this.privateCanvas.height = this.cameraWidth), this.imagesProcessed = 0, this.cameraContainer.style.width = this.divContainer.offsetWidth + "px", this.cameraContainer.style.height = this.divContainer.offsetHeight + "px", e2.width = this.cameraContainer.offsetWidth * this.devicePixelRatio, e2.height = this.cameraContainer.offsetHeight * this.devicePixelRatio, e2.style.width = this.cameraContainer.offsetWidth + "px", e2.style.height = this.cameraContainer.offsetHeight + "px", e2.style.position = "absolute", e2.style.zIndex = 1, this.canvasRotated.width = e2.height, this.canvasRotated.height = e2.width, void 0 !== this.state && (e2.width < e2.height && this.cm.forceLandscape ? (this.drawer.setCanvasSize(this.cameraContainer.offsetHeight, this.cameraContainer.offsetWidth), this.elements = this.rm.getElements(this.resourceParent, true)) : (this.drawer.setCanvasSize(this.cameraContainer.offsetWidth, this.cameraContainer.offsetHeight), this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape))), this.checkCanvasDimensions(), this.startVideos(this), this.setCameraPosition(t2, i2), this.cm.getAccessibility() && this.elements && this.getAccessibilityData();
}, getAccessibilityData: function() {
  let e2 = this.canvas.getContext("2d", { alpha: true }), t2 = e2.canvas.width, i2 = e2.canvas.height, a2 = {};
  a2.state = this.state;
  let l2 = [];
  null === this.elements && (this.elements = []);
  for (let d2 = 0; d2 < this.elements.length; d2++) if (this.cm.getAccessibleElements().includes(this.elements[d2].type)) {
    let s2 = this.drawer.getLayout(e2, this.resourceParent, this.elements[d2].id, this.elements[d2].type, this.secondsWidget, this.secondsState, "Normal", a2);
    null !== s2 && (s2 = this.getLayoutFromXML(this.resourceParent, this.elements[d2].id, s2, t2, i2)), null !== s2 && l2.push({ id: this.elements[d2].id, type: this.elements[d2].type, x: s2.x, y: s2.y, width: s2.width, height: s2.height });
  }
  if (l2.length > 0) {
    let e3 = new CustomEvent("FPhi.SelphID.AccessibilityStatus.event", { detail: { code: Re.SelphID.TrackStatus.AccessibilityData, view: this.state, timeStamp: this.secondsWidget, data: l2 } });
    this.divContainer.dispatchEvent(e3);
  }
}, checkCanvasDimensions: function() {
  this.cameraContainer.offsetWidth < this.cameraContainer.offsetHeight && this.cm.forceLandscape ? ((this.cameraContainer.offsetWidth < 400 || this.cameraContainer.offsetHeight < 550) && ie.printDebug("Warning!!! Minimum visual dimensions check failed. "), ie.printDebug("Actual widget size: " + this.cameraContainer.offsetWidth + "x" + this.cameraContainer.offsetHeight), ie.printDebug("Minimum widget size: 400x550")) : ((this.cameraContainer.offsetWidth < 550 || this.cameraContainer.offsetHeight < 400) && ie.printDebug("Warning!!! Minimum visual dimensions check failed. "), ie.printDebug("Actual widget size: " + this.cameraContainer.offsetWidth + "x" + this.cameraContainer.offsetHeight), ie.printDebug("Minimum widget size: 550x400"));
}, printLog: function(e2) {
  this.showLog && console.log(e2);
}, onOrientationChange: function() {
  window.screen.orientation;
}, GetAvailableCameras: function() {
  return navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleCameraError) : null;
}, compareArray: function(e2, t2) {
  if (!e2) return false;
  if (!t2) return false;
  if (e2.length !== t2.length) return false;
  for (let i2 = 0; i2 < e2.length; i2++) if (e2[i2] !== t2[i2]) return false;
  return true;
}, setCameraPosition: function(e2, t2) {
  let i2 = this.drawer.getCameraRect(e2, this.cameraWidth, this.cameraHeight, this.cameraContainer.offsetWidth, this.cameraContainer.offsetHeight, this.resourceParent);
  if (!this.cm.getCameraOverflow()) {
    let t3 = this.drawer.getDocRectScreenSpace(this.cameraContainer.offsetWidth, this.cameraContainer.offsetHeight, 0);
    i2 = this.drawer.getCameraRect(e2, this.cameraWidth, this.cameraHeight, t3.width, t3.height, this.resourceParent), i2.x += t3.x, i2.y += t3.y, this.cm.forceLandscape && this.cameraContainer.offsetWidth < this.cameraContainer.offsetHeight && (t3 = this.drawer.getDocRectScreenSpace(this.cameraContainer.offsetHeight, this.cameraContainer.offsetWidth, 0), i2 = this.drawer.getCameraRect(e2, this.cameraWidth, this.cameraHeight, t3.width, t3.height, this.resourceParent), i2.x += t3.x, i2.y += t3.y, i2 = { x: this.cameraContainer.offsetWidth - i2.y - i2.height / 2 - i2.width / 2, y: i2.y = i2.x + i2.width / 2 - i2.height / 2, width: i2.width, height: i2.height, visible: true });
    let a3 = 1.1;
    i2.x += i2.width * (1 - a3) / 2, i2.y += i2.height * (1 - a3) / 2, i2.width *= a3, i2.height *= a3;
  }
  this.cm.forceLandscape && (this.cameraContainer.offsetWidth, this.cameraContainer.offsetHeight);
  let a2 = "0deg", l2 = "none" === t2.style.display;
  true === this.cameraMustFlip && (a2 = "180deg");
  let d2 = "";
  this.expectedExternalCamera && (d2 += "zoom: 95%; "), i2.visible ? d2 += `position: absolute; top: ${i2.y}px; left: ${i2.x}px; width: ${i2.width}px; height: ${i2.height}px; transform: rotateY(${a2}); zImage: 0;` : d2 += `position: absolute; top: -10000px; left: 0px; width: ${i2.width}px; height: ${i2.height}px; transform: rotateY(${a2}); zIndex: 0;`, t2.style = d2, l2 && (t2.style.display = "none");
}, OnGraphNewState: async function(e2) {
  this.stateTime = performance.now();
  let t2 = this.canvas;
  this.secondsWidget = (this.actualTime - this.widgetTime) / 1e3, this.secondsState = (this.actualTime - this.stateTime) / 1e3, this.state = e2, this.resourceParent = this.drawer.getResourceIdForState(e2);
  let i2 = this.video;
  if (this.setCameraPosition(t2.getContext("2d", { alpha: true }), i2), "UCNothing" === this.state || void 0 === this.state) {
    this.actualTime = this.stateTime, this.widgetTime = this.stateTime;
    let e3 = this.canvas, t3 = this.video;
    e3 && (e3.style.display = "inline-block"), t3 && (t3.style.display = "inline-block");
  }
  if (ie.printDebug("state: " + e2), this.elements) for (let e3 = 0; e3 < this.elements.length; e3++) this.elements[e3].videoPlayer && (this.elements[e3].videoPlayer.pause(), this.elements[e3].videoPlayer.removeAttribute("src"), this.elements[e3].videoPlayer.removeEventListener("ended", this.videoplayerEnded.bind(self), false), this.elements[e3].videoPlayer.load(), this.elements[e3].videoPlayer = null);
  if (this.elements = null, this.resourceParent && (this.canvas.width < this.canvas.height && this.cm.forceLandscape ? this.elements = this.rm.getElements(this.resourceParent, true) : this.elements = this.rm.getElements(this.resourceParent, this.drawer.landscape), this.startVideos(this)), "UCNothing" === e2) this.clockNewScenario = performance.now(), this.lastExtractionResult = null, this.privateImages = [], this.retries = 0, this.status = Re.SelphID.Mode.Front, void 0 !== globalThis.__selphid__engine && (this.status = Re.SelphID.Mode.Back, this.sndRound = true, globalThis.__selphid__engine = void 0);
  else if ("UCCapture" === e2) this.clockNewScenario = performance.now(), this.imagesProcessed = 0, this.imageCaptured = false, this.imageCapturedTime = 0, this.previewImage = void 0, this.contour = [false, false, false, false], this.status === Re.SelphID.Mode.Back ? this.privateImages.length = 1 : this.privateImages = [];
  else if ("UCCaptureCameraSwitch" === e2) {
    if (this.cameraStream) {
      let e3 = this.cameraStream.getVideoTracks(), t3 = this.cameraStream.getVideoTracks()[0].getSettings().deviceId, a2 = this.sortedDeviceCameras, l2 = -1, d2 = -1;
      if (a2.forEach((e4) => {
        e4.deviceId === t3 && (l2 = a2.indexOf(e4));
      }), d2 = l2 === a2.length - 1 ? 0 : l2 + 1, -1 !== d2 && d2 !== l2) {
        ie.printInfo("Camera rotation list");
        for (let e4 = 0; e4 < a2.length; e4++) e4 === d2 ? ie.printDebug("  * Camera id: " + a2[e4].deviceId + " name: " + a2[e4].label) : ie.printInfo("  Camera id: " + a2[e4].deviceId + " name: " + a2[e4].label);
        this.video.pause(), e3.forEach(function(e4) {
          e4.stop();
        }), this.cameraStream = null, this.video.srcObject = null;
        let t4 = this.cm.getCameraWidth(), l3 = this.cm.getCameraHeight(), s2 = { video: { deviceId: a2[d2].deviceId, width: t4, height: l3 }, audio: false };
        self = this, navigator.mediaDevices.getUserMedia(s2).then(async function(e4) {
          self.cameraStream = e4;
          const t5 = self.cameraStream.getVideoTracks()[0], l4 = "function" === t5.getCapabilities ? t5.getCapabilities() : t5.getSettings();
          l4.facingMode ? "user" === l4.facingMode || "user" === l4.facingMode[0] ? (ie.printDebug(`Selecting Camera for Play with id: ${l4.deviceId}; name: ${t5.name}; facingMode = ${JSON.stringify(l4.facingMode)}, getCameraMirror = ${self.cameraMirror}`), self.cameraMustFlip = self.cameraMirror) : "environment" !== l4.facingMode && "environment" !== l4.facingMode[0] || (ie.printDebug(`Selecting Camera for Play with id: ${l4.deviceId}; name: ${t5.name}; facingMode = ${JSON.stringify(l4.facingMode)}, getCameraMirror = ${self.cameraMirror}`), self.cameraMustFlip = false) : ie.printDebug(`Selecting Camera for Play with id: ${l4.deviceId}; name: ${t5.name}, getCameraMirror = ${self.cameraMirror}`), self.cameraId = l4.deviceId, i2.srcObject = e4, self.cm.getVideoRecord() && self.cm.getVideoRecordType() === Re.SelphID.RecorderType.Local && self.recorder.replaceCurrentRecorder(e4), self.switchTimeoutHandler = setTimeout(() => {
            self.video.pause(), self.cameraStream.getVideoTracks().forEach(function(e5) {
              e5.stop();
            }), self.retries = 0, self.graph.sendMessage("retry");
          }, 5e3), i2.play().then(() => {
            ie.printDebug("Camera switch success. New camera with id: " + a2[d2].deviceId), clearTimeout(self.switchTimeoutHandler), self.setCameraPosition(self.canvas.getContext("2d", { alpha: true }), self.video), self.graph.sendMessage("cameraSwitched");
          }).catch((e5) => {
            ie.printDebug("Camera switch unsuccess."), ie.printDebug(e5), clearTimeout(self.switchTimeoutHandler), self.retries = 0, self.graph.sendMessage("retry");
          });
        }).catch(function(e4) {
          ie.printDebug(`Fatal error camera switch. Error: ${e4}`);
        });
      } else ie.printDebug("Camera switch aborted. Only 1 available camera."), this.graph.sendMessage("cameraSwitched");
    }
  } else if ("UCPreview" === e2) this.clockNewScenario = performance.now();
  else if ("UCRepeat" === e2) true === this.sndRound && (this.cm.getRetryOnlyCurrentSide() ? this.status = Re.SelphID.Mode.Back : (globalThis.__selphid__engine = void 0, this.sndRound = false)), this.previewImage = void 0, this.croppedFrontImageWithUnknownDocument = void 0, this.imageCaptured = false, this.retries = 0, this.isDocumentAlreadyDetected = false, this.cm.getRetryOnlyCurrentSide() || (this.status = Re.SelphID.Mode.Front), await this.engine.cleanImageBuffer(this.status, this.cm.getRetryOnlyCurrentSide()), this.graph.sendMessage("repeat");
  else if ("UCPreviewDecision" === e2) switch (this.cm.getDocumentMode()) {
    case Re.SelphID.DocumentMode.SingleSide:
      this.graph.sendMessage("Finish");
      break;
    case Re.SelphID.DocumentMode.DoubleSide:
    case Re.SelphID.DocumentMode.Auto:
      this.status === Re.SelphID.Mode.Back || this.results.extractionData.isSingleSideDocument || 3 === this.results.extractionData.documentType ? this.graph.sendMessage("Finish") : this.graph.sendMessage("Next");
  }
  else if ("UCFlip" === e2) this.status = Re.SelphID.Mode.Back, this.retries = 0, this.isDocumentAlreadyDetected = false, this.cm.getVideoRecord() && this.cm.getVideoRecordType() === Re.SelphID.RecorderType.Local && this.recorder.generateNewRecorder();
  else if ("UCCancelByUser" === e2) {
    this.clockNewScenario = performance.now();
    let e3 = new CustomEvent("FPhi.SelphID.UserCancel.event");
    this.divContainer.dispatchEvent(e3), this.Stop();
  } else if ("UCFinish" === e2) {
    if (this.results.cameraId = this.cameraId, this.cm.getVideoRecord() && (this.recordedVideo ? (this.results.video = this.recordedVideo, this.results.videoStatus = Re.SelphID.RecorderStatus.Ok) : this.results.videoStatus = Re.SelphID.RecorderStatus.SocketError), this.cm.getKeepEngineAlive() && (globalThis.__selphid__engine = this.engine), this.cropFactor > 1 && this.results.images.faceImage && this.results.imagesRaw.faceImage) {
      const e4 = this.getImgTag(this.results.imagesRaw.faceImage, this.cropFactor, this.imageFormat, this.imageQuality);
      this.results.images.faceImage = e4;
    }
    this.results.isDocumentDetected && delete this.results.isDocumentDetected;
    let e3 = new CustomEvent("FPhi.SelphID.Finish.event", { detail: this.results });
    this.divContainer.dispatchEvent(e3), this.Stop();
  } else if ("UCTimeout" === e2) this.divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExtractionTimeout.event", { detail: { documentPresent: this.getDocumentDetectionStatus() } })), this.Stop();
  else if ("UCErrors" === e2) {
    let e3 = { livenessMoveFails: this.livenessMoveActualFailedAttempts, livenessMoveHistory: this.livenessMoveHistory, livenessMoveStabilizedHistory: this.livenessMoveStabilizedStatusHistory, livenessMoveStabilizedStatus: this.livenessMoveLastStabilizedStatus };
    if (null != this.lastExtractionResult && null != this.lastExtractionResult.sunGlassesScore && (e3.sunGlassesScore = this.lastExtractionResult.sunGlassesScore), this.clockNewScenario = performance.now(), this.livenessDiagnostic < 0) this.divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExtractionTimeout.event", { detail: { detailData: e3, documentPresent: this.getDocumentDetectionStatus() } }));
    else {
      e3.livenessErrorType = this.livenessDiagnostic;
      let t3 = new CustomEvent("FPhi.SelphID.LivenessError.event", { detail: e3 });
      this.divContainer.dispatchEvent(t3);
    }
  } else if ("UCWaitRecording" === e2) {
    if (this.cm.getVideoRecord()) {
      ie.printDebug("generating movie"), this.recorderWorking = true;
      let e3 = this;
      this.recorder.generateVideo().then(function(t3) {
        e3.recorderWorking = false, e3.recorderFinish = true, e3.recordedVideo = t3;
      }).catch(function(t3) {
        console.error("Error generating video", t3.message), e3.recorderWorking = false, e3.recorderFinish = true;
      });
    }
  } else "UCJumpSimpleMode" === e2 && (this.Stop(), this.cm.getAccessibility() && (this.cm.accessibility = false), this.StartManual());
  if (this.divContainer) {
    let t3 = new CustomEvent("FPhi.SelphID.TrackStatus.event", { detail: { code: Re.SelphID.TrackStatus.ChangeState, timeStamp: this.secondsWidget, data: e2, documentPresent: this.getDocumentDetectionStatus() } });
    this.divContainer.dispatchEvent(t3), this.cm.getAccessibility() && this.elements && this.getAccessibilityData();
  }
  null != this.graph && this.graph.sendMessage("SetStatusFinished");
}, getImageData: function(e2) {
  let t2 = e2.getContext("2d", { alpha: true }), i2 = e2.height, a2 = e2.width;
  return { width: a2, height: i2, pixels: t2.getImageData(0, 0, a2, i2), time: performance.now() };
}, getImgTag: function(e2, t2, i2, a2) {
  if (0 === e2.width && 0 === e2.height) return null;
  const l2 = document.createElement("canvas");
  l2.width = e2.width, l2.height = e2.height, l2.getContext("2d").putImageData(e2, 0, 0);
  const d2 = document.createElement("canvas");
  let s2 = 10 * t2, n2 = 40 * t2, c2 = e2.width - s2, r2 = e2.height - n2;
  return d2.width = c2, d2.height = r2, d2.getContext("2d").drawImage(l2, s2, n2, c2, r2, 0, 0, d2.width, d2.height), d2.toDataURL(i2, a2);
}, startVideos: function(e2) {
  if (e2.elements) {
    for (let i2 = 0; i2 < e2.elements.length; i2++) if ("video" === e2.elements[i2].type) {
      let a2 = document.createElement("video");
      a2.hidden = true, a2.playsinline = true, a2.loop = false, a2.muted = true, a2.autoplay = true, a2.controls = true, a2.src = e2.rm.getResourceUrlBase(e2.rm.getSetupResourceId(e2.resourceParent, e2.elements[i2].id, e2.canvas.width < e2.canvas.height, "value")), a2.addEventListener("ended", e2.videoplayerEnded.bind(e2), false), a2.setAttribute("playsinline", ""), a2.setAttribute("webkit-playsinline", ""), a2.setAttribute("muted", true), a2.setAttribute("volume", 0), a2.addEventListener("play", () => {
        a2.muted = true, a2.volume = 0;
      });
      var t2 = a2.play();
      void 0 !== t2 && t2.then((e3) => {
      }).catch((e3) => {
        ie.printDebug("Video stopped before is fully loaded");
      }), e2.elements[i2].videoPlayer = a2, ie.printDebug("start of video: " + e2.elements[i2].id, e2.elements[i2]);
    }
  }
}, canvasOnMove: function(e2) {
  if (this.elements) {
    for (let t2 = this.elements.length - 1; t2 >= 0; t2--) if (void 0 !== this.elements[t2].layout && e2.offsetX >= this.elements[t2].layout.x && e2.offsetX < this.elements[t2].layout.x + this.elements[t2].layout.width && e2.offsetY >= this.elements[t2].layout.y && e2.offsetY < this.elements[t2].layout.y + this.elements[t2].layout.height) {
      this.drawer.onMouseMove(e2.target, this.elements[t2].layout, this.resourceParent, this.elements[t2].id, this.elements[t2].type);
      break;
    }
  }
}, routeClick: function(e2, t2) {
  this.canvasOnClick({ offsetX: e2, offsetY: t2 });
}, canvasOnClick: function(e2) {
  if ("UCErrors" === this.state) {
    if (e2.offsetX, e2.offsetY > this.canvasHeight - this.buttonHeight) {
      let e3;
      -1 === this.livenessDiagnostic ? (e3 = new CustomEvent("FPhi.SelphID.TimeoutErrorButtonClick.event"), this.divContainer.dispatchEvent(e3)) : (e3 = new CustomEvent("FPhi.SelphID.LivenessErrorButtonClick.event"), this.divContainer.dispatchEvent(e3));
    }
  } else {
    if (void 0 === this.elements) return;
    let t2 = null;
    for (let i2 = this.elements.length - 1; i2 >= 0; i2--) {
      let a2 = e2.offsetX, l2 = e2.offsetY;
      if (this.canvas.width < this.canvas.height && this.cm.forceLandscape && (a2 = e2.offsetY, l2 = this.canvas.width / this.devicePixelRatio - e2.offsetX), null != this.elements[i2].layout && a2 >= this.elements[i2].layout.x && a2 < this.elements[i2].layout.x + this.elements[i2].layout.width && l2 >= this.elements[i2].layout.y && l2 < this.elements[i2].layout.y + this.elements[i2].layout.height) {
        t2 = this.elements[i2].id;
        let e3 = new CustomEvent("FPhi.SelphID.TrackStatus.event", { detail: { code: Re.SelphID.TrackStatus.Tap, timeStamp: this.secondsWidget, data: t2, documentPresent: this.getDocumentDetectionStatus() } });
        this.divContainer.dispatchEvent(e3);
        let a3 = "Click//" + this.elements[i2].id;
        this.graph.sendMessage(a3);
        break;
      }
    }
  }
}, initCamera: function(e2, t2, i2, a2 = true) {
  let l2 = this.canvas;
  if (!this.video) {
    let t3 = document.createElement("video");
    t3.id = "live", t3.setAttribute("playsinline", ""), t3.setAttribute("webkit-playsinline", ""), t3.setAttribute("autoplay", a2), t3.setAttribute("muted", ""), t3.setAttribute("muted", true), t3.setAttribute("volume", 0), t3.addEventListener("play", () => {
      t3.muted = true, t3.volume = 0;
    }), t3.style = "display: none;", e2.insertBefore(t3, e2.firstChild), this.video = t3;
  }
  l2.imageSmoothingEnabled = true, l2 && (l2.style.display = "none", l2.style.position = "absolute", l2.style.zIndex = 1, l2.onclick = this.canvasOnClick.bind(this), l2.addEventListener("mousemove", this.canvasOnMove.bind(this), false), this.privateCanvas = document.createElement("canvas"), 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = t2, this.privateCanvas.height = i2) : (this.privateCanvas.width = i2, this.privateCanvas.height = t2));
}, grantVideoPermission: async function(e2) {
  try {
    let e3 = { video: { width: 640, height: 480 }, audio: false };
    (await navigator.mediaDevices.getUserMedia(e3)).getTracks().forEach((e4) => {
      e4.stop();
    });
  } catch (e3) {
    this.divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { exceptionType: 0, message: "" + e3.message } }));
  }
}, setVideoInput: function(e2) {
  e2.canvas && e2.playDevice(e2);
}, playDevice: async function(e2) {
  let t2 = this.video, i2 = (this.canvas.getContext("2d", { alpha: true }), { video: {}, audio: {} });
  window.stream && window.stream.getTracks().forEach((e3) => {
    e3.stop();
  }), i2 = e2.forceCameraId ? { video: { deviceId: e2.forceCameraId, width: e2.cm.cameraWidth, height: e2.cm.cameraHeight }, audio: false } : { video: { deviceId: e2.cameraId ? { exact: e2.cameraId } : void 0, width: e2.cm.cameraWidth, height: e2.cm.cameraHeight, facingMode: "environment", focusMode: "continuous" }, audio: false }, navigator.mediaDevices.getUserMedia(i2).then(async function(i3) {
    e2.cameraStream = i3;
    const a2 = e2.cameraStream.getVideoTracks()[0], l2 = "function" == typeof a2.getCapabilities ? a2.getCapabilities() : a2.getSettings();
    l2.facingMode ? "user" === l2.facingMode || "user" === l2.facingMode[0] ? (ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a2.name}; facingMode = ${JSON.stringify(l2.facingMode)}, getCameraMirror = ${e2.cameraMirror}`), e2.cameraMustFlip = e2.cameraMirror) : "environment" !== l2.facingMode && "environment" !== l2.facingMode[0] || (ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a2.name}; facingMode = ${JSON.stringify(l2.facingMode)}, getCameraMirror = ${e2.cameraMirror}`), e2.cameraMustFlip = false) : (e2.cameraMustFlip = e2.cameraMirror, ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a2.name}, getCameraMirror = ${e2.cameraMirror}`)), e2.cameraName = a2.label, ie.printDebug("Camera selected for widget: " + a2.label), e2.cameraId = l2.deviceId, t2.onloadedmetadata = e2.videoLoaded.bind(e2), t2.srcObject = i3, t2.play();
  }).catch(function(i3) {
    ie.printDebug(`Error opening camera with id: ${e2.cameraId}`);
    let a2 = { video: { width: e2.cm.getCameraWidth(), height: e2.cm.getCameraHeight(), facingMode: "environment" }, audio: false };
    navigator.mediaDevices.getUserMedia(a2).then(async function(i4) {
      e2.cameraStream = i4;
      const a3 = i4.getVideoTracks()[0], l2 = "function" == typeof a3.getCapabilities ? a3.getCapabilities() : a3.getSettings();
      e2.cameraName = a3.label, ie.printDebug("Camera selected for widget: " + a3.label), l2.facingMode ? "user" === l2.facingMode || "user" === l2.facingMode[0] ? (ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a3.name}; facingMode = ${JSON.stringify(l2.facingMode)}, getCameraMirror = ${e2.cameraMirror}`), e2.cameraMustFlip = e2.cameraMirror) : "environment" !== l2.facingMode && "environment" !== l2.facingMode[0] || (ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a3.name}; facingMode = ${JSON.stringify(l2.facingMode)}, getCameraMirror = ${e2.cameraMirror}`), e2.cameraMustFlip = false) : (e2.cameraMustFlip = e2.cameraMirror, ie.printDebug(`Selecting Camera for Play with id: ${l2.deviceId}; name: ${a3.name}, getCameraMirror = ${e2.cameraMirror}`)), e2.cameraId = l2.deviceId, t2.onloadedmetadata = e2.videoLoaded.bind(e2), t2.srcObject = i4, t2.play();
    }).catch(function(t3) {
      let i4 = new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { message: t3.message, exceptionType: 0 } });
      e2.divContainer.dispatchEvent(i4);
    });
  });
}, handleRecorderDataAvailable: function(e2) {
  e2.data && e2.data.size > 0 && this.recordedBlobs.push(e2.data);
}, mobileCheck: function() {
  let e2 = false;
  return function(t2) {
    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t2) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t2.substr(0, 4))) && (e2 = true);
  }(navigator.userAgent || navigator.vendor || window.opera), e2;
}, isIpadOS: function() {
  return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
}, gotDevices: function(e2) {
  let t2 = 0;
  for (let i3 = 0; i3 !== e2.length; ++i3) "videoinput" === e2[i3].kind && t2++;
  this.cameraList = new Array(t2);
  let i2 = 0;
  for (let t3 = 0; t3 !== e2.length; ++t3) {
    let a3 = e2[t3];
    if ("videoinput" === a3.kind) {
      let e3 = document.createElement("option");
      e3.value = a3.deviceId, e3.text = a3.label, this.cameraList[i2] = e3, i2++;
    }
  }
  let a2 = new CustomEvent("FPhi.SelphID.Cameras.event", { detail: { cameras: this.cameraList } });
  this.divContainer.dispatchEvent(a2);
}, handleCameraError: function(e2) {
}, getLayoutFromXML: function(e2, t2, i2, a2, l2) {
  let d2 = "LEFT", s2 = "TOP", n2 = i2, c2 = false;
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "width")) {
    null == n2 && (n2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "width");
    n2.width = i3 <= 1 ? i3 * a2 : i3, c2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "height")) {
    null == n2 && (n2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "height");
    n2.height = i3 <= 1 ? i3 * l2 : i3, c2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "xAnchor") && (d2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "xAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "yAnchor") && (s2 = this.rm.getSetupAlign(e2, t2, this.drawer.landscape, "yAnchor")), this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "x")) {
    null == n2 && (n2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "x");
    n2.x = i3 <= 1 && i3 >= -1 ? i3 * a2 : i3, "CENTER" === d2 ? n2.x = a2 / 2 - n2.width / 2 + n2.x : "RIGHT" === d2 && (n2.x = a2 - n2.width + n2.x), c2 = true;
  }
  if (this.rm.isAttributeAvailable(e2, t2, this.drawer.landscape, "y")) {
    null == n2 && (n2 = {});
    let i3 = this.rm.getSetupFloat(e2, t2, this.drawer.landscape, "y");
    n2.y = i3 <= 1 && i3 >= -1 ? i3 * l2 : i3, "CENTER" === s2 ? n2.y = l2 / 2 - n2.height / 2 + n2.y : "BOTTOM" === s2 && (n2.y = l2 - n2.height + n2.y), c2 = true;
  }
  return n2;
}, draw: function(e2, t2) {
  var _a, _b, _c;
  if (null == e2.drawer) return;
  let i2 = e2.canvas.getContext("2d", { alpha: true });
  e2.canvas.width < e2.canvas.height && e2.cm.forceLandscape && (i2 = e2.canvasRotated.getContext("2d", { alpha: true }));
  let a2 = i2.canvas.width, l2 = i2.canvas.height;
  i2.clearRect(0, 0, a2, l2), this.canvasWidth = a2, this.canvasHeight = l2, e2.fpsframes++, e2.actualTimePrev = e2.actualTime, e2.actualTime = performance.now();
  let d2 = (e2.actualTime - e2.fpsTime) / 1e3;
  d2 > 1 && (e2.fps = e2.fpsframes / d2, e2.fpseframes > 0 ? e2.fpse = e2.fpseframes / d2 : e2.fpse = 0, e2.fpsTime = e2.actualTime, e2.fpsframes = 0, e2.fpseframes = 0), e2.video && (e2.videoWidthOld === e2.video.videoWidth && e2.videoHeightOld === e2.video.videoHeight || e2.onCanvasResize(), e2.videoWidthOld = e2.video.videoWidth, e2.videoHeightOld = e2.video.videoHeight);
  let s2 = "Normal";
  if ("UCCaptureStatus" === e2.state && false === e2.imageCaptured && (s2 = "Warning"), e2.iterateAutomata(e2, t2, i2), e2.secondsWidget = (e2.actualTime - e2.widgetTime) / 1e3, e2.secondsState = (e2.actualTime - e2.stateTime) / 1e3, i2.save(), i2.scale(e2.devicePixelRatio, e2.devicePixelRatio), void 0 !== e2.elements && null !== e2.elements) {
    let d3 = { progress: 0 };
    d3.state = e2.state, d3.contour = e2.contour, d3.status = e2.status, d3.previewImage = e2.previewImage, d3.forceLandscape = e2.cm.getForceLandscape(), d3.diagnostic = e2.diagnostic, d3.cameraOverflow = e2.cm.getCameraOverflow();
    for (let n2 = 0; n2 < e2.elements.length; n2++) {
      let c2 = e2.drawer.getLayout(i2, e2.resourceParent, e2.elements[n2].id, e2.elements[n2].type, e2.secondsWidget, e2.secondsState, s2, d3);
      if (null != c2 && (c2 = e2.getLayoutFromXML(e2.resourceParent, e2.elements[n2].id, c2, a2, l2)), null != c2) {
        e2.elements[n2].layout = c2;
        let a3 = e2.elements[n2].mode, l3 = false;
        if (null != a3) {
          let e3 = a3.split("|");
          for (let t3 = 0; t3 < e3.length; t3++) if (e3[t3] === s2) {
            l3 = true;
            break;
          }
        } else l3 = true;
        if (true === l3) {
          if ("video" === e2.elements[n2].type) d3.player = e2.elements[n2].videoPlayer;
          else if ("camera" === e2.elements[n2].type) {
            let i3 = e2.privateCanvas.getContext("2d");
            switch (i3.save(), e2.cameraRotation) {
              case 0:
                i3.drawImage(t2, 0, 0, e2.cameraWidth, e2.cameraHeight);
                break;
              case 1:
              case 3:
                i3.translate(e2.cameraHeight / 2, e2.cameraWidth / 2), i3.rotate(Math.PI / 2 * e2.cameraRotation), i3.drawImage(t2, -e2.cameraWidth / 2, -e2.cameraHeight / 2);
                break;
              case 2:
                i3.translate(e2.cameraWidth / 2, e2.cameraHeight / 2), i3.rotate(Math.PI / 2 * e2.cameraRotation), i3.drawImage(t2, -e2.cameraWidth / 2, -e2.cameraHeight / 2);
            }
            switch (i3.restore(), d3.camera = e2.privateCanvas, e2.cameraRotation) {
              case 0:
              case 2:
                d3.width = e2.cameraWidth, d3.height = e2.cameraHeight;
                break;
              default:
                d3.width = e2.cameraHeight, d3.height = e2.cameraWidth;
            }
            d3.cameraRotation = e2.cameraRotation, d3.cameraMustFlip = e2.cameraMustFlip;
          }
          e2.cm.getAccessibility() && e2.cm.getAccessibleElements().includes(e2.elements[n2].type) || e2.drawer.draw(i2, c2, e2.resourceParent, e2.elements[n2].id, e2.elements[n2].type, e2.secondsWidget, e2.secondsState, s2, d3);
        }
      }
    }
  } else if ("UCErrors" === e2.state) {
    i2.fillStyle = "white", i2.fillRect(0, 0, a2, l2);
    let t3 = e2.livenessErrorString, d3 = 15 * e2.fontSizeFactor, s3 = e2.rm.getSetupResourceId("facephi-widget-conf", "", "font_warning_message");
    i2.font = d3 + "px '" + s3 + "'", i2.fillStyle = "black";
    let n2 = t3.split("\n");
    for (let t4 = 0; t4 < n2.length; t4++) {
      let l3 = i2.measureText(n2[t4]), s4 = 330 * e2.canvasSizeFactor + d3 * t4;
      i2.fillText(n2[t4], a2 / 2 - l3.width / 2, s4);
    }
    let c2 = e2.livenessErrorImage, r2 = e2.scaleRect({ width: c2.width, height: c2.height }, { x: 0.03 * a2, y: 0.378 * l2, width: 0.94 * a2, height: 0.1 * l2 }, true);
    i2.drawImage(c2, r2.x, r2.y, r2.width, r2.height), e2.drawButton(e2, i2, { x: 0, y: l2 - e2.buttonHeight, width: a2, height: e2.buttonHeight }, "Results", "button_finish"), e2.secondsState;
  } else "UCTimeout" === e2.state && (i2.fillStyle = "white", i2.fillRect(0, 0, a2, l2));
  if (e2.debug) {
    let t3 = 4;
    if (i2.fillStyle = "#ff000044", i2.fillRect(0, 51, 250, 320), i2.lineWidth = 1, i2.strokeStyle = "#ff000088", i2.strokeRect(0, 51, 250, 320), i2.font = "14px Poppins-SemiBold", e2.drawBorderedText(i2, "Preview: " + e2.preview, 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "State: " + e2.state, 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "FPS: " + e2.fps.toFixed(2), 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "FPS Extractor: " + e2.fpse.toFixed(2), 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Camera size: " + e2.cameraWidth + "x" + e2.cameraHeight + " px", 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Canvas size: " + a2 + "x" + l2 + " px", 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Camera rotation: " + e2.cameraRotation, 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "WidgetTime: " + e2.secondsWidget.toFixed(2), 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "StateTime: " + e2.secondsState.toFixed(2), 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Operating mode: " + s2, 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Internal status: " + ((_a = e2.detectionStatus) == null ? void 0 : _a.internalStatus), 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Detection status: " + f[(_b = e2.detectionStatus) == null ? void 0 : _b.status], 3, 20 * t3, "black", "white"), t3++, e2.drawBorderedText(i2, "Glare detection: " + ((_c = e2.detectionStatus) == null ? void 0 : _c.glare), 3, 20 * t3, "black", "white"), t3++, e2.docRect && a2 > 0 && e2.cameraWidth > 0 && e2.cameraHeight > 0) {
      let t4 = a2 / e2.devicePixelRatio / 4, l3 = t4 / e2.cameraWidth, d3 = e2.cameraHeight * l3;
      i2.drawImage(e2.privateCanvas, 0, 0, e2.cameraWidth, e2.cameraHeight, a2 / e2.devicePixelRatio - t4 - 5, 55, t4, d3);
    }
  }
  if (i2.restore(), e2.canvas.width < e2.canvas.height && e2.cm.forceLandscape) {
    let t3 = e2.canvas.getContext("2d", { alpha: true });
    t3.clearRect(0, 0, t3.canvas.width, t3.canvas.height), t3.save(), t3.translate(t3.canvas.width / 2, t3.canvas.height / 2), t3.rotate(Math.PI / 2), t3.drawImage(e2.canvasRotated, -t3.canvas.height / 2, -t3.canvas.width / 2), t3.restore();
  }
  setTimeout(e2.draw, e2.samplePeriod, e2, t2);
}, drawBorderedText: function(e2, t2, i2, a2, l2, d2) {
  e2.fillStyle = l2, e2.fillText(t2, i2, a2), e2.fillStyle = d2, e2.fillText(t2, i2 - 1, a2 - 2);
}, openFullScreen: function(e2) {
  let t2;
  e2.requestFullscreen ? t2 = e2.requestFullscreen() : e2.mozRequestFullScreen ? t2 = e2.mozRequestFullScreen() : e2.webkitRequestFullscreen ? t2 = e2.webkitRequestFullscreen() : e2.msRequestFullscreen && (t2 = e2.msRequestFullscreen()), t2.catch(function(e3) {
  });
}, iterateAutomata: function(e2, t2, i2) {
  if (false !== e2.cameraReady) {
    if ("UCNothing" === e2.state) e2.workerWorking = false, e2.graph.sendMessage("SetMode//0,0,0," + (true === e2.cm.getInitialTip() ? "1" : "0"));
    else if ("UCCapture" === e2.state) {
      if (0 == e2.workerWorking) if (true === e2.imageCaptured && e2.secondsWidget - e2.imageCapturedTime > 1 || e2.secondsState > e2.captureTimeout && e2.captureTimeout > 0) e2.graph.sendMessage("CaptureFinish");
      else {
        let a2 = e2.privateCanvas.getContext("2d");
        switch (a2.save(), e2.cameraRotation) {
          case 0:
            a2.drawImage(t2, 0, 0, e2.cameraWidth, e2.cameraHeight);
            break;
          case 1:
          case 3:
            a2.translate(e2.cameraHeight / 2, e2.cameraWidth / 2), a2.rotate(Math.PI / 2 * e2.cameraRotation), a2.drawImage(t2, -e2.cameraWidth / 2, -e2.cameraHeight / 2);
            break;
          case 2:
            a2.translate(e2.cameraWidth / 2, e2.cameraHeight / 2), a2.rotate(Math.PI / 2 * e2.cameraRotation), a2.drawImage(t2, -e2.cameraWidth / 2, -e2.cameraHeight / 2);
        }
        if (a2.restore(), e2.canvas.width < e2.canvas.height && e2.cm.forceLandscape) {
          let t3 = e2.drawer.getDocRectScreenSpace(i2.canvas.width, i2.canvas.height), a3 = { x: i2.canvas.height - (t3.y + t3.height), y: t3.x, width: t3.height, height: t3.width };
          e2.docRect = e2.drawer.fromScreenToCamera(i2, e2.cameraWidth, e2.cameraHeight, i2.canvas.height, i2.canvas.width, e2.cameraMustFlip, a3);
        } else e2.docRect = e2.drawer.getDocRect(i2, e2.cameraWidth, e2.cameraHeight, e2.cameraContainer.offsetWidth, e2.cameraContainer.offsetHeight, e2.cameraMustFlip);
        e2.docRect.x -= (1.2 * e2.docRect.width - e2.docRect.width) / 2, e2.docRect.y -= (1.2 * e2.docRect.height - e2.docRect.height) / 2, e2.docRect.width *= 1.2, e2.docRect.height *= 1.2, e2.docRect.x + e2.docRect.width > e2.cameraWidth && (e2.docRect.width = e2.cameraWidth - e2.docRect.x), e2.docRect.y + e2.docRect.height > e2.cameraHeight && (e2.docRect.height = e2.cameraHeight - e2.docRect.y), e2.fpseframes++, e2.imageCaptured || (e2.workerWorking = true, this.engine.detectImage(e2.privateCanvas, e2.status).then((t3) => {
          var _a, _b;
          let i3 = true;
          if (e2.cm.getCheckFieldsData()) if (!e2.scanMode !== _.ScanMode.Search && e2.specificData) {
            if (t3.extractionData) {
              const a3 = e2.specificData.find((e3) => e3 === t3.extractionData.documentCountryIssuerIso2);
              if (a3) {
                const l2 = ((_a = e2.rules) == null ? void 0 : _a[a3]) || ((_b = n[a3]) == null ? void 0 : _b.fieldChecks);
                if (l2) for (const { key: a4, rule: d2, value: s2, documentTypes: n2, documentSide: c2 } of l2) if (!i3 || n2 && !n2.includes(t3.extractionData.documentTypeString) || void 0 !== c2 && e2.status !== c2) {
                  if (!i3) break;
                } else i3 = e2.checkRule(a4, d2, s2, t3.extractionData[a4]);
                else ie.printDebug("There are no rules to be applied for the scanned document. Check if rules provided are for the desired country document.");
              } else i3 = false, ie.printWarning(`Detected document from different nationality, was expecting ${e2.specificData} but captured ${t3.extractionData.documentCountryIssuerIso2} instead`);
            }
          } else ie.printDebug("No country specified to check data fields in document. Check if there are filtering any country.");
          if (i3) switch (e2.detectionStatus = t3.detectionStatus, e2.results = t3, t3.isDocumentDetected && !e2.isDocumentAlreadyDetected && (e2.isDocumentAlreadyDetected = true), e2.diagnostic = t3.detectionStatus.status, e2.cm.getDocumentMode()) {
            case Re.SelphID.DocumentMode.SingleSide:
              0 === t3.diagnostic || 22 === t3.diagnostic || 21 === t3.diagnostic ? this.sndRound ? t3.imagesRaw.backDocument ? (e2.imageCaptured = true, e2.cm.allowUnknownDocuments ? e2.cropFullImage(t3.imagesFullsize.frontDocument, t3.detectionStatus.quadFromFrontDocument, e2.imageFormat, e2.imageQuality).then((t4) => {
                e2.results.images.frontDocument = t4, e2.workerWorking = false;
              }) : e2.workerWorking = false, e2.previewImage = e2.getImg(t3.imagesRaw.backDocument)) : e2.cm.allowUnknownDocuments && t3.imagesFullsize.backDocument ? ["frontDocument", "backDocument"].forEach((i4) => {
                let a3;
                e2.imageCaptured = true, a3 = "frontDocument" === i4 ? t3.detectionStatus.quadFromFrontDocument : t3.detectionStatus.quad, e2.cropFullImage(t3.imagesFullsize[`${i4}`], a3, e2.imageFormat, e2.imageQuality).then((t4) => {
                  if (e2.results.images[`${i4}`] = t4, "backDocument" === i4) {
                    const i5 = document.createElement("img");
                    i5.src = t4, e2.previewImage = i5;
                  }
                  e2.workerWorking = false;
                });
              }) : e2.workerWorking = false : t3.images.frontDocument ? (e2.previewImage = e2.getImg(t3.imagesRaw.frontDocument), e2.imageCaptured = true, e2.results.images.backDocument = null, e2.workerWorking = false) : e2.cm.allowUnknownDocuments ? (e2.imageCaptured = true, e2.cropFullImage(t3.imagesFullsize.frontDocument, t3.detectionStatus.quad, e2.imageFormat, e2.imageQuality).then((t4) => {
                e2.results.images.frontDocument = t4;
                const i4 = document.createElement("img");
                i4.src = t4, e2.previewImage = i4, e2.workerWorking = false;
              })) : (e2.workerWorking = false, ie.printDebug("Front Image not captured by failed constraints")) : e2.workerWorking = false;
              break;
            case Re.SelphID.DocumentMode.DoubleSide:
            case Re.SelphID.DocumentMode.Auto:
              e2.status === Re.SelphID.Mode.Front ? 0 == t3.diagnostic || 21 == t3.diagnostic || 22 == t3.diagnostic ? t3.images.frontDocument ? (e2.previewImage = e2.getImg(t3.imagesRaw.frontDocument), e2.imageCaptured = true, e2.workerWorking = false) : e2.cm.allowUnknownDocuments ? (e2.imageCaptured = true, e2.cropFullImage(t3.imagesFullsize.frontDocument, t3.detectionStatus.quad, e2.imageFormat, e2.imageQuality).then((t4) => {
                this.croppedFrontImageWithUnknownDocument = t4;
                const i4 = document.createElement("img");
                i4.src = t4, e2.previewImage = i4, e2.workerWorking = false;
              })) : (e2.workerWorking = false, ie.printDebug("Front Image not captured by failed constraints")) : e2.workerWorking = false : 0 !== t3.diagnostic && 21 != t3.diagnostic && 22 !== t3.diagnostic || null === t3.images ? e2.workerWorking = false : t3.images.backDocument && !e2.cm.allowUnknownDocuments ? (e2.previewImage = e2.getImg(t3.imagesRaw.backDocument), e2.imageCaptured = true, e2.workerWorking = false) : e2.cm.allowUnknownDocuments && t3.imagesFullsize.backDocument ? (null !== e2.results.images.frontDocument && void 0 !== e2.results.images.frontDocument || (e2.results.images.frontDocument = this.croppedFrontImageWithUnknownDocument), t3.images.backDocument ? (e2.previewImage = e2.getImg(t3.imagesRaw.backDocument), e2.imageCaptured = true, e2.workerWorking = false) : (e2.imageCaptured = true, e2.cropFullImage(t3.imagesFullsize.backDocument, t3.detectionStatus.quad, e2.imageFormat, e2.imageQuality).then((t4) => {
                e2.results.images.backDocument = t4;
                const i4 = document.createElement("img");
                i4.src = t4, e2.previewImage = i4, e2.workerWorking = false;
              }))) : (e2.workerWorking = false, ie.printDebug("Back Image not captured by failed constraints"));
          }
          else e2.workerWorking = false;
        }, (t3) => {
          console.error(t3), e2.workerWorking = false;
        }));
      }
    } else if ("UCCaptureStatus" === e2.state) {
      if (e2.secondsState > 1.5) if (true === e2.imageCaptured) if (e2.preview) e2.graph.sendMessage("Preview");
      else switch (ie.printDebug(`Mode: ${Re.SelphID.ModeStr[e2.mode]}`), ie.printDebug(`DocumentMode: ${Object.keys(Re.SelphID.DocumentMode)[e2.cm.getDocumentMode()]}`), ie.printDebug(`Status: ${Re.SelphID.ModeStr[e2.status]}`), e2.cm.getDocumentMode()) {
        case Re.SelphID.DocumentMode.SingleSide:
          e2.graph.sendMessage("Finish");
          break;
        case Re.SelphID.DocumentMode.DoubleSide:
        case Re.SelphID.DocumentMode.Auto:
          this.status === Re.SelphID.Mode.Back || this.results.extractionData.isSingleSideDocument || 3 === this.results.extractionData.documentType ? e2.graph.sendMessage("Finish") : e2.graph.sendMessage("Next");
      }
      else e2.retries++, e2.retries >= e2.captureRetries && e2.captureRetries > 0 && false === e2.debug ? e2.cm.getAskSimpleMode() ? e2.graph.sendMessage("TimeoutPreview") : e2.graph.sendMessage("Timeout") : e2.graph.sendMessage("Fail");
    } else "UCFlip" === e2.state ? e2.secondsState > 1 && (e2.cm.getAllowUnknownDocuments() && e2.engine.resetValidation(), e2.graph.sendMessage("Timer")) : "UCWaitRecording" === e2.state && (e2.cm.getVideoRecord() ? e2.recorderFinish && e2.graph.sendMessage("Finish") : e2.graph.sendMessage("Finish"));
    if (e2.cm.getVideoRecord() && !e2.recorderWorking && e2.recorder.frameReady(false)) {
      e2.privateRecordCanvasContext.drawImage(t2, 0, 0, e2.privateRecordCanvas.width, e2.privateRecordCanvas.height);
      let i3 = e2.privateRecordCanvasContext.getImageData(0, 0, e2.privateRecordCanvas.width, e2.privateRecordCanvas.height);
      e2.recorderWorking = true, e2.recorder.addFrame(i3).then(() => {
        e2.recorderWorking = false;
      });
    }
  }
}, checkRule: function(e2, t2, i2, a2) {
  switch (t2) {
    case "equalTo":
      return a2 === i2 || (ie.printDebug(`Invalid document extraction, ${e2} extracted field must have a length or value equal to ${i2}`), false);
    case "contains":
      return !!a2.includes(i2) || (ie.printDebug(`Invalid document extraction, ${e2} extracted field must contain '${i2}' on it`), false);
    case "required":
      return !(!a2 || !i2) || (ie.printDebug(`Invalid document extraction, ${e2} extracted field value is required`), false);
    case "maxLength":
      return a2.length <= i2 || (ie.printDebug(`Invalid document extraction, ${e2} extracted field max lenght must be equal or lower than ${i2}`), false);
    case "minLength":
      return a2.length >= i2 || (ie.printDebug(`Invalid document extraction, ${e2} extracted field min lenght must be equal or greater than ${i2}`), false);
    case "equalLength":
      return a2.length === i2 || (ie.printDebug(`Invalid document extraction, ${e2} extracted field lenght must be equal to ${i2}`), false);
  }
}, setNewRules: function(e2, t2) {
  if (e2 && t2) {
    const i2 = Object.keys(t2), a2 = e2 == null ? void 0 : e2.some((e3) => i2.some((t3) => t3 === e3));
    a2 ? this.rules = t2 : ie.printDebug("Rules schema does not contain any country passed within specificData. It will be ignored and internal rules will be applied.");
  } else t2 ? e2 || ie.printWarning("SpecificData not provided. Appliying rules will be ignored.") : ie.printWarning("Rules schema not provided. It will be ignored and internal rules will be applied.");
}, getImg: function(e2) {
  let t2 = new ImageData(e2.data, e2.width, e2.height, { colorSpace: e2.colorSpace }), i2 = document.createElement("canvas");
  i2.width = e2.width, i2.height = e2.height, i2.getContext("2d").putImageData(t2, 0, 0);
  const a2 = i2.toDataURL();
  let l2 = document.createElement("img");
  return l2.src = a2, l2;
}, cropFullImage: function(e2, t2, i2, a2) {
  return new Promise((l2) => {
    const d2 = document.createElement("img");
    d2.onload = () => {
      const e3 = document.createElement("canvas"), s2 = e3.getContext("2d"), n2 = Math.abs(t2.topRight.x - t2.topLeft.x + 40), c2 = Math.abs(t2.bottomLeft.y - t2.topLeft.y + 40);
      e3.width = n2, e3.height = c2, s2.drawImage(d2, t2.topLeft.x - 20, t2.topLeft.y - 20, n2, c2, 0, 0, n2, c2);
      const r2 = e3.toDataURL(i2, a2);
      l2(r2);
    }, d2.src = e2;
  });
}, getVideoSources: function(e2) {
  let t2 = null;
  navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(i2) {
    let a2 = i2.filter(function(e3) {
      return "video" === e3.kind;
    }).map(function(e3, t3) {
      return e3.id;
    });
    t2 = a2[0], e2.setVideoInput(e2);
  }) : MediaStreamTrack.getSources(function(i2) {
    let a2 = i2.filter(function(e3) {
      return "video" === e3.kind;
    }).map(function(e3, t3) {
      return e3.id;
    });
    t2 = a2[0], e2.setVideoInput(e2);
  }), null == t2 && ie.printDebug("selectedSource==null");
}, OnResourceManagerStatus: function(e2, t2) {
  t2 && e2 && (e2.rmReady = true, e2.CheckDependencies(e2));
}, OnGraphReady: function(e2) {
  this.graphReady = true, this.CheckDependencies(this);
}, CheckDependencies: async function(e2) {
  if (true === e2.rmReady && void 0 !== e2.drawer && true === e2.graphReady && true === e2.cameraReady && 1 == e2.engineLoaded && "UCNothing" !== e2.graph.state) {
    let t2 = e2.canvas, i2 = e2.video;
    t2 && (t2.style = "display: none"), i2 && (i2.style = "display: none");
    const a2 = { cameraWidth: e2.cameraWidth, cameraHeight: e2.cameraHeight };
    e2.cm.getCheckFieldsData() && (e2.cm.getScanMode() === _.ScanMode.Search && e2.specificData ? (a2.setNewRules = e2.setNewRules.bind(e2), a2.countriesToApplyRules = e2.specificData) : (ie.printWarning("SpecificData or ScanMode not provided. Appliying rules will be ignored."), e2.cm.setCheckFieldsData(false)));
    let l2 = new CustomEvent("FPhi.SelphID.ModuleLoaded.event", { detail: a2 });
    this.divContainer.dispatchEvent(l2), e2.cameraContainer.contains(e2.gifWait) && (e2.cameraContainer.removeChild(e2.gifWait), e2.cameraContainer.removeChild(e2.loadingMessage)), e2.drawer.rm = e2.rm, e2.drawer.cameraCount = e2.cameraCount;
    let d2 = e2.canvas;
    e2.canvas.width < e2.canvas.height && e2.cm.forceLandscape ? (e2.drawer.setCanvasSize(e2.cameraContainer.offsetHeight, e2.cameraContainer.offsetWidth), d2 = e2.canvasRotated) : e2.drawer.setCanvasSize(e2.cameraContainer.offsetWidth, e2.cameraContainer.offsetHeight), e2.graph.setInitialState("UCNothing"), e2.draw(e2, e2.video);
  }
}, videoLoaded: function(e2) {
  let t2 = true;
  true === this.cameraReady && (t2 = false), this.cameraWidth = e2.target.videoWidth, this.cameraHeight = e2.target.videoHeight, 0 === this.cameraRotation || 2 === this.cameraRotation ? (this.privateCanvas.width = this.cameraWidth, this.privateCanvas.height = this.cameraHeight) : (this.privateCanvas.width = this.cameraHeight, this.privateCanvas.height = this.cameraWidth), this.cameraReady = true, this.canvas;
  let i2 = document.createElement("canvas");
  i2.width = this.cameraWidth, i2.height = this.cameraHeight, this.workerCanvas = i2, this.workerCanvasContext = i2.getContext("2d").getImageData(0, 0, this.cameraWidth, this.cameraHeight), !this.recorder && this.cm.getVideoRecord() && (ie.printDebug("Video recording enabled..."), this.videoRecordWidth = this.cameraWidth * this.cm.getVideoRecordScale(), this.videoRecordHeight = this.cameraHeight * this.cm.getVideoRecordScale(), this.recorder = oe.generateInstance(this.cm.getVideoRecordType() === Re.SelphID.RecorderType.Local ? "Local" : "Remote", this.videoRecordWidth, this.videoRecordHeight, this.cm.getVideoRecordRate(), this.cm.getVideoQuality(), this.cameraStream), this.recorderWorking = true, this.recorder.initializeEngine().then(() => {
    this.recorderWorking = false, ie.printDebug("Video recording engine initialized...");
  }), this.privateRecordCanvas = document.createElement("canvas"), this.privateRecordCanvas.width = this.videoRecordWidth, this.privateRecordCanvas.height = this.videoRecordHeight, this.privateRecordCanvasContext = this.privateRecordCanvas.getContext("2d")), t2 && this.CheckDependencies(this);
}, videoFrame: function(e2) {
  this.canvasVideoPlayer.getContext("2d").drawImage(e2.target, 0, 0);
}, videoplayerEnded: function(e2) {
  "UCWizardCompleted" === this.state ? this.graph.sendMessage("VideoFinished") : e2.target.play();
}, getDocumentDetectionStatus: function() {
  const e2 = this.status === Re.SelphID.Mode.Front ? "front" : "back";
  return this.isDocumentAlreadyDetected ? `Document has been detected within the ${e2} side during scanning process.` : `Document has not been detected within the ${e2} side during scanning process.`;
} }, Re.SelphID.CheckCapabilities = async function(e2 = { omit: [] }) {
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
}, Re.SelphID.isPathAbsolute = function(e2) {
  return /^(?:\/|.+:\/\/|http)/.test(e2);
}, Re.SelphID.getScriptPath = function() {
  return String(new Error().stack).replace(/^Error.*\n/, "").split("\n")[1].match(/http.*\.js/)[0].split("/").slice(0, -1).join("/") + "/";
}, Re.SelphID.generateBrowserCache = async (e2, t2) => {
  ie.setLoggerTag("selphid-widget-web");
  try {
    let i2 = Re.SelphID.isPathAbsolute(e2) ? e2 : Re.SelphID.getScriptPath() + e2;
    switch ((await le.getInternalLicense(t2)).engineType) {
      case "Microblink":
        let e3 = await (async (e4) => {
          try {
            return "undefined" != typeof MessageChannel && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e4);
          } catch (e5) {
            return false;
          }
        })(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
        await (async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])))() ? e3 ? (await fetch(i2 + "/FPhi.Engine.Microblink/full/advanced-threads/BlinkIDWasmSDK.data", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Microblink/full/advanced-threads/BlinkIDWasmSDK.wasm", { cache: "force-cache" })) : (await fetch(i2 + "/FPhi.Engine.Microblink/full/advanced/BlinkIDWasmSDK.data", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Microblink/full/advanced/BlinkIDWasmSDK.wasm", { cache: "force-cache" })) : (await fetch(i2 + "/FPhi.Engine.Microblink/full/basic/BlinkIDWasmSDK.data", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Microblink/full/basic/BlinkIDWasmSDK.wasm", { cache: "force-cache" }));
        break;
      case "Facephi":
        await fetch(i2 + "/FPhi.Engine.Facephi/FPBRecognition.wasm", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Facephi/models/facephi_face_detectpr_1_0_model.dat", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Facephi/models/facephi_id_cards_corner_detector_1_2_model.dat", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Facephi/models/facephi_mrz_detector_1_0_model.dat", { cache: "force-cache" }), await fetch(i2 + "/FPhi.Engine.Facephi/models/facephi_ocr_mrz_1_0_model.dat", { cache: "force-cache" });
    }
    le.destroyWorker();
  } catch (e3) {
    (void 0).divContainer.dispatchEvent(new CustomEvent("FPhi.SelphID.ExceptionCaptured.event", { detail: { exceptionType: 6, message: "Fail to analyse the engine license before generate cache" } }));
  }
}, Re.SelphID.Component = O, customElements.define("facephi-selphid", Re.SelphID.Component);
var ge = i.w;
export {
  ge as FPhi
};
/*! Bundled license information:

@facephi/selphid-widget-web/selphid-widget-web.min.js:
  (*! For license information please see selphid-widget-web.min.js.LICENSE.txt *)
*/
//# sourceMappingURL=@facephi_selphid-widget-web.js.map
