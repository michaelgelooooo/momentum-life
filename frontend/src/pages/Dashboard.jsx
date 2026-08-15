import { useEffect, useState } from "react";

import { getActions } from "../storage/actions";
import { getDailyPlans } from "../storage/dailyPlans";
import { getCurrentDailyReport } from "../storage/dailyReports";
import { getSettings } from "../storage/settings";

import DailyPlan from "../components/dashboard/DailyPlan";
import ToDo from "../components/dashboard/ToDo";
import Stats from "../components/dashboard/Stats";

function Dashboard() {
    const [report, setReport] = useState(null);
    const [actions, setActions] = useState([]);

    useEffect(() => {
        const storedActions = getActions();
        const plans = getDailyPlans();
        const settings = getSettings();

        const defaultPlan = plans.find(
            (plan) => plan.id === settings.defaultDailyPlanId
        );

        const currentReport = getCurrentDailyReport(
            defaultPlan,
            storedActions
        );

        setActions(storedActions);
        setReport(currentReport);
    }, []);

    if (!report) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Daily Plan */}
            <section className="lg:col-span-1">
                <DailyPlan
                    report={report}
                    setReport={setReport}
                    actions={actions}
                />
            </section>

            {/* Main Content */}
            <section className="lg:col-span-2 space-y-4">
                <Stats
                    report={report}
                />
                <ToDo
                    report={report}
                    setReport={setReport}
                />
            </section>

        </div>
    );
}

export default Dashboard;