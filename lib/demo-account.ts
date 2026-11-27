"use client";

import { useSyncExternalStore } from "react";

const storageKey = "beyond-futsal:demo-account";
const changeEvent = "beyond-futsal:demo-account-change";

function subscribe(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  return () => window.removeEventListener(changeEvent, onChange);
}

function getSnapshot() {
  try {
    return window.sessionStorage.getItem(storageKey) === "active";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return null;
}

export function useDemoAccount() {
  return useSyncExternalStore<boolean | null>(subscribe, getSnapshot, getServerSnapshot);
}

export function setDemoAccount(active: boolean) {
  try {
    if (active) {
      window.sessionStorage.setItem(storageKey, "active");
    } else {
      window.sessionStorage.removeItem(storageKey);
    }
  } catch {
    return false;
  }

  window.dispatchEvent(new Event(changeEvent));
  return true;
}