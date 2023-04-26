import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import imgLogin from '../images/th1.jfif'

function RegisterOwner() {
 const [Name,setName]=useState("");
 const [Email,setEmail]=useState("");
 const [Phone,setPhone]=useState("");
 const [Password,setPassword]=useState("");

  const handlRegister = (e) => {
     e.preventDefault()
    const data = new FormData();
          data.append("Name",Name)
          data.append("Email",Email)
          data.append("Phone",Phone)
          data.append("Password",Password);
      axios.post("http://127.0.0.1:8000/api/FuelOwners",data).then(res => {
          console.log(res.data);
      }).catch(err => {
        console.log(err);
       })


  }

  return (
    <div>
      <Content className='row'>
        <div class="login-form col-md-6 d-flex align-items-center">
           <Form className='w-100'>
           <h2 className='text-center mb-3'>Register Fuel Owner Station</h2>
            <form onSubmit={handlRegister} className='form'>
                <input type="text" onChange={(e) =>setName(e.target.value)} placeholder="Name" />
                <input type="text" onChange={(e) =>setPhone(e.target.value)} placeholder="Phone" />
                <input type="email" onChange={(e) =>setEmail(e.target.value)} placeholder="email" />
                <input type="password" onChange={(e) =>setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">submit</button>
            </form>
            <Link to="/OwnerStation">login</Link><br/>
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

export default RegisterOwner

const Content = styled.div`

`
const Form = styled.div`
   
`

