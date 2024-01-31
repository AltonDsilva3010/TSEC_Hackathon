import {configureStore} from "@reduxjs/toolkit"
import  globalStateSlice  from "./slices/globalStateSlice"

export default configureStore({
    reducer : {
        globlaStateSlice : globalStateSlice
    }
})