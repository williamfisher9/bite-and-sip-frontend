import { useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import { useContext } from "react";
import { GlobalStateContext } from "../../context/GlobalState";
import { MenuContext } from "../../context/Menu";
import Cookies from 'js-cookie';

const SideNavbar = ({ showSideMenu, closeSideMenu }) => {
    const { globalState, clearUserCookie } = useContext(GlobalStateContext)
    const {menuItemsState, clearMenuItemsState} = useContext(MenuContext)

    const navigate = useNavigate()

  if (!showSideMenu) return;

  return (
    <div className="mini-menu-wrapper">
        
        <span className="material-symbols-rounded" id="closeIcon" onClick={closeSideMenu}>
          close
        </span>

        
          <ul className="mini-menu-items">

            {

              menuItemsState.length > 0 ? menuItemsState.sort((a, b) => a.id - b.id).map((item) => {
                return <li key={item.id} className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate(`${item.menuItemLink}`);  closeSideMenu();}}>{item.menuItem}</li>
              })
              
              :
              
              <>
                  <li onClick={() => {navigate("/biteandsip/home");  closeSideMenu();}}>HOME</li>
                  <li onClick={() => {navigate("/biteandsip/menu");  closeSideMenu();}}>MENU</li>
                  <li onClick={() => {navigate("/biteandsip/about");  closeSideMenu();}}>ABOUT</li>
                  <li onClick={() => {navigate("/biteandsip/contact");  closeSideMenu();}}>CONTACT</li>
              </>


            }

            {
              !Cookies.get("isAuthenticated") ? <>
              <li onClick={() => {clearUserCookie();
          clearMenuItemsState();
          navigate("/biteandsip/login"); closeSideMenu();}}>SIGN IN</li>
              <li onClick={() => {navigate("/biteandsip/register"); closeSideMenu();}}>SIGN UP</li>
            </>
            :
            <li onClick={() => { navigate("/biteandsip/home"); 
              closeSideMenu(); 
              clearUserCookie(); 
              clearMenuItemsState();
            }}>SIGN OUT</li>
            }
            
          </ul>
        

    </div>
  );
};

export default SideNavbar;
