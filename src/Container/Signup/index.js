import React from 'react'
import { Tooltip, Button, OverlayTrigger } from 'react-bootstrap'



export default function index() {
    const renderTooltip = (props) => {
        console.log(props);
        <Tooltip id='button-tooltip' {...props}>
            Simple tooltip
    </Tooltip>
    }
    return (

        <OverlayTrigger placement='right' delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button variant='outline-success'> signup here</Button>
        </OverlayTrigger>


    )
}

