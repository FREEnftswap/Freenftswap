import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Layout } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <div
          style={{
            zIndex: '10000000000000',
            position: 'absolute',
            top: '10%',
          }}
        >
          <ToastContainer />
        </div>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
