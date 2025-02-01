import { BrowserRouter, Route, Routes } from "react-router-dom";
import BreakdownPage from "./pages/BreakdownPage";
import Dashboard from './pages/Dashboard';
import Layout from './pages/_Layout';
import Pages from "./types/Pages";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path={Pages.Breakdown} element={<BreakdownPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App
