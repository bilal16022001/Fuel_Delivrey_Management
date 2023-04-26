import React, { useEffect, useState } from 'react'
import SideBarUser from './SideBarUser'
import Header from '../Header'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function OrderDetail() {
    const {id} = useParams();
    const [OrderDetail,setOrderDetail]=useState([]);
    const [Order_Statuts,setOrderStatuts]=useState([]);
    const auth_user = window.localStorage.getItem("auth_user");

 useEffect(() => {
    fetchOrder();
    fetchStatutOrder();
 },[])

  const fetchOrder = () => {
    axios.get(`http://127.0.0.1:8000/api/OrdesFuel/`).then(res =>{
      setOrderDetail(res.data.filter(it => it.id == id))
   }).catch(er => {
     console.log(er);
   })
}

const fetchStatutOrder = () => {
  axios.get("http://127.0.0.1:8000/api/Order_Statuts").then(res => {
  setOrderStatuts(res.data.filter(it => it.Order_id==id));
   }).catch(er => {
    console.log(er);
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
              <h3 className='mb-3'>View Order Detail</h3>
              <div className="table-responsive">
              <table className="main-table text-center table table-bordered">
              {OrderDetail.map(item => (
                  <>
                        <h4 className='text-center'>       
                        Order Number : {item.Order_Number}          
                        </h4>
                    <tr>
                        <td>Full Name</td>
                        <td>{item.user.name}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Mobile Phone</td>
                        <td>{item.user.Phone}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{item.user.email}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <h4 className='text-center mt-2'>       
                      Fuel Station Details        
                    </h4>
                    <tr>
                        <td>Name Of Fuel Station</td>
                        <td>{item.fuel_station.NameStation}</td>
                        <td>State Of Fuel Station</td>
                        <td>{item.state.Name}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>City Of Fuel Station</td>
                        <td>{item.city.Name}</td>
                        <td>location Of Fuel Station</td>
                        <td>{item.fuel_station.LocationStation}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <h4 className='text-center mt-2'>       
                       Order Details    
                    </h4>
                    <tr>
                        <td>Order Received State</td>
                        <td>{item.state.Name}</td>
                        <td>Order Recevied City</td>
                        <td>{item.city.Name}</td>
                        <td>Type Of Fuel</td>
                        <td>{item.fuel.Name_Fuel}</td>
                    </tr>
                    <tr>
                        <td>Fuel Price</td>
                        <td>{item.fuel.Price}</td>
                        <td>Fuel Delivery Date</td>
                        <td>{item.Date}</td>
                        <td>Fuel Delivery Time</td>
                        <td>{item.Time}</td>
                    </tr>
                    <tr>
                        <td>Quantity OF fuel</td>
                        <td>{item.QuantityFuel}</td>
                        <td>Delivery Address</td>
                        <td>{item.AdressFuel}</td>
                        <td>Order Final Statuts</td>
                        {Order_Statuts.map((item,i) => (         
                            <td>{Order_Statuts.length == i+1 ? item.Statuts == 1 ? "Confimred" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled" : ""}</td>
                        ))}
                         {Order_Statuts.length > 0 ? "" : <td>Not Response Yet</td>}
                    </tr>
                    <tr>
                        <td>Admin Remark</td>
                        {Order_Statuts.map((item,i) => (         
                            <td>{Order_Statuts.length == i+1 ? item.Remark : ""}</td>
                        ))}
                        {Order_Statuts.length > 0 ? "" : <td>Not Updated Yet</td>}
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <h4 className='text-center mt-2 mb-3'>       
                       Invoice Histroy    
                    </h4>
                    <tr>
                        <th>#</th>
                        <th>Order Quantity (ltr)</th>
                        <th>Fuel Price</th>
                        <th>Total Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {Order_Statuts.filter(it => it.Statuts == 3).map(s => (
                        <>
                           <tr>
                              <td>{item.id}</td>
                              <td>{item.QuantityFuel}</td>
                              <td>{item.PriceFuel}</td>
                              <td>{item.QuantityFuel * item.PriceFuel}</td>
                              <td></td>
                              <td></td>
                          </tr>
                          <tr>
                              <th>Grand Total</th>
                              <td>total</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                        </>
                    ))}
                   
                   
                    <h4 className='text-center mt-2 mb-3'>       
                       Tracking Histroy    
                    </h4>
                    <tr>
                        <th>#</th>
                        <th>Remark</th>
                        <th>Statuts</th>
                        <th>Time</th>
                        <td></td>
                        <td></td>
                    </tr>
                   {Order_Statuts.map(item => (
                          <tr>
                              <td>{item.id}</td>
                              <td>{item.Remark}</td>
                              <td>{item.Statuts == 0 ? "Not Updated Yet" : item.Statuts == 1 ? "Confimred" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled"}</td>
                              <td>{item.created_at.slice(0,10)}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                    ))}
                  </>
                ))}
              </table>
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

export default OrderDetail

const Content = styled.div`
   background-color:#e5e5e5; 
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`
