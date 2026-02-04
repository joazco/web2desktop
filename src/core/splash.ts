/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { BrowserWindow } from "electron";
import path from "node:path";

import { loadPlugins } from "../utils/plugins";

export class SplashScreen {
  async createWindow(): Promise<void> {
    // Lightweight, frameless splash shown during startup.
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      title: global.config.name,
      center: true,
      frame: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        sandbox: true,
      },
    });

    // No menu or window chrome for the splash.
    win.setMenu(null);

    // Load the static splash HTML.
    win.loadFile(path.join(__dirname, "..", "..", "splash", "splash.html"));

    await Promise.all([
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      loadPlugins(path.join(__dirname, "..", "plugins")),
    ]);
  }
}
