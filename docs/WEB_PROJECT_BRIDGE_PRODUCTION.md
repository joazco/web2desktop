# Bridge a Web Project to Web2Desktop on Production

Web2Desktop loads everything inside the `www/` folder.  
Your goal: **build your web project** so it outputs a static `index.html` plus its assets (JS/CSS/images), then **copy everything into `www/`**.

The configuration is defined in the file [`src/config.ts`](../src/config.ts), using the `webSource` key, which is typed with the [`WebSourceConfig`](TYPES.md#web-source-configuration) interface.

If you want to load a different file in production (not `index.html`), you can override it in [`config.ts`](../src/config.ts):

```ts
const config: Omit<AppConfigInterface, "size"> = {
  ....
  webSource: {
    prod: {
      target: "custom.html",
    },
  },
}
```

## ✅ Quick checklist

1. Build your web project (it must output a static `index.html`).
2. Copy the build output **into `www/`**.
3. Run Web2Desktop (`npm run dev`).

If your app works in a normal browser by opening the built `index.html`, it will work in Web2Desktop.

---

## Option A — Manual copy (simple)

After building your app:

```
your-web-project/
  dist/ (or build/, out/, etc.)
    index.html
    assets/...
```

Copy everything from the build folder into `web2desktop/www/`.

---

## Option B — Scripted copy (recommended)

Add a script in your project to copy the build output to Web2Desktop:

```sh
cp -R path/to/your/build/* /path/to/web2desktop/www/
```

You can automate this with a `package.json` script.

---

## Framework examples

### Vite

Build command:

```sh
npm run build
```

Output folder: `dist/`  
Copy `dist/*` → `web2desktop/www/`

### React (Create React App)

Build command:

```sh
npm run build
```

Output folder: `build/`  
Copy `build/*` → `web2desktop/www/`

### Next.js (static export)

To use Next.js, you must generate a **static site**:

```sh
npm run build
npm run export
```

Output folder: `out/`  
Copy `out/*` → `web2desktop/www/`

### Angular

Build command:

```sh
npm run build
```

Output folder: `dist/<project-name>/`  
Copy everything inside → `web2desktop/www/`

---

## Things to watch out for

- The build **must be static** (no SSR).
- Paths should be **relative** (so assets load correctly).
- If your framework uses a base URL, set it to `./` or use relative paths.

---
