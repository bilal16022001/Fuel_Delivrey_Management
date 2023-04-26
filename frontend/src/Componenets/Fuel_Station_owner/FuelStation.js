import React,{useState,useEffect} from 'react'
import Header from '../Header'
import SideBarOwner from './SideBarOwner'
import styled from 'styled-components'
import { useDispatch,useSelector } from 'react-redux';
import { fetchCites,fetchStates,fetchFuelStations } from '../redux-toolkit/FuelStations/StationSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function FuelStation() {

  const [Errors,setErrors]=useState("");
  const dispatch = useDispatch();
  const Cities =useSelector((state) => state.data.Cities);
  const States =useSelector((state) => state.data.States);
  const FuelStations =useSelector((state) => state.data.FuelStations);
  
  const [SlctCity,setSlctCity]=useState("");

  const [id,setId]=useState(null);
  const [SlctState,setState]=useState("");
  const [LocationStation,setLocSt]=useState("");
  const [NameStation,setNameSt]=useState("");
  const [itemId,setItemID]=useState("");
  const auth_owner = window.localStorage.getItem("auth_Owner");
  const [OwnerId,setOwnerId]=useState("");

  useEffect(() => {
    dispatch(fetchCites());
    dispatch(fetchStates());
    dispatch(fetchFuelStations());
    fetchOwner()
  }, [dispatch]);
 
  const SelectCity = (e) => {
      setSlctCity(e.target.value)
  }
  const SelectState = (e) => {
      setState(e.target.value)
}

const fetchOwner = () => {
  axios.get("http://localhost:8000/api/FuelOwners").then(res => {
  res.data.filter(item => item.Email == auth_owner).map(it => {
     setOwnerId(it.id)
  });

  }).catch(err => {
  console.log(err);
  })
}

const handlSubmit = (e) => {
  e.preventDefault()
    const Data = new FormData();
      Data.append("NameStation",NameStation)
      Data.append("LocationStation",LocationStation);
      Data.append("City_id",SlctCity)
      Data.append("State_id",SlctState);;
       Data.append("Owner_id",OwnerId);

      axios.post("http://localhost:8000/api/FuelStations",Data).then(res => {
         window.location.reload(true);
      }).catch(err =>{
         console.log(err);
         setErrors(err.response.data.errors)
      });

}

const fetchItem = (id) => {
  axios.get(`http://localhost:8000/api/FuelStations/${id}`).then(res => {
   setNameSt(res.data.NameStation);
   setLocSt(res.data.LocationStation);
   setSlctCity(res.data.City_id);
   setState(res.data.State_id);
  }).catch(err => {
     console.log("err");
  })
  setItemID(id)
}

