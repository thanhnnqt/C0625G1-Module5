import api from "../../../api/apiClient";

// Lấy danh sách khách hàng (KHÔNG PHÂN TRANG)
export const getCustomers = async () => {
    return await api.get("/customers");
}

// Lấy theo ID
export const getCustomerById = (id) =>
    api.get(`/customers/${id}`);

// Thêm mới
export const addCustomer = (data) =>
    api.post("/customers", data);

// Cập nhật
export const updateCustomer = (id, data) =>
    api.put(`/customers/${id}`, data);

// Xoá
export const deleteCustomer = (id) =>
    api.delete(`/customers/${id}`);
