import { loginUser } from '../constant';


const initialState = {
    token: '',
    user: {},
    isAuthenticated: false,
    loading: '',
    message: '',
    error: null
}


const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginUser.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case loginUser.LOGIN_USER_SUCCESSFUL:
            ///console.log(action.payload)
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.userData,
                isAuthenticated: true,
                loading: false
            }
        case loginUser.LOGIN_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }
        case loginUser.LOGOUT_USER_SUCCESS:
            return {
                ...initialState,
                loading: false,
            }
        default: return state
    }
}

export default loginReducer