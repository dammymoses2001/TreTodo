import React, { useState, useEffect } from 'react'
import Layout from '../../Components/Layout'
import { useSelector, useDispatch } from 'react-redux';
import { addTitleAction, addBodyToTitleAction, delteBodyOfTitleAction } from '../../Redux/Actions';
import { Form, Row, Col, Button, Accordion, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { IoMdAddCircleOutline, IoIosTrash, IoIosPin } from 'react-icons/io';
import { getUserTodosAction } from '../../Redux/Actions'
// import { } from 'react-icons/fa'

import Modal from '../../Components/UI/Modal';
import Footer from '../../Components/Footer';
import Input from '../../Components/UI/Input';
import TextArea from '../../Components/UI/TextArea';
import ButtonUI from '../../Components/UI/Button'




const notHidden = (Todos, handleShowTodo, handleDeleteModal) => {
    const sortTodo = Todos.sort((a, b) => b.pin - a.pin)
    const TodoList = sortTodo.filter(todo => todo.hide !== true);
    return TodoList.map(todo =>
        < div key={todo._id} style={{ overflow: 'hidden' }}>
            <Row key={todo._id} >
                <Col xs={2}>
                    <Form.Control type={"checkbox"}
                    // todoBody.find(todo => todo.complete === false ? checked : null)
                    // checked={todo.todoBody.find(todo => todo.complete == false ? false : true)}
                    />
                </Col>
                <Col xs={6} >
                    <Accordion defaultActiveKey="0">
                        <div>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                {todo.title}
                            </Accordion.Toggle>
                        </div>
                        {todo.todoBody.map(subtodo =>
                            <Accordion.Collapse eventKey="1" key={subtodo._id} >
                                <div key={subtodo._id}>
                                    <Row className='mx-2'>
                                        <Col xs={2}>

                                            <Form.Control type={"checkbox"} checked={subtodo.complete}
                                                onChange={(e) => console.log(e.target.checked)} />
                                        </Col>
                                        <Col xs={8} >

                                            <p className='text-info ' key={subtodo._id}> {subtodo.todo}</p>

                                        </Col>
                                        <Col xs={2}>

                                            <IoIosTrash style={{ color: 'blue', cursor: 'pointer' }}
                                                onClick={() =>
                                                    handleDeleteModal(subtodo, todo._id)}
                                            />
                                        </Col>

                                    </Row>
                                </div>
                            </Accordion.Collapse>
                        )}

                    </Accordion>

                </Col>
                <Col xs={2}>
                    {/* <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }} overlay={renderTooltip}> */}
                    < IoMdAddCircleOutline style={todo.todoBody.length > 0 ? { color: 'green', cursor: '#5cb85c' }
                        : { color: '#f0ad4e', cursor: 'pointer' }}
                        onClick={() => handleShowTodo(todo._id, todo.title)}
                    />
                    {/* </OverlayTrigger> */}


                </Col>
                <Col xs={2}>
                    {todo.pin ? <IoIosPin /> : null}
                </Col>
            </Row>
        </div>


    )

}


function Home() {
    //use Effect
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserTodosAction())
    }, [])

    //react-redux
    const Todos = useSelector(state => state.Todos)
    // console.log(Todos)

    //todotitle
    const [showNote, setShowNote] = useState(false);
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");
    //todoTodo
    const [todo, setTodo] = useState("");
    const [titleId, setTitleId] = useState(null)
    const [bodyTitle, setBodyTitle] = useState("")
    //delete task
    const [taskId, setTaskId] = useState(null);
    const [taskName, setTaskName] = useState("")
    //
    const [errorMessage, setErrormessage] = useState("")
    //modal
    //modal for adding title
    const [show, setShow] = useState(false);
    const [close, setClose] = useState(false)
    const handleClose = () => {
        if (title === "" || title === " ") {
            setErrormessage("Title field is mandatory");
            setInterval(() => {
                setErrormessage("")
            }, 5000)
        }
        else {
            setShow(false)
            const data = {
                title, note
            }
            dispatch(addTitleAction(data))
            setTitle("");
            setNote("");
        }

    };

    const handleShow = () => setShow(true);
    const handleCloseicon = () => setShow(false)
    //modal for adding to the task 
    const [showTodo, setShowTodo] = useState(false);
    const [closeTodo, setCloseTodo] = useState(false);

    const handleCloseTodo = () => {

        if (todo === "" || todo === " " || titleId === "" || titleId === " ") {
            setErrormessage('All field are mandatory')
        }
        else {
            const data = {
                todo,
                labelId: titleId
            }
            // console.log(data)
            setShowTodo(false)
            dispatch(addBodyToTitleAction(data))
            setTodo("");
            setTitleId("")
        }

    };
    const handleShowTodo = (id, body) => {
        setTitleId(id)
        setBodyTitle(body)
        setShowTodo(true);

    };
    const handleCloseTodoicon1 = () => setShowTodo(false)
    //

    //modal for deleting
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [closeDeleteModal, setCloseDeleteModal] = useState(false);

    const handleCloseDeleteModal = e => {
        e.preventDefault()
        console.log(titleId, taskId, taskName)
        if (titleId === '' || taskId === '' || taskName === '') {

            setErrormessage('Ooops something went wrong')
        }
        else {
            const data = {
                titleId,
                taskId
            }
            dispatch(delteBodyOfTitleAction(data))
            setShowDeleteModal(false)
        }

    };

    const handleDeleteModal = (task, titleId) => {
        //console.log(taskId, titleId, taskName)
        setTitleId(titleId);
        setTaskId(task._id);
        setTaskName(task.todo)
        // setBodyTitle(body)
        setShowDeleteModal(true);

    };
    const DeleteModalClose = () => {
        //console.log('see')
        setShowDeleteModal(false)

    }
    //const handleCloseicon = () => setClose(false)
    //const handleCloseTodoicon = () => setCloseTodo(false)

    return (
        <Layout >
            <div className='mb-4'>
                <h3 className='title text-center' > Todo </h3>
                <hr />
                {notHidden(Todos.todos, handleShowTodo, handleDeleteModal)}
                {/* Add new title */}
                <Modal
                    show={show}
                    onHide={handleCloseicon}
                    title='Add new Task Title'
                    onClick={handleClose}
                    close
                    button=' Save Changes'
                    error={errorMessage}
                >
                    <Form>
                        <Input
                            label='Todo Title Name'
                            type='text'
                            name='title'
                            value={title}
                            placeholder='Enter your category name here'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <Button variant='outline-primary'
                            size='sm'
                            onClick={() => setShowNote(!showNote)}>
                            {showNote ? "Hide Note" : "Add Note"}
                        </Button>
                        <br />
                        {/* <br /> */}
                        {showNote ?

                            <TextArea
                                label='Add Note i.e like description of the todo'
                                placeholder='Add notes here '
                                row={3}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            /> :

                            null}
                    </Form>
                </Modal>
                {/* add tasks to title */}
                <Modal
                    show={showTodo}
                    onHide={handleCloseTodoicon1}
                    close
                    title={`${bodyTitle}`}
                    onClick={handleCloseTodo}
                    button=' Save Changes'
                    error={errorMessage}
                    todo
                >
                    <Form>
                        <Input
                            label='Todo Title Name'
                            type='text'
                            value={todo}
                            placeholder='Enter your category name here'
                            onChange={(e) => setTodo(e.target.value)}
                        />
                        <br />
                        <br />
                        {/* <br /> */}

                    </Form>
                </Modal>
                {/* Delete Todo task/body */}
                <Modal
                    show={showDeleteModal}
                    close
                    onHide={DeleteModalClose}
                    title={`${taskName}`}
                    onClick={handleCloseDeleteModal}
                    delete=' Delete Task'
                    error={errorMessage}
                    size='sm'
                    onCancel={DeleteModalClose}

                >
                    <Form>
                        <Row>
                            <Col xs={3}>
                                <IoIosTrash size={40} />
                            </Col>
                            <Col>
                                <p>
                                    Are you sure you want to delete this task?
                           </p>
                            </Col>
                        </Row>

                    </Form>
                </Modal>

            </div>
            {/* handleShow={handleShow} */}
            <Footer >
                <ButtonUI
                    title='Add task'
                    variant="outline-primary"
                    type="submit"
                    size="sm"
                    onClick={handleShow}
                />
            </Footer>
        </Layout>

    )
}

export default Home
