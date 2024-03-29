import { createSlice } from '@reduxjs/toolkit'

const initialState = {
currentVideo:null,
loading:false,
error:false
}

export const videoSlice = createSlice({
name:'video',
initialState,
reducers:{
    fetchStart:(state)=>{state.loading=true;},
    fetchSuccess:(state,action)=>{state.loading=false;state.currentVideo=action.payload;},
    fetchFaliure:(state)=>{state.error=true;state.loading=false;},
    like:(state,action)=>{
        console.log(state.currentVideo.like);
        if(!state.currentVideo.likes.includes(action.payload)){
            state.currentVideo.likes.push(action.payload)
            state.currentVideo.dislikes.splice(state.currentVideo.dislikes.findIndex((userId)=>userId===action.payload),1);

            
        }
    },
    dislike:(state,action)=>{
        if(!state.currentVideo.dislikes.includes(action.payload)){
            state.currentVideo.dislikes.push(action.payload)
            state.currentVideo.likes.splice(state.currentVideo.likes.findIndex((userId)=>userId===action.payload),1);
            
            
        }
    }

}
})
export const {fetchStart,fetchFaliure,fetchSuccess,like,dislike}=videoSlice.actions
export default videoSlice.reducer