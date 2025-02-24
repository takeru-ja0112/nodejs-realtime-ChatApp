import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',//Next.jsを静的サイトとして出力
  trailingSlash:true,//すべてのページでスラッシュを追加
};

export default nextConfig;
