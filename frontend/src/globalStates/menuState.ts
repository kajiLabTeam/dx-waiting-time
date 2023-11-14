import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const menuState = atom({
  key: "menuState",
  default: false,
  dangerouslyAllowMutability: true,
});

export const useMenuState = () => {
  return useRecoilValue(menuState);
};

export const useUserMutators = () => {
  const setMenuState = useSetRecoilState(menuState);

  return {
    setMenuState,
  };
};
