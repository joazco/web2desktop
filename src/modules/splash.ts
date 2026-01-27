import { BrowserWindow } from "electron";
import path from "node:path";

import config from "../config";

export class SplashScreen {
  createWindow(): Promise<void> {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: config.name,
      center: true,
      frame: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        sandbox: true,
      },
    });

    win.setMenu(null);

    win.loadFile(path.join(__dirname, "..", "..", "splash", "splash.html"));

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        win.close();
        resolve();
      }, 2000);
    });
  }
}
