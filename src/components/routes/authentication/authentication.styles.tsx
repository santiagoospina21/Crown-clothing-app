import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 1200px;
  justify-content: space-between;
  margin: 200px auto;

  @media screen and (max-width: 800px) {
    display: block;
    width: auto;
    margin: 100px auto;
  }
`;
