import React from 'react'
import './LoginForm.scss'
import FormInput from '../FormInput/FormInput'
import { Link } from 'react-router-dom'


const LoginForm = () => {
  return (
    <div className='App'>
      <form className='login-form'>
        <h1>Login Form</h1>
        <FormInput type="text" placeholder="Email" className="login-input" />
        <FormInput type="password" placeholder="Password" icon="faEye" />
        <p><a href="#">Forgot password?</a></p>
        <input type='submit' value='Login'></input>

        <p>Don't have an account? <Link to="/register">Signup now!</Link></p>
      </form>
    </div>
  )
}

export default LoginForm
