import { useEffect, useRef, useState } from "react";

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

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const currentActionRef = useRef(null);
    const actionsContainerRef = useRef(null);

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

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);

        return hours * 60 + minutes;
    }

    useEffect(() => {
        const container = actionsContainerRef.current;
        const currentAction = currentActionRef.current;

        if (!container || !currentAction) {
            return;
        }

        const containerTop = container.getBoundingClientRect().top;
        const actionTop = currentAction.getBoundingClientRect().top;

        const offset = 8;

        container.scrollTo({
            top: container.scrollTop + (actionTop - containerTop) - offset,
            behavior: "smooth",
        });
    }, [currentMinutes]);

    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4 scroll-mt-24" id="DailyPlan">
            <div className="flex items-center justify-between">
                <h1 className="font-lobster section-heading">
                    Daily Plan
                </h1>

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
            </div>

            {/* Actions */}
            <div ref={actionsContainerRef} className="card-wrapper h-160 lg:h-[73vh] overflow-y-auto scrollbar-hidden space-y-2 lg:space-y-4">
                {report.actions.map((action, index) => {
                    const actionStart = timeToMinutes(action.time);

                    const nextAction = report.actions[index + 1];

                    const actionEnd = nextAction
                        ? timeToMinutes(nextAction.time)
                        : Infinity;

                    const isCurrent =
                        currentMinutes >= actionStart &&
                        currentMinutes < actionEnd;

                    const isPast = currentMinutes >= actionEnd;
                    const isAvailable = isCurrent || isPast;

                    return (
                        <div
                            key={action.id}
                            ref={isCurrent ? currentActionRef : null}
                            className="w-full"
                        >
                            <div className={`${action.status === "completed"
                                ? "opacity-50"
                                : ""
                                } flex items-center gap-1`}>
                                <hr className="border border-dashed w-16" />
                                <div className="">
                                    <span className={`${isCurrent ? "badge-wrapper-active" : "badge-wrapper"} font-bold`}>
                                        {action.time}
                                    </span>
                                </div>
                                <hr className="border border-dashed w-full" />
                            </div>

                            <div
                                className={`${isCurrent
                                    ? "inner-card-wrapper-active"
                                    : "inner-card-wrapper"
                                    } ${action.status === "completed"
                                        ? "inner-card-wrapper-completed"
                                        : ""
                                    }  p-2 lg:p-4 w-full space-y-1`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-wrapper checkbox-lg lg:checkbox-xl"
                                            checked={action.status === "completed"}
                                            disabled={!isAvailable}
                                            onChange={() => toggleAction(action.id)}
                                        />

                                        <div className="flex items-center gap-2">
                                            <h2
                                                className={`font-bold ${action.status === "completed"
                                                    ? "line-through opacity-50"
                                                    : ""
                                                    }`}
                                            >
                                                {action.name}
                                            </h2>
                                            {action.tasks.length > 0 && (
                                                <>
                                                    <i className="fas fa-caret-right text-xs"></i>
                                                    <span className="text-xs opacity-75">
                                                        {action.tasks.filter(
                                                            (task) => task.status === "completed"
                                                        ).length}/{action.tasks.length} tasks
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <button className="btn btn-wrapper btn-square btn-sm">
                                        <i className="fas fa-info"></i>
                                    </button>
                                </div>
                                <p
                                    className={`text-xs ${action.status === "completed"
                                        ? "line-through opacity-50"
                                        : ""
                                        }`}
                                >
                                    {action.description}
                                </p>
                            </div>
                        </div>);
                })}
            </div>
        </section>
    );
}

export default DailyPlan;
