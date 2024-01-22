import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegMain = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: radial-gradient(#061d33, #a5d3ff);
`;

const FormConatainer = styled.div`
  width: 400px;
  min-height: 450px;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const HEAD = styled.p`
  text-align: center;
  text-transform: uppercase;
  font-size: 25px;
  padding: 10px 0 5px 0;
  letter-spacing: 1px;
  color: #061d33;
`;

const PARA = styled.p`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 17px;
  color: #777;
`;

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  background-color: #c2c2c2;
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #333;
  outline: none;

  &::placeholder {
    color: #333;
  }
`;

const Btn = styled.button`
  width: 80%;
  height: 30px;
  border: none;
  outline: none;
  padding: 10px 0;
  background-color: teal;
  color: #fff;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-delay: 0s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  font-size: 12px;
  text-transform: uppercase;
  &:hover {
    background-color: #333;
    color: orange;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: lightgray;
    color: #333;
  }
`;

const LastLine = styled.p`
  margin-top: 10px;
  color: #222;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 13px;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #6780fa;

  &:hover {
    text-decoration: underline;
  }
`;

const FileInput = styled.input`
  margin-top: 10px;
`;

const FileInputLabel = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 14px;
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const usernameRegX = /^\S+$/;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const confPassRef = useRef();
  const [isFetching, setIsFetching] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsFetching(false);
    if (usernameRegX.test(usernameRef.current.value)) {
      try {
        setIsFetching(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const file = e.target[4].files[0];
        const displayName = usernameRef.current.value;

        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        try {
          await uploadTask;
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update user profile and save user data to Firestore
          await updateProfile(response.user, {
            displayName: displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", response.user.uid), {
            uid: response.user.uid,
            displayName: displayName,
            email: email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", response.user.uid), {});

          navigate("/login");
        } catch (error) {
          alert(error.message);
          console.error(
            "Error during file upload or download URL retrieval:",
            error
          );
        }
        console.log(response.user);
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
        alert(err.message);
        console.error(err);
      }
    } else {
      alert("Username can't have white spaces!");
    }
  };
  return (
    <RegMain>
      <FormConatainer>
        <HEAD>swift chat</HEAD>
        <PARA>register</PARA>
        <StyledForm onSubmit={handleRegister}>
          <Input
            type="text"
            required
            placeholder="Username"
            name="username"
            ref={usernameRef}
          />
          <Input
            type="email"
            required
            placeholder="Email"
            name="email"
            ref={emailRef}
          />
          <Input
            type="password"
            required
            placeholder="Password"
            name="password"
            ref={passwordRef}
          />
          <Input
            type="password"
            required
            placeholder="Confirm Password"
            name="confirmPassword"
            ref={confPassRef}
          />
          <FileInput type="file" name="avatar" id="avatar" accept="image/*" />
          <FileInputLabel htmlFor="avatar">
            choose profile picture
          </FileInputLabel>
          <Btn type="submit" disabled={isFetching}>
            sign up
          </Btn>
          <LastLine>
            Already have an account? <SLink to="/login">Login</SLink>
          </LastLine>
        </StyledForm>
      </FormConatainer>
    </RegMain>
  );
};

export default RegisterPage;
