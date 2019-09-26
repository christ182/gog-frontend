import React from 'react';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

const AcceptChallenge = ({ show, data, accept, decline }) => {
  return (
    <Modal show={show}>
      <Modal.Header variant="primary" closeButton>
        New Challenge
      </Modal.Header>
      <Modal.Body>
        <p>You are being challenged for a game by {data.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button variant="light" onClick={() => decline(false)}>
            Decline
          </Button>
          <Button variant="success" onClick={accept}>
            Accept
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
};

export default AcceptChallenge;
