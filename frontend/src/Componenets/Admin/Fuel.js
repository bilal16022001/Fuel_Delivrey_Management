import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Fuel() {
  const [itemId,setItemID]=useState("");
  const [id,setId]=useState(null);
  const [Errors,setErrors]=useState("");
  const [FuelName,setFuelName]=useState("");
  const [FuelPrice,setFuelPrice]=useState("");
  const [Fuels,setFuels]=useState([]);
  const auth_admin = window.localStorage.getItem("auth_admin");
  
 useEffect(() => {
  fetchFuels()
},[]);

  const fetchFuels = () => {
     axios.get("http://127.0.0.1:8000/api/Fuels").then(res => {
         setFuels(res.data);
    }).catch(err => {
          console.log(err);
    })
  }

  const fetchItem = (id) => {
    axios.get(`http://localhost:8000/api/Fuels/${id}`).then(res => {
       setFuelName(res.data.Name_Fuel);
       setFuelPrice(res.data.Price)
    }).catch(err => {
       console.log("err");
    })
    setItemID(id)
  }

  const Add_Fuel = (e) => {
     e.preventDefault();

     const data = new FormData();
     data.append("Name_Fuel",FuelName);
     data.append("Price",FuelPrice);
     axios.post("http://localhost:8000/api/Fuels",data).then(res => {
     window.location.reload(true);

  }).catch(err => {
       setErrors(err.response.data.errors)
       console.log(err.response.data.errors);
 
  });
  
  }

  const updateFuel = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("Name_Fuel",FuelName);
    data.append("Price",FuelPrice);
    data.append('_method', 'PATCH');

    axios.post(`http://localhost:8000/api/Fuels/${itemId}`,data).then(res => {

    window.location.reload(true);

    }).catch(err => {
          console.log(err);
    });

  }

  const DeleteFuel = (e) => {
     e.preventDefault();
  
     axios.delete(`http://localhost:8000/api/Fuels/${id}`).then(res => {
          window.location.reload(true);
    }).catch(err => {
         console.log(err);
    });
  }
  if(auth_admin!=null){
  return (
    <div className=' d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-3">Manage Fuels</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name Fuel</td>
                      <td>Fuel Price</td>
                      <td>Creation date</td>
                      <td>Action</td>
                </tr>
                {Fuels.map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.Name_Fuel}</td>
                      <td>
                          {item.Price}
                      </td>
                   
                      <td>{item.created_at}</td>
                      <td>
                          <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)}  data-bs-target="#editFuel"><EditIcon/></a>
                          <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)} data-bs-target="#deleteFuel"><DeleteIcon/></a>
                      </td>
                      <div class="modal fade" id="deleteFuel"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                   <div class="modal-content">
                     <div class="modal-header">
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete State</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                        <form onSubmit={DeleteFuel}>
                           <p>Are you sure to delete this Fuel ?</p>
                             {Fuels.filter(item => item.id==id).map(item => (
                                <input className="mb-3" type="text" value={item.Name_Fuel} disabled />
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

                   <div class="modal fade" id="editFuel"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                 <div class="modal-dialog">
                   <div class="modal-content">
                     <div class="modal-header">
                       <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit City</h1>
                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body">
                      <form onSubmit={updateFuel}>
                
                      <input className="mb-3 form-control" type="text" onChange={(e) => setFuelName(e.target.value)} placeholder="Name Of Fuel" value={FuelName} />
                          <p className={`${Errors.Name_Fuel ? 'alert alert-danger' : ""}`}>{Errors.Name_Fuel}</p>
                        <input className="mb-3 form-control" type="text" onChange={(e) => setFuelPrice(e.target.value)} placeholder="Price Of Fuel" value={FuelPrice} />
                          <p className={`${Errors.Price ? 'alert alert-danger' : ""}`}>{Errors.Price}</p>
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
  </div>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add Fuel
  </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Fuel</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
     <form onSubmit={Add_Fuel}>
   
        <input className="mb-3 form-control" type="text" onChange={(e) => setFuelName(e.target.value)} placeholder="Name Of Fuel" />
          <p className={`${Errors.Name_Fuel ? 'alert alert-danger' : ""}`}>{Errors.Name_Fuel}</p>
        <input className="mb-3 form-control" type="text" onChange={(e) => setFuelPrice(e.target.value)} placeholder="Price Of Fuel" />
          <p className={`${Errors.Price ? 'alert alert-danger' : ""}`}>{Errors.Price}</p>
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
  }else{
    window.location.href="/admin"
 }
}

export default Fuel

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`