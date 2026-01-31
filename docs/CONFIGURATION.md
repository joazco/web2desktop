# Configuration

Before running the project, define the default configuration for your app in [`./src/config.ts`](../src/config.ts).

**_You can also create a [`config.local.json`](../src//config.local.json) file to override values from `config.ts`. This file uses JSON format, which is easier to edit or generate from external code or tools._**

## App config

### Interface `AppConfigInterface`:

| Property                         | Type                                                                     | Description                                   |
| -------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| `name`                           | `string`                                                                 | Application name.                             |
| `themeSource`                    | `"system" \| "light" \| "dark"`                                          | OS theme to apply to the app.                 |
| `fullScreen`                     | `boolean`                                                                | Launch in fullscreen or not.                  |
| `resizable`                      | `boolean`                                                                | Allow the window to be resized by the user.   |
| `closable`                       | `boolean`                                                                | Allow the window to be closed by the user.    |
| `openDevtools`                   | `boolean`                                                                | Open DevTools on startup.                     |
| `disableOpenDevToolOnProduction` | `boolean`                                                                | Prevent DevTools from opening in production.  |
| `webSource`                      | [`WebSourceConfig`](#web-source-configuration)                           | Web source configuration.                     |
| `applicationMenu`                | [`AppConfigInterfaceApplicationMenu[]`](#application-menu-configuration) | Application menu configuration.               |
| `build`                          | [`ForgeBuildInterface[]`](#build-configuration)                          | Build application configuration.              |
| `plugins.Steam.appId`            | `number`                                                                 | Steam game ID used to enable Steam API calls. |

## Web source configuration

### Interface `WebSourceConfig`:

| Property | Type                                                    | Description                    |
| -------- | ------------------------------------------------------- | ------------------------------ |
| `prod`   | [`WebSourceConfigProd`](#interface-websourceconfigprod) | Production web source config.  |
| `dev`    | [`WebSourceConfigDev`](#interface-websourceconfigdev)   | Development web source config. |

#### Interface `WebSourceConfigProd`:

| Property | Type     | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| `target` | `string` | Production target file inside `www` (default: `index.html`). |

#### Interface `WebSourceConfigDev`:

| Property | Type                        | Description                                                      |
| -------- | --------------------------- | ---------------------------------------------------------------- |
| `mode`   | `"www" \| "http" \| "file"` | Development source mode.                                         |
| `target` | `string`                    | Development target (`index.html`, `http://...`, or a file path). |

## Application menu configuration

### Interface `AppConfigInterfaceApplicationMenu`:

| Property           | Type                                                                                          | Description                               |
| ------------------ | --------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `label`            | `string`                                                                                      | Menu label displayed in the app menu bar. |
| `submenu`          | [`AppConfigInterfaceApplicationMenuItem[]`](#interface-appconfiginterfaceapplicationmenuitem) | List of menu items under this menu.       |
| `hideOnProduction` | `boolean`                                                                                     | Hide this menu in production.             |

### Interface `AppConfigInterfaceApplicationMenuItem`:

| Property           | Type                                                                                          | Description                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `id`               | `string`                                                                                      | Required to catch click events in plugins.                   |
| `label`            | `string`                                                                                      | Item label displayed in the menu.                            |
| `role`             | `MenuItemConstructorOptions["role"]`                                                          | Built-in Electron role for standard actions (e.g. `reload`). |
| `submenu`          | [`AppConfigInterfaceApplicationMenuItem[]`](#interface-appconfiginterfaceapplicationmenuitem) | Nested submenu items.                                        |
| `hideOnProduction` | `boolean`                                                                                     | Hide this item in production.                                |
| `type`             | `"normal" \| "separator"`                                                                     | Menu item type (default is `normal`).                        |
| `accelerator`      | `string`                                                                                      | Keyboard shortcut (e.g. `Ctrl+T`).                           |

## Build configuration

### Interface `ForgeBuildInterface`:

| Property          | Type                                                                  | Description                               |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| `version`         | `ForgeConfig["packagerConfig"]["appVersion"]`                         | Application version used by the packager. |
| `appBundleId`     | `ForgeConfig["packagerConfig"]["appBundleId"]`                        | Application bundle identifier.            |
| `author`          | `string`                                                              | App author name.                          |
| `maintainerEmail` | `string`                                                              | Maintainer contact email.                 |
| `homepage`        | `string`                                                              | App or author homepage.                   |
| `copyright`       | `string`                                                              | Application copyright.                    |
| `apple`           | [`ForgeBuildInterfaceApple`](#interface-forgebuildinterfaceapple)     | macOS build configuration.                |
| `windows`         | [`ForgeBuildInterfaceWindows`](#interface-forgebuildinterfacewindows) | Windows build configuration.              |
| `linux`           | [`ForgeBuildInterfaceLinux`](#interface-forgebuildinterfacelinux)     | Linux build configuration.                |

### Interface `ForgeBuildInterfaceApple`:

| Property    | Type                                | Description                               |
| ----------- | ----------------------------------- | ----------------------------------------- |
| `makers`    | `"dmg"[]`                           | macOS makers to use (DMG).                |
| `signature` | `ForgeBuildInterfaceAppleSignature` | macOS signing/notarization configuration. |

### Interface `ForgeBuildInterfaceAppleSignature`:

| Property          | Type     | Description                        |
| ----------------- | -------- | ---------------------------------- |
| `identity`        | `string` | macOS signing identity.            |
| `appleId`         | `string` | Apple ID used for notarization.    |
| `appleIdPassword` | `string` | Apple ID password or app password. |
| `teamId`          | `string` | Apple Developer Team ID.           |

### Interface `ForgeBuildInterfaceWindows`:

| Property    | Type                                                                                    | Description                      |
| ----------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| `markers`   | `"squirrel"[]`                                                                          | Windows maker to use (Squirrel). |
| `signature` | [`ForgeBuildInterfaceWindowsSignature`](#interface-forgebuildinterfacewindowssignature) | Windows signing configuration.   |

#### Interface `ForgeBuildInterfaceWindowsSignature`:

| Property              | Type                                         | Description                              |
| --------------------- | -------------------------------------------- | ---------------------------------------- |
| `certificateFile`     | `MakerSquirrelConfig["certificateFile"]`     | Path to the Windows signing certificate. |
| `certificatePassword` | `MakerSquirrelConfig["certificatePassword"]` | Password for the Windows certificate.    |

### Interface `ForgeBuildInterfaceLinux`:

| Property     | Type                                      | Description                         |
| ------------ | ----------------------------------------- | ----------------------------------- |
| `makers`     | `("deb" \| "rpm")[]`                      | Linux makers to use (Deb/RPM).      |
| `categories` | `MakerDebConfig["options"]["categories"]` | Linux package categories (Deb/RPM). |

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
