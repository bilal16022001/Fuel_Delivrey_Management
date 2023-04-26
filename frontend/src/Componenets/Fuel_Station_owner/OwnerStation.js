import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import imgLogin from '../images/th1.jfif'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function OwnerStation() {

  const [Email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const auth_Owner = window.localStorage.getItem("auth_Owner");

 const handlSubmit = (e) => {
   e.preventDefault();

     axios.get("http://127.0.0.1:8000/api/FuelOwners").then(res => {
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
             verifyPassword(password, item.Password).then((isMatch) => {
                 if (isMatch && item.Email == Email) {
                     window.localStorage.setItem("auth_Owner", item.Email)
                     window.localStorage.setItem("auth","/FuelOwner/ProfileOwner")
                     console.log("owner loggin is correct");
                     navigate("/FuelOwner/Dashboard");
   
                 } else {
                     console.log("owner Password or email is incorrect");
                    //  setCheck(false);
                 }
             });
         });

          
         });

     }).catch(err => {
        console.log("err");
     })
 }
 if(auth_Owner==null){
  return (
    <div>
       <Content className='row'>
        <div class="login-form col-md-6 d-flex align-items-center">
           <Form className='w-100 '>
           <h2 className=''>Login For Station Owner</h2>
            <form onSubmit={handlSubmit} className="form">
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input className='mb-2 btn btn-success' type="submit" value="submit" />
            </form>
            <Link to="/">Back TO Home</Link><br/>
            <Link to='/RegisterOwner'>Register Owner</Link>
           </Form>
        </div>
        <div className=' col-md-6'>
          <img className='w-100 h-100' src={imgLogin} />
        </div>
        </Content>
    </div>
  )
  }else{
    window.location.href="/FuelOwner/Dashboard"
   }
}

export default OwnerStation

const Content = styled.div`

`
const Form = styled.div`
  h2{
    text-align:center;
  }
`