import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
// import { } from '../../Redux/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logOutUserAction } from '../../Redux/Actions'
//import { otherTodos } from '../../Redux/constant';
import './style.css'




export default function Header() {
    //
    const Auth = useSelector(state => state.Auth)
    const otherTodo = useSelector(state => state.notUserTodo)
    // console.log(otherTodo)
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logOutUserAction())
    }
    //
    const renderIfUserisLoggedIn = () => {
        return <>
            {Auth.isAuthenticated ?
                <Nav >
                    <li className='nav-item'>
                        <NavLink exact to='/' className='nav-link'>Home</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink exact to='/task' className='nav-link'>MY Todos</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/otherstodo' className='nav-link'>Other Todos</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/adduser' className='nav-link'>Add User</NavLink>
                    </li>

                    <li className='nav-item' onClick={logoutUser}>
                        <Nav className='nav-link'>Logout</Nav>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/otherstodo' className='nav-link text-capitalize text-white'>{Auth.user.username}
                            {/* {Auth.user.profilePic ? <img src={Auth.user.profilePic} className='img-fluid' /> : null} */}
                        </NavLink>
                    </li>
                </Nav>
                :
                null
            }
        </>
    }
    //
    const renderIfUserisNotLoggedIn = () => {
        return <>
            {!Auth.isAuthenticated ?
                <Nav>

                    <li className='nav-item'>
                        <NavLink to='/login' className='nav-link'>Login</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to='/signup' className='nav-link'>Sign Up</NavLink>
                    </li>
                </Nav>
                :
                null}
        </>
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Container fluid>
                    <Link to='/' className='navbar-brand'>TreTodos</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>

                        {renderIfUserisLoggedIn()}
                        {renderIfUserisNotLoggedIn()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
