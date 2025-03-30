import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import "./Orders.css";
import { GlobalStateContext } from "../../context/GlobalState";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();

  const { setActiveNavbarItem } = useContext(GlobalStateContext);

  useEffect(() => {
    setActiveNavbarItem("MY ORDERS")
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

  const getFormmattedDate = (date) => {
    return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} - ${String(new Date(date).getHours()).padStart(2, '0')}:${String(new Date(date).getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="orders-outer-container">
      {orders.map((order) => {
        return (
          <div className="order-item">
            <div className="order-item-header">
            <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <td>{order.uuid}</td>
                  </tr>

                  <tr>
                    <th>DATE</th>
                    <td>{getFormmattedDate(order.creationDate)}</td>
                  </tr>

                  <tr>
                    <th>LAST UPDATE</th>
                    <td>{getFormmattedDate(order.lastUpdateDate)}</td>
                  </tr>

                  <tr>
                    <th>STATUS</th>
                    <td><span className="order-item-status">{order.status}</span></td>
                  </tr>

                  <tr style={{height: "20px"}}>
                  <td colSpan={2}>
                    <hr />
                    </td>
                  </tr>

                  <tr>
                    <th>PAYMENT ID</th>
                    <td>{order.paymentId}</td>
                  </tr>

                  <tr>
                    <th>Customer Details</th>
                    <td>{order.customer.username} - {order.customer.firstName} {order.customer.lastName}</td>
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
                    <th>Total Price</th>
                    <td>{order.totalPrice}</td>
                  </tr>

                  </tbody>
                  </table>
            </div>

            <div className="order-item-details">
              <table>
                <tbody>
                  
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
