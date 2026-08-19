import { useState } from "react";

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

    const [showDeleteConfirm, setShowDeleteConfirm] =
        useState(false);

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

    const categoryIcons = {
        productive: "fa-arrow-trend-up",
        routine: "fa-arrows-rotate",
        leisure: "fa-mug-hot",
    };

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
                    className="drawer-button btn btn-wrapper btn-square btn-sm bg-rose-500"
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
                        <h1 className="section-heading font-modak text-2xl lg:text-4xl">
                            Action Details
                        </h1>

                        <label
                            htmlFor={drawerId}
                            className="btn btn-wrapper btn-circle bg-rose-500"
                        >
                            <i className="fas fa-xmark"></i>
                        </label>
                    </div>

                    <div className="section-wrapper p-4 space-y-2">
                        {/* Section label */}
                        <div className="flex items-center justify-between">
                            {/* Action name */}
                            <h2 className="section-heading font-modak text-4xl leading-none">
                                {action.name}
                            </h2>

                            <button
                                type="button"
                                className="btn btn-wrapper bg-rose-500 rounded-lg"
                                onClick={() => setShowDeleteConfirm(true)}
                            >
                                <i className="fas fa-trash"></i>
                                DELETE
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest opacity-60">
                            <i
                                className={`fas ${categoryIcons[action.category] ?? "fa-circle-question"
                                    } me-1`}
                            ></i>
                            <span className="uppercase">
                                {action.category}
                            </span>
                        </div>

                        <hr className="border" />

                        {/* Description */}
                        <div className="space-y-1">
                            <span className="text-xs font-bold tracking-widest opacity-75">
                                DESCRIPTION
                            </span>

                            <p className="text-sm leading-relaxed opacity-75">
                                {action.description}
                            </p>
                        </div>

                        <hr className="border border-dashed" />

                        {/* Editable time */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold tracking-widest">
                                    SCHEDULED TIME
                                </span>

                                <i className="fas fa-clock text-sm opacity-75"></i>
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

                    <div className="section-wrapper p-4 flex flex-col flex-1 min-h-0 space-y-2 lg:space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="section-heading font-modak text-4xl leading-none">
                                To-Do
                            </h2>

                            <AddTask
                                report={report}
                                setReport={setReport}
                                actionId={action.id}
                            />
                        </div>

                        <div className="card-wrapper flex-1 min-h-0 overflow-y-auto scrollbar-none">
                            <RenderTasks
                                report={report}
                                setReport={setReport}
                                actionId={action.id}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box section-wrapper space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">
                                DELETE ACTION
                            </h3>

                            <button
                                className="btn btn-wrapper btn-sm btn-circle bg-rose-500"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                <i className="fas fa-xmark"></i>
                            </button>
                        </div>

                        <hr className="border" />

                        <div className="space-y-2">
                            <p className="text-sm">
                                Are you sure you want to delete{" "}
                                <strong>{action.name}</strong>?
                            </p>


                            <div className="card-wrapper">
                                {action.tasks.length > 0 ? (
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold">
                                            The following tasks will also be deleted:
                                        </p>

                                        <ul className="list-disc list-inside space-y-1 text-sm opacity-75">
                                            {action.tasks.map((task) => (
                                                <li key={task.id}>
                                                    {task.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-sm opacity-75">
                                        This action has no associated tasks.
                                    </p>
                                )}

                            </div>
                        </div>
                        <hr className="border" />

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-wrapper  bg-rose-50"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                CANCEL
                            </button>

                            <button
                                type="button"
                                className="btn btn-wrapper  bg-rose-500"
                                onClick={deleteAction}
                            >
                                <i className="fas fa-trash"></i>
                                DELETE
                            </button>
                        </div>
                    </div>

                    <div
                        className="modal-backdrop"
                        onClick={() => setShowDeleteConfirm(false)}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default ActionDetails;