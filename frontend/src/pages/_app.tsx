import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Auth } from "../components/auth/auth";
import Layout from "../components/layout/layout";
import "ress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth>
    </RecoilRoot>
  );
}
