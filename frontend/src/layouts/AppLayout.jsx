import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

function AppLayout() {
    return (
        <main className="min-h-screen bg-rose-100 font-spline p-4 space-y-4">
            <Navbar />

            <Outlet />
        </main>
    );
}

export default AppLayout;