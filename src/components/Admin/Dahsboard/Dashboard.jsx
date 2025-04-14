import { useContext, useEffect, useState } from 'react';
import './Dashboard.css'
import axios from 'axios';
import { BACKEND_URL } from '../../../constants/Constants';
import { MenuContext } from '../../../context/Menu';
import { GlobalStateContext } from '../../../context/GlobalState';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Dashboard = () => {
    const navigate = useNavigate();
    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
    const {clearMenuItemsState} = useContext(MenuContext)

    const [result, setResult] = useState({orders_count_by_status: null, sum_of_delivered_orders: null})

    useEffect(() => {
        setActiveNavbarItem("DASHBOARD")

        axios.get(`${BACKEND_URL}/api/v1/app/admin/dashboard`, {headers: { Authorization: `Bearer ${Cookies.get("token")}`}})
        .then((res) => {
            console.log(res.data.message)
            setResult(res.data.message)
        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
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
                console.log(res.data.message);
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

        
    }, [])

    return <div className="dashboard-outer-container">
            {
                result.orders_count_by_status != null ?
                <div className='orders-count-by-status'>
                    <div className='orders-count-by-status-item'>
                                <p className='title'>ORDERS COUNT BY STATUS</p>
                            </div>
                    {
                        result.orders_count_by_status.map((item, index) => {
                            return <div className='orders-count-by-status-item' key={index}>
                                <p className='item-title'>{item[0]}</p>
                                <p className='item-value'>{item[1]}</p>
                            </div>
                        })
                    }
                </div> 
                :
                null
            }
        
            {
                result.sum_of_delivered_orders != null ?
                <div className='orders-count-by-status'>
                    <div className='orders-count-by-status-item'>
                                <p className='title'>DELIVERED ORDERS TOTAL AMOUNT</p>
                            </div>
                            <div className='orders-count-by-status-item'>
                                <p className='item-title'>Total Amount</p>
                                <p className='item-value'>${result.sum_of_delivered_orders}</p>
                            </div>
                </div> 
                :
                null
            }
    </div>
}

export default Dashboard;