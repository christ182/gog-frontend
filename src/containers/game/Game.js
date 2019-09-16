import ApiService from 'utils/ApiService';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import { Event } from 'react-socket-io';

import reducer from './reducer';
import {
  FlexContainer,
  StyledPadded,
} from 'components/styledComponents/Containers';
import {
  Piece,
  PieceContainer,
  TransparentBtn,
} from 'components/styledComponents/GameBoard';
import { StyledHeaderLight } from 'components/styledComponents/Typography';
import { Table } from 'components/styledComponents/Table';

const user = localStorage.user ? JSON.parse(localStorage.user) : '';
const { get, getAll, post } = ApiService();
const init_state = {
  status: '',
  game: { board: [], last_move: {}, grave_yard: [], pieces: [] },
  opponent_board: { name: '', ready: 0 },
  online_users: [],
  to_place: null,
  to_move: null,
  my_board: { placed_pieces: [], unplaced_pieces: [], ready: 0 },
  last_move: {},
  turn: '',
};
let unplaced = [];
let placed = [];
let socket_board = [];
let game_pieces = [];
let board_color = '';
const Game = () => {
  const [state, dispatch] = useReducer(reducer, init_state);
  const [board, setBoard] = useState([]);
  const [my_board, setMyBoard] = useState(init_state.my_board);
  const [last_move, setLastMove] = useState(init_state.last_move);
  const [online_users, setOnlineUsers] = useState(init_state.online_users);
  const [to_move, setToMove] = useState(null);
  const [no_game, setNoGame] = useState(false);
  const [turn, setTurn] = useState(init_state.turn);
  const {
    game,
    game: { challenger_id },
    status,
    opponent_board,
  } = state;
  const { placed_pieces, unplaced_pieces } = my_board;
  let { to_place } = state;
  const opponent_piece_color = my_board.color === 'white' ? 'black' : 'white';

  useEffect(() => {
    const handlefetchAll = async () => {
      getAll([await get('/auth/online'), await get('/game/mine')])
        .then(([data]) => {
          const [res_online_users, res_game_data] = data;
          if (res_game_data.data.game) {
            dispatch({
              type: 'DID_FETCH_GAME',
              payload: {
                game: res_game_data.data.game,
              },
            });
            setNoGame(false);
          } else {
            setNoGame(true);
          }
          dispatch({ type: 'DID_FETCH_USERS', payload: res_online_users });
        })
        .catch(err => {
          console.log(err);
        });
    };
    handlefetchAll();
  }, []);

  useEffect(() => {
    const {
      my_board,
      game: { board, last_move, turn, pieces },
      online_users,
      to_move,
    } = state;
    setBoard(board);
    setMyBoard(my_board);
    setOnlineUsers(online_users);
    setLastMove(last_move);
    setToMove(to_move);
    unplaced = my_board.unplaced_pieces;
    placed = my_board.placed_pieces;
    game_pieces = pieces;
    socket_board = board;
    board_color = my_board.color;
    if (last_move.turn) {
      setTurn(last_move.turn);
    } else {
      setTurn(turn);
    }
  }, [game, state]);

  const challengeUser = user => {
    post(`/challenge/${user.id}/send`).then(res => console.log(res));
  };

  const getBoardColor = col => {
    return challenger_id === user.id ? col.y >= 4 : col.y < 4;
  };
  const sendPiecePlace = async body => {
    await post('/game/place', body).then(res => res);
    handleSetToPlace(null);
  };

  const handleSetToPlace = place => {
    dispatch({ type: 'SET_PIECE_PLACE', payload: place });
  };

  const removePiecePlace = body => {
    post('/game/unplace', body);
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

  function movePiece(tile) {
    console.log('ilalagay', tile);
    console.log('lalagyan', to_move);
    if (!tile.piece && !to_move) {
      return;
    }
    if (!to_move) {
      setToMove(tile);
      return;
    }

    if (to_move === tile) {
      setToMove(tile);
      return;
    }

    let body = {
      ox: to_move.x,
      oy: to_move.y,
      nx: tile.x,
      ny: tile.y,
    };
    post('/game/move', body);
  }

  function updatePiecePlace(data) {
    dispatch({ type: 'UPDATE_PIECE_PLACE', payload: data });
  }

  function removePiece(data) {
    dispatch({ type: 'UNPLACE_PIECE', payload: data });
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
          tile.piece = {};
        }

        return tile;
      });
    });

    await dispatch({
      type: 'CLEAR_SETUP',
      payload: { placed, board: updated_board },
    });
  }

  function handleRandomSetup() {
    let index = parseInt(Math.random() * unplaced.length);
    to_place = unplaced[index];
    handleSetToPlace(to_place);
    let conflict_x = parseInt(Math.random() * 9);
    let conflict_y = parseInt(Math.random() * 8);
    let conflict = board[conflict_y][conflict_x];

    while (conflict.piece_id && conflict.piece === undefined) {
      conflict_x = parseInt(Math.random() * 9);
      conflict_y = parseInt(Math.random() * 8);
      conflict = board[conflict_y][conflict_x];
    }
    placePiece(conflict_x, conflict_y);

    if (unplaced.length > 0) {
      setTimeout(() => handleRandomSetup(state.my_board), 5);
    }
  }

  function sendStatusReady() {
    post('/game/ready').then(res => console.log(res));
  }

  function handleReady(data) {
    let user = data.id === my_board.id ? my_board : opponent_board;
    user.ready = 1;
  }

  function getPieceColor(col = { piece: {} }) {
    //return true for white
    const my_piece = placed.map(p => p.id).includes(col.piece_id);
    const my_board_color = my_board.color;
    const piece_color = col.piece.color;

    if (my_piece && my_board_color === piece_color) return my_board_color;
    if (my_piece && my_board_color !== piece_color) return piece_color;
    if (col.piece_id && !my_piece && my_board_color !== piece_color)
      return opponent_piece_color;
    if (!col.piece_id && getBoardColor(col)) return my_board_color;
    if (!col.piece_id && !getBoardColor(col)) return opponent_piece_color;
  }

  function getLastMoveDirection() {
    const move = last_move;

    if (!move) {
      return '';
    }
    const dx = move.ox - move.nx;
    const dy = move.oy - move.ny;

    if (dx < 0 && dy === 0) {
      return 'fa fa-chevron-right';
    }
    if (dx > 0 && dy === 0) {
      return 'fa fa-chevron-left';
    }

    if (dx === 0 && dy > 0) {
      return 'fa fa-chevron-up';
    }
    if (dx === 0 && dy < 0) {
      return 'fa fa-chevron-down';
    }
  }

  const handleMove = res => {
    let data = res.data ? res.data : res;

    socket_board[data.oy][data.ox].piece_id = undefined;
    socket_board[data.oy][data.ox].piece = {};

    socket_board[data.ny][data.nx].piece_id = undefined;
    socket_board[data.ny][data.nx].piece = {};

    let prev_move = {
      ox: data.ox,
      oy: data.oy,
      nx: data.nx,
      ny: data.ny,
    };

    if (data.remove) {
      data.remove.forEach(piece_id => {
        if (game.grave_yard) {
          game.grave_yard.push(game.pieces.find(p => p.id === piece_id));
        }

        game_pieces = game_pieces.filter(p => p.id !== piece_id);
      });
    }

    if (data.winner) {
      let winner = game_pieces.find(p => p.id === data.winner);
      socket_board[data.ny][data.nx].piece_id = data.winner;
      console.log(winner);
      if (winner.color === board_color) {
        socket_board[data.ny][data.nx].piece = winner;
      }
    }

    game.turn = data.turn;
    dispatch({ type: 'UPDATE_BOARD', payload: socket_board });
    dispatch({ type: 'UPDATE_LAST_MOVE', payload: prev_move });
    dispatch({ type: 'UPDATE_TURN', payload: data.turn });
  };

  const checkLastMove = col => {
    return last_move.ox === col.x && last_move.oy === col.y;
  };

  return (
    <div>
      {/* Socket */}
      <Event event="new_challenge" handler={handleAcceptChallege}></Event>
      <Event event="piece_placed" handler={updatePiecePlace}></Event>
      <Event event="piece_unplaced" handler={removePiece}></Event>
      <Event event="ready" handler={handleReady}></Event>
      <Event event="move" handler={handleMove}></Event>

      {/* board */}
      <StyledHeaderLight>The Game of the Generals</StyledHeaderLight>
      {no_game ? (
        ''
      ) : (
        <>
          <StyledHeaderLight>
            {opponent_board.ready === 1 && status === 'setup'
              ? `${opponent_board.name.toUpperCase()} is ready`
              : `Playing against ${opponent_board.name.toUpperCase()}`}
          </StyledHeaderLight>
          {status !== 'setup' ? <p>{`${turn}'s turn`}</p> : ''}
        </>
      )}
      <FlexContainer>
        <Col>
          {status === 'setup' ? (
            placed_pieces.length === 21 ? (
              <Button variant="warning" onClick={() => sendStatusReady()}>
                I am ready
              </Button>
            ) : (
              <>
                <Button onClick={() => handleRandomSetup()}>
                  Random Setup
                </Button>
                <Button onClick={() => handleClearSetUp()}>Clear</Button>
              </>
            )
          ) : (
            ''
          )}

          <Table>
            <tbody>
              {board.map((row, i) => (
                <tr key={i}>
                  {row.map(col => (
                    <td
                      key={`${col.x}, ${col.y} `}
                      className={
                        getBoardColor(col)
                          ? JSON.stringify(col.piece) ===
                            JSON.stringify(to_place)
                            ? 'selected'
                            : my_board.color
                          : `${opponent_board.color}`
                      }
                    >
                      {status === 'setup' ? (
                        <Piece
                          onClick={() => placePiece(col.x, col.y)}
                          className={
                            getBoardColor(col)
                              ? JSON.stringify(col.piece) ===
                                JSON.stringify(to_place)
                                ? 'selected'
                                : `${my_board.color}`
                              : `${opponent_board.color}`
                          }
                        >
                          {col.piece_id ? (
                            col.piece.id ? (
                              <div className={`${col.piece.color}`}>
                                {col.piece.icons &&
                                  col.piece.icons.map((icon, i) => (
                                    <i key={i} className={icon}></i>
                                  ))}
                                <p className="small">{col.piece.name}</p>
                              </div>
                            ) : (
                              <span>&#x25cf;</span>
                            )
                          ) : (
                            <span className={`${getPieceColor(col)}-text`}>
                              {`${col.x}, ${col.y}`}
                            </span>
                          )}
                        </Piece>
                      ) : //ongoing
                      col.piece_id ? (
                        col.piece.id ? (
                          <Piece
                            onClick={() => movePiece(col)}
                            className={getPieceColor(col)}
                          >
                            {col.piece.icons &&
                              col.piece.icons.map((icon, i) => (
                                <i key={i} className={icon}></i>
                              ))}
                            <p className="small">{col.piece.name}</p>
                          </Piece>
                        ) : (
                          <Piece
                            onClick={() => movePiece(col)}
                            className={getPieceColor(col)}
                          >
                            &#x25cf;
                          </Piece>
                        )
                      ) : checkLastMove(col) ? (
                        <Piece className="last-move">
                          <i className={getLastMoveDirection()}></i>
                          <i>
                            {col.x}, {col.y}
                          </i>
                        </Piece>
                      ) : (
                        <TransparentBtn onClick={() => movePiece(col)}>
                          <span>{`${col.x}, ${col.y}`}</span>
                        </TransparentBtn>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </FlexContainer>
      <br />
      <FlexContainer>
        <Col>
          <PieceContainer>
            {unplaced_pieces.map(piece => (
              <Piece
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
              </Piece>
            ))}
          </PieceContainer>
        </Col>
      </FlexContainer>
      <FlexContainer>
        <Col md={4} className="float-right">
          <Card>
            <StyledPadded>
              Online Players
              <ListGroup>
                {online_users
                  .filter(u => u.id !== user.id)
                  .map(user => (
                    <ListGroup.Item key={user.id}>
                      {user.name}
                      <Button
                        size="sm"
                        className="float-right"
                        variant="info"
                        onClick={() => challengeUser(user)}
                      >
                        Challenge
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </StyledPadded>
          </Card>
        </Col>
      </FlexContainer>
    </div>
  );
};

export default Game;
