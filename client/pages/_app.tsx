import SocketsProvider from '../context/socket.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <SocketsProvider> <Component {...pageProps} /> </SocketsProvider>
}

export default MyApp
