import React from 'react'
import { Modal, Button, Row, Col, Container } from 'react-bootstrap'
import { renderIcon } from '../../../varaiables'
import { FaGalacticSenate, FaTasks, FaTrash } from 'react-icons/fa'


function chooseIcon(text) {
    switch (text) {
        case 'task': return <FaTasks size={40} className='text-center icons' color='blue' />
        case 'task': return <FaTasks size={40} className='text-center icons' color='blue' />
        default:
            break;
    }
}

export default function ModalUi(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.onHide}>
            <Container>
                <Modal.Header closeButton={props.close ? true : false} >
                    {/* closeButton */}
                    <Modal.Title className='icons'>
                        <Row>
                            {props.todo ?
                                <Col  >
                                    <div className='text-center'>
                                        {renderIcon(props.icon, props.iconSize)}
                                    </div>

                                </Col>
                                : null}


                        </Row>
                        <Row>
                            <Col md={12}>
                                <div className='small text-capitalize text-center font-weight-bold'>
                                    {props.title}</div>
                            </Col>

                        </Row>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                <p className='text-danger text-center'>{props.error}</p>
                <Modal.Footer>

                    {props.button ?
                        <Button variant="primary" onClick={props.onClick}>
                            {props.button}
                        </Button> : null
                    }
                    {props.delete ?
                        <Button variant="danger" onClick={props.onClick}>
                            {props.delete}
                        </Button> : null

                    }
                    {props.delete ?
                        <Button variant="primary" onClick={props.onCancel}>
                            cancel
                        </Button> : null

                    }

                </Modal.Footer>

            </Container>
        </Modal>

    )
}
