import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MessageMain = styled.div`
  width: 100%;
  height: 60px;
  background-color: #9370db;
  position: sticky;
  bottom: 0;
  border-radius: 0 0 10px 0;
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  margin: 0 10px;
  display: flex;
`;

const Input = styled.input`
  width: 70%;
  height: 40px;
  border: 1px solid #4b0082;
  outline: none;
  padding: 10px;
  font-size: 12px;
  margin-right: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const OtherContainer = styled.div`
  width: 30%;
  display: flex;
`;

const Container = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 25px;
  color: #4b0082;
  margin-right: 10px;
  border: 1px solid #4b0082;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const Btn = styled.button`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 25px;
  color: #4b0082;
  margin-right: 10px;
  border: 1px solid #4b0082;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const MessageSend = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [messageText, setMessageText] = useState("");
  const [img, setImg] = useState(null);

  const handleMessageSend = async (e) => {
    e.preventDefault();
    // alert("message send");

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: messageText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          }),
        });
      } catch (error) {
        alert(error.message);
        console.error(
          "Error during file upload or download URL retrieval:",
          error
        );
        alert("Error during file upload or download URL retrieval");
      }
    } else {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: messageText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            messageText,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            messageText,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        setMessageText("");
        setImg(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <MessageMain>
      <Form onSubmit={handleMessageSend}>
        <Input
          type="text"
          placeholder="message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        {/* <Input type="file" id="file_attach" style={{ display: "none" }} /> */}
        <Input
          type="file"
          accept="image/*"
          id="img_attach"
          name="img_attach"
          style={{ display: "none" }}
          // value={img}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <OtherContainer>
          {/* <label htmlFor="file_attach">
            <Container>
              <IoIosAttach />
            </Container>
          </label> */}
          <label htmlFor="img_attach">
            <Container>
              <GrGallery />
            </Container>
          </label>
          <Btn type="submit">
            <IoMdSend role="button" />
          </Btn>
        </OtherContainer>
      </Form>
    </MessageMain>
  );
};

export default MessageSend;
