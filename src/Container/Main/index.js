import React, { useEffect } from 'react';
import { home, renderIcon } from '../../varaiables'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Layout from '../../Components/Layout'

export default function Main(props) {

    return (
        <Layout className='mt-5'>
            <Container>
                <Row>
                    {home.map(data => {
                        return <Col md={3} key={data.id} >
                            <div className='my-2 main shadow p-3 bg-white rounded'>
                                <Container>
                                    <div className='text-center cursor ' onClick={() => props.history.push(data.link)} >
                                        {/* <Card.Img></Card.Img> */}
                                        <Card.Body>
                                            {renderIcon(data.icon, data.size, data.color)}

                                            <Card.Text>{data.name}</Card.Text>

                                        </Card.Body>
                                    </div>
                                </Container>
                            </div>
                        </Col>
                    })}


                </Row>
            </Container>
        </Layout>

    )
}
