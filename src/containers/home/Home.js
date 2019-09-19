import React, { useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import useForm from 'utils/useForm';
import { AuthContext } from 'components/AuthContext';
import { StyledLoginContainer } from 'components/styledComponents/Containers';

const initState = {
  username: '',
  password: '',
};
const Home = () => {
  const { signIn } = useContext(AuthContext);

  const { handleChange, handleSubmit, values } = useForm(callSignIn, initState);

  function callSignIn() {
    signIn(values);
  }

  return (
    <StyledLoginContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Game of the Generals</h2>
        <Col>
          <Form.Control
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            required
          />
        </Col>
        <br />
        <Col>
          <Form.Control
            onChange={handleChange}
            name="password"
            type="password"
            value={values.password}
            placeholder="Password"
            required
          />
        </Col>
        <br />
        <Col>
          <Button type="submit" block>
            Sign In
          </Button>
        </Col>
      </Form>
    </StyledLoginContainer>
  );
};

export default Home;
