function DeleteTemplate({
    plan,
    onDelete,
    onClose,
}) {
    if (!plan) {
        return null;
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box section-wrapper space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">
                        DELETE TEMPLATE
                    </h3>

                    <button
                        type="button"
                        className="btn btn-wrapper btn-sm btn-circle bg-rose-500"
                        onClick={onClose}
                    >
                        <i className="fas fa-xmark"></i>
                    </button>
                </div>

                <hr className="border" />

                <div className="space-y-2">
                    <p className="text-sm">
                        Are you sure you want to delete{" "}
                        <strong>{plan.name}</strong>?
                    </p>

                    <div className="card-wrapper">
                        <p className="text-sm opacity-75">
                            This template will be permanently removed
                            from your template library.
                        </p>
                    </div>
                </div>

                <hr className="border" />

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-wrapper bg-rose-50"
                        onClick={onClose}
                    >
                        CANCEL
                    </button>

                    <button
                        type="button"
                        className="btn btn-wrapper bg-rose-500"
                        onClick={() => {
                            onClose();
                            onDelete(plan);
                        }}
                    >
                        <i className="fas fa-trash"></i>
                        DELETE
                    </button>
                </div>
            </div>

            <div
                className="modal-backdrop"
                onClick={onClose}
            ></div>
        </div>
    );
}

export default DeleteTemplate;
