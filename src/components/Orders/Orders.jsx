import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import "./Orders.css";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();

  const navigate = useNavigate();
    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
    const {clearMenuItemsState} = useContext(MenuContext)

  useEffect(() => {
    setActiveNavbarItem("MY ORDERS")
    if (params.source == "customer") {
      axios
        .get(
          `http://localhost:8080/api/v1/app/customer/${Cookies.get("userId")}/orders`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          res.data.message.map(item => {
            item.showDetails = false;
          })
          setOrders(res.data.message);
        })
        .catch(err => {
          if(err.status == 401 || err.status == 403){
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
          }
      });
    }

    if (params.source == "admin") {
      axios
        .get(`http://localhost:8080/api/v1/app/admin/orders`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        })
        .then((res) => {
          
          res.data.message.map(item => {
            item.showDetails = false;
          })
          setOrders(res.data.message);
        });
    }
  }, []);

  const getFormmattedDate = (date) => {
    return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} - ${String(new Date(date).getHours()).padStart(2, '0')}:${String(new Date(date).getMinutes()).padStart(2, '0')}`
  }

  /*return (
    <div className="orders-outer-container">
      {orders.map((order) => {
        return (
          <div className="order-item" key={order.uuid}>
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
  );*/




  const showOrderDetails = (id) => {
    orders.map(order => {
        if(order.uuid == id){
            order.showDetails = !order.showDetails;
        }
    }) 
    
    setOrders([...orders])
  }

  return <div className='orders-outer-container'>
  {
  orders.map((order) => {
    
          return <div className='order-wrapper' key={order.uuid}>
              <div className='order-major-details'>
                  <div className='order-field'>{getFormmattedDate(order.creationDate)}</div>
                  <div className='order-field'>{getFormmattedDate(order.lastUpdateDate)}</div>
                  <div className='order-field'>{order.paymentId}</div>
                  <div className='order-field'>{order.status}</div>
                  <div className='order-field'>
                      <span className="material-symbols-rounded" style={{border: "2px solid black", borderRadius: "5px", 
                      padding: "5px", cursor: "pointer"}} onClick={() => showOrderDetails(order.uuid)}>more_horiz</span>
                  </div>
              </div>

          {
              order.showDetails && <div className='order-minor-details'>
              <div className='item-detail'><span className="material-symbols-rounded">local_shipping</span><span>{order.deliveryFee}</span></div>
              <div className='item-detail'><span className="material-symbols-rounded">price_check</span><span>{order.tax}</span></div>
              <div className='item-detail'><span className="material-symbols-rounded">attach_money</span><span>{order.totalPrice}</span></div>
              {
                  order.items.map((item) => {
                    console.log(item.item.imageSource)
                      return <div className='order-item-details' key={item.item.id}>
                          <div className='item-container'>
                              <img src={item.item.imageSource} width={"100px"} height={"100px"} />
                          </div>
                          <div>
                          <div className='item-detail'>
                              <span className="material-symbols-rounded">flatware</span>
                              <span>{item.item.name}</span>
                          </div>
                          <div className='item-detail'><span className="material-symbols-rounded">data_table</span><span>{item.quantity}</span></div>
                          </div>
                      </div>
                  })
              }
          </div>
          }
      </div>
  })
  }
</div>
};

export default Orders;
