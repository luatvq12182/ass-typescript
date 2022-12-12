import "../styles/globals.css";
import { GoogleFonts } from "next-google-fonts";
import type { AppProps } from "next/app";
import Layout from "../components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&display=swap" />
      <Component {...pageProps} />
    </Layout>
  );
}
