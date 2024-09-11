import { useState, useEffect, useCallback } from "react";

export interface UseFetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit | null;
  credentials: RequestCredentials;
}

class FetchError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype); // Corrects instanceof checks
  }
}

const useFetch = <T>(url: string, options?: UseFetchOptions): [T | null, boolean, FetchError | null, () => void] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FetchError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: options?.method || "GET",
        headers: options?.headers,
        body: options?.body,
        credentials: options?.credentials
      });
      const json = await response.json();
      if (!response.ok) {
        // Create a FetchError with status
        const fetchError: FetchError = new Error(
          json.message || `Network response was not ok, status: ${response.status}`
        );
        fetchError.status = response.status;
        throw fetchError;
      }
      setData(json);
    } catch (err) {
      if (err instanceof FetchError) {
        setError(err);
      } else if (err instanceof Error) {
        setError(new FetchError(err.message));
      } else {
        setError(new FetchError("An unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  }, [url, options]); // Dependencies here

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, loading, error, fetchData];
};

export default useFetch;
