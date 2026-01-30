/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { ipcMain } from "electron";
import * as steamworks from "steamworks.js";

import config from "../config";

export class Steam {
  private _client: ReturnType<typeof steamworks.init> | null = null;

  init() {
    // Initialize the Steamworks client (optional, based on config).
    try {
      this._client = steamworks.init(config.steam?.appId);
    } catch (e) {
      this._client = null;
    }

    // Check if Steam is available.
    ipcMain.handle("steam.isWorking", () => this._client !== null);

    // Read the local player's Steam name.
    ipcMain.handle("steam.getName", () => {
      if (!this._client) {
        throw new Error("Steam is'nt working");
      }
      return this._client.localplayer.getName();
    });

    // Query achievement status.
    ipcMain.handle(
      "steam.achievement.isActivated",
      (_, achievement: string) => {
        if (!this._client) {
          throw new Error("Steam is'nt working");
        }
        return !!this._client?.achievement.isActivated(achievement);
      },
    );

    // Activate the achievement if not already unlocked.
    ipcMain.handle("steam.achievement.activate", (_, achievement: string) => {
      if (!this._client) {
        throw new Error("Steam is'nt working");
      }
      let isActivated = !!this._client?.achievement.isActivated(achievement);
      if (!isActivated) {
        this._client?.achievement.activate(achievement);
        isActivated = !!this._client?.achievement.isActivated(achievement);
      }
      return isActivated;
    });

    // Clear (reset) the achievement.
    ipcMain.handle("steam.achievement.clear", (_, achievement: string) => {
      if (!this._client) {
        throw new Error("Steam is'nt working");
      }
      this._client?.achievement.clear(achievement);
      return !!this._client?.achievement.isActivated(achievement);
    });
  }
}
