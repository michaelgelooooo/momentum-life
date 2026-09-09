import { useState } from "react";

function SearchAction({
    onFilterChange,
    categories,
}) {
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
        <div className="flex flex-col lg:flex-row gap-2 shrink-0">
            {/* Search */}
            <div className="w-full lg:flex-1 lg:min-w-0">
                <label className="input input-wrapper w-full">
                    <i className="fas fa-magnifying-glass"></i>

                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search actions..."
                    />
                </label>
            </div>

            {/* Filters */}
            <div className="flex gap-2 w-full lg:w-auto">
                {/* Category */}
                <div className="flex-1 lg:flex-none">
                    <select
                        className="select input-wrapper w-full lg:w-40"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="all">
                            All
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.value}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Reset */}
                <button
                    type="button"
                    className="btn btn-wrapper btn-square bg-rose-50 rounded-lg"
                    title="Reset filters"
                    onClick={handleReset}
                >
                    <i className="fas fa-rotate-left"></i>
                </button>
            </div>
        </div>
    );
}

export default SearchAction;