import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from"@mui/icons-material/VideoCallOutlined"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import {useDispatch} from "react-redux"
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User=styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:500;
color:${({theme})=>theme.text};

`
const Avatar=styled.div`
width:32px;
height:32px;
border-radius:50%;
background-color:#999;
`

const Navbar = () => {
const [open,setopen]=useState(flase)
  const {currentUser}=useSelector(state=>state.user)
  const dispatch=useDispatch();
  const logoutHandler=async (e)=>{
   try {
    dispatch(logout())
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchOutlinedIcon />
        </Search>
        {currentUser?(
          <User>
            <VideoCallOutlinedIcon onClick={()=>setopen(true)}/>
            <Avatar/>
            {currentUser.name}
            <Button onClick={logoutHandler}>Logout</Button>
          </User>
        ):(<Link to="signin" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleOutlinedIcon />
            SIGN IN
          </Button>
        </Link>)}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
