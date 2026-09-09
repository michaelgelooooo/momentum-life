import { useEffect, useState } from "react";

import {
    addTemplateAction,
    addTemplateTask,
    deleteTemplateAction,
    deleteTemplateTask,
    updateTemplateActionTime,
} from "../../features/templates/templateService";

import DeleteTemplate from "./template-form/DeleteTemplate";
import TemplateFields from "./template-form/TemplateFields";
import TemplateSchedule from "./template-form/TemplateSchedule";

const MAX_NAME_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 160;

function TemplateForm({
    plan,
    actions = [],
    isOpen,
    onClose,
    onSave,
    onUpdateActions,
    onDelete,
}) {
    const drawerId = "template-form-drawer";
    const isEditing = Boolean(plan);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [templateActions, setTemplateActions] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        setName(plan?.name ?? "");
        setDescription(plan?.description ?? "");
        setTemplateActions(plan?.actions ?? []);
        setFieldErrors({});
        setIsDeleteConfirmationOpen(false);
    }, [plan, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = name.trim();

        const errors = {};

        if (!trimmedName) {
            errors.name = "Template name is required.";
        } else if (trimmedName.length > MAX_NAME_LENGTH) {
            errors.name =
                `Template name must be ${MAX_NAME_LENGTH} characters or less.`;
        }

        if (description.trim().length > MAX_DESCRIPTION_LENGTH) {
            errors.description =
                `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`;
        }

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});

        onSave({
            id: plan?.id,
            name: trimmedName,
            description: description.trim(),
            actions: templateActions,
        });
    }

    function handleAddTemplateAction(action, time) {
        const updatedPlan = addTemplateAction(
            { ...(plan ?? {}), actions: templateActions },
            action,
            time
        );

        const updatedActions = updatedPlan.actions;

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function handleDeleteTemplateAction(actionIndex) {
        const updatedPlan = deleteTemplateAction(
            { ...(plan ?? {}), actions: templateActions },
            actionIndex
        );

        const updatedActions = updatedPlan.actions;

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function handleUpdateTemplateActionTime(actionIndex, time) {
        const updatedPlan = updateTemplateActionTime(
            { ...(plan ?? {}), actions: templateActions },
            actionIndex,
            time
        );

        const updatedActions = updatedPlan.actions;

        if (
            JSON.stringify(updatedActions) ===
            JSON.stringify(templateActions)
        ) {
            return;
        }

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function handleDeleteTemplateTask(actionIndex, taskIndex) {
        const updatedPlan = deleteTemplateTask(
            { ...(plan ?? {}), actions: templateActions },
            actionIndex,
            taskIndex
        );

        const updatedActions = updatedPlan.actions;

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function handleAddTemplateTask(actionIndex, taskName) {
        const updatedPlan = addTemplateTask(
            { ...(plan ?? {}), actions: templateActions },
            actionIndex,
            taskName
        );

        const updatedActions = updatedPlan.actions;

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    return (
        <div className="drawer drawer-end">
            <input
                id={drawerId}
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                onChange={(event) => {
                    if (!event.target.checked) {
                        onClose();
                    }
                }}
            />

            <div className="drawer-side">
                <label
                    htmlFor={drawerId}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>

                <div className="bg-rose-100 h-full w-full lg:w-1/3 p-4 space-y-4 flex flex-col overflow-hidden">
                    <div className="section-wrapper flex items-center justify-between p-2 lg:p-4">
                        <h1 className="section-heading font-modak text-2xl lg:text-4xl">
                            {isEditing ? "Update Template" : "Create Template"}
                        </h1>

                        <label
                            htmlFor={drawerId}
                            className="btn btn-wrapper btn-circle bg-rose-500"
                            onClick={onClose}
                        >
                            <i className="fas fa-xmark"></i>
                        </label>
                    </div>

                    <TemplateFields
                        name={name}
                        description={description}
                        errors={fieldErrors}
                        isEditing={isEditing}
                        onNameChange={(event) => {
                            setName(event.target.value);
                            setFieldErrors((currentErrors) => ({
                                ...currentErrors,
                                name: "",
                            }));
                        }}
                        onDescriptionChange={(event) => {
                            setDescription(event.target.value);
                            setFieldErrors((currentErrors) => ({
                                ...currentErrors,
                                description: "",
                            }));
                        }}
                        onSubmit={handleSubmit}
                        onDeleteRequest={() => setIsDeleteConfirmationOpen(true)}
                    />

                    {isEditing && (
                        <TemplateSchedule
                            plan={plan}
                            actions={actions}
                            templateActions={templateActions}
                            onAddAction={handleAddTemplateAction}
                            onUpdateTime={handleUpdateTemplateActionTime}
                            onDeleteAction={handleDeleteTemplateAction}
                            onDeleteTask={handleDeleteTemplateTask}
                            onAddTask={handleAddTemplateTask}
                        />
                    )}
                </div>
            </div>

            {isDeleteConfirmationOpen && (
                <DeleteTemplate
                    plan={plan}
                    onDelete={onDelete}
                    onClose={() => setIsDeleteConfirmationOpen(false)}
                />
            )}
        </div>
    );
}

export default TemplateForm;