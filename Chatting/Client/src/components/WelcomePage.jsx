import React, { useEffect, useState } from "react";
import styled from "styled-components";
import goku from "../images/goku.gif";

const WelcomePage = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY));
        setUserName(storedData?.username || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <StyledWelcomePage>
      <GokuImage src={goku} alt="Goku" />
      <WelcomeMessage>
        Welcome, <UserName>{userName}!</UserName>
      </WelcomeMessage>
      <SubMessage>To begin messaging, please choose a chat.</SubMessage>
    </StyledWelcomePage>
  );
};

const StyledWelcomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`;

const GokuImage = styled.img`
  height: 20rem;
`;

const WelcomeMessage = styled.h1`
  span {
    color: green;
  }
`;

const UserName = styled.span`
  color: inherit;
`;

const SubMessage = styled.h3``;

export default WelcomePage;
