import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import ActionLibrary from "./pages/ActionLibrary";
import TemplateLibrary from "./pages/TemplateLibrary";

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
                    <Route
                        path="/templates"
                        element={<TemplateLibrary />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;