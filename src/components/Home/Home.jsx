import heroImg from "../../assets/dish.png";
import "./Home.css";
import FoodCategory from "../FoodCategory/FoodCategory";
import FoodItem from "../FoodItem/FoodItem";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context/GlobalState";
import axios from "axios";

const Home = () => {
  const { setActiveCategory, setActiveNavbarItem } = useContext(GlobalStateContext);
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState(window.innerWidth)
      
  useEffect(() => {
    

    axios.get("http://localhost:8080/api/v1/app/public/food-categories")
    .then((res) => {
      if(res.status == 200){
        let foodItemsList = []
        res.data.message.forEach(element => {
          element.items.forEach((item) => {
            item.category = element.name;
            foodItemsList.push(item);
          })
        });
        setFoodItems(foodItemsList)
        setFoodCategories(res.data.message)
      }
        
    })
    .catch(err => {
      console.log(err)
    })

    setActiveCategory("All Foods");

    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth)
  })

  return window.removeEventListener("resize", () => {
      setWindowSize(window.innerWidth)
  })
  }, [])

  return (
    <div className="home-container">
        <div className="hero-section-container">
          <img src={heroImg} alt="hero-img" id="hero-img" />
         
          
          <div className="hero-img-text">
            <p style={{ fontSize: "30px" }}>VIEW & ORDER YOUR FAVORITE FOOD</p>
            <p style={{ marginTop: "5px" }}>
              Our menu offers a diverse selection of delectable dishes, each crafted to perfection. 
            </p>
            <p style={{ marginTop: "5px" }}>Choose your favorite and prepare to be
            enchanted!</p>
            <div
              style={{
                marginTop: "20px",
                display: "inline-block",
                textDecoration: "none",
              }}
              className="view-menu-btn"
              onClick={() => {
                navigate("/biteandsip/menu");
                setActiveNavbarItem("MENU");
              }}
            >
              View Menu
            </div>
          </div>
        </div>

      <FoodCategory showMessage={true} foodCategories={foodCategories}/>

      {
        foodItems.length > 0 && <FoodItem showMessage={true} foodItems={foodItems}/>
      }
    </div>
  );
};

export default Home;
