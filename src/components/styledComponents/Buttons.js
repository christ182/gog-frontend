import styled from 'styled-components';

const BtnPrimary = styled.button`
  padding: 0.7em;
  background: var(--primary);
  border: 0;
  color: #fff;
`;

const BtnSecondary = styled.button`
  padding: 0.7em;
  background: var(--secondary);
  border: 0;
  color: #fff;
`;
const BtnSm = styled.button`
  border: solid 1px;
  min-width: 100%;
  height: 100%;
  padding: 0;
  &.black {
    background: #303033;
    color: #ffeb3b;
  }
  &.white {
    background: #fefefe;
    color: #636363;
  }
  &.last-move {
    background: #cccccc;
    border: dotted 2px #9a9999;
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (max-width: 500px) {
    font-size: 0.7em;
  }
`;
const TransparentBtn = styled(BtnSm)`
  background: transparent;
  border: 0;
  &:hover: {
    background: transparent;
    border: 0;
  }
`;
export { BtnPrimary, BtnSecondary, BtnSm, TransparentBtn };
