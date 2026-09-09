import { useEffect, useRef, useState } from "react";

import ActionDetails from "./ActionDetails";

import { getCategories } from "../../../features/categories/categoryStorage";
import { toggleAction } from "../../../features/dailyReport/dailyReportService";
import { saveCurrentDailyReport } from "../../../features/dailyReport/dailyReportStorage";

function RenderActions({ report, setReport }) {
    const [selectedActionId, setSelectedActionId] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const [currentMinutes, setCurrentMinutes] = useState(() => {
        const now = new Date();

        return now.getHours() * 60 + now.getMinutes();
    });

    const currentActionRef = useRef(null);
    const actionsContainerRef = useRef(null);

    const categories = getCategories();
    const selectedAction = report.actions.find(
        (action) => action.id === selectedActionId
    );

    function handleToggleAction(actionId) {
        const updatedReport = toggleAction(report, actionId);

        setReport(updatedReport);
        saveCurrentDailyReport(updatedReport);
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
            className="card-wrapper flex-1 overflow-y-auto scrollbar-none space-y-2 lg:space-y-4"
        >
            {report.actions.map((action, index) => {
                const category = categories.find(
                    (item) => item.value === action.category
                );

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
                                    className={`badge-wrapper font-bold ${isCurrent
                                        ? "bg-rose-500 border-black"
                                        : "border-black/0"
                                        }`}
                                >
                                    {action.time}
                                </span>
                            </div>

                            <hr className="border border-dashed w-full" />
                        </div>

                        <div
                            className={`inner-card-wrapper ${action.status === "completed"
                                ? "bg-rose-200 border-black/25!"
                                : isCurrent
                                    ? "bg-rose-400"
                                    : "bg-rose-100"
                                } p-2 lg:p-4 w-full space-y-1`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-wrapper checkbox-lg lg:checkbox-xl checked:opacity-75"
                                        checked={
                                            action.status === "completed"
                                        }
                                        disabled={!isAvailable}
                                        onChange={() =>
                                            handleToggleAction(action.id)
                                        }
                                    />

                                    <div className="flex items-center gap-2">
                                        <div
                                            className="tooltip capitalize"
                                            data-tip={category?.name ?? action.category}
                                        >
                                            <h2
                                                className={`font-bold ${action.status === "completed"
                                                    ? "line-through opacity-50"
                                                    : ""
                                                    }`}
                                            >
                                                <i
                                                    className={`fas ${category?.icon ?? "fa-circle-question"
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

                                <button
                                    type="button"
                                    className={`drawer-button btn btn-wrapper btn-square btn-sm bg-rose-500 ${action.status === "completed" ? "opacity-75" : ""}`}
                                    onClick={() => {
                                        setSelectedActionId(action.id);
                                        setIsDetailsOpen(true);
                                    }}
                                >
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
                    </div>
                );
            })}

            {selectedAction && (
                <ActionDetails
                    action={selectedAction}
                    report={report}
                    setReport={setReport}
                    isOpen={isDetailsOpen}
                    onClose={() => setIsDetailsOpen(false)}
                />
            )}
        </div>
    );
}

export default RenderActions;