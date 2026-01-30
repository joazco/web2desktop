import { ipcMain } from "electron";
import fs, { glob } from "node:fs";
import path from "node:path";

import type { Web2DesktopPluginInterface } from "../types";

type PluginCtor = new () => Web2DesktopPluginInterface;

function isPluginClass(value: unknown): value is PluginCtor {
  return (
    typeof value === "function" &&
    typeof (value as any).prototype?.init === "function"
  );
}

export async function loadPlugins(pluginsDir: string) {
  if (!fs.existsSync(pluginsDir)) return;

  const entries = fs.readdirSync(pluginsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    if (!entry.name.endsWith(".js") && !entry.name.endsWith(".ts")) continue;

    const fullPath = path.join(pluginsDir, entry.name);
    try {
      const mod = await import(fullPath);

      // Priorité au default export
      const candidate =
        (mod?.default && isPluginClass(mod.default) && mod.default) ||
        Object.values(mod).find(isPluginClass);

      if (!candidate) continue;

      const plugin = new candidate() as Web2DesktopPluginInterface;
      plugin.config = global.config.plugins[plugin.pluginName];
      plugin.init();
      plugin.handlers.forEach((handler, channel) => {
        ipcMain.handle(channel, handler);
      });
      const { web2desktopPlugins } = global;
      if (!web2desktopPlugins.get(plugin.pluginName)) {
        web2desktopPlugins.set(plugin.pluginName, plugin);
      }
      console.log(`[web2desktop] Plugin loaded: ${entry.name}`);
    } catch (err) {
      console.error(`[web2desktop] Failed to load plugin: ${entry.name}`, err);
    }
  }
}

export function getPlugin(pluginName: string) {
  return global.web2desktopPlugins.get(pluginName);
}

export function getAllPlugins() {
  return global.web2desktopPlugins.values().toArray();
}
