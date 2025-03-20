import { useContext, useState } from "react"
import { CartContext } from "../../context/Cart"

const CartCardDisplay = () => {
    const {cartItems, getCartTotal, getCartItemsCount, removeItemFromCart, updateItemQuantity} = useContext(CartContext)
    const [newQuantity, setNewQuantity] = useState(null)

    const changeItemQuantity = () => {
        setNewQuantity(event.target.value)
    }

    const updateCart = (item) => {
        if(newQuantity != null && newQuantity > 0){
        updateItemQuantity(item, newQuantity)
        } else if(newQuantity == 0) {
            removeItemFromCart(item)
        }
    }

    return <table>
            
            <tbody>
        {
            cartItems.map((item) => {
                return <tr key={item.id}>
                    <th><img src={item.img} alt={item.img} className="item-img"/></th>
                    <td style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <div style={{fontWeight: "600"}}>
                        {item.name}
                        </div>

                        <div style={{display: "flex", justifyContent: "start", alignItems: "center", gap: "10px"}}>
                            <input type="text" defaultValue={item.quantity} style={{backgroundColor: "rgba(0, 0, 255, 0.1)", width: "50px", fontSize:"16px", border: "none", outline: "none", padding: "5px 10px"}} onChange={() => changeItemQuantity(item)}/>
                            <p style={{color: "blue", textDecoration: "underline", fontSize: "10px", cursor: "pointer"}} onClick={() => updateCart(item)}>update</p>
                        </div> 


                        <div>
                        {(parseFloat(item.price)).toFixed(2)}
                        </div>
                        <div>
                        {(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div>
                        <span className="material-symbols-rounded delete-icon" onClick={() => removeItemFromCart(item)}>delete</span>
                        </div>
                    </td>
                    </tr>
                    
            })
        }
</tbody>
    </table>
}

export default CartCardDisplay