import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
import {fetchUsers,getOwners,incremnetWidth} from './redux-toolkit/Data/DataSlice'
import { useSelector ,useDispatch} from 'react-redux';

function Header() {


  const auth = window.localStorage.getItem("auth");
  const auth_admin = window.localStorage.getItem("auth_admin");
  const auth_Owner = window.localStorage.getItem("auth_Owner");
  const auth_user = window.localStorage.getItem("auth_user");
  const users = useSelector((state) => state.AllData.users);
  const owners = useSelector((state) => state.AllData.FuelOwners);
  const [counter,setCounter]=useState(0)
  const widthSide = useSelector((state) => state.AllData.width);
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchUsers())
     dispatch(getOwners())
  }, [dispatch])
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {

    if(auth=="/PofileAdmin"){
  
       users.filter(fl => fl.email==auth_admin && fl.Type==0).map(item => {
            window.localStorage.removeItem("auth_admin");
            window.localStorage.removeItem("auth");
            window.location.href="/admin";
       })
    }
   else if(auth=="/FuelOwner/ProfileOwner"){
       owners.filter(fl => fl.Email==auth_Owner).map(item => {
           window.localStorage.removeItem("auth_Owner");
           window.localStorage.removeItem("auth");
           window.location.href="/OwnerStation";
       })
    } 
    else{
          users.filter(fl => fl.email==auth_user && fl.Type==1).map(item => {
            window.localStorage.removeItem("auth_user");
            window.localStorage.removeItem("auth");
            window.location.href="/User";
        })
     }  

}

const HideSide =()=> {

  setCounter(counter+1);
  if(counter%2==0){
    dispatch(incremnetWidth(90))
    window.localStorage.setItem("widthSide",widthSide)
   }else{
    dispatch(incremnetWidth(320))
    window.localStorage.setItem("widthSide",widthSide)
    }
    console.log(widthSide);
}

  return (
    <Content className='d-flex align-items-center justify-content-between p-4'>
        <IconMenu onClick={HideSide}>
           <MenuIcon/>
        </IconMenu>
        <div>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
  
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> <Link to={`${auth}`}>Profile</Link>
        </MenuItem>
        <Divider />
       
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
           <a onClick={logout}>Logout</a> 
        </MenuItem>
      </Menu>
        </div>

    </Content>
  )
}

export default Header

const Content = styled.div`
   height:70px;
   background:#fff;
   box-shadow:10px 10px 5px grey;

`
const IconMenu = styled.div`
    svg{
        font-size:50px;
        cursor:pointer
    }
`