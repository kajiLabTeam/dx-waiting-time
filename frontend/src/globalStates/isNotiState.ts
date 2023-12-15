import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const notiState = atom({
  key: "notiState",
  default: false,
  dangerouslyAllowMutability: true,
});

export const useNotiState = () => {
  return useRecoilValue(notiState);
};

export const useNotiMutators = () => {
  const setNotiState = useSetRecoilState(notiState);

  const setNotiPermissionState = useCallback(
    (isnotiOpen: boolean) => {
      setNotiState(isnotiOpen);
    },
    [setNotiState]
  );

  return {
    setNotiPermissionState,
  };
};
