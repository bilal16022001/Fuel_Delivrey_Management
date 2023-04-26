import React, { useEffect,useState } from 'react'
import Header from '../Header'
import SideBarOwner from './SideBarOwner'
import styled from 'styled-components'
import {getOwners,fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

function Dashboard() {
 const FuelStations = useSelector((state) => state.AllData.FuelStations);
 const OrdersFuel = useSelector((state) => state.AllData.OrdersFuel);
 const FuelOwners = useSelector((state) => state.AllData.FuelOwners);
 const [OwnerId,setOwnerId]=useState("");
 const auth_owner = window.localStorage.getItem("auth_Owner");
 const dispatch = useDispatch();

 useEffect(() => {
    dispatch(getOwners());
    dispatch(fetchOrdersFuel());
    getIdOwner()
 },[])

 const getIdOwner = () => {
  const id = FuelOwners.filter(item => item.Email==auth_owner).map(item => item.id);
  setOwnerId(id);
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
            <div class="admin">
        <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>TOTAL FUEL STATION</h4>
             <h3>{FuelStations.filter(it => it.owner.Email == auth_owner).length}</h3>
           </div>
           <div class="view">
           <Link to="/FuelOwner/FuelStation">view All</Link>
           </div>
        </div>
        <div class="">
        <div class="con">
        <i class="fas fa-building"></i>
           </div>
           <div class="">
             <h4>New Fuel Orders</h4>
             <h3>{OrdersFuel.filter(item => item.fuel_station.Owner_id==OwnerId && item.Statuts==0).length}</h3>
           </div>
           <div class="view">
           <Link to="/FuelOwner/New_Order">view All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-building"></i>
           </div>
           <div class="">
             <h4>Confirmed Fuel Orders</h4>
             <h3>{OrdersFuel.filter(item => item.fuel_station.Owner_id==OwnerId && item.Statuts==1).length}</h3>
           </div>
           <div class="view">
           <Link to="/FuelOwner/Confirmed_Order">view All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-folder"></i>
           </div>
           <div class="">
             <h4>Delivey On The Way Fuel</h4>
             <h3>{OrdersFuel.filter(item => item.fuel_station.Owner_id==OwnerId && item.Statuts==2).length}</h3>
           </div>
           <div class="view">
           <Link to="/FuelOwner/OnTheWay_Order">view All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
        <i class="fas fa-times"></i>
           </div>
           <div class="">
             <h4>Delivred Fuel Orders</h4>
             <h3>{OrdersFuel.filter(item => item.fuel_station.Owner_id==OwnerId && item.Statuts==3).length}</h3>
           </div>
           <div class="view">
               <Link to="/FuelOwner/Delivred__Order">view All</Link>
           </div>
        </div>

        <div class="">
        <div class="con">
          <i class="fas fa-check"></i>
        </div>
           <div class="">
             <h4>Cancelled Orders</h4>      
             <h3>{OrdersFuel.filter(item => item.fuel_station.Owner_id==OwnerId && item.Statuts==4).length}</h3>
           </div>
           <div class="view">
           <Link to="/FuelOwner/Cancelled_Order">view All</Link>
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
    window.location.href="/OwnerStation"
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