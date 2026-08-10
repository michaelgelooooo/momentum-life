import { useEffect, useState } from "react";

import { getActions } from "../../storage/actions";
import { getDailyPlans } from "../../storage/dailyPlans";
import {
    getCurrentDailyReport,
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../storage/dailyReports";
import { getSettings } from "../../storage/settings";

function Today() {
    const [report, setReport] = useState(null);

    useEffect(() => {
        const actions = getActions();
        const plans = getDailyPlans();
        const settings = getSettings();

        const defaultPlan = plans.find(
            (plan) => plan.id === settings.defaultDailyPlanId
        );

        const currentReport = getCurrentDailyReport(
            defaultPlan,
            actions
        );

        setReport(currentReport);
    }, []);

    if (!report) {
        return <div>Loading...</div>;
    }

    function toggleAction(actionId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: currentReport.actions.map((action) => {
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

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    function toggleTask(actionId, taskId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: currentReport.actions.map((action) => {
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

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    function handleAddTask(actionId, taskName) {
        setReport((currentReport) => {
            const updatedReport = addTaskToAction(
                currentReport,
                actionId,
                taskName
            );

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    function deleteTask(actionId, taskId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: currentReport.actions.map((action) => {
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

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold">
                Today
            </h1>

            <p className="mb-6">
                {report.date}
            </p>

            {report.actions.map((action) => (
                <div
                    key={action.id}
                    className="mb-4 rounded-box border p-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold">
                                {action.name}
                            </h2>

                            {action.time && (
                                <p className="text-sm opacity-60">
                                    {action.time}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                className="btn btn-sm"
                                onClick={() => toggleAction(action.id)}
                            >
                                {action.status === "completed"
                                    ? "Completed"
                                    : "Complete"}
                            </button>

                            <span className="ml-2">
                                {action.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3">
                        {action.tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center gap-2"
                            >
                                <button
                                    className="btn btn-sm"
                                    onClick={() => toggleTask(action.id, task.id)}
                                >
                                    {task.status === "completed" ? "✓" : "○"}
                                </button>

                                <span className="flex-1">
                                    {task.name}
                                </span>

                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => deleteTask(action.id, task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        <input
                            type="text"
                            className="input input-bordered input-sm mt-2"
                            placeholder="Add task..."
                            onKeyDown={(event) => {
                                if (event.key !== "Enter") {
                                    return;
                                }

                                const taskName = event.target.value.trim();

                                if (!taskName) {
                                    return;
                                }

                                handleAddTask(action.id, taskName);

                                event.target.value = "";
                            }}
                        />
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Today;