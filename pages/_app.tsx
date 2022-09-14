import '../styles/globals.css'
import type { AppProps } from 'next/app'
import client from "../apollo-client";
import { NextPage } from 'next/types'
import { ApolloProvider } from '@apollo/client';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      {getLayout(
        <Component {...pageProps} />
      )}
    </ApolloProvider>
  )
}

export default MyApp
