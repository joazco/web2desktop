# Bridge a web project in development

This document explains how to load a web source **in development mode** with Web2Desktop.
The configuration is defined in the file [`src/config.ts`](../src/config.ts), using the `webSource` key, which is typed with the [`WebSourceConfig`](TYPES.md#web-source-configuration) interface.

---

## 1) Launch the demo (quick)

The demo is in `demo/`. To load it in the app:

1. In [`src/config.ts`](../src/config.ts), set the dev source to `file` mode.
2. Start the app with `npm run dev`.

Example:

```ts
webSource: {
  dev: {
    mode: "file",
    target: "./demo/index.html",
  },
},
```

---

## 2) Load a local file (from your computer)

If you want to open a local HTML file (outside `www/`), use `file` mode:

```ts
webSource: {
  dev: {
    mode: "file",
    target: "/absolute/path/to/your/project/dist/index.html",
  },
},
```

Note: prefer an **absolute path** to avoid resolution issues.

---

## 3) Load a URL (dev server)

To use a dev server (Vite, React, Next, Angular, etc.), use `http` mode:

```ts
webSource: {
  dev: {
    mode: "http",
    target: "http://localhost:5173",
  },
},
```

Framework examples:

### Vite

```sh
npm run dev
```

```ts
webSource: {
  // Works same with 'https'
  dev: { mode: "http", target: "http://localhost:5173" },
},
```

### React (Create React App)

```sh
npm start
```

```ts
webSource: {
  dev: { mode: "http", target: "http://localhost:3000" },
},
```

### Next.js

```sh
npm run dev
```

```ts
webSource: {
  dev: { mode: "http", target: "http://localhost:3000" },
},
```

### Angular

```sh
npm start
```

```ts
webSource: {
  dev: { mode: "http", target: "http://localhost:4200" },
},
```

---

## Bonus: stay on `www/` in dev

If you want to use the `www/` folder in development:

```ts
webSource: {
  dev: {
    mode: "www",
    target: "index.html",
  },
},
```

---
