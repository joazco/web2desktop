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
      logPlugins: () => Promise<
        {
          plugin: string;
          channels: string[];
        }[]
      >;
      // Subscribe to AppConfig updates pushed from the main process.
      onAppConfig: (func: (args: any) => void) => () => void;
      // Update app config from the renderer.
      setAppConfig: (config: Partial<AppConfigInterface>) => Promise<void>;
      // Restore defaults config from config.ts.
      resetAppConfig: () => Promise<void>;
      // Request app quit.
      quitApp: () => Promise<void>;
      // Invoke on custom plugins
      invoke: (channel: string, args?: Record<string, any>) => Promise<any>;
    };
  }
}
