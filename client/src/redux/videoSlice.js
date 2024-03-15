import { createSlice } from '@reduxjs/toolkit'

const initialState = {
currentUser:null,
loading:false,
error:false
}

export const videoSlice = createSlice({
name:'video',
initialState,
reducers:{
    loginStart:(state)=>{state.loading=true;},
    loginSuccess:(state,action)=>{state.loading=false;state.currentUser=action.payload;},
    loginFaliure:(state)=>{state.error=true;state.loading=false;},
    logout:(state)=>{
        return initialState;
    }
}
})
export const {loginStart,loginFaliure,loginSuccess,logout}=videoSlice.actions
export default videoSlice.reducer