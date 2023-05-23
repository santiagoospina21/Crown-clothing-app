import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
    width: 300px;
    padding-bottom: 30px;
  }
`;
