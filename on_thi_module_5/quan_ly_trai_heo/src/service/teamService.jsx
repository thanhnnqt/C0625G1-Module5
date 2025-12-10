import axios from "axios";

const URL_API = "http://localhost:3001";

export async function getAllTeam() {
    try{
        const response = await axios.get(`${URL_API}/teams`);
        return response.data;
    }catch (e) {
        console.log(e.message);
    }
    return [];
}