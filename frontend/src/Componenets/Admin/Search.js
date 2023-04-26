import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import {fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Search() {
  
  const auth_admin = window.localStorage.getItem("auth_admin");
  const [Search,setSearch]=useState("");
  const [getVS,setVS]=useState("");
   const Orders = useSelector((state) => state.AllData.OrdersFuel);
   const dispatch = useDispatch();
   useEffect(() =>  {
    dispatch(fetchOrdersFuel());
},[]);

const handlSearch = (e) => {
  e.preventDefault();

 setVS(Search)
 console.log("Search => ",Search);
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
                <form onSubmit={handlSearch} className="mb-3">
                   <input className='d-block mb-3' type="search" onChange={(e) => setSearch(e.target.value)} placeholder='phone Or Order Number' />
                   <input className='btn btn-primary' type="submit" value="search" />
                </form>
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

                    {Orders.filter(it => it.Order_Number == getVS || it.user.name == getVS || it.user.Phone == getVS).map(item => (
                       <tr>
                         <td>{item.id}</td>
                         <td>{item.Order_Number}</td>
                         <td>{item.user.name}</td>
                         <td>{item.user.email}</td>
                         <td>{item.user.Phone}</td>
                         <td>{item.fuel_station.NameStation}</td>
                         <td> {item.Statuts == 0 ? "Not Updated Yet" : item.Statuts == 1 ? "Confimred" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled"}</td>
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
  }
  else{
    window.location.href="/admin"
    }
}

export default Search

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`