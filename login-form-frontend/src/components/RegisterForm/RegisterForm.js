import React from 'react'
import './RegisterForm.scss'
import FormInput from '../FormInput/FormInput'
import { Link } from 'react-router-dom'


const RegisterForm = () => {
  return (
    <div className='App'>
      <form className='register-form'>
        <h1>Register Form</h1>
        <FormInput type="text" placeholder="Email" className="register-input" />
        <FormInput type="text" placeholder="Name" className="register-input" />
        <FormInput type="password" placeholder="Password" icon="faEye" />
        <FormInput type="password" placeholder="Confirm password" icon="faEye" />
        <input type='submit' value='Register'></input>

        <p>Have an account? <Link to="/">Login here!</Link></p>
      </form>
    </div>
  )
}

export default RegisterForm
