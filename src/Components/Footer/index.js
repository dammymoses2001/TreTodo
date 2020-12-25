import React from 'react'

export default function Footer(props) {
    // console.log(props)
    return (
        <div className='mx-2 my-2 d-flex justify-content-between footer'>
            {props.children}
            {/* <div>
                hello
            </div> */}
        </div>
    )
}
{/* <Button variant="outline-primary"
 type="submit" size='sm' onClick={props.handleShow}>
                Add new Task
            </Button> */}
