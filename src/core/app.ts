/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import {
  BaseWindow,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  KeyboardEvent,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  screen,
  shell,
} from "electron";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { AppConfigInterface } from "../types";
import { getAllPlugins } from "../utils/plugins";
import { getData, setData } from "../utils/store";

import { AppInfos } from "./appInfos";

export class App {
  private window!: BrowserWindow;

  constructor(private appInfos: AppInfos) {}

  createWindow() {
    // Main app window: size is based on the primary display work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    this.window = new BrowserWindow({
      width: width / 2,
      height: height / 1.5,
      title: global.config.name,
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
    this.loadUrl();

    global.mainWindow = this.window;

    // UI + lifecycle wiring.
    this.setAppMenu();
    this.listeners();
    this.disableDevToolInProduction();
    this.openLinkInExternalBrowser();

    // Initialize feature modules after the window exists.
    this.appInfos.init();
  }

  private loadUrl() {
    const resolver = () => {
      this.sendMainWindowOpenned();
    };
    if (global.isProduction) {
      this.window
        .loadFile(
          path.join(
            __dirname,
            "..",
            "..",
            "www",
            global.config.webSource?.prod?.target ?? "index.html",
          ),
        )
        .then(resolver);
      return;
    }

    const mode = global.config.webSource?.dev?.mode;
    const target = global.config.webSource?.dev?.target;

    if (!mode || !target) {
      this.window
        .loadFile(path.join(__dirname, "..", "..", "www", "index.html"))
        .then(resolver);
      return;
    }
    switch (mode) {
      case "file": {
        const fileUrl = pathToFileURL(target).toString();
        this.window.loadURL(fileUrl).then(resolver);
        break;
      }
      case "http":
        this.window.loadURL(target).then(resolver);
        break;
      case "www":
      default:
        this.window
          .loadFile(path.join(__dirname, "..", "..", "www", target))
          .then(resolver);
    }
  }

  private listeners() {
    // IPC handlers used by the preload bridge.
    ipcMain.handle("ping", () => {
      return "Pong";
    });
    ipcMain.handle("quitApp", () => {
      this.window.setClosable(true);
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
    ipcMain.handle("logPlugins", this.logPlugins);
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
    if (global.isProduction && global.config.disableOpenDevToolOnProduction) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      globalShortcut.register("CommandOrControl+Shift+I", () => {});
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      globalShortcut.register("F12", () => {});
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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

  private setAppMenu() {
    const { config, isProduction } = global;
    const allPlugins = getAllPlugins();
    const handleClickMenuItem: MenuItemConstructorOptions["click"] = (
      menuItem: MenuItem,
      _window: BaseWindow | undefined,
      _event: KeyboardEvent,
    ) => {
      if (!menuItem.id) {
        return;
      }
      allPlugins
        .filter((plugin) => !!plugin.handleClickAppMenuItem)
        .forEach((plugin) => {
          plugin.handleClickAppMenuItem?.(menuItem.id);
        });
    };

    const menu = Menu.buildFromTemplate(
      (config.applicationMenu || [])
        .filter(
          (menu) => !(isProduction && menu.hideOnProduction) || !isProduction,
        )
        .map((menu) => ({
          ...menu,
          submenu: menu.submenu
            .filter(
              (subMenuItem) =>
                !(isProduction && subMenuItem.hideOnProduction) ||
                !isProduction,
            )
            .map((subMenuItem) => ({
              ...subMenuItem,
              click: handleClickMenuItem,
            })),
        })),
    );

    Menu.setApplicationMenu(menu);
  }

  private logPlugins() {
    const { web2desktopPlugins } = global;
    const plugins: { plugin: string; channels: string[] }[] = [];
    web2desktopPlugins.forEach((plugin, pluginName) => {
      plugins.push({
        plugin: pluginName,
        channels: Array.from(plugin.handlers.keys()),
      });
    });
    return plugins;
  }

  sendMainWindowOpenned() {
    getAllPlugins().forEach((plugin) => {
      if (plugin.handleMainWindowOpenned) {
        plugin.handleMainWindowOpenned(this.window);
      }
    });
  }
}
