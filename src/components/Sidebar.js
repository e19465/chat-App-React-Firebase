import styled from "styled-components";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const SidebarMain = styled.div`
  background-color: #4b0082;
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

const Sidebar = () => {
  return (
    <SidebarMain>
      <Navbar />
      <Search />
      <Chats />
    </SidebarMain>
  );
};

export default Sidebar;
