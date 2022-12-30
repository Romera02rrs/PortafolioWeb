import { useEffect, useState } from "react";

export const useFetch = (url, datos, options) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const getFetch = async () => {
    setState({ ...state, isLoading: true });
    const resp = await fetch(url, datos, options);
    const data = await resp.json();
    setState({ data, hasError: null, isLoading: false });
  };

  useEffect(() => {
    getFetch();
  }, [url]);

  return { state };
};
