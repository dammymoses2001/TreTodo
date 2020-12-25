import React from 'react'
import Header from '../Header'
export default function Layout(props) {
    return (
        <>
            <Header />
            <div className='mt-3'>
                {props.children}
            </div>


        </>
    )
}
