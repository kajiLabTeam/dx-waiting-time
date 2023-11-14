import useSWR from "swr";

// ドメイン
export const baseURL = "http://localhost:3000/api/";

export const endpoints = {
  // user
  //待ち順に並ぶ GET
  position: `(事業者ID)/queue/position/?token=(device_token)`,
  // 後何人で自分の番になるか GET
  userfollowing: `(事業者ID)/queue/following/?info={エンコードしたローカルストレージのJSONオブジェクト}`,
  // 列から離れる DELETE
  delete: "owner/queue/delete/",
  //事業者 POST
  createOwner: " owner/queue/create/(事業者名)",
  ownerFollowing: "owner/queue/following",
  // 呼び出し
  call: "owner/queue/position/next",
  // 完了
  complete: "owner/queue/position/complete/(ユーザID)",
  // パス
  pass: "owner/queue/position/pass/(ユーザID)",
};

export const useCustomSWR = <T>(url: string) => {
  const fetcher = async (url: string): Promise<any> => {
    const resonse = await fetch(url);
    return resonse.json();
  };

  const { data, error } = useSWR<T>(url, fetcher);
  return { data, error };
};
