import type { AppProps } from "next/app";
import { useState } from "react";
import Layout from "../components/layout/layout";
import "ress";
import OpenProvider from "../context/open";

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const openInfo = { open, setOpen };
  return (
    <OpenProvider OpenInfo={openInfo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OpenProvider>
  );
}
