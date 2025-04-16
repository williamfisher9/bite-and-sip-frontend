import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import TableDisplay from "./TableDisplay";

import './Coupons.css'
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BACKEND_URL } from "../../../constants/Constants";
import { GlobalStateContext } from "../../../context/GlobalState";
import { MenuContext } from "../../../context/Menu";
import { useWindowSize } from "../../../hooks/useWindowSize";

const Coupons = () => {
  const [coupons, setCoupons] = useState({coupons: [], paginationData: null});
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
  const {clearMenuItemsState} = useContext(MenuContext);

  const [searchBarVal, setSearchBarVal] = useState("");
  const [selectedPageSize, setSelectedPageSize] = useState(window.innerWidth < 800 ? 1000 : 5);

  const addNewFoodItem = () => {
    navigate(`/biteandsip/admin/coupons/new`);
  };

  useEffect(() => {
    setActiveNavbarItem("COUPONS");
    loadData();
  }, []);
  
    const loadData = (
      pageNumber = 0,
      pageSize = selectedPageSize,
      searchVal = ""
    ) => {
      axios
        .get(
          `${BACKEND_URL}/api/v1/app/admin/coupons?page_number=${pageNumber}&page_size=${pageSize}&search_val=${searchVal}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        )
        .then((res) => {
          if (res.status == 200) {
            setCoupons({
              coupons: res.data.message.content,
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

  return (
    <div className="main-container">
      <Breadcrumbs />

      <div className="main-actions-container">
        <div className="search-field-container">
          <input
            type="text"
            placeholder="Search Coupons"
            id="searchBarVal"
            name="searchBarVal"
            className="search-input"
            onChange={handleSearchBarChange}
          />
        </div>

        <button onClick={addNewFoodItem} className="add-action-container">
          <span className="material-symbols-rounded">add</span>
        </button>
      </div>

      {windowSize < 800 ? (
        <CardDisplay coupons={coupons} />
      ) : (
        coupons.paginationData != null && <TableDisplay coupons={coupons.coupons}
                paginationData={coupons.paginationData}
                loadPage={loadPage}
                updateSelectedPageSize={updateSelectedPageSize}/>

      )}
    </div>
  );
};

export default Coupons;
