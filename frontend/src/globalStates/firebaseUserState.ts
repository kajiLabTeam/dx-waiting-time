import firebase from "firebase/auth";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const userState = atom<firebase.User | null>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useUserState = (): firebase.User | null => {
  return useRecoilValue(userState);
};

export const useUserMutators = () => {
  const setUserState = useSetRecoilState(userState);

  return {
    setUserState,
  };
};
