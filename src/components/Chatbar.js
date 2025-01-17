import styled from "styled-components";
import Topbar from "./Topbar";
import MessageSend from "./MessageSend";
import MessageBody from "./MessageBody";
// import { useContext } from "react";
// import { ChatContext } from "../context/ChatContext";

const ChatbarMain = styled.div`
  background-color: lime;
  width: 100%;
  height: 100%;
  border-radius: 0 10px 10px 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Chatbar = () => {
  // const { dispatch } = useContext(ChatContext);

  return (
    <ChatbarMain>
      <Topbar />
      <MessageBody />
      <MessageSend />
    </ChatbarMain>
  );
};

export default Chatbar;
