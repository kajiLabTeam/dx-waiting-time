import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../globalStates/firebaseUserState";

export default function Home() {
  const [key] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (!key) return;
    const url = `/user/${key.uid}`;
    router.replace(url);
  }, [key, router]);

  return <div>Home</div>;
}
