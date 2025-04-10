import { useContext, useEffect, useState } from 'react'
import './FoodItem.css'
import { useParams } from 'react-router-dom';
import { CartContext } from '../../../context/Cart';

const FoodItem = ({foodItems, foodCategories}) => {
    const params = useParams();

    const { cartItems, addToCart, removeFromCart } = useContext(CartContext)

    const [scrollVal, setScrollVal] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollVal(window.scrollY);
        });

        return window.removeEventListener('scroll', () => {
            setScrollVal(window.screenY);
        })
    }, [])

    
    const isMenuItemInCart = (menuItem) => {
        let exists = 0;
        let cartItemFound = null;
        cartItems.forEach(cartItem => {
            if(menuItem.id == cartItem.id ){
                exists = cartItem.quantity;
                cartItemFound = cartItem;
            }
        })

        if (exists == 0)
            return <span className="material-symbols-rounded menu-item-add-icon" onClick={() => addToCart(menuItem)}>add</span>
        else {
            return <div className='outer-menu-item-counter'>
                <span className="material-symbols-rounded inner-icon" style={{backgroundColor: "rgba(242, 103, 103, 0.3)"}} onClick={() => removeFromCart(menuItem)}>remove</span>
                    <span >{cartItemFound.quantity}</span>
                    <span className="material-symbols-rounded inner-icon" style={{backgroundColor: "rgba(105, 105, 248, 0.3)"}} onClick={() => addToCart(menuItem)}>add</span>
                   
            </div>
        }
    }

    return <div className='menu-items-container'>

<div className='page-title'>
            <span>{`MENU ITEMS - ${params.category != null ? 
                foodCategories.filter((item) => item.id == params.category)[0].name : 
                "ALL FOODS"}`}</span>
        </div>

        

        <div className='menu-items-grid'>
        {
            
            
            foodItems.filter((item) => (params.category != null && item.category.id == params.category) || params.category == null)
            .slice(0, scrollVal <= 0 ? 4 : Math.ceil(scrollVal/300) * 4)
            .map((item) => {
                return <div className='menu-item' key={item.id}>
                    <div className='image-container'>
                        <span className="menu-item-type">{item.category.name}</span>
                        <img src={item.imageSource} alt={item.name} />
                        {
                            isMenuItemInCart(item)
                        }
                        
                    </div>
                    <div className='text-container'>
                        <p style={{textAlign: "center", margin: "10px 0", fontWeight: "500"}}>{item.name}</p>
                        <p style={{textAlign: "justify", margin: "10px 0", padding: "0 10px", fontSize: "12px"}}>{item.description}</p>

                        <div className='price-container'>
                            <p style={{textAlign: "start", margin: "10px 0", fontWeight: "500"}}>${item.price}</p>
                        </div>
                    </div>

                    
                </div>
            })

            
        }
        </div>
    </div>
}

export default FoodItem;




