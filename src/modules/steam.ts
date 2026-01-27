import { ipcMain } from "electron";
import * as steamworks from "steamworks.js";

import config from "../config";

export class Steam {
  private _client: ReturnType<typeof steamworks.init> | null = null;

  init() {
    try {
      this._client = steamworks.init(config.steam?.appId);
    } catch (e) {
      this._client = null;
    }

    const mainWindow = global.mainWindow;

    ipcMain.handle("steam.isWorking", () => {
      mainWindow.webContents.send("steam.isWorking", this._client !== null);
    });

    ipcMain.handle("steam.getName", () => {
      mainWindow.webContents.send(
        "steam.getName",
        this._client?.localplayer.getName(),
      );
    });

    ipcMain.handle(
      "steam.achievement.isActivated",
      (_, achievement: string) => {
        mainWindow.webContents.send(
          "steam.achievement.isActivated",
          !!this._client?.achievement.isActivated(achievement),
        );
      },
    );

    ipcMain.handle("steam.achievement.activate", (_, achievement: string) => {
      let isActivated = !!this._client?.achievement.isActivated(achievement);
      if (!isActivated) {
        this._client?.achievement.activate(achievement);
        isActivated = !!this._client?.achievement.isActivated(achievement);
      }
      mainWindow.webContents.send("steam.achievement.activate", isActivated);
    });

    ipcMain.handle("steam.achievement.clear", (_, achievement: string) => {
      this._client?.achievement.clear(achievement);
      const isActivated = !!this._client?.achievement.isActivated(achievement);
      mainWindow.webContents.send("steam.achievement.clear", isActivated);
    });
  }
}
