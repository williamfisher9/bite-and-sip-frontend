import { CiSearch } from 'react-icons/ci';
import logoImg from '../../assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Cart from '../Cart/Cart.jsx';
import { GlobalStateContext } from '../../context/GlobalState.jsx';
import MiniMenu from '../MiniMenu/MiniMenu.jsx';
import Cookies from 'js-cookie';
import { MenuContext } from '../../context/Menu.jsx';

const Header = () => {
    const { globalState, setActiveNavbarItem } = useContext(GlobalStateContext)
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [showMiniMenu, setShowMiniMenu] = useState(false)
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const {menuItemsState, clearMenuItemsState, updateMenuItemsState} = useContext(MenuContext);
    const [administrationMenu, setAdministrationMenu] = useState([])
    const [generalMenu, setGeneralMenu] = useState([])

    
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })

        return window.removeEventListener("resize", () => {
            setWindowSize(window.innerWidth)
        })
    }, [])

    useEffect(() => {
        let general = [];
        let admin = [];

        menuItemsState.forEach(element => {
            if(element.mainMenu == "PUBLIC" || element.mainMenu == "PRIVATE"){
                general.push(element)
            } else {
                admin.push(element)
            }
        });


       
        setGeneralMenu(general)
        setAdministrationMenu(admin)
    }, [menuItemsState])


    return <div className='header-wrapper'>
            <div className="header-container">
                <div className="logo-wrapper">
                    <Link to="/biteandsip/">
                        <img src={logoImg} height="35px" alt='logo-img' />
                    </Link>
                </div>

        

            {
                windowSize > 1200 && <div className="navbar-container">
                    <ul className='navbar-menu'>
                        {
                            generalMenu.length != 0 && generalMenu.map((item, index) => {
                                return <li key={index} className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate(`${item.menuItemLink}/${Cookies.get("userId")}`); setActiveNavbarItem("HOME")}}>{item.menuItem}</li>
                            })
                        }

{
                            administrationMenu.length != 0 && <div className='admin-div' style={{position: "relative"}} onMouseOver={() => setShowAdminMenu(true)} onMouseLeave={() => setShowAdminMenu(false)}>

                                <li key="ADMINISTRATION" className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} style={{display: "flex", justifyContent: "center", alignItems: "center"}} 
                                    >ADMINISTRATION <span className="material-symbols-rounded">stat_minus_1</span></li>


                {
                    showAdminMenu && <div className="admin-menu-container">
                    <ul>
                    {
                        administrationMenu.length != 0 && administrationMenu.map((item, index) => {
                            return <li key={index} className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate(`${item.menuItemLink}`); setActiveNavbarItem("HOME")}}>{item.menuItem}</li>
                        })
                    }
                    </ul>
                </div>
                }


                            </div>

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

        <div className="actions-container">
            
            <CiSearch className='icon'/>

            <Cart windowSize={windowSize} />

            {
                windowSize >= 1200 ? 
                (
                    !Cookies.get("isAuthenticated") ? 
                    <>
                        <div className='btn' onClick={() => {navigate("/biteandsip/login"); setActiveNavbarItem("LOGIN");}}>
                        <span>SIGN IN</span>
                        <div className='first-q'></div>
                        <div className='second-q'></div>
                        <div className='third-q'></div>
                        <div className='fourth-q'></div>
                    </div>
                    <div className='btn' onClick={() => {navigate("/biteandsip/register"); setActiveNavbarItem("REGISTER");}}>
                        <span>SIGN UP</span>
                        <div className='first-q'></div>
                        <div className='second-q'></div>
                        <div className='third-q'></div>
                        <div className='fourth-q'></div>
                    </div>
                </>
                :
                    <div className='btn' onClick={() => {navigate("/biteandsip/home"); Cookies.remove('isAuthenticated'); 
                                Cookies.remove('userId');
                                Cookies.remove('token');
                                Cookies.remove('menuItems');
                                Cookies.remove('authorityId');
                                Cookies.remove('username'); clearMenuItemsState()}}>
                        <span>SIGN OUT</span>
                        <div className='first-q'></div>
                        <div className='second-q'></div>
                        <div className='third-q'></div>
                        <div className='fourth-q'></div>
                    </div>
                )
                

                :

                null
            }

            {
                windowSize <= 1200 && <span className="material-symbols-rounded" onClick={() => setShowMiniMenu(prev => !prev)}
                style={{color: "#7963c0", cursor: "pointer", fontSize: "30px"}}>menu</span>
            }

            <MiniMenu showMiniMenu={showMiniMenu} windowSize={windowSize} closeMiniMenu={() => setShowMiniMenu(false)}/>
        
            </div>
        </div>
    </div>
}

export default Header;