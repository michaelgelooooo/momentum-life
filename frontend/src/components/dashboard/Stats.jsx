function Stats({ report }) {
    const taskTotal = report.actions.reduce(
        (total, action) => total + action.tasks.length,
        0
    );

    const completedTaskTotal = report.actions.reduce(
        (total, action) =>
            total +
            action.tasks.filter(
                (task) => task.status === "completed"
            ).length,
        0
    );

    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4" id="Stats">
            <h2 className="section-heading font-modak text-4xl lg:text-6xl">
                Stats
            </h2>
            <div className="card-wrapper w-full grid grid-cols-3 divide-x-2 divide-black">
                <div className="stat p-2 lg:p-4 flex flex-col items-center text-center">
                    <i className="fa-solid fa-diagram-next text-rose-500 text-lg lg:text-2xl mb-1"></i>

                    <div className="stat-title font-bold">
                        Actions
                    </div>

                    <div className="stat-value text-3xl lg:text-4xl">
                        {report.actions.length}
                    </div>

                    <div className="stat-desc font-semibold">
                        Planned
                    </div>
                </div>

                <div className="stat p-2 lg:p-4 flex flex-col items-center text-center">
                    <i className="fa-solid fa-list text-rose-500 text-lg lg:text-2xl mb-1"></i>

                    <div className="stat-title font-bold">
                        Tasks
                    </div>

                    <div className="stat-value text-3xl lg:text-4xl">
                        {taskTotal}
                    </div>

                    <div className="stat-desc font-semibold">
                        Created
                    </div>
                </div>

                <div className="stat p-2 lg:p-4 flex flex-col items-center text-center">
                    <i className="fa-solid fa-list-check text-rose-500 text-lg lg:text-2xl mb-1"></i>

                    <div className="stat-title font-bold">
                        Tasks
                    </div>

                    <div className="stat-value text-3xl lg:text-4xl">
                        {completedTaskTotal}
                    </div>

                    <div className="stat-desc font-semibold">
                        Completed
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Stats;