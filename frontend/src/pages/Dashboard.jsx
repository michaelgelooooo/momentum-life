import { useEffect, useState } from "react";

import { getActions } from "../storage/actions";
import { getDailyPlans } from "../storage/dailyPlans";
import { getCurrentDailyReport } from "../storage/dailyReports";
import { getSettings } from "../storage/settings";

import DailyPlan from "../components/dashboard/DailyPlan";
import ToDo from "../components/dashboard/ToDo";
import Stats from "../components/dashboard/Stats";

import Dock from "../components/layout/Dock";

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
        <>
            <div className="flex flex-col gap-4 lg:flex-row">

                {/* Daily Plan */}
                <section className="order-2 lg:order-1 lg:w-1/3">
                    <DailyPlan
                        report={report}
                        setReport={setReport}
                        actions={actions}
                    />
                </section>

                {/* Right column */}
                <section className="contents lg:order-2 lg:flex lg:w-2/3 lg:flex-col lg:gap-4">
                    <div className="order-1 lg:order-0">
                        <Stats
                            report={report}
                        />
                    </div>

                    <div className="order-3 lg:order-0">
                        <ToDo
                            report={report}
                            setReport={setReport}
                        />
                    </div>
                </section>


            </div>
            
            <Dock />
        </>
    );
}

export default Dashboard;