import { useEffect } from "react";
import useSWR from "swr";

export const filterfetcher = async (url: string) => {
  const currentDate = new Date().toLocaleDateString("ja-JP").split("/").join("-");
  // ローカルストレージのdateを取得
  const localDate = JSON.parse(localStorage.getItem("dxWaitingTime") || "{}").date;

  // ローカルストレージにdxWaitingTimeがない場合 or ローカルストレージと現在の日付が違う場合はAPIを叩く
  if (localDate == null || localDate !== currentDate) {
    const response = await fetch(url);
    const data = await response.json();
    // ローカルストレージにdataを保存
    localStorage.setItem("dxWaitingTime", JSON.stringify(data));
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
