// Map AppConfigInterface -> form controls (themeSource/fullScreen/resizable/closable/openDevtools).
const setForm = (appConfig) => {
  const { fullScreen, resizable, themeSource, openDevtools, closable } =
    appConfig;
  if (themeSource !== undefined) {
    document.getElementById(`themeSource-toggle-${themeSource}`).checked = true;
  }
  if (openDevtools) {
    document.getElementById("openDevtools-toggle-yes").checked = true;
  } else {
    document.getElementById("openDevtools-toggle-no").checked = true;
  }
  if (fullScreen) {
    document.getElementById("fullScreen-toggle-yes").checked = true;
  } else {
    document.getElementById("fullScreen-toggle-no").checked = true;
  }
  if (resizable) {
    document.getElementById("resizable-toggle-yes").checked = true;
  } else {
    document.getElementById("resizable-toggle-no").checked = true;
  }
  if (closable) {
    document.getElementById("closable-toggle-yes").checked = true;
  } else {
    document.getElementById("closable-toggle-no").checked = true;
  }
};

// Build a Partial<AppConfigInterface> from the changed input and push via setAppConfig.
const formChange = (event) => {
  const target = event.target;
  const config = {};
  if (target.name === "themeSource-toggle") {
    config.themeSource = target.value;
  }
  if (target.name === "openDevtools-toggle") {
    config.openDevtools = target.value === "yes";
  }
  if (target.name === "fullScreen-toggle") {
    config.fullScreen = target.value === "yes";
  }
  if (target.name === "resizable-toggle") {
    config.resizable = target.value === "yes";
  }
  if (target.name === "closable-toggle") {
    config.closable = target.value === "yes";
  }

  window.electron?.setAppConfig(config);
};

// Preset sizes -> setAppConfig({ size: { width, height } }).
const clickSize = () => {
  document
    .getElementById("button-full-screen-window")
    .addEventListener("click", () => {
      window.electron?.setAppConfig({
        size: {
          width: screen.width,
          height: screen.height,
        },
      });
    });
  document.getElementById("button-full-hd").addEventListener("click", () => {
    window.electron?.setAppConfig({
      size: {
        width: 1920,
        height: 1080,
      },
    });
  });
  document.getElementById("button-tablet").addEventListener("click", () => {
    window.electron?.setAppConfig({
      size: {
        width: 820,
        height: 1180,
      },
    });
  });
  document.getElementById("button-mobile").addEventListener("click", () => {
    window.electron?.setAppConfig({
      size: {
        width: 430,
        height: 932,
      },
    });
  });
};

// AppConfigInterface.name -> document title, headings, and input value.
const setAppName = (appName) => {
  document.title = appName;

  const titles = document.querySelectorAll('h1[data-web2desktop="title"]');
  titles.forEach((title) => {
    title.textContent = appName;
  });
};

// Initialize the demo UI once the DOM is ready.
document.addEventListener("DOMContentLoaded", async () => {
  // Optional Electron bridge: ping returns "pong" per web2desktop.d.ts.
  console.log(await window.electron?.ping());
  // Receive AppConfigInterface updates from onAppConfig and reflect in UI.
  window.electron?.onAppConfig((data) => {
    setAppName(data.name);
    setForm(data);
  });

  // Sync form changes back to Partial<AppConfigInterface>.
  const form = document.querySelector("form");
  form?.addEventListener("change", formChange);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  clickSize();

  document
    .getElementById("button-reset-default-config")
    .addEventListener("click", () => {
      // resetAppConfig restores the default AppConfigInterface.
      window.electron?.resetAppConfig();
    });

  document.getElementById("button-quit-app").addEventListener("click", () => {
    // quitApp closes the Electron app.
    window.electron?.quitApp();
  });
});
