function Stats({ report }) {
    return (
        <section className="mb-6">
            <div className="stats stats-vertical w-full shadow sm:stats-horizontal">

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