import { MakerDebConfig } from "@electron-forge/maker-deb";
import { MakerSquirrelConfig } from "@electron-forge/maker-squirrel";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { BrowserWindow } from "electron";

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

// Steam configuration.
export interface AppConfigInterface {
  steam?: {
    appId: number;
  };
}

// Build configuration.
export interface AppConfigInterface {
  build?: ForgeBuildInterface;
}

/** */
