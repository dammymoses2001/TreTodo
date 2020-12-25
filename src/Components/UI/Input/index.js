import React from 'react'
import { Form } from 'react-bootstrap'
export default function Input(props) {
    return (
        <Form.Group controlId={props.label}>
            <Form.Label className={props.small ? 'small' : null}>{props.label}</Form.Label>
            <Form.Control type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required} />
            <Form.Text className="text-muted">
                {props.errorMessage}
            </Form.Text>
        </Form.Group>
    )
}
