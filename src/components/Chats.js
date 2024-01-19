import styled from "styled-components";
import SingleChat from "./SingleChat";

const ChatsMain = styled.div`
  background-color: #4b0082;
  width: 100%;
  height: calc(100% - 100px);
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

const Chats = () => {
  return (
    <ChatsMain>
      <SingleChat />
      <SingleChat />
      <SingleChat />
    </ChatsMain>
  );
};

export default Chats;
