import { useEffect } from "react";
import useSWR from "swr";

export const filterfetcher = async (url: string) => {
  const noewDate = new Date();
  console.log(localStorage.getItem("dxWaitingTime"));
  // ローカルストレージのdateを取得
  const localDate = JSON.parse(localStorage.getItem("dxWaitingTime") || "{}").date;
  console.log(localDate);

  // ローカルストレージと現在の日付が違う場合はAPIを叩く
  if (localDate != null || localDate !== noewDate.toDateString()) {
    const response = await fetch(url);
    console.log(response);
    return response.json();
  }
  // ローカルストレージと現在の日付が同じ場合はローカルストレージを返す
  return JSON.parse(localStorage.getItem("dxWaitingTime") || "{}");
};

export const useDataWithLocalStorage = <T>(url: string) => {
  const { data, error } = useSWR<T>(url, filterfetcher);

  useEffect(() => {
    if (data) {
      localStorage.setItem("dxWaitingTime", JSON.stringify(data));
    }
  }, [data]);

  return { data, error };
};
