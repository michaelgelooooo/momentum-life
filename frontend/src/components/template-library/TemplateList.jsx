function TemplateList({
    plans,
    selectedPlanId,
    setSelectedPlanId,
}) {
    return (
        <div className="card-wrapper overflow-x-auto lg:h-full lg:overflow-x-hidden lg:overflow-y-auto scrollbar-none">
            {plans.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center opacity-75 p-4!">
                    <div>
                        <i className="fas fa-calendar-xmark text-4xl"></i>

                        <p className="font-semibold">
                            No templates yet
                        </p>

                        <p className="text-sm">
                            Create a template to plan your day.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex w-max gap-2 lg:w-auto lg:flex-col">
                    {plans.map((plan) => {
                        const isSelected = selectedPlanId === plan.id;

                        return (
                            <button
                                key={plan.id}
                                type="button"
                                onClick={() => setSelectedPlanId(plan.id)}
                                className={`inner-card-wrapper bg-rose-100 shrink-0 w-48 lg:w-full text-left p-2 lg:p-4 space-y-1 lg:space-y-2 ${isSelected ? "" : "opacity-50"
                                    }`}
                            >
                                <h2 className="font-bold text-base lg:text-xl truncate">
                                    {plan.name}
                                </h2>

                                <p className="text-xs opacity-75">
                                    {plan.actions.length}{" "}
                                    {plan.actions.length === 1
                                        ? "action"
                                        : "actions"}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default TemplateList;