import type { NextApiRequest, NextApiResponse } from "next";

interface Manifest {
  theme_color: string;
  background_color: string;
  display: string;
  scope: string;
  start_url: string;
  name: string;
  short_name: string;
  description: string;
  icons: {
    src: string;
    sizes: string;
    type: string;
  }[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Manifest>) {
  const { start_url = "" } = req.query; // 既定のstart_urlを設定

  const manifest: Manifest = {
    theme_color: "#f69435",
    background_color: "#f69435",
    display: "standalone",
    scope: "/",
    start_url: start_url as string,
    name: "dx-waiting-timed",
    short_name: "dx-waiting-time",
    description: "",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  res.status(200).json(manifest);
}
