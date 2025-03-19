import { useContext, useEffect } from 'react';
import FoodCategory from '../FoodCategory/FoodCategory';
import MenuItem from '../MenuItem/MenuItem';
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
        <MenuItem  showMessage={true}/>
    </div>
}

export default Menu;