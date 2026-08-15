import {
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../storage/dailyReports";

function ToDo({ report, setReport }) {
    function handleSubmitTask(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const actionId = formData.get("action");
        const taskName = formData.get("task")?.trim();

        if (!actionId || !taskName) {
            return;
        }

        handleAddTask(actionId, taskName);

        event.currentTarget.reset();
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
        <section className="section-wrapper p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-lobster section-heading">
                    To-Do
                </h2>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-wrapper btn-circle btn-xl">
                        <i className="fas fa-plus font-bold"></i>
                    </div>
                    <div tabIndex="-1" className="dropdown-content menu dropdown-wrapper">
                        <form
                            className="space-y-2"
                            onSubmit={handleSubmitTask}
                        >
                            <h3 className="font-semibold text-lg">ADD ACTION</h3>
                            <hr className="border" />
                            <div className="space-y-2">
                                <select
                                    name="action"
                                    className="select input-wrapper"
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
                                            {action.time} — {action.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    name="task"
                                    type="text"
                                    className="input input-wrapper"
                                    placeholder="Enter Task Name"
                                />
                            </div>

                            <hr className="border" />

                            <button
                                type="submit"
                                className="btn btn-wrapper rounded-lg w-full"
                            >
                                <i className="fas fa-floppy-disk"></i> SAVE
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <hr className="border rounded" />

            {/* Task List */}
            <div className="space-y-2">
                {report.actions.flatMap((action) =>
                    action.tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center gap-3"
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