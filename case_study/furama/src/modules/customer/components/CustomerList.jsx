import {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import {getCustomers, deleteCustomer, searchByNameContaining} from "../service/customerService";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import api from "../../../api/apiClient.jsx";
import {Field} from "formik";

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    // const [customertype, setCustomerType] = useState({
    //     type: ""
    // });
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const searchNameRef = useRef(null);
    const customerTypeRef = useRef(null);
    const pageSize = 5;

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const res = await getCustomers(page, pageSize);
            setCustomers(res.data);
            setTotal(Number(res.headers["x-total-count"]));
        } catch (e) {
            toast.error("Lỗi tải dữ liệu");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCustomer(selectedCustomer.id);
            toast.success("Xoá thành công");
            setShowDelete(false);
            loadData();
        } catch (e) {
            toast.error("Lỗi xoá khách hàng");
        }
    };

    const handleSearchName = async () => {
        const keyword = searchNameRef.current.value.trim();
        const type = customerTypeRef.current.value;

        let query = "/customers?";

        if (keyword) query += `fullName_like=${keyword}&`;
        if (type) query += `type_like=${type}&`;

        const res = await api.get(query);
        setCustomers(res.data);
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="row align-items-center mb-3">
            <h1>Danh sách khách hàng</h1>
            <div className="col-md-4 mb-3">
                <input
                    ref={searchNameRef}
                    placeholder="Nhập tên khách hàng"
                    className="form-control"
                />
            </div>

            <div className="col-md-3 mb-3">
                <select
                    ref={customerTypeRef}
                    className="form-select"
                    defaultValue="">
                    <option value="">-- Loại khách --</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Platinium">Platinium</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Member">Member</option>
                </select>
            </div>

            <div className="col-md-2 mb-3">
                <button className="btn btn-info w-100" onClick={handleSearchName}>
                    Tìm kiếm
                </button>
            </div>
            {/*<Field as={'select'} name={"type"}>*/}
            {/*    <option value="">--- ---Chọn lớp---------- </option>*/}
            {/*    {*/}
            {/*        customers&&customers.map((type)=>(*/}
            {/*            <option key={type.id} value={JSON.stringify(type)}>{type.name}</option>)*/}
            {/*        )*/}
            {/*    }*/}
            {/*</Field>*/}
            <Link to="/customers/add" className="btn btn-primary mb-3 col-md-3">
                + Thêm khách hàng
            </Link>

            <table className="table table-bordered table-striped shadow-sm rounded overflow-hidden">
                <thead>
                <tr>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>SDT</th>
                    <th>Email</th>
                    <th>Loại khách</th>
                    <th>Chức năng</th>
                </tr>
                </thead>

                <tbody>
                {customers.map((c) => (
                    <tr key={c.id}>
                        <td>{c.fullName}</td>
                        <td>{c.birthDate}</td>
                        <td>{c.gender}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.type}</td>
                        <td>
                            <Link to={`/customers/edit/${c.id}`} className="btn btn-warning me-2">
                                Sửa
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setSelectedCustomer(c);
                                    setShowDelete(true);
                                }}>
                                Xoá
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Phân trang đơn giản */}
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
                customer={selectedCustomer}/>
        </div>
    );
}
