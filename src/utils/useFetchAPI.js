import { useEffect, useReducer } from 'react';

import useApiService from './useApiService';

const useFetchApi = (url, initState) => {
  const { get } = useApiService();
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
        setState({ data: result.data, isLoading: false, hasError: false });
      } catch (error) {
        setState({ hasError: true });
        console.log(error);
      }
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return [state];
};

export default useFetchApi;
