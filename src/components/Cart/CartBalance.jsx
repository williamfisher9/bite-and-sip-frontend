import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";
import Cookies from 'js-cookie'

import './CartBalance.css'
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";

const CartBalance = () => {
  const {getCartTotal, getCartItemsCount} = useContext(CartContext);
  const navigate = useNavigate()
    const {clearUserCookie} = useContext(GlobalStateContext);
    const {clearMenuItemsState} = useContext(MenuContext)

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

  const handleProceedToCheckout = () => {
          if(Cookies.get("isAuthenticated")){
              navigate("/biteandsip/cart/checkout");
          } else {
              clearUserCookie();
            clearMenuItemsState();
            navigate("/biteandsip/login");
          }
      }

  return <div className="cart-balance-table">
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
            ${((getCartTotal() * 5) / 100 + getCartTotal() + 5).toFixed(2)}
          </td>
        </tr>


      </tbody>
    </table>

    <div className="coupon-container" style={{border: coupon.fieldError ? "2px solid red" : null}}>
      <input type="text" placeholder="Coupon" className="coupon-input" onChange={handleCouponChange}  value={coupon.value}/>
      <span className="material-symbols-rounded coupon-icon">local_activity</span>
      {!coupon.valid != "" && <span className="invalid-coupon">invalid</span> }
      <button className="coupon-btn" onClick={() => verifyCoupon(coupon.value)}>APPLY</button>
    </div>

    <button id="proceedBtn">
                <span id="proceedBtnTitle" 
                    onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT
                    <span className="material-symbols-rounded">arrow_forward_ios</span>
                </span>
            </button>
</div>
};

export default CartBalance;
