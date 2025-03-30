import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import TableDisplay from "./TableDisplay";

import './Coupons.css'
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BACKEND_URL } from "../../../constants/Constants";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/app/admin/coupons`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.message)
          setCoupons(res.data.message);
        }
      })
      .catch((err) => {
        if (err.status == 401 || err.status == 403) {
          navigate("/biteandsip/login");
        }
      });



      window.addEventListener("resize", () => {
        setWindowSize(window.innerWidth);
      });

    return window.removeEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  const addNewFoodItem = () => {
    navigate(`/biteandsip/admin/coupons/new`);
  };

  const handleSearchBarChange = () => {
    axios.post(
        `${BACKEND_URL}/api/v1/app/admin/coupons/search`,
        { val: event.target.value },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        if (res.status == 200) {
          setCoupons(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <TableDisplay coupons={coupons} />
      )}
    </div>
  );
};

export default Coupons;
