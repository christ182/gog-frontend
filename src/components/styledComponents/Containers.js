import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0;
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
  padding: 0.7em;
`;
const StyledBordered = styled.section`
  padding: 0.5em;
  width: 100%;
  border: solid 1px #ddd;
`;
const StyledCard = styled(Card)`
  background: rgba(255, 255, 255, 0.51);
`;

const RelativeContainer = styled.div`
  position: relative;
`;

export {
  StyledCard,
  StyledCentered,
  StyledPadded,
  StyledLoginContainer,
  StyledBordered,
  FlexContainer,
  RelativeContainer,
};
