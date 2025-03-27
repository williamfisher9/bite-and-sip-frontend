import {
  AddressElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./Checkout.css";
import { useState } from "react";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");

  const submitPayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/biteandsip/cart/payment-status",
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      //setMessage(error.message);
      setErrorMsg(error.message);
      console.log(error.message);
    }

    //setIsLoading(false);
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
        <button className="checkout-btn" onClick={submitPayment}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Checkout;
