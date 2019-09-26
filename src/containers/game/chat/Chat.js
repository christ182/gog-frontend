import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap';

import ApiService from 'utils/ApiService';
import useForm from 'utils/useForm';
import {
  ChatBody,
  ChatContainer,
  ChatMessages,
} from 'components/styledComponents/StyledChat';

const user = localStorage.user ? JSON.parse(localStorage.user) : '';
const { post } = ApiService();

const Chat = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(0);
  let messagesEndRef = useRef(null);
  const { handleChange, handleSubmit, values, resetValues } = useForm(
    sendMessage,
    {
      message: '',
    },
  );

  useEffect(() => {
    setMessages(chat);
    return () => {
      setMessages([]);
    };
  }, [chat]);

  function sendMessage(e) {
    e.preventDefault();

    post('/game/chat', { message: values.message }).then(() => {
      chat.push({
        message: `${user.name}: ${values.message}`,
        date: new Date(),
      });
      setMessages(chat);
      resetValues();
    });
  }

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   function run() {
  //     if (messages.length) {
  //       scrollToBottom();
  //       setTimeout(() => {
  //         setOpen(0);
  //       }, 300);
  //     }
  //   }
  //   run();
  //   return () => {};
  // }, [messages]);

  useEffect(scrollToBottom, [messages]);

  const toggle = e => {
    e.preventDefault();
    let key = open === 0 ? 1 : 0;
    setOpen(key);
  };

  return (
    <ChatContainer>
      <Accordion activeKey={1}>
        <Card>
          <Card.Header style={{ padding: '0.2em' }}>
            <Accordion.Toggle
              className="float-right"
              as={Button}
              variant="link"
              eventKey={open}
              onClick={e => toggle(e)}
            >
              <i
                className={`fa ${
                  open === 0 ? 'fa-window-maximize' : 'fa-window-minimize'
                }`}
              ></i>
            </Accordion.Toggle>
            <span style={{ padding: 2 }}>Chat</span>
          </Card.Header>
          <Accordion.Collapse eventKey={open}>
            <ChatBody>
              <ChatMessages>
                <div className="messagesWrapper">
                  {messages.map(item => (
                    <p key={item.date}>{item.message}</p>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ChatMessages>
              <Form onSubmit={handleSubmit} className="message-input">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Enter message"
                    aria-label="Enter message"
                    aria-describedby="basic-addon2"
                    value={values.message}
                    name="message"
                    type="text"
                    required
                    onChange={handleChange}
                  />
                  <InputGroup.Append>
                    <Button type="submit" variant="outline-primary">
                      Send
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </ChatBody>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </ChatContainer>
  );
};

Chat.propTypes = {
  chat: PropTypes.array.isRequired,
};

export default Chat;
