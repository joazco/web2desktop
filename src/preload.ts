/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

// Preload script: expose a safe, minimal API to the renderer.

import { IpcRendererEvent } from "electron";
// eslint-disable-next-line import/no-unresolved
import { contextBridge, ipcRenderer } from "electron/renderer";

import { AppConfigInterface } from "./types";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// The renderer calls window.electron.* (no direct Node access).
contextBridge.exposeInMainWorld("web2desktop", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  logPlugins: () => ipcRenderer.invoke("logPlugins"),
  // Subscribe to AppConfig updates pushed from the main process. Returns a function to unsubscribe from the event.
  onAppConfig: (callback: (args: Partial<AppConfigInterface>) => void) => {
    const subscription = (
      _event: IpcRendererEvent,
      args: Partial<AppConfigInterface>,
    ) => callback(args);
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
  // Invoke on custom plugins
  invoke: (channel: string, args?: Record<string, any>) =>
    ipcRenderer.invoke(channel, args),
  // Subscribe to an event emitted by the main process. Returns a function to unsubscribe from the event.
  on(channel: string, callback: (payload: any) => void) {
    const subscription = (_event: IpcRendererEvent, payload: any) =>
      callback(payload);
    ipcRenderer.on(channel, subscription);
    return () => ipcRenderer.removeListener(channel, subscription);
  },
});
