export const loginSuccess = (userInfo) => {
    return{
        type: "LOGIN_SUCCESS",
        payload: userInfo
    }
}
export const logout = () => {
    return {
        type: "LOGOUT",
        payload: null
    }
}