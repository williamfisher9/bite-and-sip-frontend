import { useNavigate } from "react-router-dom";
import "./MiniMenu.css";
import { useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";
import Cookies from 'js-cookie';

const MiniMenu = ({ showMiniMenu, closeMiniMenu }) => {
    const { globalState } = useContext(GlobalStateContext)
    const {menuItemsState, clearMenuItemsState} = useContext(MenuContext)

    const navigate = useNavigate()

  if (!showMiniMenu) return;

  return (
    <div className="mini-menu-wrapper">
        
        <span className="material-symbols-rounded" id="closeIcon" onClick={closeMiniMenu}>
          close
        </span>

        
          <ul className="mini-menu-items">

            {

              menuItemsState.length > 0 ? menuItemsState.sort((a, b) => a.id - b.id).map((item) => {
                return <li key={item.id} className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate(`${item.menuItemLink}`);  closeMiniMenu();}}>{item.menuItem}</li>
              })
              
              :
              
              <>
                  <li onClick={() => {navigate("/biteandsip/home");  closeMiniMenu();}}>HOME</li>
                  <li onClick={() => {navigate("/biteandsip/menu");  closeMiniMenu();}}>MENU</li>
                  <li onClick={() => {navigate("/biteandsip/about");  closeMiniMenu();}}>ABOUT</li>
                  <li onClick={() => {navigate("/biteandsip/contact");  closeMiniMenu();}}>CONTACT</li>
              </>


            }

            {
              !Cookies.get("isAuthenticated") ? <>
              <li onClick={() => {navigate("/biteandsip/login"); closeMiniMenu();}}>SIGN IN</li>
              <li onClick={() => {navigate("/biteandsip/register"); closeMiniMenu();}}>SIGN UP</li>
            </>
            :
            <li onClick={() => {navigate("/biteandsip/home"); closeMiniMenu(); Cookies.remove('isAuthenticated'); 
              Cookies.remove('userId');
              Cookies.remove('token');
              Cookies.remove('menuItems');
              Cookies.remove('authorityId');
              Cookies.remove('username'); clearMenuItemsState();
            }}>SIGN OUT</li>
            }
            
          </ul>
        

    </div>
  );
};

export default MiniMenu;
