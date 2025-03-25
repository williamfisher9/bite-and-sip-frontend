import { useContext, useEffect, useState } from 'react';
import FoodCategory from '../FoodCategory/FoodCategory';
import FoodItem from '../FoodItem/FoodItem';
import './Menu.css'
import { GlobalStateContext } from '../../context/GlobalState';
import heroImg from '../../assets/dish.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const navigate = useNavigate();
    const {setActiveCategory} = useContext(GlobalStateContext);
    const [menu, setMenu] = useState({foodItems: [], foodCategories: []});
    
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/app/public/food-items")
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.message.foodItems)
            setMenu({foodItems: res.data.message.foodItems, foodCategories: res.data.message.categories});
          }
        })
          .catch((err) => {
            if (err.status == 401 || err.status == 403) {
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