import {useEffect, useRef, useState} from "react";
import {getAll, searchByNameContaining} from "../service/playerService.jsx";
import DeleteComponent from "./DeletePlayerComponent.jsx";
import DetailPlayerComponent from "./DetailPlayerComponent.jsx";
import {useNavigate} from "react-router-dom";
import UpdatePlayerComponent from "./UpdatePlayerComponent.jsx";

const ListPlayerComponent = () => {
    const [playerList, setPlayerList] = useState(null);
    const [deletePlayer, setDeletePlayer] = useState({id: 0, name: ""});
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [detailPlayer] = useState(null);
    const [updatePlayer] = useState(null);

    const searchNameRef = useRef(null);

    useEffect(() => {
        const fetData = async () => {
            const data = await getAll();
            setPlayerList(data);
        }
        fetData();
    }, [reloading]);

    const handleShowModal = (player) => {
        setDeletePlayer(player);
        setShowModal(true);
    }

    const closeModal = () => {
        setReloading(pre => !pre);
        setShowModal(false);
    }

    const handleSearchName = async () => {
        const keyword = searchNameRef.current.value.trim();
        const results = await searchByNameContaining(keyword);
        setPlayerList(results);
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
    };

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const navigate = useNavigate();

    const goToDetail = (id) => {
        navigate(`/detail/${id}`);
    };
    const goToUpdate = (id) => {
        navigate(`/update/${id}`);
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
                    <td>Đội bóng</td>
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
                            <td>{player.teams.teamName}</td>
                            <td>
                                <button onClick={() => {
                                    handleShowModal(player)
                                }} className={'btn btn-sm btn-danger'}>Xóa
                                </button>
                                <button onClick={() => goToDetail(player.id)}
                                        className="btn btn-sm btn-primary">Chi tiết
                                </button>
                                <button onClick={() => goToUpdate(player.id)}
                                        className="btn btn-sm btn-info">Sửa
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
            {showUpdateModal &&
                <UpdatePlayerComponent
                    showUpdateModal={showUpdateModal}
                    closeUpdateModal={closeUpdateModal}
                    updatePlayer={updatePlayer}
                />
            }
        </>
    );
}
export default ListPlayerComponent;