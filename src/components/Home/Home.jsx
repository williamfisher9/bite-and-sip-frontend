import heroImg from "../../assets/dish.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../context/GlobalState";
import Menu from "../Menu/Menu";
import FormButton from "../FormButton/FormButton";

const Home = () => {
  const { setActiveCategory, setActiveNavbarItem } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveCategory("ALL");
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section-container">
        <img src={heroImg} alt="hero-img" id="hero-img" />

        <div className="hero-img-text">
          <p className="main-text">VIEW & ORDER YOUR FAVORITE FOOD</p>
          <p className="sub-text">
            Our menu offers a diverse selection of delectable dishes, each
            crafted to perfection.
          </p>
          <p className="sub-text">
            Choose your favorite and prepare to be enchanted!
          </p>

          <div className="view-menu-container">
          <FormButton handleRequest={() => { navigate("/biteandsip/menu"); setActiveNavbarItem("MENU"); }} customStyles={{width: "150px"
            , boxShadow: "2px 2px 4px #fff, -2px -2px 4px #fff, -2px 2px 4px #fff, 2px -2px 4px #fff"}}>
                <span>View Menu</span>
          </FormButton>
          </div>
          
          
        </div>
      </div>


      
      <Menu />

    </div>
  );
};

export default Home;
