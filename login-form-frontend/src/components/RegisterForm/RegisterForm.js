import React from 'react'
import './RegisterForm.scss'
import FormInput from '../FormInput/FormInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const RegisterForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    login: "",
    password: "",
    rePassword: "",
  })

  const navigate = useNavigate()

  const inputChange = event => {
    setLoginData(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const formSubmit = async (event) =>{
    event.preventDefault()
    axios.post('http://localhost:8081/register', loginData)
    .then(response => {
      console.log(response)
      navigate('/')
    })
    .then(err => console.log(err))
  }

  return (
    <div className='App'>
      <form className='register-form' onSubmit={formSubmit}>
        <h1>Register Form</h1>
        <FormInput type="text" placeholder="Email" className="register-input" name="email" change={inputChange} />
        <FormInput type="text" placeholder="Name" className="register-input" name="login" change={inputChange} />
        <FormInput type="password" placeholder="Password" icon="faEye" name="password" change={inputChange}/>
        <FormInput type="password" placeholder="Confirm password" icon="faEye" name="rePassword" change={inputChange} />
        <input type='submit' value='Register'></input>

        <p>Have an account? <Link to="/">Login here!</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm
