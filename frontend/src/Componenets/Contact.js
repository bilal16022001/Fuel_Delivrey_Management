import React, { useState } from 'react'
import NavBar from './NavBar'
import styled from 'styled-components'
import Footer from './Footer'
import axios from 'axios';

function Contact() {

    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Message,setMessage]=useState("");
    const [Errors,setErrors]=useState([]);

    const Send_Inquiry = (e) => {
         e.preventDefault();
       const Data = new FormData();
             Data.append("Name",Name);
             Data.append("Email",Email);
             Data.append("Message",Message);

      axios.post("http://127.0.0.1:8000/api/Inquiry",Data).then(res => {
            window.location.reload(true)
           
      }).catch(err => {
        setErrors(err.response.data.errors);
      });
    }

  return (
    <Content>
          <NavBar/>
            <div className='parent container p-4'>
              <div className=''>
                  <div className=''>
                      <h2 className='mb-3'>Contact Us</h2>
                      <form onSubmit={Send_Inquiry} className='row'>
                          <div className='col-md-6'>
                               <p className={`${Errors.Name ? 'alert alert-danger' : ""}`}>{Errors.Name}</p>
                              <input className='me-3 mb-3' type="text" onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                              <p className={`${Errors.Email ? 'alert alert-danger' : ""}`}>{Errors.Email}</p>
                              <input className='' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
                          </div>
                          <div className='col-md-12'>
                                    <p className={`${Errors.Message ? 'alert alert-danger' : ""}`}>{Errors.Message}</p>
                              <textarea className='w-100 mb-3 p-2' onChange={(e) => setMessage(e.target.value)} placeholder="Message..."></textarea>
                              <input className='btn btn-primary' type="submit" value="submit" />
                          </div>
                      </form>
                  </div>
              </div>
            </div>
          <Footer/>
        </Content>
  )
}

export default Contact

const  Content = styled.div`

`