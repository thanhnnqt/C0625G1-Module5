import { Routes, Route } from "react-router-dom";
import ContractList from "./components/ContractList";
import ContractForm from "./components/ContractForm";

export default function ContractRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ContractList />} />
            <Route path="add" element={<ContractForm />} />
            <Route path="edit/:id" element={<ContractForm />} />
        </Routes>
    );
}
