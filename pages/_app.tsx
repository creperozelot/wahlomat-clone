import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta property="og:title" content="Flame-O-Mat" />
        <meta property="og:description" content="Wähle jetzt deine Partei für die Flammenwahl 2025." />
        <meta property="og:image" content={process.env.PROVIDER_URL + "/images/screenshot_1.png"} />
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:url" content={process.env.PROVIDER_URL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flame-O-Mat" />
        <meta name="twitter:description" content="Wähle jetzt deine Partei für die Flammenwahl 2025." />
        <meta name="twitter:image" content={process.env.PROVIDER_URL} />

      </Head>
      <Component {...pageProps} />
    </>
  );
}
