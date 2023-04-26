import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Sidebar from './Sidebar'
import styled from 'styled-components'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {fetchUsers} from '../redux-toolkit/Data/DataSlice'
import { useDispatch,useSelector } from 'react-redux'

function State(props) {

   const [State,setState]=useState("");
   const [states,setStates]=useState([]);
   const [check,setCheck]=useState("");
   const [id,setId]=useState(null);
   const [StateDetail,setStateDetail]=useState([]);
   const [itemId,setItemID]=useState("");
   const [UpdateState,UpdateSetState]=useState("");
   const [add,setAdd]=useState(null);
   const users = useSelector((state) => state.AllData.users);
   const dispatch = useDispatch();
   const auth_admin = window.localStorage.getItem("auth_admin");

 
    useEffect(() => {
      fetchData();
    dispatch(fetchUsers())
    },[])

    const fetchData = () => {
          axios.get("http://localhost:8000/api/State").then(res => {
          setStates(res.data);
      }).catch(err => {
        console.log("err");
      });
    }
  
  const AddState = (e) => {
    e.preventDefault();
    const Data = new FormData();
      Data.append("Name",State);
   
        axios.post("http://localhost:8000/api/State",Data).then(res => {
           setCheck("")
           setAdd(true)
           window.location.reload(true);
        }).catch(err => {
          setCheck(err.response.data.message)
          setAdd(false)

        });
  }

    const fetchItem = (id) => {
    axios.get(`http://localhost:8000/api/State/${id}`).then(res => {
    setStateDetail(res.data);
    }).catch(err => {
       console.log("err");
    })
    setItemID(id)
  }

  const updateState= (e)=> {
    e.preventDefault();

    const Data = new FormData();
 
   if(UpdateState!=""){
       Data.append("Name",UpdateState);
    }
    else if(StateDetail.Name!=""){
      Data.append("Name",StateDetail.Name);
    }
 
    Data.append('_method', 'PATCH');
 
        axios.post(`http://localhost:8000/api/State/${itemId}`,Data).then(res => {

          window.location.reload(true);
     
        }).catch(err => {
        console.log(err);
      });
  }

  const DeleteState = (e) => {
    e.preventDefault()
       axios.delete(`http://localhost:8000/api/State/${id}`).then(res => {

              window.location.reload(true);
      });
  }

  if(auth_admin!=null){
  return (
    <div className='state d-flex'>
    <Sidebar/>
    <div className='w-100'>
      <Header/>
        <Content className=''>
        <div className='content'>
          <div class="parent p-3">
        <h2 class="text-center mb-3">Manage State</h2>
        <div class="">
            <div class="table-responsive">
                <table class="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name</td>
                          <td>Creation date</td>
                          <td>Action</td>
                    </tr>
                    {states.map(item => (
                       <tr>
                       <td>{item.id}</td>
                       <td>{item.Name}</td>
                       <td>{item.created_at}</td>
                       <td>
                          <a href="" data-bs-toggle="modal"  onClick={() => fetchItem(item.id)} data-bs-target="#e"><EditIcon/></a>
                          <a href="" data-bs-toggle="modal" onClick={() => setId(item.id)} data-bs-target="#de"><DeleteIcon/></a>
                       </td>

                       <div class="modal fade" id="de"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Delete State</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                            <form onSubmit={DeleteState}>
                               <p>Are you sure to delete this State ?</p>
                                 {states.filter(item => item.id==id).map(item => (
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

                       <div class="modal fade" id="e"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog">
                       <div class="modal-content">
                         <div class="modal-header">
                           <h1 class="modal-title fs-5" id="exampleModalLabel"> Edit State</h1>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                         <div class="modal-body">
                            <form onSubmit={updateState}>
                               <input className="mb-3" type="text" onChange={(e) => UpdateSetState(e.target.value)} defaultValue={StateDetail.Name} placeholder="State" required />
              
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
          Add State
      </button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add State</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <form onSubmit={AddState}>
            <input className="mb-3" type="text" onChange={(e) => setState(e.target.value)} placeholder="State" />
            <p className={`${check ? "alert alert-danger" : ""}`}>{check}</p>
            <div class="modal-footer">
              <input  type="button"  class="btn btn-secondary" data-bs-dismiss="modal" value="Close" />
              <input  type="submit"  class="btn btn-primary" value="Save changes" />
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

export default State

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;

  }
`