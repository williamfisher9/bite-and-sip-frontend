import { useContext, useEffect } from 'react';
import FoodCategory from '../FoodCategory/FoodCategory';
import FoodItem from '../FoodItem/FoodItem';
import './Menu.css'
import { GlobalStateContext } from '../../context/GlobalState';
import heroImg from '../../assets/dish.png'

const Menu = () => {
    const {setActiveCategory} = useContext(GlobalStateContext)
    
        useEffect(() => {
            setActiveCategory("All Foods")
        }, [])

    return <div className="menu-items-container">

        <FoodCategory showMessage={true}  />
        <FoodItem  showMessage={true}/>
    </div>
}

export default Menu;