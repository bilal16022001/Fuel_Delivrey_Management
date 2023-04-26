import React,{useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function City() {
  
  const [AddCity,setAddCity]=useState("");
  const [Cities,setCities]=useState([]);
  const [states,setStates]=useState([]);
  const [Slct,setSlct]=useState("");
  const [Errors,setErrors]=useState("");
  const [itemId,setItemID]=useState("");
  const [id,setId]=useState(null);
  const [CityDetail,setCityDetail]=useState([]);
  
  const auth_admin = window.localStorage.getItem("auth_admin");

  useEffect(() => {
     fetchData();
     fetchStates();
  },[])

  const fetchData = () => {
    axios.get("http://localhost:8000/api/City").then(res => {
    setCities(res.data);
 }).catch(err => {
    console.log(err);
  })
  }

  const fetchStates = () => {
    axios.get("http://localhost:8000/api/State").then(res => {
    setStates(res.data);
    }).catch(err => {
      console.log("err");
    });
}

const handlSelect = (event) => {
  setSlct(event.target.value);
}

  const Add_City = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("Name",AddCity)
    data.append("State_id",Slct)
    axios.post("http://localhost:8000/api/City",data).then(res => {
    window.location.reload(true);
 }).catch(err => {
      setErrors(err.response.data.errors)

 });

  }

  const fetchItem = (id) => {
    axios.get(`http://localhost:8000/api/City/${id}`).then(res => {
     setCityDetail(res.data);
     setAddCity(res.data.Name);
     setSlct(res.data.State_id)
    }).catch(err => {
       console.log(err);
    })
    setItemID(id)
  }

  const updateCity= (e)=> {
    e.preventDefault();

    const Data = new FormData();
 
       Data.append("Name",AddCity);

        if(!isNaN(Slct)){
            Data.append("State_id",Slct);
        }

        if(!isNaN(CityDetail.State_id)){
           Data.append("State_id",CityDetail.State_id)
        }

    Data.append('_method', 'PATCH');

    axios.post(`http://localhost:8000/api/City/${itemId}`,Data).then(res => {

            window.location.reload(true);
     
        }).catch(err => {
              console.log(err);
              setErrors(err.response.data.errors)
        });
  }

  const DeleteState = (e) => {
    e.preventDefault()
       axios.delete(`http://localhost:8000/api/City/${id}`).then(res => {
              window.location.reload(true);
      });
  }

  if(auth_admin!=null){
  return (
    <div className='city d-flex'>
        <Sidebar/>
        <div className='w-100'>
           <Header/>
           <Content className=''>
        <div className='content'>
          <div className="parent p-3">
        <h2 className="text-center mb-3">Manage City</h2>
        <div className="">
            <div className="table-responsive">
                <table className="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name</td>
                          <td>State</td>
                          <td>Creation date</td>
                          <td>Action</td>
                    </tr>
                    {Cities.map(item => (
                        <tr>
                          <td>{item.id}</td>
                          <td>{item.Name}</td>
                          <td>
                              {item.state.Name}
                          </td>
                       
                          <td>{item.created_at}</td>
                          <td>
                              <a href="" data-bs-toggle="modal" onClick={() => fetchItem(item.id)}  data-bs-target="#editCity"><EditIcon/></a>
                              <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)} data-bs-target="#deleteCity"><DeleteIcon/></a>
                          </td>
                          <div class="modal fade" id="deleteCity"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete State</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                            <form onSubmit={DeleteState}>
                               <p>Are you sure to delete this City ?</p>
                                 {Cities.filter(item => item.id==id).map(item => (
                                    <input className="mb-3" type="text" value={item.Name} disabled />
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

                       <div class="modal fade" id="editCity"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit City</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                          <form onSubmit={updateCity}>
                            <select className='mb-2' onChange={handlSelect}>
                              <option selected>...</option>
                                {states.map(item => (
                                  <option value={`${item.id}`} selected={Slct==item.id ? "selected" : ""}>{item.Name}</option>
                                ))}
                            </select><br/>
                            <p className={`${Errors.State_id ? 'alert alert-danger' : ""}`}>{Errors.State_id}</p>
                              <input className="mb-3" type="text"  onChange={(e) => setAddCity(e.target.value)} value={AddCity} placeholder="City" />
                                <p className={`${Errors.Name ? 'alert alert-danger' : ""}`}>{Errors.Name}</p>
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
          Add City
      </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add City</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={Add_City}>
          <select className='mb-2' onChange={handlSelect}>
            <option selected>...</option>
              {states.map(item => (
                <option value={`${item.id}`}>{item.Name}</option>
              ))}
          </select><br/>
            <input className="mb-3" type="text" onChange={(e) => setAddCity(e.target.value)} placeholder="City" />
              <p className={`${Errors.Name ? 'alert alert-danger' : ""}`}>{Errors.Name}</p>
              <p className={`${Errors.State_id ? 'alert alert-danger' : ""}`}>{Errors.State_id}</p>
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

export default City

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`