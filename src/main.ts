/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { app, BrowserWindow, Menu } from "electron";
import started from "electron-squirrel-startup";

import { App } from "./core/app";
import { AppInfos } from "./core/appInfos";
import { SplashScreen } from "./core/splash";
import { loadConfig } from "./utils/config";

if (started) {
  app.quit();
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  global.isProduction = !!app.isPackaged;
  global.config = loadConfig();
  global.web2desktopPlugins = new Map();

  const splashWindow = new SplashScreen();
  const appInfos = new AppInfos();
  const appWindow = new App(appInfos);

  const createWindow = async (): Promise<void> => {
    await splashWindow.createWindow();
    appWindow.createWindow();
  };

  app.on("second-instance", () => {
    const window = BrowserWindow.getAllWindows()[0];

    if (window) {
      if (window.isMinimized()) {
        window.restore();
      }

      window.focus();
    }
  });

  app.on("ready", () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate([]));
    void createWindow();
  });

  app.on("window-all-closed", () => {
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
}