const UpdateStation=(e)=>{
  e.preventDefault();
  const Data = new FormData();
    Data.append("NameStation",NameStation)
    Data.append("LocationStation",LocationStation);
    Data.append("City_id",SlctCity)
    Data.append("State_id",SlctState);
    Data.append('_method', 'PATCH');

        axios.post(`http://localhost:8000/api/FuelStations/${itemId}`,Data).then(res => {

            window.location.reload(true);
     
        }).catch(err => {
              console.log(err);
              setErrors(err.response.data.errors)
        })
}
const DeleteState = (e) => {
  e.preventDefault()
     axios.delete(`http://localhost:8000/api/FuelStations/${id}`).then(res => {
            window.location.reload(true);
    });
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
            <div class="table-responsive">
            <h2 className="text-center mb-4">Manage Fuel Stations</h2>
                <table class="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name Station</td>
                          <td>Location Station</td>
                          <td>State</td>
                          <td>City</td>
                          <td>Creation date</td>
                          <td>Action</td>
                    </tr>
                    {FuelStations.filter(it => it.owner.id == OwnerId).map(item => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.NameStation}</td>
                            <td>{item.LocationStation}</td>
                            <td>{item.state.Name}</td>
                            <td>{item.city.Name}</td>
                            <td>{item.created_at}</td>
                            <td>
                              <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)}  data-bs-target="#editStation"><EditIcon/></a>
                              <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)} data-bs-target="#deleteCity"><DeleteIcon/></a>
                          </td>
                          <div class="modal fade" id="deleteCity"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete Fuel Station</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                            <form onSubmit={DeleteState}>
                               <p>Are you sure to delete this Fuel Station ?</p>
                                 {FuelStations.filter(item => item.id==id).map(item => (
                                    <input className="mb-3" type="text" value={item.NameStation} disabled />
                                ))}
                               <div class="modal-footer">
                                 <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
                                 <input type="submit"  class="btn btn-primary" value="Confirm" />
                               </div>
                            </form>
                         </div>
                      
                       </div>
                     </div>
                   </div>
                          <div class="modal fade" id="editStation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Fuel Station</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form onSubmit={UpdateStation}>
          <label className='d-block mb-1'>State</label>
          <select className='form-control' onChange={SelectState}>
            <option selected>...</option>
              {States.map(item => (
                <option value={`${item.id}`} selected={SlctState==item.id ? "selected" : ""}>{item.Name}</option>
              ))}
          </select><br/>
          <p className={`${Errors.State_id ? 'alert alert-danger' : ""}`}>{Errors.State_id}</p>
          <label className='d-block mb-2'>City</label>
          <select className='form-control' onChange={SelectCity}>
            <option selected>...</option>
              {Cities.map(item => (
                <option value={`${item.id}`} selected={SlctCity==item.id ? "selected" : ""}>{item.Name}</option>
              ))}
          </select><br/>
          <p className={`${Errors.City_id ? 'alert alert-danger ' : ""}`}>{Errors.City_id}</p>
            <input className="mb-3 form-control" type="text" value={NameStation} onChange={(e) => setNameSt(e.target.value)}  placeholder="Name OF Fuel Station" />
            <p className={`${Errors.NameStation ? 'alert alert-danger' : ""}`}>{Errors.NameStation}</p>
            <input className="mb-3 form-control" type="text"  value={LocationStation} onChange={(e) => setLocSt(e.target.value)} placeholder="Location OF Fuel Station" />
              <p className={`${Errors.LocationStation ? 'alert alert-danger' : ""}`}>{Errors.LocationStation}</p>
            <div class="modal-footer">
              <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
              <input type="submit"  class="btn btn-primary" value="Save changes" />
            </div>
         </form>
      </div>
   
    </div>
  </div>
                        </div>
                        </tr>
                    ))}
                </table>
              </div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add Fuel Station
         </button>
         <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Fuel Station</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={handlSubmit}>
          <label className='d-block mb-1'>State</label>
          <select className='form-control' onChange={SelectState}>
            <option selected>...</option>
              {States.map(item => (
                <option value={`${item.id}`}>{item.Name}</option>
              ))}
          </select><br/>
          <p className={`${Errors.State_id ? 'alert alert-danger' : ""}`}>{Errors.State_id}</p>
          <label className='d-block mb-2'>City</label>
          <select className='form-control' onChange={SelectCity}>
            <option selected>...</option>
              {Cities.filter(it => it.id == SlctState).map(item => (
                <option value={`${item.id}`}>{item.Name}</option>
              ))}
          </select><br/>
          <p className={`${Errors.City_id ? 'alert alert-danger ' : ""}`}>{Errors.City_id}</p>
            <input className="mb-3 form-control" type="text" onChange={(e) => setNameSt(e.target.value)}  placeholder="Name OF Fuel Station" />
            <p className={`${Errors.NameStation ? 'alert alert-danger' : ""}`}>{Errors.NameStation}</p>
            <input className="mb-3 form-control" type="text" onChange={(e) => setLocSt(e.target.value)} placeholder="Location OF Fuel Station" />
              <p className={`${Errors.LocationStation ? 'alert alert-danger' : ""}`}>{Errors.LocationStation}</p>
            <div class="modal-footer">
              <input type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
              <input type="submit"  class="btn btn-primary" value="Save changes" />
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
 else{
  window.location.href="/OwnerStation"
  }
}

export default FuelStation

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }

`