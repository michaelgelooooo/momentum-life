import { generateId } from "../../utils/ids";

export function createAction(actionData) {
    return {
        id: generateId("action"),
        ...actionData,
    };
}

export function updateAction(actions, actionData) {
    return actions.map((action) =>
        action.id === actionData.id ? actionData : action
    );
}

export function deleteAction(actions, actionId) {
    return actions.filter((item) => item.id !== actionId);
}

export function filterActions(actions, filters = {}) {
    const searchTerm = (filters.search ?? "").trim().toLowerCase();
    const category = filters.category ?? "all";

    return actions.filter((action) => {
        const matchesSearch =
            action.name.toLowerCase().includes(searchTerm) ||
            action.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            category === "all" || action.category === category;

        return matchesSearch && matchesCategory;
    });
}
