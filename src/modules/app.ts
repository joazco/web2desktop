/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  screen,
  shell,
} from "electron";
import path from "node:path";

import config from "../config";
import { AppConfigInterface } from "../types";
import { getData, setData } from "../utils/store";

import { AppInfos } from "./appInfos";
import { Steam } from "./steam";

export class App {
  private window!: BrowserWindow;

  constructor(
    private appInfos: AppInfos,
    private steam: Steam,
  ) {}

  createWindow() {
    // Main app window: size is based on the primary display work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    this.window = new BrowserWindow({
      width: width / 2,
      height: height / 1.5,
      title: config.name,
      center: true,
      fullscreenable: true,
      webPreferences: {
        sandbox: true,
        preload: path.join(__dirname, "..", "preload.js"),
      },
    });
    // Restore last window bounds (if available).
    this.initBounds();

    // Load the renderer UI from /www.
    this.window.loadFile(path.join(__dirname, "..", "..", "www", "index.html"));
    global.mainWindow = this.window;

    // UI + lifecycle wiring.
    this.setMenu();
    this.listeners();
    this.disableDevToolInProduction();
    this.openLinkInExternalBrowser();

    // Initialize feature modules after the window exists.
    this.appInfos.init();
    this.steam.init();
  }

  private listeners() {
    // IPC handlers used by the preload bridge.
    ipcMain.handle("ping", () => {
      return "pong";
    });
    ipcMain.handle("quitApp", () => {
      this.window.close();
    });
    ipcMain.handle("getAppConfig", () => {
      this.appInfos.sendAppInfos();
    });
    ipcMain.handle("setAppConfig", (_, config: Partial<AppConfigInterface>) => {
      this.appInfos.sendAppInfos(config);
      // Re-center after size changes for better UX.
      if (config.size) {
        setTimeout(() => {
          this.window.center();
        }, 100);
      }
    });
    ipcMain.handle("resetAppConfig", () => {
      this.appInfos.resetAppInfos();
      // Re-center after reset to keep the window in view.
      setTimeout(() => {
        this.window.center();
      }, 100);
    });
  }

  private initBounds() {
    // Persist the last window position/size across sessions.
    const bounds = getData<Electron.Rectangle>("bounds");
    if (bounds) {
      this.window.setBounds(bounds);
    }
    this.window.on("close", () => {
      setData("bounds", mainWindow.getBounds());
    });
  }

  private disableDevToolInProduction() {
    // Prevent opening DevTools in production when configured.
    if (global.isProduction && config.disableOpenDevToolOnProduction) {
      globalShortcut.register("CommandOrControl+Shift+I", () => {});
      globalShortcut.register("F12", () => {});
      globalShortcut.register("CommandOrControl+Alt+I", () => {});
      this.window.webContents.on("devtools-opened", () => {
        this.window.webContents.closeDevTools();
      });
    }
  }

  private openLinkInExternalBrowser() {
    // Any window.open() links are opened in the default browser.
    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });
  }

  private setMenu() {
    // Provide a minimal menu so copy/paste works.
    let menu = Menu.buildFromTemplate([]);
    menu = Menu.buildFromTemplate([
      {
        label: "App",
        submenu: [
          {
            label: "Quit",
            click: () => {
              app.quit();
            },
          },
        ],
      },
      {
        label: "Edit",
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
    ]);

    Menu.setApplicationMenu(menu);
  }
}
