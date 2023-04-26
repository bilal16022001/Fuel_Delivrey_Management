import React,{useState} from 'react'
import NavBar from '../NavBar'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import imgLogin from '../images/th1.jfif'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function UserLogin() {

  const [Email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const auth_user = window.localStorage.getItem("auth_user");

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
                  if (isMatch && item.email == Email && item.Type==1) {
                      window.localStorage.setItem("auth_user", item.email)
                      window.localStorage.setItem("auth","/User/ProfileUser")
                      console.log("user loggin is correct");
                      navigate("/User/Dashboard")
    
                  } else {
                      console.log("user Password or email is incorrect");
                      setCheck(false);
                  }
              });
          });

           
          });

      }).catch(err => {
         console.log("err");
      })
  }
  if(auth_user==null){
  return (
    <div>
        <Content className='row'>
        <div class="login-form col-md-6 d-flex align-items-center">
           <Form className='w-100 '>
           <h2 className=''>Login For User</h2>
            <form onSubmit={handlSubmit} className="form">
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" name="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" name="password" />
                <input className='mb-2 btn btn-success' type="submit" value="submit" />
            </form>
            <Link to="/">Back TO Home</Link><br/>
            <Link to="/RegisterUser">Register</Link>
           </Form>
        </div>
        <div className=' col-md-6'>
         <img className='w-100 h-100' src={imgLogin} />
        </div>
        </Content>
    </div>
  )
  }else{
    window.location.href="/User/Dashboard"
   }
}

export default UserLogin

const Content = styled.div`

`
const Form = styled.div`
   h2{
    text-align:center;
  }
`