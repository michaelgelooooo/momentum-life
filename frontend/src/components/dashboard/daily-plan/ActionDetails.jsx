import AddTask from "../to-do/AddTask";
import RenderTasks from "../to-do/RenderTasks";

import {
    saveCurrentDailyReport,
} from "../../../storage/dailyReports";

function ActionDetails({
    action,
    report,
    setReport,
}) {
    const drawerId = `drawer-${action.id}`;

    const usedTimes = report.actions
        .filter((currentAction) => currentAction.id !== action.id)
        .map((currentAction) => currentAction.time);

    function handleTimeChange(event) {
        const newTime = event.target.value;

        setReport((currentReport) => {
            const timeAlreadyUsed = currentReport.actions.some(
                (currentAction) =>
                    currentAction.id !== action.id &&
                    currentAction.time === newTime
            );

            if (timeAlreadyUsed) {
                return currentReport;
            }

            const updatedReport = {
                ...currentReport,

                actions: currentReport.actions
                    .map((currentAction) => {
                        if (currentAction.id !== action.id) {
                            return currentAction;
                        }

                        return {
                            ...currentAction,
                            time: newTime,
                        };
                    })
                    .sort((a, b) =>
                        a.time.localeCompare(b.time)
                    ),
            };

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    function deleteAction() {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,

                actions: currentReport.actions.filter(
                    (currentAction) => currentAction.id !== action.id
                ),
            };

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    return (
        <div className="drawer drawer-end w-auto">
            <input
                id={drawerId}
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content">
                <label
                    htmlFor={drawerId}
                    className="drawer-button btn btn-wrapper btn-square btn-sm"
                >
                    <i className="fas fa-info"></i>
                </label>
            </div>

            <div className="drawer-side">
                <label
                    htmlFor={drawerId}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <div className="menu bg-rose-100 h-full w-full lg:w-160 p-4 space-y-4 flex flex-col overflow-hidden">
                    <div className="section-wrapper flex items-center justify-between p-2 lg:p-4">
                        <h1 className="font-lobster drawer-heading">
                            Action Details
                        </h1>

                        <label
                            htmlFor={drawerId}
                            className="btn btn-wrapper btn-circle"
                        >
                            <i className="fas fa-xmark"></i>
                        </label>
                    </div>

                    <div className="section-wrapper p-4">
                        <div className="space-y-2 lg:space-y-4">
                            {/* Section label */}
                            <div className="flex items-center justify-between">
                                {/* Action name */}
                                <h2 className="font-lobster text-4xl leading-none">
                                    {action.name}
                                </h2>

                                <button
                                    type="button"
                                    className="btn btn-wrapper"
                                    onClick={deleteAction}
                                >
                                    <i className="fas fa-trash"></i>
                                    DELETE
                                </button>
                            </div>

                            <hr className="border border-black" />

                            {/* Description */}
                            <div className="space-y-1">
                                <span className="text-xs font-bold tracking-widest opacity-75">
                                    DESCRIPTION
                                </span>

                                <p className="text-sm leading-relaxed opacity-80">
                                    {action.description}
                                </p>
                            </div>

                            <hr className="border border-dashed border-black" />

                            {/* Editable time */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold tracking-widest">
                                        SCHEDULED TIME
                                    </span>

                                    <i className="fas fa-clock text-sm opacity-60"></i>
                                </div>

                                <select
                                    className="select input-wrapper w-full font-mono font-bold"
                                    value={action.time}
                                    onChange={handleTimeChange}
                                >
                                    {Array.from({ length: 24 }, (_, hour) => {
                                        const time = `${String(hour).padStart(2, "0")}:00`;

                                        if (usedTimes.includes(time)) {
                                            return null;
                                        }

                                        return (
                                            <option key={time} value={time}>
                                                {time}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="section-wrapper p-4 flex flex-col flex-1 min-h-0 space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="font-lobster text-4xl leading-none">
                                To-Do
                            </h2>

                            <AddTask
                                report={report}
                                setReport={setReport}
                                actionId={action.id}
                            />
                        </div>

                        <div className="card-wrapper flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                            <RenderTasks
                                report={report}
                                setReport={setReport}
                                actionId={action.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionDetails;