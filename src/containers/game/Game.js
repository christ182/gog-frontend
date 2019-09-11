import ApiService from 'utils/ApiService';
import React, { useEffect, useReducer } from 'react';
import { Col } from 'react-bootstrap';
import { Event } from 'react-socket-io';

import reducer from './reducer';
import { FlexContainer } from 'components/styledComponents/Containers';
import { Grid, PieceContainer } from 'components/styledComponents/GameBoard';
import { StyledHeaderLight } from 'components/styledComponents/Typography';

const { get, getAll, post } = ApiService();
const init_state = {
  status: '',
  game: { board: [] },
  my_board: {},
  opponent_board: {},
  online_users: [],
  to_place: null,
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const {
    my_board,
    my_board: { placed_pieces = [], unplaced_pieces = [] },
    status,
    opponent_board,
  } = state;
  let {
    to_place,
    game: { board },
  } = state;

  useEffect(() => {
    const handlefetchAll = async () => {
      getAll([await get('/auth/online'), await get('/game/mine')])
        .then(([data]) => {
          const [res_online_users, res_game_data] = data;
          dispatch({
            type: 'DID_FETCH',
            payload: {
              game: res_game_data.data.game,
              online_users: res_online_users,
            },
          });
        })
        .catch(err => {
          console.log(err);
        });
    };
    handlefetchAll();
  }, []);

  // const challengeUser = user => {
  //   post(`/challenge/${user.id}/send`).then(res => console.log(res));
  // };

  const sendPiecePlace = async body => {
    // setToPlace({});
    // await handleSetToPlace(null);
    await post('/game/place', body).then(res => res);
    await dispatch({ type: 'UPDATE_BOARD', payload: board });
  };

  const handleSetToPlace = place => {
    dispatch({ type: 'SET_PIECE_PLACE', payload: place });
  };

  const removePiecePlace = body => {
    // setToPlace({});
    let unplaced = my_board.unplaced_pieces.filter(
      piece => piece.id !== body.piece_id,
    );
    dispatch({ type: 'SET_PIECE', payload: {} });
    post('/game/unplace', body).then(() => {
      updateMyBoard({ ...my_board, unplaced_pieces: unplaced });
    });
  };

  function handleAcceptChallege() {
    post('/challenge/accept').then(res => console.log(res));
  }

  function placePiece(x, y, set_to_place) {
    to_place = set_to_place ? set_to_place : to_place;

    if (to_place) {
      if (my_board.color === 'black' && y > 2) return false;
      if (my_board.color === 'white' && y < 5) return false;
      const body = {
        x,
        y,
        piece_id: to_place ? to_place.id : '',
      };
      sendPiecePlace(body);
    } else {
      if (board[y][x].piece_id) {
        const piece = board[y][x];
        removePiecePlace({ piece_id: piece.piece_id });
      }
    }
  }

  function updatePiecePlace(data) {
    dispatch({ type: 'UPDATE_PIECE_PLACE', payload: data });
  }

  // function updateBoard(new_board) {
  //   dispatch({
  //     type: 'UPDATE_BOARD',
  //     payload: new_board,
  //   });
  // }

  function updateMyBoard(new_my_board) {
    dispatch({
      type: 'UPDATE_MY_BOARD',
      payload: new_my_board,
    });
  }

  async function handleClearSetUp() {
    const placed = [...my_board.placed_pieces];

    placed.forEach((p, i) => {
      setTimeout(() => {
        removePiecePlace({ piece_id: p.id });
      }, i * 15);
    });

    let removed = [];
    let updated_board = board.map(row => {
      return row.map(tile => {
        if (tile.piece_id) {
          if (tile.piece.color === my_board.color) {
            removed.push(tile.piece);
            tile.piece = {};
            tile.piece_id = undefined;
          }
        } else {
          tile.piece = undefined;
        }

        return tile;
      });
    });

    await dispatch({
      type: 'CLEAR_SETUP',
      payload: { placed, board: updated_board },
    });

    refresh(removed);
  }

  function refresh(removed) {
    let combined = [...unplaced_pieces, ...removed];
    updateMyBoard({
      ...my_board,
      unplaced_pieces: combined,
    });
  }

  async function handleRandomSetup(remaining = []) {
    const unplaced =
      remaining.length > 0 ? remaining : [...my_board.unplaced_pieces];
    const new_piece_place = unplaced[parseInt(Math.random() * unplaced.length)];

    let updated_board = [...board];
    let conflict_x = parseInt(Math.random() * 9);
    let conflict_y = parseInt(Math.random() * 8);
    let conflict = board[conflict_y][conflict_x];

    handleSetToPlace(new_piece_place);

    let new_remaining = unplaced.filter(
      piece => piece.id !== new_piece_place.id,
    );

    let placed = [];
    while (conflict.piece_id) {
      conflict_x = parseInt(Math.random() * 9);
      conflict_y = parseInt(Math.random() * 8);
      conflict = board[conflict_y][conflict_x];
      updated_board[conflict_y][conflict_x] = board[conflict_y][conflict_x];
      if (Object.keys(conflict).length > 0) {
        placed.push(conflict);
      }
    }
    console.log(placed_pieces);
    placePiece(conflict_x, conflict_y, new_piece_place);
    // if (placed_pieces.length < 21) {
    //   updateBoard(updated_board);
    //   // updateMyBoard({
    //   //   ...my_board,
    //   //   placed_pieces: [...placed_pieces, ...placed],
    //   // });
    //   setTimeout(() => handleRandomSetup(new_remaining), 5);
    // }
  }

  return (
    <div>
      {/* Socket */}
      <Event event="new_challenge" handler={handleAcceptChallege}></Event>
      <Event event="piece_placed" handler={updatePiecePlace}></Event>

      <StyledHeaderLight>Play the Game</StyledHeaderLight>
      <FlexContainer>
        <Col>
          <button onClick={() => handleRandomSetup()}>Random Setup</button>
          {placed_pieces.length ? (
            <button onClick={() => handleClearSetUp()}>Clear</button>
          ) : (
            ''
          )}
          <table>
            <tbody>
              {board.map((row, i) => (
                <tr key={i}>
                  {row.map(col => (
                    <td key={`${col.x}, ${col.y} `}>
                      <Grid
                        onClick={() => placePiece(col.x, col.y)}
                        className={
                          col.y >= 4
                            ? JSON.stringify(col.piece) ===
                              JSON.stringify(to_place)
                              ? 'selected'
                              : my_board.color
                            : `${opponent_board.color}`
                        }
                      >
                        {col.piece_id ? (
                          col.piece ? (
                            <div className={`${col.piece.color}`}>
                              {col.piece.icons &&
                                col.piece.icons.map((icon, i) => (
                                  <i key={i} className={icon}></i>
                                ))}
                              <p className="small">{col.piece.name}</p>
                            </div>
                          ) : (
                            '¯\\_(ツ)_/¯'
                          )
                        ) : (
                          `${col.x}, ${col.y} `
                        )}
                      </Grid>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </FlexContainer>
      <br />
      <FlexContainer>
        <Col>
          <PieceContainer>
            {status === 'setup'
              ? unplaced_pieces.map(piece => (
                  <Grid
                    key={piece.id}
                    className={
                      JSON.stringify(piece) === JSON.stringify(to_place)
                        ? 'selected'
                        : piece.color === 'white'
                        ? 'white'
                        : 'black'
                    }
                    onClick={() => handleSetToPlace(piece)}
                  >
                    {piece.icons.map((icon, i) => (
                      <i key={i} className={icon}></i>
                    ))}
                    <p className="small">{piece.name}</p>
                  </Grid>
                ))
              : ''}
          </PieceContainer>
        </Col>
      </FlexContainer>
    </div>
  );
};

export default Game;
