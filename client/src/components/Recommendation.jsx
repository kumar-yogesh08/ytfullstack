import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Container = styled.div`
  flex: 2;
`;
const Recommendation=({tags})=>{
const[videos,setVideos]=useState([])
const {currentVideo}=useSelector((state)=>state.video)
useEffect(()=>{
    const fetchVideos=async()=>{
        const videolist=await axios.get(`/video/tags?tags=${tags}`)
        // console.log("typeof",typeof(videolist.data),videolist.data);
        const res=videolist.data.filter((video)=>video._id!=currentVideo._id)
        // console.log("res.data after filter",res);
        setVideos(res)
    }
    fetchVideos()
    console.log("fetched video",videos);
    console.log(currentVideo)
},[tags])

    return(
        <Container>
     {videos.map(video=>
        (
            <Card key={video._id} type="sm" video={video}/>
            
        ))}
        </Container>
    )
}
export default Recommendation;