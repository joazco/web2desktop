/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */
import { AppConfigInterface } from "./types";

const config: Omit<AppConfigInterface, "size"> = {
  name: "Web2Desktop",
  themeSource: "system",
  fullScreen: false,
  resizable: true,
  closable: true,
  openDevtools: true,
  disableOpenDevToolOnProduction: true,
  webSource: {
    prod: {
      target: "index.html",
    },
    dev: {
      mode: "file",
      target: "./demo/index.html",
    },
  },
  build: {
    appBundleId: "com.joazco.web2desktop",
    version: "1.0.0",
    author: "AZOULAY Jordan",
    maintainerEmail: "contact@joazco.com",
    homepage: "https://joazco.com",
    copyright: "© Web2Desktop JOAZCO Inc.",
    // windows: {},
    // apple: {},
    // linux: {}
  },
  // steam: {
  //   appId: 123456,
  // },
};

export default config;
