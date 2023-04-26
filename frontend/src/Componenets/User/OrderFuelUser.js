import React,{useEffect, useState} from 'react'
import SideBarUser from './SideBarUser'
import Header from '../Header'
import styled from 'styled-components'
import {fetchStates,fetchFuelStations,fetchCites,fetchTypesFuel,fetchOrdersFuel} from '../redux-toolkit/Data/DataSlice'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'

function OrderFuelUser() {

   const [State,setState]=useState("");
   const [City,setCity]=useState("");
   const [FuelStation,setFuelStation]=useState("");
   const [Fuel,setFuel]=useState("");
   const [Price,setPrice]=useState("");
   const [Date,setDate]=useState("");
   const [Time,setTime]=useState("");
   const [Quantity,setQuantity]=useState("");
   const [Adress,setAdress]=useState("");
   const [Errors,setErrors]=useState("");
   
   const dispatch = useDispatch();
   //get data
   const States = useSelector((state) => state.AllData.States);
   const Cities = useSelector((state) => state.AllData.Cities);
   const FuelStations = useSelector((state) => state.AllData.FuelStations);
   const Fuels = useSelector((state) => state.AllData.Fuels);
   const OrdersFuel = useSelector((state) => state.AllData.OrdersFuel);
   const [user_id,setUser_Id]=useState("");

   useEffect(() =>{
     dispatch(fetchStates());
     dispatch(fetchCites());
     dispatch(fetchFuelStations());
     dispatch(fetchTypesFuel());
     dispatch(fetchOrdersFuel())
     loggedUser();
  },[])

   const auth_user = window.localStorage.getItem("auth_user");

   const loggedUser = () => {
       axios.get(`http://127.0.0.1:8000/api/users/`).then(res => {
            res.data.map(it => {
               if(it.email == auth_user && it.Type == 1){
                  //  console.log(it.id);
                   setUser_Id(it.id);
               }
            })
      }).catch(er => {
          console.log(er);
      })
   }
   const handlSubmit = (e) => {
      e.preventDefault();
      const Data = new FormData();
      Data.append("user_id",user_id);
      Data.append("State_id",State);
      Data.append("City_id",City);
      Data.append("FuelStation_id",FuelStation);
      Data.append("Fuel_id",Fuel);
      Data.append("PriceFuel",Price);
      Data.append("QuantityFuel",Quantity);
      Data.append("AdressFuel",Adress);
      Data.append("Date",Date);
      Data.append("Time",Time);

      axios.post("http://127.0.0.1:8000/api/OrdesFuel",Data).then(res => {
         console.log(res.data);
         window.location.reload(true)
     }).catch(err => {
      
        setErrors(err.response.data.errors)
        console.log(err.response.data.errors);
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
            <h2>Add Order Your Fuel</h2>
            <form onSubmit={handlSubmit}>
              <label className='mb-2'>State</label>
               <select  className='form-control mb-3' onChange={(e) => setState(e.target.value)}>
                  <option>Choose State</option>
                  {States.map(item => (
                      <option value={item.id}>{item.Name}</option>
                  ))}
               </select>
               {/* <p className={`${Errors.State_id ? 'alert alert-danger' : ""}`}>{Errors.State_id}</p> */}
               <label className='mb-2'>City</label>
               <select  className='form-control mb-3' onChange={(e) => setCity(e.target.value)}>
                       {State ? <option>Choose City</option> : ""}
                   {Cities.filter(it => it.State_id == State).map(item => (
                          <option value={item.id}>{item.Name}</option>
                   ))}
               </select>
               {/* <p className={`${Errors.City_id ? 'alert alert-danger' : ""}`}>{Errors.City_id}</p> */}
               <label className='mb-2'>Fuel Station</label>
               <select  className='form-control mb-3' onChange={(e) => setFuelStation(e.target.value)} >
                      {City ? <option>Choose Fuel Station</option> : ""}
                   {FuelStations.filter(it => it.City_id==City).map(item => (
                     <option value={item.id}>{item.NameStation}</option>
                  ))}
               </select>
               {/* <p className={`${Errors.FuelStation_id ? 'alert alert-danger' : ""}`}>{Errors.FuelStation_id}</p> */}
               <label className='mb-2'>Type Of Fuel</label>
               <select  className='form-control mb-3' onChange={(e) => setFuel(e.target.value)}>
                   <option>Choose Fuel</option>
                  {Fuels.map(item => (
                     <option value={item.id}>{item.Name_Fuel}</option>
                  ))}
               </select>
               {/* <p className={`${Errors.Fuel_id  ? 'alert alert-danger' : ""}`}>{Errors.Fuel_id}</p> */}
               <label className='mb-2'>Price Of Fuel</label>
               <select className='form-control mb-3' onChange={(e) =>setPrice(e.target.value)}>
                   {Fuel ? <option>Price</option> : ""}
                  {Fuels.filter(it => it.id == Fuel).map(item => (
                       <option value={item.Price} >{item.Price}</option>
                  ))}
               </select>
               {/* <p className={`${Errors.PriceFuel  ? 'alert alert-danger' : ""}`}>{Errors.PriceFuel}</p> */}
               <label className='mb-2'>Date Of Delivery</label>
               <input type="date" className='form-control mb-3' onChange={(e) => setDate(e.target.value)} />
               {/* <p className={`${Errors.Date  ? 'alert alert-danger' : ""}`}>{Errors.Date}</p> */}
               <label className='mb-2'>Time Of Delivery</label>
               <input type="time" className='form-control mb-3'  onChange={(e) => setTime(e.target.value)} />
               {/* <p className={`${Errors.Time  ? 'alert alert-danger' : ""}`}>{Errors.Time}</p> */}
               <label className='mb-2'>Quantity Of Fuel</label>
               <input type="number" className='form-control mb-3'  onChange={(e) => setQuantity(e.target.value)} />
               {/* <p className={`${Errors.QuantityFuel  ? 'alert alert-danger' : ""}`}>{Errors.QuantityFuel}</p> */}
               <label className='mb-2'>Adress Of Fuel</label>
               <input type="text" className='form-control mb-3'  onChange={(e) => setAdress(e.target.value)} />
               {/* <p className={`${Errors.AdressFuel  ? 'alert alert-danger' : ""}`}>{Errors.AdressFuel}</p> */}
               <input type="submit" className='btn btn-primary' value="Add Order" />
            </form>
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

export default OrderFuelUser

const Content = styled.div`
   background-color:#e5e5e5;
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
     p{
        
      }
  }
`