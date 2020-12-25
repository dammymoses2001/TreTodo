import { otherTodos } from '../constant';


const initialState = {
    othersTodo: [],
    loading: false,
    message: '',
    error: null
}


const getOthersTodosReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case otherTodos.OTHERS_TODO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case otherTodos.OTHERS_TODO_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                othersTodo: action.payload.otherTodos,
                loading: false,
                message: action.payload.message
            }
        case otherTodos.CLEAR_TODO_SUCCESS:
            return {
                ...initialState,
                loading: false,

            }

        default: return state
    }
}

export default getOthersTodosReducer