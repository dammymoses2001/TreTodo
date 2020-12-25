import React, { useState } from 'react'
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/Input'
import Footer from '../../Components/Footer';
import ButtonUI from '../../Components/UI/Button'
import Modal from '../../Components/UI/Modal'
import { Form, Container, Row, Col, Accordion, Button } from 'react-bootstrap'
import { IoIosTrash } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { shareTaskAction, authorizeUserAction } from '../../Redux/Actions'



function getTitles(todos, newTitle = []) {
    todos.map(todo => newTitle.push({
        value: todo._id,
        title: todo.title
    }))

    return newTitle;
}

function sendUser(todos) {
    const users = todos.user.filter(user => user.authorization === 'user').length;
    // console.log(users, users.length < 1 ? 'users' : 'user')
    return users
}

const getOthersTasks = (otherstask, handleApproveUser) => {
    return otherstask.map((todo, index) =>
        <Container key={index}>
            <div key={index} style={{ overflow: 'hidden' }}>
                <Row key={index} >
                    <Col xs={8} className='text-center'>
                        <Accordion defaultActiveKey="0" >
                            <div className='text-center'>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1"  >
                                    <div className='text-center'> {todo.title}</div>
                                </Accordion.Toggle>
                            </div>
                            {todo.user.map(user =>
                                <Accordion.Collapse eventKey="1" key={user._id} >
                                    <div key={user._id} className='my-2'>
                                        {user.authorization === 'user' ?
                                            <Row className='mx-2'>
                                                <Col xs={4} sm={6} md={8} >

                                                    <p className='text-info ' key={user._id}> {user.email ?
                                                        `${user.email.substring(0, 15)}...` : 'something went wrong'}</p>

                                                </Col>
                                                <Col xs={4} sm={3} md={2}>

                                                    <IoIosTrash style={{ color: 'blue', cursor: 'pointer' }} />
                                                </Col>
                                                <Col xs={4} sm={3} md={2}>

                                                    {user.approved ? <ButtonUI
                                                        title='Unapprove '
                                                        variant="outline-warning"
                                                        type="submit"
                                                        size="sm"
                                                        onClick={() => handleApproveUser(user.email, todo._id)}
                                                    /> : <ButtonUI
                                                            title='Approve '
                                                            variant="outline-primary"
                                                            type="submit"
                                                            size="sm"
                                                            onClick={() => handleApproveUser(user.email, todo._id)}
                                                        />}
                                                </Col>

                                            </Row> : null}

                                    </div>
                                </Accordion.Collapse>
                            )}

                        </Accordion>

                    </Col>
                    <Col>
                        <div className={sendUser(todo) >= 1 ? 'text-success' : 'text-warning'}>
                            {`${sendUser(todo)} ${sendUser(todo) > 1 ? 'users' : 'user'}`}</div>
                    </Col>

                </Row>
            </div>
        </Container>
    )


}

export default function AddUsers() {
    const dispatch = useDispatch()
    const titles = useSelector(state => state.Todos)
    const otherUser = useSelector(state => state.Todos.todos)
    //select title
    const [titleId, setTitleId] = useState("")
    const [email, setEmail] = useState("")
    //modal for adding to the task
    const [showModal, setshowModal] = useState(false);
    const [closeTodo, setCloseTodo] = useState(false);


    //add approve user 
    const handleApproveUser = (userEmail, taskId) => {
        console.log('hello', userEmail, taskId)
        const data = {
            labelId: taskId,
            email: userEmail
        }
        dispatch(authorizeUserAction(data))
    }

    //
    const handleCloseTodo = () => {
        if (titleId === '' || titleId === ' ' || email === '' || email === ' ') {
            console.log('error')
        }
        else {
            const data = {
                titleId,
                email
            }
            console.log(data)
            dispatch(shareTaskAction(data))
            setshowModal(false)
            setTitleId("");
            setEmail("")
        }

    };
    const handleshowModal = () => {
        // setTitleId(id)
        // setBodyTitle(body)
        setshowModal(true);

    };
    const handleCloseTodoicon1 = () => setshowModal(false)
    //
    const renderAddUserModal = () => {
        return <Modal
            show={showModal}
            onHide={handleCloseTodoicon1}
            close
            title='Add User To Task'
            onClick={handleCloseTodo}
            button='Add User'
            //error={errorMessage}
            todo
            icon='add'
            iconSize={60}
        >
            <Form>
                <select className='form-control'
                    value={titleId}
                    onChange={(e) => setTitleId(e.target.value)}
                >
                    <option>Select Task</option>
                    {getTitles(titles.todos).map(todo =>
                        <option key={todo.value} value={todo.value}>{todo.title}</option>)}
                </select>

                <Input
                    // label='Todo Title Name'
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Enter your user Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form>
        </Modal>
    }
    return (
        <Layout>
            <Container>
                <div className='mb-4'>
                    <h3 className='text-center title' > Task Shared and Users </h3>
                    <hr />
                </div>
                {getOthersTasks(otherUser, handleApproveUser)}
                {renderAddUserModal(titles)}
            </Container>
            <Footer >
                <ButtonUI
                    title='Add User'
                    variant="outline-primary"
                    type="submit"
                    size="sm"
                    onClick={handleshowModal}
                />
            </Footer>
        </Layout>
    )
}
