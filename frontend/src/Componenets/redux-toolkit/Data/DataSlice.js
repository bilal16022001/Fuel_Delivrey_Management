
import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    Cities:[],
    States:[],
    FuelStations:[],
    Fuels:[],
    OrdersFuel:[],
    users:[],
    FuelOwners:[],
    Inquires:[],
    width:320
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

export const fetchTypesFuel = createAsyncThunk("fuels/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Fuels").then((res) => res.data)
})

export const fetchOrdersFuel = createAsyncThunk("OrdesFuel/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/OrdesFuel").then((res) => res.data)
})

export const fetchUsers = createAsyncThunk("user/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/users").then((res) => res.data)
})

export const getOwners = createAsyncThunk("owner/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/FuelOwners").then((res) => res.data)
})
export const getInquires = createAsyncThunk("inquiry/fetch",() => {
    return axios.get("http://127.0.0.1:8000/api/Inquiry").then((res) => res.data)
})

const dataSlice = createSlice({

    name:"data",
    initialState,
    reducers:{
        incremnetWidth:(state,action)=> {
           state.width=action.payload;
        }
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
        builder.addCase(fetchTypesFuel.fulfilled,(state,action) => {
            state.Fuels=action.payload
        })
        builder.addCase(fetchOrdersFuel.fulfilled,(state,action) => {
            state.OrdersFuel=action.payload
        })
        builder.addCase(fetchUsers.fulfilled,(state,action) => {
            state.users=action.payload
        })
        builder.addCase(getOwners.fulfilled,(state,action) => {
            state.FuelOwners=action.payload
        })
        builder.addCase(getInquires.fulfilled,(state,action) => {
            state.Inquires=action.payload
        })
   }
 })
 
 export default dataSlice.reducer
 export const {incremnetWidth} = dataSlice.actions