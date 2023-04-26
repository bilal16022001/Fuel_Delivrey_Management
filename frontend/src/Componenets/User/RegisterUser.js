import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import imgLogin from '../images/th1.jfif'

function RegisterUser() {
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Phone,setPhone]=useState("");
    const [Password,setPassword]=useState("");
    const [Birthday,setBirthday]=useState("")

     const handlRegister = (e) => {
        e.preventDefault()
       const data = new FormData();
             data.append("name",Name)
             data.append("email",Email)
             data.append("Phone",Phone)
             data.append("Birthday",Birthday)
             data.append("password",Password);
         axios.post("http://127.0.0.1:8000/api/users",data).then(res => {
             console.log(res.data);
         }).catch(err => {
           console.log(err.response.data.errors);
          })
   
   
     }
   
  return (
    <div>
    <Content className='row'>
      <div class="login-form col-md-6 d-flex align-items-center">
         <Form className='w-100'>
         <h2 className='text-center mb-3'>Register User</h2>
          <form onSubmit={handlRegister} className='form'>
              <input type="text" onChange={(e) =>setName(e.target.value)} placeholder="Name" />
              <input type="text" onChange={(e) =>setPhone(e.target.value)} placeholder="Phone" />
              <input type="email" onChange={(e) =>setEmail(e.target.value)} placeholder="email" />
              <input type="password" onChange={(e) =>setPassword(e.target.value)} placeholder="Password" />
              <input type="date" onChange={(e) =>setBirthday(e.target.value)} />
              <button type="submit">submit</button>
          </form>
          <Link to="/User">login</Link><br/>
          <Link to="/">Back TO Home</Link>
         </Form>
      </div>
      <div className=' col-md-6'>
      <img className='w-100 h-100' src={imgLogin} />
      </div>
      </Content>
  </div>
  )
}

export default RegisterUser

const Content = styled.div`

`
const Form = styled.div`
   
`
