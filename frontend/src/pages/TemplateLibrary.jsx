import { useEffect, useState } from "react";

import { getActions } from "../storage/actions";
import { getDailyPlans } from "../storage/dailyPlans";

import TemplateList from "../components/template-library/TemplateList";
import TemplatePreview from "../components/template-library/TemplatePreview";

function TemplateLibrary() {
    const [plans, setPlans] = useState([]);
    const [actions, setActions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const selectedPlan = plans.find(
        (plan) => plan.id === selectedPlanId
    );

    useEffect(() => {
        const storedPlans = getDailyPlans();
        const storedActions = getActions();

        setPlans(storedPlans);
        setActions(storedActions);

        if (storedPlans.length > 0) {
            setSelectedPlanId(storedPlans[0].id);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="section-wrapper p-4 lg:p-8 h-[88vh] flex flex-col space-y-4">

            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <h1 className="section-heading font-modak text-4xl lg:text-6xl">
                    Template List
                </h1>

                <button
                    type="button"
                    className="btn btn-wrapper btn-circle btn-lg lg:btn-xl bg-rose-500"
                >
                    <i className="fas fa-plus font-bold"></i>
                </button>
            </div>
            <div className="flex-1 min-h-0 grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-3 lg:grid-rows-1 gap-4">
                <TemplateList
                    plans={plans}
                    selectedPlanId={selectedPlanId}
                    setSelectedPlanId={setSelectedPlanId}
                />

                <div className="lg:col-span-2">
                    <TemplatePreview
                        plan={selectedPlan}
                        actions={actions}
                    />
                </div>
            </div>
        </div>
    );
}

export default TemplateLibrary;