import { nativeTheme, screen } from "electron";

import config from "../config";
import { AppConfigInterface } from "../types";
import { getData, setData } from "../utils/store";

export class AppInfos {
  private resizeDebounceTimer: NodeJS.Timeout | null = null;

  async sendAppInfos(defaultValue: Partial<AppConfigInterface> = {}) {
    const mainWindow = global.mainWindow;

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
    const c = getData<Partial<AppConfigInterface>>("appConfig") || {};

    this.sendAppInfos({ ...config, ...c });

    const mainWindow = global.mainWindow;

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
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    this.sendAppInfos({
      ...config,
      size: {
        width: width / 2,
        height: height / 1.5,
      },
    });
  }

  private async applyConfig(newConfig: Partial<AppConfigInterface>) {
    const mainWindow = global.mainWindow;
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
    if (newConfig.themeSource !== undefined) {
      nativeTheme.themeSource = newConfig.themeSource;
    }
    if (
      newConfig.openDevtools &&
      !(global.isProduction && config.disableOpenDevToolOnProduction)
    ) {
      mainWindow.webContents.openDevTools();
    } else if (
      newConfig.openDevtools !== undefined &&
      mainWindow.webContents.isDevToolsOpened()
    ) {
      mainWindow.webContents.closeDevTools();
    }
    if (newConfig.size?.width) {
      mainWindow.setBounds({ width: newConfig.size.width });
    }
    if (newConfig.size?.height) {
      mainWindow.setBounds({ height: newConfig.size.height });
    }

    await this.wait(300);
  }

  private wait(timeout = 300) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
}
