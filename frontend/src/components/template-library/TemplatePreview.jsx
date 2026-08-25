function TemplatePreview({ plan, actions }) {
    return (
        <div className="card-wrapper h-full flex-1 min-h-0 overflow-y-auto scrollbar-none">

            {plan ? (

                <div className="space-y-2">

                    {/* Template Info */}
                    <div className="inner-card-wrapper bg-rose-100 p-2 lg:p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="section-heading font-modak text-2xl lg:text-4xl leading-none">
                                {plan.name}
                            </h2>

                            <button className="btn btn-wrapper bg-rose-500 btn-sm lg:btn-md">
                                <i className="fas fa-pen"></i>EDIT
                            </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest opacity-60">
                            <i className="fas fa-calendar-days" />
                            <span>
                                {plan.actions.length}{" "}
                                {plan.actions.length === 1
                                    ? "ACTION"
                                    : "ACTIONS"}
                            </span>
                        </div>

                        <hr className="border" />

                        <div className="space-y-1">
                            <span className="text-xs font-bold tracking-widest opacity-75">
                                DESCRIPTION
                            </span>

                            <p className="text-sm leading-relaxed opacity-75">
                                {plan.description}
                            </p>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="inner-card-wrapper bg-rose-100 p-2 lg:p-4 space-y-2">

                        <div className="flex items-center justify-between border-b-2">
                            <h2 className="section-heading font-modak text-2xl lg:text-4xl">
                                Schedule
                            </h2>

                            <i className="fas fa-clock text-sm opacity-75" />
                        </div>

                        <div className="space-y-2">
                            {plan.actions.map((planAction, index) => {
                                const action = actions.find(
                                    (action) => action.id === planAction.actionId
                                );

                                if (!action) return null;

                                return (
                                    <div
                                        key={`${plan.id}-${planAction.actionId}-${planAction.time}-${index}`}
                                        className={`flex items-start gap-1 ${index > 0
                                            ? "border-t border-dashed pt-2"
                                            : ""
                                            }`}
                                    >
                                        {/* Time */}
                                        <div className="shrink-0 font-mono font-bold text-xs">
                                            {planAction.time}
                                        </div>

                                        <i className="fas fa-caret-right"></i>

                                        {/* Action */}
                                        <div className="flex-1 space-y-2">
                                            <div>
                                                <h3 className="font-bold leading-4">
                                                    {action.name}
                                                </h3>

                                                <p className="text-xs leading-4 opacity-75">
                                                    {action.description}
                                                </p>
                                            </div>

                                            {planAction.tasks?.length > 0 && (
                                                <ul className="list-disc list-inside text-sm">
                                                    {planAction.tasks.map((task, taskIndex) => (
                                                        <li
                                                            key={`${plan.id}-${planAction.actionId}-${taskIndex}`} className="leading-4"
                                                        >
                                                            {task.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>

            ) : (

                <div className="h-full flex items-center justify-center">

                    <div className="text-center opacity-75">

                        <i className="fas fa-calendar-days text-4xl" />

                        <p className="font-semibold">
                            Select a template
                        </p>

                        <p className="text-sm">
                            Choose a template to preview it.
                        </p>

                    </div>

                </div>

            )}

        </div>
    );
}

export default TemplatePreview;