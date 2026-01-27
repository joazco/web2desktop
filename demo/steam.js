/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

let steamIsWorking = false;

// Query Steam for achievement status and update the UI.
const checkIfIsActive = () => {
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
  window.electron?.steam.achievement.isActivated(
    achievementId,
    (isActivated) => {
      achievementStatus.textContent = isActivated ? "YES" : "NO";
    },
  );
};

// Activate the achievement, then update the status display.
const activateAchievement = () => {
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
  window.electron?.steam.achievement.activate(
    achievementId,
    (isActivated) => {
      achievementStatus.textContent = isActivated ? "YES" : "NO";
    },
  );
};

// Clear (reset) the achievement, then update the status display.
const clearAchievement = () => {
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
  window.electron?.steam.achievement.clear(achievementId, (isActivated) => {
    achievementStatus.textContent = isActivated ? "YES" : "NO";
  });
};

// Initialize the demo steam UI once the DOM is ready.
document.addEventListener("DOMContentLoaded", async () => {
  // Fetch initial Steam state and gamer name.
  window.electron?.steam.isWorking((isWorking) => {
    steamIsWorking = isWorking;
    if (isWorking) {
      document.getElementById("steam-is-working").textContent = "YES";
      window.electron?.steam.getName((name) => {
        if (name) {
          document.getElementById("steam-gamer-name").textContent = name;
        } else {
          document.getElementById("steam-gamer-name").textContent = "-";
        }
      });
    } else {
      document.getElementById("steam-is-working").textContent = "NO";
      document.getElementById("steam-gamer-name").textContent = "-";
    }
    checkIfIsActive();
  });

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
