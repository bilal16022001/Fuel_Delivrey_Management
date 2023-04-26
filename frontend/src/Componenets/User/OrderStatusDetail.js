import React,{useEffect, useState} from 'react'
import SideBarUser from './SideBarUser'
import Header from '../Header'
import styled from 'styled-components'
import {fetchOrdersFuel,fetchUsers} from '../redux-toolkit/Data/DataSlice'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'


function OrderStatusDetail() {
    const {id} = useParams();
    const OrdersFuel = useSelector((state) => state.AllData.OrdersFuel);
    const [userId,setUserId]=useState("");
     const user = window.localStorage.getItem("auth_user");
  
    const dispatch = useDispatch();
    useEffect(() =>{
      dispatch(fetchOrdersFuel())
  
     fetchUserLogged()
   },[])
  
   const fetchUserLogged = () => {
        axios.get("http://127.0.0.1:8000/api/users").then((res) => {
           res.data.filter(item => item.email == user && item.Type == 1).map(it => {
          
             setUserId(it.id)
           })
       })
  }
  return (
    <div className='d-flex'>
      <SideBarUser/>
      <div className='w-100'>
        <Header/>
        <Content className=''>
      <div className='content'>
            <div class="parent p-3">
            <h2 className="text-center mb-3">Orders Status - {id==0 ? "Not Updated Yet" : id == 1 ? "Confimred" : id == 2 ? "On The Way" : id == 3 ? "Delivred" :  "cancelled"} </h2>
           <div className="">
            <div className="table-responsive">
                <table className="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Order Number</td>
                          <td>Name</td>
                          <td>Mobile Phone</td>
                          <td>Email</td>
                          <td>Name Of Fuel Station</td>
                          <td>Status</td>
                          <td>Order date</td>
                          <td>Action</td>
                    </tr>

                    {OrdersFuel.filter(it => it.user_id == userId && it.Statuts==id && it.user.Type == 1).map(item => (
                       <tr>
                         <td>{item.id}</td>
                         <td>{item.Order_Number}</td>
                         <td>{item.user.name}</td>
                         <td>{item.user.Phone}</td>
                         <td>{item.user.email}</td>
                         <td>{item.fuel_station.NameStation}</td>
                         <td> {item.Statuts == 0 ? "Not Updated Yet" : item.Statuts == 1 ? "Confimred" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled"}</td>
                         <td>{item.created_at.slice(0,10)}</td>
                         <td><Link to={`/User/OrderDetail/${item.id}`}>view</Link></td>
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

export default OrderStatusDetail

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`
