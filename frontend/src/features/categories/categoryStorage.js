import { seedCategories } from "../../data/seedCategories";
import { STORAGE_KEYS } from "../../storage/storageKeys";

export function getCategories() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.CATEGORIES
    );

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.CATEGORIES,
            JSON.stringify(seedCategories)
        );

        return seedCategories;
    }

    return JSON.parse(stored);
}
