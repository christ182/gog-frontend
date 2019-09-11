// import io from 'socket.io-client';
import React from 'react';
import { Socket } from 'react-socket-io';

const url = process.env.REACT_APP_URL;
const options = { transports: ['websocket'] };
const SocketService = () => {
  return (
    <Socket uri={url} options={options}>
      {this.props.children}
    </Socket>
  );
};

export default SocketService;
