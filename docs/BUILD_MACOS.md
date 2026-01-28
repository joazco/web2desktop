# Build macOS

Ce document explique comment fonctionne le build d’une application `.app` et d’un installeur DMG sous macOS.

## Makers

### Zip

Par défaut sur macOS, la commande `npm run make` génère un fichier `.zip` dans le dossier `out/make` contenant tout ce qui est nécessaire pour lancer l’application `.app`.

### DMG

Vous pouvez vous référer à la [documentation DMG](https://www.electronforge.io/config/makers/dmg).

#### Activation

Afin de créer un installeur DMG, Web2Desktop propose le maker DMG qu’**il faut activer** dans le fichier [src/config.ts](../src/config.ts).

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

#### Signature

> Pour savoir comment créer un certificat, un identifiant et un mot de passe Apple, vous pouvez vous référer à la [documentation Electron Forge](https://www.electronforge.io/guides/code-signing/code-signing-macos) et à la [documentation Electron](https://www.electronjs.org/fr/docs/latest/tutorial/code-signing).  
> Il est nécessaire d’avoir un compte Apple Developer et de suivre les étapes indiquées pour obtenir les informations afin de signer votre application officiellement.

Pour signer et notariser votre application, il vous faut ajouter dans [src/config.ts](../src/config.ts) vos informations Apple :

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

### Fichier Entitlements

Un fichier [`entitlements.mac.plist`](../resources/apple/entitlements.mac.plist) est fourni par défaut dans Web2Desktop. Vous pouvez le modifier dans le dossier `resources/apple`.  
Référez-vous à la [documentation Apple](https://developer.apple.com/documentation/bundleresources/entitlements).
