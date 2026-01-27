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
    electron?: {
      node: () => string;
      electron: () => string;
      ping: () => "pong";
      onAppConfig: (func: (args: any) => void) => void;
      setAppConfig: (config: Partial<AppConfigInterface>) => void;
      resetAppConfig: () => void;
      quitApp: () => void;
      steam: {
        isWorking: (func: (isWorking: boolean) => void) => void;
        getName: (func: (name: string) => void) => void;
        achievement: {
          isActivated: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
          activate: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
          clear: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
        };
      };
    };
  }
}
