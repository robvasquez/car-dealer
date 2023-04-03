import '../styles/globals.css'
import type {AppProps} from 'next/app'
import '../styles/tailwind.css';

// The rest of the code remains unchanged

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
