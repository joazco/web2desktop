# TypeScript

To use the preload API functions in a TypeScript project, copy the file [`demo/web2desktop.d.ts`](../demo/web2desktop.d.ts).

`web2desktop.d.ts`:

```typescript
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
      ping: () => "pong";
      // Subscribe to AppConfig updates pushed from the main process.
      onAppConfig: (func: (args: any) => void) => void;
      // Update app config from the renderer.
      setAppConfig: (config: Partial<AppConfigInterface>) => void;
      // Restore defaults config from config.ts.
      resetAppConfig: () => void;
      // Request app quit.
      quitApp: () => void;
      /** Steam */
      steam: {
        // One-shot Steam availability check.
        isWorking: (func: (isWorking: boolean) => void) => void;
        // Read the local player's Steam name.
        getName: (func: (name: string) => void) => void;
        achievement: {
          // Query achievement status.
          isActivated: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
          // Activate an achievement and return the updated status.
          activate: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
          // Clear (reset) an achievement and return the updated status.
          clear: (
            achievement: string,
            func: (isActivated: boolean) => void,
          ) => void;
        };
      };
    };
  }
}
```

You can then use the API functions with proper typing:
`window.web2desktop?.ping()`
