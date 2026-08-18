import { useEffect, useRef, useState } from "react";
import ActionDetails from "./ActionDetails";
import { saveCurrentDailyReport } from "../../../storage/dailyReports";

function RenderActions({ report, setReport }) {
    const [currentMinutes, setCurrentMinutes] = useState(() => {
        const now = new Date();

        return now.getHours() * 60 + now.getMinutes();
    });

    const currentActionRef = useRef(null);
    const actionsContainerRef = useRef(null);

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

    function timeToMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);

        return hours * 60 + minutes;
    }

    const categoryIcons = {
        productive: "fa-arrow-trend-up",
        routine: "fa-arrows-rotate",
        leisure: "fa-mug-hot",
    };

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

    useEffect(() => {
        function updateCurrentTime() {
            const now = new Date();

            setCurrentMinutes(
                now.getHours() * 60 + now.getMinutes()
            );
        }

        updateCurrentTime();

        let interval;

        const now = new Date();
        const millisecondsUntilNextMinute =
            (60 - now.getSeconds()) * 1000 -
            now.getMilliseconds();

        const timeout = setTimeout(() => {
            updateCurrentTime();

            interval = setInterval(
                updateCurrentTime,
                60 * 1000
            );
        }, millisecondsUntilNextMinute);

        return () => {
            clearTimeout(timeout);

            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    return (
        <div
            ref={actionsContainerRef}
            className="card-wrapper overflow-y-auto scrollbar-none space-y-2 lg:space-y-4"
        >
            {report.actions.length > 0 ? (
                report.actions.map((action, index) => {
                    const actionStart = timeToMinutes(action.time);

                    const nextAction = report.actions[index + 1];

                    const actionEnd = nextAction
                        ? timeToMinutes(nextAction.time)
                        : Infinity;

                    const isCurrent =
                        currentMinutes >= actionStart &&
                        currentMinutes < actionEnd;

                    const isPast =
                        currentMinutes >= actionEnd;

                    const isAvailable =
                        isCurrent || isPast;

                    return (
                        <div
                            key={action.id}
                            ref={
                                isCurrent
                                    ? currentActionRef
                                    : null
                            }
                            className="w-full"
                        >
                            <div
                                className={`${action.status === "completed"
                                    ? "opacity-50"
                                    : ""
                                    } flex items-center gap-1`}
                            >
                                <hr className="border border-dashed w-16" />

                                <div>
                                    <span
                                        className={`${isCurrent
                                            ? "badge-wrapper-active"
                                            : "badge-wrapper"
                                            } font-bold`}
                                    >
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
                                    } p-2 lg:p-4 w-full space-y-1`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-wrapper checkbox-lg lg:checkbox-xl"
                                            checked={
                                                action.status === "completed"
                                            }
                                            disabled={!isAvailable}
                                            onChange={() =>
                                                toggleAction(action.id)
                                            }
                                        />

                                        <div className="flex items-center gap-2">
                                            <div
                                                className="tooltip capitalize"
                                                data-tip={action.category}
                                            >
                                                <h2
                                                    className={`font-bold ${action.status === "completed"
                                                        ? "line-through opacity-50"
                                                        : ""
                                                        }`}
                                                >
                                                    <i
                                                        className={`fas ${categoryIcons[action.category] ?? "fa-circle-question"
                                                            } text-xs opacity-75 me-2`}
                                                    ></i>
                                                    {action.name}
                                                </h2>
                                            </div>

                                            {action.tasks.length > 0 && (
                                                <>
                                                    <i className="fas fa-caret-right text-xs"></i>

                                                    <span className="text-xs opacity-75">
                                                        {
                                                            action.tasks.filter(
                                                                (task) =>
                                                                    task.status ===
                                                                    "completed"
                                                            ).length
                                                        }
                                                        /
                                                        {action.tasks.length} tasks
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <ActionDetails
                                        action={action}
                                        report={report}
                                        setReport={setReport}
                                    />
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
                        </div>
                    );
                })
            ) : (
                <div className="h-full flex items-center justify-center text-center opacity-75">
                    <div>
                        <i className="fas fa-diagram-next text-2xl mb-2"></i>

                        <p className="font-semibold">
                            No actions yet
                        </p>

                        <p className="text-xs">
                            Add an action to build your daily plan.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RenderActions;