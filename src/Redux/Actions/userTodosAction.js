import { getUserTodos } from '../constant';
import axios from '../helpers/axios'

const getUserTodosRequest = () => {
    return {
        type: getUserTodos.GET_USER_TODOS_REQUEST
    }
}

const getUserTodosSuccess = (payload) => {
    return {
        type: getUserTodos.GET_USER_TODOS_SUCCESS,
        payload
    }
}

const getUserTodosFailed = (payload) => {
    return {
        type: getUserTodos.GET_USER_TODOS_FAILED,
        payload
    }
}

const addtitleSuccess = (payload) => {
    return {
        type: getUserTodos.ADD_TITLE_SUCCESS,
        payload
    }
}


const addbodySuccess = (payload) => {
    return {
        type: getUserTodos.ADD_TODOBODY_SUCCESS,
        payload
    }
}



const deleteBodySuccess = (payload) => {
    return {
        type: getUserTodos.DELETE_TODOBODY_SUCCESS,
        payload
    }
}


const shareTaskSuccess = (payload) => {
    return {
        type: getUserTodos.SHARE_TASK_SUCCESS,
        payload
    }
}


const authorizeUser = (payload) => {
    return {
        type: getUserTodos.AUTHORIZE_USER_SUCCESS,
        payload
    }
}

export const getUserTodosAction = () => {
    const token = localStorage.getItem('token');
    return async (dispatch) => {
        dispatch(getUserTodosRequest())
        try {
            const res = await axios.get('/getusertodos',
                // {
                //     headers: {
                //         Authorization: token ? `Bearer ${token}` : '',
                //     },
                // }
            );
            if (res.status === 200) {
                console.log(res.data)

                dispatch(getUserTodosSuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}



export const addTitleAction = (data) => {
    return async (dispatch) => {
        dispatch(getUserTodosRequest())
        try {
            const res = await axios.post('/todotitle/create', { ...data });

            if (res.status === 201) {
                console.log(res.data.todoLabel)
                dispatch(addtitleSuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}

// const data = {
//     newTodobody: {
//         complete: false,
//         _id: "5fd68c8e04082e09109cd9c2",
//         todo: "it is nice again",
//         date: "Sun Dec 13 2020 22:50:06 GMT+0100 (West Africa Standard Time)",
//         createdAt: "2020-12-13T21:50:06.494Z",
//         updatedAt: "2020-12-13T21:50:06.494Z",
//         "__v": 0
//     },
//     titleId: "5fd42238be676235bc729603"
// }

export const addBodyToTitleAction = (data) => {
    return async (dispatch) => {
        dispatch(getUserTodosRequest())
        try {
            const res = await axios.post('/todobody/create', { ...data });
            // dispatch(addbodySuccess(data))
            if (res.status === 201) {
                console.log(res.data)
                dispatch(addbodySuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}



export const delteBodyOfTitleAction = (data) => {
    return async (dispatch) => {
        // console.log(data)
        dispatch(getUserTodosRequest())
        try {
            const res = await axios
                .delete('/todobody/deletetodobody', {
                    data: {
                        todotitleId: data.titleId,
                        todobodyId: data.taskId
                    }
                });
            if (res.status === 200) {
                console.log(res.data)
                dispatch(deleteBodySuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}



// const todoTitle = {
//     todoBody: [],
//     pin: false,
//     hide: false,
//     _id: "5fd48d56cbb25f46e06a34e4",
//     user: [
//         {
//             approved: true,
//             authorization: "admin",
//             _id: "5fe13e9b5078651c5c7ac8fd",
//             userid: "5fd0255726738f25242d5104",
//             email: "admin@gmail.com"
//         }
//     ],
//     title: "days to remeber",

// }
//add new users to userstodo
export const shareTaskAction = (data) => {
    return async (dispatch) => {
        // console.log(data)
        dispatch(getUserTodosRequest())
        try {
            const res = await axios
                .post('/addnewusertolabel', {
                    ...data
                });
            if (res.status === 201) {
                console.log(res.data)
                dispatch(shareTaskSuccess(res.data))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}

//AUTHORIZE USER && UNAUHORIZE USER
export const authorizeUserAction = (data) => {
    return async (dispatch) => {
        ///console.log(data)
        dispatch(getUserTodosRequest())
        try {
            const res = await axios
                .put('/todolabel/approveduser', {
                    ...data
                });
            if (res.status === 200) {
                console.log(res.data)
                const response = {
                    data,
                    message: res.data.message
                }
                dispatch(authorizeUser(response))
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                dispatch(getUserTodosFailed(error.response.data))
            }
        }
    }
}