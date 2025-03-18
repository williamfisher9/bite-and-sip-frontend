import { useContext } from "react";
import { CartContext } from "../../context/Cart";
import './CartItems.css'

const CartItems = () => {
    const {cartItems, getCartTotal, getCartItemsCount} = useContext(CartContext)

    return <div className="cart-items-container">
        <div style={{width: "50%"}}>
            <div className="cart-item">
                    <div style={{width: "10%"}}>Item</div>
                    <div style={{width: "25%"}}>Name</div>
                    <div style={{width: "10%"}}>Quantity</div>
                    <div style={{width: "10%"}}>Price</div>
                    <div style={{width: "10%"}}>Total</div>
                    
                </div>
                <hr />
        {
            cartItems.map((item) => {
                return <div className="cart-item">
                    <div style={{width: "10%"}} ><img src={item.img} className="img" /></div>
                    <div style={{width: "25%"}}>{item.name}</div>
                    <div style={{width: "10%"}}>{item.quantity}</div>
                    <div style={{width: "10%"}}>{item.price}</div>
                    <div style={{width: "10%"}}>{item.price * item.quantity}</div>
                </div>
            })
        }
        </div>

        <div style={{width: "50%", display: "flex", flexDirection: "column", justifyContent: "end"}}>
            <div style={{display: "flex", height: "30px"}}><div style={{width: "200px"}}>Number of items</div><span>{getCartItemsCount()}</span></div>
            <hr />
            <div style={{display: "flex", height: "30px"}}><div style={{width: "200px"}}>Subtotal</div><span>${getCartTotal()}</span></div>
            <hr />
            <div style={{display: "flex", height: "30px"}}><div style={{width: "200px"}}>Delivery Fee</div><span>$5</span></div>
            <hr />
            <div style={{display: "flex", height: "30px"}}><div style={{width: "200px"}}>Tax</div><span>${getCartTotal() * 5/100}</span></div>
            <hr />
            <div style={{display: "flex", height: "30px"}}><div style={{width: "200px"}}>Total</div><span>${getCartTotal() * 5/100 + getCartTotal()}</span></div>
        </div>
    </div>
}

export default CartItems;