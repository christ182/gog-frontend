import PropTypes from 'prop-types';
import React from 'react';

import {
  FlexContainer,
  StyledCard,
  StyledPadded,
} from 'components/styledComponents/Containers';
import { Piece } from 'components/styledComponents/GameBoard';

const FallenComrades = ({ pieces = [], color = '', showIcon = false }) => {
  return (
    <section>
      <StyledCard>
        <FlexContainer>
          <StyledPadded>
            <small>Fallen Comrades &nbsp;</small>
            {pieces.map(piece => (
              <Piece className={color} key={piece.id}>
                {showIcon &&
                  piece.icons.map((icon, i) => (
                    <i key={i} className={icon}></i>
                  ))}
                {showIcon ? (
                  <p className="small">{piece.name}</p>
                ) : (
                  <span>&#x25cf;</span>
                )}
              </Piece>
            ))}
          </StyledPadded>
        </FlexContainer>
      </StyledCard>
    </section>
  );
};

FallenComrades.propTypes = {
  pieces: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
};

export default FallenComrades;
