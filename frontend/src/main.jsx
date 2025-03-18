import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/Cart.jsx'
import { GlobalStateProvider } from './context/GlobalState.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalStateProvider>
  <CartProvider>
    <App />
  </CartProvider>
  </GlobalStateProvider>
)
