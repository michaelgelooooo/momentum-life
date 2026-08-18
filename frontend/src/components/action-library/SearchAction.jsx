import { useState } from "react";

function SearchAction({ onFilterChange }) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    function handleSearchChange(event) {
        const value = event.target.value;

        setSearch(value);

        onFilterChange({
            search: value,
            category,
        });
    }

    function handleCategoryChange(event) {
        const value = event.target.value;

        setCategory(value);

        onFilterChange({
            search,
            category: value,
        });
    }

    function handleReset() {
        setSearch("");
        setCategory("all");

        onFilterChange({
            search: "",
            category: "all",
        });
    }

    return (
        <div className="flex items-center gap-2 shrink-0">
            {/* Search */}
            <div className="flex-1 min-w-0">
                <label className="input input-wrapper">
                    <i className="fas fa-magnifying-glass"></i>

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search actions..."
                    />
                </label>
            </div>

            {/* Category */}
            <div className="shrink-0">
                <select
                    className="select input-wrapper"
                    value={category}
                    onChange={handleCategoryChange}
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
                onClick={handleReset}
            >
                <i className="fas fa-rotate-left"></i>
            </button>
        </div>
    );
}

export default SearchAction;