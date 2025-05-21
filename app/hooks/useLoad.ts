import { useState, useEffect } from "react";
import axios from "axios";

export function useLoad(url, changeOn = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, changeOn);

  return { data, loading, error };
}
