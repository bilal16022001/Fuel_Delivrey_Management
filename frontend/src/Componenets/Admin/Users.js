import React, { useEffect,useState } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import {fetchUsers} from '../redux-toolkit/Data/DataSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Users() {
   const users = useSelector((state) => state.AllData.users);
   const auth_admin = window.localStorage.getItem("auth_admin");
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchUsers())
  },[])

  if(auth_admin!=null){
  return (
    <div className=' d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-3">View Registred Users</h2>
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
                {users.filter(it => it.Type!=0).map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                          {item.Phone}
                      </td>
                      <td>
                          {item.email}
                      </td>
                      <td>{item.created_at.slice(0,10)}</td>
                      <td>
                          <Link to={`/userOrders/${item.id}`}>Orders</Link>      
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

export default Users

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`