import styled from "styled-components";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { GrGallery } from "react-icons/gr";

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
  const handleMessageSend = (e) => {
    e.preventDefault();
    alert("Message Send!");
  };

  return (
    <MessageMain>
      <Form onSubmit={handleMessageSend}>
        <Input type="text" placeholder="message..." />
        <Input type="file" id="file_attach" style={{ display: "none" }} />
        <Input
          type="file"
          accept="image/*"
          id="img_attach"
          style={{ display: "none" }}
        />
        <OtherContainer>
          <label htmlFor="file_attach">
            <Container>
              <IoIosAttach />
            </Container>
          </label>
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
