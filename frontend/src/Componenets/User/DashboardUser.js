import React,{useEffect,useState} from 'react'
import SideBarUser from './SideBarUser'
import Header from '../Header'
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import {fetchUsers,fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import {Link} from 'react-router-dom'

function DashboardUser() {
  const auth_user = window.localStorage.getItem("auth_user");
  const users = useSelector((state) => state.AllData.users);
  const OrdersFuel = useSelector((state) => state.AllData.OrdersFuel);
  const dispatch = useDispatch();
  const [Name,setName]=useState("");
  const [user_id,setUserId]=useState(null);

  useEffect(() =>{
    dispatch(fetchUsers())
    getUser();
    dispatch(fetchOrdersFuel())
  },[]);

  const getUser = () => {
    users.filter(fl => fl.email==auth_user && fl.Type==1).map(item => {
            setName(item.name); 
            setUserId(item.id)
    })
  
  }

  if(auth_user!=null){
  return (
    <div className='d-flex'>
    <SideBarUser/>
      <div className='w-100'>
        <Header/>
        <Content className=''>
      <div className='content'>
            <div class="parent p-3">
              <h1 className='mb-4'>Welcome {Name} in your Dashboard</h1>
              <div class="admin">
              <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h5>your New Orders (not Updated)</h5>
             <h3>{OrdersFuel.filter(it => it.user_id == user_id && it.Statuts==0 && it.user.Type == 1).length}</h3>
           </div>
           <div class="view">
           <Link to="/User/OrderStatus/0">view All</Link>
           </div>
          </div>
          <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h5>your Confimred Orders</h5>
             <h3>{OrdersFuel.filter(it => it.user_id == user_id && it.Statuts==1 && it.user.Type == 1).length}</h3>
           </div>
           <div class="view">
           <Link to="/User/OrderStatus/1">view All</Link>
           </div>
          </div>
          <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h5>your Orders On The Way</h5>
             <h3>{OrdersFuel.filter(it => it.user_id == user_id && it.Statuts==2 && it.user.Type == 1).length}</h3>
           </div>
           <div class="view">
           <Link to="/User/OrderStatus/2">view All</Link>
           </div>
          </div>
          <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h5>your Orders Delivred</h5>
             <h3>{OrdersFuel.filter(it => it.user_id == user_id && it.Statuts==3 && it.user.Type == 1).length}</h3>
           </div>
           <div class="view">
           <Link to="/User/OrderStatus/3">view All</Link>
           </div>
          </div>
           <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h5>your Orders Cancelled</h5>
             <h3>{OrdersFuel.filter(it => it.user_id == user_id && it.Statuts==4 && it.user.Type == 1).length}</h3>
           </div>
           <div class="view">
           <Link to="/User/OrderStatus/4">view All</Link>
           </div>
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
  window.location.href="/User"
  }
}

export default DashboardUser

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;

  }
`
