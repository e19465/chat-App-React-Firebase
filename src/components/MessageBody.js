import styled from "styled-components";
import SingleMessage from "./SingleMessage";
import { ChatContext } from "../context/ChatContext";
import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const MessageBodyMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #d4c6f1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageBody = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    let unsub;

    if (data.chatId !== null) {
      unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
    }

    return () => {
      if (typeof unsub === "function") {
        unsub();
      }
    };
  }, [data.chatId]);

  return (
    <MessageBodyMain>
      {messages.length ? (
        messages?.map((message) => (
          <SingleMessage key={message.id} message={message} />
        ))
      ) : (
        <div>No messages to show</div>
      )}
    </MessageBodyMain>
  );
};

export default MessageBody;
