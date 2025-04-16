import { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/Constants";
import { MenuContext } from "../../../context/Menu";
import { GlobalStateContext } from "../../../context/GlobalState";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BsCashCoin } from "react-icons/bs";
import { PiMaskHappyLight } from "react-icons/pi";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TfiArrowTopRight } from "react-icons/tfi";
import { RiEBike2Line } from "react-icons/ri";

const Dashboard = () => {
  const navigate = useNavigate();
  const { clearUserCookie, setActiveNavbarItem } =
    useContext(GlobalStateContext);
  const { clearMenuItemsState } = useContext(MenuContext);

  const [result, setResult] = useState({
    orders_count_by_status: null,
    sum_of_delivered_orders: null,
  });

  useEffect(() => {
    setActiveNavbarItem("DASHBOARD");

    axios
      .get(`${BACKEND_URL}/api/v1/app/admin/dashboard`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        console.log(res.data.message)
        setResult(res.data.message);
      })
      .catch((err) => {
        if (err.status == 401 || err.status == 403) {
          clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
        }
      });

    const interval = setInterval(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/app/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        })
        .then((res) => {
          setResult(res.data.message);
        })
        .catch((err) => {
          if (err.status == 401 || err.status == 403) {
            clearUserCookie();
            clearMenuItemsState();
            navigate("/biteandsip/login");
          }
        });
    }, parseInt(JSON.parse(Cookies.get("dashboardRefreshInterval")) * 1000));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-outer-container">
       <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Total Revenue</p>
            <p className="sub-title">Last 30 days</p>
          </div>

          <div className="dashboard-item-icon">
            <BsCashCoin size={45} color="green"/>
          </div>
        </div>
        <div className="dashboard-item">
          <p className="item-value">
            ${result.sum_of_delivered_orders != null ? result.sum_of_delivered_orders : 0}
          </p>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Total Customers</p>
            <p className="sub-title">Number of online customers</p>
          </div>

          <div className="dashboard-item-icon">
            <PiMaskHappyLight size={45} color="purple" />
          </div>
        </div>
        <div className="dashboard-item">
          <p className="item-value">
            {result.total_customer != null ? result.total_customer : 0}
          </p>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Pending Orders</p>
            <p className="sub-title">Today's pending orders</p>
          </div>

          <div className="dashboard-item-icon">
            <IoMdTime size={45} color='red' />
          </div>
        </div>
        <div className="dashboard-item-with-sub-items">
          <p className="item-value">
            {result.orders_count_pending_kitchen != null ? result.orders_count_pending_kitchen : 0}
          </p>
          <div style={{width: '100%'}}>
                <div className="sub-item-value">
                    <span className="sub-item-value-name">Received</span>
                    <span className="sub-item-value-value">{result.orders_count_pending_received}</span>
                </div>
                <div className="sub-item-value">
                    <span className="sub-item-value-name">Accepted</span>
                    <span className="sub-item-value-value">{result.orders_count_pending_accepted}</span>
                </div>
                <div className="sub-item-value">
                    <span className="sub-item-value-name">Preparing</span>
                    <span className="sub-item-value-value">{result.orders_count_pending_preparing}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Pending Delivery</p>
            <p className="sub-title">Today's pending orders</p>
          </div>

          <div className="dashboard-item-icon">
            <RiEBike2Line size={45} color='green' />
          </div>
        </div>
        <div className="dashboard-item-with-sub-items">
          <p className="item-value">
            {result.orders_count_pending_delivery != null ? result.orders_count_pending_delivery : 0}
          </p>
          <div style={{width: '100%'}}>
                <div className="sub-item-value">
                    <span className="sub-item-value-name">Ready for Delivery</span>
                    <span className="sub-item-value-value">{result.orders_count_pending_delivery_ready_for_delivery}</span>
                </div>
                <div className="sub-item-value">
                    <span className="sub-item-value-name">On The Way</span>
                    <span className="sub-item-value-value">{result.orders_count_pending_delivery_on_the_way}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Completed Orders</p>
            <p className="sub-title">Last 30 days</p>
          </div>

          <div className="dashboard-item-icon">
            <GoChecklist size={45} color="green"/>
          </div>
        </div>
        <div className="dashboard-item">
          <p className="item-value">
            {result.orders_count_delivered != null ? result.orders_count_delivered : 0}
          </p>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Cancelled Orders</p>
            <p className="sub-title">Last 30 days</p>
          </div>

          <div className="dashboard-item-icon">
            <TbShoppingCartCancel size={45} color="brown" />
          </div>
        </div>
        <div className="dashboard-item">
          <p className="item-value">
            {result.orders_count_cancelled != null ? result.orders_count_cancelled : 0}
          </p>
        </div>
      </div>

      <div className="dashboard-item-container">
        <div className="dashboard-item">
          <div className="title">
            <p className="main-title">Top Selling Items</p>
            <p className="sub-title">Last 30 days</p>
          </div>

          <div className="dashboard-item-icon">
            <TfiArrowTopRight size={45} color="green"/>
          </div>
        </div>
        <div style={{width: '100%'}}>
                {result.top_selling_items != null ?
                    result.top_selling_items.map((item, index) => {
                        return <div className="sub-item-value" key={index}>
                    <span className="sub-item-value-name">{item[1]}</span>
                    <span className="sub-item-value-value">{item[2]}</span>
                </div>
                        
                    })
                :
                null   }     
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
