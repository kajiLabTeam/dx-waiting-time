import { useEffect } from "react";
import useSWR from "swr";

export const filterfetcher = async (url: string) => {
  const nowDate = new Date();
  console.log(localStorage.getItem("token"));
  // ローカルストレージのdateを取得
  const localDate = JSON.parse(localStorage.getItem("dxWaitingTime") || "{}").date;

  // ローカルストレージと現在の日付が違う場合はAPIを叩く
  if (localDate != null || localDate !== nowDate.toDateString()) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
