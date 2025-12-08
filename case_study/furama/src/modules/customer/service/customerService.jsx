import api from '../../../api/apiClient';
import axios from "axios";

export const getCustomers = (page = 1, limit = 10) =>
    api.get(`/customers?_page=${page}&_limit=${limit}`);

export const getCustomerById = (id) =>
    api.get(`/customers/${id}`);

export const addCustomer = (data) =>
    api.post('/customers', data);

export const updateCustomer = (id, data) =>
    api.put(`/customers/${id}`, data);

export const deleteCustomer = (id) =>
    api.delete(`/customers/${id}`);

export async function searchByNameContaining(keyword) {
    try {
        const response = await api.get(`/customers?fullName_like=${keyword}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}
export const getAllCustomers = () => api.get("/customers");