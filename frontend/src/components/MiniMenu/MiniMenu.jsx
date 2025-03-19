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
        
        <span class="material-symbols-rounded" id="closeIcon" onClick={closeMiniMenu}>
          close
        </span>

        
          <ul className="mini-menu-items">
            <li onClick={() => {navigate("/goodies/home"); closeMiniMenu();}}>HOME</li>
            <li onClick={() => {navigate("/goodies/menu"); closeMiniMenu();}}>MENU</li>
            <li>ABOUT</li>
            <li>CONTACT</li>

            {windowSize <= 800 && (
              <>
                <li>SIGN IN</li>
                <li>SIGN UP</li>
              </>
            )}
          </ul>
        

    </div>
  );
};

export default MiniMenu;
