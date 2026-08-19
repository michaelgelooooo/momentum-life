import { seedDailyPlans } from "../data/seedDailyPlans";
import { STORAGE_KEYS } from "./storageKeys";

export function getDailyPlans() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.DAILY_PLANS
    );

    if (!stored) {
        localStorage.setItem(
            STORAGE_KEYS.DAILY_PLANS,
            JSON.stringify(seedDailyPlans)
        );

        return seedDailyPlans;
    }

    return JSON.parse(stored);
}

export function saveDailyPlans(plans) {
    localStorage.setItem(
        STORAGE_KEYS.DAILY_PLANS,
        JSON.stringify(plans)
    );
}