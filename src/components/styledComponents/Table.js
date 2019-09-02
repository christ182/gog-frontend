import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  & th,
  td {
    padding: 1em;
    border-collapse: collapse;
    border: solid 1px #ddd;
  }
  & th:not(:last-child),
  td:not(:last-child) {
    border-right: 0;
  }
  & td {
    border-top: 0;
  }
`;

export { Table };
