import { useState } from "react";
import { generateId } from "../../../utils/ids";
import { saveCurrentDailyReport } from "../../../storage/dailyReports";

function AddAction({ actions, setReport }) {
    const [selectedActionId, setSelectedActionId] =
        useState("");
    const [actionTime, setActionTime] =
        useState("");

    function handleAddAction(event) {
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
    }

    function addAction(action, time) {
        if (!/^\d{2}:00$/.test(time)) {
            return;
        }

        setReport((currentReport) => {
            const timeAlreadyUsed = currentReport.actions.some(
                (existingAction) => existingAction.time === time
            );

            if (timeAlreadyUsed) {
                return currentReport;
            }

            const newAction = {
                id: generateId("day-action"),
                actionId: action.id,
                name: action.name,
                description: action.description,
                time,
                status: "pending",
                tasks: [],
            };

            const updatedReport = {
                ...currentReport,
                actions: [
                    ...currentReport.actions,
                    newAction,
                ].sort((a, b) =>
                    a.time.localeCompare(b.time)
                ),
            };

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
                    onSubmit={handleAddAction}
                >
                    <h3 className="font-semibold text-lg">ADD ACTION</h3>
                    <hr className="border" />
                    <div className="space-y-2">
                        <select
                            className="select input-wrapper"
                            value={selectedActionId}
                            onChange={(event) =>
                                setSelectedActionId(event.target.value)
                            }
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

                        <select
                            className="select input-wrapper"
                            value={actionTime}
                            onChange={(event) =>
                                setActionTime(event.target.value)
                            }
                        >
                            <option value="" disabled>
                                Select Time
                            </option>

                            {Array.from({ length: 24 }, (_, hour) => {
                                const time = `${String(hour).padStart(2, "0")}:00`;

                                return (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                );
                            })}
                        </select>
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

export default AddAction;