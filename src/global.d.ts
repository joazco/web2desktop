import { BrowserWindow } from "electron";

export {};

declare global {
  // eslint-disable-next-line no-var
  var mainWindow: BrowserWindow;
  // eslint-disable-next-line no-var
  var isProduction: boolean;
}
