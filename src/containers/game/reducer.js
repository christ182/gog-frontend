const user = localStorage.user ? JSON.parse(localStorage.user) : '';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DID_FETCH_GAME': {
      const {
        payload: {
          game,
          game: { board, status, challenger, challengee, grave_yard },
        },
      } = action;

      let my_board = user.id === challenger.id ? challenger : challengee;
      let opponent_board = user.id !== challenger.id ? challenger : challengee;
      const new_board = handleUpdateBoard(
        board,
        my_board,
        grave_yard,
        challenger,
      );
      return {
        ...state,
        game: { ...game, board: new_board },
        my_board: my_board,
        opponent_board: opponent_board,
        status: status,
      };
    }

    case 'UPDATE_LAST_MOVE': {
      const { game } = state;
      return {
        ...state,
        game: {
          ...game,
          last_move: action.payload,
        },
      };
    }

    case 'DID_FETCH_USERS': {
      return {
        ...state,
        online_users: action.payload,
      };
    }

    case 'UPDATE_BOARD': {
      const { game } = state;
      return {
        ...state,
        game: {
          ...game,
          board: action.payload,
        },
      };
    }

    case 'UPDATE_MY_BOARD': {
      const { my_board } = state;
      let new_board = { ...my_board, ...action.payload };
      return {
        ...state,
        my_board: new_board,
      };
    }

    case 'SET_PIECE_PLACE': {
      const new_state = {
        ...state,
        to_place: action.payload,
      };
      return new_state;
    }

    case 'UPDATE_PIECE_PLACE': {
      const {
        my_board,
        game: { board },
      } = state;

      const {
        payload: { data, unplaced_pieces = [], placed_pieces = [] },
      } = action;

      let updated_board = board;
      let updated_my_board = my_board;
      if (placed_pieces.length || unplaced_pieces.length) {
        let new_piece = placed_pieces.find(p => p.id === data.piece_id);
        updated_board[data.y][data.x].piece = new_piece;
        updated_my_board = {
          ...my_board,
          unplaced_pieces: unplaced_pieces,
          placed_pieces: placed_pieces,
        };
      }
      updated_board[data.y][data.x].piece_id = data.piece_id;
      return {
        ...state,
        board: updated_board,
        my_board: updated_my_board,
      };
    }

    case 'UNPLACE_PIECE': {
      const {
        my_board,
        opponent_board,
        game: { board },
      } = state;

      const {
        payload: { data, unplaced_pieces = [], placed_pieces = [] },
      } = action;
      let updated_board = board;
      let updated_my_board = my_board;
      updated_board[data.y][data.x].piece = {};
      updated_board[data.y][data.x].piece_id = undefined;
      if (placed_pieces.length || unplaced_pieces.length) {
        updated_my_board = {
          ...my_board,
          unplaced_pieces: unplaced_pieces,
          placed_pieces: placed_pieces,
          opponent_board: {
            ...opponent_board,
            placed_pieces: [
              ...placed_pieces,
              placed_pieces.filter(p => p.id !== data.id),
            ],
          },
        };
      }

      return {
        ...state,
        board: updated_board,
        my_board: updated_my_board,
      };
    }

    case 'CLEAR_SETUP': {
      const { my_board } = state;
      return {
        ...state,
        my_board: {
          ...my_board,
          unplaced_pieces: action.payload.placed,
        },
      };
    }

    case 'UPDATE_TURN': {
      const { game } = state;
      return {
        ...state,
        game: { ...game, turn: action.payload },
      };
    }

    default:
      return state;
  }
};

function handleUpdateBoard(board, my_board, grave_yard) {
  let new_board = board.map(row => {
    return row.map(tile => {
      if (tile.piece_id) {
        const removed = grave_yard.find(p => p.id === tile.piece_id);
        if (removed) {
          tile.piece = {};
          tile.piece_id = undefined;
        } else {
          tile.piece =
            my_board.placed_pieces.find(p => p.id === tile.piece_id) || {};
        }
      } else {
        tile.piece = {};
      }

      return tile;
    });
  });

  if (my_board.color === 'black') {
    let first_half = new_board
      .map(row => {
        return row.filter(p => p.y < 4);
      })
      .reverse();
    let second_half = new_board
      .map(row => {
        return row.filter(p => p.y >= 4);
      })
      .reverse();

    let first = first_half.filter(row => row.length > 0);
    let second = second_half.filter(row => row.length > 0);
    let combined = [...second, ...first];
    return combined;
  } else return new_board;
  // return new_board;
}

export default reducer;
