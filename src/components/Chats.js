import styled from "styled-components";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ChatsMain = styled.div`
  background-color: #4b0082;
  /* background-color: red; */
  width: 100%;
  height: auto;
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

const Chats = ({ search, setSearch }) => {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsFetching(false);
      if (search.trim() !== "") {
        // Only execute the query if search is not empty
        const q = query(
          collection(db, "users"),
          where("displayName", ">=", search.toLowerCase()),
          where("displayName", "<=", search.toLowerCase() + "\uf8ff")
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
          // console.log(usersData);
        } catch (err) {
          setIsFetching(false);
          alert(err.message);
          console.log(err);
        }
      } else {
        // Reset users when search is empty
        setUsers([]);
      }
    };

    getUsers();
  }, [search]);

  return (
    <ChatsMain>
      {isFetching ? (
        <Stp>Loading...</Stp>
      ) : search && !users.length ? (
        <Stp>No users found!</Stp>
      ) : (
        users?.map((user) => (
          <SingleChat
            setUsers={setUsers}
            setSearch={setSearch}
            key={user.uid}
            user={user}
          />
        ))
      )}
    </ChatsMain>
  );
};

export default Chats;
