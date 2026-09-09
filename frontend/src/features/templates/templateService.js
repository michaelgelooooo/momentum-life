import { generateId } from "../../utils/ids";

export function addTemplateAction(plan, action, time) {
    const basePlan = plan ?? { id: null, name: "", description: "", actions: [] };

    const updatedActions = [
        ...basePlan.actions,
        {
            actionId: action.id,
            time,
            tasks: [],
        },
    ].sort((firstAction, secondAction) =>
        firstAction.time.localeCompare(secondAction.time)
    );

    return {
        ...basePlan,
        actions: updatedActions,
    };
}

export function updateTemplateActionTime(plan, actionIndex, time) {
    const templateActions = plan?.actions ?? [];
    const timeAlreadyUsed = templateActions.some(
        (templateAction, currentActionIndex) =>
            currentActionIndex !== actionIndex &&
            templateAction.time === time
    );

    if (timeAlreadyUsed) {
        return plan;
    }

    const updatedActions = templateActions
        .map((templateAction, currentActionIndex) =>
            currentActionIndex === actionIndex
                ? { ...templateAction, time }
                : templateAction
        )
        .sort((firstAction, secondAction) =>
            firstAction.time.localeCompare(secondAction.time)
        );

    return {
        ...plan,
        actions: updatedActions,
    };
}

export function deleteTemplateAction(plan, actionIndex) {
    return {
        ...plan,
        actions: (plan?.actions ?? []).filter(
            (_, index) => index !== actionIndex
        ),
    };
}

export function addTemplateTask(plan, actionIndex, taskName) {
    return {
        ...plan,
        actions: (plan?.actions ?? []).map((templateAction, currentActionIndex) => {
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
        }),
    };
}

export function deleteTemplateTask(plan, actionIndex, taskIndex) {
    return {
        ...plan,
        actions: (plan?.actions ?? []).map((templateAction, currentActionIndex) => {
            if (currentActionIndex !== actionIndex) {
                return templateAction;
            }

            return {
                ...templateAction,
                tasks: (templateAction.tasks ?? []).filter(
                    (_, currentTaskIndex) => currentTaskIndex !== taskIndex
                ),
            };
        }),
    };
}
