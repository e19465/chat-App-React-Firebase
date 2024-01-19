import styled from "styled-components";
import { IoVideocamOutline, IoPersonAddOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

const TopMain = styled.div`
  width: 100%;
  height: 50px;
  background-color: #9370db;
  border-radius: 0 10px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NAME = styled.p`
  /* background-color: red; */
  margin-left: 20px;
  font-size: 20px;
  color: #4b0082;
  font-weight: 700;
`;

const ICONS = styled.div`
  display: flex;
`;

const Icon = styled.div`
  background-color: #4b0082;
  color: #f5f5f5;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 20px;
  border-radius: 5px;
`;

const Topbar = () => {
  return (
    <TopMain>
      <NAME>Jane</NAME>
      <ICONS>
        <Icon>
          <IoVideocamOutline />
        </Icon>
        <Icon>
          <IoPersonAddOutline />
        </Icon>
        <Icon>
          <BsThreeDots />
        </Icon>
      </ICONS>
    </TopMain>
  );
};

export default Topbar;
