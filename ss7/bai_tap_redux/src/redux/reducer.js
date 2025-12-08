import {combineReducers} from "redux";

const initAuth = {
    account: null
}
export const authReducer = (state = initAuth, action) => {
    switch (action.type){
        case "LOGIN_SUCCESS":
            return {
                ...state,
                account: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                account: null
            }
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    auth: authReducer
})