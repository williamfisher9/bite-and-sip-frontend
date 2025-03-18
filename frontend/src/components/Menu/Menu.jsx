import { useContext, useEffect } from 'react';
import FoodCategory from '../FoodCategory/FoodCategory';
import MenuItem from '../MenuItem/MenuItem';
import './Menu.css'
import { GlobalStateContext } from '../../context/GlobalState';
import heroImg from '../../assets/dish.png'

const Menu = () => {
    const {setActiveCategory, setActiveNavbarItem} = useContext(GlobalStateContext)
    
        useEffect(() => {
    setActiveCategory("All Foods")
        }, [])

    return <div className="menu-items-container">
        <div className="menu-hero-section">
                <div className="menu-hero-section-container">
                    <img src={heroImg} alt='hero-img' id='menu-hero-img1' />
                    <img src={heroImg} alt='hero-img' id='menu-hero-img2' />
                    <img src={heroImg} alt='hero-img' id='menu-hero-img3' />
                    <img src={heroImg} alt='hero-img' id='menu-hero-img4' />
                    <img src={heroImg} alt='hero-img' id='menu-hero-img5' />
                    <img src={heroImg} alt='hero-img' id='menu-hero-img6' />
                </div>
        </div>
        <FoodCategory showMessage={false}  />
        <MenuItem  showMessage={false}/>
    </div>
}

export default Menu;