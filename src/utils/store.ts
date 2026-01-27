/**
 * web2desktop
 * https://github.com/joazco/web2desktop
 * © 2026 Jordan Azoulay — MIT License
 */

import Store from "electron-store";

const store = new Store();

export const setData = (key: string, data: unknown) => {
  // @ts-ignore
  store.set(key, data);
};

export const getData = <T = unknown>(key: string): T | undefined => {
  // @ts-ignore
  return store.get(key) as T | undefined;
};
