import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CardDisplay from "./CardDisplay";
import TableDisplay from "./TableDisplay";

import "./FoodItems.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { BACKEND_URL } from "../../../constants/Constants";
import { GlobalStateContext } from "../../../context/GlobalState";
import { MenuContext } from "../../../context/Menu";

const FoodItems = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState({ foodItems: [], categories: [] });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const {clearUserCookie, setActiveNavbarItem} = useContext(GlobalStateContext);
      const {clearMenuItemsState} = useContext(MenuContext)

  useEffect(() => {
    

    axios
      .get(`${BACKEND_URL}/api/v1/app/admin/food-items`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((res) => {
        if (res.status == 200) {
          setMenu({
            foodItems: res.data.message.foodItems,
            foodCategories: res.data.message.categories,
          });
        }
      })
      .catch((err) => {
        if (err.status == 401 || err.status == 403) {
          clearUserCookie();
          clearMenuItemsState();
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

  const handleSearchBarChange = () => {
    axios
      .post(
        `${BACKEND_URL}/api/v1/app/admin/food-items/search`,
        { val: event.target.value },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        if (res.status == 200) {
          setMenu({ ...menu, foodItems: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewFoodItem = () => {
    navigate(`/biteandsip/admin/food-items/new`);
  };

  return (
    <div className="main-container">
      <Breadcrumbs />

      <div className="main-actions-container">
        <div className="search-field-container">
          <input
            type="text"
            placeholder="Search Food Items"
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
        <CardDisplay
          foodItems={menu.foodItems}
          foodCategories={menu.categories}
        />
      ) : (
        <TableDisplay
          foodItems={menu.foodItems}
          foodCategories={menu.categories}
        />
      )}
    </div>
  );
};

export default FoodItems;
