# Types

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

## Plugin interface

### Interface `Web2DesktopPluginInterface`:

| Property                  | Type                                                                                      | Description                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `pluginName`              | `string`                                                                                  | Unique plugin name (used as config key).                        |
| `handlers`                | `Map<string, (event: Electron.IpcMainInvokeEvent, args?: Record<string, any>) => any>`    | IPC handlers exposed to the frontend.                           |
| `config`                  | `T`                                                                                       | Plugin configuration injected from `config.ts` (optional).      |
| `init`                    | `() => void`                                                                              | Initialization hook for the plugin.                             |
| `handleMainWindowOpenned` | `(mainWindow: BrowserWindow) => void`                                                     | Optional hook called when the main window is opened.            |
| `handleClickAppMenuItem`  | `(id: string) => void`                                                                    | Optional menu click handler (receives the menu item `id`).      |
