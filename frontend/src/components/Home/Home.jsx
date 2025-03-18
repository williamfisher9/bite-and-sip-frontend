import heroImg from '../../assets/dish.png'
import './Home.css'
import FoodCategory from '../FoodCategory/FoodCategory'
import MenuItem from '../MenuItem/MenuItem'
import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { GlobalStateContext } from '../../context/GlobalState'

const Home = () => {
    const {setActiveCategory, setActiveNavbarItem} = useContext(GlobalStateContext)
    
        useEffect(() => {
    setActiveCategory("All Foods")
        }, [])
    return <div className=''>
            <div className="hero-section-wrapper">
                <div className="hero-section-container">
                    <img src={heroImg} alt='hero-img' id='hero-img' />
                    <div className='hero-img-text'>
                        <p style={{fontSize: "40px"}}>Pick & order your favorite food</p>
                        <p style={{marginTop: "5px"}}>Our menu offers a diverse selection of delectable dishes, each <br />crafted to perfection. Choose your favorite and prepare to be enchanted!</p>
                        <p style={{marginTop: "10px"}}></p>
                        <Link style={{marginTop: "20px", display: "inline-block", textDecoration: "none"}} className='view-menu-btn' to={"/goodies/menu"}>View Menu</Link>
                    </div>
                </div>
            </div>

            <FoodCategory showMessage={true}/>

            <MenuItem showMessage={true}/>

    </div>
}

export default Home;