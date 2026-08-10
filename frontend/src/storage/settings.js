import { STORAGE_KEYS } from "./storageKeys";

const defaultSettings = {
    defaultDailyPlanId: "plan-001",
};

export function getSettings() {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.SETTINGS,
            JSON.stringify(defaultSettings)
        );

        return defaultSettings;
    }

    return JSON.parse(stored);
}

export function saveSettings(settings) {
    localStorage.setItem(
        STORAGE_KEYS.SETTINGS,
        JSON.stringify(settings)
    );
}