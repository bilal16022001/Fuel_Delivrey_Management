import React from 'react'
import NavBar from './NavBar'
import styled from 'styled-components'
import img from './images/th.jfif'
import Footer from './Footer'


function Home() {
  return (
   
    <div>
        <NavBar/>
        <div className='home'>
        <Content className=''>
             <Img src={img} />
        </Content>
        </div>
        <Footer/>
        </div>
  )
}

export default Home

const Content = styled.div`
   height:100vh;

`

const Img = styled.img`
   width:100%;
   height:100vh;

`