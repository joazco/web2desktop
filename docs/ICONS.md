# Icons & Splash

This document explains where the icon files are located and how to change them:

- **Splash screen** (startup screen)
- **Electron app icon**
- **Maker icons** (Windows / macOS / Linux)

---

## 1) Splash screen

To change the splash image:

1. Replace `splash/splash.png` with your image.
2. Keep a maximum resolution of **800×600px** to avoid distortion.

The splash simply shows the image for **2 seconds** centered on the screen.

---

## 2) Main Electron app icon

Electron Forge expects:

- `resources/images/icon.icns` (macOS)
- `resources/images/icon.ico` (Windows)
- `resources/images/icon.png` (Linux)

You can replace these files with your own icons using the same names.

### HiDPI support (Electron)

To support multiple DPI densities at the same time, Electron accepts multiple sizes in the same folder using `@2x`, `@3x`, etc.

Example:

```
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

Recommended sizes:

- `icon.png` = **512×512px**
- `icon@2x.png` = **1024×1024px**
- `icon@3x.png` = **1536×1536px**

_Refer to the [Electron Forge documentation](https://www.electronforge.io/guides/create-and-add-icons)._

---

## 3) Windows icons (Squirrel)

In `forge.config.ts`, the Windows config uses:

- `resources/images/icon.ico`

Fields used:

```ts
setupIcon: path.join(__dirname, "resources", "images", "icon.ico"),
iconUrl: path.join(__dirname, "resources", "images", "icon.ico"),
```

➡️ Replace `resources/images/icon.ico` with your Windows icon (format `.ico`).

---

## 4) macOS icons (DMG)

In `forge.config.ts`, the DMG config uses:

- `resources/images/icon.icns`

Field used:

```ts
icon: path.join(__dirname, "resources", "images", "icon.icns"),
```

➡️ Replace `resources/images/icon.icns` with your macOS icon (format `.icns`).

---

## 5) Linux icons (Deb/RPM)

In `forge.config.ts`, the Linux config uses:

- `resources/images/icon.png`

Fields used:

```ts
icon: path.join(__dirname, "resources", "images", "icon.png"),
```

➡️ Replace `resources/images/icon.png` with your Linux icon (format `.png`).

---

## 6) Quick summary (files to replace)

| Usage           | File                                                   |
| --------------- | ------------------------------------------------------ |
| Splash screen   | `splash/splash.png`                                    |
| Electron (main) | `resources/images/icon.icns` / `icon.ico` / `icon.png` |
| Windows         | `resources/images/icon.ico`                            |
| macOS           | `resources/images/icon.icns`                           |
| Linux           | `resources/images/icon.png`                            |

---

## 7) Best practices

- Use crisp, clean icons (not blurry).
- Stick to standard sizes:
  - **Windows**: multi‑resolution `.ico` (256x256 recommended).
  - **macOS**: multi‑resolution `.icns`.
  - **Linux**: square `.png` (512x512 recommended).
- Avoid uncontrolled transparency if your design doesn’t support it.

---

If you want, I can add a script to generate all icons from a single PNG.
