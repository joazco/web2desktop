# Build Linux

This document explains how building a Linux package works with `.deb` or `.rpm`.

## Makers

### Zip

By default on Linux, `npm run make` generates a `.zip` file in `out/make` containing everything needed to run the app.

### DEB / RPM

You can refer to the documentation:

- [Maker DEB](https://www.electronforge.io/config/makers/deb)
- [Maker RPM](https://www.electronforge.io/config/makers/rpm)

#### Activation

To generate a Linux package, Web2Desktop provides two makers depending on the distribution:

- **DEB** (Debian/Ubuntu)
- **RPM** (Fedora/RHEL)

They must be enabled in [src/config.ts](../src/config.ts):

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
        linux: {
            makers: ["deb", "rpm"],
            categories: ["Game"],
        }
    }
}
```

#### Notes

- The generated format depends on the enabled makers.
- There is no signing system here (unlike macOS/Windows).
