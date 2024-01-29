import styled from "styled-components";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const SingleMessageMain = styled.div`
  max-width: 80%;
  display: flex;
  margin-left: 20px;
  margin-bottom: 20px;
  align-self: ${(props) =>
    props.owner === "sender" ? "flex-end" : "flex-start"};
  flex-direction: ${(props) =>
    props.owner === "sender" ? "row-reverse" : "row"};
`;

const DpConatiner = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const DpImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const MsgTime = styled.p`
  font-size: 10px;
`;

const OtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.owner === "sender" ? "flex-end" : "flex-start"};
  /* justify-content: flex-start; */
`;

const MsgText = styled.div`
  width: 200px;
  max-width: 70%;
  background-color: ${(props) =>
    props.owner === "sender" ? "#2d004e" : "#554f60"};
  color: #f5f5f5;
  padding: 10px;
  border-radius: ${(props) =>
    props.owner === "sender" ? "10px 10px 0px 10px" : "0 10px 10px 10px"};
  margin-top: 10px;
  margin-bottom: 20px;
  /* display: flex; */
  /* flex-direction: row; */
  word-wrap: break-word;
  word-break: break-all;
  /* flex-wrap: wrap; */
`;

const MsgImg = styled.img`
  width: 50%;
`;

const SingleMessage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const firebaseTimestamp = message.date;

  // Convert Firebase Timestamp to JavaScript Date
  const dateObject = new Date(
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1e6
  );

  // Convert JavaScript Date to a readable time string
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <SingleMessageMain
      owner={message.senderId === currentUser.uid ? "sender" : "receiver"}
      ref={ref}
    >
      <DpConatiner>
        <DpImg
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="pro-pic"
          width={40}
          height={40}
        />
        <MsgTime>{formattedTime.toString()}</MsgTime>
      </DpConatiner>
      <OtherContainer
        owner={message.senderId === currentUser.uid ? "sender" : "receiver"}
      >
        <MsgText
          owner={message.senderId === currentUser.uid ? "sender" : "receiver"}
        >
          {message.text}
        </MsgText>
        {message.img && <MsgImg src={message.img} alt="message-pic" />}
      </OtherContainer>
    </SingleMessageMain>
  );
};

export default SingleMessage;
