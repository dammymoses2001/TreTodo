import React, { useState } from 'react'
import Layout from '../../Components/Layout'
import Input from '../../Components/UI/Input'
import { Form, Container, Button, Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../../Redux/Actions'

export default function Login() {
    const dispatch = useDispatch();
    const Auth = useSelector(state => state.Auth)
    console.log(Auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        dispatch(loginAction(user))
    }

    if (Auth.isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <div>
            <Layout>

                <Container>
                    <Row className='mt-4'>
                        <Col md={{ span: 6, offset: 3 }}>
                            {/* */}
                            <Form onSubmit={handleSubmit} >
                                <Input
                                    label='Email address'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type='email'
                                    placeholder='Enter email'
                                    required
                                />
                                <Input
                                    label='Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type='password'
                                    placeholder='Enter Password'
                                />
                                <Button variant="primary" type="submit">
                                    Submit
  </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}
