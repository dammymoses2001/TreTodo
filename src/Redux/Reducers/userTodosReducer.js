import { getUserTodos } from '../constant';


const initialState = {
    todos: [],
    loading: false,
    message: '',
    error: null
}

//adding tasks to task title
function addTodoBody(existingTodos, task, titleId) {
    // console.log(existingTodos, task, titleId)
    const todoBody = [];
    for (let todo of existingTodos) {
        if (todo._id === titleId) {
            todoBody.push({
                ...todo,
                todoBody: [...todo.todoBody, task]
            })
        }
        else {
            todoBody.push(todo)
        }
    }
    return todoBody;
}

//delet tasks from task title
function deleteTodoBody(existingTodos, titleId, taskId) {
    //console.log(existingTodos, taskId, titleId)
    const todoBody = [];
    for (let todo of existingTodos) {
        if (todo._id === titleId) {
            const newTodobody = todo.todoBody.filter(todo => todo._id !== taskId);
            todoBody.push({ ...todo, todoBody: newTodobody });
        }
        else {
            todoBody.push(todo)
        }
    }
    // console.log(todoBody)
    return todoBody;
}

//share todo with user
function addUsertoTask(existingTodos, newTodos) {
    const todoBody = []
    const update = existingTodos.filter(todo => todo._id !== newTodos._id)
    //console.log(update)
    todoBody.push(...update, newTodos)
    //console.log(todoBody)
    return todoBody
}

//authorize user
function userAuthorization(existingTodos, data) {
    let user = [];
    // console.log(otherTodos[0])
    existingTodos.forEach(todo => {
        if (todo._id === data.labelId) {
            user.push(
                {
                    ...todo,
                    user: todo.user.map(user => {
                        if (user.email === data.email) {
                            return { ...user, approved: !user.approved }
                        }
                        else {
                            return user
                        }
                    })
                }
            )
        }
        else {
            user.push(todo)
        }
    })
    return (user)
}



const getUserTodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case getUserTodos.GET_USER_TODOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case getUserTodos.GET_USER_TODOS_SUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                todos: action.payload.todolist,
                loading: false,
                message: action.payload.message
            }
        case getUserTodos.ADD_TITLE_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, action.payload.todoLabel],
            }
        case getUserTodos.ADD_TODOBODY_SUCCESS:
            const { newTodobody, titleId, message } = action.payload
            const todoBody = addTodoBody(state.todos, newTodobody, titleId)
            return {
                ...state,
                loading: false,
                todos: todoBody,
                message
            };

        case getUserTodos.DELETE_TODOBODY_SUCCESS:
            // { titleId, bodyId, message } = action.payload
            const newtodoBody = deleteTodoBody(state.todos, action.payload.titleId, action.payload.bodyId)
            return {
                ...state,
                loading: false,
                todos: newtodoBody,
                message: action.payload.message
            }

        case getUserTodos.SHARE_TASK_SUCCESS:
            // { titleId, bodyId, message } = action.payload
            const newUserToTask = addUsertoTask(state.todos, action.payload.todo)
            return {
                ...state,
                loading: false,
                todos: newUserToTask,
                message: action.payload.message
            }
        //approve/authorize user
        case getUserTodos.AUTHORIZE_USER_SUCCESS:
            // console.log(action.payload)
            const authorizeUser = userAuthorization(state.todos, action.payload.data)
            return {
                ...state,
                loading: false,
                todos: authorizeUser,
                message: action.payload.message
            }
        case getUserTodos.GET_USER_TODOS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }

        default: return state
    }
}

export default getUserTodosReducer