import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

store.subscribe(() => {
  console.log('store.getState()', store.getState())
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  //   <App />
  // </Provider>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
)