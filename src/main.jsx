import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import store from './store.jsx'
import { Provider } from 'react-redux'
import { LoadingProvider } from './context/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadingProvider>
    </Provider>
  </StrictMode>,
)
