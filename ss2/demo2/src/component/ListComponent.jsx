import {getAll} from "../service/customerService.jsx";

function ListComponent(){
    return(
        <>
            <h1>Danh sách khách hàng</h1>
            <table className="table table-danger">
                <thead>
                <tr>
                    <td>STT</td>
                    <td>ID</td>
                    <td>Mã khách hàng</td>
                    <td>Tên khách hàng</td>
                    <td>Địa chỉ</td>
                    <td>Xếp hạng</td>
                </tr>
                </thead>
                <tbody>
                {
                    getAll().map((customer, i)=>(
                        <tr key={customer.id}>
                            <td>{i+1}</td>
                            <td>{customer.id}</td>
                            <td>{customer.cId}</td>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.category}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}
export default ListComponent;