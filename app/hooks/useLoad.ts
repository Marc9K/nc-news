import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export function useLoad(url: string, changeOn: any[] = [], params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    axios
      .get(url, { params: params })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err: AxiosError) => {
        setData(null);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, changeOn);

  return { data, loading, error };
}
