import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from '../Header'
import styled from 'styled-components'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import {fetchFuelStations} from '../redux-toolkit/Data/DataSlice'
import { useDispatch, useSelector } from 'react-redux';

function DetailStationOwner() {
    const {id} = useParams();
    const FuelStations = useSelector((state) => state.AllData.FuelStations);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchFuelStations());
    },[]);

  return (
    <div className=' d-flex'>
    <Sidebar/>
    <div className='w-100'>
       <Header/>
       <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-3">Fuel Stations</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name Station</td>
                      <td>Location Station</td>
                      <td>Creation date</td>
                </tr>
                {FuelStations.filter(it => it.Owner_id==id).map(item => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.NameStation}</td>
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

export default DetailStationOwner

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`