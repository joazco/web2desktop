type AppConfigInterface = {
  themeSource?: "system" | "light" | "dark";
  fullScreen?: boolean;
  resizable?: boolean;
  closable?: boolean;
  openDevtools?: boolean;
  size?: {
    width: number;
    height: number;
  };
};

export {};

declare global {
  interface Window {
    web2desktop?: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
      ping: () => Promise<"pong">;
      // Subscribe to AppConfig updates pushed from the main process.
      onAppConfig: (func: (args: any) => void) => () => void;
      // Update app config from the renderer.
      setAppConfig: (config: Partial<AppConfigInterface>) => Promise<void>;
      // Restore defaults config from config.ts.
      resetAppConfig: () => Promise<void>;
      // Request app quit.
      quitApp: () => Promise<void>;
      /** Steam */
      steam: {
        // One-shot Steam availability check.
        isWorking: () => Promise<boolean>;
        // Read the local player's Steam name.
        getName: () => Promise<string | undefined>;
        achievement: {
          // Query achievement status.
          isActivated: (achievement: string) => Promise<boolean>;
          // Activate an achievement and return the updated status.
          activate: (achievement: string) => Promise<boolean>;
          // Clear (reset) an achievement and return the updated status.
          clear: (achievement: string) => Promise<boolean>;
        };
      };
    };
  }
}
