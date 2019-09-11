import styled from 'styled-components';

const Board = styled.div`
  max-width: 45em;
  align-content: center;
  display: flex;
`;
const BoardContainer = styled.section`
  margin: auto;
`;
const PieceContainer = styled.div`
  max-height: 60em;
`;
const Grid = styled.button`
  max-height: 3em;
  width: 7em;
  border: solid 1px #444;
  text-align: center;
  display: inline;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  -webkit-margin-before: 0.3em;
  -webkit-margin-after: 0.2em;
  &.white {
    text-shadow: -1px -1px 1px #444;
    background: #fefefe;
  }
  &.black {
    background-image: -webkit-linear-gradient(#f1e300, #4a3800);
    text-shadow: -1px -1px 1px rgb(255, 223, 0);
    background: #303033;
    color: #fff;
  }
  &.sm {
    max-height: 2em;
    width: 4em;
    font-size: 0.9em;
  }
  &.selected {
    background: #3df7ae;
    text-shadow: -1px -1px 1px #444;
  }
`;
const BoardRow = styled.div`
  display: inline;
`;

export { Board, Grid, BoardRow, BoardContainer, PieceContainer };
