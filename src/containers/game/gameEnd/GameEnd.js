import Proptypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

const user = localStorage.user ? JSON.parse(localStorage.user) : '';

const GameEnd = ({ show, data, close }) => {
  return (
    <Modal show={show} onHide={() => close(false)}>
      <Modal.Header closeButton>Game Over</Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h5>{data.winner === user.id ? 'You win' : 'You lose'}</h5>
        </div>
      </Modal.Body>
    </Modal>
  );
};

GameEnd.propTypes = {
  show: Proptypes.bool.isRequired,
  data: Proptypes.object.isRequired,
  close: Proptypes.func.isRequired,
};

export default GameEnd;