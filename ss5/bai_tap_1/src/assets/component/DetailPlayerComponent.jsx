import {Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import {detailById} from "../service/playerService.jsx";

const DetailPlayerComponent = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const player = detailById(Number(id));

    return (
        <>
            <h1>Thông tin cầu thủ</h1>
            <p><b>ID:</b> {player.id}</p>
            <p><b>Mã cầu thủ:</b> {player.pId}</p>
            <p><b>Tên:</b> {player.name}</p>
            <p><b>Năm sinh:</b> {player.dob}</p>
            <p><b>Giá trị:</b> {player.value}</p>
            <p><b>Vị trí:</b> {player.location}</p>
            <Button onClick={() => navigate("/")}>Quay lại danh sách</Button>
        </>
    );
}

export default DetailPlayerComponent;
