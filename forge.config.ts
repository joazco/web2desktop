/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import type { ForgeConfig } from "@electron-forge/shared-types";
import path from "node:path";

import appConfig from "./src/config";

const config: ForgeConfig = {
  buildIdentifier: appConfig.build?.appBundleId,
  packagerConfig: {
    appBundleId: appConfig.build?.appBundleId,
    name: appConfig.name,
    executableName: appConfig.name,
    appVersion: appConfig.build?.version,
    buildVersion: appConfig.build?.version,
    appCopyright: appConfig.build?.copyright,
    asar: {
      unpackDir: "node_modules/steamworks.js/dist/**/*",
    },
    prune: true,
    ignore: [
      /^\/out($|\/)/,
      /^\/\.git($|\/)/,
      /^\/\.vscode($|\/)/,
      /^\/scripts($|\/)/,
      /^\/src($|\/)/,
      /^\/docs($|\/)/,
      /^\/tsconfig\.json$/,
      /^\/forge\.config\.(ts|js)$/,
      /^\/\.md$/,
    ],
    icon: path.join(__dirname, "resources", "images", "icon"), // https://www.electronforge.io/guides/create-and-add-icons
    osxSign: {},
  },
  rebuildConfig: {},
  makers: [
    new MakerZIP({}),
    /** Linux */
  ],
  plugins: [
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

/** Windows */
if (config.makers && appConfig.build?.windows?.markers?.includes("squirrel")) {
  config.makers.push(
    new MakerSquirrel({
      authors: appConfig.build.author,
      name: appConfig.name,
      copyright: appConfig.build.copyright,
      setupIcon: path.join(__dirname, "resources", "images", "icon.ico"),
      iconUrl: path.join(__dirname, "resources", "images", "icon.ico"),
      certificateFile: appConfig.build.windows.signature?.certificateFile,
      certificatePassword:
        appConfig.build.windows.signature?.certificatePassword,
      setupExe: `${appConfig.name}.exe`,
      setupMsi: `${appConfig.name} Setup`,
      noMsi: false,
    }),
  );
}

/** Apple */
if (config.packagerConfig && appConfig.build?.apple?.signature) {
  config.packagerConfig.osxSign = {
    identity: appConfig.build?.apple?.signature.identity,
    optionsForFile: () => {
      // Here, we keep it simple and return a single entitlements.plist file.
      // You can use this callback to map different sets of entitlements
      // to specific files in your packaged app.
      return {
        entitlements: path.join(
          __dirname,
          "resources",
          "apple",
          "entitlements.mac.plist",
        ),
      };
    },
  };
  config.packagerConfig.osxNotarize = {
    appleId: appConfig.build?.apple?.signature.appleId,
    appleIdPassword: appConfig.build?.apple?.signature.appleIdPassword,
    teamId: appConfig.build?.apple?.signature.teamId,
  };
}

if (config.makers && appConfig.build?.apple?.makers?.includes("dmg")) {
  config.makers.push(
    new MakerDMG({
      name: appConfig.name,
      title: `${appConfig.name} Setup`,
      icon: path.join(__dirname, "resources", "images", "icon.icns"),
      // background: path.join(__dirname, "images", "icon_background_dmg.png"),
      format: "ULFO",
    }),
  );
}

/** Linx */
if (config.makers && appConfig.build?.linux?.makers?.includes("deb")) {
  config.makers.push(
    new MakerDeb({
      options: {
        bin: appConfig.name,
        name: appConfig.name,
        productName: appConfig.name,
        maintainer: appConfig.build.maintainerEmail,
        homepage: appConfig.build.homepage,
        version: appConfig.build.version,
        categories: appConfig.build.linux.categories,
        icon: path.join(__dirname, "resources", "images", "icon.png"),
      },
    }),
  );
}

if (config.makers && appConfig.build?.linux?.makers?.includes("rpm")) {
  config.makers.push(
    new MakerRpm({
      options: {
        bin: appConfig.name,
        name: appConfig.name,
        productName: appConfig.name,
        homepage: appConfig.build.homepage,
        version: appConfig.build.version,
        categories: appConfig.build.linux.categories,
        icon: path.join(__dirname, "resources", "images", "icon.png"),
      },
    }),
  );
}

export default config;
