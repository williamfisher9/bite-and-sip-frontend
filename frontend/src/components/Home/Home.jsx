import heroImg from "../../assets/dish.png";
import "./Home.css";
import FoodCategory from "../FoodCategory/FoodCategory";
import MenuItem from "../MenuItem/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context/GlobalState";

const Home = () => {
  const { setActiveCategory, setActiveNavbarItem } =
    useContext(GlobalStateContext);
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState(window.innerWidth)
      
          useEffect(() => {
            setActiveCategory("All Foods");

              window.addEventListener("resize", () => {
                  setWindowSize(window.innerWidth)
              })
      
              return window.removeEventListener("resize", () => {
                  setWindowSize(window.innerWidth)
              })
          }, [])

  return (
    <div className="">
        <div className="hero-section-container">
          <img src={heroImg} alt="hero-img" id="hero-img" style={{filter: "brightness(0.6)"}}/>
         
          
          <div className="hero-img-text">
            <p style={{ fontSize: "30px" }}>VIEW & ORDER YOUR FAVORITE FOOD</p>
            <p style={{ marginTop: "5px" }}>
              Our menu offers a diverse selection of delectable dishes, each crafted to perfection. Choose your favorite and prepare to be
              enchanted!
            </p>
            <p style={{ marginTop: "10px" }}></p>
            <div
              style={{
                marginTop: "20px",
                display: "inline-block",
                textDecoration: "none",
              }}
              className="view-menu-btn"
              onClick={() => {
                navigate("/goodies/menu");
                setActiveNavbarItem("MENU");
              }}
            >
              View Menu
            </div>
          </div>
        </div>

      <FoodCategory showMessage={true} />

      <MenuItem showMessage={true} />
    </div>
  );
};

export default Home;
