import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserMutators } from "../globalStates/firebaseUserState";
import { app } from "./firebase";

export const googleLogin = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  signInWithRedirect(auth, provider).catch((error) => {
    console.error(error);
  });
};

export const useIsSigned = (): boolean | undefined => {
  const [isLogin, setIsLogin] = useState<boolean | undefined>();
  const { setUserState } = useUserMutators();

  useEffect(() => {
    (async () => {
      const auth = getAuth();
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLogin(true);
            setUserState(user);
          } else {
            setIsLogin(false);
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isLogin, setUserState]);

  return isLogin;
};
