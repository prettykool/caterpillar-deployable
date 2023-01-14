import { caterpillarSettings } from "../settings.ts";

export function ensureURL(url: string, local: string) {
  url = new URL(url);
  localURL = new URL(local);
  if (url.hostname === localURL.hostname) {
    url.hostname = new URL(caterpillarSettings.apiURL).hostname;
  }
  return url.href;
}
