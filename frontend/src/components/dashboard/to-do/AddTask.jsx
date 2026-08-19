import {
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../../storage/dailyReports";

function AddTask({
    report,
    setReport,
    actionId = null,
}) {
    function handleSubmitTask(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const selectedActionId =
            actionId || formData.get("action");

        const taskName = formData.get("task")?.trim();

        if (!selectedActionId || !taskName) {
            return;
        }

        handleAddTask(selectedActionId, taskName);

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

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className={`btn btn-wrapper btn-circle ${actionId ? "" : "btn-lg lg:btn-xl"} bg-rose-500`}
            >
                <i className="fas fa-plus font-bold"></i>
            </div>

            <div
                tabIndex="-1"
                className="dropdown-content menu dropdown-wrapper"
            >
                <form
                    className="space-y-2"
                    onSubmit={handleSubmitTask}
                >
                    <h3 className="font-semibold text-lg">
                        ADD TASK
                    </h3>

                    <hr className="border" />

                    <div className="space-y-2">
                        {/* Action */}
                        {!actionId && (
                            <div className="space-y-1">
                                <label className="text-sm font-bold">
                                    Action
                                </label>

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
                            </div>
                        )}

                        {/* Task */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold">
                                Task Name
                            </label>

                            <input
                                name="task"
                                type="text"
                                className="input input-wrapper"
                                placeholder="Enter Task Name"
                            />
                        </div>
                    </div>

                    <hr className="border" />

                    <button
                        type="submit"
                        className="btn btn-wrapper bg-rose-500 rounded-lg w-full"
                    >
                        <i className="fas fa-floppy-disk"></i>
                        SAVE
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTask;