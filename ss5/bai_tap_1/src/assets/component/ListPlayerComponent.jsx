import {useEffect, useRef, useState} from "react";
import {detailById, getAll, searchByNameContaining} from "../service/playerService.jsx";
import DeleteComponent from "./DeletePlayerComponent.jsx";
import DetailPlayerComponent from "./DetailPlayerComponent.jsx";
import { useNavigate } from "react-router-dom";

const ListPlayerComponent = () => {
    const [playerList, setPlayerList] = useState(null);
    const [deletePlayer, setDeletePlayer] = useState({id: 0, name: ""});
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [detailPlayer, setDetailPlayer] = useState(null);

    const searchNameRef = useRef(null);

    useEffect(() => {
        setPlayerList(getAll());
    }, [reloading]);

    const handleShowModal = (player) => {
        setDeletePlayer(player);
        setShowModal(true);
    }

    const closeModal = () => {
        setReloading(pre => !pre);
        setShowModal(false);
    }

    const handleSearchName = () => {
        const keyword = searchNameRef.current.value.trim();
        const results = searchByNameContaining(keyword);
        setPlayerList(results);
    }

    const handleShowDetailModal = (player) => {
        setDetailPlayer(player);
        setShowDetailModal(true);
    }

    const closeDetailModal = () => {
        setShowDetailModal(false);
    };

    const navigate = useNavigate();

    const goToDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <>
            <h1>Danh sách cầu thủ</h1>
            <input ref={searchNameRef}/>
            <button onClick={handleSearchName}>Tìm kiếm</button>
            <table className="table table-dark">
                <thead>
                <tr>
                    <td>STT</td>
                    <td>ID</td>
                    <td>Mã cầu thủ</td>
                    <td>Tên cầu thủ</td>
                    <td>Ngày sinh</td>
                    <td>Giá trị chuyển nhượng</td>
                    <td>Vị trí</td>
                    <td>Hành động</td>
                </tr>
                </thead>
                <tbody>
                {
                    playerList && playerList.map((player, i) => (
                        <tr key={player.id}>
                            <td>{i + 1}</td>
                            <td>{player.id}</td>
                            <td>{player.pId}</td>
                            <td>{player.name}</td>
                            <td>{player.dob}</td>
                            <td>{player.value}</td>
                            <td>{player.location}</td>
                            <td>
                                <button onClick={() => {
                                    handleShowModal(player)
                                }} className={'btn btn-sm btn-danger'}>Xóa
                                </button>
                                <button onClick={() => goToDetail(player.id)}
                                className="btn btn-sm btn-primary" >Chi tiết
                                </button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {showModal &&
                <DeleteComponent deletePlayer={deletePlayer}
                                 showModal={showModal}
                                 closeModal={closeModal}
                />
            }
            {showDetailModal &&
                <DetailPlayerComponent
                    showDetailModal={showDetailModal}
                    closeDetailModal={closeDetailModal}
                    detailPlayer={detailPlayer}
                />
            }
        </>
    );
}
export default ListPlayerComponent;