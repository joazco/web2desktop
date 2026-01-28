# Achievements (Steam)

This document explains how to use **Steam achievements** with Web2Desktop.

---

## Requirements

- Steam installed and running.
- A valid `appId` in `src/config.ts`.
- The Steam API must be initialized (Web2Desktop does this on startup).

Config example:

```ts
steam: {
  appId: 123456,
},
```

---

## Check if an achievement is unlocked

```js
const achievementId = "START_ADVENTURE";

window.web2desktop?.steam.achievement.isActivated(
  achievementId,
  (isActivated) => {
    console.log("Unlocked?", isActivated);
  },
);
```

---

## Unlock an achievement

If the player already unlocked the achievement, this call won’t unlock it again.  
So you don’t need to check with `isActivated()` if your goal is simply to unlock it for the player.

```js
const achievementId = "START_ADVENTURE";

window.web2desktop?.steam.achievement.activate(achievementId, (isActivated) => {
  console.log("Unlocked after call?", isActivated);
});
```

---

## Reset an achievement (clear)

```js
const achievementId = "START_ADVENTURE";

window.web2desktop?.steam.achievement.clear(achievementId, (isActivated) => {
  console.log("Unlocked after clear?", isActivated);
});
```

---

## Full example

```js
const achievementId = "START_ADVENTURE";

window.web2desktop?.steam.isWorking((isWorking) => {
  if (!isWorking) {
    console.log("Steam OFF");
    return;
  }

  window.web2desktop?.steam.achievement.activate(achievementId, (updated) => {
    console.log("Unlocked after activation?", updated);
  });
});
```

---

## Notes

- Achievement IDs must match exactly the ones configured on Steam.
- Calls are **asynchronous** and go through the preload (IPC).
- In production, test with a real Steam account.
