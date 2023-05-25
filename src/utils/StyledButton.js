import React from "react";
import styled from "styled-components";
//123
const StyledButton = styled.button`
  border-radius: 5px;
  color: white;
  font-weight:bold;
  height: 40px;
  width: 100%;
  background-color: #FC7373;
  border: none;
  margin-bottom: 5px;
  :hover {
    cursor: pointer;
  }
  display: flex;
  justify-content:center;
  align-items: center;
  img {
    width:20px;
    margin: 3px;
  }
`

// 구독 결제 이동
const onClick = () => {
  
}

function Button ({children}) {
  
  return (
    <StyledButton onClick={onClick}>{children}</StyledButton>
  );
}
export default Button;