import { createContext, ReactNode, FC, useState, useEffect } from "react";

type OpenInfo = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void; // setOpen メソッドを追加
};

type Props = {
  OpenInfo: OpenInfo;
  children: ReactNode;
};

// 初期値を設定
const initialOpenInfo: OpenInfo = {
  open: false,
  setOpen: () => {}, // 初期値として空の関数を設定
};

export const OpenContext = createContext<OpenInfo>(initialOpenInfo);

const OpenProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let openData = localStorage.getItem("open");
      if (!openData || openData === "undefined") {
        openData = JSON.stringify(false);
        localStorage.setItem("open", openData);
      }
      setOpen(JSON.parse(openData));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // open の値が変更されたときに localStorage に保存する
      localStorage.setItem("open", JSON.stringify(open));
    }
  }, [open]);

  return <OpenContext.Provider value={{ open, setOpen }}>{children}</OpenContext.Provider>;
};

export default OpenProvider;
