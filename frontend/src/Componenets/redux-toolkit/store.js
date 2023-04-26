
import { configureStore } from "@reduxjs/toolkit";
import StationSlice from "./FuelStations/StationSlice";
import DataSlice from "./Data/DataSlice";

const store = configureStore({
    reducer:{
        data:StationSlice,
        AllData:DataSlice
    }
  })
  
  export default store