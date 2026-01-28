# Steam (Base API)

This document explains how to **check if Steam is available** and **retrieve the player’s display name**, without covering achievements.

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
window.web2desktop?.steam.isWorking((isWorking) => {
  if (isWorking) {
    console.log("Steam OK");
  } else {
    console.log("Steam OFF");
  }
});
```

---

## Get the player display name

```js
window.web2desktop?.steam.getName((name) => {
  if (name) {
    console.log("Steam name:", name);
  } else {
    console.log("No name detected");
  }
});
```

---

## Full example

```js
window.web2desktop?.steam.isWorking((isWorking) => {
  if (!isWorking) {
    console.log("Steam OFF");
    return;
  }

  window.web2desktop?.steam.getName((name) => {
    console.log("Steam name:", name ?? "-");
  });
});
```

---
