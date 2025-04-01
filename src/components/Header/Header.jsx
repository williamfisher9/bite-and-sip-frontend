import { CiSearch } from 'react-icons/ci';
import logoImg from '../../assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon.jsx';
import { GlobalStateContext } from '../../context/GlobalState.jsx';
import Cookies from 'js-cookie';
import { MenuContext } from '../../context/Menu.jsx';
import TopNavbar from './TopNavbar.jsx';
import SideNavbar from './SideNavbar.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const Header = () => {
    const { setActiveNavbarItem, clearUserCookie } = useContext(GlobalStateContext)
    const navigate = useNavigate()
    const [windowSize, setWindowSize] = useState(window.innerWidth)
    const [showSideMenu, setShowSideMenu] = useState(false)
    const {menuItemsState, clearMenuItemsState} = useContext(MenuContext);
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
                windowSize > 1200 && <TopNavbar generalMenu={generalMenu} administrationMenu={administrationMenu} />
            }

        <div className="actions-container">
            
            <CiSearch className='icon'/>

            
                <CartIcon windowSize={windowSize} />
            
            {
                windowSize >= 1200 ? 
                (
                    !Cookies.get("isAuthenticated") ? 
                    <>
                        <div className='btn' onClick={() => {
                            clearUserCookie();
                            clearMenuItemsState();
                            navigate("/biteandsip/login");
                            setActiveNavbarItem("LOGIN");}}>
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
                    <div className='btn' onClick={() => {navigate("/biteandsip/home"); 
                        Cookies.remove('isAuthenticated'); 
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
                windowSize <= 1200 && <span className="material-symbols-rounded" onClick={() => setShowSideMenu(prev => !prev)}
                style={{color: "#7963c0", cursor: "pointer", fontSize: "30px"}}>menu</span>
            }

            <SideNavbar showSideMenu={showSideMenu} windowSize={windowSize} closeSideMenu={() => setShowSideMenu(false)}/>
        
            </div>
        </div>
    </div>
}

export default Header;