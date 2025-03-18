import { useContext } from 'react';
import './Cart.css'
import { CartContext } from '../../context/Cart';
import { CiShoppingBasket } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../context/GlobalState';

const Cart = () => {
    const { cartItems, getCartItemsCount } = useContext(CartContext)
    const {setActiveNavbarItem} = useContext(GlobalStateContext)
    const navigate = useNavigate()

    return <div className='cart-container' onClick={() => {navigate("/goodies/cart"); setActiveNavbarItem("CART")}}>
                    <CiShoppingBasket className='icon'/>
                    <span id='cart-count'>{getCartItemsCount()}</span>
                </div>
}

export default Cart;