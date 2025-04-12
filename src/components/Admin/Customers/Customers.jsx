import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants/Constants";
import Cookies from 'js-cookie'
import './Customers.css'
import TableDisplay from "./TableDisplay";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import { GlobalStateContext } from "../../../context/GlobalState";
import { MenuContext } from "../../../context/Menu";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useWindowSize } from "../../../hooks/useWindowSize";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate()

    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
        const {clearMenuItemsState} = useContext(MenuContext)

    const windowSize = useWindowSize();

    useEffect(() => {
      setActiveNavbarItem("CUSTOMERS")
        axios.get(`${BACKEND_URL}/api/v1/app/admin/users/customers`, {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
        .then((res) => {
            
            setCustomers(res.data.message)
        })
        .catch(err => {
          if(err.status == 401 || err.status == 403){
              clearUserCookie();
        clearMenuItemsState();
        navigate("/biteandsip/login");
          }
      });

    }, [])
    
      const handleSearchBarChange = () => {
        axios.post(
            `${BACKEND_URL}/api/v1/app/admin/users/customers/search`,
            { val: event.target.value },
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 200) {
              setCustomers(res.data.message);
            }
          })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
              clearMenuItemsState();
              navigate("/biteandsip/login");
              }
          });

          
      };


    return <div className="customers-container">
        

        <div className="inner-customers-container">
        <Breadcrumbs />
                <div className="main-actions-container">
                    <div className="search-field-container">
                    <input
                        type="text"
                        placeholder="Search Customers"
                        id="searchBarVal"
                        name="searchBarVal"
                        className="search-input"
                        onChange={handleSearchBarChange}
                    />
                </div>

            </div>

            {
                windowSize > 800 ?
                <TableDisplay data={customers}/> :
                <CardDisplay data={customers} /> 
            }
        </div>
    </div>


}

export default Customers;