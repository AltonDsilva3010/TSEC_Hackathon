
import { createSlice } from "@reduxjs/toolkit";

export const globalStateSlice = createSlice({
    name : "globlaStateSlice",
    initialState : {
        provider: null,
        signer: null,
        contract: null,
        isLoggedIn : false,
        address : null
    },
    reducers : {
        setStateDetails : (state,action)=>{
            const data = action.payload;
            console.log(action)
            state.provider = data.provider,
            state.signer = data.signer,
            state.contract = data.contract
            state.isLoggedIn = data.isLoggedIn
            state.address = data.signer.address
        },
        getOwnerAddress : (state,action)=>{
            return state.contract.target
        },
        setIsLoggedIn : (state,action)=>{
            state.isLoggedIn = true
            console.log("LOG",state)
        }
    }
})

export const {setStateDetails,getOwnerAddress,setIsLoggedIn} = globalStateSlice.actions

export default globalStateSlice.reducer