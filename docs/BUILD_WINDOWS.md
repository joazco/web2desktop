# Build Windows

This document explains how building a Windows executable and installer works.

## Makers

### Zip

By default on Windows, `npm run make` generates a `.zip` file in `out/make` containing everything needed to run your app’s `.exe`.


### MSIX

https://www.electronforge.io/config/makers/msix

- Télécharger le SDK Windows https://learn.microsoft.com/fr-fr/windows/apps/windows-sdk/downloads

Ne marche que si un certificat de signature est inclus

### WiX

https://www.electronforge.io/config/makers/wix-msi

- Télécharger WiX Tools https://github.com/wixtoolset/wix3/releases
- Mettre dans les variable envs `C:\Program Files (x86)\WiX Toolset v3.14\bin`

### Squirrel.Windows

EXPLIQUER QUE SA MET DANS APP DATA pas recommandé

You can refer to the [Squirrel.Windows documentation](https://www.electronforge.io/config/makers/squirrel.windows) et à la [documentation Electron](https://www.electronjs.org/fr/docs/latest/tutorial/code-signing).

#### Activation

To create an installer, Web2Desktop provides the Squirrel.Windows maker, which **must be enabled** in [src/config.ts](../src/config.ts).

```typescript
/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { AppConfigInterface } from "./types";

const config: Omit<AppConfigInterface, "size"> = {
    .....,
    build: {
        ....,
        windows: {
            makers: ["squirrel"],
        }
    }
}
```

#### Signing

**Windows code signing is complex and expensive. The configuration below is theoretical and based on the official documentation.**

To sign your application, add your certificate in [src/config.ts](../src/config.ts).

```typescript
/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import { AppConfigInterface } from "./types";

const config: Omit<AppConfigInterface, "size"> = {
    .....,
    build: {
        ....,
        windows: {
            makers: ["squirrel"],
            signature: {
                certificateFile: string // Path to certificate
                certificatePassword: string
            }
        }
    }
}
```
