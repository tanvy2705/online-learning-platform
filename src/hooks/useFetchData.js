import { useState, useEffect } from 'react';

const useFetchData = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction();
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, dependencies);

  return { data, isLoading, error, refetch };
};

export default useFetchData;