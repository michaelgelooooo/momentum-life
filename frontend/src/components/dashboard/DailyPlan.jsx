import { useState } from "react";

import { generateId } from "../../utils/ids";
import { saveCurrentDailyReport } from "../../storage/dailyReports";

function DailyPlan({
    report,
    setReport,
    actions,
}) {
    const [selectedActionId, setSelectedActionId] =
        useState("");

    const [actionTime, setActionTime] =
        useState("");

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

    function toggleAction(actionId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,

                actions: currentReport.actions.map(
                    (action) => {
                        if (action.id !== actionId) {
                            return action;
                        }

                        return {
                            ...action,

                            status:
                                action.status === "completed"
                                    ? "pending"
                                    : "completed",
                        };
                    }
                ),
            };

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    function deleteAction(actionId) {
        setReport((currentReport) => {
            const updatedReport = {
                ...currentReport,

                actions: currentReport.actions.filter(
                    (action) =>
                        action.id !== actionId
                ),
            };

            saveCurrentDailyReport(updatedReport);

            return updatedReport;
        });
    }

    const startHour = Math.min(
        ...report.actions.map((action) =>
            parseInt(action.time.split(":")[0], 10)
        )
    );

    const endHour = Math.max(
        ...report.actions.map((action) =>
            parseInt(action.time.split(":")[0], 10)
        )
    );

    return (
        <section>
            <h1 className="text-3xl font-bold">
                Today
            </h1>

            <p className="mt-1 opacity-60">
                {report.date}
            </p>

            {/* Add Action */}
            <form
                className="mt-6 mb-6 flex gap-2"
                onSubmit={(event) => {
                    event.preventDefault();

                    if (
                        !selectedActionId ||
                        !actionTime
                    ) {
                        return;
                    }

                    const action = actions.find(
                        (action) =>
                            action.id ===
                            selectedActionId
                    );

                    if (!action) {
                        return;
                    }

                    addAction(
                        action,
                        actionTime
                    );

                    setSelectedActionId("");
                    setActionTime("");
                }}
            >
                <select
                    className="select select-bordered"
                    value={selectedActionId}
                    onChange={(event) => {
                        setSelectedActionId(
                            event.target.value
                        );
                    }}
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
                    className="select select-bordered"
                    value={actionTime}
                    onChange={(event) => {
                        setActionTime(event.target.value);
                    }}
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

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Action
                </button>
            </form>

            {/* Timeline */}
            <div className="mt-8">
                {report.actions.map((action, index) => {
                    const currentHour = parseInt(
                        action.time.split(":")[0],
                        10
                    );

                    const nextAction = report.actions[index + 1];

                    const nextHour = nextAction
                        ? parseInt(
                            nextAction.time.split(":")[0],
                            10
                        )
                        : currentHour + 1;

                    const duration = nextHour - currentHour;

                    return (
                        <div
                            key={action.id}
                            className="grid grid-cols-[60px_1fr]"
                        >
                            {/* Hours */}
                            <div
                                className="relative border-r text-right text-sm opacity-60"
                                style={{
                                    height: `${duration * 80}px`,
                                }}
                            >
                                {Array.from(
                                    { length: duration },
                                    (_, hourIndex) => (
                                        <div
                                            key={hourIndex}
                                            className="absolute right-3"
                                            style={{
                                                top: `${hourIndex * 80}px`,
                                            }}
                                        >
                                            {`${String(
                                                currentHour +
                                                hourIndex
                                            ).padStart(2, "0")}:00`}
                                        </div>
                                    )
                                )}

                                {/* Final hour marker */}
                                {nextAction && (
                                    <div
                                        className="absolute right-3"
                                        style={{
                                            top: `${duration * 80}px`,
                                        }}
                                    >
                                        {`${String(nextHour).padStart(
                                            2,
                                            "0"
                                        )}:00`}
                                    </div>
                                )}
                            </div>

                            {/* Action */}
                            <div
                                className="px-4 pb-2"
                                style={{
                                    minHeight: `${duration * 80}px`,
                                }}
                            >
                                <div className="h-full rounded-box bg-base-200 p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <h2 className="font-semibold">
                                            {action.name}
                                        </h2>

                                        <div className="flex gap-1">
                                            <button
                                                className={`btn btn-xs ${action.status ===
                                                        "completed"
                                                        ? "btn-success"
                                                        : "btn-outline"
                                                    }`}
                                                onClick={() =>
                                                    toggleAction(
                                                        action.id
                                                    )
                                                }
                                            >
                                                {action.status ===
                                                    "completed"
                                                    ? "✓"
                                                    : "○"}
                                            </button>

                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() =>
                                                    deleteAction(
                                                        action.id
                                                    )
                                                }
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default DailyPlan;
