function DeleteAction({
    action,
    onDelete,
    onClose,
}) {
    if (!action) {
        return null;
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box section-wrapper space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">
                        DELETE ACTION
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

                {/* Content */}
                <div className="space-y-2">
                    <p className="text-sm">
                        Are you sure you want to delete{" "}
                        <strong>{action.name}</strong>?
                    </p>

                    <div className="card-wrapper">
                        <p className="text-sm opacity-75">
                            This action will be permanently
                            removed from your action library.
                        </p>
                    </div>
                </div>

                <hr className="border" />

                {/* Actions */}
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
                        onClick={() => onDelete(action)}
                    >
                        <i className="fas fa-trash"></i>
                        DELETE
                    </button>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className="modal-backdrop"
                onClick={onClose}
            ></div>
        </div>
    );
}

export default DeleteAction;