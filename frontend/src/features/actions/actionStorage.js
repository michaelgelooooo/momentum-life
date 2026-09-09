import { seedActions } from "../../data/seedActions";
import { STORAGE_KEYS } from "../../storage/storageKeys";

export function getActions() {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIONS);

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.ACTIONS,
            JSON.stringify(seedActions)
        );

        return seedActions;
    }

    return JSON.parse(stored);
}

export function saveActions(actions) {
    localStorage.setItem(
        STORAGE_KEYS.ACTIONS,
        JSON.stringify(actions)
    );
}
