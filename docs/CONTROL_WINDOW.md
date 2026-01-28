# Control the window (Preload API)

Web2Desktop exposes a secure API through `window.web2desktop` in your HTML/JS.  
This API lets you control the window (fullscreen, size, devtools, etc.) and access a few system details.

---

## Access the API

In your frontend code (inside `www/`), use `window.web2desktop`:

```js
console.log(window.web2desktop?.ping());
```

---

## Main functions

### Get the current configuration

```js
window.web2desktop?.onAppConfig((config) => {
  console.log("Current config:", config);
});
```

> `onAppConfig` immediately sends the current config and then pushes updates.

---

### Update the configuration

```js
// Example: switch theme
window.web2desktop?.setAppConfig({ themeSource: "dark" });

// Example: go fullscreen
window.web2desktop?.setAppConfig({ fullScreen: true });

// Example: disable resizing
window.web2desktop?.setAppConfig({ resizable: false });

// Example: prevent closing the app
window.web2desktop?.setAppConfig({ closable: false });

// Example: open DevTools
window.web2desktop?.setAppConfig({ openDevtools: true });

// Example: change window size
window.web2desktop?.setAppConfig({
  fullScreen: false,
  size: { width: screen.availWidth, height: screen.availHeight },
});
```

---

### Reset configuration

```js
window.web2desktop?.resetAppConfig();
```

> Reloads the default values defined in `src/config.ts`.

---

### Quit the application

```js
window.web2desktop?.quitApp();
```

---

## Useful info

```js
console.log(window.web2desktop?.node()); // Node.js version
console.log(window.web2desktop?.chrome()); // Chromium version
console.log(window.web2desktop?.electron()); // Electron version
```

---

## Important notes

- All calls are optional (`?.`) to avoid errors if the API is unavailable.
- Valid values are defined in `src/types.ts` (see `AppConfigInterface`).
- If `disableOpenDevToolOnProduction` is enabled, DevTools may be blocked in production.
