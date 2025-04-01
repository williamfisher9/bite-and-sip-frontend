import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../context/Cart";
import { BACKEND_URL } from "../../constants/Constants";

const stripePromise = loadStripe("pk_test_vQ0CV2X17zmN8JrxbFe2tFA700r1RB4mIm");

const StripeCheckout = () => {
    const navigate = useNavigate()
    const [paymentIntentDetails, setPaymentIntentDetails] = useState({clientSecret: "", paymentId: ""})
    const {getCartTotal, getCartItemsCount} = useContext(CartContext);

    const appearance = {
      theme: 'flat',
    };

    const options = {
      mode: 'payment',
      amount: 1099,
      currency: 'usd',
      paymentMethodCreation: 'manual',
        appearance
      };

      const calculateOrderAmount = () => {
        return ((getCartTotal() * 5 / 100 + getCartTotal() + 5).toFixed(2)) * 100
      }

    /*useEffect(() => {
        axios
          .post(
            `${BACKEND_URL}/api/v1/app/checkout/create-payment-intent`,
            JSON.stringify({amount: calculateOrderAmount()}),
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get("token")}`}}
          )
          .then((res) => {
            setPaymentIntentDetails({clientSecret: res.data.message.clientSecret, paymentId: res.data.message.paymentId})
          })
          .catch((err) => {
            if(err.status == 401 || err.status == 403){
              clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
            } else {
              console.log(err)
            }
          });
      }, []);*/

      return <Elements options={options} stripe={stripePromise}>
            <Checkout paymentId={"paymentIntentDetails.paymentId"} />
        </Elements>
    

}

export default StripeCheckout