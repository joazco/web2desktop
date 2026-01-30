/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { BrowserWindow } from "electron";
import path from "node:path";

import { loadPlugins } from "../utils/pluginLoader";

export class SplashScreen {
  createWindow(): Promise<void> {
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

    return new Promise<void>((resolve) => {
      // Keep the splash visible briefly, then close it.
      setTimeout(async () => {
        await loadPlugins(path.join(__dirname, "..", "plugins"));
        win.close();
        resolve();
      }, 2000);
    });
  }
}
