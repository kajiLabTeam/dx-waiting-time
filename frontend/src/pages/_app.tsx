import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "../components/layout/layout";
import "ress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
