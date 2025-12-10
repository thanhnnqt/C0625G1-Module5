import { Routes, Route } from "react-router-dom";
import FacilityList from "./components/FacilityList";
import FacilityForm from "./components/FacilityForm";

export default function FacilityRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FacilityList />} />
            <Route path="add" element={<FacilityForm />} />
            <Route path="edit/:id" element={<FacilityForm />} />
        </Routes>
    );
}
