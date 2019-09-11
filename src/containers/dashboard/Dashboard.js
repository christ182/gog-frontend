import ApiService from 'utils/ApiService';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import { Event } from 'react-socket-io';
import {
  FlexContainer,
  StyledPadded,
} from 'components/styledComponents/Containers';
import { Grid, PieceContainer } from 'components/styledComponents/GameBoard';
import { StyledHeaderLight } from 'components/styledComponents/Typography';

const init_game = {
  game: {
    board: [],
    challenger: { unplaced_pieces: [], placed_pieces: [] },
    challengee: { unplaced_pieces: [], placed_pieces: [] },
    status: '',
  },
};

const init_board = {
  my_board: { unplaced_pieces: [], placed_pieces: [] },
  opponent_board: { unplaced_pieces: [], placed_pieces: [] },
};

const Dashboard = () => {
  const user = JSON.parse(localStorage.user);
  const { get, getAll, post } = ApiService();

  const [online_users, setOnlineUsers] = useState([]);
  const [state, setState] = useReducer(dispatch(), init_game);
  const [game_board, setBoard] = useReducer(dispatch(), init_board);
  const [to_place, setToPlace] = useState();

  function dispatch() {
    return (state, newState) => ({
      ...state,
      ...newState,
    });
  }

  useEffect(() => {
    const fetchAll = async () => {
      getAll([await get('/auth/online'), await get('/game/mine')])
        .then(([data]) => {
          const [res_online_users, res_game_data] = data;
          setOnlineUsers(res_online_users);
          const res_game = res_game_data.data;
          setState(res_game);
        })
        .catch(err => {
          console.log(err);
          setState(init_game);
        });
    };

    fetchAll();
    return () => {
      setState(init_game);
      setOnlineUsers([]);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {
      game: { challenger, challengee },
    } = state;

    if (challenger.id === user.id) {
      setBoard({ my_board: challenger, opponent_board: challengee });
    } else {
      setBoard({ my_board: challengee, opponent_board: challenger });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    refreshBoard();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game_board]);

  function refreshBoard() {
    const {
      game,
      game: { board },
    } = state;

    const { my_board } = game_board;

    let new_board = board.map(row => {
      let piece = { piece: { icons: [], piece_id: '' } };
      return row.map(tile => {
        let xtile = { ...tile, ...piece };
        if (xtile.piece_id) {
          xtile.piece =
            my_board.placed_pieces.find(p => p.id === tile.piece_id) || {};
        } else {
          xtile.piece = piece;
        }

        return xtile;
      });
    });
    let new_game = { ...game, board: new_board };
    const new_state = { game: new_game };

    if (JSON.stringify(state) !== JSON.stringify(new_state)) {
      setState({ game: { ...game, board: new_board } });
    }
  }

  // function updatePosition() {}

  const challengeUser = user => {
    post(`/challenge/${user.id}/send`).then(res => console.log(res));
  };

  const sendPiecePlace = body => {
    setToPlace({});
    post('/game/place', body).then(res => console.log('sendPiecePlace', res));
  };

  const removePiecePlace = body => {
    setToPlace({});
    post('/game/unplace', body).then(res => console.log(res));
  };

  function placePiece(x, y) {
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
      if (board[y][x].piece) {
        const piece = board[y][x].piece;
        removePiecePlace({ piece_id: piece.id });
      }
    }
  }

  function clearSetUp() {
    const placed = [...my_board.placed_pieces];
    const updated = placed.forEach((p, i) => {
      setTimeout(() => {
        placePiece(p.x, p.y);
      }, i * 15);
    });

    console.log(updated);

    setBoard({ ...game_board, my_board: updated });
  }

  // function getPieceColor(piece) {
  //   //return true for white
  //   const my_piece = my_board.placed_pieces.map(p => p.id).includes(piece.id);
  //   const my_color = my_board.color;

  //   if (my_piece && my_color === 'white') {
  //     return true;
  //   }

  //   if (my_piece && my_color !== 'white') {
  //     return false;
  //   }

  //   if (!my_piece && my_color === 'white') {
  //     return false;
  //   }

  //   if (!my_piece && my_color !== 'white') {
  //     return true;
  //   }
  // }

  function acceptChallege() {
    post('/challenge/accept').then(res => console.log(res));
  }

  function handlePiecePlaced(data) {
    console.log(data);
    let new_board = {
      ...my_board,
      ...{
        placed_pieces: data.placed_pieces,
        unplaced_pieces: data.unplaced_pieces,
      },
    };
    if (data.unplaced_pieces) {
      setBoard(new_board);
      refreshBoard(data);
    }
  }

  const {
    game: { board, status },
  } = state;
  const { my_board, opponent_board } = game_board;

  return (
    <div>
      <Event event="new_challenge" handler={acceptChallege}></Event>
      <Event event="piece_placed" handler={handlePiecePlaced}></Event>
      <StyledHeaderLight>Play the Game</StyledHeaderLight>
      <FlexContainer>
        <Col>
          <button onClick={() => clearSetUp()}>Clear</button>
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
                            ? `${my_board.color}`
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
                            ''
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
              ? my_board.unplaced_pieces.map(piece => (
                  <Grid
                    key={piece.id}
                    className={
                      piece === to_place
                        ? 'selected'
                        : piece.color === 'white'
                        ? 'white'
                        : 'black'
                    }
                    onClick={() => setToPlace(piece)}
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
                        Invite
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

export default Dashboard;
