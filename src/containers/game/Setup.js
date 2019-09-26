import React from 'react';
import { BtnSm } from 'components/styledComponents/Buttons';

const Setup = ({
  placePiece,
  getBoardColor,
  col,
  toPlace,
  boardColor,
  opponentBoard,
  getPieceColor,
}) => {
  return (
    <>
      <BtnSm
        onClick={() => placePiece(col.x, col.y)}
        className={
          getBoardColor(col)
            ? JSON.stringify(col.piece) === JSON.stringify(toPlace)
              ? 'selected'
              : boardColor
            : `${opponentBoard.color}`
        }
      >
        {col.piece_id ? (
          col.piece.id ? (
            <span className={`${col.piece.color}`}>
              {col.piece.icons &&
                col.piece.icons.map((icon, i) => (
                  <i key={i} className={icon}></i>
                ))}
              <p className="small">{col.piece.name}</p>
            </span>
          ) : (
            <span>&#x25cf;</span>
          )
        ) : (
          <span className={`${getPieceColor(col)}-text`}>
            {/* {`${col.x}, ${col.y}`} */}
          </span>
        )}
      </BtnSm>
    </>
  );
};

export default Setup;
