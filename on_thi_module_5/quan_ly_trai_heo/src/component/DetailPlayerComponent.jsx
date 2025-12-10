import {Button} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {detailById} from "../service/playerService.jsx";

const DetailPlayerComponent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [player, setPlayer] = useState(null);
    useEffect(() => {
        const fetData = async () => {
            const data = await detailById(Number(id));
            setPlayer(data);
        };
        fetData();
    }, [id]);

    if (!player) return <p>Loading...</p>;

    return (
        <>
            <h1>Thông tin heo</h1>
            <p><b>ID:</b> {player.id}</p>
            <p><b>Mã heo:</b> {player.pId}</p>
            <p><b>Ngày nhập chuồng:</b> {player.startDay}</p>
            <p><b>Ngày xuất chuồng:</b> {player.endDay}</p>
            <p><b>Trọng lượng nhập chuồng:</b> {player.startWeight}</p>
            <p><b>Trọng lượng xuất chuồng:</b> {player.endWeight}</p>
            <p><b>Xuất xứ:</b> {player.country?.origin}</p>
            <Button onClick={() => navigate("/")}>Quay lại danh sách</Button>
        </>
    );
}

export default DetailPlayerComponent;
