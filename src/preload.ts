/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

// See the Electron documentation for details on how to use preload scripts:

import { AppConfigInterface } from "./types";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electron", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  onAppConfig: (func: (args: any) => void) => {
    // @ts-ignore
    const subscription = (_event: any, ...args: any) => func(...args);
    ipcRenderer.invoke("getAppConfig");
    ipcRenderer.on("appConfig", subscription);
    return () => ipcRenderer.removeListener("appConfig", subscription);
  },
  setAppConfig: (config: Partial<AppConfigInterface>) =>
    ipcRenderer.invoke("setAppConfig", config),
  resetAppConfig: () => ipcRenderer.invoke("resetAppConfig"),
  quitApp: () => ipcRenderer.invoke("quitApp"),
  /** Steam */
  steam: {
    isWorking: (func: (isWorking: boolean) => void) => {
      // @ts-ignore
      const subscription = (_event: any, ...args: any) => func(...args);
      ipcRenderer.invoke("steam.isWorking");
      ipcRenderer.on("steam.isWorking", (event: any, isWorking: boolean) => {
        subscription(event, isWorking);
        ipcRenderer.removeListener("steam.isWorking", subscription);
      });
    },
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
