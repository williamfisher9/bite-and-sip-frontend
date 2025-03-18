import { CiSearch, CiShoppingBasket } from 'react-icons/ci';
import logoImg from '../../assets/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/Cart.jsx';
import { useContext } from 'react';
import Cart from '../Cart/Cart.jsx';
import { GlobalStateContext } from '../../context/GlobalState.jsx';

const Header = () => {
    const { globalState, setActiveNavbarItem } = useContext(GlobalStateContext)
    const navigate = useNavigate()

    return <div className='header-wrapper'>
        <div className="header-container">
        <div className="logo-wrapper">
            <Link to="/goodies/">
                <img src={logoImg} height="35px" alt='logo-img' />
            </Link>
        </div>

        <div className="navbar-container">
            <ul className='navbar-menu'>
                <li className={globalState.activeNavbarItem == "HOME" ? 'active-navbar' : ''} onClick={() => {navigate("/goodies/home"); setActiveNavbarItem("HOME")}}>HOME</li>
                <li className={globalState.activeNavbarItem == "MENU" ? 'active-navbar' : ''} onClick={() => {navigate("/goodies/menu"); setActiveNavbarItem("MENU")}}>MENU</li>
                <li className={globalState.activeNavbarItem == "ABOUT" ? 'active-navbar' : ''} onClick={() => setActiveNavbarItem("ABOUT")}>ABOUT</li>
                <li className={globalState.activeNavbarItem == "CONTACT" ? 'active-navbar' : ''} onClick={() => setActiveNavbarItem("CONTACT")}>CONTACT</li>
            </ul>
        </div>

        <div className="actions-container">
            
            <CiSearch className='icon'/>

            <Cart />

            {/*
                <div className='cart-container'>
                <CiShoppingBasket className='icon'/>
                <span id='cart-count'>{cartItems.length}</span>
            </div>
            */
            }

            <div className='btn'>
                <span>SIGN IN</span>
                <div className='first-q'></div>
                <div className='second-q'></div>
                <div className='third-q'></div>
                <div className='fourth-q'></div>
            </div>
            <div className='btn'>
                <span>SIGN UP</span>
                <div className='first-q'></div>
                <div className='second-q'></div>
                <div className='third-q'></div>
                <div className='fourth-q'></div>
            </div>
        </div>
    </div>
    </div>
}

export default Header;