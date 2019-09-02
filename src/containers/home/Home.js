import React, { useContext } from 'react';

import { AuthContext } from 'components/AuthContext';
import { BtnPrimary } from 'components/styledComponents/Buttons';
import { StyledCentered } from 'components/styledComponents/Containers';

// this component is for illustration only.
// replace this with app's public routes
const Home = () => {
  const { signIn } = useContext(AuthContext);
  const dummy_user = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };

  return (
    <StyledCentered>
      <h2>Code Disruptors, Inc</h2>
      <BtnPrimary onClick={() => signIn(dummy_user)}>Sign In</BtnPrimary>
    </StyledCentered>
  );
};

export default Home;
