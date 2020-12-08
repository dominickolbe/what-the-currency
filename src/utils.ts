import { createErr, createOk } from "option-t/cjs/PlainResult";
import { EXCHANGE_API_TLL } from "./contstants";

export const LocalStorageController = {
  set: (key: string, value: object) => {
    const now = new Date();

    const item = {
      value: value,
      expiry: now.getTime() + EXCHANGE_API_TLL,
    };

    localStorage.setItem(key, JSON.stringify(item));
  },
  get: (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return createErr(null);

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return createErr(null);
    }

    return createOk(item.value);
  },
};
