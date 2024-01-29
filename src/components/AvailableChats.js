import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const ChatsMain = styled.div`
  background-color: #4b0082;
  /* background-color: red; */
  width: 100%;
  height: auto;
  border-radius: 0 0 0 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #bcaec9;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9370db;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rebeccapurple;
  }
`;

const SingleChatMain = styled.div`
  width: 100%;
  height: 80px;
  background-color: #4b0082;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  transition-property: background-color;
  transition-duration: 0.8s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  border-bottom: 1px solid #9370db;
  &:hover {
    background-color: #330066;
  }
`;

const IMG = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const RightCont = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* background-color: red; */
  padding-left: 10px;
`;

const NAME = styled.p`
  /* background-color: gray; */
  font-size: 18px;
  color: #f5f5f5;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Message = styled.p`
  /* background-color: blue; */
  height: 20px;
  width: 100%;
  font-size: 12px;
  color: #f5f5f5;
  font-weight: 500;
  letter-spacing: 1px;
  overflow: hidden;
`;

const Chats = () => {
  const [availableChats, setAvailableChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getAllAvailableChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setAvailableChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    currentUser.uid && getAllAvailableChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <ChatsMain>
      {Object.entries(availableChats) ||
        {}
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <SingleChatMain
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <IMG
                src={chat[1].userInfo.photoURL}
                alt="pro-pic"
                width={50}
                height={50}
                loading="lazy"
              />
              <RightCont>
                <NAME>{chat[1].userInfo.displayName}</NAME>
                <Message>{chat[1].lastMessage?.messageText}</Message>
              </RightCont>
            </SingleChatMain>
          ))}
    </ChatsMain>
  );
};

export default Chats;
