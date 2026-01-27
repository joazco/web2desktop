/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

// Preload script: expose a safe, minimal API to the renderer.

import { AppConfigInterface } from "./types";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer");

// The renderer calls window.electron.* (no direct Node access).
contextBridge.exposeInMainWorld("web2desktop", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // Subscribe to AppConfig updates pushed from the main process.
  onAppConfig: (func: (args: any) => void) => {
    // @ts-ignore
    const subscription = (_event: any, ...args: any) => func(...args);
    ipcRenderer.invoke("getAppConfig");
    ipcRenderer.on("appConfig", subscription);
    return () => ipcRenderer.removeListener("appConfig", subscription);
  },
  // Update app config from the renderer.
  setAppConfig: (config: Partial<AppConfigInterface>) =>
    ipcRenderer.invoke("setAppConfig", config),
  // Restore defaults config from config.ts.
  resetAppConfig: () => ipcRenderer.invoke("resetAppConfig"),
  // Request app quit.
  quitApp: () => ipcRenderer.invoke("quitApp"),
  /** Steam */
  steam: {
    // One-shot Steam availability check.
    isWorking: (func: (isWorking: boolean) => void) => {
      // @ts-ignore
      const subscription = (_event: any, ...args: any) => func(...args);
      ipcRenderer.invoke("steam.isWorking");
      ipcRenderer.on("steam.isWorking", (event: any, isWorking: boolean) => {
        subscription(event, isWorking);
        ipcRenderer.removeListener("steam.isWorking", subscription);
      });
    },
    // Read the local player's Steam name.
    getName: (func: (name: string) => void) => {
      // @ts-ignore
      const subscription = (_event: any, ...args: any) => func(...args);
      ipcRenderer.invoke("steam.getName");
      ipcRenderer.on("steam.getName", (event: any, name: string) => {
        subscription(event, name);
        ipcRenderer.removeListener("steam.getName", subscription);
      });
    },
    achievement: {
      // Query achievement status.
      isActivated: (
        achievement: string,
        func: (isActivated: boolean) => void,
      ) => {
        // @ts-ignore
        const subscription = (_event: any, ...args: any) => func(...args);
        ipcRenderer.invoke("steam.achievement.isActivated", achievement);
        ipcRenderer.on(
          "steam.achievement.isActivated",
          (event: any, isActivated: boolean) => {
            subscription(event, isActivated);
            ipcRenderer.removeListener(
              "steam.achievement.isActivated",
              subscription,
            );
          },
        );
      },
      // Activate an achievement and return the updated status.
      activate: (achievement: string, func: (isActivated: boolean) => void) => {
        // @ts-ignore
        const subscription = (_event: any, ...args: any) => func(...args);
        ipcRenderer.invoke("steam.achievement.activate", achievement);
        ipcRenderer.on(
          "steam.achievement.activate",
          (event: any, isActivated: boolean) => {
            subscription(event, isActivated);
            ipcRenderer.removeListener(
              "steam.achievement.activate",
              subscription,
            );
          },
        );
      },
      // Clear (reset) an achievement and return the updated status.
      clear: (achievement: string, func: (isActivated: boolean) => void) => {
        // @ts-ignore
        const subscription = (_event: any, ...args: any) => func(...args);
        ipcRenderer.invoke("steam.achievement.clear", achievement);
        ipcRenderer.on(
          "steam.achievement.clear",
          (event: any, isActivated: boolean) => {
            subscription(event, isActivated);
            ipcRenderer.removeListener("steam.achievement.clear", subscription);
          },
        );
      },
    },
  },
});
