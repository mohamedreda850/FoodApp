import React, { useEffect, useState } from "react";


export default function useFetch(fetchFun) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [counter, setCounter] = useState(0)
  const trigger = () => setCounter((prevCount) => prevCount + 1);
  useEffect(() => {
    
    (async () => {
      setIsLoading(true);
      try {
        const response = await (fetchFun && fetchFun());
        setData(response.data);
      } catch (error) {
        setError(true);
        setIsError(true);
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    })()
  }, [ counter]);
  return { data, isLoading, isError, error , trigger};
}
