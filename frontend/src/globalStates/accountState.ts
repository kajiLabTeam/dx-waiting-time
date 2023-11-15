import { atom, useRecoilState, useRecoilValue } from "recoil";

export const accountState = atom({
  key: "accountState",
  default: [
    {
      title: "店名",
      text: "お店の名前",
    },
    { title: "ホームページ", text: "https://example.com" },
  ],
  dangerouslyAllowMutability: true,
});

export const useAccountState = () => {
  return useRecoilValue(accountState);
};

export const useAccountMutators = () => {
  const [currentAccountState, setAccountState] = useRecoilState(accountState);

  const setAccountInfo = () => {
    (title: string, text: string) => {
      const newAccountState = currentAccountState.map((account) => {
        if (account.title === title) {
          return {
            ...account,
            text: text,
          };
        }
        return account;
      });
      setAccountState(newAccountState);
    };
  };

  return {
    setAccountInfo,
  };
};
