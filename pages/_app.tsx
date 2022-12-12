import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProSidebarProvider>
      <Head>
        <title>CG Mars Workout</title>
      </Head>
      <Component {...pageProps} />
    </ProSidebarProvider>
  );
}
