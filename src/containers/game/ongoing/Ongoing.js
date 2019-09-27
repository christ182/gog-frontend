import Proptypes from 'prop-types';
import React from 'react';

import { BtnSm, TransparentBtn } from 'components/styledComponents/Buttons';

const Ongoing = ({
  turn,
  board_color,
  col,
  moveMyPiece,
  getPieceColor,
  checkLastMove,
  getLastMoveDirection,
}) => {
  return (
    <>
      {col.piece_id ? (
        col.piece.id ? (
          <BtnSm
            disabled={turn !== board_color}
            onClick={() => moveMyPiece(col)}
            className={getPieceColor(col)}
          >
            {col.piece.icons &&
              col.piece.icons.map((icon, i) => (
                <i key={i} className={icon}></i>
              ))}
            <br />
            <span className="small">{col.piece.name}</span>
          </BtnSm>
        ) : (
          <BtnSm
            onClick={() => moveMyPiece(col)}
            className={getPieceColor(col)}
          >
            &#x25cf;
          </BtnSm>
        )
      ) : checkLastMove(col) ? (
        <BtnSm onClick={() => moveMyPiece(col)} className="last-move">
          <i className={getLastMoveDirection()}></i>
          {/* <i>
            {col.x}, {col.y}
          </i> */}
        </BtnSm>
      ) : (
        <TransparentBtn onClick={() => moveMyPiece(col)}>
          {/* <span>{`${col.x}, ${col.y}`}</span> */}
        </TransparentBtn>
      )}
    </>
  );
};

Ongoing.propTypes = {
  turn: Proptypes.string.isRequired,
  board_color: Proptypes.string.isRequired,
  col: Proptypes.object.isRequired,
  moveMyPiece: Proptypes.func.isRequired,
  getPieceColor: Proptypes.func.isRequired,
  checkLastMove: Proptypes.func.isRequired,
  getLastMoveDirection: Proptypes.func.isRequired,
};

export default Ongoing;
