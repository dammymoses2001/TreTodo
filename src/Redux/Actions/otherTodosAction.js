import { otherTodos } from '../constant';
import axios from '../helpers/axios'

const getOthersTodosRequest = () => {
    return {
        type: otherTodos.OTHERS_TODO_REQUEST
    }
}

const getOthersTodosSuccess = (payload) => {
    return {
        type: otherTodos.OTHERS_TODO_SUCCESS,
        payload
    }
}

const getOthersTodosFailed = (payload) => {
    return {
        type: otherTodos.OTHERS_TODO_FAILED,
        payload
    }
}




export const getOthersTodosAction = () => {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        dispatch(getOthersTodosRequest())
        try {
            const res = await axios.get('/otherstodos',
                // {
                //     headers: {
                //         Authorization: token ? `Bearer ${token}` : '',
                //     },
                // }
            );
            if (res.status === 200) {
                console.log(res.data)

                dispatch(getOthersTodosSuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getOthersTodosFailed(error.response.data))
            }
        }
    }
}

