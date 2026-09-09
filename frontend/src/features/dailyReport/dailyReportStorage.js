import { STORAGE_KEYS } from "../../storage/storageKeys";
import {
    createDailyReport,
    finalizeDailyReport,
} from "./dailyReportService";

export function getCurrentDailyReport() {
    const stored = localStorage.getItem(
        STORAGE_KEYS.CURRENT_REPORT
    );

    return stored ? JSON.parse(stored) : null;
}

export function saveCurrentDailyReport(report) {
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_REPORT,
        JSON.stringify(report)
    );
}

export function startDailyReport(plan, actions) {
    const report = createDailyReport(plan, actions);

    saveCurrentDailyReport(report);

    return report;
}

export function finalizeCurrentDailyReport() {
    const report = getCurrentDailyReport();

    if (!report) {
        return null;
    }

    const finalizedReport = finalizeDailyReport(report);

    const storedReports = localStorage.getItem(
        STORAGE_KEYS.DAILY_REPORTS
    );

    const reports = storedReports ? JSON.parse(storedReports) : [];

    reports.push(finalizedReport);

    localStorage.setItem(
        STORAGE_KEYS.DAILY_REPORTS,
        JSON.stringify(reports)
    );

    localStorage.removeItem(STORAGE_KEYS.CURRENT_REPORT);

    return finalizedReport;
}
