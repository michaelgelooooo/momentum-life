import { useEffect, useState } from "react";
import { getActions } from "../../storage/actions";
import { getDailyPlans } from "../../storage/dailyPlans";
import {
    getCurrentDailyReport,
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../storage/dailyReports";
import { getSettings } from "../../storage/settings";
import { generateId } from "../../utils/ids";

function Today() {
    const [report, setReport] = useState(null);
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const storedActions = getActions();
        const plans = getDailyPlans();
        const settings = getSettings();

        const defaultPlan = plans.find(
            (plan) => plan.id === settings.defaultDailyPlanId
        );

        const currentReport = getCurrentDailyReport(
            defaultPlan,
            storedActions
        );

        setActions(storedActions);
        setReport(currentReport);
    }, []);

    if (!report) {
        return <div>Loading...</div>;
    }

    function addAction(action) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: [
                    ...currentReport.actions,
                    {
                        id: generateId("day-action"),
                        actionId: action.id,
                        name: action.name,
                        time: null,
                        order: currentReport.actions.length + 1,
                        status: "pending",
                        tasks: [],
                    },
                ],
            };

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
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

    function deleteAction(actionId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: currentReport.actions.filter(
                    (action) => action.id !== actionId
                ),
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

            <div className="mb-6">
                <select
                    className="select select-bordered"
                    defaultValue=""
                    onChange={(event) => {
                        const action = actions.find(
                            (action) => action.id === event.target.value
                        );

                        if (!action) {
                            return;
                        }

                        addAction(action);
                        event.target.value = "";
                    }}
                >
                    <option value="" disabled>
                        Add Action
                    </option>

                    {actions.map((action) => (
                        <option
                            key={action.id}
                            value={action.id}
                        >
                            {action.name}
                        </option>
                    ))}
                </select>
            </div>

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

                        <div className="space-x-4">
                            <button
                                className="btn btn-sm"
                                onClick={() => toggleAction(action.id)}
                            >
                                {action.status === "completed"
                                    ? "Completed"
                                    : "Complete"}
                            </button>

                            <span>
                                {action.status}
                            </span>

                            <button
                                className="btn btn-sm btn-error"
                                onClick={() => deleteAction(action.id)}
                            >
                                Delete
                            </button>
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