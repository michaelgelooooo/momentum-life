import { useEffect, useState } from "react";

import { generateId } from "../../utils/ids";

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

    function addTemplateAction(action, time) {
        const updatedActions = [
            ...templateActions,
            {
                actionId: action.id,
                time,
                tasks: [],
            },
        ].sort((firstAction, secondAction) =>
            firstAction.time.localeCompare(secondAction.time)
        );

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function deleteTemplateAction(actionIndex) {
        const updatedActions = templateActions.filter(
            (_, index) => index !== actionIndex
        );

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function updateTemplateActionTime(actionIndex, time) {
        const timeAlreadyUsed = templateActions.some(
            (templateAction, currentActionIndex) =>
                currentActionIndex !== actionIndex &&
                templateAction.time === time
        );

        if (timeAlreadyUsed) return;

        const updatedActions = templateActions
            .map((templateAction, currentActionIndex) =>
                currentActionIndex === actionIndex
                    ? { ...templateAction, time }
                    : templateAction
            )
            .sort((firstAction, secondAction) =>
                firstAction.time.localeCompare(secondAction.time)
            );

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function deleteTemplateTask(actionIndex, taskIndex) {
        const updatedActions = templateActions.map(
            (templateAction, currentActionIndex) => {
                if (currentActionIndex !== actionIndex) {
                    return templateAction;
                }

                return {
                    ...templateAction,
                    tasks: templateAction.tasks.filter(
                        (_, currentTaskIndex) => currentTaskIndex !== taskIndex
                    ),
                };
            }
        );

        setTemplateActions(updatedActions);
        onUpdateActions(plan, updatedActions);
    }

    function addTemplateTask(actionIndex, taskName) {
        const updatedActions = templateActions.map(
            (templateAction, currentActionIndex) => {
                if (currentActionIndex !== actionIndex) {
                    return templateAction;
                }

                return {
                    ...templateAction,
                    tasks: [
                        ...(templateAction.tasks ?? []),
                        {
                            id: generateId("task"),
                            name: taskName,
                            status: "pending",
                        },
                    ],
                };
            }
        );

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
                            onAddAction={addTemplateAction}
                            onUpdateTime={updateTemplateActionTime}
                            onDeleteAction={deleteTemplateAction}
                            onDeleteTask={deleteTemplateTask}
                            onAddTask={addTemplateTask}
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