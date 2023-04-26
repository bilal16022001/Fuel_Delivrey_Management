import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import Header from '../Header'
import axios from 'axios';

function Page_contact() {

   const [Title,setTitle]=useState("");
   const [Description,setDescription]=useState("");
   const [Email,setEmail]=useState("");
   const [Phone,setPhone]=useState("");
   const [Copyright,setCopyright]=useState("");
   const auth_admin = window.localStorage.getItem("auth_admin");

   useEffect(() => {
    fetchDataPage();
  },[]);

   const fetchDataPage = () => {
      axios.get("http://127.0.0.1:8000/api/PageContact/").then(res => {
       if(res.data.length > 0){
        setTitle(res.data[0].Title);
        setEmail(res.data[0].Email);
        setDescription(res.data[0].Description);
        setPhone(res.data[0].Phone);
        setCopyright(res.data[0].Copyright);
      }

    }).catch(err => {
         console.log(err);
    });
  }

   const updatePageContact = (e) => {
         e.preventDefault();

       const data = new FormData();
            data.append("Title",Title);
            data.append("Description",Description);
            data.append("Phone",Phone);
            data.append("Email",Email);
            data.append("Copyright",Copyright);

            axios.post(`http://127.0.0.1:8000/api/PageContact/`,data).then(res => {
              window.location.reload(true);
            }).catch(err => {
                  console.log(err);
            });
      
  }
  if(auth_admin!=null){
  return (
    <div className='d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
          <div className='content'>
          <div class=" p-3">
            <h2>Edit Page Contact</h2>
             <form onSubmit={updatePageContact}>
                <input type="text" className='form-control mb-2' value={Title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                <input type="text" className='form-control mb-2' value={Description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                <input type="text" className='form-control mb-2' value={Phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
                <input type="email" className='form-control mb-2' value={Email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type="text" className='form-control mb-2' value={Copyright} onChange={(e) => setCopyright(e.target.value)} placeholder='Copyright' />
                <input type="submit" className='btn btn-primary' value="update" />
             </form>
             </div>
          </div>
      </Content>
      </div>
    </div>
  )
  }else{
    window.location.href="/admin"
 }
}

export default Page_contact

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`