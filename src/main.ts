/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { app, BrowserWindow, Menu } from "electron";
import started from "electron-squirrel-startup";

import config from "./config";
import { App } from "./modules/app";
import { AppInfos } from "./modules/appInfos";
import { SplashScreen } from "./modules/splash";
import { Steam } from "./modules/steam";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

/** */
global.isProduction = !!app.isPackaged;
global.config = config;
/** */

/** Create modules */
const splashWindow = new SplashScreen();
const appInfos = new AppInfos();
const steam = new Steam();
const appWindow = new App(appInfos, steam);

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
