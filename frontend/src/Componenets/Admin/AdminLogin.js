import React, { useState } from 'react'
import NavBar from '../NavBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function AdminLogin() {

   const [Email,setEmail] = useState("");
   const [password,setPassword]= useState("");
   const navigate = useNavigate();
   const [check, setCheck] = useState(true);
   const auth_admin = window.localStorage.getItem("auth_admin");

  const handlSubmit = (e) => {
    e.preventDefault();

      axios.get("http://localhost:8000/api/users").then(res => {

          res.data.map(item => {

            const hashPassword = async (password) => {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              return hash;
          };

          const verifyPassword = async (enteredPassword, hashedPassword) => {
              const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
              return isMatch;
          };

          hashPassword(password).then((hashedPassword) => {
              verifyPassword(password, item.password).then((isMatch) => {
                  if (isMatch && item.email == Email && item.Type==0) {
                      window.localStorage.setItem("auth_admin", item.email)
                      window.localStorage.setItem("auth","/PofileAdmin")
                      console.log("admin loggin is correct");
                      navigate("/Dashboard")
    
                  } else {
                      console.log("admin Password or email is incorrect");
                      setCheck(false);
                  }
              });
          });

           
          });

      }).catch(err => {
         console.log("err");
      })
  }
  if(auth_admin==null){
  return (
    <div>
          <div class="login-container">
            <form onSubmit={handlSubmit} className='form' method="POST">
                <h2>Login Admin</h2>
                {check ? "" : <div className='alert alert-danger'>admin Password or email is incorrect</div>}
                <label for="username">Email:</label>
                <input type="text" id="Email" onChange={(e) => setEmail(e.target.value)} name="Email" required />
                <label for="password">Password:</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} name="password" required />
                <input className='mb-3' type="submit" value="Login" /><br/>
                <a className='text-decoration-none' href='/'>back to Home</a>
            </form>
        </div>

    </div>
  )
}else{
    window.location.href="/Dashboard"
   }
}

export default AdminLogin
