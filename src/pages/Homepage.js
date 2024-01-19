import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Chatbar from "../components/Chatbar";

const HomePageMain = styled.div`
  background-image: radial-gradient(#061d33, #a5d3ff);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HomepageSub = styled.div`
  width: 70%;
  height: 80vh;
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SideBarContainer = styled.div`
  flex: 1;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background-color: yellow;
`;

const ChatBarContainer = styled.div`
  flex: 2;
  height: 100%;
  border-radius: 0 10px 10px 0;
  background-color: pink;
`;

const Homepage = () => {
  return (
    <HomePageMain>
      <HomepageSub>
        <SideBarContainer>
          <Sidebar />
        </SideBarContainer>
        <ChatBarContainer>
          <Chatbar />
        </ChatBarContainer>
      </HomepageSub>
    </HomePageMain>
  );
};

export default Homepage;
