import {Component} from "react";
import {Button, Modal} from "react-bootstrap";
import {deleteById} from "../service/customerService.jsx";

class DeleteComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleClose = () => {
        this.props.closeModal();
    }
    handleDelete = () => {
        deleteById(this.props.deleteCustomer.id);
        this.props.closeModal();
        // xoá
    }

    render() {
        return (
            <>
                <Modal show={this.props.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Xóa khách hàng {this.props.deleteCustomer.id}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={this.handleDelete}>
                            Xóa
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default DeleteComponent;