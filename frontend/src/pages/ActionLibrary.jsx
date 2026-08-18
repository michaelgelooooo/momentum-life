import { useEffect, useState } from "react";
import { getActions } from "../storage/actions";

import SearchAction from "../components/action-library/SearchAction";

function ActionLibrary() {
    const [actions, setActions] = useState([]);

    const [filters, setFilters] = useState({
        search: "",
        category: "all",
    });

    useEffect(() => {
        setActions(getActions());
    }, []);

    const categoryIcons = {
        productive: "fa-arrow-trend-up",
        routine: "fa-arrows-rotate",
        leisure: "fa-mug-hot",
    };

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

    return (
        <div className="section-wrapper p-4 lg:p-8 h-[88vh] flex flex-col space-y-4 lg:space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="font-lobster section-heading">
                        Action Library
                    </h1>
                </div>

                <button
                    type="button"
                    className="btn btn-wrapper btn-circle btn-lg lg:btn-xl"
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            {/* Search / Filters */}
            <SearchAction
                onFilterChange={setFilters}
            />

            {/* Action cards */}
            <div className="card-wrapper flex-1 min-h-0 overflow-y-scroll scrollbar-none">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {filteredActions.map((action) => (
                        <div
                            key={action.id}
                            className="inner-card-wrapper p-2 lg:p-4 space-y-2"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h2 className="font-bold text-xl leading-tight">
                                        {action.name}
                                    </h2>

                                    <span className="text-xs opacity-75 capitalize">
                                        <i
                                            className={`fas ${
                                                categoryIcons[action.category] ??
                                                "fa-circle-question"
                                            } me-1`}
                                        ></i>

                                        {action.category}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-wrapper btn-square btn-xs shrink-0"
                                    title="Action options"
                                >
                                    <i className="fas fa-ellipsis-vertical"></i>
                                </button>
                            </div>

                            {/* Description */}
                            <p className="text-xs leading-relaxed opacity-75">
                                {action.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ActionLibrary;