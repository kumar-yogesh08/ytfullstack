import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Container=styled.div`
height:100%;
width:100%;
position:absolute;
left:0;top:0;background-color:#000000a7;
display:flex;
align-item:center;
justify-content:center;
`;
const Wrapper=styled.div`
height:600px;
width:600px;
background-color:${({theme})=>theme.bgLighter};
color:${({theme})=>theme.text}
padding:20px;
display:flex;
flex-direction:column;
gap:20px;
position:relative;
`;
const Close=styled.div`
position:absolute;
top:10px;
left:10px;
cursor:pointer;
`;
const Title=styled.h1`text-align:center`;
const Input=styled.input`
border:1px solid ${({theme})=>theme.soft};
color:${({theme})=>theme.text};
border-radius:3px;
padding:10px;
background-color:transparent;
`;
const Desc=styled.textarea`
border:1px solid ${({theme})=>theme.soft};
color:${({theme})=>theme.text};
border-radius:3px;
padding:10px;
background-color:transparent;
`;
const Button=styled.button`
border-radius:3px;
border:none;
padding:10px 20px;
font-weight:500px;
cursor:pointer;
background-color:${({theme})=>theme.soft}
color:${({theme})=>theme.textSoft};
`
const Label=styled.label`font-size:14px`
const Upload=({setOpen})=>{
    const [img,setImg]=useState(undefined);
    const [video,setVideo]=useState(undefined);
    const [inputs,setInputs]=useState({})
    const [imgPec,setImgPec]=useState(0);
    const [videoPec,setVideoPec]=useState(0);
    const [tags,setTags]=useState([]);
    const navigate=useNavigate();
    const handleChange=(e)=>{
        setInputs(prev=>{return{...prev,[e.target.name]:e.target.value}})
    }
    const handleTags=(e)=>{
   setTags(e.target.value.split(","));}
    const uploadFile=(file,urlType)=>{
        const storage = getStorage(app);
        const fileName=new Date().getTime()+file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    urlType==="imageUrl" ? setImgPec(Math.round(progress)):setVideoPec(Math.round(progress))
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
            break;
    }
  }, 
  (error) => {}
        ,
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev)=>{return{...prev,[urlType]:downloadURL}})
              });
        }
        );
    }
    useEffect(()=>{
    video && uploadFile(video,"videoUrl")
    },[video])
    useEffect(()=>{
    img && uploadFile(img,"imageUrl")
        },[img])
        const handleUpload=async(e)=>{
            e.preventDefault()
            console.log("hellow axios res after uplaod");
            console.log("What we are sending: ");
            console.log({
                ...inputs, tags
            });
            console.log(JSON.stringify({
                ...inputs, tags
            }));
            const res1=await axios.get('/video/random')
            console.log("res1",res1);
            const res= await axios.post('/video/',{...inputs, tags}).catch((error)=>console.log(error))
            // const res = await fetch("http://localhost:8500/api/video/", {
            //     method: "POST",
            //     mode: "cors",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTJjY2M4OTM3MmE2OWY1MWFiZjRjYiIsImlhdCI6MTcxMTAzMTE2OH0.o-HBC6k3N_WwZJ5-be_2LctVsYSBAGJf1jbGYNdSyXM"
            //     },
            //     body: JSON.stringify({
            //         ...inputs, tags
            //     })
            // })

            // const res = await axios.post("http://localhost:8500/api/video/", {
            //     ...inputs, tags
            // })
            console.log("hellow axios res after uplaod",res);
            setOpen(false)
            res.status===200 && navigate(`/video/${res.data._id}`)
        }
return(
<Container>
    <Wrapper>
        <Close onClick={()=>setOpen(false)}>x</Close>
        <Title>Upload A New Video</Title>
        <Label>Video:</Label>
        {videoPec>0 ? ("Uploading"+videoPec):(<Input type="file" accept="video/*" onChange={(e)=>setVideo(e.target.files[0])}/>)}
        <Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
        <Desc placeholder="Description" row={8} name="desc" onChange={handleChange}/>
        <Input type="text" placeholder="Seprate tags with comma" onChange={handleTags}/>
        <Label>Image:</Label>
        {imgPec>0 ? ("Uploading"+imgPec+"%"):(<Input type="file" accept="image/*" onChange={(e)=>setImg(e.target.files[0])}/>)}
        <Button onClick={handleUpload}>Upload</Button>
    </Wrapper>
</Container>
    )
}
export default Upload;