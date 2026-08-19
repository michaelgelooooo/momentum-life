import AddTask from "./to-do/AddTask";
import RenderTasks from "./to-do/RenderTasks";

function ToDo({ report, setReport }) {
    return (
        <section className="section-wrapper p-4 lg:p-8 space-y-4 lg:space-y-8 h-[54.5vh] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <h2 className="section-heading font-agbalumo text-4xl lg:text-6xl">
                    To-Do
                </h2>

                <AddTask
                    report={report}
                    setReport={setReport}
                />
            </div>

            <div
                className="card-wrapper flex-1 min-h-0 overflow-y-auto scrollbar-none"
                id="ToDo"
            >
                <RenderTasks
                    report={report}
                    setReport={setReport}
                />
            </div>
        </section>
    );
}

export default ToDo;