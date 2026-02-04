# Steam (Base API)

This document explains how to **check if Steam is available** and **retrieve the player's display name**, without covering achievements.

This module relies on the [**steamworks.js**](https://github.com/ceifa/steamworks.js) library to communicate with Steam.

---

## Requirements

- Steam must be installed and running.
- Configure the `appId` in `src/config.ts`:

```ts
steam: {
  appId: 123456,
},
```

---

## Check if Steam is available

```js
const isWorking = await window.web2desktop?.invoke("steam.isWorking");
if (isWorking) {
  console.log("Steam OK");
} else {
  console.log("Steam OFF");
}
```

---

## Get the player display name

```js
const name = await window.web2desktop?.invoke("steam.getName");
if (name) {
  console.log("Steam name:", name);
} else {
  console.log("No name detected");
}
```

---

## Full example

```js
const isWorking = await window.web2desktop?.invoke("steam.isWorking");
if (!isWorking) {
  console.log("Steam OFF");
  return;
}

const name = await window.web2desktop?.invoke("steam.getName");
console.log("Steam name:", name ?? "-");
```

---
