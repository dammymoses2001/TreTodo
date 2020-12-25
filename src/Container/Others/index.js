import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Row, Col, Button, Accordion, Card, Container } from 'react-bootstrap';
import { IoMdAddCircleOutline, IoIosTrash } from 'react-icons/io';
import Layout from '../../Components/Layout';
import { getOthersTodosAction } from '../../Redux/Actions'
//


const isApproved = (todo, userEmail) => {
    const approved = todo.user.find(user => user.email === userEmail && user.approved === true)
    if (approved) {
        return true
    }
    return false

}

const notHidden = (Todos, userEmail) => {

    const TodoList = Todos.filter(todo => todo.hide !== true && todo.pin !== true);
    return TodoList.map(todo =>
        < div key={todo._id} style={{ overflow: 'hidden' }}>
            <Row key={todo._id} >
                <Col xs={2}>
                    <Form.Control type={"checkbox"}
                    // todoBody.find(todo => todo.complete === false ? checked : null)
                    // checked={todo.todoBody.find(todo => todo.complete == false ? false : true)}
                    />
                </Col>
                <Col xs={8} >
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
                                            {/* {console.log(subtodo.complete)} */}
                                            <Form.Control type={"checkbox"}
                                                checked={subtodo.complete}
                                                onChange={(e) => console.log(e.target.checked)} />
                                        </Col>
                                        <Col xs={6} >

                                            <p className='text-info ' key={subtodo._id}> {subtodo.todo}</p>

                                        </Col>
                                        <Col xs={4}>
                                            {isApproved(todo, userEmail) ?
                                                <IoIosTrash style={{ color: 'blue', cursor: 'pointer' }} /> :
                                                <div className='text-danger small'>Not approved</div>}

                                            {/* onClick={() =>
                                                handleDeleteModal(subtodo._id, todo._id, subtodo.todo)} */}

                                        </Col>
                                    </Row>
                                </div>
                            </Accordion.Collapse>
                        )}

                    </Accordion>

                </Col>
                <Col xs={2}>
                    {isApproved(todo, userEmail) ?
                        < IoMdAddCircleOutline style={todo.todoBody.length > 0 ? { color: 'green', cursor: '#5cb85c' }
                            : { color: '#f0ad4e', cursor: 'pointer' }}
                        />
                        :
                        null
                    }
                </Col>

            </Row>
        </div>


    )

}



function OthersTodo() {
    //use Effect
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOthersTodosAction())

    }, [])
    //
    const othersTodo = useSelector(state => state.notUserTodo)
    const userEmail = useSelector(state => state.Auth.user.email)

    // console.log(othersTodo)
    // if (othersTodo.othersTodo.length === 0) {
    //     return <h3>{othersTodo.message}</h3>
    // }
    return (
        <Layout>
            <Container>
                <div className='mb-4'>
                    <h3 className='title text-center'> Others Todos </h3>
                    <hr />
                    {othersTodo.othersTodo.length === 0 ?
                        <h4 className='text-center text-uppercase'>{othersTodo.message}</h4>
                        : notHidden(othersTodo.othersTodo, userEmail)}

                </div>
            </Container>
        </Layout>
    )
}

export default OthersTodo
