function Stats({ report }) {
    return (
        <section className="section-wrapper space-y-4 p-8">
            <h2 className="font-lobster section-heading">
                Stats
            </h2>
            <div className="stats stats-vertical card-wrapper w-full sm:stats-horizontal">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <i className="fa-solid fa-list-check text-2xl"></i>
                    </div>

                    <div className="stat-title">
                        Actions
                    </div>

                    <div className="stat-value">
                        6
                    </div>

                    <div className="stat-desc">
                        Planned today
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <i className="fa-solid fa-list text-2xl"></i>
                    </div>

                    <div className="stat-title">
                        Tasks
                    </div>

                    <div className="stat-value">
                        8
                    </div>

                    <div className="stat-desc">
                        Created today
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <i className="fa-solid fa-circle-check text-2xl"></i>
                    </div>

                    <div className="stat-title">
                        Completed
                    </div>

                    <div className="stat-value">
                        5
                    </div>

                    <div className="stat-desc">
                        Tasks completed
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Stats;