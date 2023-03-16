import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import NotifContext, { NotifContextProvider } from './context/notifContext'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <QueryClientProvider client={queryClient}>
  //   <App />
  // </QueryClientProvider>

  <NotifContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NotifContextProvider>

  // <QueryClientProvider client={queryClient}>
  //   <NotifContext>
  //     <App />
  //   </NotifContext>
  // </QueryClientProvider>
)