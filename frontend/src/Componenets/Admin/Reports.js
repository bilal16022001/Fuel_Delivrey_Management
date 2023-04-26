import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import {fetchFuelStations,fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Reports() {

  const FuelStations = useSelector((state) => state.AllData.FuelStations);
  const FuelOrders = useSelector((state) => state.AllData.OrdersFuel);
  const [FromDate,setFromDate]=useState("");
  const [ToDate,setToDate]=useState("");
  const [TypeFuelStation,setTypeFuelStation]=useState("");
  const [fromD,setformD]=useState("");
  const [ToD,setTod]=useState("");
  const [fuelS,setFuelS]=useState("");
  const auth_admin = window.localStorage.getItem("auth_admin");
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchFuelStations());
    dispatch(fetchOrdersFuel());
  },[]);

  const HandlReports = (e) => {
     e.preventDefault();
 
     setformD(FromDate)
     setTod(ToDate)
     setFuelS(TypeFuelStation)
  }
  if(auth_admin!=null){
  return (
    <div className='d-flex'>
    <Sidebar/>
      <div className='w-100'>
        <Header/>
        <Content className=''>
        <div className='content'>
            <div class="parent p-3">
               <h2>Report</h2>
               <form className='mb-3' onSubmit={HandlReports}>
                  <label className='mb-2'>From</label>
                  <input className='form-control mb-3' onChange={(e) => setFromDate(e.target.value)} type="date"  />
                  <label className='mb-2'>To</label>
                  <input className='form-control mb-3' onChange={(e) => setToDate(e.target.value)}  type="date"  />
                  <label className='mb-3'>Choose Fuel Staion</label><br/>
                  <select className='form-control mb-3' onChange={(e) => setTypeFuelStation(e.target.value)} >
                    <option>Choose Fuel Station</option>
                      {FuelStations.map(item => (
                         <option value={item.id}>{item.NameStation}</option>
                      ))}
                  </select>
                  <input className='btn btn-primary' type="submit" value="search" />
               </form>
              {fromD == "" && ToD == "" ? "" :  <h2 className="text-center mb-3">Report from {fromD} to {ToD}</h2>}
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

                    {FuelOrders.filter((it) => it.Date >= fromD && it.Date <= ToD && it.FuelStation_id == fuelS).map(item => (
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
                         <td><Link to={`/OrderDetail/${item.id}`}>view</Link></td>
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
  }else{
    window.location.href="/admin"
    }
}

export default Reports

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`