import Dashboard from "../pages/Dashboard";
import Navbar from "../components/layout/Navbar";
import Dock from "../components/layout/Dock";

function AppLayout() {
    return (
        <main className="min-h-screen bg-rose-100 font-spline p-4 pb-20 lg:pb-4 space-y-4">
            <Navbar />
            <Dashboard />
            <Dock />
        </main>
    );
}

export default AppLayout;