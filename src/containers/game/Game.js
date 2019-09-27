import React, { useEffect, useState } from 'react';
import {
  PullDownContent,
  PullToRefresh,
  RefreshContent,
  ReleaseContent,
} from 'react-js-pull-to-refresh';

import MainBoard from './MainBoard';

const Game = () => {
  const [state, setState] = useState(0);
  const handleFetch = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
      setState(Math.random());
    });
  };

  useEffect(() => {
    console.log(state);
    return () => {};
  }, [state]);

  return (
    <div>
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={100}
        onRefresh={handleFetch}
        triggerHeight="auto"
        startInvisible={true}
      >
        <div style={{ height: '80vh', textAlign: 'center' }}>
          <MainBoard refresh={state} />
        </div>
      </PullToRefresh>
    </div>
  );
};

export default Game;
