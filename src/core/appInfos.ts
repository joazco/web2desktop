/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { nativeTheme, screen } from "electron";

import { AppConfigInterface } from "../types";
import { getData, setData } from "../utils/store";

export class AppInfos {
  private resizeDebounceTimer: NodeJS.Timeout | null = null;

  async sendAppInfos(defaultValue: Partial<AppConfigInterface> = {}) {
    const mainWindow = global.mainWindow;

    // Apply incoming config first, then publish the current state.
    await this.applyConfig(defaultValue);
    const currentConfig: Partial<AppConfigInterface> = {
      name: mainWindow.getTitle(),
      fullScreen: mainWindow.isFullScreen(),
      resizable: mainWindow.isResizable(),
      closable: mainWindow.isClosable(),
      themeSource: nativeTheme.themeSource,
      openDevtools: mainWindow.webContents.isDevToolsOpened(),
      size: {
        width: mainWindow.getBounds().width,
        height: mainWindow.getBounds().height,
      },
    };
    setData("appConfig", currentConfig);
    mainWindow.webContents.send("appConfig", currentConfig);
  }

  init() {
    // Restore last known config and push it to the renderer.
    const c = getData<Partial<AppConfigInterface>>("appConfig") || {};

    this.sendAppInfos({ ...global.config, ...c });

    const mainWindow = global.mainWindow;

    // Debounced resize: mainly used to notify the UI when the user
    // resizes the window or exits/enters fullscreen.
    mainWindow.on("resize", () => {
      if (this.resizeDebounceTimer) {
        clearTimeout(this.resizeDebounceTimer);
      }

      this.resizeDebounceTimer = setTimeout(() => {
        this.resizeDebounceTimer = null;
        this.sendAppInfos();
      }, 700);
    });

    mainWindow.on("closed", () => {
      if (this.resizeDebounceTimer) clearTimeout(this.resizeDebounceTimer);
      this.resizeDebounceTimer = null;
    });
  }

  resetAppInfos() {
    // Reset to defaults (including a sane window size).
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    this.sendAppInfos({
      ...global.config,
      size: {
        width: width / 2,
        height: height / 1.5,
      },
    });
  }

  private async applyConfig(newConfig: Partial<AppConfigInterface>) {
    const mainWindow = global.mainWindow;
    // Fullscreen has special constraints when the window isn't resizable.
    if (newConfig.fullScreen !== undefined) {
      const resizable = mainWindow.isResizable();
      mainWindow.setFullScreenable(true);
      mainWindow.setFullScreen(newConfig.fullScreen);
      await this.wait(100);
      mainWindow.setFullScreenable(resizable);
    }
    if (newConfig.resizable !== undefined) {
      mainWindow.setResizable(newConfig.resizable);
      mainWindow.setFullScreenable(newConfig.resizable);
    }
    if (newConfig.closable !== undefined) {
      mainWindow.setClosable(newConfig.closable);
    }
    // Sync OS theme.
    if (newConfig.themeSource !== undefined) {
      nativeTheme.themeSource = newConfig.themeSource;
    }
    if (
      newConfig.openDevtools &&
      !(global.isProduction && global.config.disableOpenDevToolOnProduction)
    ) {
      mainWindow.webContents.openDevTools();
    } else if (
      newConfig.openDevtools !== undefined &&
      mainWindow.webContents.isDevToolsOpened()
    ) {
      mainWindow.webContents.closeDevTools();
    }
    // Apply partial size updates.
    if (newConfig.size?.width) {
      mainWindow.setBounds({ width: newConfig.size.width });
    }
    if (newConfig.size?.height) {
      mainWindow.setBounds({ height: newConfig.size.height });
    }

    // Give the window time to settle before reading back state.
    await this.wait(300);
  }

  private wait(timeout = 300) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
}
