import { useEffect } from "react";
import useSWR from "swr";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

export const useDataWithLocalStorage = (url: string, fetcher: any) => {
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (data) {
      localStorage.setItem("dxWaitingTime", JSON.stringify(data));
    }
  }, [data]);

  return { data, error };
};
