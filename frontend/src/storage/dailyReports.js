import { generateId } from "../utils/ids";
import { getToday } from "../utils/dates";
import { STORAGE_KEYS } from "./storageKeys";

export function createDailyReport(plan, actions) {
    return {
        id: `report-${getToday()}`,
        date: getToday(),
        status: "active",

        actions: plan.actions
            .map((actionId, index) => {
                const action = actions.find(
                    (action) => action.id === actionId
                );

                if (!action) {
                    return null;
                }

                return {
                    id: generateId("day-action"),
                    actionId: action.id,
                    name: action.name,
                    time: null,
                    order: index + 1,
                    status: "pending",
                    tasks: [],
                };
            })
            .filter(Boolean),
    };
}

export function getCurrentDailyReport(plan, actions) {
    const stored = localStorage.getItem(
        STORAGE_KEYS.CURRENT_REPORT
    );

    if (stored) {
        return JSON.parse(stored);
    }

    const report = createDailyReport(plan, actions);

    saveCurrentDailyReport(report);

    return report;
}

export function saveCurrentDailyReport(report) {
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_REPORT,
        JSON.stringify(report)
    );
}

export function finalizeDailyReport() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.CURRENT_REPORT
    );

    if (!stored) {
        return null;
    }

    const report = JSON.parse(stored);

    const finalizedReport = {
        ...report,
        status: "finalized",
        finalizedAt: new Date().toISOString(),
    };

    const storedReports = localStorage.getItem(
        STORAGE_KEYS.DAILY_REPORTS
    );

    const reports = storedReports
        ? JSON.parse(storedReports)
        : [];

    reports.push(finalizedReport);

    localStorage.setItem(
        STORAGE_KEYS.DAILY_REPORTS,
        JSON.stringify(reports)
    );

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_REPORT
    );

    return finalizedReport;
}