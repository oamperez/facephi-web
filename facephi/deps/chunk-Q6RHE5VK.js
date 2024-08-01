// node_modules/@facephi/sdk-web-wc/dist/esm/constants-0d86e375.js
var STATES = [
  {
    icon: "IdentificationCard",
    message: "Put your face and the front of your document on the marks",
    iconCaptured: "IdentificationCard"
  },
  {
    icon: "IdentificationCardBack",
    message: "Put your face and the back of your document on the marks",
    iconCaptured: "IdentificationCardBack"
  },
  {
    icon: "UserFocus",
    message: "Say out loud: 'I (name and surname) accept the terms and conditions'"
  }
];
var MODAL_STATES = {
  success: {
    label: "Video recording completed!",
    icon: "CheckCircle",
    color: "success",
    buttonLeftLabel: "REPEAT RECORDING",
    buttonRightLabel: "FINISH"
  },
  exception: {
    label: "There has been an error in the recording",
    icon: "XCircle",
    color: "error",
    buttonLeftLabel: "BACK",
    buttonRightLabel: "REPEAT RECORDING"
  },
  permissions: {
    label: "Permission denied",
    message: "To proceed, it's necessary to allow camera and microphone access.",
    icon: "WarningCircle",
    color: "error"
  },
  timeout: {
    label: "Time exceeded",
    message: "We couldn't make the recording on time. Let's try again.",
    icon: "HourglassLow",
    color: "error",
    buttonRightLabel: "REPEAT RECORDING"
  }
};

export {
  STATES,
  MODAL_STATES
};
//# sourceMappingURL=chunk-Q6RHE5VK.js.map
