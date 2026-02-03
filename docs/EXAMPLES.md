# Examples

## Local configurations with Git

To keep `forge.config.local.json` and `src/config.json` in the repository, but prevent future local changes from showing up in `git status` (and therefore being pushed by mistake), use `skip-worktree`.

Commands:

```bash
git update-index --skip-worktree forge.config.local.json src/config.json
```

To re-enable tracking of local changes:

```bash
git update-index --no-skip-worktree forge.config.local.json src/config.json
```

Notes:

- These files remain versioned, but your local changes are ignored by Git.
- If you want to share changes, you must remove `skip-worktree` first.
- You need to do this for each new web2desktop project on each developer’s machine.

## Listening to and emitting events from plugins

In this example I created a plugin that sends information to the renderer when the window is being resized. This is possible thanks to the [`on`](TYPESCRIPT.md#typescript) function in the preload and the optional [`handleMainWindowOpenned`](TYPES.md#interface-web2desktopplugininterface) function in plugins.

1. Create the `ResizeWindow` plugin

In the `src/plugin` folder, create the `resizeWindow.ts` file with the following content:

```ts
import { BrowserWindow } from "electron";

import { Web2DesktopPluginInterface } from "../types";

type ResizePayload = {
  width: number;
  height: number;
  x: number;
  y: number;
  isFullScreen: boolean;
  isMaximized: boolean;
};

export default class ResizeWindowPlugin implements Web2DesktopPluginInterface {
  handlers: Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  > = new Map();
  pluginName = "ResizeWindow";

  async init() {}

  handleMainWindowOpenned(mainWindow: BrowserWindow) {
    const handler = () => {
      const b = mainWindow.getBounds();
      const payload: ResizePayload = {
        width: b.width,
        height: b.height,
        x: b.x,
        y: b.y,
        isFullScreen: mainWindow.isFullScreen(),
        isMaximized: mainWindow.isMaximized(),
      };

      mainWindow.webContents.send("resizeWindow.onResize", payload);
    };

    // Emit once immediately (optional, but usually helpful)
    handler();

    mainWindow.on("resize", handler);

    console.log("[web2desktop] resizeWindow: listening");
  }
}
```

2. In your renderer file (JavaScript or TypeScript)

```js
document.addEventListener("DOMContentLoaded",  () => {
    ....
    window.web2desktop?.on("resizeWindow.onResize", (playload) => {
        console.log("🚀 ~ playload:", playload);
    });
})
```
