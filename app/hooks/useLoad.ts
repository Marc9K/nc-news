import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export function useLoad(url: string, changeOn: any[] = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err: AxiosError) => setError(err))
      .finally(() => setLoading(false));
  }, changeOn);

  return { data, loading, error };
}
