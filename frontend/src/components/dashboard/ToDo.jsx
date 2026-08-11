import {
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../storage/dailyReports";

function ToDo({ report, setReport }) {
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
        <section>
            <h2 className="mb-6 text-2xl font-bold">
                To-Do
            </h2>

            {/* Add Task */}
            <form
                className="mb-6 flex gap-2"
                onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(
                        event.currentTarget
                    );

                    const actionId =
                        formData.get("action");

                    const taskName =
                        formData.get("task")?.trim();

                    if (!actionId || !taskName) {
                        return;
                    }

                    handleAddTask(
                        actionId,
                        taskName
                    );

                    event.currentTarget.reset();
                }}
            >
                <select
                    name="action"
                    className="select select-bordered"
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select Action
                    </option>

                    {report.actions.map((action) => (
                        <option
                            key={action.id}
                            value={action.id}
                        >
                            {action.name}
                        </option>
                    ))}
                </select>

                <input
                    name="task"
                    type="text"
                    className="input input-bordered flex-1"
                    placeholder="Task name..."
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Task
                </button>
            </form>

            {/* Task List */}
            <div className="space-y-2">
                {report.actions.flatMap((action) =>
                    action.tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center gap-3"
                        >
                            <button
                                className={`btn btn-xs ${
                                    task.status === "completed"
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
                                className={`flex-1 ${
                                    task.status === "completed"
                                        ? "line-through opacity-50"
                                        : ""
                                }`}
                            >
                                {task.name}
                            </span>

                            <span className="badge badge-ghost">
                                {action.name}
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
                    ))
                )}
            </div>
        </section>
    );
}

export default ToDo;