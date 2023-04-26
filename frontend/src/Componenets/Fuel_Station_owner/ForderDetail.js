import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import SideBarOwner from './SideBarOwner'
import styled from 'styled-components'
import axios from 'axios'

function ForderDetail() {
    const {id} = useParams();
    const [OrderDetail,setOrderDetail]=useState([]);
    const [Statuts,setStatuts]=useState("");
    const [Remark,setRemark]=useState("");
    const [Order_Statuts,setOrderStatuts]=useState([]);
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
    
    const HnadlStatutOrder = (e) => {
       e.preventDefault();

      const Data = new FormData();
         Data.append("Statuts",Statuts);
         Data.append("Remark",Remark);
         Data.append("User_id",OrderDetail[0].user_id);
         Data.append("Order_id",id);

         axios.post("http://127.0.0.1:8000/api/Order_Statuts",Data).then(res => {
            console.log(res.data);
            window.location.reload(true)
         }).catch(er => {
            console.log(er);
         })
       const  data = new FormData();
              data.append("Statuts",Statuts);
              data.append("_method","PATCH");
         axios.post(`http://127.0.0.1:8000/api/OrdesFuel/${id}`,data).then(res => {
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
    
  return (
    <div className='d-flex'>
    <SideBarOwner/>
      <div className='w-100'>
        <Header/>
        <Content className=''>
      <div className='content'>
            <div class="parent p-3">
            <h3 className='mb-3'>New Orders</h3>
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
                            <td>
                              {Order_Statuts.length == i+1 ? item.Statuts == 1 ? "Confimred"  : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled" : ""}
                              </td>
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
                              <td>{item.Statuts == 0 ? "Not Updated Yet" : item.Statuts == 1 ? "Confirmed" : item.Statuts == 2 ? "On The Way" : item.Statuts == 3 ? "Delivred" : "Cancelled"}</td>
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
            {Order_Statuts.length > 0 ? <a className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Take Action</a> : "" }  
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Take Action</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={HnadlStatutOrder}>
            <label className='mb-3'>Remark</label>
            <textarea className='w-100 mb-3 p-1' onChange={(e) => setRemark(e.target.value)}></textarea>
            <select className='form-control mb-3'  onChange={(e) => setStatuts(e.target.value)}>
                <option>Choose Statut</option>
                <option value="1">confirmed</option>
                <option value="2">On The Way</option>
                <option value="3">Delivred</option>
                <option value="4">Cancelled</option>
            </select>
            <div class="modal-footer">
              <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
              <input type="submit"  class="btn btn-primary" value="Update" />
            </div>
         </form>
      </div>
   
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

export default ForderDetail

const Content = styled.div`
   background-color:#e5e5e5;
  //  height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`