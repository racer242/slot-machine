import { isMobile, isLocal } from "../core/helpers";

const settings = {
  assetsUrl: ".",
  localStoreName: "appState_18032026",

  isMobile: isMobile(),
  isLocal: isLocal(),

  desktopBounds: {
    width: 880,
    height: 625,
  },
  mobileBounds: {
    width: 296,
    height: 470,
  },
  switchToMobileWidth: 720,
  currentPage: "main",
  particlesCount: 20,
};

export default settings;
