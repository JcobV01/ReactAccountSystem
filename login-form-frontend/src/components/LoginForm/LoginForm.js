import React from 'react'
import './LoginForm.scss'
import FormInput from '../FormInput/FormInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


const LoginForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const inputChange = event => {
    setLoginData(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
      if(!res.data.valid){
        navigate('/')
      }
      else{
        navigate('/home')
      }
    })
    .catch(err => console.log(err))
  })

  const formSubmit = async (event) =>{
    event.preventDefault()
    axios.post('http://localhost:8081/login', loginData)
    .then(response => {
      if(response.data.Login){
        console.log(response)
        navigate('/home')
      }
      else{
        console.error("Nie ma takiego w bazie")
      }
      
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='App'>
      <form className='login-form' onSubmit={formSubmit}>
        <h1>Login Form</h1>
        <FormInput type="text" placeholder="Email" className="login-input" name="email" change={inputChange}/>
        <FormInput type="password" placeholder="Password" icon="faEye" name="password" change={inputChange}/>
        <p><a href="#">Forgot password?</a></p>
        <input type='submit' value='Login'></input>

        <p>Don't have an account? <Link to="/register">Signup now!</Link></p>
      </form>
    </div>
  )
}

export default LoginForm
