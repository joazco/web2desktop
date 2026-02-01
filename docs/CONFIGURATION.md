# Configuration

Before running the project, define the default configuration for your app in [`./src/config.ts`](../src/config.ts).

**_You can also create a [`config.local.json`](../src//config.local.json) file to override values from `config.ts`. This file uses JSON format, which is easier to edit or generate from external code or tools._**

## App Config

The default application configuration is defined in [`./src/config.ts`](../src/config.ts). To understand its structure, you can refer to the typing documentation in [typage](./TYPES.md).

## Simple example

```ts
const config: Omit<AppConfigInterface, "size"> = {
  name: "Web2Desktop",
  themeSource: "system",
  fullScreen: false,
  resizable: true,
  closable: true,
  openDevtools: false,
  disableOpenDevToolOnProduction: true,
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
      label: "&Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
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
  webSource: {
    prod: {
      target: "index.html",
    },
    dev: {
      mode: "file",
      target: "./demo/index.html",
    },
  },
  build: {
    appBundleId: "com.joazco.web2desktop",
    version: "1.0.0",
    author: "AZOULAY Jordan",
    maintainerEmail: "contact@joazco.com",
    homepage: "https://joazco.com",
    copyright: "© Web2Desktop JOAZCO Inc.",
    // windows: {},
    // apple: {},
    // linux: {}
  },
};
```

## Full example

```ts
const config: Omit<AppConfigInterface, "size"> = {
  name: "Web2Desktop",
  themeSource: "system",
  fullScreen: false,
  resizable: true,
  closable: true,
  openDevtools: false,
  disableOpenDevToolOnProduction: true,
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
      label: "&Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
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
  webSource: {
    prod: {
      target: "index.html",
    },
    dev: {
      // Angular example
      mode: "http",
      // Works same with 'https'
      target: "http://localhost:4200",
    },
  },
  build: {
    appBundleId: "com.joazco.web2desktop",
    version: "1.0.0",
    author: "AZOULAY Jordan",
    maintainerEmail: "contact@joazco.com",
    homepage: "https://joazco.com",
    copyright: "© Web2Desktop JOAZCO Inc.",
    windows: {
      markers: ["squirrel"],
      signature: {
        certificateFile: "./resources/windows/file.cert",
        certificatePassword: "mypassword",
      },
    },
    apple: {
      makers: ["dmg"],
      signature: {
        appleId: "contact@joazco.com",
        appleIdPassword: "mypassword",
        identity:
          'E1D2S3EZ5A4S8SD9E6Z3A2W1C4DS5A6 "Developer ID Application: Jordan AZOULAY (A8SDFE74)"',
        teamId: "A8SDFE74",
      },
    },
    linux: { categories: ["Game"] },
  },
  plugins: {
    Steam: {
      appId: 123456,
    },
  },
};
```

## Plugins configuration

Plugins are configured under the `plugins` key using the plugin name as the object key. Each plugin can define its own configuration shape.

Example:

```json
{
  "plugins": {
    "Steam": {
      "appId": 12345678
    }
  }
}
```
