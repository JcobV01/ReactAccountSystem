import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InsidePanel = () => {

  const [login, setLogin] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  
  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
      if(!res.data.valid){
        navigate('/')
      }
      else{
        setLogin(res.data.login)
      }
    })
    .catch(err => console.log(err))
  })


  return(
    <div>
        <h1>Witaj {login}</h1>
    </div>
  )
}

export default InsidePanel