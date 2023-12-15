import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const menuState = atom({
  key: "menuState",
  default: false,
  dangerouslyAllowMutability: true,
});

export const useMenuState = () => {
  return useRecoilValue(menuState);
};

export const useMenuMutators = () => {
  const setMenuState = useSetRecoilState(menuState);

  const setMenuOpenState = useCallback(
    (isMenuOpen: boolean) => {
      setMenuState(isMenuOpen);
    },
    [setMenuState]
  );

  return {
    setMenuOpenState,
  };
};
