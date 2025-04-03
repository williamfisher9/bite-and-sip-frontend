import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart";
import './Cart.css'
import emptyBasket from '../../assets/empty-basket.png'
import CartBalance from "./CartBalance";
import CartCardDisplay from "./CartCardDisplay";
import CartTableDisplay from "./CartTableDisplay";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";

const Cart = () => {
    const {cartItems} = useContext(CartContext)
    const navigate = useNavigate()

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
        const {clearMenuItemsState} = useContext(MenuContext)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })

        return window.removeEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    const handleProceedToCheckout = () => {
        if(Cookies.get("isAuthenticated")){
            navigate("/biteandsip/cart/checkout");
        } else {
            clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
        }
    }

  
    if(cartItems.length == 0)
        return <div className="empty-cart-items-container">
            <h2 style={{color: "#7963c0"}}>YOUR BASKET IS EMPTY!</h2>
            <img id="emptyBasketImg" src={emptyBasket} alt="emptyBasket" />
        </div>

    return <div className="cart-items-container">


        
        <div className="cart-display-container">
            
            {
                windowSize < 800 ?
                <CartCardDisplay />
                :
                <CartTableDisplay />
            }
        </div>

        <div className="card-balance-container">
            <CartBalance />
            <button id="proceedBtn">
                <span id="proceedBtnTitle" onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT<span className="material-symbols-rounded">arrow_forward_ios</span></span>
            </button>
        </div>
            
        
    </div>
}

export default Cart;