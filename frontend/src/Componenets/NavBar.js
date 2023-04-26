import React,{useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

function NavBar() {

  return (
    <div>
   
        <nav class="navbar navbar-expand-lg bg-light">
     <div class="container">
    <a class="navbar-brand" href="#">Fuel Delivrey</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto d-flex align-items-center mb-2 mb-lg-0">
      <ul className='d-flex position-absolute end-0 me-4 list-style-none'>
                <li><Link className='nav-link' to="/">Home</Link></li>
                <li><Link className='nav-link' to="/Contact">Contact</Link></li>
                <li><Link className='nav-link' to="/Admin">Admin</Link></li>
                <li><Link className='nav-link' to="/OwnerStation">Fuel Station Owner</Link></li>
                <li><Link className='nav-link' to="/User">User</Link></li>
            </ul>
      </ul>
      <div class="">
           
      </div>
    </div>
  </div>
</nav>
    
    </div>
  )
}

export default NavBar

const Nav = styled.div`
     background-color:#e5e5e5;
`