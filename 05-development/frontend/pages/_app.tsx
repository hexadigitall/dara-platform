import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  // Prevent flash of unstyled content
  useEffect(() => {
    document.documentElement.classList.add('js-focus-visible')
  }, [])

  return (
    <>
      <Head>
        <title>StyleAI - Your AI Fashion Companion</title>
        <meta name="description" content="Discover perfect outfits with AI-powered conversational styling. Describe your style and get personalized recommendations from hundreds of brands." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* SEO Meta Tags */}
        <meta property="og:title" content="StyleAI - Your AI Fashion Companion" />
        <meta property="og:description" content="Discover perfect outfits with AI-powered conversational styling" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://styleai.com" />
        <meta property="og:image" content="https://styleai.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@styleai" />
        <meta name="twitter:title" content="StyleAI - Your AI Fashion Companion" />
        <meta name="twitter:description" content="Discover perfect outfits with AI-powered conversational styling" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#d946ef" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Accessibility */}
        <meta name="color-scheme" content="light dark" />
      </Head>
      
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
