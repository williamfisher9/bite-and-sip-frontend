import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params.source == "customer") {
      axios
        .get(
          `http://localhost:8080/api/v1/app/customer/${Cookies.get(
            "userId"
          )}/orders`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          console.log(res);
          setOrders(res.data.message);
        });
    }

    if (params.source == "admin") {
      axios
        .get(`http://localhost:8080/api/v1/app/admin/orders`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          console.log(res);
          setOrders(res.data.message);
        });
    }
  }, []);

  return (
    <div className="orders-outer-container">
      {orders.map((order) => {
        return (
          <div className="order-item">
            <div className="order-item-header">
            <table>
                <tbody>
                  <tr>
                    <th>ORDER ID</th>
                    <td>{order.uuid}</td>
                  </tr>

                  <tr>
                    <th>ORDER DATE</th>
                    <td>{order.creationDate}</td>
                  </tr>

                  <tr>
                    <th>ORDER STATUS</th>
                    <td>{order.status}</td>
                  </tr>

                  </tbody>
                  </table>
            </div>

            <div className="order-item-details">
              <table>
                <tbody>
                  <tr>
                    <th>PAYMENT ID</th>
                    <td>{order.paymentId}</td>
                  </tr>
                  <tr>
                    <th>DELIVERY FEE</th>
                    <td>{order.deliveryFee}</td>
                  </tr>
                  <tr>
                    <th>TAX</th>
                    <td>{order.tax}</td>
                  </tr>
                  <tr>
                    <th>DELIVERY AMOUNT</th>
                    <td>{order.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
