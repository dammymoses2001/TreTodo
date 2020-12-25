import React from 'react'
import { Form } from 'react-bootstrap'
function TextArea(props) {
    return (
        <div>
            <Form.Group className='mt-3'>
                <Form.Label className='label small'>{props.label}</Form.Label>
                <Form.Control as="textarea" row={props.row}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />
            </Form.Group>
        </div>
    )
}

export default TextArea
