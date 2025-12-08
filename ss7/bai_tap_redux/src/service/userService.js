import axios from "axios";

const URL_BE = "http://localhost:3001";
export async function login(username,password){
    try{
        const response = await axios.get(`${URL_BE}/users?username=${username}`);
        if (response.data.length===0){
            console.log("tài khoản không tồn tại")
            return null;
        }
        if (response.data[0].password===password){
            return response.data[0];
        }else {
            console.log("sai mật khẩu")
            return null;
        }
    }catch (e) {
        console.log(e.message);
    }
    return null;
}