import heroImg from "../../assets/dish.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../context/GlobalState";
import Menu from "../Menu/Menu";

const Home = () => {
  const { setActiveCategory, setActiveNavbarItem } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {


    setActiveCategory("ALL");

    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });

    return window.removeEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section-container">
        <img src={heroImg} alt="hero-img" id="hero-img" />

        <div className="hero-img-text">
          <p style={{ fontSize: "30px" }}>VIEW & ORDER YOUR FAVORITE FOOD</p>
          <p style={{ marginTop: "5px" }}>
            Our menu offers a diverse selection of delectable dishes, each
            crafted to perfection.
          </p>
          <p style={{ marginTop: "5px" }}>
            Choose your favorite and prepare to be enchanted!
          </p>
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


      
      <Menu />

    </div>
  );
};

export default Home;
