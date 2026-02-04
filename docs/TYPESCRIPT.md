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
      ping: () => Promise<"pong">;
      logPlugins: () => Promise<
        {
          plugin: string;
          channels: string[];
        }[]
      >;
      // Subscribe to AppConfig updates pushed from the main process. Returns a function to unsubscribe from the event.
      onAppConfig: (
        callback: (args: any) => void,
      ) => () => { removeListener: () => any };
      // Update app config from the renderer.
      setAppConfig: (config: Partial<AppConfigInterface>) => Promise<void>;
      // Restore defaults config from config.ts.
      resetAppConfig: () => Promise<void>;
      // Request app quit.
      quitApp: () => Promise<void>;
      // Invoke on custom plugins
      invoke: (channel: string, args?: Record<string, any>) => Promise<any>;
      // Subscribe to an event emitted by the main process. Returns a function to unsubscribe from the event.
      on: (
        channel: string,
        callback: (payload: any) => void,
      ) => { removeListener: () => any };
    };
  }
}
```

You can then use the API functions with proper typing:

```ts
document.addEventListener("DOMContentLoaded", async () => {
  console.log('Node version: ', window.web2desktop?.node());
  console.log('Chrome version: ', window.web2desktop?.chrome());
  console.log('Electron version: ', window.web2desktop?.electron());
  console.log('Ping - ', await window.web2desktop?.ping());
  console.log('Plugins: ',await window.web2desktop?.logPlugins());
  .....
})
```
