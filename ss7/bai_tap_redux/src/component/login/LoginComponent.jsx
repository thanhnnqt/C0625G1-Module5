import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { login } from "../../service/userService.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/action.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function LoginComponent() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!username || !password) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const result = await login(username, password);
            if (result) {
                dispatch(loginSuccess(result));
                toast.success("Đăng nhập thành công!");
                navigate("/");
            } else {
                toast.error("Sai username hoặc password!");
            }
        } catch (e) {
            toast.error("Lỗi server, vui lòng thử lại!");
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <form
                className="p-4 rounded shadow"
                style={{ backgroundColor: "#f7f7f7", width: "380px" }}
                onSubmit={(e) => e.preventDefault()}>
                <h3 className="text-center mb-4">Đăng nhập</h3>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        ref={usernameRef}
                        type="text"
                        className="form-control"
                        placeholder="Nhập username..."
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        ref={passwordRef}
                        type="password"
                        className="form-control"
                        placeholder="Nhập password..."
                    />
                </div>

                {/* Button */}
                <div className="d-flex justify-content-center mt-4">
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="btn btn-success w-50"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;
