import styled from "styled-components";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavbarMain = styled.div`
  background-color: #4b0082;
  width: 100%;
  height: 50px;
  border-radius: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  background-color: #4b0082;
  color: #f5f5f5;
  border-radius: 10px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 700;
  text-transform: capitalize;
`;
const Right = styled.div`
  flex: 2;
  height: 100%;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #4b0082;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
`;
const BtnContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #4b0082;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BTN = styled.button`
  padding: 5px 10px;
  font-size: 10px;
  background-color: #9370db;
  color: #f5f5f5;
  font-weight: 800;
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.7s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:hover {
    background-color: #7b68ee;
  }
`;

const IMG = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NAME = styled.p`
  font-size: 13px;
  color: #f5f5f5;
  margin-left: 10px;
  letter-spacing: 1px;
  text-transform: capitalize;
`;

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  return (
    <NavbarMain>
      <Left>swift chat</Left>
      <Right>
        <ImgContainer>
          <IMG
            src={currentUser.photoURL}
            alt="pro-pic"
            width={40}
            height={40}
            loading="lazy"
          />
          <NAME>{currentUser.displayName}</NAME>
        </ImgContainer>
        <BtnContainer>
          <BTN onClick={() => signOut(auth)}>logout</BTN>
        </BtnContainer>
      </Right>
    </NavbarMain>
  );
};

export default Navbar;
