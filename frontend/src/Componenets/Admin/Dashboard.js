import React,{useEffect} from 'react'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import Header from '../Header'
import {Link} from  'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {fetchUsers,getOwners,fetchStates,getInquires} from '../redux-toolkit/Data/DataSlice'

function Dashboard() {

  const users = useSelector((state) => state.AllData.users);
  const FuelOwners = useSelector((state) => state.AllData.FuelOwners);
  const states = useSelector((state) => state.AllData.States);
  const inquires = useSelector((state) => state.AllData.Inquires);
  const auth_admin = window.localStorage.getItem("auth_admin");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getOwners());
    dispatch(fetchStates());
    dispatch(getInquires());
  },[]);
  
  if(auth_admin!=null){
  return (
    <div className='d-flex'>
          <Sidebar/>
        <div className='w-100'>
           <Header/>
           <Content className=''>
        <div className='content'>
              <div class="parent p-3">
              <div class="admin">
           <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>USERS</h4>
             <h3>{users.length}</h3>
           </div>
           <div class="view">
           <Link to="/Users">view All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-building"></i>
           </div>
           <div class="">
             <h4>FUEL STATION OWNERS</h4>
             <h3>{FuelOwners.length}</h3>
           </div>
           <div class="view">
           <Link to="/Station_Owner">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-folder"></i>
           </div>
           <div class="">
             <h4>TOTAL STATE</h4>
             <h3>{states.length}</h3>
           </div>
           <div class="view">
           <Link to="/State">View All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-times"></i>
           </div>
           <div class="">
             <h4>INQUIRES</h4>
             <h3>{inquires.length}</h3>
           </div>
           <div class="view">
              <Link to="/Inquiry">View All</Link>
           </div>
        </div>
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

export default Dashboard

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
  
`