import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import CustomerRoutes from "./modules/customer/customerRoutes";
import FacilityRoutes from "./modules/facility/facilityRoutes";
import ContractRoutes from "./modules/contract/contractRoutes";

function App() {
    return (
        <>
            <Header />
            <main className="mt-4 mb-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers/*" element={<CustomerRoutes />} />
                    <Route path="/facilities/*" element={<FacilityRoutes />} />
                    <Route path="/contracts/*" element={<ContractRoutes />} />
                    <Route path="*" element={<h2 className="text-danger">404 - Not Found</h2>} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
