import { useContext } from "react"
import { CartContext } from "../../context/Cart"
import './CartSummary.css'
import { useNavigate } from "react-router-dom"

const CartSummary = ({showCartSummary, closeCartSummary}) => {
    const { cartItems, getCartItemsCount, getCartTotal } = useContext(CartContext)
    const navigate = useNavigate()

    if(!showCartSummary)
        return

    return <div className="cart-summary-container">
        <table style={{marginTop: "10px"}}>
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
            </tbody>
        </table>

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0", gap: "10px"}}>
        <button className="cart-summary-btn" onClick={() => {navigate("/biteandsip/cart"); closeCartSummary();}}>Go to Cart</button>
        <button className="cart-summary-btn" onClick={closeCartSummary}>Close</button>
        </div>
    </div>

}

export default CartSummary