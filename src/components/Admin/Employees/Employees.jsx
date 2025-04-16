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
    const [employees, setEmployees] =  useState({employees: [], paginationData: null});
    const navigate = useNavigate()
    const windowSize = useWindowSize();

    const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
        const {clearMenuItemsState} = useContext(MenuContext);



        const [searchBarVal, setSearchBarVal] = useState("");
        const [selectedPageSize, setSelectedPageSize] = useState(window.innerWidth < 800 ? 1000 : 5);
      
            useEffect(() => {
              setActiveNavbarItem("EMPLOYEES");
              loadData();
            }, []);
            
              const loadData = (
                pageNumber = 0,
                pageSize = selectedPageSize,
                searchVal = ""
              ) => {
                axios
                  .get(
                    `${BACKEND_URL}/api/v1/app/admin/users/employees?page_number=${pageNumber}&page_size=${pageSize}&search_val=${searchVal}`,
                    { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
                  )
                  .then((res) => {
                    if (res.status == 200) {
                      setEmployees({
                        employees: res.data.message.content,
                        paginationData: {
                          number: res.data.message.number,
                          empty: res.data.message.empty,
                          first: res.data.message.first,
                          last: res.data.message.last,
                          numberOfElements: res.data.message.numberOfElements,
                          size: res.data.message.size,
                          totalElements: res.data.message.totalElements,
                          totalPages: res.data.message.totalPages,
                        },
                      });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    if (err.status == 401 || err.status == 403) {
                    clearUserCookie();
                    clearMenuItemsState();
                    navigate("/biteandsip/login");
                  }
                  });
              };
            
              const handleSearchBarChange = () => {
                setSearchBarVal(event.target.value)
                loadData(0, selectedPageSize, event.target.value)
              }
          
              const loadPage = (pageNum, pageSize) => {
                loadData(pageNum, pageSize, searchBarVal)
              }
            
              const updateSelectedPageSize = (pageSize) => {
                setSelectedPageSize(pageSize)
              }


    const addNewEmployee = () => {
        navigate(`/biteandsip/admin/employees/new`);
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
          employees.paginationData != null && <TableDisplay data={employees.employees}
                paginationData={employees.paginationData}
                loadPage={loadPage}
                updateSelectedPageSize={updateSelectedPageSize}/> :
          <CardDisplay data={employees.employees} /> 
        }
      </div>

    </div>

}

export default Employees;