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
  openDevtools: false,
  disableOpenDevToolOnProduction: true,
  applicationMenu: [
    {
      label: "&App",
      submenu: [
        {
          id: "quit",
          label: "&Quit",
        },
      ],
    },
    {
      label: "&Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
      ],
    },
    {
      label: "&View",
      hideOnProduction: true,
      submenu: [
        {
          label: "&Reload",
          role: "reload",
        },
        {
          role: "toggleDevTools",
        },
      ],
    },
    // {
    //   label: "Steam",
    //   submenu: [
    //     {
    //       id: "see-store-page",
    //       label: "See Store Page",
    //       accelerator: "Ctrl+T",
    //     },
    //     {
    //       id: "see-achievements",
    //       label: "See achievements",
    //       accelerator: "Ctrl+P",
    //     },
    //   ],
    // },
  ],
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
    apple: {
      signature: {
        appleId: "jazoulay@joazco.com",
        appleIdPassword: "ztxd-vkdq-hdyy-auwm",
        identity:
          'E2AC9F15CCBFABA1205F7BE549DE725578EA37A7 "Developer ID Application: Jordan AZOULAY (U4GUN9B2KX)"',
        teamId: "U4GUN9B2KX",
      },
    },
    // linux: {}
  },
  // plugins: {
  //   Steam: {
  //     appId: 12345678,
  //   },
  // },
};

export default config;
