
import {
    addTaskToAction,
    saveCurrentDailyReport,
} from "../../../storage/dailyReports";

function AddTask({ report, setReport }) {
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

    return (
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
    );
}

export default AddTask;