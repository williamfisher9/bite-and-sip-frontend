import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import "./Orders.css";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";

import { BACKEND_URL } from "../../constants/Constants";
import Breadcrumbs from "../Admin/Breadcrumbs/Breadcrumbs";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const { clearUserCookie, setActiveNavbarItem } = useContext(GlobalStateContext);
  const { clearMenuItemsState } = useContext(MenuContext);

  useEffect(() => {
    setActiveNavbarItem("ORDERS");
    if(params.source != null && params.source != undefined){
      if (params.source == "customer") {
        axios
          .get(
            `${BACKEND_URL}/api/v1/app/customer/${Cookies.get("userId")}/orders`,
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            res.data.message.map((item) => {
              item.showDetails = false;
            });
            setOrders(res.data.message);
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
            }
          });
      }
  
      if (params.source == "admin") {
        axios
          .get(`${BACKEND_URL}/api/v1/app/admin/orders?customerId=0`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
          .then((res) => {
            res.data.message.map((item) => {
              item.showDetails = false;
            });
            
            setOrders(res.data.message);
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
            }
          });
      }
    } else if(searchParams.get("customer_id") != null){
      axios
          .get(`${BACKEND_URL}/api/v1/app/admin/orders?customerId=${searchParams.get("customer_id")}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
          .then((res) => {
            res.data.message.map((item) => {
              item.showDetails = false;
            });
            
            setOrders(res.data.message);
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
            }
          });
    }
  }, []);

  const getFormmattedDate = (date) => {
    return `${String(new Date(date).getMonth() + 1).padStart(2, "0")}/${String(
      new Date(date).getDate()
    ).padStart(2, "0")}/${new Date(date).getFullYear()} - ${String(
      new Date(date).getHours()
    ).padStart(2, "0")}:${String(new Date(date).getMinutes()).padStart(
      2,
      "0"
    )}`;
  };

  const showOrderDetails = (id) => {
    orders.map((order) => {
      if (order.uuid == id) {
        order.showDetails = !order.showDetails;
      }
    });

    setOrders([...orders]);
  };

  return (
    <div className="orders-outer-container">
      <div className='page-title'>ORDERS</div>

      {orders.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate)).map((order) => {
        return (
          <div className="order-items-container" key={order.uuid}>
            <div className="order-item-header">
              <div className="order-item-header-details">
                <span>{getFormmattedDate(order.creationDate)}</span>
                <span>{getFormmattedDate(order.lastUpdateDate)}</span>
                <span>{order.status}</span>
              </div>

              <span
                className="material-symbols-rounded more-info-btn"
                onClick={() => showOrderDetails(order.uuid)}
              >
                more_horiz
              </span>
            </div>

            {order.showDetails && (
              <div className="order-item-body">
                <div className="order-item-body-section">
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">
                      account_circle
                    </span>
                    <span>{order.customer.username}</span>
                  </div>
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">phone</span>
                    <span>{order.customer.phoneNumber}</span>
                  </div>
                </div>

                <div className="order-item-body-section">
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">
                      fingerprint
                    </span>
                    <span>{order.uuid}</span>
                  </div>
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">paid</span>
                    <span>{order.paymentId}</span>
                  </div>
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">
                      local_shipping
                    </span>
                    <span>{order.deliveryFee}</span>
                  </div>
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">
                      price_check
                    </span>
                    <span>{order.tax}</span>
                  </div>
                  <div className="order-item-detail">
                    <span className="material-symbols-rounded">
                      attach_money
                    </span>
                    <span>{order.totalPrice}</span>
                  </div>
                </div>

                <div className="order-item-body-section">
                  {order.items.map((item) => {
                    return (
                      <div className="menu-item" key={item.item.id}>
                        <div className="menu-item-img-wrapper">
                          <img
                            src={item.item.imageSource}
                            width={"100px"}
                            height={"100px"}
                          />
                        </div>
                        <div className="menu-item-details-container">
                          <div className="menu-item-detail">
                            <span className="material-symbols-rounded">
                              flatware
                            </span>
                            <span>{item.item.name}</span>
                          </div>
                          <div className="menu-item-detail">
                            <span className="material-symbols-rounded">
                              data_table
                            </span>
                            <span>{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
