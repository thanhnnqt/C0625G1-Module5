import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ show, onHide, onConfirm, customer }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xoá</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Bạn có chắc chắn muốn xoá khách hàng:
                <strong> {customer?.fullName}</strong> ?
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Xoá
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
