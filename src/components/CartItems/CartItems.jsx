import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart";
import './CartItems.css'
import emptyBasket from '../../assets/empty-basket.png'
import CartBalance from "../CartDisplay/CartBalance";
import CartCardDisplay from "../CartDisplay/CartCardDisplay";
import CartTableDisplay from "../CartDisplay/CartTableDisplay";

const CartItems = () => {
    const {cartItems} = useContext(CartContext)

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })

        return window.removeEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    if(cartItems.length == 0)
        return <div className="empty-cart-items-container">
            <h2>YOUR BASKET IS EMPTY!</h2>
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
                <span id="proceedBtnTitle">PROCEED TO CHECKOUT<span className="material-symbols-rounded">arrow_forward_ios</span></span>
            </button>
        </div>
            
        
    </div>
}

export default CartItems;