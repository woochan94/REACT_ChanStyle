import React from "react"; 
import styled, { keyframes } from "styled-components"; 
import { Logo } from "./Icons"; 

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;

const Loader = styled.div`
  display: flex;
  animation: ${Animation} 1s linear infinite;
  width: 100%; 
  justify-content: center;
  align-items: center;
  min-height: 76vh;
  @media (max-width: 768px) {
      min-height: 73vh;
  }
  @media (max-width: 600px) {
      min-height: 68vh;
  }
  @media (max-width: 480px) {
      min-height: 64vh;
  }
`;

export default () => (
    <Loader>
        <Logo size={56} />
    </Loader>
)