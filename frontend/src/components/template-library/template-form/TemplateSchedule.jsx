import { useState } from "react";

import AddAction from "../../dashboard/daily-plan/AddAction";
import { getCategories } from "../../../storage/categories";

function TemplateSchedule({
    plan,
    actions,
    templateActions,
    onAddAction,
    onUpdateTime,
    onDeleteAction,
    onDeleteTask,
    onAddTask,
}) {
    const categories = getCategories();
    const [addingTaskToIndex, setAddingTaskToIndex] = useState(null);
    const [taskName, setTaskName] = useState("");

    function handleSubmitTask(event, actionIndex) {
        event.preventDefault();

        const trimmedTaskName = taskName.trim();

        if (!trimmedTaskName) return;

        onAddTask(actionIndex, trimmedTaskName);
        setTaskName("");
        setAddingTaskToIndex(null);
    }

    function startAddingTask(actionIndex) {
        setTaskName("");
        setAddingTaskToIndex(actionIndex);
    }

    function renderTimeOptions(actionIndex) {
        const usedTimes = new Set(
            templateActions
                .filter((_, index) => index !== actionIndex)
                .map((templateAction) => templateAction.time)
        );

        return Array.from({ length: 48 }, (_, optionIndex) => {
            const hour = Math.floor(optionIndex / 2);
            const minute = optionIndex % 2 === 0 ? "00" : "30";
            const time = `${String(hour).padStart(2, "0")}:${minute}`;

            if (usedTimes.has(time)) {
                return null;
            }

            return (
                <option key={time} value={time}>
                    {time}
                </option>
            );
        });
    }

    return (
        <div className="section-wrapper p-4 flex-1 min-h-0 flex flex-col space-y-2 lg:space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="section-heading font-modak text-2xl lg:text-4xl">
                    Schedule
                </h2>

                <AddAction
                    actions={actions}
                    report={{ actions: templateActions }}
                    onAddAction={onAddAction}
                    compact
                />
            </div>

            <div className="card-wrapper flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-2">
                {templateActions.length > 0 ? (
                    templateActions.map((planAction, index) => {
                        const action = actions.find(
                            (currentAction) =>
                                currentAction.id === planAction.actionId
                        );

                        if (!action) return null;

                        const category = categories.find(
                            (item) => item.value === action.category
                        );

                        return (
                            <div
                                key={`${plan?.id ?? "new"}-${planAction.actionId}-${planAction.time}-${index}`}
                                className="space-y-1"
                            >
                                <div className="flex items-center gap-2">
                                    <hr className="border border-dashed w-16" />

                                    <select
                                        className="input-wrapper bg-rose-500! rounded-full! appearance-none w-auto font-mono font-bold text-xs px-1"
                                        value={planAction.time}
                                        aria-label={`Change time from ${planAction.time}`}
                                        onChange={(event) =>
                                            onUpdateTime(index, event.target.value)
                                        }
                                    >
                                        {renderTimeOptions(index)}
                                    </select>

                                    <hr className="border border-dashed w-full" />
                                </div>

                                <div className="inner-card-wrapper bg-rose-100 p-2 w-full space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="font-bold">
                                            <i
                                                className={`fas ${category?.icon ?? "fa-circle-question"
                                                    } text-xs opacity-75 me-2`}
                                            ></i>
                                            {action.name}
                                        </h2>

                                        <button
                                            type="button"
                                            className="btn btn-wrapper btn-square btn-xs bg-rose-500"
                                            title={`Remove ${action.name}`}
                                            aria-label={`Remove ${action.name}`}
                                            onClick={() => onDeleteAction(index)}
                                        >
                                            <i className="fas fa-xmark"></i>
                                        </button>
                                    </div>

                                    <p className="text-xs">
                                        {action.description}
                                    </p>


                                    <hr className="border-dashed" />

                                    {planAction.tasks?.length > 0 && (
                                        <>
                                            <ul className="list-disc list-inside space-y-1 pl-4 text-xs">
                                                {planAction.tasks.map((task, taskIndex) => (
                                                    <li
                                                        key={`${plan?.id ?? "new"}-${planAction.actionId}-${taskIndex}`}
                                                        className="relative pr-8 leading-4"
                                                    >
                                                        {task.name}

                                                        <button
                                                            type="button"
                                                            className="btn btn-ghost btn-square btn-xs absolute right-0 top-1/2 -translate-y-1/2"
                                                            title={`Remove ${task.name}`}
                                                            aria-label={`Remove ${task.name}`}
                                                            onClick={() =>
                                                                onDeleteTask(index, taskIndex)
                                                            }
                                                        >
                                                            <i className="fas fa-xmark"></i>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {addingTaskToIndex === index ? (
                                        <form
                                            className="pt-1 pl-4"
                                            onSubmit={(event) =>
                                                handleSubmitTask(event, index)
                                            }
                                        >
                                            <input
                                                type="text"
                                                className="input input-wrapper input-xs w-full text-xs"
                                                placeholder="Enter task name"
                                                value={taskName}
                                                onChange={(event) =>
                                                    setTaskName(event.target.value)
                                                }
                                                onBlur={() => {
                                                    setTaskName("");
                                                    setAddingTaskToIndex(null);
                                                }}
                                                autoFocus
                                            />
                                        </form>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-ghost btn-xs w-full justify-start p-0 pl-4 text-xs"
                                            onClick={() => startAddingTask(index)}
                                        >
                                            <i className="fas fa-plus"></i>
                                            ADD TASK
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center py-8 text-center opacity-75">
                        <i className="fas fa-calendar-plus text-2xl"></i>

                        <p className="font-semibold">
                            No actions yet
                        </p>

                        <p className="text-xs">
                            Edit this template to add actions.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TemplateSchedule;
