import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const salesState = atom({
  key: "salesState",
  default: false,
  dangerouslyAllowMutability: true,
});

export const useSalesState = () => {
  return useRecoilValue(salesState);
};

export const useSalesMutators = () => {
  const setSalesState = useSetRecoilState(salesState);

  const setSales = useCallback(
    (isSalesOpen: boolean) => {
      setSalesState(isSalesOpen);
    },
    [setSalesState]
  );

  return {
    setSales,
  };
};
