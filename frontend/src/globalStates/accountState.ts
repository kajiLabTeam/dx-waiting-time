import { atom, useRecoilState, useRecoilValue } from "recoil";

const accountInofGet = () => {
  let accountInfo = [
    {
      title: "店名",
      text: "お店の名前",
    },
    { title: "ホームページ", text: "https://example.com" },
  ];
  if (typeof window !== "undefined") {
    try {
      const storedAccountInfo = localStorage.getItem("accountInfo");
      if (storedAccountInfo !== null) {
        return JSON.parse(storedAccountInfo);
      }
    } catch (e) {
      localStorage.setItem("accountInfo", JSON.stringify(accountInfo));
    }
    return accountInfo;
  }
};

export const accountState = atom({
  key: "accountState",
  default: accountInofGet(),
  dangerouslyAllowMutability: true,
});

export const useAccountState = () => {
  return useRecoilValue(accountState);
};

export const useAccountMutators = () => {
  const [currentAccountState, setAccountState] = useRecoilState(accountState);

  const setAccountInfo = (title: string, text: string) => {
    const newAccountState = currentAccountState.map((account: { title: string }) => {
      if (account.title === title) {
        return {
          ...account,
          text: text,
        };
      }
      return account;
    });
    localStorage.setItem("accountInfo", JSON.stringify(newAccountState));
    setAccountState(newAccountState);
  };

  return {
    setAccountInfo,
  };
};
