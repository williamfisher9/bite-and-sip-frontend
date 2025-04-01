import { useContext, useEffect, useState } from 'react';
import FoodCategory from './FoodCategory/FoodCategory'
import FoodItem from './FoodItem/FoodItem'
import './Menu.css'
import { GlobalStateContext } from '../../context/GlobalState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants/Constants';
import { MenuContext } from '../../context/Menu';

const Menu = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState({foodItems: [], foodCategories: []});

    const {clearUserCookie, setActiveCategory} = useContext(GlobalStateContext);
        const {clearMenuItemsState} = useContext(MenuContext)
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/app/public/food-items`)
        .then((res) => {
          if (res.status == 200) {
            setMenu({foodItems: res.data.message.foodItems, foodCategories: res.data.message.categories});
          }
        })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
              clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login");
            }
          });
    
        setActiveCategory("ALL");
      }, []);

    return <div className="menu-items-container">
        {
        menu.foodCategories.length > 0 && <FoodCategory foodCategories={menu.foodCategories} />
      }

      {
        menu.foodItems.length > 0 && <FoodItem foodItems={menu.foodItems}  foodCategories={menu.foodCategories}/>
      }
    </div>
}

export default Menu;