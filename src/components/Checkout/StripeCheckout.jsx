import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../../context/Cart";

const stripePromise = loadStripe("");

const StripeCheckout = () => {
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState("");
    const {getCartTotal, getCartItemsCount} = useContext(CartContext);

    const options = {
        clientSecret
      };

      const calculateOrderAmount = () => {
        return ((getCartTotal() * 5 / 100 + getCartTotal() + 5).toFixed(2)) * 100
      }

    useEffect(() => {
        axios
          .post(
            "http://localhost:8080/api/v1/app/checkout/create-payment-intent",
            JSON.stringify({amount: calculateOrderAmount()}),
            { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${Cookies.get("token")}`}}
          )
          .then((res) => {
            setClientSecret(res.data.message);
          })
          .catch((err) => {
            if(err.status == 401 || err.status == 403){
              navigate("/biteandsip/login")
            } else {
              console.log(err)
            }
          });
      }, []);

      return clientSecret && <Elements options={options} stripe={stripePromise}>
            <Checkout />
        </Elements>
    

}

export default StripeCheckout