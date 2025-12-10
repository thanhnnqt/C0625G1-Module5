import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL_API, getAll } from "../service/playerService.jsx";
import DeleteComponent from "./DeletePlayerComponent.jsx";
import { useNavigate } from "react-router-dom";

const ListPlayerComponent = () => {
    const [playerList, setPlayerList] = useState([]);
    const [deletePlayer, setDeletePlayer] = useState({ id: 0, name: "" });
    const [showModal, setShowModal] = useState(false);
    const [reloading, setReloading] = useState(false);

    const teamRef = useRef(null);
    const searchNameRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetData = async () => {
            const data = await getAll();
            setPlayerList(data || []);
        };
        fetData();
    }, [reloading]);

    const handleShowModal = (player) => {
        setDeletePlayer(player);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setReloading((pre) => !pre);
    };

    const handleSearchName = async () => {
        const keyword = (searchNameRef.current?.value || "").trim();
        const team = (teamRef.current?.value || "").trim();
        let params = [];
        if (keyword) params.push(`name_like=${encodeURIComponent(keyword)}`);
        if (team) params.push(`teams.teamName_like=${encodeURIComponent(team)}`);
        const query = params.length ? `?${params.join("&")}` : "";

        try {
            const res = await axios.get(`${URL_API}/players${query}`);
            setPlayerList(res.data || []);
        } catch (e) {
            console.error("Search error:", e.message);
            const all = await getAll();
            const filtered = (all || []).filter((p) => {
                const matchName = keyword ? p.name?.toLowerCase().includes(keyword.toLowerCase()) : true;
                const matchTeam = team ? (p.teams?.teamName || "").toLowerCase().includes(team.toLowerCase()) : true;
                return matchName && matchTeam;
            });
            setPlayerList(filtered);
        }
    };

    const goToDetail = (id) => {
        navigate(`/detail/${id}`);
    };
    const goToUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    return (
        <div className="container my-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">Danh sách cầu thủ</h2>
                <div>
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/add")}>
                        Thêm cầu thủ
                    </button>
                </div>
            </div>
                    <div className="row g-2 align-items-center">
                        <div className="col-sm-6 col-md-5 mb-3">
                            <div>
                                <input
                                    ref={searchNameRef}
                                    type="text"
                                    className="form-control"
                                    id="searchName"
                                    placeholder="Tìm theo tên"/>
                            </div>
                        </div>

                        <div className="col-sm-4 col-md-3 mb-3">
                            <select ref={teamRef} className="form-select" defaultValue="">
                                <option value="">-- Đội bóng --</option>
                                <option value="Barcelona">Barcelona</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Atletico Madrid">Atletico Madrid</option>
                            </select>
                        </div>

                        <div className="col-sm-12 col-md-4 d-flex gap-2 mb-3">
                            <button className="btn btn-primary" onClick={handleSearchName}>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div style={{ maxHeight: "60vh", overflow: "auto" }}>
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Mã</th>
                                <th scope="col">Tên cầu thủ</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Giá trị</th>
                                <th scope="col">Vị trí</th>
                                <th scope="col">Đội bóng</th>
                                <th scope="col" style={{ minWidth: 170 }}>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {playerList.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="text-center py-4">
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            )}

                            {playerList.map((player, i) => (
                                <tr key={player.id}>
                                    <td>{i + 1}</td>
                                    <td>{player.id}</td>
                                    <td>{player.pId}</td>
                                    <td>{player.name}</td>
                                    <td>{player.dob}</td>
                                    <td>{player.value}</td>
                                    <td>{player.location}</td>
                                    <td>{player.teams?.teamName || "-"}</td>
                                    <td>
                                        <div className="btn-group" role="group" aria-label="actions">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => goToDetail(player.id)}>
                                                Chi tiết
                                            </button>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => goToUpdate(player.id)}>
                                                Sửa
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleShowModal(player)}>
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
            {showModal && (
                <DeleteComponent deletePlayer={deletePlayer} showModal={showModal} closeModal={closeModal} />
            )}
        </div>
    );
};

export default ListPlayerComponent;
