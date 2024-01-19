import styled from "styled-components";
import DP from "../img/dp.jpg";
import MSG from "../img/msg.jpg";

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
  max-width: 70%;
  background-color: ${(props) =>
    props.owner === "sender" ? "#2d004e" : "#554f60"};
  color: #f5f5f5;
  padding: 10px;
  border-radius: ${(props) =>
    props.owner === "sender" ? "10px 10px 0px 10px" : "0 10px 10px 10px"};
  margin-top: 10px;
  margin-bottom: 20px;
`;

const MsgImg = styled.img`
  width: 50%;
`;

const SingleMessage = () => {
  return (
    <SingleMessageMain owner="sender">
      <DpConatiner>
        <DpImg src={DP} alt="pro-pic" width={40} height={40} />
        <MsgTime>just now</MsgTime>
      </DpConatiner>
      <OtherContainer owner="sender">
        <MsgText owner="sender">Hellow</MsgText>
        <MsgImg src={MSG} alt="message-pic" />
      </OtherContainer>
    </SingleMessageMain>
  );
};

export default SingleMessage;
