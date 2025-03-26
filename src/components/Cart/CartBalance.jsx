import { useContext } from "react";
import { CartContext } from "../../context/Cart";

const CartBalance = () => {
  const {
    
    getCartTotal,
    getCartItemsCount,
  } = useContext(CartContext);

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

    <div className="coupon-container">
      <input type="text" placeholder="Coupons" className="coupon-input"/>
      <span className="material-symbols-rounded coupon-icon">local_activity</span>
      <button className="coupon-btn">APPLY</button>
    </div>
</>
  );
};

export default CartBalance;
