import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import "ress";
import OpenProvider from "../context/open";

export default function App({ Component, pageProps }: AppProps) {
  const openInfo = {
    open: false,
  };
  return (
    <OpenProvider OpenInfo={openInfo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OpenProvider>
  );
}
