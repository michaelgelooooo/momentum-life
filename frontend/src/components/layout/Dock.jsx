function Dock() {
    return (
        <div className="dock section-wrapper bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:hidden">
            <button
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
            >
                <i className="fas fa-gear"></i>
                <span className="dock-label">Stats</span>
            </button>
            <button
                onClick={() =>
                    document.getElementById("DailyPlan")?.scrollIntoView({
                        behavior: "smooth",
                    })
                }
            >
                <i className="fas fa-calendar"></i>
                <span className="dock-label">Daily Plan</span>
            </button>

            <button
                onClick={() =>
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: "smooth",
                    })
                }
            >
                <i className="fas fa-list-check"></i>
                <span className="dock-label">To-Do</span>
            </button>
        </div>
    );
}

export default Dock;