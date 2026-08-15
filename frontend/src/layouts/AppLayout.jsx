import Dashboard from "../pages/Dashboard";
import Navbar from "../components/layout/Navbar";

function AppLayout() {
    return (
        <main className="min-h-screen bg-rose-100 font-mono p-4 space-y-4">
            <Navbar />
            <Dashboard />
        </main>
    );
}

export default AppLayout;