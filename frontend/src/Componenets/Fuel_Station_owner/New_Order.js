import React,{useEffect,useState} from 'react'
import Header from '../Header'
import SideBarOwner from './SideBarOwner'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios';

function New_Order() {
    const OrdersFuel = useSelector((state) => state.AllData.OrdersFuel);
    const [OwnerId,setOwnerId]=useState("");
    const auth_owner = window.localStorage.getItem("auth_Owner");
    const dispatch = useDispatch();
  
    useEffect(() =>{
      dispatch(fetchOrdersFuel())
      fetchOwner();
   },[])
  
   const fetchOwner = () => {
    axios.get("http://localhost:8000/api/FuelOwners").then(res => {
    res.data.filter(item => item.Email == auth_owner).map(it => {
       setOwnerId(it.id)
    });
  
    }).catch(err => {
    console.log(err);
    })
  }

  if(auth_owner!=null){
  return (
    <div className='d-flex'>
    <SideBarOwner/>
       <div className='w-100'>
         <Header/>
         <Content className=''>
       <div className='content'>
             <div class="parent p-3">
             <h2 className="text-center mb-3">New Orders</h2>
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
 
                     {OrdersFuel.filter(it => it.fuel_station.Owner_id == OwnerId && it.Statuts==0).map(item => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.Order_Number}</td>
                          <td>{item.user.name}</td>
                          <td>{item.user.email}</td>
                          <td>{item.user.Phone}</td>
                          <td>{item.fuel_station.NameStation}</td>
                          <td>
                              {item.Statuts == 0 ? "Not Updated Yet" : item.Statuts == 1 ? "Confimred" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled"}</td>
                          <td>{item.created_at.slice(0,10)}</td>
                          <td><Link to={`/FuelOwner/ForderDetail/${item.id}`}>view</Link></td>
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
    window.location.href="/OwnerStation"
    }
}

export default New_Order

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`