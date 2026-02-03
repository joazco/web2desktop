/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */
import { shell } from "electron";
import * as steamworks from "steamworks.js";

import { Web2DesktopPluginInterface } from "../types";

type SteamConfig = {
  appId: number;
};

export class Steam implements Web2DesktopPluginInterface<SteamConfig> {
  /** Web2DesktopPluginInterface */
  readonly pluginName = "Steam";
  readonly handlers = new Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  >();
  config?: SteamConfig;

  async init() {
    // Initialize the Steamworks client (optional, based on config).
    try {
      this._client = steamworks.init(this.config?.appId);
    } catch (e) {
      this._client = null;
    }

    this.handlers.set("steam.isWorking", this.isWorking);
    this.handlers.set("steam.getName", this.getName);
    this.handlers.set(
      "steam.achievement.isActivated",
      this.isAchievementActivated
    );
    this.handlers.set("steam.achievement.activate", this.activateAchievement);
    this.handlers.set("steam.achievement.clear", this.clearAchievement);
  }

  handleClickAppMenuItem(id: string) {
    if (!this._client) return;

    if (id === "see-store-page") {
      shell.openExternal(`steam://nav/games/details/${this.config?.appId}`);
    } else if (id === "see-achievements") {
      shell.openExternal(
        `steam://openurl/https://steamcommunity.com/stats/${this.config?.appId}/achievements`
      );
    }
  }

  /** */
  private _client: ReturnType<typeof steamworks.init> | null = null;

  private ensureClient() {
    if (!this._client) {
      throw new Error("Steam isn't working");
    }
    return this._client;
  }

  private isWorking = () => this._client !== null;

  private getName = () => {
    return this.ensureClient().localplayer.getName();
  };

  private isAchievementActivated = (
    _event: Electron.IpcMainInvokeEvent,
    args: { achievementId: string }
  ) => {
    return !!this.ensureClient().achievement.isActivated(args.achievementId);
  };

  private activateAchievement = (
    _: Electron.IpcMainInvokeEvent,
    args: { achievementId: string }
  ) => {
    const client = this.ensureClient();
    let isActivated = !!client.achievement.isActivated(args.achievementId);
    if (!isActivated) {
      client.achievement.activate(args.achievementId);
      isActivated = !!client.achievement.isActivated(args.achievementId);
    }
    return isActivated;
  };

  private clearAchievement = (
    _: Electron.IpcMainInvokeEvent,
    args: { achievementId: string }
  ) => {
    const client = this.ensureClient();
    client.achievement.clear(args.achievementId);
    return !!client.achievement.isActivated(args.achievementId);
  };
}
