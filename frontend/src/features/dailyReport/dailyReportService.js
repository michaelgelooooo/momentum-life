import { generateId } from "../../utils/ids";
import { getToday } from "../../utils/dates";

function syncActionCompletion(action) {
    const hasTasks = (action.tasks ?? []).length > 0;
    const allTasksCompleted = hasTasks &&
        action.tasks.every((task) => task.status === "completed");

    return {
        ...action,
        status:
            action.status === "completed" || allTasksCompleted
                ? "completed"
                : "pending",
    };
}

function syncReportActionCompletion(report) {
    if (!report) {
        return report;
    }

    return {
        ...report,
        actions: report.actions.map((action) =>
            syncActionCompletion(action)
        ),
    };
}

export function createDailyReport(plan, actions) {
    return {
        id: `report-${getToday()}`,
        date: getToday(),
        status: "active",

        actions: (plan?.actions ?? [])
            .map((planAction) => {
                const action = actions.find(
                    (action) => action.id === planAction.actionId
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

export function addActionToReport(report, action, time) {
    const baseReport = report ?? createEmptyDailyReport();

    if (!/^\d{2}:(00|30)$/.test(time)) {
        return baseReport;
    }

    const timeAlreadyUsed = baseReport.actions.some(
        (existingAction) => existingAction.time === time
    );

    if (timeAlreadyUsed) {
        return baseReport;
    }

    const newAction = {
        id: generateId("day-action"),
        actionId: action.id,
        name: action.name,
        description: action.description,
        category: action.category,
        time,
        status: "pending",
        tasks: [],
    };

    return {
        ...baseReport,
        actions: [...baseReport.actions, newAction].sort((a, b) =>
            a.time.localeCompare(b.time)
        ),
    };
}

export function toggleAction(report, actionId) {
    if (!report) {
        return report;
    }

    return {
        ...report,
        actions: report.actions.map((action) => {
            if (action.id !== actionId) {
                return action;
            }

            return {
                ...action,
                status:
                    action.status === "completed"
                        ? "pending"
                        : "completed",
            };
        }),
    };
}

export function updateActionTime(report, actionId, newTime) {
    if (!report) {
        return report;
    }

    const timeAlreadyUsed = report.actions.some(
        (currentAction) =>
            currentAction.id !== actionId &&
            currentAction.time === newTime
    );

    if (timeAlreadyUsed) {
        return report;
    }

    return {
        ...report,
        actions: report.actions
            .map((currentAction) => {
                if (currentAction.id !== actionId) {
                    return currentAction;
                }

                return {
                    ...currentAction,
                    time: newTime,
                };
            })
            .sort((a, b) => a.time.localeCompare(b.time)),
    };
}

export function deleteAction(report, actionId) {
    if (!report) {
        return report;
    }

    return {
        ...report,
        actions: report.actions.filter(
            (currentAction) => currentAction.id !== actionId
        ),
    };
}

export function addTaskToAction(report, actionId, taskName) {
    if (!report) {
        return report;
    }

    const updatedReport = {
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

    return syncReportActionCompletion(updatedReport);
}

export function toggleTask(report, actionId, taskId) {
    if (!report) {
        return report;
    }

    const updatedReport = {
        ...report,
        actions: report.actions.map((action) => {
            if (action.id !== actionId) {
                return action;
            }

            return {
                ...action,
                tasks: action.tasks.map((task) => {
                    if (task.id !== taskId) {
                        return task;
                    }

                    return {
                        ...task,
                        status:
                            task.status === "completed"
                                ? "pending"
                                : "completed",
                    };
                }),
            };
        }),
    };

    return syncReportActionCompletion(updatedReport);
}

export function deleteTask(report, actionId, taskId) {
    if (!report) {
        return report;
    }

    const updatedReport = {
        ...report,
        actions: report.actions.map((action) => {
            if (action.id !== actionId) {
                return action;
            }

            return {
                ...action,
                tasks: action.tasks.filter(
                    (task) => task.id !== taskId
                ),
            };
        }),
    };

    return syncReportActionCompletion(updatedReport);
}

export function finalizeDailyReport(report) {
    if (!report) {
        return null;
    }

    return {
        ...report,
        status: "finalized",
        finalizedAt: new Date().toISOString(),
    };
}
