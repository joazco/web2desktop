# Installation

To install Web2Desktop, you need **Node.js 24 or newer**.

## Get the repository

### With Git (recommended)

```sh
git clone https://github.com/joazco/web2desktop.git
cd web2desktop
```

If you want to keep the original repo **and** push your own changes to your repo, you have two options:

#### Option A — Manual remotes (“upstream” convention)

Rename the official remote to `upstream` and set your repo as `origin`:

```sh
# Replace with your own repo URL
git remote rename origin upstream
git remote add origin {your-repo-url}
```

This way you push to `origin` and pull updates from the official repo:

```sh
git pull upstream main --no-rebase
```

#### Option B — GitHub fork

1) Fork the repo on GitHub.  
2) Clone your fork:

```sh
git clone https://github.com/{your-user}/web2desktop.git
cd web2desktop
```

3) Add the official remote to pull updates:

```sh
git remote add upstream https://github.com/joazco/web2desktop.git
git fetch upstream
git pull upstream main --no-rebase
```

### ZIP download

You can also [download Web2Desktop as a ZIP](https://github.com/joazco/web2desktop/archive/refs/heads/main.zip) and extract it locally.  
Limitation: you won’t be able to easily pull updates from the official repo.

## Install dependencies

From the project directory:

```sh
npm install
# Verify everything works
npm run dev:demo
```
