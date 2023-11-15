import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../globalStates/firebaseUserState";
import { theme } from "../utils/theme";

const Text = styled.p`
  margin: 1rem 1rem 0 1rem;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: ${theme.colors.brown};
`;

export default function Home() {
  const [key] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (!key) return;
    const url = `/user/${key.uid}`;
    router.replace(url);
  }, [key, router]);

  return <Text>お店のQRコードを読み取って列に並ぼう！</Text>;
}
