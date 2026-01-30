/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { BrowserWindow } from "electron";

export {};

declare global {
  // eslint-disable-next-line no-var
  var mainWindow: BrowserWindow;
  // eslint-disable-next-line no-var
  var isProduction: boolean;
  // eslint-disable-next-line no-var
  var config: Omit<AppConfigInterface, "size">;
}
