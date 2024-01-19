import styled from "styled-components";

const SearchMain = styled.div`
  width: 100%;
  height: 50px;
  background-color: #6a5acd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  width: 90%;
  background-color: #4b0082;
  color: #f5f5f5;
  border: none;
  border-bottom: 1px solid #f5f5f5;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  &::placeholder {
    color: #f5f5f5;
    font-size: 14px;
  }
`;

const Search = () => {
  return (
    <SearchMain>
      <Input type="text" placeholder="Search..." />
    </SearchMain>
  );
};

export default Search;
