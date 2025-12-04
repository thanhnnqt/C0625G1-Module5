import {deleteById} from "../service/playerService.jsx";
import {Button, Modal} from "react-bootstrap";
import React from "react";

const DeleteComponent = ({closeModal, deletePlayer, showModal}) => {
    const handleClose = () => {
        closeModal();
    }

    const handleDelete = () => {
        deleteById(deletePlayer.id);
        closeModal();
    }

    return(
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn muốn xoá cầu thủ <span className={'text-danger'}>{deletePlayer.name}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteComponent;