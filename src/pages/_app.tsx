// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import store from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </UserProvider>
  );
}
