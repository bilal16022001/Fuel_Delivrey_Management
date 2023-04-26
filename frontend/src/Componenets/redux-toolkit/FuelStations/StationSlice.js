
import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    Cities:[],
    States:[],
    FuelStations:[],
    add:[]
}

export const fetchCites = createAsyncThunk("cities/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/City").then((res) => res.data)
})

export const fetchStates = createAsyncThunk("states/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/State").then((res) => res.data)
})

export const fetchFuelStations = createAsyncThunk("FuelStation/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/FuelStations").then((res) => res.data)
})


const StationSlice = createSlice({

    name:"station",
    initialState,
    reducers:{
      
    },
    extraReducers:(builder) => {

       builder.addCase(fetchCites.fulfilled,(state,action) => {
           state.Cities=action.payload
        })

        builder.addCase(fetchStates.fulfilled,(state,action) => {
            state.States=action.payload
        })
         builder.addCase(fetchFuelStations.fulfilled,(state,action) => {
            state.FuelStations=action.payload
        })
       
   }
 })
 
 export const {addSt} = StationSlice.actions
 export default StationSlice.reducer
