import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ show, onHide, onConfirm, facility }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xoá dịch vụ</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Bạn có chắc muốn xoá dịch vụ:
                <strong> {facility?.name}</strong> ?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Hủy</Button>
                <Button variant="danger" onClick={onConfirm}>Xoá</Button>
            </Modal.Footer>
        </Modal>
    );
}
