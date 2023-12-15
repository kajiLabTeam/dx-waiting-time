import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilEnv } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const loginState = atom({
  key: "loginState",
  default: false,
  dangerouslyAllowMutability: true,
});

export const useLoginState = () => {
  return useRecoilValue(loginState);
};

export const useLoginMutators = () => {
  const setLoginState = useSetRecoilState(loginState);

  const setLoginOpenState = useCallback(
    (isLoginOpen: boolean) => {
      setLoginState(isLoginOpen);
    },
    [setLoginState]
  );

  return {
    setLoginOpenState,
  };
};
