# Web2Desktop

**Web2Desktop** transforms any already built website or web application into a native desktop application for **Windows, macOS, and Linux**.

It provides a lightweight Electron-based shell, a secure native bridge, and a simple workflow to package web builds as real desktop software — without modifying existing web code.

---

## 📄 Docs

1. Getting started
   - [Installation](./docs/INSTALLATION.md)
   - [Configuration](./docs/CONFIGURATION.md)
   - [Bridge a Web Project](./docs/WEB_PROJECT_BRIDGE.md)
2. Window & API
   - [Control Window (Preload API)](./docs/CONTROL_WINDOW.md)
   - [TypeScript typings](./docs/TYPESCRIPT.md)
3. Assets
   - [Icons & Splash](./docs/ICONS.md)
4. Steam
   - [Steam basics](./docs/STEAM.md)
   - [Achievements](./docs/ACHIEVEMENTS.md)
5. Build & packaging
   - [Build and Make](./docs/BUILD_AND_MAKE.md)
   - [Windows](./docs/BUILD_WINDOWS.md)
   - [macOS](./docs/BUILD_MACOS.md)
   - [Linux](./docs/BUILD_LINUX.md)

---

## ✨ Why Web2Desktop?

Building desktop apps from web projects often feels heavier than it should be.

web2desktop focuses on:

- ✅ simplicity over configuration
- ✅ drop-in usage (HTML, CSS, JS builds)
- ✅ security by default
- ✅ open source & framework-agnostic

No frontend framework lock-in.  
No complex bundler setup.  
Just your web build → desktop app.

---

## 🎯 Who is this for?

web2desktop is designed for:

- web developers who want to ship desktop apps easily
- game developers packaging web-based games
- teams distributing internal tools as desktop software

---

## 🚀 Features

- Load static web builds (`index.html`, assets, JS, CSS)
- Native desktop window management
- Secure preload API (`contextIsolation`, `sandbox`)
- Dev & production modes
- Cross-platform builds (Windows / macOS / Linux)
- Fully open source (MIT)

---

## 📦 Project status

⚠️ **Early development**

web2desktop is currently under active development.  
APIs may evolve, and some features are experimental.

Feedback and contributions are very welcome.

---

## 💬 Community

Questions, ideas, or feedback?

👉 Join the **web2desktop Discord**:  
https://discord.gg/H8b36mdzgn

---

## 🤝 Contributing

Contributions are welcome!

Please read:

- [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- [`CONTRIBUTING_FR.md`](./CONTRIBUTING_FR.md)

Whether it’s a bug report, documentation improvement, or a feature idea — your input matters.

---

## 📜 License

web2desktop is licensed under the **MIT License**.

You are free to use it in personal, commercial, and open source projects.

---

## ❤️ Support

If web2desktop helps you, you can support its development via GitHub Sponsors (coming soon).

---

## 🧩 Showcase

### Dark Blue Dungeon

[Dark Blue Dungeon](https://store.steampowered.com/app/3119460/Dark_Blue_Dungeon/) is an RPG video game built with JavaScript technologies and uses Web2Desktop to be deployed on Steam.
![Dark Blue Dungeon demo](./docs/showcase/darkbluedungeon.gif)

---

Built with care for the open source community 🚀
