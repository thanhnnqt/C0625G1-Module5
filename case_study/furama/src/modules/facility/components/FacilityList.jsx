import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {getFacilities, deleteFacility} from "../service/facilityService";
import DeleteModal from "./DeleteModal";
import {toast} from "react-toastify";
import api from "../../../api/apiClient.jsx";

export default function FacilityList() {
    const [facilities, setFacilities] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const [showDelete, setShowDelete] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const searchNameRef = useRef(null);
    const facilityTypeRef = useRef(null);

    const pageSize = 5;

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const res = await getFacilities(page, pageSize);
            setFacilities(res.data);
            setTotal(Number(res.headers["x-total-count"]));
        } catch (e) {
            toast.error("Lỗi tải danh sách dịch vụ");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteFacility(selectedFacility.id);
            toast.success("Xoá thành công");
            setShowDelete(false);
            loadData();
        } catch {
            toast.error("Lỗi xoá dịch vụ");
        }
    };

    const handleSearchName = async () => {
        const keyword = searchNameRef.current.value.trim();
        const type = facilityTypeRef.current.value;

        let query = "/facilities?";

        if (keyword) query += `name_like=${keyword}&`;
        if (type) query += `type_like=${type}&`;

        const res = await api.get(query);
        setFacilities(res.data);
    };

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div>
            <div className="row align-items-center mb-3">
                <h2 className="mb-3">Danh sách dịch vụ</h2>
                <div className="col-md-4 mb-3">
                    <input
                        ref={searchNameRef}
                        placeholder="Nhập tên dịch vụ"
                        className="form-control"
                    />
                </div>

                <div className="col-md-3 mb-3">
                    <select
                        ref={facilityTypeRef}
                        className="form-select"
                        defaultValue="">
                        <option value="">-- Loại dịch vụ --</option>
                        <option value="Villa">Villa</option>
                        <option value="House">House</option>
                        <option value="Room">Room</option>
                    </select>
                </div>

                <div className="col-md-2 mb-3">
                    <button className="btn btn-info w-100" onClick={handleSearchName}>
                        Tìm kiếm
                    </button>
                </div>
                <Link to="/facilities/add" className="btn btn-primary mb-3">
                    + Thêm dịch vụ
                </Link>

                <table className="table table-bordered table-striped shadow-sm rounded overflow-hidden">
                    <thead>
                    <tr>
                        <th>Tên dịch vụ</th>
                        <th>Loại</th>
                        <th>Diện tích</th>
                        <th>Chi phí</th>
                        <th>Số người tối đa</th>
                        <th>Kiểu thuê</th>
                        <th>Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {facilities.map((f) => (
                        <tr key={f.id}>
                            <td>{f.name}</td>
                            <td>{f.type}</td>
                            <td>{f.area}</td>
                            <td>{f.cost}</td>
                            <td>{f.maxPeople}</td>
                            <td>{f.rentType}</td>
                            <td>
                                <Link to={`/facilities/edit/${f.id}`} className="btn btn-warning me-2">
                                    Sửa
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        setSelectedFacility(f);
                                        setShowDelete(true);
                                    }}>
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* phân trang */}
                <div className="d-flex gap-2">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
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
                    facility={selectedFacility}/>
            </div>
        </div>
    );
}
