import api from '../../../api/apiClient';

export const getFacilities = (page = 1, limit = 10) =>
    api.get(`/facilities?_page=${page}&_limit=${limit}`);

export const getFacilityById = (id) =>
    api.get(`/facilities/${id}`);

export const addFacility = (data) =>
    api.post('/facilities', data);

export const updateFacility = (id, data) =>
    api.put(`/facilities/${id}`, data);

export const deleteFacility = (id) =>
    api.delete(`/facilities/${id}`);

export async function searchByNameContaining(keyword) {
    try {
        const response = await api.get(`/facilities?fullName_like=${keyword}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}
export const getAllFacilities = () => api.get("/facilities");