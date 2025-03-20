import { useNavigate } from "react-router-dom";
import "./MiniMenu.css";
import { useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalState";

const MiniMenu = ({ showMiniMenu, windowSize, closeMiniMenu }) => {
    const { globalState, setActiveNavbarItem } = useContext(GlobalStateContext)
    const navigate = useNavigate()

  if (!showMiniMenu) return;

  return (
    <div className="mini-menu-wrapper">
        
        <span className="material-symbols-rounded" id="closeIcon" onClick={closeMiniMenu}>
          close
        </span>

        
          <ul className="mini-menu-items">
            <li onClick={() => {navigate("/biteandsip/home"); closeMiniMenu();}}>HOME</li>
            <li onClick={() => {navigate("/biteandsip/menu"); closeMiniMenu();}}>MENU</li>
            <li onClick={() => {navigate("/biteandsip/cart"); closeMiniMenu();}}>CART</li>
            <li>ABOUT</li>
            <li>CONTACT</li>

            {windowSize <= 800 && (
              <>
                <li onClick={() => {navigate("/biteandsip/login"); closeMiniMenu();}}>SIGN IN</li>
                <li onClick={() => {navigate("/biteandsip/register"); closeMiniMenu();}}>SIGN UP</li>
              </>
            )}
          </ul>
        

    </div>
  );
};

export default MiniMenu;
