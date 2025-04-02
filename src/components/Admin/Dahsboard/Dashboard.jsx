import { useContext, useEffect } from 'react';
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

    useEffect(() => {
        setActiveNavbarItem("DASHBOARD")
        axios.get(`${BACKEND_URL}/api/v1/app/admin/dashboard`, {headers: { Authorization: `Bearer ${Cookies.get("token")}`}})
        .then((res) => {

        })
        .catch(err => {
            if(err.status == 401 || err.status == 403){
                clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
            }
        });
    }, [])

    return <div className="dashboard-outer-container">

    </div>
}

export default Dashboard;