import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContracts, deleteContract } from "../service/contractService";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../customer/service/customerService";
import { getAllFacilities } from "../../facility/service/facilityService";

export default function ContractList() {
    const [contracts, setContracts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [showDelete, setShowDelete] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);

    const pageSize = 5;
    const [customerMap, setCustomerMap] = useState({});
    const [facilityMap, setFacilityMap] = useState({});

    useEffect(() => {
        loadData();
    }, [page]);
    const loadData = async () => {
        try {
            const res = await getContracts(page, pageSize);
            setContracts(res.data);
            setTotal(Number(res.headers["x-total-count"]));
        } catch (e) {
            toast.error("Lỗi tải danh sách hợp đồng");
        }
    };
    const handleDelete = async () => {
        try {
            await deleteContract(selectedContract.id);
            toast.success("Xoá thành công");
            setShowDelete(false);
            loadData();
        } catch {
            toast.error("Lỗi xoá hợp đồng");
        }
    };
    useEffect(() => {
        loadMappings();
    }, []);

    const loadMappings = async () => {
        try {
            const customerRes = await getAllCustomers();
            const facilityRes = await getAllFacilities();

            // Tạo map ID -> Name
            const cMap = {};
            customerRes.data.forEach(c => {
                cMap[c.id] = c.fullName;
            });

            const fMap = {};
            facilityRes.data.forEach(f => {
                fMap[f.id] = f.name;
            });

            setCustomerMap(cMap);
            setFacilityMap(fMap);
        } catch (e) {
            toast.error("Lỗi tải danh sách khách hàng hoặc dịch vụ");
        }
    };
    const totalPages = Math.ceil(total / pageSize);
    return (
        <div>
            <h2 className="mb-3">Danh sách hợp đồng</h2>
            <Link to="/contracts/add" className="btn btn-primary mb-3">
                + Tạo hợp đồng
            </Link>
            <table className="table table-bordered table-striped shadow-sm rounded overflow-hidden">
                <thead>
                <tr>
                    <th>Số hợp đồng</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Tiền đặt cọc</th>
                    <th>Tổng tiền</th>
                    <th>Tên khách hàng</th>
                    <th>Tên dịch vụ</th>
                    <th>Chức năng</th>
                </tr>
                </thead>
                <tbody>
                {contracts.map((c) => (
                    <tr key={c.id}>
                        <td>{c.contractNumber}</td>
                        <td>{c.startDate}</td>
                        <td>{c.endDate}</td>
                        <td>{c.deposit}</td>
                        <td>{c.totalPayment}</td>
                        <td>{customerMap[c.customerId]}</td>
                        <td>{facilityMap[c.facilityId]}</td>
                        <td>
                            <Link to={`/contracts/edit/${c.id}`} className="btn btn-warning me-2">
                                Sửa
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setSelectedContract(c);
                                    setShowDelete(true);
                                }}>
                                Xoá
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="d-flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        className={`btn btn-sm ${p === page ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setPage(p)}>
                        {p}
                    </button>
                ))}
            </div>
            <DeleteModal
                show={showDelete}
                onHide={() => setShowDelete(false)}
                onConfirm={handleDelete}
                contract={selectedContract}/>
        </div>
    );
}
