import AddAction from "./daily-plan/AddAction";
import RenderActions from "./daily-plan/RenderActions";

function DailyPlan({
    report,
    setReport,
    actions,
}) {
    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4 h-[88vh] flex flex-col scroll-mt-24" id="DailyPlan">
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

            <RenderActions
                report={report}
                setReport={setReport}
            />

        </section>
    );
}

export default DailyPlan;
