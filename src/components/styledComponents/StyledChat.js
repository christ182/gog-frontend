import styled from 'styled-components';
import { Card } from 'react-bootstrap';

const ChatContainer = styled.div`
  width: 20em;
  position: absolute;
  right: 1em;
  bottom: 0;
`;

const ChatBody = styled(Card.Body)`
  padding: 0.2em;
`;

const ChatMessages = styled.div`
  height: 15.2em;
  padding: 0.5em;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export { ChatContainer, ChatBody, ChatMessages };
