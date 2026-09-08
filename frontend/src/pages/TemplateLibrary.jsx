import { useEffect, useState } from "react";

import { getActions } from "../storage/actions";
import { getDailyPlans, saveDailyPlans } from "../storage/dailyPlans";
import { generateId } from "../utils/ids";

import TemplateList from "../components/template-library/TemplateList";
import TemplatePreview from "../components/template-library/TemplatePreview";
import TemplateForm from "../components/template-library/TemplateForm";

function TemplateLibrary() {
    const [plans, setPlans] = useState([]);
    const [actions, setActions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const selectedPlan = plans.find(
        (plan) => plan.id === selectedPlanId
    );

    function openCreateForm() {
        setEditingPlan(null);
        setIsFormOpen(true);
    }

    function openEditForm() {
        setEditingPlan(selectedPlan);
        setIsFormOpen(true);
    }

    function handleSaveTemplate(template) {
        const savedTemplate = {
            ...template,
            id: template.id ?? generateId("plan"),
        };

        setPlans((currentPlans) => {
            const templateExists = currentPlans.some(
                (plan) => plan.id === savedTemplate.id
            );

            const updatedPlans = templateExists
                ? currentPlans.map((plan) =>
                    plan.id === savedTemplate.id ? savedTemplate : plan
                )
                : [...currentPlans, savedTemplate];

            saveDailyPlans(updatedPlans);

            return updatedPlans;
        });

        setSelectedPlanId(savedTemplate.id);
        setIsFormOpen(false);
        setEditingPlan(null);
    }

    function handleUpdateTemplateActions(template, updatedActions) {
        setPlans((currentPlans) => {
            const updatedPlans = currentPlans.map(
                (plan) => plan.id === template.id
                    ? { ...plan, actions: updatedActions }
                    : plan
            );

            saveDailyPlans(updatedPlans);

            return updatedPlans;
        });
    }

    function handleDeleteTemplate(template) {
        setPlans((currentPlans) => {
            const updatedPlans = currentPlans.filter(
                (plan) => plan.id !== template.id
            );

            saveDailyPlans(updatedPlans);

            return updatedPlans;
        });

        const remainingPlans = plans.filter(
            (plan) => plan.id !== template.id
        );
        setSelectedPlanId(remainingPlans[0]?.id ?? null);
        setIsFormOpen(false);
        setEditingPlan(null);
    }

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
        <>
            <div className="section-wrapper p-4 lg:p-8 h-[88vh] flex flex-col space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between shrink-0">
                    <h1 className="section-heading font-modak text-4xl lg:text-6xl">
                        Template List
                    </h1>

                    <button
                        type="button"
                        className="btn btn-wrapper btn-circle btn-lg lg:btn-xl bg-rose-500"
                        onClick={openCreateForm}
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
                            onEdit={openEditForm}
                        />
                    </div>
                </div>
            </div>

            <TemplateForm
                plan={editingPlan}
                actions={actions}
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSaveTemplate}
                onUpdateActions={handleUpdateTemplateActions}
                onDelete={handleDeleteTemplate}
            />
        </>
    );
}

export default TemplateLibrary;