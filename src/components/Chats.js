import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

const Stp = styled.p`
  padding: 50px;
  color: #f5f5f5;
  font-size: 18px;
`;

const Chats = ({ searchVal }) => {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsFetching(false);
      if (searchVal.trim() !== "") {
        // Only execute the query if searchVal is not empty
        const q = query(
          collection(db, "users"),
          where("displayName", ">=", searchVal.toLowerCase()),
          where("displayName", "<=", searchVal.toLowerCase() + "\uf8ff")
        );

        try {
          setIsFetching(true);
          const querySnapshot = await getDocs(q);
          const usersData = [];
          querySnapshot.forEach((doc) => {
            usersData.push(doc.data());
          });
          setUsers(usersData);
          setIsFetching(false);
          console.log(usersData);
        } catch (err) {
          setIsFetching(false);
          alert(err.message);
          console.log(err);
        }
      } else {
        // Reset users when searchVal is empty
        setUsers([]);
      }
    };

    getUsers();
  }, [searchVal]);

  return (
    <ChatsMain>
      {isFetching ? (
        <Stp>Loading...</Stp>
      ) : searchVal && !users.length ? (
        <Stp>No users found!</Stp>
      ) : (
        users.map((user) => <SingleChat key={user.uid} user={user} />)
      )}
    </ChatsMain>
  );
};

export default Chats;
