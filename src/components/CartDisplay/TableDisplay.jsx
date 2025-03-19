import { useContext, useState } from "react"
import { CartContext } from "../../context/Cart"

const TableDisplay = () => {
    const {cartItems, getCartTotal, getCartItemsCount, removeItemFromCart, updateItemQuantity} = useContext(CartContext)
    const [newQuantity, setNewQuantity] = useState(0)

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

    return <table>
    <thead>
        <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th style={{textAlign: "center"}}>Remove</th>
            </tr>
            </thead>
            <tbody>
        {
            cartItems.map((item) => {
                return <tr key={item.id}>
                    <td><img src={item.img} className="img" /></td>
                    <td>{item.name}</td>
                    <td style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start"}}>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , height: "100%"}}>
                        <input type="text" defaultValue={item.quantity} style={{backgroundColor: "rgba(0, 0, 255, 0.1)", width: "30px", fontSize:"16px", border: "none", outline: "none", padding: "5px 10px"}} onChange={() => changeItemQuantity(item)}/>
                        <p style={{color: "blue", textDecoration: "underline", fontSize: "10px", cursor: "pointer"}} onClick={() => updateCart(item)}>update</p>
                        
                        </div>    
                    </td>
                    <td>{(parseFloat(item.price)).toFixed(2)}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                    <td style={{textAlign: "center"}}><span className="material-symbols-rounded delete-icon" style={{cursor: "pointer",}} onClick={() => removeItemFromCart(item)}>delete_forever</span></td>
                </tr>
            })
        }
</tbody>
    </table>
}

export default TableDisplay