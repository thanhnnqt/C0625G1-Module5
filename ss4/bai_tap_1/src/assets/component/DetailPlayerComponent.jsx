import {Button, Modal} from "react-bootstrap";
import React from "react";

const DetailPlayerComponent = ({showDetailModal, closeDetailModal, detailPlayer}) => {

    const handleClose = () => {
        closeDetailModal();
    }

    return (
        <>
            <Modal show={showDetailModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin cầu thủ</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p><b>ID:</b> {detailPlayer.id}</p>
                    <p><b>Mã cầu thủ:</b> {detailPlayer.pId}</p>
                    <p><b>Tên:</b> {detailPlayer.name}</p>
                    <p><b>Năm sinh:</b> {detailPlayer.dob}</p>
                    <p><b>Giá trị:</b> {detailPlayer.value}</p>
                    <p><b>Vị trí:</b> {detailPlayer.location}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailPlayerComponent;
