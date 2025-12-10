import api from '../../../api/apiClient';

export const getContracts = (page = 1, limit = 10) =>
    api.get(`/contracts?_page=${page}&_limit=${limit}`);

export const getContractById = (id) =>
    api.get(`/contracts/${id}`);

export const addContract = (data) =>
    api.post('/contracts', data);

export const updateContract = (id, data) =>
    api.put(`/contracts/${id}`, data);

export const deleteContract = (id) =>
    api.delete(`/contracts/${id}`);
