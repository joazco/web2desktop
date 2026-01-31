# Create and interact with the application menu

This document explains how to define the application menu and capture clicks in the Web2Desktop architecture.

## 1) Declare the menu in the config

The menu is configured in [`src/config.ts`](../src/config.ts) under the `applicationMenu` key.
The structure is defined in [`src/types.ts`](../src/types.ts) via `AppConfigInterface`.

Simple example:

```ts
applicationMenu: [
  {
    label: "&App",
    submenu: [
      {
        id: "quit",
        label: "&Quit",
      },
    ],
  },
  {
    label: "&View",
    hideOnProduction: true,
    submenu: [
      {
        label: "&Reload",
        role: "reload",
      },
      {
        role: "toggleDevTools",
      },
    ],
  },
],
```

Important points:

- `label` defines the visible title.
- `submenu` contains the items.
- `role` lets you use a predefined Electron action (e.g. `reload`).
- `id` is required if you want to capture a click (otherwise no event is emitted).
- `hideOnProduction` hides a menu in production.
- `accelerator` lets you define a keyboard shortcut.

## 2) Capture clicks from a plugin

To react to clicks, implement `handleClickAppMenuItem` in your plugin
(interface `Web2DesktopPluginInterface` in [`src/types.ts`](../src/types.ts)).

Example inspired by the Steam plugin ([`src/plugins/steam.ts`](../src/plugins/steam.ts)):

```ts
export class Steam implements Web2DesktopPluginInterface<{ appId: number }> {
  readonly pluginName = "Steam";
  readonly handlers = new Map<
    string,
    (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any
  >();

  handleClickAppMenuItem(id: string) {
    if (id === "see-store-page") {
      // action on click
    } else if (id === "see-achievements") {
      // action on click
    }
  }
}
```

## 3) Associate a menu with your plugin

In [`src/config.ts`](../src/config.ts), add items with `id` so your plugin can intercept them:

```ts
applicationMenu: [
  ....
  {
    label: "Steam",
    submenu: [
      {
        id: "see-store-page",
        label: "See Store Page",
        accelerator: "Ctrl+T",
      },
      {
        id: "see-achievements",
        label: "See achievements",
        accelerator: "Ctrl+P",
      },
    ],
  },
],
```

## 4) Flow summary

1. You define the menu in `applicationMenu` in [`src/config.ts`](../src/config.ts).
2. Items with `id` trigger an event.
3. Your plugin receives the `id` via `handleClickAppMenuItem` and runs the logic.
