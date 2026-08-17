import AddTask from "./to-do/AddTask";
import RenderTasks from "./to-do/RenderTasks";

function ToDo({ report, setReport }) {
    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="font-lobster section-heading">
                    To-Do
                </h2>

                <AddTask
                    report={report}
                    setReport={setReport}
                />
            </div>

            <div className="card-wrapper h-106 overflow-y-auto scrollbar-hidden" id="ToDo">
                <RenderTasks
                    report={report}
                    setReport={setReport}
                />
            </div>
        </section >
    );
}

export default ToDo;