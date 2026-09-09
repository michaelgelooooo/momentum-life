import { seedDailyPlans } from "../../data/seedDailyPlans";
import { STORAGE_KEYS } from "../../storage/storageKeys";

export function getTemplates() {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_PLANS);

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.DAILY_PLANS,
            JSON.stringify(seedDailyPlans)
        );

        return seedDailyPlans;
    }

    return JSON.parse(stored);
}

export function saveTemplates(plans) {
    localStorage.setItem(
        STORAGE_KEYS.DAILY_PLANS,
        JSON.stringify(plans)
    );
}
