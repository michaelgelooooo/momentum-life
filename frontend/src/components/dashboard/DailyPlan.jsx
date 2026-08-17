import AddAction from "./daily-plan/AddAction";
import RenderActions from "./daily-plan/RenderActions";

function DailyPlan({
    report,
    setReport,
    actions,
}) {
    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4 scroll-mt-24" id="DailyPlan">
            <div className="flex items-center justify-between">
                <h1 className="font-lobster section-heading">
                    Daily Plan
                </h1>

                <AddAction
                    actions={actions}
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
