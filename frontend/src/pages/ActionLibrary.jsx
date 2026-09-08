import { useEffect, useState } from "react";

import { generateId } from "../utils/ids";
import { getActions, saveActions } from "../storage/actions";
import { getCategories } from "../storage/categories";

import ActionModal from "../components/action-library/ActionModal";
import DeleteAction from "../components/action-library/DeleteAction";
import SearchAction from "../components/action-library/SearchAction";

function ActionLibrary() {
    const [actions, setActions] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedAction, setSelectedAction] = useState(null);
    const [actionToDelete, setActionToDelete] = useState(null);

    const [filters, setFilters] = useState({
        search: "",
        category: "all",
    });

    useEffect(() => {
        setActions(getActions());
        setCategories(getCategories());
    }, []);

    const filteredActions = actions.filter((action) => {
        const matchesSearch =
            action.name
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
            action.description
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        const matchesCategory =
            filters.category === "all" ||
            action.category === filters.category;

        return matchesSearch && matchesCategory;
    });

    function handleSaveAction(actionData) {
        const currentActions = getActions();

        if (actionData.id) {
            const updatedActions = currentActions.map((action) =>
                action.id === actionData.id
                    ? actionData
                    : action
            );

            saveActions(updatedActions);
            setActions(updatedActions);
        } else {
            const newAction = {
                id: generateId("action"),
                ...actionData,
            };

            const updatedActions = [
                ...currentActions,
                newAction,
            ];

            saveActions(updatedActions);
            setActions(updatedActions);
        }

        setSelectedAction(null);

        document
            .getElementById("action_modal")
            .close();
    }

    function handleRequestDelete(action) {
        setActionToDelete(action);
    }

    function handleDeleteAction(action) {
        const currentActions = getActions();

        const updatedActions = currentActions.filter(
            (item) => item.id !== action.id
        );

        saveActions(updatedActions);
        setActions(updatedActions);

        setActionToDelete(null);
        setSelectedAction(null);

        document
            .getElementById("action_modal")
            .close();
    }

    return (
        <>
            <div className="section-wrapper p-4 lg:p-8 h-[88vh] flex flex-col space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="section-heading font-modak text-4xl lg:text-6xl">
                        Action Library
                    </h1>

                    <button
                        className="btn btn-wrapper btn-circle btn-lg lg:btn-xl bg-rose-500"
                        onClick={() => {
                            setSelectedAction(null);

                            document
                                .getElementById("action_modal")
                                .showModal();
                        }}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

                {/* Search / Filters */}
                <SearchAction
                    categories={categories}
                    onFilterChange={setFilters}
                />

                {/* Action cards */}
                <div className="card-wrapper flex-1 min-h-0 overflow-y-scroll scrollbar-none">
                    {actions.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center space-y-2 opacity-75">
                                <i className="fas fa-folder-open text-4xl"></i>

                                <div>
                                    <h2 className="font-bold text-xl">
                                        Your Action Library Is Empty
                                    </h2>

                                    <p className="text-sm">
                                        Add an action to start building your library.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : filteredActions.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center space-y-2 opacity-75">
                                <i className="fas fa-magnifying-glass text-4xl"></i>

                                <div>
                                    <h2 className="font-bold text-xl">
                                        No Actions Found
                                    </h2>

                                    <p className="text-sm">
                                        Try adjusting your search or category filter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                            {filteredActions.map((action) => {
                                const category = categories.find(
                                    (category) => category.value === action.category
                                );

                                return (
                                    <div
                                        key={action.id}
                                        className="inner-card-wrapper bg-rose-100 p-2 lg:p-4 space-y-2"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h2 className="font-bold text-xl leading-tight">
                                                    {action.name}
                                                </h2>

                                                <span className="text-xs opacity-75 capitalize">
                                                    <i
                                                        className={`fas ${category?.icon ??
                                                            "fa-circle-question"
                                                            } me-1`}
                                                    ></i>

                                                    {category?.name ?? action.category}
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-wrapper btn-square btn-xs bg-rose-500"
                                                title="Edit action"
                                                onClick={() => {
                                                    setSelectedAction(action);

                                                    document
                                                        .getElementById("action_modal")
                                                        .showModal();
                                                }}
                                            >
                                                <i className="fas fa-ellipsis-vertical"></i>
                                            </button>
                                        </div>

                                        {/* Description */}
                                        <p className="text-xs leading-relaxed opacity-75">
                                            {action.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <ActionModal
                action={selectedAction}
                categories={categories}
                onSave={handleSaveAction}
                onDelete={handleRequestDelete}
                onClose={() => setSelectedAction(null)}
            />

            {actionToDelete && (
                <DeleteAction
                    action={actionToDelete}
                    onDelete={handleDeleteAction}
                    onClose={() => setActionToDelete(null)}
                />
            )}
        </>
    );
}

export default ActionLibrary;