# Build macOS

This document explains how the build of a `.app` and a DMG installer works on macOS.

## Makers

### Zip

By default on macOS, the `npm run make` command generates a `.zip` file in the `out/make` folder containing everything needed to launch the `.app`.

### DMG

You can refer to the [DMG documentation](https://www.electronforge.io/config/makers/dmg).

#### Enable

To create a DMG installer, Web2Desktop provides a DMG maker that you **must enable** in [src/config.ts](../src/config.ts).

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
        apple: {
            makers: ["dmg"],
        }
    }
}
```

#### Signing

> To learn how to create a certificate, an identifier, and an Apple password, refer to the [Electron Forge documentation](https://www.electronforge.io/guides/code-signing/code-signing-macos) and the [Electron documentation](https://www.electronjs.org/fr/docs/latest/tutorial/code-signing).  
> You need an Apple Developer account and must follow the steps to obtain the information required to sign your application officially.

To sign and notarize your application, add your Apple information to [src/config.ts](../src/config.ts):

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
        apple: {
            makers: ["dmg"],
            signature: {
                identity: string,
                appleId: string,
                appleIdPassword: string,
                teamId: string
            }
        }
    }
}
```

### Entitlements file

A default [`entitlements.mac.plist`](../resources/apple/entitlements.mac.plist) file is provided in Web2Desktop. You can edit it in the `resources/apple` folder.  
Refer to the [Apple documentation](https://developer.apple.com/documentation/bundleresources/entitlements).
