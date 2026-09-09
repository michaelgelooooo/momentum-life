import { useNavigate } from "react-router-dom";

import AddAction from "./daily-plan/AddAction";
import RenderActions from "./daily-plan/RenderActions";

function DailyPlan({
    report,
    setReport,
    actions,
}) {
    const navigate = useNavigate();

    return (
        <section
            className="section-wrapper p-4 lg:p-8 space-y-4 h-[88vh] flex flex-col scroll-mt-24"
            id="DailyPlan"
        >
            <div className="flex items-center justify-between">
                <h1 className="section-heading font-modak text-4xl lg:text-6xl">
                    Daily Plan
                </h1>

                <AddAction
                    actions={actions}
                    report={report}
                    setReport={setReport}
                />
            </div>

            {report && report.actions.length > 0 ? (
                <RenderActions
                    report={report}
                    setReport={setReport}
                />
            ) : (
                <div className="card-wrapper flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="opacity-75">
                            <i className="fas fa-calendar-plus text-4xl"></i>

                            <h2 className="font-bold text-xl">
                                No Daily Plan
                            </h2>

                            <p className="text-sm">
                                Start your day with a template,
                                or add actions manually.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/templates")}
                            className="btn btn-wrapper bg-rose-500"
                        >
                            <i className="fas fa-calendar-check"></i>
                            START WITH TEMPLATE
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default DailyPlan;