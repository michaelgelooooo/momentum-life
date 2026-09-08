const MAX_NAME_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 160;

function TemplateFields({
    name,
    description,
    errors = {},
    isEditing,
    onNameChange,
    onDescriptionChange,
    onSubmit,
    onDeleteRequest,
}) {
    return (
        <form
            className="section-wrapper p-4 space-y-4"
            onSubmit={onSubmit}
        >
            <div>
                <div className="flex justify-between text-xs">
                    <label className="text-sm font-bold">
                        Template Name
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
                    placeholder="e.g. Work Day"
                    value={name}
                    maxLength={MAX_NAME_LENGTH}
                    aria-invalid={Boolean(errors.name)}
                    onChange={onNameChange}
                    required
                />

                {errors.name && (
                    <p className="text-red-600 text-xs">
                        {errors.name}
                    </p>
                )}
            </div>

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
                    placeholder="Describe what this template is for..."
                    value={description}
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    aria-invalid={Boolean(errors.description)}
                    onChange={onDescriptionChange}
                    rows="2"
                />

                {errors.description && (
                    <p className="text-red-600 text-xs">
                        {errors.description}
                    </p>
                )}
            </div>

            <hr className="border" />

            {isEditing ? (
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="btn btn-wrapper bg-rose-500"
                        onClick={onDeleteRequest}
                    >
                        <i className="fas fa-trash"></i>
                        DELETE
                    </button>

                    <button
                        type="submit"
                        className="btn btn-wrapper bg-rose-500"
                    >
                        <i className="fas fa-save"></i>
                        SAVE
                    </button>
                </div>
            ) : (
                <button
                    type="submit"
                    className="btn btn-wrapper bg-rose-500 w-full"
                >
                    <i className="fas fa-save"></i>
                    SAVE
                </button>
            )}
        </form>
    );
}

export default TemplateFields;
