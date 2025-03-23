import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart";

const CartBalance = () => {
  const {
    cartItems,
    getCartTotal,
    getCartItemsCount,
    removeItemFromCart,
    updateItemQuantity,
  } = useContext(CartContext);
  const [newQuantity, setNewQuantity] = useState(0);

  return (
    <>
    <table>
      <tbody>
        <tr>
          <th>Number of items</th>
          <td>{getCartItemsCount()}</td>
        </tr>
        <tr>
          <th>Subtotal</th>
          <td>${getCartTotal().toFixed(2)}</td>
        </tr>
        <tr>
          <th>Delivery Fee</th>
          <td>$5</td>
        </tr>
        <tr>
          <th>Tax</th>
          <td>${((getCartTotal() * 5) / 100).toFixed(2)}</td>
        </tr>
        <tr>
          <th>Total</th>
          <td>
            ${((getCartTotal() * 5) / 100 + getCartTotal() + 5).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>

    <div className="promo-code-container">
      <input type="text" placeholder="Promo Code" className="promo-code-input"/>
      <span className="material-symbols-rounded promo-code-icon">local_activity</span>
      <button className="promo-code-btn">APPLY</button>
    </div>
</>
  );
};

export default CartBalance;
