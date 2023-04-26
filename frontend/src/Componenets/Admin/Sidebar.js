import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FolderIcon from '@mui/icons-material/Folder';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ArticleIcon from '@mui/icons-material/Article';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EmailIcon from '@mui/icons-material/Email';
import styled from 'styled-components';
import {useSelector,useDispatch} from 'react-redux'
import img from '../images/user.webp'
import {fetchUsers} from '../redux-toolkit/Data/DataSlice'

function Sidebar() {
  const widthSide = useSelector((state) => state.AllData.width);
  const users = useSelector((state) => state.AllData.users);
  const [Name,setName]=useState("");
  const auth_admin = window.localStorage.getItem("auth_admin");
  const dispatch = useDispatch();

  useEffect(() =>{
    fetchAdmin();
    dispatch(fetchUsers())
  },[]);

  const fetchAdmin = (arg=null) => {
    users.filter(fl => fl.email==auth_admin).map(item => {
         if(arg==null){
            setName(item.name); 
         }
         else{
            window.localStorage.removeItem("auth_admin");
            window.localStorage.removeItem("auth");
            window.location.href="/admin";
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
                  <li><a className="dropdown-item" href="#"><Link to="/PofileAdmin">Profile</Link></a></li>
                  <li><a onClick={logout} className="dropdown-item" href="#">logout</a></li>
              </ul>

       </div>
      <div className="sidebar-item">
        <i className="fas fa-home"></i>
       <Link to="/Dashboard"><HomeIcon/></Link> <Link className="itemSide" to="/Dashboard"> Dashboard</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-user"></i>
      <Link to="/State"><ApartmentIcon/> </Link>  <Link className="itemSide" to="/State">States</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
      <Link to="/City"><PublicIcon/></Link>  <Link className="itemSide" to="/City"> City</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Fuel"><LocalGasStationIcon/></Link>  <Link className="itemSide" to="/Fuel">Fuel Price</Link>
      </div>
      <div className="sidebar-item position-relative">
        <i className="fas fa-cog"></i>
        <a className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><ArticleIcon/></a>
        <a className="btn btn-secondary dropdown-toggle itemSide" data-bs-toggle="dropdown" aria-expanded="false">
          Pages
       </a>
         <ul class="dropdown-menu dropPages">
            <li><Link to="/Page_Contact"><ContactPageIcon /></Link><Link className="dropdown-item itemSide" to="/Page_Contact">Page Contact</Link></li>
            <li><Link to="/Page_About"><ArticleIcon/></Link><Link className="dropdown-item itemSide" to="/Page_About"> Page About</Link></li>
        </ul>

      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Reports"><FolderIcon/></Link>  <Link className="itemSide" to="/Reports"> Reports</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
       <Link to="/Inquiry"><EmailIcon/></Link> <Link className="itemSide" to="/Inquiry"> Inquiry</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Search"><SearchIcon/></Link>  <Link className="itemSide" to="/Search"> Search</Link>
      </div> <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Users"><PeopleAltIcon/></Link> <Link className="itemSide" to="/Users"> Users</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Station_Owner"><PeopleAltIcon/></Link> <Link className="itemSide" to="/Station_Owner">Fuel Station Owner</Link>
      </div>
      </div>
    </div>
    </Side>
  );
}

export default Sidebar;

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