import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import { LoginContextProvider } from './context/loginContext'
import { NotifContextProvider } from './context/notifContext'
import './index.css'

// define QueryClient and wrap App within QueryClientProvider
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifContextProvider>
    <LoginContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </LoginContextProvider>
  </NotifContextProvider>
)
