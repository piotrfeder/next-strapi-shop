import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/index';
import { ApolloProvider } from "@apollo/client";
import client from "../client/apollo-client";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ContextProvider } from './context';



const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  orange: '#f1553b',
  white: '#ffffff',
  silver: '#cbcbcb',
  black: '#000',
  $silverLight: '#f5f5f5'
}

const breakpoints = {
  sm: '320px',
  md: '450px',
  lg: '1007px',
  xl: '1920px',
}

const textStyles = {
  h1: {
    fontSize: ['48px', '72px'],
    fontWeight: 'bold',
    lineHeight: '1.2'
  },
  p: {
    fontSize: '18px',
    lineHeight: '1.2',
  }
}

const fonts = {
  body: 'Poppins, sans-serif',
}

const styles = {
  global: {
    'html, body': {
      bg: '#f5f5f5',
      color: '#000'
    }
  }
}

const theme = extendTheme({ colors, breakpoints, textStyles, fonts, styles })
let initialState = {
  orders: [],
}
function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <ContextProvider value={initialState}>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </ContextProvider>
  )
}

export default MyApp
