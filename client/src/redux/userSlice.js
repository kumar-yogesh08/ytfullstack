import { createSlice } from '@reduxjs/toolkit'

const initialState = {
currentUser:null,
loading:false,
error:false
}

export const userSlice = createSlice({
name:'user',
initialState,
reducers:{
    loginStart:(state)=>{state.loading=true;},
    loginSuccess:(state,action)=>{state.loading=false;state.currentUser=action.payload;},
    loginFaliure:(state)=>{state.error=true;state.loading=false;},
    logout:(state)=>{
        return initialState;
    },
    subscription:(state,action)=>{
        if(state.currentUser.subscribedTo.includes(action.payload))
        {
            state.currentUser.subscribedTo.splice(state.currentUser.subscribedTo.findIndex((channelId)=>channelId===action.payload),1)
        }else{
            state.currentUser.subscribedTo.push(action.payload)
        }
    }
}
})
export const {loginStart,loginFaliure,loginSuccess,logout,subscription}=userSlice.actions
export default userSlice.reducer