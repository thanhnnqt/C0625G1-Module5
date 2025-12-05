import axios from "axios";

const URL_API = "http://localhost:3001";

export async function getAll() {
    try{
        const response = await axios.get(`${URL_API}/players`);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}

export async function addNew(player) {
    try{
        const response = await axios.post(`${URL_API}/players`, player);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}

export async function deleteById(id) {
    try{
        const response = await axios.delete(`${URL_API}/players/${id}`);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}

export async function detailById(id){
    try{
        const response = await axios.get(`${URL_API}/players/${id}`);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}

export async function searchByNameContaining(keyword) {
    try {
        const response = await axios.get(`${URL_API}/players?name_like=${keyword}`);
        return response.data;
    } catch (e) {
        console.log(e.message);
        return [];
    }
}

export async function updateById(id, player){
    try{
        const response = await axios.put(`${URL_API}/players/${id}`,player);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}

export async function searchByTeamId(teamId) {
    try {
        const response = await axios.get(`${URL_API}/players`);
        const players = response.data;

        // Lọc theo team id
        return players.filter(p => p.teams && p.teams.id === Number(teamId));

    } catch (e) {
        console.log(e.message);
        return [];
    }
}