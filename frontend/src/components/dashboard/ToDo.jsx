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
        <section className="section-wrapper p-4 lg:p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-lobster section-heading">
                    To-Do
                </h2>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-wrapper btn-circle btn-lg lg:btn-xl">
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

            <div className="card-wrapper h-106 overflow-y-auto scrollbar-hidden" id="ToDo">
                <div className="space-y-2">
                    {report.actions.flatMap((action) =>
                        action.tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`inner-card-wrapper ${task.status === "completed"
                                    ? "inner-card-wrapper-completed"
                                    : ""
                                    }  p-2 w-full space-y-1`}
                            >

                                <span className="badge-wrapper-action gap-1">
                                    <span className="font-bold">
                                        {action.time}
                                    </span>

                                    <span className="opacity-60">•</span>

                                    <span>
                                        {action.name}
                                    </span>
                                </span>
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-wrapper checkbox-sm"
                                            checked={task.status === "completed"}
                                            onChange={() => toggleTask(action.id, task.id)}
                                        />

                                        <span className={`font-semibold text-xs lg:text-sm ${task.status === "completed"
                                            ? "line-through opacity-50"
                                            : ""
                                            }`}>
                                            {task.name}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-wrapper btn-square btn-xs"
                                        onClick={() => deleteTask(action.id, task.id)}
                                    >
                                        <i className="fas fa-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default ToDo;