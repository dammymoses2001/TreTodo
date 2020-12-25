import React from 'react'
import { Button } from 'react-bootstrap'
export default function ButtonUI(props) {
    return (
        <Button variant={props.variant}
            type={props.type}
            size={props.size}
            onClick={props.onClick}>
            {props.title}
        </Button>
    )
}
