import config from "../config";
import configLocal from "../config.local.json";

export function deepMerge<T>(target: T, source: any): T {
  if (!source) return target;

  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = (target as any)[key];

    if (Array.isArray(sv)) {
      (target as any)[key] = sv;
    } else if (sv && typeof sv === "object" && tv && typeof tv === "object") {
      (target as any)[key] = deepMerge({ ...tv }, sv);
    } else {
      (target as any)[key] = sv;
    }
  }
  return target;
}

export function loadConfig() {
  return deepMerge(config, configLocal);
}
