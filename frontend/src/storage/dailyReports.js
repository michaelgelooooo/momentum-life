import { generateId } from "../utils/ids";
import { getToday } from "../utils/dates";
import { STORAGE_KEYS } from "./storageKeys";

export function createDailyReport(plan, actions) {
    return {
        id: `report-${getToday()}`,
        date: getToday(),
        status: "active",

        actions: plan.actions
            .map((planAction) => {
                const action = actions.find(
                    (action) =>
                        action.id === planAction.actionId
                );

                if (!action) {
                    return null;
                }

                return {
                    id: generateId("day-action"),
                    actionId: action.id,
                    name: action.name,
                    description: action.description,
                    category: action.category,
                    time: planAction.time,
                    status: "pending",

                    tasks: (planAction.tasks || []).map(
                        (planTask) => ({
                            id: generateId("task"),
                            name: planTask.name,
                            status: "pending",
                        })
                    ),
                };
            })
            .filter(Boolean),
    };
}

export function createEmptyDailyReport() {
    return {
        id: `report-${getToday()}`,
        date: getToday(),
        status: "active",
        actions: [],
    };
}

export function getCurrentDailyReport() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.CURRENT_REPORT
    );

    return stored ? JSON.parse(stored) : null;
}

export function startDailyReport(plan, actions) {
    const report = createDailyReport(plan, actions);

    saveCurrentDailyReport(report);

    return report;
}

export function startEmptyDailyReport() {
    const report = createEmptyDailyReport();

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

export function addTaskToAction(
    report,
    actionId,
    taskName
) {
    return {
        ...report,

        actions: report.actions.map((action) => {
            if (action.id !== actionId) {
                return action;
            }

            return {
                ...action,

                tasks: [
                    ...action.tasks,
                    {
                        id: generateId("task"),
                        name: taskName,
                        status: "pending",
                    },
                ],
            };
        }),
    };
}