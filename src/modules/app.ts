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
    /** bounds */
    this.initBounds();
    /** */

    // this.window.setMenu(null);

    this.window.loadFile(path.join(__dirname, "..", "..", "www", "index.html"));
    global.mainWindow = this.window;

    /** */
    this.setMenu();
    this.listeners();
    this.disableDevToolInProduction();
    this.openLinkInExternalBrowser();
    /** */

    /** Modules */
    this.appInfos.init();
    this.steam.init();
    /** */
  }

  private listeners() {
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
      if (config.size) {
        setTimeout(() => {
          this.window.center();
        }, 100);
      }
    });
    ipcMain.handle("resetAppConfig", () => {
      this.appInfos.resetAppInfos();
      setTimeout(() => {
        this.window.center();
      }, 100);
    });
  }

  private initBounds() {
    const bounds = getData<Electron.Rectangle>("bounds");
    if (bounds) {
      this.window.setBounds(bounds);
    }
    this.window.on("close", () => {
      setData("bounds", mainWindow.getBounds());
    });
  }

  private disableDevToolInProduction() {
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
    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });
  }

  private setMenu() {
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
