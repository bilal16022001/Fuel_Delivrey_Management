import React,{useEffect,useState} from 'react'
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
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckIcon from '@mui/icons-material/Check';
import ReorderIcon from '@mui/icons-material/Reorder';
import img from '../images/user.webp'
import axios from 'axios';
import {getOwners} from '../redux-toolkit/Data/DataSlice'
import {useDispatch,useSelector} from 'react-redux'

function SideBarOwner() {
  const widthSide = useSelector((state) => state.AllData.width);
  const owners = useSelector((state) => state.AllData.FuelOwners);
  const auth_Owner = window.localStorage.getItem("auth_Owner");
  const [Name,setName]=useState("");
  const dispatch = useDispatch();

  useEffect(() =>{
    fetchAdmin();
    dispatch(getOwners())
  },[dispatch]);

  const fetchAdmin = (arg=null) => {
    owners.filter(fl => fl.Email==auth_Owner).map(item => {
         if(arg==null){
            setName(item.Name);
      
         }
         else{
            window.localStorage.removeItem("auth_Owner");
            window.localStorage.removeItem("auth");
            window.location.href="/OwnerStation";
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
                  <li><a className="dropdown-item" href="#"><Link to="/FuelOwner/ProfileOwner">Profile</Link></a></li>
                  <li><a onClick={logout} className="dropdown-item" href="#">logout</a></li>
              </ul>

  </div>
  <div className="sidebar-item">
    <i className="fas fa-home"></i>
    <Link to="/FuelOwner/Dashboard"><HomeIcon/></Link> <Link className='itemSide' to="/FuelOwner/Dashboard"> Dashboard</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-user"></i>
    <Link to="/FuelOwner/FuelStation"><ApartmentIcon/></Link>  <Link className='itemSide' to="/FuelOwner/FuelStation">Fuel Station</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <a className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
         <ReorderIcon/>
       </a>
      <a className="itemSide btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Order Of Fuel
       </a>
         <ul class="dropdown-menu dropPages">
         <li><Link to="/FuelOwner/All_Orders"><ReorderIcon/></Link><Link className="itemSide" to="/FuelOwner/All_Orders"> All Fuel Orders</Link></li>
            <li><Link to="/FuelOwner/All_Orders"><ReorderIcon/></Link><Link className="itemSide" to="/FuelOwner/New_Order"> New Fuel Order</Link></li>
            <li>
              <Link className="" to="/FuelOwner/Confirmed_Order"><CheckIcon/></Link>
              <Link className="itemSide" to="/FuelOwner/Confirmed_Order"> Confirmed Fuel Order</Link>
              </li>
            <li><Link class="" to="/FuelOwner/OnTheWay_Order"><LocalShippingIcon/></Link><Link className="itemSide" to="/FuelOwner/OnTheWay_Order">Delivrey On The Way</Link></li>
            <li>
                <Link class="" to="/FuelOwner/Delivred__Order"><DeliveryDiningIcon/></Link>
                <Link class="itemSide" to="/FuelOwner/Delivred__Order">Fuel Delivred</Link>
              </li>
            <li>
                 <Link class="" to="/FuelOwner/Cancelled_Order"><CancelIcon/></Link>
                 <Link className="itemSide" to="/FuelOwner/Cancelled_Order"> Fuel Cancelled</Link>
            </li>
        </ul>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/FuelOwner/Reports"><FolderIcon/></Link>
    <Link className='itemSide' to="/FuelOwner/Reports"> Reports</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/FuelOwner/Search"><SearchIcon/></Link>
    <Link className='itemSide' to="/FuelOwner/Search">Search</Link>
  </div>
  </div>
    </div>
    </Side>
  )
}

export default SideBarOwner

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