/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

let steamIsWorking = false;

const setSteamOff = () => {
  steamIsWorking = false;
  document.getElementById("steam-is-working").textContent = "NO";
  document.getElementById("steam-gamer-name").textContent = "-";
};

const handleSteamError = (err) => {
  console.error("Steam error:", err);
  setSteamOff();
};

// Query Steam for achievement status and update the UI.
const checkIfIsActive = async () => {
  const achievementInput = document.getElementById("steam-achievement");
  const achievementStatus = document.getElementById(
    "steam-achievement-is-activated",
  );

  const achievementId = achievementInput.value?.trim();
  if (!achievementId) {
    achievementStatus.textContent = "-";
    return;
  }
  if (!steamIsWorking) {
    achievementStatus.textContent = "Steam OFF";
    return;
  }
  try {
    const isActivated = await window.web2desktop?.invoke(
      "steam.achievement.isActivated",
      { achievementId },
    );
    achievementStatus.textContent = isActivated ? "YES" : "NO";
  } catch (err) {
    achievementStatus.textContent = "Steam OFF";
    handleSteamError(err);
  }
};

// Activate the achievement, then update the status display.
const activateAchievement = async () => {
  const achievementInput = document.getElementById("steam-achievement");
  const achievementStatus = document.getElementById(
    "steam-achievement-is-activated",
  );

  const achievementId = achievementInput.value?.trim();
  if (!achievementId) {
    achievementStatus.textContent = "-";
    return;
  }
  if (!steamIsWorking) {
    achievementStatus.textContent = "Steam OFF";
    return;
  }
  try {
    const isActivated = window.web2desktop?.invoke(
      "steam.achievement.activate",
      { achievementId },
    );
    achievementStatus.textContent = isActivated ? "YES" : "NO";
  } catch (err) {
    achievementStatus.textContent = "Steam OFF";
    handleSteamError(err);
  }
};

// Clear (reset) the achievement, then update the status display.
const clearAchievement = async () => {
  const achievementInput = document.getElementById("steam-achievement");
  const achievementStatus = document.getElementById(
    "steam-achievement-is-activated",
  );

  const achievementId = achievementInput.value?.trim();
  if (!achievementId) {
    achievementStatus.textContent = "-";
    return;
  }
  if (!steamIsWorking) {
    achievementStatus.textContent = "Steam OFF";
    return;
  }
  try {
    const isActivated = await window.web2desktop?.invoke(
      "steam.achievement.clear",
      {
        achievementId,
      },
    );
    achievementStatus.textContent = isActivated ? "YES" : "NO";
  } catch (err) {
    achievementStatus.textContent = "Steam OFF";
    handleSteamError(err);
  }
};

// Initialize the demo steam UI once the DOM is ready.
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch initial Steam state and gamer name.
  try {
    steamIsWorking =
      (await window.web2desktop?.invoke("steam.isWorking")) ?? false;
    if (steamIsWorking) {
      document.getElementById("steam-is-working").textContent = "YES";
      const name = await window.web2desktop?.invoke("steam.getName");
      if (name) {
        document.getElementById("steam-gamer-name").textContent = name;
      } else {
        document.getElementById("steam-gamer-name").textContent = "-";
      }
    } else {
      setSteamOff();
    }
    await checkIfIsActive();
  } catch (err) {
    handleSteamError(err);
  }

  // Check status when the input loses focus.
  document.getElementById("steam-achievement")?.addEventListener("blur", () => {
    checkIfIsActive();
  });

  // Activate achievement on button click.
  document
    .getElementById("steam-achievement-activate")
    ?.addEventListener("click", () => {
      activateAchievement();
    });

  // Clear achievement on button click.
  document
    .getElementById("steam-achievement-clear")
    ?.addEventListener("click", () => {
      clearAchievement();
    });
});
