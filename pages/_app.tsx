import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'theme-ui'
import { Toaster } from 'react-hot-toast'
import { theme } from './theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
})

function RemitanoChallengingApplication({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster position='top-right' />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default RemitanoChallengingApplication
