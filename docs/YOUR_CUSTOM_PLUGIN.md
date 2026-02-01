# Create a custom Electron plugin

This document explains how to create a plugin for Web2Desktop and run it on the Electron side.

## 1) Create the plugin file

Create a file in `src/plugins`, for example `src/plugins/my_plugin.ts`, then create a class that implements [`Web2DesktopPluginInterface`](TYPES.md#plugin-interface) (see [`src/types.ts`](./TYPES.md)).

Simple example:

```ts
import { Web2DesktopPluginInterface } from "../types";

type MyPluginConfig = {
  enabled: boolean;
};

export class MyPlugin implements Web2DesktopPluginInterface<MyPluginConfig> {
  readonly pluginName = "MyPlugin";
  readonly handlers = new Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  >();
  config?: MyPluginConfig;

  init() {
    this.handlers.set("myPlugin.ping", () => "pong");
  }
}
```

Important points:

- `pluginName` must be unique and is used as the key in config.
- `handlers` registers the actions that the frontend can invoke.
- `config` is optional and receives the values defined in [`config.ts`](../src/config.ts).
- `init()` is required and is used to prepare the plugin (handlers, state, etc.).
- `handleClickAppMenuItem(id)` is optional if you want to react to menu clicks.

## 2) Add the plugin config

In [`config.ts`](../src/config.ts), add your config under `plugins` with the plugin name (which matches `pluginName` in your plugin class) as the key:

```ts
plugins: {
  MyPlugin: {
    enabled: true,
  },
},
```

## 3) Full example with the Steam plugin

You can use the existing example:

- `src/plugins/steam.ts`
- matching config in [`src/config.ts`](../src/config.ts) under `plugins: { Steam: { ... } }`

## 4) Call from the frontend

The frontend can call handlers using the names you expose in `handlers`.
Keep names clear and namespaced (e.g. `myPlugin.ping`).

## 5) Full example

- `src/config.ts`:

```ts
const config: Omit<AppConfigInterface, "size"> = {
  ...
  applicationMenu: [
    ....,
    {
      label: "My Plugin",
      submenu: [{
        id: "my-plugin-enable",
        label: "Enable My Plugin",
      }, {
        id: "my-plugin-disable",
        label: "Disable My Plugin",
      }]
    }
  ],
  plugins: {
    MyPlugin: {
      enabled: true
    }
  }
}
```

- `src/plugins/myPlugin.ts`:

```ts
import { Web2DesktopPluginInterface } from "../types";

type MyPluginConfig = {
  enabled: boolean;
};

export class MyPlugin implements Web2DesktopPluginInterface<MyPluginConfig> {
  readonly pluginName = "MyPlugin";
  readonly handlers = new Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  >();
  config?: MyPluginConfig;
  private _enabled: boolean = false;

  init() {
    this._enabled = !!this.config?.isEnabled;
    this.handlers.set("myPlugin.ping", () => "pong");
    this.handlers.set("myPlugin.isEnabled", async () => {
      return this._enabled;
    });
    this.handlers.set("myPlugin.setEnabled", this.setEnabled);
  }

  handleClickAppMenuItem(id: string) {
    if (id === "my-plugin-disable") {
      this._enabled = false;
    } else if (id === "my-plugin-enable") {
      this._enabled = true;
    }
  }

  private setEnabled(_: Electron.IpcMainInvokeEvent, args: { enable: string }) {
    this._enabled = args.enable;
  }
}
```

- `index.js` (frontend side)

```js
document.addEventListener("DOMContentLoaded", async () => {
  // logs all plugins
  console.log(await window.web2desktop?.logPlugins());

  // MyPlugin
  console.log(await window.web2desktop?.invoke("myPlugin.isEnabled"));
  window.web2desktop?.invoke("myPlugin.setEnabled", { enable: true });
});
```
