import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";
import {BACKEND_URL} from '../../constants/Constants'
import { CartContext } from "../../context/Cart";

const Checkout = ({paymentId}) => {
  const stripe = useStripe();
  const elements = useElements();

  const {clearUserCookie} = useContext(GlobalStateContext);
      const {clearMenuItemsState} = useContext(MenuContext);
      const {clearCart} = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    console.log(paymentId)
  }, [])

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

  // Create the ConfirmationToken using the details collected by the Payment Element
  // and additional shipping information
  const {error, confirmationToken} = await stripe.createConfirmationToken({
    elements,
  });

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
      return;
    }

    let cartItems = []
    JSON.parse(localStorage.getItem("cartItems")).forEach((element) => {
      console.log(element)
      cartItems.push({"foodItemId": element.id, "quantity": element.quantity})
    })

    // Create the PaymentIntent
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/app/checkout/create-confirm-intent`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get("token")}`},
        body: JSON.stringify({
          confirmationTokenId: confirmationToken.id,
          cartItems: cartItems, 
          customerId: Cookies.get("userId"),
          coupon: localStorage.getItem("coupon")
        }),
      });
  
      const data = await res.json();
  
      if(res.status == 200){
        window.localStorage.removeItem("cartItems");
        clearCart();
        setLoading(false);
        navigate("/biteandsip/customer/orders");

      }
    } catch(err) {
      if(err.status == 401 || err.status == 403){
        clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
      }
    }

    // Handle any next actions or errors. See the Handle any next actions step for implementation.
    //handleServerResponse(data);
  };


  

  return (
    <div className="checkout-outer-container">
      <div className="checkout-inner-container">
        <div className="checkout-section">
          <div className="checkout-div-header">PAYMENT DETAILS</div>
          <PaymentElement />
        </div>

        <div className="checkout-section">
          <div className="checkout-div-header">SHIIPING ADDRESS</div>
          <AddressElement options={{ mode: "shipping" }} />
        </div>
      </div>

      <div className="checkout-btn-container">
        <button style={{cursor: loading ? 'not-allowed' : null}} className="checkout-btn" onClick={handleSubmit} disabled={!stripe || loading}>
          SUBMIT {loading && <i className="fa-solid fa-spinner fa-spin"></i>}
        </button>
        <button className="checkout-btn" onClick={() => navigate("/biteandsip/cart")} disabled={!stripe}>
          BACK TO CART
        </button>
      </div>
    </div>
  );
};

export default Checkout;
