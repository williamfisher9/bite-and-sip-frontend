import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

const CartBalance = () => {
  const {getCartTotal, getCartItemsCount} = useContext(CartContext);

  const [coupon, setCoupon] = useState({valid: true, details: null, value: "", fieldError: false});

  const handleCouponChange = () => {
    setCoupon({...coupon, value: event.target.value})
  }

  const verifyCoupon = (code) => {
    if(coupon.value == ""){
      setCoupon({...coupon, fieldError: true})
    } else {
      axios.get(`${BACKEND_URL}/api/v1/app/public/coupons/code/${code}`)
      .then((res) => {
        console.log(res.data.message)
        setCoupon({valid: true, details: res.data.message, value: "", fieldError: false})
      })
      .catch((err) => {
        if(err.status == 404){
          setCoupon({...coupon, valid: false, details: null, fieldError: false})
        }
      })
    }
    
  }

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

      {
        coupon.details && <tr>
        <th>Coupon</th>
        <td>
          -${coupon.details?.amount.toFixed(2)}
        </td>
      </tr>
      }

        <tr>
          <th>Total</th>
          <td>
            ${((getCartTotal() * 5) / 100 + getCartTotal() + 5 - coupon.details?.amount).toFixed(2)}
          </td>
        </tr>


      </tbody>
    </table>

    <div className="coupon-container" style={{border: coupon.fieldError ? "2px solid red" : null}}>
      <input type="text" placeholder="Coupons" className="coupon-input" onChange={handleCouponChange}  value={coupon.value}/>
      <span className="material-symbols-rounded coupon-icon">local_activity</span>
      {!coupon.valid != "" && <span className="invalid-coupon">invalid</span> }
      <button className="coupon-btn" onClick={() => verifyCoupon(coupon.value)}>APPLY</button>
    </div>
</>
  );
};

export default CartBalance;
