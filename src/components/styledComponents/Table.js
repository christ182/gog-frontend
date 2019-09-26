import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  & th,
  td {
    border-collapse: collapse;
    border: solid 1px #444;
    text-align: center;
    padding: 0;
    max-width: 2em;
    height: 1.5em;
  }
  & th:not(:last-child),
  td:not(:last-child) {
    border-right: 0;
  }
  & td.white {
    background: #fff;
  }
  & td.black {
    background: #1d1d1d;
  }
  & tr.space-between > td {
    margin-top: 1em;
  }
`;

export { Table };
