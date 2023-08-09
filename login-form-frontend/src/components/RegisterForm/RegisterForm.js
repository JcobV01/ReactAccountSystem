import React from 'react'
import './RegisterForm.scss'
import FormInput from '../FormInput/FormInput'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs'

let salt = bcrypt.genSaltSync(10)

const RegisterForm = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    login: "",
    password: "",
    rePassword: "",
    passwordHash: "",
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const inputChange = event => {
    setLoginData(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    setLoginData(loginData => ({...loginData, ['passwordHash']: [bcrypt.hashSync(`${loginData.password}`, salt)]}))
  }

  const formSubmit = async (event) => {
    event.preventDefault()

    console.log(loginData.password.length)

    if (loginData.password[0].length < 8) {
      setError("Hasło powinno mieć przynajmniej 8 znaków")
    }
    else if (loginData.rePassword[0] !== loginData.password[0]) (
      setError("Hasła nie są identyczne")
    )
    else {
      axios.post('http://localhost:8081/register', loginData)
        .then(response => {
          if (response.data.code == 700 || response.data.code == 701) {
            setError(response.data.Message)
          }
          else {
            navigate('/')
          }
          console.log(response)
        })
        .then(err => console.log(err))
    }
  }

  return (
    <div className='App'>
      <form className='register-form' onSubmit={formSubmit}>
        <h1>Register Form</h1>
        <p className='registerError'>{error}</p>
        <FormInput type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" placeholder="Email" className="register-input" name="email" change={inputChange} />
        <FormInput type="text" placeholder="Name" className="register-input" name="login" change={inputChange} />
        <FormInput type="password" placeholder="Password" icon="faEye" name="password" change={inputChange} />
        <FormInput type="password" placeholder="Confirm password" icon="faEye" name="rePassword" change={inputChange} />
        <input type='submit' value='Register'></input>

        <p>Have an account? <Link to="/">Login here!</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm
