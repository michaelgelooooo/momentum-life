import { STORAGE_KEYS } from "./storageKeys";

export function getSettings() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.SETTINGS
    );

    return stored ? JSON.parse(stored) : {};
}

export function saveSettings(settings) {
    localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(settings)
    );
}