import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function Home() {
    return (
        <div className="container-fluid py-5 px-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">Furama Resort Management</h1>
                <p className="text-muted fs-5">
                    Hệ thống quản lý khách hàng – dịch vụ – hợp đồng của Furama Đà Nẵng
                </p>
            </div>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Quản lý khách hàng</h5>
                            <p className="card-text text-muted">
                                Thêm mới, chỉnh sửa, tìm kiếm và quản lý danh sách khách hàng.
                            </p>
                            <Link to="/customers" className="btn btn-primary w-100">
                                Đi đến trang khách hàng
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Quản lý dịch vụ</h5>
                            <p className="card-text text-muted">
                                Villa, House, Room & các dịch vụ đi kèm.
                            </p>
                            <Link to="/facilities" className="btn btn-success w-100">
                                Đi đến trang dịch vụ
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card shadow-sm h-100 border-0">
                        <div className="card-body">
                            <h5 className="card-title">Quản lý hợp đồng</h5>
                            <p className="card-text text-muted">
                                Tạo hợp đồng thuê dịch vụ theo chuẩn của Furama.
                            </p>
                            <Link to="/contracts" className="btn btn-warning w-100">
                                Đi đến trang hợp đồng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
