import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

import "./Orders.css";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";

import {BACKEND_URL} from '../../constants/Constants'
import Breadcrumbs from "../Admin/Breadcrumbs/Breadcrumbs";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const params = useParams();

  const navigate = useNavigate();
    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
    const {clearMenuItemsState} = useContext(MenuContext)

  useEffect(() => {
    setActiveNavbarItem("ORDERS")
    if (params.source == "customer") {
      axios
        .get(
          `${BACKEND_URL}/api/v1/app/customer/${Cookies.get("userId")}/orders`,
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
        .get(`${BACKEND_URL}/api/v1/app/admin/orders`, {
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
    return `${String(new Date(date).getMonth()+1).padStart(2, '0')}/${String(new Date(date).getDate()).padStart(2, '0')}/${new Date(date).getFullYear()} - ${String(new Date(date).getHours()).padStart(2, '0')}:${String(new Date(date).getMinutes()).padStart(2, '0')}`
  }

  const showOrderDetails = (id) => {
    orders.map(order => {
        if(order.uuid == id){
            order.showDetails = !order.showDetails;
        }
    }) 
    
    setOrders([...orders])
  }

  return <div className='orders-outer-container'>
    <Breadcrumbs />
  {
  orders.map((order) => {
    
          return <div className='order-wrapper' key={order.uuid}>
              <div className='order-major-details'>
                  <div className='order-field'>{getFormmattedDate(order.creationDate)}</div>
                  <div className='order-field'>{getFormmattedDate(order.lastUpdateDate)}</div>
                  <div className='order-field'>{order.status}</div>
                  <div className='order-field'>
                      <span className="material-symbols-rounded" style={{border: "2px solid black", borderRadius: "5px", 
                      padding: "5px", cursor: "pointer"}} onClick={() => showOrderDetails(order.uuid)}>more_horiz</span>
                  </div>
              </div>

          {
              order.showDetails && <div className='order-minor-details'>
                <div className='item-detail'><span className="material-symbols-rounded">fingerprint</span><span>{order.uuid}</span></div>
                <div className='item-detail'><span className="material-symbols-rounded">paid</span><span>{order.paymentId}</span></div>
              <div className='item-detail'><span className="material-symbols-rounded">local_shipping</span><span>{order.deliveryFee}</span></div>
              <div className='item-detail'><span className="material-symbols-rounded">price_check</span><span>{order.tax}</span></div>
              <div className='item-detail'><span className="material-symbols-rounded">attach_money</span><span>{order.totalPrice}</span></div>

                {
                  order.items.map((item) => {
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
