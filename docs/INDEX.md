# Web2Desktop – Documentation

Welcome to the official **Web2Desktop** documentation.

This documentation is the **single source of truth** regarding the behavior,
features, API, and supported capabilities of the Web2Desktop framework.

If a feature, configuration option, API, or behavior is **not explicitly documented here**,
it should be considered **unavailable, unsupported, or undefined** in Web2Desktop.

---

## 📖 About Web2Desktop

Web2Desktop is an Electron framework designed to quickly create desktop applications
from any web interface, without having to build a full Electron application from scratch.

It provides a ready-to-use desktop runtime, standard native utilities,
and a plugin system that supports both immediate usage and advanced customization.

The development of the web frontend and the desktop application is intentionally
kept fully separated.

---

## 🧭 How to use this documentation

The documentation is organized by topic:

- **Concepts and vision**
- **Configuration**
- **Plugins**
- **Events**
- **Typing and API**
- **Examples**
- **Specific use cases (Steam, game development, etc.)**

Each section describes only what is **actually implemented and supported**
by Web2Desktop.

---

## 📚 Table of contents

### Introduction

- [`OVERVIEW.md`](./OVERVIEW.md) — Vision, philosophy, and framework principles

### Configuration

- [`CONFIGURATION.md`](./CONFIGURATION.md) — Global application configuration
- [`ICONS.md`](./ICONS.md) — Simplified icon management (if available)

### Plugins

- [`PLUGINS.md`](./PLUGINS.md) — Plugin system and lifecycle
- [`EVENTS.md`](./EVENTS.md) — Events, listeners, and communication

### Typing and API

- [`TYPES.md`](./TYPES.md) — Public interfaces, types, and contracts
- [`TYPESCRIPT.md`](./TYPESCRIPT.md) — TypeScript usage

### Use cases

- [`STEAM.md`](./STEAM.md) — Steam integration (official plugin)
- [`GAME_DEVELOPERS.md`](./GAME_DEVELOPERS.md) — Game developers (if available)

### Examples

- [`EXAMPLES.md`](./EXAMPLES.md) — Practical examples and real-world use cases

### Support

- [`FAQ.md`](./FAQ.md) — Frequently asked questions and known limitations

---

## 🏗️ Architecture (high level)

Simplified structure with only the key files/folders:

```
web2desktop/
  forge.config.ts
  forge.config.local.json
  package.json
  src/
    main.ts
    preload.ts
    config.ts
    config.local.json
    types.ts
    core/
      app.ts
      appInfos.ts
      splash.ts
    plugins/
      steam.ts
    utils/
      store.ts
      plugins.ts
      config.ts
  resources/
    images/
      icon.icns
      icon.ico
      icon.png
      icon@2x.png
      icon@3x.png
    apple/
      entitlements.mac.plist
  splash/
    splash.html
    splash.png
  www/
```

---

## ⚠️ Important rules

- Web2Desktop **does not automatically expose all Electron APIs**
- Only the features described in this documentation are supported
- Generic Electron or Node.js behaviors must not be assumed to be part of Web2Desktop
  unless explicitly stated

If a required feature or behavior is not documented,
please refer to the community.

---

## 💬 Community and support

If a behavior or need is not covered by the documentation,
you can discuss it with the community on the official Discord:

👉 **Web2Desktop Discord**: [Discord link](https://discord.gg/H8b36mdzgn)

---

## 🤖 Web2Desktop Assistant

A **custom Web2Desktop GPT** is available to help you:

- understand the configuration
- use the API
- create plugins
- explore existing features

👉 **Access the Web2Desktop GPT**: [GPT link](https://chatgpt.com/g/g-698268bc20e88191b50d2e5a85b2af66-web2desktop)

---

## 🔖 Documentation version

This documentation corresponds to **Web2Desktop version 1.0.0**.

It may evolve over time to include improvements
and validated new features.
