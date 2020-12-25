import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getUserTodosAction, getOthersTodosAction } from './Redux/Actions'
//
import ProtectedRoutes from './Components/HOC/protectedRoutes'
import Home from './Container/Home'
import Login from './Container/Login'
import Signup from './Container/Signup'
import AddUser from './Container/AddUsers'
import OtherTodos from './Container/Others'
import Main from './Container/Main'
//
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/pe-icon-7-stroke.css";
//
import './App.css'
//import { otherTodos } from './Redux/constant'

function App() {
  const dispatch = useDispatch();
  const Auth = useSelector(state => state.Auth)

  useEffect(() => {
    dispatch(getUserTodosAction())
    dispatch(getOthersTodosAction())
    if (!Auth.isAuthenticated) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <Switch>
      <ProtectedRoutes exact path='/' component={Main} />
      <ProtectedRoutes exact path='/task' component={Home} />
      <ProtectedRoutes exact path='/adduser' component={AddUser} />
      <ProtectedRoutes exact path='/otherstodo' component={OtherTodos} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  )
}

export default App

