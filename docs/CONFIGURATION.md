# Configuration

Before running the project, define the default configuration for your app in [`./src/config.ts`](../src/config.ts).

You can also create a [`config.local.json`](../src//config.local.json) file to override values from `config.ts`. This file uses JSON format, which is easier to edit or generate from external code or tools.

`AppConfigInterface`:

| Property                                      | Type                                                                                                                                                                          | Description                                                      |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`                                        | `string`                                                                                                                                                                      | Application name.                                                |
| `themeSource`                                 | `"system" \| "light" \| "dark"`                                                                                                                                               | OS theme to apply to the app.                                    |
| `fullScreen`                                  | `boolean`                                                                                                                                                                     | Launch in fullscreen or not.                                     |
| `resizable`                                   | `boolean`                                                                                                                                                                     | Allow the window to be resized by the user.                      |
| `closable`                                    | `boolean`                                                                                                                                                                     | Allow the window to be closed by the user.                       |
| `openDevtools`                                | `boolean`                                                                                                                                                                     | Open DevTools on startup.                                        |
| `disableOpenDevToolOnProduction`              | `boolean`                                                                                                                                                                     | Prevent DevTools from opening in production.                     |
| `webSource.prod.target`                       | `string`                                                                                                                                                                      | Production target file inside `www` (default: `index.html`).     |
| `webSource.dev.mode`                          | `"www" \| "http" \| "file"`                                                                                                                                                   | Development source mode.                                         |
| `webSource.dev.target`                        | `string`                                                                                                                                                                      | Development target (`index.html`, `http://...`, or a file path). |
| `plugins.Steam.appId`                         | `number`                                                                                                                                                                      | Steam game ID used to enable Steam API calls.                    |
| `build.appBundleId`                           | `string`                                                                                                                                                                      | Application bundle identifier.                                   |
| `build.version`                               | `string`                                                                                                                                                                      | Application version.                                             |
| `build.author`                                | `string`                                                                                                                                                                      | App author name.                                                 |
| `build.maintainerEmail`                       | `string`                                                                                                                                                                      | Maintainer contact email.                                        |
| `build.homepage`                              | `string`                                                                                                                                                                      | App or author homepage.                                          |
| `build.copyright`                             | `string`                                                                                                                                                                      | Application copyright.                                           |
| `build.apple.makers`                          | `"dmg"[]`                                                                                                                                                                     | macOS makers to use (DMG).                                       |
| `build.apple.signature.identity`              | `string`                                                                                                                                                                      | macOS signing identity.                                          |
| `build.apple.signature.appleId`               | `string`                                                                                                                                                                      | Apple ID used for notarization.                                  |
| `build.apple.signature.appleIdPassword`       | `string`                                                                                                                                                                      | Apple ID password or app-specific password.                      |
| `build.apple.signature.teamId`                | `string`                                                                                                                                                                      | Apple Developer Team ID.                                         |
| `build.windows.markers`                       | `"squirrel"[]`                                                                                                                                                                | Windows maker to use (Squirrel).                                 |
| `build.windows.signature.certificateFile`     | `string`                                                                                                                                                                      | Path to the Windows signing certificate.                         |
| `build.windows.signature.certificatePassword` | `string`                                                                                                                                                                      | Password for the Windows certificate.                            |
| `build.linux.makers`                          | `("deb" \| "rpm")[]`                                                                                                                                                          | Linux makers to use (Deb/RPM).                                   |
| `build.linux.categories`                      | `("AudioVideo" \| "Audio" \| "Video" \| "Development" \| "Education" \| "Game" \| "Graphics" \| "Network" \| "Office" \| "Science" \| "Settings" \| "System" \| "Utility")[]` | Linux package categories (Deb/RPM).                              |

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
