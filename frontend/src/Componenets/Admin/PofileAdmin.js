import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios';

function PofileAdmin() {

    let auth = window.localStorage.getItem("auth_admin");
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [password,setpassword]=useState("");
    const [oldPass,setOldPss]=useState("");
    const [id,setId]=useState("");
    const [Phone,setPhone]=useState("");

  useEffect(() =>{ 
    AdminProfile();
   },[]);

   const AdminProfile = () => {
     axios.get("http://127.0.0.1:8000/api/users").then(res => {
         res.data.filter(fl => fl.email==auth).map(item => {
               setId(item.id);
               setName(item.name)
               setEmail(item.email) 
               setPhone(item.Phone)
               setOldPss(item.password)
         })
     }).catch(err =>  {
         console.log(err);
    }) 
  }

  const UpdateProfile = (e) =>{
    e.preventDefault();
      const data = new FormData();
          data.append("name",Name);
          data.append("email",Email);
          window.localStorage.setItem("auth_admin",Email)
        if(password==""){
            data.append("password",oldPass)
           console.log("old",oldPass);
        }else{
            data.append("password",password)
           console.log("new",password);
        }
        data.append("Phone",Phone)
        data.append("_method","PATCH");

        axios.post(`http://127.0.0.1:8000/api/users/${id}`,data).then(res => {
           console.log(res.data);
           window.location.reload(true)
        }).catch(err => {
           console.log(err);
        });
  }

  return (
    <div className='d-flex'>
          <Sidebar/>
        <div className='w-100'>
           <Header/>
           <Content className=''>
        <div className='content'>
              <div class="parent p-3">
              <h2>Edit Profile {Name}</h2>
                <form onSubmit={UpdateProfile}>       
                    <input className='form-control mb-3' type="text" onChange={(e) => setName(e.target.value)} value={Name} placeholder='Name' />
                    <input className='form-control mb-3' type="Email" onChange={(e) => setEmail(e.target.value)} value={Email} placeholder='Email' />
                    <input className='form-control mb-3' type="text" onChange={(e) => setPhone(e.target.value)} value={Phone} placeholder='Phone' />
                    <input className='form-control mb-3' type="password" onChange={(e) => setpassword(e.target.value) } placeholder='password' />
                    <input className='btn btn-primary' type="submit" value='update' />
                </form>
            </div>
        </div>
     
        </Content>
        </div>
    </div>
  )
}

export default PofileAdmin

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
  
`