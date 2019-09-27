import React, { useState } from 'react';
import {
  PullDownContent,
  PullToRefresh,
  RefreshContent,
  ReleaseContent,
} from 'react-js-pull-to-refresh';

import MainBoard from './MainBoard';

import { RefreshContainer } from 'components/styledComponents/Containers';

const Game = () => {
  const [state, setState] = useState(0);
  const handleFetch = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
      setState(Math.random());
    });
  };

  return (
    <div>
      <PullToRefresh
        pullDownContent={
          <div style={{ textAlign: 'center', visibility: 'hidden' }}>
            <PullDownContent />
          </div>
        }
        releaseContent={
          <div style={{ textAlign: 'center', visibility: 'hidden' }}>
            <ReleaseContent />
          </div>
        }
        refreshContent={<RefreshContent />}
        pullDownThreshold={100}
        onRefresh={handleFetch}
        startInvisible={true}
        triggerHeight="auto"
      >
        <RefreshContainer>
          <MainBoard refresh={state} />
        </RefreshContainer>
      </PullToRefresh>
    </div>
  );
};

export default Game;
