import {getAll} from "../service/customerService.jsx";
import {Component} from "react";
import DeleteComponent from "./DeleteComponent.jsx";

class ListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            showModal: false,
            deleteCustomer: {
                id: "",
                cId: "",
                name: "",
            }
        }
    }

    componentDidMount() {
        console.log("-------did mount----run----------")
        this.setState({
            customerList: [...getAll()]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.showModal !== this.state.showModal) {
            this.setState({
                customerList: [...getAll()]
            })
        }
    }

    handleShowModal = (customer) => {
        this.setState({
            showModal: true,
            deleteCustomer: {
                ...customer
            }
        })
    }
    closeModal = () => {
        this.setState({
            showModal: false,
        })
    }

    render() {
        return (
            <>
                <h1>Danh sách khách hàng</h1>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <td>STT</td>
                        <td>ID</td>
                        <td>Mã khách hàng</td>
                        <td>Tên khách hàng</td>
                        <td>Địa chỉ</td>
                        <td>Xếp hạng</td>
                        <td>Hành động</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        getAll().map((customer, i) => (
                            <tr key={customer.id}>
                                <td>{i + 1}</td>
                                <td>{customer.id}</td>
                                <td>{customer.cId}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.category}</td>
                                <td>
                                    <button onClick={() => {
                                        this.handleShowModal(customer)
                                    }} className={'btn btn-sm btn-danger'}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <DeleteComponent deleteCustomer={this.state.deleteCustomer}
                                 showModal={this.state.showModal}
                                 closeModal={this.closeModal}
                />
            </>
        );
    }
}

export default ListComponent;