/* eslint-disable import/export */

/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { MakerDebConfig } from "@electron-forge/maker-deb";
import { MakerSquirrelConfig } from "@electron-forge/maker-squirrel";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { BrowserWindow, MenuItemConstructorOptions } from "electron";

/** interface ForgeBuildInterface */
export interface ForgeBuildInterface {
  version?: ForgeConfig["packagerConfig"]["appVersion"];
  appBundleId?: ForgeConfig["packagerConfig"]["appBundleId"];
  author?: string;
  maintainerEmail?: string;
  homepage?: string;
  copyright?: string;
  apple?: {
    // https://www.electronforge.io/config/makers/dmg
    makers?: "dmg"[];
    // https://www.electronforge.io/guides/code-signing/code-signing-macos
    signature: {
      identity: string;
      appleId: string;
      appleIdPassword: string;
      teamId: string;
    };
  };
  windows?: {
    // https://www.electronforge.io/config/makers/squirrel.windows
    markers?: "squirrel"[];
    signature?: {
      certificateFile: MakerSquirrelConfig["certificateFile"];
      certificatePassword: MakerSquirrelConfig["certificatePassword"];
    };
  };
  linux?: {
    // https://www.electronforge.io/config/makers/deb
    // https://www.electronforge.io/config/makers/rpm
    makers?: ("deb" | "rpm")[];
    categories: MakerDebConfig["options"]["categories"];
  };
}

/** WebSourceConfig */

export interface WebSourceConfig {
  prod?: {
    target?: string; //  you can target only file into www, default: "index.html"
  };
  dev?: {
    mode: "www" | "http" | "file";
    target: string; // ex: "index.html" / "http://localhost:3000" / "./demo/index.html" / absolut or local path
  };
}

/** interface AppConfigInterface */

// App-initialized config that the UI can change.
export interface AppConfigInterface {
  themeSource?: Electron.NativeTheme["themeSource"];
  fullScreen?: BrowserWindow["fullScreen"];
  resizable?: BrowserWindow["resizable"];
  closable?: BrowserWindow["closable"];
  openDevtools?: boolean;
}

// App-initialized config that the UI cannot change.
export interface AppConfigInterface {
  name: string;
  size?: {
    width: number;
    height: number;
  };
  disableOpenDevToolOnProduction?: boolean;
}

// Web Source Configuration
type AppConfigInterfaceApplicationMenuItem = {
  id?: string; // If the ID is not entered, it will not be possible to catch the click event
  label?: string;
  role?: MenuItemConstructorOptions["role"];
  submenu?: AppConfigInterfaceApplicationMenuItem[];
  hideOnProduction?: boolean;
  type?: "normal" | "separator"; // default normal
  accelerator?: string;
};
type AppConfigInterfaceApplicationMenu = {
  label: string;
  submenu: AppConfigInterfaceApplicationMenuItem[];
  hideOnProduction?: boolean;
};
export interface AppConfigInterface {
  applicationMenu?: AppConfigInterfaceApplicationMenu[];
}

// Menu Configuration
export interface AppConfigInterface {
  webSource?: WebSourceConfig;
}

// Build configuration.
export interface AppConfigInterface {
  build?: ForgeBuildInterface;
}

// Plugin configuration.
export interface AppConfigInterface {
  plugins?: Record<string, any>;
}

/** Web2DesktopPluginInterface */
export interface Web2DesktopPluginInterface<T = unknown> {
  readonly pluginName: string;
  readonly handlers: Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  >;
  config?: T;
  init: () => Promise<void>;
  handleMainWindowOpenned?: (mainWindow: BrowserWindow) => void;
  handleClickAppMenuItem?: (id: string) => void;
}
