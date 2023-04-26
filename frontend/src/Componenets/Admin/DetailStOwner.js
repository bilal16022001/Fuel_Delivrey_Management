import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import {useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchFuelStations,getOwners} from '../redux-toolkit/Data/DataSlice'

function DetailStOwner() {
    const {id} = useParams();
    const FuelStations = useSelector((state) => state.AllData.FuelStations);
    const owner = useSelector((state) => state.AllData.FuelOwners);
    const dispatch = useDispatch();

    useEffect(()=> {
       dispatch(fetchFuelStations());
       dispatch(getOwners());
    },[]);

  return (
    <div className=' d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-3"> {owner.filter(it => it.id == id).map(item => item.Name)}'s Fuel Station</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>State</td>
                      <td>City</td>
                      <td>Name Of Petrol Pump</td>
                      <td>Location Of Petrol Pump</td>
                      <td>Creation Date</td>
                </tr>
                {FuelStations.filter(it => it.Owner_id == id).map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.state.Name}</td>
                      <td>
                          {item.city.Name}
                      </td>
                      <td>
                          {item.NameStation}
                      </td>
                      <td>
                          {item.LocationStation}
                      </td>
                   
                      <td>{item.created_at}</td>
      
                    </tr>
                ))}

          </table>
      </div>
  </div>


</div>


</div>
  
    </Content>
    </div>
</div>
  )
}

export default DetailStOwner

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`
