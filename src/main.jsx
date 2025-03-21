import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/Cart.jsx";
import { GlobalStateProvider } from "./context/GlobalState.jsx";
import { MenuContextProvider } from "./context/Menu.jsx";

createRoot(document.getElementById("root")).render(
  <GlobalStateProvider>
    <MenuContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </MenuContextProvider>
  </GlobalStateProvider>
);
