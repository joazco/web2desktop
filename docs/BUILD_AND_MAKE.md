# Build and Make application

This document explains what the `npm run make` command does.

You can refer to the [Electron Forge documentation](https://www.electronforge.io/config/makers).

## Summary

By default, `npm run make`:

- Compiles the project (`npm run build`)
- Generates a package **in the format of the machine you run the command on**
  - **Windows** → `.zip` (default)
  - **macOS** → `.zip` (default)
  - **Linux** → `.zip` (default)

Generated files are placed in `out/make`, usually as a `.zip` to extract.

---

## Command

```sh
npm run make
```

---

## Where are the builds?

After running the command, everything is located in:

```
out/make
```

---

## Notes

- The format depends on your configuration ([`src/config.ts`](../src/config.ts)).
- You can override the Forge config by creating a `forge.config.local.json`.
  ⚠️ Be careful: it **overwrites** the Forge config, so any missing fields will be lost.
- By default, **the ZIP maker is enabled** on all platforms.
- Other makers (Squirrel, DMG, Deb/RPM, etc.) must be added in [`src/config.ts`](../src/config.ts).
- Enabled makers determine which files are generated.
- If you run the command on Windows, you’ll get a Windows build (same idea for macOS/Linux).
