import { loginUser } from '../constant';
import axios from '../helpers/axios'

const loginUserRequest = () => {
    return {
        type: loginUser.LOGIN_USER_REQUEST
    }
}

const loginUserSucess = (payload) => {
    return {
        type: loginUser.LOGIN_USER_SUCCESSFUL,
        payload
    }
}

const loginUserFailed = (payload) => {
    return {
        type: loginUser.LOGIN_USER_FAILED,
        payload
    }
}

const logoutUserSuccess = () => {
    return {
        type: loginUser.LOGOUT_USER_SUCCESS,

    }
}


export const loginAction = (data) => {
    return async (dispatch) => {
        dispatch(loginUserRequest())
        try {
            const res = await axios.post('/signin', { ...data });

            if (res.status === 200) {
                console.log(res.data)
                const { token, userData } = res.data
                localStorage.setItem("token", token);
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(loginUserSucess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(loginUserFailed(error.response.data))
            }
        }
    }
}


export const logOutUserAction = () => {
    return async (dispatch) => {
        dispatch(loginUserRequest())
        try {
            const res = await axios.post('/signout');
            console.log(res.data)
            if (res.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
                dispatch(logoutUserSuccess())
            }


        } catch (error) {
            // if (error.response) {
            //     console.log(error.response.data)
            //     dispatch(loginUserFailed(error.response.data))
            // }
        }
    }
}


export const isUserLoggedIn = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const userData = JSON.parse(localStorage.getItem('user'));
            const data = { token, userData }
            dispatch(loginUserSucess(data))
        }
        else {
            dispatch(loginUserFailed("!Ooops, something went wrong, try login again"))
        }
    }
}