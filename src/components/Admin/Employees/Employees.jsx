import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants/Constants";
import Cookies from 'js-cookie'
import TableDisplay from "./TableDisplay";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/app/admin/users/employees`, {headers: {"Authorization": `Bearer ${Cookies.get("token")}`}})
        .then((res) => {
            console.log(res.data.message)
            setEmployees(res.data.message)
        })
        .catch((err) => {
            console.log(err)
        })

        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth);
          });
    
        return window.removeEventListener("resize", () => {
          setWindowSize(window.innerWidth);
        });
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
                navigate("/biteandsip/login")
              }
          });
      };


    return <div className="employees-container">
        <div className="inner-employees-container">
        
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