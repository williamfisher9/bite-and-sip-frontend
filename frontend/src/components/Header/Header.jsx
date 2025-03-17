import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import logoImg from '../../assets/logo.png'
import './Header.css'
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
    return <div className='header-wrapper'>
        <div className="header-container">
        <div className="logo-wrapper">
            <Link to="/goodies/">
                <img src={logoImg} height="35px" alt='logo-img' />
            </Link>
        </div>

        <div className="navbar-container">
            <ul className='navbar-menu'>
                <li>HOME</li>
                <li>MENU</li>
                <li>CONTACT US</li>
            </ul>
        </div>

        <div className="actions-container">
            <CiSearch className='icon'/>
            <CiShoppingCart className='icon' />
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