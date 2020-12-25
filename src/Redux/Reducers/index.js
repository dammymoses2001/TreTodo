import { combineReducers } from 'redux'
import loginReducer from './authReducer'
import getUserTodos from './userTodosReducer'
import notUserTodo from './otherTodosReducer'
const rootReducer = combineReducers({
    Auth: loginReducer,
    Todos: getUserTodos,
    notUserTodo: notUserTodo
})

export default rootReducer