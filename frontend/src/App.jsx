import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import ActionLibrary from "./pages/ActionLibrary";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                        path="/actions"
                        element={<ActionLibrary />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;