import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const screen = {
  desktop: 992,
  tablet: 768,
  phone: 368,
};

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
const Piece = styled(Button)`
  height: 4em;
  width: 4em;
  padding: 0;
  font-size: 0.7em;
  &.black {
    background: #303033;
    color: #ffeb3b;
  }
  &.white {
    background: #fefefe;
    color: #636363;
  }
`;
const BoardRow = styled.div`
  display: inline;
`;

const GridContainer = styled.div`
  display: flex;
  // ${({ nowrap }) => nowrap && `flex-wrap:${nowrap}`};
  & div {
    height: 3em;
    width: 3em;
    ${({ border }) => border && 'border:solid 1px #ddd'}
  }

  @media (min-width: ${screen.desktop}px) {
    & div {
      height: 3em;
      width: 14em;
      ${({ border }) => border && 'border:solid 1px #ddd'}
    }
  }

  @media (min-width: ${screen.tablet}px) and (max-width:${screen.desktop -
  1}px) {
    & div {
      height: 3em;
      width: 10em;
      ${({ border }) => border && 'border:solid 1px #ddd'}
    }
  }

  @media (min-width: ${screen.phone}px) and (max-width: ${screen.tablet -
  1}px) {
    & div {
      height: 3em;
      width: 8em;
      ${({ border }) => border && 'border:solid 1px #ddd'}
    }
  }
`;

export {
  Board,
  Piece,
  BoardRow,
  BoardContainer,
  PieceContainer,
  GridContainer,
};
