import { useState } from "react";

import {
    addActionToReport,
    createEmptyDailyReport,
} from "../../../features/dailyReport/dailyReportService";
import { saveCurrentDailyReport } from "../../../features/dailyReport/dailyReportStorage";

function AddAction({
    actions,
    report,
    setReport,
    onAddAction,
    compact = false,
}) {
    const [selectedActionId, setSelectedActionId] =
        useState("");

    const [actionTime, setActionTime] =
        useState("");

    const usedTimes = new Set(
        report?.actions.map(
            (action) => action.time
        ) ?? []
    );

    function handleAddAction(event) {
        event.preventDefault();

        if (!selectedActionId || !actionTime) {
            return;
        }

        const action = actions.find(
            (action) =>
                action.id === selectedActionId
        );

        if (!action) {
            return;
        }

        if (onAddAction) {
            onAddAction(action, actionTime);
        } else {
            addAction(action, actionTime);
        }

        setSelectedActionId("");
        setActionTime("");
    }

    function addAction(action, time) {
        const currentReport = report ?? createEmptyDailyReport();
        const updatedReport = addActionToReport(
            currentReport,
            action,
            time
        );

        if (updatedReport === currentReport) {
            return;
        }

        setReport(updatedReport);
        saveCurrentDailyReport(updatedReport);
    }

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className={`btn btn-wrapper btn-circle ${compact
                    ? ""
                    : "btn-lg lg:btn-xl"
                    } bg-rose-500`}
            >
                <i className="fas fa-plus font-bold"></i>
            </div>

            <div
                tabIndex="-1"
                className="dropdown-content menu dropdown-wrapper"
            >
                <form
                    className="space-y-2"
                    onSubmit={handleAddAction}
                >
                    <h3 className="font-semibold text-lg">
                        ADD ACTION
                    </h3>

                    <hr className="border" />

                    <div className="space-y-2">
                        {/* Action */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold">
                                Action
                            </label>

                            <select
                                className="select input-wrapper"
                                value={selectedActionId}
                                onChange={(event) =>
                                    setSelectedActionId(
                                        event.target.value
                                    )
                                }
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Select Action
                                </option>

                                {actions.map(
                                    (action) => (
                                        <option
                                            key={action.id}
                                            value={action.id}
                                        >
                                            {action.name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        {/* Time */}
                        <div className="space-y-1">
                            <label className="text-sm font-bold">
                                Action Time
                            </label>

                            <select
                                className="select input-wrapper"
                                value={actionTime}
                                onChange={(event) =>
                                    setActionTime(
                                        event.target.value
                                    )
                                }
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Select Time
                                </option>

                                {Array.from(
                                    { length: 48 },
                                    (_, index) => {
                                        const hour = Math.floor(index / 2);
                                        const minute = index % 2 === 0 ? "00" : "30";

                                        const time = `${String(hour).padStart(2, "0")}:${minute}`;

                                        if (usedTimes.has(time)) {
                                            return null;
                                        }

                                        return (
                                            <option
                                                key={time}
                                                value={time}
                                            >
                                                {time}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
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

export default AddAction;