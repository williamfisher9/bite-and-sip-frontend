import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/Cart";
import './CartItems.css'
import CardDisplay from "../CartDisplay/CardDisplay";
import TableDisplay from "../CartDisplay/TableDisplay";
import emptyBasket from '../../assets/empty-basket.png'

const CartItems = () => {
    const {cartItems, getCartTotal, getCartItemsCount, removeItemFromCart, updateItemQuantity} = useContext(CartContext)
    const [newQuantity, setNewQuantity] = useState(0)

    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })

        return window.removeEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    const changeItemQuantity = () => {
        setNewQuantity(event.target.value)
    }

    const updateCart = (item) => {
        if(newQuantity > 0){
        updateItemQuantity(item, newQuantity)
        } else {
            removeItemFromCart(item)
        }
    }

    if(cartItems.length == 0)
        return <div className="empty-cart-items-container">
            <h2>YOUR BASKET IS EMPTY!</h2>
            <img id="emptyBasketImg" src={emptyBasket} alt="emptyBasket" />
        </div>

    return <div className="cart-items-container">
        
        {
            windowSize < 800 ?
            <CardDisplay />
            :
            <TableDisplay />
        }

        <table>
            <tbody>
            <tr>
                <th>Number of items</th>
                <td>{getCartItemsCount()}</td>
            </tr>
            <tr>
                <th>Subtotal</th>
                <td>${(getCartTotal()).toFixed(2)}</td>
            </tr>
            <tr>
                <th>Delivery Fee</th>
                <td>$5</td>
            </tr>
            <tr>
                <th>Tax</th>
                <td>${(getCartTotal() * 5/100).toFixed(2)}</td>
            </tr>
            <tr>
                <th>Total</th>
                <td>${(getCartTotal() * 5/100 + getCartTotal() + 5).toFixed(2)}</td>
            </tr>
            <tr>
                <th>Promo Code</th>
                <td><input type="text" style={{width: "100%", height:"100%", border: "none", outline: "none",backgroundColor: "transparent", fontSize: "16px", color: "green", textTransform: "uppercase"}} placeholder="Enter promo code if you have any"/></td>
            </tr>
            </tbody>
        </table>

            
        <button id="proceedBtn"><span id="proceedBtnTitle">PROCEED TO CHECKOUT<span className="material-symbols-rounded">arrow_forward_ios</span></span></button>
            
        
    </div>
}

export default CartItems;