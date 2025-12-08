import { Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/action.js";

export default function HeadComponent() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">
                    Danh sách cầu thủ
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add">
                                Thêm mới
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            {!auth.account && <li className="nav-item">
                                <Link className="nav-link" to={'/login'}>Login</Link>
                            </li>}
                            {auth.account&& <li className="nav-item">
                                <span onClick={handleLogout} className="nav-link">Logout</span>
                            </li>}
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">{auth?.account?.username}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
