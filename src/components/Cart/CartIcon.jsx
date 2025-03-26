import { useContext, useState } from 'react';
import './CartIcon.css'
import { CartContext } from '../../context/Cart';
import { CiShoppingBasket } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { GlobalStateContext } from '../../context/GlobalState';
import CartHoverableBalanceSummary from './CartHoverableBalanceSummary';

const CartIcon = ({windowSize}) => {
    const { cartItems, getCartItemsCount, clearCart } = useContext(CartContext)
    const {setActiveNavbarItem} = useContext(GlobalStateContext)
    const navigate = useNavigate()
    const [showCartSummary, setShowCartSummary] = useState(false);

    return <>
    
    <div className='cart-container' onClick={() => {navigate("/biteandsip/cart"); setActiveNavbarItem("CART")}} 
    onMouseOver={() => setShowCartSummary(true)} onMouseLeave={() => setShowCartSummary(false)}>
            {
                windowSize > 800 && <CartHoverableBalanceSummary showCartSummary={showCartSummary} />
            }
                    <CiShoppingBasket className='icon'/>
                    <span id='cart-count'>{getCartItemsCount()}</span>
                </div>
    </>
}

export default CartIcon;