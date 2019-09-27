import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';

import {
  FlexContainer,
  StyledPadded,
} from 'components/styledComponents/Containers';

const OnlineUsers = ({ onlineUsers, challengeUser }) => {
  return (
    <FlexContainer>
      <Col md={4} className="float-right">
        <Card>
          <StyledPadded>
            Online Players
            <ListGroup>
              {onlineUsers.length > 0 ? (
                onlineUsers.map(user => (
                  <ListGroup.Item key={user.id}>
                    {user.name}
                    {user.status === '~' || user.status === 'setup' ? (
                      <Button
                        size="sm"
                        className="float-right"
                        variant="info"
                        onClick={() => challengeUser(user)}
                      >
                        Challenge
                      </Button>
                    ) : (
                      ''
                    )}
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No online users found </ListGroup.Item>
              )}
            </ListGroup>
          </StyledPadded>
        </Card>
      </Col>
    </FlexContainer>
  );
};

OnlineUsers.propTypes = {
  onlineUsers: PropTypes.array.isRequired,
  challengeUser: PropTypes.func.isRequired,
};

export default OnlineUsers;
