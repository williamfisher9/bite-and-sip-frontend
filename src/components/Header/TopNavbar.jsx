import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalStateContext } from "../../context/GlobalState";

const TopNavbar = ({generalMenu, administrationMenu}) => {
    const navigate = useNavigate()
    const {globalState, setActiveNavbarItem} = useContext(GlobalStateContext)
    const [showAdminMenu, setShowAdminMenu] = useState(false);

    return <div className="navbar-container">
                        <ul className='navbar-menu'>
                            {
                                generalMenu.length != 0 && generalMenu.sort((a, b) => a.id - b.id).map((item, index) => {
                                    return <li key={index} className={globalState.activeNavbarItem == item.menuItem ? 'active-navbar' : ''} onClick={() => {navigate(`${item.menuItemLink}`); setActiveNavbarItem(item.menuItem);}}>{item.menuItem}</li>
                                })
                            }
    
                    {
                                administrationMenu.length != 0 && <li key="ADMINISTRATION" className="admin-menu"
                                onMouseOver={() => setShowAdminMenu(true)}
                                onMouseLeave={() => setShowAdminMenu(false)}>
                                        <span>ADMINISTRATION</span>
                                        <span className="material-symbols-rounded">stat_minus_1</span>
                                    

                    


                    {
                        showAdminMenu && <div className="admin-menu-container">
                            <ul>
                            {
                                administrationMenu.length != 0 && administrationMenu.sort((a, b) => a.id - b.id).map((item, index) => {
                                    return <li key={index} onClick={() => {navigate(`${item.menuItemLink}`); setActiveNavbarItem(item.menuItem);}}>{item.menuItem}</li>
                                })
                            }
                            </ul>
                        </div>
                    }


</li>

                }
                            
                            {
                                generalMenu == 0 && <>
                                <li className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate("/biteandsip/home"); setActiveNavbarItem("HOME")}}>HOME</li>
                            <li className={globalState.activeNavbarItem == "MENU" ? 'active-navbar' : ''} onClick={() => {navigate("/biteandsip/menu"); setActiveNavbarItem("MENU")}}>MENU</li>
                            <li className={globalState.activeNavbarItem == "ABOUT" ? 'active-navbar' : ''} onClick={() => setActiveNavbarItem("ABOUT")}>ABOUT</li>
                            <li className={globalState.activeNavbarItem == "CONTACT" ? 'active-navbar' : ''} onClick={() => setActiveNavbarItem("CONTACT")}>CONTACT</li>
                        
                                </>
                            }
                            
                            </ul>
                    </div>
}

export default TopNavbar