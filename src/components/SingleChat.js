import styled from "styled-components";

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

const SingleChat = ({ user }) => {
  return (
    <SingleChatMain>
      <IMG
        src={user.photoURL}
        alt="pro-pic"
        width={50}
        height={50}
        loading="lazy"
      />
      <RightCont>
        <NAME>{user.displayName}</NAME>
        <Message>
          I'll call back Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quo, perferendis dolores. Praesentium recusandae accusantium
          incidunt architecto modi aspernatur, at iusto?
        </Message>
      </RightCont>
    </SingleChatMain>
  );
};

export default SingleChat;
