import { AppProps } from 'next/app'
import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['cyrillic'] })

export default function App({ Component, pageProps }:AppProps) { 
  return (
   
    <React.Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        <title>Log Analysis</title>
      </Head>
        <main className={inter.className}>
          
                <Component {...pageProps} />
        </main>
    </React.Fragment>
  )

}    