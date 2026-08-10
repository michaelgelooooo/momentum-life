import { defaultActions } from "../data/defaultActions";
import { STORAGE_KEYS } from "./storageKeys";

export function getActions() {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIONS);

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.ACTIONS,
            JSON.stringify(defaultActions)
        );

        return defaultActions;
    }

    return JSON.parse(stored);
}

export function saveActions(actions) {
    localStorage.setItem(
        STORAGE_KEYS.ACTIONS,
        JSON.stringify(actions)
    );
}