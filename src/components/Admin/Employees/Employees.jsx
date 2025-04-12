import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants/Constants";
import Cookies from 'js-cookie'
import TableDisplay from "./TableDisplay";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import { GlobalStateContext } from "../../../context/GlobalState";
import { MenuContext } from "../../../context/Menu";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useWindowSize } from "../../../hooks/useWindowSize";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate()
    const windowSize = useWindowSize();

    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
        const {clearMenuItemsState} = useContext(MenuContext)

    useEffect(() => {
      setActiveNavbarItem("EMPLOYEES")
        axios.get(`${BACKEND_URL}/api/v1/app/admin/users/employees`, {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
        .then((res) => {
            
            setEmployees(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const addNewEmployee = () => {
        navigate(`/biteandsip/admin/employees/new`);
      };
    
      const handleSearchBarChange = () => {
        axios.post(
            `${BACKEND_URL}/api/v1/app/admin/users/employees/search`,
            { val: event.target.value },
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 200) {
              setEmployees(res.data.message);
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


    return <div className="employees-container">
      
      <div className="inner-employees-container">

        <Breadcrumbs />
        
        <div className="main-actions-container">
            <div className="search-field-container">
            <input
                type="text"
                placeholder="Search Employees"
                id="searchBarVal"
                name="searchBarVal"
                className="search-input"
                onChange={handleSearchBarChange}
            />
            </div>

            <button onClick={addNewEmployee} className="add-action-container">
            <span className="material-symbols-rounded">add</span>
            </button>
        </div>

        {
                windowSize > 800 ?
                <TableDisplay data={employees}/> :
                <CardDisplay data={employees} /> 
            }
      </div>

    </div>

}

export default Employees;