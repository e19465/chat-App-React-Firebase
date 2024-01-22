import styled from "styled-components";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useState } from "react";

const SidebarMain = styled.div`
  background-color: #4b0082;
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
`;

const Sidebar = () => {
  const [search, setSearch] = useState("");

  return (
    <SidebarMain>
      <Navbar />
      <Search search={search} setSearch={setSearch} />
      <Chats searchVal={search} />
    </SidebarMain>
  );
};

export default Sidebar;
