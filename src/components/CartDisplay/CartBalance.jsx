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
        <tr>
          <th>Promo Code</th>
          <td>
            <input
              type="text"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                fontSize: "16px",
                color: "green",
                textTransform: "uppercase",
              }}
              placeholder="Enter promo code if you have any"
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CartBalance;
