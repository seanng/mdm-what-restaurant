import Head from 'next/head'
import { metadata } from 'utils/configs'
import 'tailwindcss/tailwind.css'
import 'nouislider/distribute/nouislider.css'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{metadata.SITE_TITLE}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={metadata.SITE_URL} />
        <link rel="manifest" href="manifest.webmanifest" />
        <meta name="description" content={metadata.SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={metadata.SITE_TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${metadata.SITE_URL}/banner.jpg`} />
        <meta property="og:description" content={metadata.SITE_DESCRIPTION} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
