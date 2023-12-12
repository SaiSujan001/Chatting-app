import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loading from "../images/dbzloading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { settingAvatar } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_KEY)
      );

      const { data } = await axios.post(`${settingAvatar}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container backgroundColor="#f0f0f7">
          <img src={loading} alt="loading" className="loading" />
        </Container>
      ) : (
        <Container backgroundColor="#f0f0f7">
          <TitleContainer>
            <h1>choose your avatar</h1>
          </TitleContainer>
          <AvatarsContainer>
            {avatars.map((avatar, index) => (
              <AvatarContainer
                key={avatar}
                onClick={() => setSelectedAvatar(index)}
                selected={selectedAvatar === index}
                backgroundColor={index % 2 === 0 ? "#394240" : "#6E8898"}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                />
              </AvatarContainer>
            ))}
          </AvatarsContainer>
          <SubmitButton onClick={setProfilePicture}>
            Select a Profile Picture
          </SubmitButton>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: ${(props) => props.backgroundColor};
  height: 100vh;
  width: 100vw;

  .loading {
    max-inline-size: 100%;
  }
`;

const TitleContainer = styled.div`
  h1 {
    color: green;
  }
`;

const AvatarsContainer = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 2rem;
margin-top: 2rem; /* Add margin for better spacing */
`;

const AvatarContainer = styled.div`
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  border: 0.4rem solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s ease-in-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${(props) =>
    props.selected &&
    `
    border: 0.4rem solid #4e0eff;
    transform: scale(1.1);
  `}
`;


const SubmitButton = styled.button`
  background-color: #808080; /* Grey color */
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: transform 0.3s ease-in-out, box-shadow 0.5s ease-in-out, background-color 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    background-color: #4e0eff; /* Color change on hover */
  }
`;
