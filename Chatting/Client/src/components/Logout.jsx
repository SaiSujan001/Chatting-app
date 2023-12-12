import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <StyledLogoutButton onClick={handleClick}>
      <IoMdExit /> {/*IoMdExit icon */}
      Logout
    </StyledLogoutButton>
  );
}

const StyledLogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.2rem; 
  background-color: #8b0000; 
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    font-size: 1.5rem;
    color: #ebe7ff;
  }

  &:hover {
    background-color: #5b0000; 
  }
`;


