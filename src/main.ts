/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { app, BrowserWindow, Menu } from "electron";
import started from "electron-squirrel-startup";

import config from "./config";
import { App } from "./core/app";
import { AppInfos } from "./core/appInfos";
import { SplashScreen } from "./core/splash";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

/** */
global.isProduction = !!app.isPackaged;
global.config = config;
global.web2desktopPlugins = new Map();
/** */

/** Create cores */
const splashWindow = new SplashScreen();
const appInfos = new AppInfos();
const appWindow = new App(appInfos);

const createWindow = async () => {
  await splashWindow.createWindow();
  appWindow.createWindow();
};

app.on("ready", () => {
  Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
