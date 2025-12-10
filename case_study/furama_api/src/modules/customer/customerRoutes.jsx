import { Routes, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="add" element={<CustomerForm />} />
            <Route path="edit/:id" element={<CustomerForm />} />
        </Routes>
    );
}
