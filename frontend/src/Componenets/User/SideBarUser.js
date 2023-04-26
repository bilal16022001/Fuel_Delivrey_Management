import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import img from '../images/user.webp'
import {fetchUsers} from '../redux-toolkit/Data/DataSlice'
import {useSelector,useDispatch} from 'react-redux'

function SideBarUser() {
  const widthSide = useSelector((state) => state.AllData.width);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.AllData.users);
  const auth_user = window.localStorage.getItem("auth_user");
  const [Name,setName]=useState("");

  useEffect(() =>{
    fetchAdmin();
    dispatch(fetchUsers())
  },[dispatch]);

  const fetchAdmin = (arg=null) => {
    users.filter(fl => fl.email==auth_user && fl.Type==1).map(item => {
         if(arg==null){
            setName(item.name);
      
         }
         else{
            window.localStorage.removeItem("auth_user");
            window.localStorage.removeItem("auth");
            window.location.href="/User";
         }
    })
  
  }

   const logout = () => {
      fetchAdmin("logout");
   }
  return (

    <Side widthSide={widthSide}>
    <div className="sidebar">
    <div className="all">
    <div className="profile text-center">
               
               <Img className='imgProfile' src={img} />          
               <a className="admin text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome <span className='nameLogged'>{Name} </span></a>
               <ul className="dropdown-menu dropMenu text-center pro" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#"><Link to="/User/ProfileUser">Profile</Link></a></li>
                  <li><a onClick={logout} className="dropdown-item" href="#">logout</a></li>
              </ul>

       </div>
  <div className="sidebar-item">
    <i className="fas fa-home"></i>
    <Link to="/User/Dashboard"><HomeIcon/></Link>  <Link className='itemSide' to="/User/Dashboard"> Dashboard</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-user"></i>
    <Link to="/User/OrderFuel"><ApartmentIcon/></Link> <Link className='itemSide' to="/User/OrderFuel">Order your Fuel</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/User/OrderStatus"><PublicIcon/></Link> <Link className='itemSide' to="/User/OrderStatus">Orders Status</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link  to="/User/Search"><SearchIcon/></Link> <Link className='itemSide' to="/User/Search"> Search</Link>
  </div>
  </div>
</div>
</Side>
  )
}

export default SideBarUser

const  Img = styled.img`
   width:100px;
   border-radius:50%;

`

const Side = styled.div`
  background-color:rgba(0, 0, 0, 0.87);
  width:${props => props.widthSide}px;
  transition:all .3s;
  color:#fff;
  overflow:hidden;
  .imgProfile{
    width:${props => props.widthSide == 90 ? "65px" : ""};
    margin-left:${props => props.widthSide == 90 ? "-20px" : ""};
   }
  .itemSide{
    display:${props => props.widthSide == 90 ? "none" : ""}
  }
  .nameLogged{
    display:${props => props.widthSide == 90 ? "block" : ""};
    margin-left:${props => props.widthSide == 90 ? "-15px" : ""};
  }
  svg{
    margin-left:${props => props.widthSide == 90 ? "-24px" : ""};
    font-size: ${props => props.widthSide == 90 ? "40px" : ""};

   }
   .dropPages{
        margin-left:${props => props.widthSide == 90 ? "0px" : ""}!important;
   }
   .pro{
       margin-left:${props => props.widthSide == 90 ? "-72px" : ""}!important;
   }
`