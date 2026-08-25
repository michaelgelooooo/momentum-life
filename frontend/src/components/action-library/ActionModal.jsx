import { useEffect, useState } from "react";

const MAX_NAME_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 160;

function ActionModal({
    action = null,
    categories = [],
    onSave,
    onDelete,
}) {
    const isEditing = Boolean(action);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(action?.name ?? "");
        setDescription(action?.description ?? "");
        setCategory(action?.category ?? "");
        setErrors({});
    }, [action]);

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        const newErrors = {};

        if (!trimmedName) {
            newErrors.name = "Action name is required.";
        } else if (trimmedName.length > MAX_NAME_LENGTH) {
            newErrors.name =
                `Action name must be ${MAX_NAME_LENGTH} characters or less.`;
        }

        if (!trimmedDescription) {
            newErrors.description =
                "Description is required.";
        } else if (
            trimmedDescription.length > MAX_DESCRIPTION_LENGTH
        ) {
            newErrors.description =
                `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`;
        }

        if (!category) {
            newErrors.category =
                "Please select a category.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onSave({
            ...(action ?? {}),
            name: trimmedName,
            description: trimmedDescription,
            category,
        });
    }

    function closeModal() {
        document
            .getElementById("action_modal")
            .close();
    }

    return (
        <dialog id="action_modal" className="modal">
            <div className="modal-box section-wrapper space-y-4">
                {/* Header */}
                <div>
                    <h3 className="font-bold text-2xl">
                        {isEditing
                            ? "EDIT ACTION"
                            : "ADD ACTION"}
                    </h3>
                </div>

                <hr className="border" />

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Action Name */}
                    <div>
                        <div className="flex justify-between text-xs">
                            <label className="text-sm font-bold">
                                Action Name
                            </label>

                            <span className="opacity-75">
                                {name.length}/{MAX_NAME_LENGTH}
                            </span>
                        </div>

                        <input
                            type="text"
                            className={`input input-wrapper w-full ${errors.name
                                ? "border-red-500"
                                : ""
                                }`}
                            placeholder="e.g. Exercise"
                            value={name}
                            maxLength={MAX_NAME_LENGTH}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                        <span className="text-red-600 text-xs">
                            {errors.name}
                        </span>
                    </div>

                    {/* Description */}
                    <div>

                        <div className="flex justify-between text-xs">
                            <label className="text-sm font-bold">
                                Description
                            </label>

                            <span className="opacity-75">
                                {description.length}/{MAX_DESCRIPTION_LENGTH}
                            </span>
                        </div>

                        <textarea
                            className={`textarea input-wrapper w-full ${errors.description
                                ? "border-red-500"
                                : ""
                                }`}
                            placeholder="Describe what this action is for..."
                            value={description}
                            maxLength={MAX_DESCRIPTION_LENGTH}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                        />

                        <span className="text-red-600 text-xs">
                            {errors.description}
                        </span>

                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm font-bold">
                            Category
                        </label>

                        <select
                            className={`select input-wrapper w-full ${errors.category
                                ? "border-red-500"
                                : ""
                                }`}
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                        >
                            <option value="" disabled>
                                Select a category
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

                        {errors.category && (
                            <p className="text-xs text-red-600">
                                {errors.category}
                            </p>
                        )}
                    </div>

                    <hr className="border" />

                    {/* Actions */}
                    <div className="modal-action">
                        {/* Delete */}
                        {isEditing && (
                            <button
                                type="button"
                                className="btn btn-wrapper bg-rose-500"
                                onClick={() => {
                                    closeModal();
                                    onDelete(action);
                                }}
                            >
                                <i className="fas fa-trash"></i>
                                DELETE
                            </button>
                        )}

                        {/* Cancel + Save */}
                        <div className="flex gap-2 ml-auto">
                            <button
                                type="button"
                                className="btn btn-wrapper bg-rose-50"
                                onClick={closeModal}
                            >
                                CANCEL
                            </button>

                            <button
                                type="submit"
                                className="btn btn-wrapper bg-rose-500"
                            >
                                <i className="fas fa-floppy-disk"></i>
                                SAVE
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Click outside */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default ActionModal;