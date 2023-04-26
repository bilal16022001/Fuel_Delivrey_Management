import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

function Inquiry() {

   const [inquires,setInquies]=useState([]);
   const [id,setId]=useState(null);
   const auth_admin = window.localStorage.getItem("auth_admin");
   
   useEffect(() => {
    fetchInquiry();

  },[]);

  const fetchInquiry = () => {
      axios.get("http://127.0.0.1:8000/api/Inquiry").then(res => {
         setInquies(res.data);
    }).catch(err => {
        console.log(err);
    })
  }
  const fetchItem = (id) => {
    axios.get(`http://localhost:8000/api/Inquiry/${id}`).then(res => {
       setId(id);
    }).catch(err => {
       console.log("err");
    })

  }

  const DeleteInquiry = (e) => {
    e.preventDefault();
 
    axios.delete(`http://localhost:8000/api/Inquiry/${id}`).then(res => {
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
          <div class="table-responsive">
            <h2 className="text-center mb-4">Manage Inquiries</h2>
                <table class="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name</td>
                          <td>Email</td>
                          <td>Creation date</td>
                          <td>Action</td>
                    </tr>
                    {inquires.map(item => (
                       <tr>
                            <td>{item.id}</td>
                            <td>{item.Name}</td>
                            <td>{item.Email}</td>
                            <td>{item.created_at}</td>
                            <td>
                              <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)} data-bs-target="#view"><VisibilityIcon/></a>
                              <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)} data-bs-target="#delete"><DeleteIcon/></a>
                            </td>
                            <div class="modal fade" id="view"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Detail inquiry</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                     <div class="modal-body">
                        <ul>
                         {inquires.filter(fl => fl.id==id).map(item => (
                           <>
                              <li><span>Name : </span>{item.Name}</li>
                              <li><span>Email : </span>{item.Email}</li>
                              <li><span>Message : </span><p>{item.Message}</p></li>
                          </>
                        ))}
                      
                        </ul>
                     </div>
                  
                   </div>
                 </div>
                          </div>
                          <div class="modal fade" id="delete"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                   <div class="modal-content">
                     <div class="modal-header">
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete Inquiry</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                        <form onSubmit={DeleteInquiry}>
                           <p>Are you sure to delete this Inquiry ?</p>
                             {inquires.filter(item => item.id==id).map(item => (
                                <input className="mb-3 form-control" type="text" value={item.Name} disabled />
                            ))}
                           <div class="modal-footer">
                             <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
                             <input type="submit"  class="btn btn-primary" value="Confirm" />
                           </div>
                        </form>
                     </div>
                  
                   </div>
                 </div>
                     </div>
                      </tr>
                    ))}
                  </table>
                  </div>
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

export default Inquiry


const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`