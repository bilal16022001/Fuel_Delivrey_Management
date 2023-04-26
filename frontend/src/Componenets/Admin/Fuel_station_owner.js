import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import axios from 'axios';
import {Link} from 'react-router-dom'

function Fuel_station_owner() {

    const [Owners,setOwners]=useState([]);
    const auth_admin = window.localStorage.getItem("auth_admin");

    useEffect(() => {
       fetchOwners();
    },[]);

    const fetchOwners = ()=>{
       axios.get("http://127.0.0.1:8000/api/FuelOwners").then(res => {
          setOwners(res.data);
      }).catch(err => {
          console.log(err);
      });
    }

    if(auth_admin!=null){
  return (
    <div className=' d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-3">View Registred Fuel Stations Owners</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Full Name</td>
                      <td>Phone</td>
                      <td>Email</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
                {Owners.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>
                          {item.Phone}
                      </td>
                      <td>
                          {item.Email}
                      </td>
                   
                      <td>{item.created_at}</td>
                      <td>
                      <Link to={`/Station_Owner/${item.id}`} className="">view Fuel Stations</Link>
                        
                      </td>
                   </tr>
                ))}

          </table>
      </div>
  </div>


</div>


</div>
  
    </Content>
    </div>
    </div>
  )
   }
   else{
    window.location.href="/admin"
    }
}

export default Fuel_station_owner

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`