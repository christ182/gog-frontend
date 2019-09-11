const user = localStorage.user ? JSON.parse(localStorage.user) : '';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DID_FETCH': {
      const {
        payload: {
          online_users,
          game,
          game: { board, status, challenger, challengee },
        },
      } = action;

      let my_board = user.id === challenger.id ? challenger : challengee;
      let opponent_board = user.id !== challenger.id ? challenger : challengee;
      const new_board = handleUpdateBoard(board, my_board);
      return {
        ...state,
        game: { ...game, board: new_board },
        my_board: my_board,
        opponent_board: opponent_board,
        online_users: online_users,
        status: status,
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
      const { to_place = {} } = state;
      const new_state = {
        ...state,
        to_place: { ...to_place, ...action.payload },
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
      if (placed_pieces.length || unplaced_pieces.length) {
        let new_piece = placed_pieces.find(p => p.id === data.piece_id);
        updated_board[data.y][data.x].piece = new_piece;
      }
      updated_board[data.y][data.x].piece_id = data.piece_id;
      return {
        ...state,
        board: updated_board,
        my_board: {
          ...my_board,
          unplaced_pieces: unplaced_pieces,
          placed_pieces: placed_pieces,
        },
      };
    }

    case 'CLEAR_SETUP': {
      const { my_board } = state;
      return {
        ...state,
        my_board: {
          ...my_board,
          placed_pieces: [],
          unplaced_pieces: action.payload.placed,
        },
      };
    }
    case 'TEST': {
      const { toggle = false } = state;
      return {
        ...state,
        toggle: !toggle,
      };
    }

    default:
      return state;
  }
};

function handleUpdateBoard(board, my_board) {
  let new_board = board.map(row => {
    return row.map(tile => {
      if (tile.piece_id) {
        tile.piece =
          my_board.placed_pieces.find(p => p.id === tile.piece_id) || {};
      } else {
        tile.piece = undefined;
      }

      return tile;
    });
  });
  return new_board;
}

export default reducer;
