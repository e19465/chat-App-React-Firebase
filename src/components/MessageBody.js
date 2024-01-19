import styled from "styled-components";
import SingleMessage from "./SingleMessage";

const MessageBodyMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #d4c6f1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageBody = () => {
  return (
    <MessageBodyMain>
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
      <SingleMessage />
    </MessageBodyMain>
  );
};

export default MessageBody;
