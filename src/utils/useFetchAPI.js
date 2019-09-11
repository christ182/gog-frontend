import { useEffect, useReducer } from 'react';

import ApiService from './ApiService';

const useFetchApi = (url, initState) => {
  const { get } = ApiService();
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState,
    }),
    initState,
  );

  useEffect(() => {
    const fetchData = async () => {
      setState({ isLoading: true });
      try {
        const result = await get(url);
        setState({ data: result, isLoading: false, hasError: false });
      } catch (error) {
        setState({ hasError: true });
        console.log(error);
      }
    };
    fetchData();
  }, [get, url]);
  return [state];
};

export default useFetchApi;
