import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledCentered = styled.section`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StyledLoginContainer = styled.div`
  background-color: #00bcd4;
  min-height: 100vh;
  margin: 0 auto;
  color: white;
  clear: both;
  & form {
    max-width: 25em;
    margin: auto;
    padding-top: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledPadded = styled.section`
  padding: 1em;
`;
export { StyledCentered, StyledPadded, StyledLoginContainer, FlexContainer };
