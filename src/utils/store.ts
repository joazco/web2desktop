// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import Store from "electron-store";

const store = new Store<Record<string, unknown>>({
  encryptionKey: undefined,
});

export const setData = (key: string, data: unknown) => {
  store.set(key, data);
};

export const getData = <T = unknown>(key: string): T | undefined => {
  return store.get(key) as T | undefined;
};
