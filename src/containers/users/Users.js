import React from 'react';

import useFetchAPI from 'utils/useFetchAPI';
import { Table } from 'components/styledComponents/Table';

const Users = () => {
  const [state] = useFetchAPI('/users', {
    data: [],
    isLoading: false,
    hasError: false,
  });

  const { data, isLoading, hasError } = state;

  return (
    <>
      <h1>Users</h1>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {isLoading && !hasError ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : (
            data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </thead>
      </Table>
    </>
  );
};

export default Users;
