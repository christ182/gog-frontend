import { useState, useEffect } from 'react';
import useApiService from './useApiService';

const useFetchApi = (url, initState) => {
  const { get } = useApiService();
  const [state, setState] = useState(initState);

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...initState, isLoading: true });
      try {
        const result = await get(url);
        setState({ data: result.data, isLoading: false, hasError: false });
      } catch (error) {
        setState({ ...initState, hasError: true });
      }
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return [state];
};

export default useFetchApi;
