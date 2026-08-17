import { saveCurrentDailyReport } from "../../../storage/dailyReports";

function RenderTasks({ report, setReport, actionId }) {
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

    const visibleActions = actionId
        ? report.actions.filter(
            (action) => action.id === actionId
        )
        : report.actions;

    const hasTasks = visibleActions.some(
        (action) => action.tasks.length > 0
    );

    return (
        <div className="h-full">
            {hasTasks ? (
                <div className="space-y-2 pb-2 lg:pb-4">{
                    visibleActions.flatMap((action) =>
                        action.tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`inner-card-wrapper ${task.status === "completed"
                                    ? "inner-card-wrapper-completed"
                                    : ""
                                    } p-2 w-full space-y-1`}
                            >
                                {!actionId && (
                                    <span className="badge-wrapper-action gap-1">
                                        <span className="font-bold">
                                            {action.time}
                                        </span>

                                        <span className="opacity-60">•</span>

                                        <span>
                                            {action.name}
                                        </span>
                                    </span>
                                )}

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-wrapper checkbox-sm"
                                            checked={task.status === "completed"}
                                            onChange={() =>
                                                toggleTask(action.id, task.id)
                                            }
                                        />

                                        <span
                                            className={`font-semibold text-xs lg:text-sm ${task.status === "completed"
                                                ? "line-through opacity-50"
                                                : ""
                                                }`}
                                        >
                                            {task.name}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-wrapper btn-square btn-xs"
                                        onClick={() =>
                                            deleteTask(action.id, task.id)
                                        }
                                    >
                                        <i className="fas fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )
                }</div>
            ) : (
                <div className="h-full flex items-center justify-center text-center opacity-60">
                    <div>
                        <i className="fas fa-list-check text-2xl mb-2"></i>

                        <p className="font-semibold">
                            {actionId
                                ? "No tasks for this action"
                                : "No tasks yet"}
                        </p>

                        <p className="text-xs">
                            {actionId
                                ? "Add a task to get started."
                                : "Your tasks will appear here."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RenderTasks;