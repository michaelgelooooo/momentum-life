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
    const [selectedActionId, setSelectedActionId] = useState("");
    const [actionTime, setActionTime] = useState("");

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

    function addAction(action, time) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,
                actions: [
                    ...currentReport.actions,
                    {
                        id: generateId("day-action"),
                        actionId: action.id,
                        name: action.name,
                        time,
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
                <form
                    className="mb-6 flex gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();

                        if (!selectedActionId || !actionTime) {
                            return;
                        }

                        const action = actions.find(
                            (action) => action.id === selectedActionId
                        );

                        if (!action) {
                            return;
                        }

                        addAction(action, actionTime);

                        setSelectedActionId("");
                        setActionTime("");
                    }}
                >
                    <select
                        className="select select-bordered flex-1"
                        value={selectedActionId}
                        onChange={(event) => {
                            setSelectedActionId(event.target.value);
                        }}
                    >
                        <option value="" disabled>
                            Select Action
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

                    <input
                        type="time"
                        className="input input-bordered"
                        value={actionTime}
                        onChange={(event) => {
                            setActionTime(event.target.value);
                        }}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Action
                    </button>
                </form>
            </div>

            {report.actions.map((action) => (
                <div
                    key={action.id}
                    className="card bg-base-200 mb-4"
                >
                    <div className="card-body">
                        {/* Action Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-60">
                                    {action.time}
                                </p>

                                <h2 className="card-title">
                                    {action.name}
                                </h2>
                            </div>

                            <button
                                className={`btn btn-sm ${action.status === "completed"
                                    ? "btn-success"
                                    : "btn-outline"
                                    }`}
                                onClick={() => toggleAction(action.id)}
                            >
                                {action.status === "completed"
                                    ? "✓ Completed"
                                    : "○ Complete"}
                            </button>
                        </div>

                        {/* Tasks */}
                        <div className="mt-4">
                            {action.tasks.length > 0 && (
                                <div className="space-y-2">
                                    {action.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-2"
                                        >
                                            <button
                                                className={`btn btn-xs ${task.status === "completed"
                                                    ? "btn-success"
                                                    : "btn-outline"
                                                    }`}
                                                onClick={() =>
                                                    toggleTask(
                                                        action.id,
                                                        task.id
                                                    )
                                                }
                                            >
                                                {task.status === "completed"
                                                    ? "✓"
                                                    : "○"}
                                            </button>

                                            <span
                                                className={`flex-1 ${task.status === "completed"
                                                    ? "line-through opacity-50"
                                                    : ""
                                                    }`}
                                            >
                                                {task.name}
                                            </span>

                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() =>
                                                    deleteTask(
                                                        action.id,
                                                        task.id
                                                    )
                                                }
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Task */}
                            <input
                                type="text"
                                className="input input-bordered input-sm mt-3 w-full"
                                placeholder="Add task..."
                                onKeyDown={(event) => {
                                    if (event.key !== "Enter") {
                                        return;
                                    }

                                    const taskName =
                                        event.target.value.trim();

                                    if (!taskName) {
                                        return;
                                    }

                                    handleAddTask(
                                        action.id,
                                        taskName
                                    );

                                    event.target.value = "";
                                }}
                            />
                        </div>

                        {/* Action Controls */}
                        <div className="card-actions justify-end mt-2">
                            <button
                                className="btn btn-sm btn-ghost"
                                onClick={() =>
                                    deleteAction(action.id)
                                }
                            >
                                Delete Action
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
}

export default Today;