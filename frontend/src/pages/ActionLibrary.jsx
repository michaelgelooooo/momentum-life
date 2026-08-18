import { useEffect, useState } from "react";
import { getActions } from "../storage/actions";

function ActionLibrary() {
    const [actions, setActions] = useState([]);

    useEffect(() => {
        setActions(getActions());
    }, []);

    function getCategoryIcon(category) {
        switch (category) {
            case "productive":
                return "fa-arrow-trend-up";

            case "routine":
                return "fa-arrows-rotate";

            case "leisure":
                return "fa-mug-hot";

            default:
                return "fa-circle-question";
        }
    }

    return (
        <div className="section-wrapper p-4 lg:p-8 h-[88vh] flex flex-col space-y-4 lg:space-y-8">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="font-lobster section-heading">
                        Action Library
                    </h1>
                </div>

                <button className="btn btn-wrapper btn-circle btn-lg lg:btn-xl">
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                {/* Search */}
                <div className="flex-1 min-w-0">
                    <label className="input input-wrapper">
                        <i className="fas fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search actions..."
                        />
                    </label>
                </div>

                {/* Category */}
                <div className="shrink-0">
                    <select
                        className="select input-wrapper"
                        defaultValue="all"
                    >
                        <option value="all">All</option>
                        <option value="productive">Productive</option>
                        <option value="routine">Routine</option>
                        <option value="leisure">Leisure</option>
                    </select>
                </div>

                {/* Reset */}
                <button
                    type="button"
                    className="btn btn-wrapper btn-square shrink-0"
                    title="Reset filters"
                >
                    <i className="fas fa-rotate-left"></i>
                </button>
            </div>

            {/* Action cards */}
            <div className="card-wrapper flex-1 min-h-0 overflow-y-scroll scrollbar-none">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className="inner-card-wrapper p-2 lg:p-4 space-y-2"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="min-w-0">
                                    <h2 className="font-bold text-xl leading-tight">
                                        {action.name}
                                    </h2>

                                    <span className="text-sm opacity-75 capitalize">
                                        <i className={`fas ${getCategoryIcon(action.category)} me-1`}></i>
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